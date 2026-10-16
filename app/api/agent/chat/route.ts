import { NextResponse } from "next/server";
import { agentRuntime } from "@/lib/agent/config";
import type { ChatMessage } from "@/lib/agent/deepseek";
import { runPrecifarmAgentTurn } from "@/lib/agent/deepseek";
import { promptViaOpenCode } from "@/lib/agent/opencode-bridge";

export const runtime = "nodejs";

type Body = {
  messages?: ChatMessage[];
  message?: string;
  backend?: "deepseek" | "opencode";
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const lastUser =
    body.message?.trim() ??
    [...(body.messages ?? [])].reverse().find((m) => m.role === "user" && m.content)?.content?.trim();

  if (!lastUser) {
    return NextResponse.json({ error: "message or user messages required" }, { status: 400 });
  }

  const backend =
    body.backend ??
    (agentRuntime.opencodeServerUrl && process.env.AGENT_PREFER_OPENCODE === "true" ? "opencode" : "deepseek");

  try {
    if (backend === "opencode") {
      const reply = await promptViaOpenCode(lastUser);
      return NextResponse.json({
        reply,
        backend: "opencode",
        model: agentRuntime.model,
      });
    }

    const history: ChatMessage[] = body.messages?.length
      ? body.messages
      : [{ role: "user", content: lastUser }];

    const { reply, messages } = await runPrecifarmAgentTurn(history);
    return NextResponse.json({
      reply,
      backend: "deepseek",
      model: agentRuntime.model,
      messages,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Agent error";
    const status = message.includes("DEEPSEEK_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
