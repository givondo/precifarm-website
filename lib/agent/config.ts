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
  /** V4 Flash — fast agent tier */
  model: process.env.AGENT_MODEL ?? (useOpenRouter ? "deepseek/deepseek-v4-flash" : "deepseek-v4-flash"),
  /** When set, chat API forwards to a running OpenCode server instead of the model provider */
  opencodeServerUrl: process.env.OPENCODE_SERVER_URL?.replace(/\/$/, ""),
  /** Max tool-call rounds per user message */
  maxToolRounds: 6,
} as const;
