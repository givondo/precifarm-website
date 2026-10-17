import { agentRuntime } from "@/lib/agent/config";
import { engineeringToolDefinitions, runEngineeringTool } from "@/lib/agent/tools/engineering";
import { precifarmAgentSystemPrompt } from "@/lib/agent/system-prompt";

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content?: string;
  tool_call_id?: string;
  name?: string;
};

type DeepSeekMessage = ChatMessage & {
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
};

function apiKey(): string {
  const key = process.env[agentRuntime.apiKeyEnv]?.trim();
  if (!key) {
    throw new Error(`${agentRuntime.apiKeyEnv} is not configured on the server.`);
  }
  return key;
}

function providerHeaders(): Record<string, string> {
  if (agentRuntime.provider !== "openrouter") return {};
  return { "HTTP-Referer": "https://precifarm.com", "X-Title": "Precifarm Agent" };
}

async function chatCompletion(messages: DeepSeekMessage[]) {
  const res = await fetch(`${agentRuntime.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      ...providerHeaders(),
    },
    body: JSON.stringify({
      model: agentRuntime.model,
      messages: [{ role: "system", content: precifarmAgentSystemPrompt }, ...messages],
      tools: engineeringToolDefinitions,
      tool_choice: "auto",
      stream: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DeepSeek API ${res.status}: ${text.slice(0, 400)}`);
  }

  return res.json() as Promise<{
    choices: Array<{ message: DeepSeekMessage; finish_reason: string }>;
  }>;
}

/** Run agent loop with tool execution until model returns text or max rounds. */
export async function runPrecifarmAgentTurn(
  history: ChatMessage[],
): Promise<{ reply: string; messages: ChatMessage[] }> {
  const working: DeepSeekMessage[] = history.filter((m) => m.role !== "system") as DeepSeekMessage[];

  for (let round = 0; round < agentRuntime.maxToolRounds; round++) {
    const completion = await chatCompletion(working);
    const choice = completion.choices[0];
    if (!choice) {
      throw new Error("Empty DeepSeek response");
    }

    const msg = choice.message;
    working.push(msg);

    const toolCalls = msg.tool_calls;
    if (toolCalls?.length && choice.finish_reason === "tool_calls") {
      for (const call of toolCalls) {
        let parsed: unknown = {};
        try {
          parsed = JSON.parse(call.function.arguments || "{}");
        } catch {
          parsed = {};
        }
        const result = runEngineeringTool(call.function.name, parsed);
        working.push({
          role: "tool",
          tool_call_id: call.id,
          name: call.function.name,
          content: JSON.stringify(result),
        });
      }
      continue;
    }

    const reply = msg.content?.trim() ?? "";
    return { reply, messages: working };
  }

  return {
    reply: "I hit the maximum calculation steps. Try a narrower question or split the design into parts.",
    messages: working,
  };
}
