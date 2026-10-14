/** SERP-safe meta description length (Google typically shows ~155–160 characters). */
export const META_DESCRIPTION_MAX = 160;

export function trimMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;

  const slice = normalized.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace >= Math.floor(max * 0.55)) {
    return slice.slice(0, lastSpace).trim();
  }
  return slice.trim();
}
