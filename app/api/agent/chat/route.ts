import { NextResponse } from "next/server";
import { agentRuntime } from "@/lib/agent/config";
import { runPrecifarmAgentTurn } from "@/lib/agent/deepseek";
import { clientIp, createDailyBudget, createRateLimiter, crossOrigin, parseChatBody } from "@/lib/agent/guard";
import { promptViaOpenCode } from "@/lib/agent/opencode-bridge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/*
 * Best-effort, per-instance limits so a public page cannot drain the API key. With several
 * Cloud Run instances the effective ceiling is limit × instances: keep a credit limit on the
 * provider key as the hard stop.
 */
const perIpLimited = createRateLimiter(agentRuntime.rateLimit.requests, agentRuntime.rateLimit.windowMs);
const dailyBudgetSpent = createDailyBudget(agentRuntime.dailyLimit);

export async function POST(request: Request) {
  if (crossOrigin(request.headers.get("origin"), request.headers.get("x-forwarded-host") ?? request.headers.get("host"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = clientIp(request.headers.get("x-forwarded-for"));
  if (perIpLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > agentRuntime.maxBodyChars * 4) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const parsed = parseChatBody(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  if (dailyBudgetSpent()) {
    return NextResponse.json(
      { error: "The Agent has reached today's early-access limit. Please try again tomorrow." },
      { status: 503 },
    );
  }

  try {
    if (agentRuntime.opencodeServerUrl) {
      const lastUser = parsed.history[parsed.history.length - 1].content ?? "";
      const reply = await promptViaOpenCode(lastUser, AbortSignal.timeout(agentRuntime.timeoutMs));
      return NextResponse.json({ reply, backend: "opencode", model: agentRuntime.model, trace: [] });
    }

    const { reply, trace } = await runPrecifarmAgentTurn(parsed.history, AbortSignal.timeout(agentRuntime.timeoutMs));
    return NextResponse.json({ reply, backend: agentRuntime.provider, model: agentRuntime.model, trace });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Agent error";
    // Logs carry the error only: never the API key or the visitor's messages.
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
