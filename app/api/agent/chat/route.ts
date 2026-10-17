import { NextResponse } from "next/server";
import { agentRuntime } from "@/lib/agent/config";
import type { ChatMessage } from "@/lib/agent/deepseek";
import { runPrecifarmAgentTurn } from "@/lib/agent/deepseek";
import { promptViaOpenCode } from "@/lib/agent/opencode-bridge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  messages?: ChatMessage[];
  message?: string;
  backend?: "deepseek" | "opencode";
};

/* Best-effort per-instance limiter so a public page cannot drain the API key. */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const { requests, windowMs } = agentRuntime.rateLimit;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return recent.length > requests;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

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
    agentRuntime.opencodeServerUrl && (body.backend === "opencode" || process.env.AGENT_PREFER_OPENCODE === "true")
      ? "opencode"
      : "deepseek";

  try {
    if (backend === "opencode") {
      const reply = await promptViaOpenCode(lastUser.slice(0, agentRuntime.maxMessageChars));
      return NextResponse.json({ reply, backend, model: agentRuntime.model, trace: [] });
    }

    const history: ChatMessage[] = body.messages?.length ? body.messages : [{ role: "user", content: lastUser }];
    const { reply, trace } = await runPrecifarmAgentTurn(history, AbortSignal.timeout(agentRuntime.timeoutMs));
    return NextResponse.json({ reply, backend: agentRuntime.provider, model: agentRuntime.model, trace });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Agent error";
    console.error("[agent/chat]", message);
    if (message.includes(agentRuntime.apiKeyEnv)) {
      return NextResponse.json(
        { error: "The Agent workspace is not connected yet. Please try again later or contact Precifarm." },
        { status: 503 },
      );
    }
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      return NextResponse.json({ error: "The design took too long. Try a narrower question." }, { status: 504 });
    }
    return NextResponse.json({ error: "The Agent hit an error. Please try again." }, { status: 502 });
  }
}
