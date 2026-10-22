// The guides published from the website: answer-first, sourced, English, and linked only to pages that exist.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

function pageExists(path: string): boolean {
  const parts = path.split("#")[0].split("/").filter(Boolean);
  const walk = (dir: string, rest: string[]): boolean => {
    if (!rest.length) return existsSync(resolve(dir, "page.tsx"));
    if (existsSync(resolve(dir, rest[0]))) return walk(resolve(dir, rest[0]), rest.slice(1));
    return existsSync(resolve(dir, "[slug]")) ? walk(resolve(dir, "[slug]"), rest.slice(1)) : false;
  };
  return walk(resolve(root, "app"), parts);
}

test("website guides: titles and descriptions fit a search result, slugs are unique", async () => {
  const { staticGuides } = await import("@/lib/seo/static-guides");
  assert.ok(staticGuides.length >= 4);
  assert.equal(new Set(staticGuides.map((g) => g.slug)).size, staticGuides.length);
  for (const g of staticGuides) {
    assert.ok(g.title.length <= 60, `${g.slug} title is ${g.title.length} characters`);
    assert.ok(g.description.length >= 120 && g.description.length <= 165, `${g.slug} description is ${g.description.length}`);
    assert.match(g.slug, /kenya/, `${g.slug} should carry the place people search for`);
  }
});

test("website guides: answer first, sourced, no dashes, at least three questions", async () => {
  const { staticGuides } = await import("@/lib/seo/static-guides");
  for (const g of staticGuides) {
    assert.ok(g.bodyMd?.startsWith("## The short answer"), `${g.slug} must open with the answer`);
    assert.ok((g.sources ?? []).length >= 2, `${g.slug} needs sources`);
    for (const s of g.sources ?? []) assert.match(s.url, /^https:\/\//);
    const text = JSON.stringify(g);
    assert.ok(!/[–—]/.test(text), `${g.slug} contains an en or em dash`);
    const faq = g.aisoBlocks.find((b) => b.type === "faq");
    assert.ok((faq?.items ?? []).length >= 3, `${g.slug} needs at least three questions`);
  }
});

test("website guides: every internal link points at a page that exists", async () => {
  const { staticGuides } = await import("@/lib/seo/static-guides");
  const slugs = new Set(staticGuides.map((g) => g.slug));
  for (const g of staticGuides) {
    for (const [, href] of (g.bodyMd ?? "").matchAll(/\]\((\/[^)\s]*)\)/g)) {
      const guide = href.match(/^\/guides\/([^/#]+)$/);
      assert.ok(guide ? slugs.has(guide[1]) : pageExists(href), `${g.slug} links to missing ${href}`);
    }
  }
});

test("markdown links are escaped and limited to site paths and https", async () => {
  const { formatInline } = await import("@/lib/seo/markdown-inline");
  const html = formatInline("See [the map](/hub), [bad](javascript:alert(1)), [ext](https://example.com) and <script>x</script>.");
  assert.ok(html.includes('<a href="/hub"'), html);
  assert.ok(html.includes('<a href="https://example.com"'), html);
  assert.ok(!html.includes('href="javascript'), html);
  assert.ok(!html.includes("<script>"), html);
});
