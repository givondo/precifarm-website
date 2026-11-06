// The footer has one source of truth (lib/site-nav.ts): every link once, every internal link a real page.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
function pageExists(path: string): boolean {
  const parts = path.split(/[?#]/)[0].split("/").filter(Boolean);
  const walk = (dir: string, rest: string[]): boolean => {
    if (!rest.length) return existsSync(resolve(dir, "page.tsx"));
    if (existsSync(resolve(dir, rest[0]))) return walk(resolve(dir, rest[0]), rest.slice(1));
    return existsSync(resolve(dir, "[slug]")) ? walk(resolve(dir, "[slug]"), rest.slice(1)) : false;
  };
  return walk(resolve(root, "app"), parts);
}

test("footer: every link appears once and every internal link has a page", async () => {
  const { footerGroups, footerLegalLinks } = await import("@/lib/site-nav");
  const links = [...footerGroups.flatMap((g) => g.links), ...footerLegalLinks];
  const seen = new Set<string>();
  for (const l of links) {
    assert.ok(!seen.has(l.href), `${l.href} is listed twice`);
    seen.add(l.href);
    if (l.href.startsWith("/")) assert.ok(pageExists(l.href), `footer links to ${l.href} but there is no page`);
  }
});

test("footer: every call to action points at a real page and a known contact topic", async () => {
  const { footerCtaFor } = await import("@/lib/site-nav");
  const { contactInterests } = await import("@/lib/contact-interests");
  const paths = ["/", "/charging", "/charging/corridor", "/charging/boda-hub", "/charging/pulse-plus", "/partners", "/agent", "/download", "/research", "/training", "/careers", "/about"];
  for (const p of paths) {
    const cta = footerCtaFor(p);
    for (const l of [cta.primary, cta.secondary].filter(Boolean) as { href: string }[]) {
      assert.ok(pageExists(l.href), `${p}: CTA links to missing ${l.href}`);
      const interest = new URL(l.href, "https://x").searchParams.get("interest");
      if (interest) assert.ok(interest in contactInterests, `${p}: unknown contact interest ${interest}`);
    }
  }
  assert.notEqual(footerCtaFor("/").primary.href, "/contact?interest=survey", "homepage footer CTA repeats the homepage's own survey CTA");
});

test("one footer: the layout renders SiteFooter and the old duplicated footer is gone", () => {
  const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");
  assert.match(layout, /<SiteFooter \/>/);
  assert.ok(!existsSync(resolve(root, "components/Footer.tsx")), "components/Footer.tsx should be removed");
});
