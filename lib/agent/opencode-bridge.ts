import { agentRuntime } from "@/lib/agent/config";
import { precifarmAgentSystemPrompt } from "@/lib/agent/system-prompt";

/**
 * Forward a prompt to a running OpenCode server (local desktop or sidecar).
 * Configure DeepSeek V4 Flash inside OpenCode via /connect → deepseek.
 */
export async function promptViaOpenCode(userText: string): Promise<string> {
  const base = agentRuntime.opencodeServerUrl;
  if (!base) {
    throw new Error("OPENCODE_SERVER_URL is not set");
  }

  const sessionRes = await fetch(`${base}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Precifarm Agent",
    }),
  });

  if (!sessionRes.ok) {
    throw new Error(`OpenCode session create failed: ${sessionRes.status}`);
  }

  const session = (await sessionRes.json()) as { id: string };

  const promptRes = await fetch(`${base}/session/${session.id}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `${precifarmAgentSystemPrompt}\n\nUser:\n${userText}`,
    }),
  });

  if (!promptRes.ok) {
    throw new Error(`OpenCode prompt failed: ${promptRes.status}`);
  }

  const payload = (await promptRes.json()) as { parts?: Array<{ type: string; text?: string }> };
  const textParts = payload.parts?.filter((p) => p.type === "text" && p.text).map((p) => p.text) ?? [];
  return textParts.join("\n") || "OpenCode returned no text. Check the server logs and model provider.";
}
