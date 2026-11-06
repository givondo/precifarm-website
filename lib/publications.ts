/**
 * Helpers for long-form pages (guides, FAQ articles, policies, city pages): stable heading ids,
 * a table of contents from the markdown, reading time, and a small block parser for the
 * markdown subset the CMS and lib/seo/static-guides.ts use (## / ### headings, lists, paragraphs).
 */

export type TocItem = { id: string; label: string; level: 2 | 3 };

export type MdBlock =
  | { kind: "h2" | "h3"; id: string; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

/** URL-safe id from a heading: lower case, ascii letters and digits joined by single hyphens. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\*\*|__|`/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

/** Section id for a numbered policy heading: "3. Products vs research" becomes "products-vs-research". */
export function sectionId(title: string): string {
  return slugify(title.replace(/^\d+\.\s*/, ""));
}

function uniqueId(base: string, seen: Map<string, number>): string {
  const id = base || "section";
  const n = seen.get(id) ?? 0;
  seen.set(id, n + 1);
  return n === 0 ? id : `${id}-${n + 1}`;
}

export function parseMarkdownBlocks(md: string): MdBlock[] {
  const blocks: MdBlock[] = [];
  const seen = new Map<string, number>();
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (list?.items.length) blocks.push(list);
    list = null;
  };

  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flush();
      const text = heading[2].trim();
      blocks.push({ kind: heading[1].length === 2 ? "h2" : "h3", id: uniqueId(slugify(text), seen), text });
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (ordered || bullet) {
      const kind = ordered ? "ol" : "ul";
      if (!list || list.kind !== kind) {
        flush();
        list = { kind, items: [] };
      }
      list.items.push((ordered ?? bullet)![1]);
      continue;
    }
    flush();
    blocks.push({ kind: "p", text: line });
  }
  flush();
  return blocks;
}

export function tocFromBlocks(blocks: readonly MdBlock[], levels: readonly (2 | 3)[] = [2]): TocItem[] {
  return blocks.flatMap((b) =>
    (b.kind === "h2" && levels.includes(2)) || (b.kind === "h3" && levels.includes(3))
      ? [{ id: b.id, label: stripInline(b.text), level: b.kind === "h2" ? (2 as const) : (3 as const) }]
      : [],
  );
}

/** Removes markdown emphasis and links, keeping the visible text. */
export function stripInline(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
}

/** Whole minutes at 220 words a minute, at least one. */
export function readingMinutes(...texts: (string | null | undefined)[]): number {
  const words = texts
    .filter(Boolean)
    .join(" ")
    .replace(/[#*_`>[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatLongDate(iso: string | null | undefined): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(d);
}

/** Display a data range such as "~200–250 km" with words instead of a dash: "~200 to 250 km". */
export function rangeText(value: string): string {
  return value.replace(/\s*[–—]\s*/g, " to ");
}
