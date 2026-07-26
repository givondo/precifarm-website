/** Classify document.referrer as known AI search / assistant sources. */

const AI_REFERRER_PATTERNS: { source: string; pattern: RegExp }[] = [
  { source: "chatgpt", pattern: /chat\.openai\.com|chatgpt\.com/i },
  { source: "perplexity", pattern: /perplexity\.ai/i },
  { source: "claude", pattern: /claude\.ai|anthropic\.com/i },
  { source: "gemini", pattern: /gemini\.google\.com|bard\.google\.com/i },
  { source: "copilot", pattern: /copilot\.microsoft\.com|bing\.com\/chat/i },
  { source: "youcom", pattern: /you\.com/i },
  { source: "phind", pattern: /phind\.com/i },
  { source: "poe", pattern: /poe\.com/i },
];

export function classifyAiReferrer(referrer: string): string | null {
  if (!referrer.trim()) return null;
  for (const { source, pattern } of AI_REFERRER_PATTERNS) {
    if (pattern.test(referrer)) return source;
  }
  return null;
}
