/** Meta description length guidance (Google often truncates ~155–160 chars). */
export const SERP_DESCRIPTION_MAX = 160;

export function trimMetaDescription(text: string, max = SERP_DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const slice = normalized.slice(0, max - 1);
  const breakAt = Math.max(slice.lastIndexOf(" "), slice.lastIndexOf("—"), slice.lastIndexOf(","));
  const cut = breakAt > 70 ? slice.slice(0, breakAt) : slice;
  return `${cut.trimEnd()}…`;
}
