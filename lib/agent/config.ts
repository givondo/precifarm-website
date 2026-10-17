/** Runtime config for Precifarm Agent (OpenRouter or DeepSeek + optional OpenCode). */

const useOpenRouter = Boolean(process.env.OPENROUTER_API_KEY?.trim());

export const agentRuntime = {
  /** OpenRouter when OPENROUTER_API_KEY is set, otherwise direct DeepSeek */
  provider: useOpenRouter ? "openrouter" : "deepseek",
  /** OpenAI-compatible chat endpoint for the active provider */
  baseUrl: useOpenRouter
    ? (process.env.OPENROUTER_BASE_URL?.replace(/\/$/, "") ?? "https://openrouter.ai/api/v1")
    : (process.env.DEEPSEEK_BASE_URL?.replace(/\/$/, "") ?? "https://api.deepseek.com"),
  apiKeyEnv: useOpenRouter ? "OPENROUTER_API_KEY" : "DEEPSEEK_API_KEY",
  /** Direct DeepSeek endpoint, used by the OpenCode local config */
  deepseekBaseUrl: process.env.DEEPSEEK_BASE_URL?.replace(/\/$/, "") ?? "https://api.deepseek.com",
  /** V4 Flash, the fast agent tier */
  model: process.env.AGENT_MODEL ?? (useOpenRouter ? "deepseek/deepseek-v4-flash" : "deepseek-v4-flash"),
  /** When set, chat API forwards to a running OpenCode server instead of the model provider */
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
