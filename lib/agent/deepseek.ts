import { agentRuntime } from "@/lib/agent/config";
import { engineeringToolDefinitions, runEngineeringTool, type ToolResult } from "@/lib/agent/tools/engineering";
import { precifarmAgentSystemPrompt } from "@/lib/agent/system-prompt";

export type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content?: string;
  tool_call_id?: string;
  name?: string;
};

/** One tool call as shown in the workspace calculation trace. */
export type ToolTraceEntry = {
  tool: string;
  args: Record<string, unknown>;
  result: ToolResult;
};

type DeepSeekMessage = ChatMessage & {
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  reasoning_content?: string;
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

async function chatCompletion(messages: DeepSeekMessage[], signal?: AbortSignal) {
  const res = await fetch(`${agentRuntime.baseUrl}/chat/completions`, {
    method: "POST",
    signal,
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
      temperature: 0.2,
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

/** Keep only plain user/assistant turns from the client, capped in count and length. */
export function sanitiseHistory(history: ChatMessage[]): ChatMessage[] {
  return history
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-agentRuntime.maxHistoryMessages)
    .map((m) => ({ role: m.role, content: m.content!.slice(0, agentRuntime.maxMessageChars) }));
}

/** Run the agent loop, executing tools until the model returns text or the round limit is hit. */
export async function runPrecifarmAgentTurn(
  history: ChatMessage[],
  signal?: AbortSignal,
): Promise<{ reply: string; trace: ToolTraceEntry[] }> {
  const working: DeepSeekMessage[] = sanitiseHistory(history);
  const trace: ToolTraceEntry[] = [];

  for (let round = 0; round < agentRuntime.maxToolRounds; round++) {
    const completion = await chatCompletion(working, signal);
    const choice = completion.choices[0];
    if (!choice) {
      throw new Error("Empty DeepSeek response");
    }

    // Reasoning text is not sent back to the API on later rounds.
    const msg: DeepSeekMessage = { ...choice.message };
    delete msg.reasoning_content;
    working.push(msg);

    const toolCalls = msg.tool_calls;
    if (toolCalls?.length) {
      for (const call of toolCalls) {
        let parsed: Record<string, unknown> = {};
        try {
          parsed = JSON.parse(call.function.arguments || "{}") as Record<string, unknown>;
        } catch {
          parsed = {};
        }
        const result = runEngineeringTool(call.function.name, parsed);
        trace.push({ tool: call.function.name, args: parsed, result });
        working.push({
          role: "tool",
          tool_call_id: call.id,
          name: call.function.name,
          content: JSON.stringify(result),
        });
      }
      continue;
    }

    return { reply: msg.content?.trim() ?? "", trace };
  }

  return {
    reply: "I reached the calculation limit for one message. Split the design into parts (for example: charger first, then backup) and ask again.",
    trace,
  };
}
