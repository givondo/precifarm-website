// Redirects and public copy rules from AGENTS.md: retired booking paths land on charging, the Swahili
// stubs land on English pages, and /download never promises a chatbot or an app store listing.
import { test } from "node:test";
import assert from "node:assert/strict";

test("retired and legacy paths redirect permanently to live pages", async () => {
  const config = (await import("@/next.config")).default;
  const redirects = await config.redirects!();
  const to = (src: string) => redirects.find((r: { source: string }) => r.source === src);
  assert.equal(to("/book")?.destination, "/charging");
  assert.equal(to("/book/:path*")?.destination, "/charging");
  for (const r of redirects) assert.equal(r.permanent, true, `${r.source} should be permanent`);
  const sources = redirects.map((r: { source: string }) => r.source);
  assert.equal(new Set(sources).size, sources.length, "a source is redirected twice");
  for (const r of redirects) assert.ok(!sources.includes(r.destination), `${r.source} redirects to another redirect (${r.destination})`);
});

test("security headers are sent on every route", async () => {
  const config = (await import("@/next.config")).default;
  const all = (await config.headers!()).find((h: { source: string }) => h.source === "/:path*");
  const keys = all!.headers.map((h: { key: string }) => h.key);
  for (const k of ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options", "Referrer-Policy"]) assert.ok(keys.includes(k), k);
  assert.equal(config.poweredByHeader, false);
});

test("/download copy makes no chatbot or app store claim", async () => {
  const { downloadPage, downloadPageFaqs } = await import("@/lib/download-page");
  const text = JSON.stringify([downloadPage, downloadPageFaqs]).toLowerCase();
  for (const w of ["chatbot", "play store", "google play", "app store", "ios app"]) assert.ok(!text.includes(w), `/download mentions "${w}"`);
});
