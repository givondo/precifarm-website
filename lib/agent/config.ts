/** Runtime config for Precifarm Agent (DeepSeek + optional OpenCode). */

export const agentRuntime = {
  /** OpenAI-compatible DeepSeek endpoint */
  deepseekBaseUrl: process.env.DEEPSEEK_BASE_URL?.replace(/\/$/, "") ?? "https://api.deepseek.com",
  /** V4 Flash — fast agent tier (see DeepSeek API model names) */
  model: process.env.AGENT_MODEL ?? "deepseek-v4-flash",
  /** When set, chat API forwards to a running OpenCode server instead of direct DeepSeek */
  opencodeServerUrl: process.env.OPENCODE_SERVER_URL?.replace(/\/$/, ""),
  /** Max tool-call rounds per user message */
  maxToolRounds: 6,
} as const;
