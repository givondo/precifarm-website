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
      max_tokens: agentRuntime.maxOutputTokens,
      stream: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Model API ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json() as Promise<{
    choices: Array<{ message: DeepSeekMessage; finish_reason: string }>;
  }>;
}

/**
 * Keep only plain user/assistant turns from the client, capped in count, per-message length and
 * total characters (most recent kept). Assistant turns come from the client and are untrusted.
 */
export function sanitiseHistory(history: ChatMessage[]): ChatMessage[] {
  const kept = history
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-agentRuntime.maxHistoryMessages)
    .map((m) => ({
      role: m.role,
      content: m.content!.slice(0, m.role === "user" ? agentRuntime.maxMessageChars : agentRuntime.maxAssistantMessageChars),
    }));
  let total = 0;
  let start = kept.length;
  while (start > 0 && total + kept[start - 1].content.length <= agentRuntime.maxHistoryChars) {
    total += kept[start - 1].content.length;
    start -= 1;
  }
  const trimmed = kept.slice(Math.min(start, kept.length - 1));
  // The model must not start on a forged assistant turn.
  while (trimmed.length > 1 && trimmed[0].role !== "user") trimmed.shift();
  return trimmed;
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
      if (trace.length + toolCalls.length > agentRuntime.maxToolCallsPerTurn) break;
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

    return { reply: typeof msg.content === "string" ? msg.content.trim() : "", trace };
  }

  return {
    reply: "I reached the calculation limit for one message. Split the design into parts (for example: charger first, then backup) and ask again.",
    trace,
  };
}
