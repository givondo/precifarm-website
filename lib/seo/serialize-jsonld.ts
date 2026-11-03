import type { JsonLd } from "@/lib/seo/types";

/**
 * Serialises JSON-LD for an inline script. `<` is escaped as < so CMS-sourced text
 * (FAQs, guides) containing "</script>" cannot close the tag; JSON parsers read it unchanged.
 */
export function serializeJsonLd(node: JsonLd): string {
  return JSON.stringify(node).replace(/</g, "\\u003c");
}
