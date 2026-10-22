import { absoluteUrl } from "@/lib/seo/config";

/**
 * precifarm.com is published in Kenyan English only. Kenyans search in English, so the Swahili pages were
 * retired and /sw URLs redirect to their English pages (next.config.ts). Each page lists itself as en-KE and
 * as the x-default.
 */
export function hreflangAlternates(path: string): Record<string, string> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = absoluteUrl(normalized);
  return { "en-KE": url, "x-default": url };
}
