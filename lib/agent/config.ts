/** Runtime config for Precifarm Agent (OpenRouter or DeepSeek + optional OpenCode). */

const useOpenRouter = Boolean(process.env.OPENROUTER_API_KEY?.trim());

const envInt = (name: string, def: number) => {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : def;
};

export const agentRuntime = {
  /** OpenRouter when OPENROUTER_API_KEY is set, otherwise direct DeepSeek */
  provider: useOpenRouter ? "openrouter" : "deepseek",
  /** OpenAI-compatible chat endpoint for the active provider */
  baseUrl: useOpenRouter
    ? (process.env.OPENROUTER_BASE_URL?.replace(/\/$/, "") ?? "https://openrouter.ai/api/v1")
    : (process.env.DEEPSEEK_BASE_URL?.replace(/\/$/, "") ?? "https://api.deepseek.com"),
  apiKeyEnv: useOpenRouter ? "OPENROUTER_API_KEY" : "DEEPSEEK_API_KEY",
  /** V4 Flash, the fast agent tier. Server-side only; clients cannot choose the model. */
  model: process.env.AGENT_MODEL ?? (useOpenRouter ? "deepseek/deepseek-v4-flash" : "deepseek-v4-flash"),
  /**
   * OpenCode is an agentic coding tool that can run commands on its host. It is only used when
   * AGENT_PREFER_OPENCODE=true outside production, never because a visitor asked for it, and the
   * chat route additionally requires the request to come from localhost (isLoopbackRequest).
   */
  opencodeServerUrl:
    process.env.AGENT_PREFER_OPENCODE === "true" && process.env.NODE_ENV !== "production"
      ? process.env.OPENCODE_SERVER_URL?.replace(/\/$/, "")
      : undefined,
  /** Max model rounds (each may call several tools) per user message */
  maxToolRounds: 6,
  /** Max tool executions per user message across all rounds */
  maxToolCallsPerTurn: 24,
  /** Output token cap per model call */
  maxOutputTokens: 1500,
  /** Conversation turns kept per request */
  maxHistoryMessages: 16,
  /** Most recent messages kept from the client; older ones are dropped, never rejected */
  maxClientMessages: 60,
  /** Characters per user message (matches the textarea maxLength); longer user messages get 413 */
  maxMessageChars: 6000,
  /**
   * Assistant replies the browser sends back are truncated to this many characters, never
   * rejected, so one long reply cannot block the rest of the conversation.
   */
  maxAssistantMessageChars: 8000,
  /** Characters of history sent upstream, most recent kept */
  maxHistoryChars: 24_000,
  /** Raw request body size accepted, characters */
  maxBodyChars: 400_000,
  /** Requests per IP per window (best effort, per instance) */
  rateLimit: { requests: envInt("AGENT_RATE_LIMIT", 20), windowMs: 10 * 60 * 1000 },
  /** Requests per instance per UTC day across all visitors */
  dailyLimit: envInt("AGENT_DAILY_LIMIT", 1000),
  /** X-Forwarded-For entries appended by trusted proxies: 1 for Cloud Run direct, 2 behind an external load balancer */
  trustedProxyHops: envInt("AGENT_TRUSTED_PROXY_HOPS", 1),
  /** Extra browser origins allowed to call the API, besides same-host requests */
  allowedOrigins: (process.env.AGENT_ALLOWED_ORIGINS ?? "https://precifarm.com,https://www.precifarm.com,https://ops.precifarm.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  /** Upstream timeout for one user message */
  timeoutMs: 90_000,
} as const;
