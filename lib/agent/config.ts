/** Runtime config for Precifarm Agent (DeepSeek + optional OpenCode). */

export const agentRuntime = {
  /** OpenAI-compatible DeepSeek endpoint */
  deepseekBaseUrl: process.env.DEEPSEEK_BASE_URL?.replace(/\/$/, "") ?? "https://api.deepseek.com",
  /** V4 Flash, the fast agent tier (see DeepSeek API model names) */
  model: process.env.AGENT_MODEL ?? "deepseek-v4-flash",
  /** When set, chat API forwards to a running OpenCode server instead of direct DeepSeek */
  opencodeServerUrl: process.env.OPENCODE_SERVER_URL?.replace(/\/$/, ""),
  /** Max model rounds (each may call several tools) per user message */
  maxToolRounds: 8,
  /** Conversation turns kept per request */
  maxHistoryMessages: 16,
  /** Characters kept per message */
  maxMessageChars: 6000,
  /** Requests per IP per window (best effort, per instance) */
  rateLimit: { requests: Number(process.env.AGENT_RATE_LIMIT ?? 20), windowMs: 10 * 60 * 1000 },
  /** Upstream timeout for one user message */
  timeoutMs: 90_000,
} as const;
