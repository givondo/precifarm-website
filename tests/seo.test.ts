// Search and sharing basics for precifarm.com: hreflang, robots, sitemap, page titles and descriptions.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
/** True when an App Router page exists for a path (static or one dynamic segment). */
function pageExists(path: string): boolean {
  const parts = path.split("/").filter(Boolean);
  const walk = (dir: string, rest: string[]): boolean => {
    if (!rest.length) return existsSync(resolve(dir, "page.tsx")) || existsSync(resolve(dir, "route.ts"));
    if (existsSync(resolve(dir, rest[0]))) return walk(resolve(dir, rest[0]), rest.slice(1));
    const dyn = ["[slug]", "[id]"].find((d) => existsSync(resolve(dir, d)));
    return dyn ? walk(resolve(dir, dyn), rest.slice(1)) : false;
  };
  return walk(resolve(root, "app"), parts);
}

test("hreflang: a Swahili alternate is listed only where a Swahili page exists", async () => {
  const { hreflangAlternates } = await import("@/lib/seo/i18n");
  const home = hreflangAlternates("/");
  assert.equal(home["sw-KE"], "https://precifarm.com/sw");
  assert.equal(home["x-default"], "https://precifarm.com/");
  for (const p of ["/hub", "/charging/home", "/about", "/guides/x", "/faq/x"]) {
    const alt = hreflangAlternates(p);
    assert.equal(alt["sw-KE"], undefined, p);
    assert.equal(alt["en-KE"], "https://precifarm.com" + p);
  }
  const swFaq = hreflangAlternates("/sw/faq/ev-charging-economics-faq");
  assert.equal(swFaq["sw-KE"], "https://precifarm.com/sw/faq/ev-charging-economics-faq");
  assert.equal(swFaq["en-KE"], "https://precifarm.com/faq/ev-charging-economics-faq");
});

test("robots: crawlers may fetch scripts, styles and the share image; the API stays out", async () => {
  const robots = (await import("@/app/robots")).default();
  const rules = [robots.rules].flat();
  for (const r of rules) {
    const dis = [r.disallow ?? []].flat();
    assert.ok(!dis.some((d) => d.startsWith("/_next")), `${r.userAgent} blocks /_next`);
    assert.ok(!dis.includes("/opengraph-image"), `${r.userAgent} blocks the share image`);
  }
  assert.ok([rules[0].disallow].flat().includes("/api/"));
  assert.equal(robots.sitemap, "https://precifarm.com/sitemap.xml");
});

test("sitemap: every static entry is an https precifarm.com URL with a page behind it, listed once", async () => {
  const { buildStaticSitemapEntries } = await import("@/lib/seo/sitemap");
  const entries = buildStaticSitemapEntries();
  const urls = entries.map((e: { url: string }) => e.url);
  assert.equal(new Set(urls).size, urls.length, "duplicate sitemap URLs");
  for (const u of urls) {
    assert.match(u, /^https:\/\/precifarm\.com(\/|$)/);
    const path = u.replace("https://precifarm.com", "") || "/";
    assert.ok(path === "/" || pageExists(path), `no page for ${path}`);
  }
});

test("page registry: unique paths and titles, titles fit a search result, descriptions say something", async () => {
  const { pageSeoRegistry } = await import("@/lib/seo/pages/registry");
  const paths = pageSeoRegistry.map((p: { path: string }) => p.path);
  assert.equal(new Set(paths).size, paths.length, "duplicate registry paths");
  const titles = new Map<string, string>();
  for (const p of pageSeoRegistry as Array<{ path: string; title: string; description: string }>) {
    assert.ok(p.title.length <= 70, `${p.path} title is ${p.title.length} characters`);
    assert.ok(p.description.length >= 70 && p.description.length <= 170, `${p.path} description is ${p.description.length} characters`);
    assert.ok(!titles.has(p.title), `${p.path} repeats the title of ${titles.get(p.title)}`);
    titles.set(p.title, p.path);
    assert.ok(pageExists(p.path) || p.path === "/", `registry lists ${p.path} but there is no page`);
  }
});
