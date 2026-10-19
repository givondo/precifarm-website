/**
 * Request guards for the public Agent API: body validation, client IP and rate limits.
 * Pure functions plus small in-memory limiters, so they can be unit tested.
 *
 * The limiters are per server instance. Cloud Run can run several instances, so the real
 * ceiling is limit × instances. The hard cost ceiling must be the provider-side credit limit
 * on the OpenRouter or DeepSeek key.
 */

import { agentRuntime } from "@/lib/agent/config";
import type { ChatMessage } from "@/lib/agent/deepseek";

export type ParsedChat = { ok: true; history: ChatMessage[] } | { ok: false; status: number; error: string };

const TRUNCATED = "\n[earlier reply truncated]";

/** Cap an assistant turn echoed back by the browser at maxAssistantMessageChars, keeping its start. */
export function truncateAssistant(content: string, max: number = agentRuntime.maxAssistantMessageChars): string {
  return content.length <= max ? content : content.slice(0, max - TRUNCATED.length) + TRUNCATED;
}

/** Validate and normalise the JSON body sent by the Agent workspace. */
export function parseChatBody(raw: string): ParsedChat {
  if (raw.length > agentRuntime.maxBodyChars) {
    return { ok: false, status: 413, error: "Request too large. Start a new design or shorten the brief." };
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON body" };
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, error: "Invalid body" };
  }
  const { messages, message } = body as { messages?: unknown; message?: unknown };

  let history: ChatMessage[];
  if (messages !== undefined) {
    // Count is bounded by maxBodyChars; older turns are trimmed below rather than rejected.
    if (!Array.isArray(messages) || messages.length === 0) {
      return { ok: false, status: 400, error: "messages must be a non-empty list" };
    }
    history = [];
    for (const m of messages) {
      if (!m || typeof m !== "object") return { ok: false, status: 400, error: "Invalid message" };
      const { role, content } = m as { role?: unknown; content?: unknown };
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        return { ok: false, status: 400, error: "Each message needs role user or assistant and string content" };
      }
      // Only what the visitor typed is limited; replies the browser echoes back are truncated.
      if (role === "user" && content.length > agentRuntime.maxMessageChars) {
        return { ok: false, status: 413, error: `Each message must be at most ${agentRuntime.maxMessageChars} characters` };
      }
      const text = role === "assistant" ? truncateAssistant(content) : content;
      if (text.trim()) history.push({ role, content: text });
    }
    history = history.slice(-agentRuntime.maxClientMessages);
  } else if (typeof message === "string") {
    if (message.length > agentRuntime.maxMessageChars) {
      return { ok: false, status: 413, error: `Message must be at most ${agentRuntime.maxMessageChars} characters` };
    }
    history = message.trim() ? [{ role: "user", content: message }] : [];
  } else {
    return { ok: false, status: 400, error: "message or user messages required" };
  }

  if (!history.length || history[history.length - 1].role !== "user") {
    return { ok: false, status: 400, error: "The last message must be from the user" };
  }
  return { ok: true, history };
}

/**
 * Client IP from X-Forwarded-For. The left-most entries are whatever the client sent, so they
 * cannot be trusted for rate limiting. Google's front end appends the real client address, so we
 * count `hops` entries from the right: 1 for Cloud Run served directly, 2 behind an external
 * HTTPS load balancer (which appends its own address after the client's).
 */
export function clientIp(forwardedFor: string | null, hops: number = agentRuntime.trustedProxyHops): string {
  if (!forwardedFor) return "unknown";
  const parts = forwardedFor
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (!parts.length) return "unknown";
  return parts[Math.max(0, parts.length - Math.max(1, hops))].slice(0, 64);
}

/** True when the browser Origin is present and is not this site. Requests without Origin pass. */
export function crossOrigin(origin: string | null, host: string | null, allowed: readonly string[] = agentRuntime.allowedOrigins): boolean {
  if (!origin) return false;
  let o: URL;
  try {
    o = new URL(origin);
  } catch {
    return true;
  }
  if (host && o.host === host) return false;
  return !allowed.includes(o.origin);
}

/**
 * Sliding-window limiter keyed by client. Bounded memory: at most requests + 1 timestamps per key
 * (enough to decide "over the limit"), and the oldest keys are evicted past maxKeys.
 */
export function createRateLimiter(requests: number, windowMs: number, maxKeys = 10_000) {
  const hits = new Map<string, number[]>();
  const limited = (key: string, now = Date.now()): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    if (recent.length > requests + 1) recent.splice(0, recent.length - (requests + 1));
    hits.delete(key);
    hits.set(key, recent);
    // Map keeps insertion order and each hit re-inserts its key, so the first key is the least recent.
    while (hits.size > maxKeys) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
    return recent.length > requests;
  };
  /** Timestamps held for a key, for tests. */
  limited.entries = (key: string) => hits.get(key)?.length ?? 0;
  return limited;
}

/** Fixed daily budget across all visitors on this instance. */
export function createDailyBudget(limit: number) {
  let day = "";
  let used = 0;
  return (now = Date.now()): boolean => {
    const today = new Date(now).toISOString().slice(0, 10);
    if (today !== day) {
      day = today;
      used = 0;
    }
    used += 1;
    return used > limit;
  };
}
