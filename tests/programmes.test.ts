// Six-programme pivot (1 Nov 2026): the site carries Pulse, Pulse+, Corridor, Boda Hub, wireless research and
// the Agent Harness. Spark, Pod energy storage, Depot and the modular energy family are retired; Lipa Pole Pole
// stays as Pulse financing. Specifications come from PRECIFARM_MASTER, never typed by hand.
import { test } from "node:test";
import assert from "node:assert/strict";

const RETIRED = /\bSpark\b|Pod energy storage|\bPod\b|Depot charging station|\bP1 Go\b|\bP2 Home\b|Mini Stack|MegaPack/;

test("the site publishes five programmes from the engineering export; the Agent Harness is not on the site (HD-046)", async () => {
  const { programmes } = await import("@/lib/programmes");
  const codes = programmes.map((p) => p.code).sort();
  assert.deepEqual(codes, ["BODAHUB", "CORRIDOR", "PULSE7K2", "PULSEPLUS", "WPT"]);
  const status = Object.fromEntries(programmes.map((p) => [p.code, p.status]));
  assert.equal(status.PULSE7K2, "available");
  assert.equal(status.PULSEPLUS, "development");
  assert.equal(status.CORRIDOR, "pilot");
  assert.equal(status.WPT, "research");
  for (const p of programmes) assert.ok(p.claims.length > 0, `${p.code} has no published claims`);
});

test("no published figure is presented as tested without a test record", async () => {
  const { programmes, evidenceNote } = await import("@/lib/programmes");
  for (const p of programmes)
    for (const c of p.claims) {
      if (c.verification !== "tested" && c.verification !== "certified") assert.notEqual(evidenceNote(c), "Tested", `${p.code} ${c.spec_id}`);
      // "certified OEM" names bought-in equipment that must carry its maker's certification (HD-026); it is not a Precifarm test claim.
      const text = c.text.replace(/certified OEM/gi, "OEM");
      assert.ok(!/certified|tested/i.test(text) || /target|not/i.test(text), `${p.code} ${c.spec_id} text implies a test: ${c.text}`);
    }
});

test("retired products are gone from navigation, footer, product range and LLM summary", async () => {
  const bm = await import("@/lib/brand-messaging");
  const sn = await import("@/lib/site-nav");
  const hp = await import("@/lib/home-products");
  const text = JSON.stringify([bm.siteNavGroups, sn.footerGroups, bm.homeScenarios, bm.productRangeSection, bm.brand, hp.homeProducts, hp.productNames, hp.flagshipProductDetails]);
  assert.ok(!RETIRED.test(text), `retired product named: ${text.match(RETIRED)?.[0]}`);
  assert.ok(text.includes("Lipa Pole Pole"), "Lipa Pole Pole must stay");
});

test("Pulse charge-time claim follows the register: under two hours, not 90 minutes", async () => {
  const bm = await import("@/lib/brand-messaging");
  const hc = await import("@/lib/home-charging");
  const hp = await import("@/lib/home-products");
  const text = JSON.stringify([bm.heroStats, bm.brand, hc.privateHouseChargingPage, hc.privateHouseChargingPackages, hp.productChargeTimes]);
  assert.ok(!/90 ?min/i.test(text), "Pulse still claims about 90 minutes");
});

test("modular energy routes redirect to /charging and /ai redirects to Precifarm Agent", async () => {
  const config = (await import("@/next.config")).default;
  const redirects = await config.redirects!();
  const to = (src: string) => redirects.find((r: { source: string }) => r.source === src);
  assert.equal(to("/charging/modular-energy")?.destination, "/charging");
  assert.equal(to("/charging/modular-energy/:path*")?.destination, "/charging");
  assert.equal(to("/ai")?.destination, "/agent", "/ai must redirect to /agent");
  const { existsSync } = await import("node:fs");
  const { resolve } = await import("node:path");
  assert.ok(!existsSync(resolve(import.meta.dirname, "../app/charging/modular-energy")), "modular energy pages still exist");
  for (const p of ["../app/charging/pulse-plus/page.tsx", "../app/charging/corridor/page.tsx", "../app/agent/page.tsx"])
    assert.ok(existsSync(resolve(import.meta.dirname, p)), `${p} missing`);
});

test("no page describes Precifarm AI as private, local or on your own machine", async () => {
  const { readdirSync, readFileSync, statSync } = await import("node:fs");
  const { resolve, join } = await import("node:path");
  const root = resolve(import.meta.dirname, "..");
  const hits: string[] = [];
  const walk = (d: string) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(n) && !p.includes("generated") && /local-first|on your own machine|Agent Harness|private AI/i.test(readFileSync(p, "utf8"))) hits.push(p.slice(root.length + 1));
    }
  };
  for (const d of ["app", "lib", "components"]) walk(join(root, d));
  assert.deepEqual(hits, [], `still describes private or local AI: ${hits.join(", ")}`);
});

test("Corridor DC carries no public price until a site is commissioned and costed", async () => {
  const { readdirSync, readFileSync, statSync } = await import("node:fs");
  const { resolve, join } = await import("node:path");
  const root = resolve(import.meta.dirname, "..");
  const hits: string[] = [];
  const walk = (d: string) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(ts|tsx|md|mdx)$/.test(n) && /KES ?39|39\/kWh/.test(readFileSync(p, "utf8"))) hits.push(p.slice(root.length + 1));
    }
  };
  for (const d of ["app", "lib", "components"]) walk(join(root, d));
  assert.deepEqual(hits, [], `KES 39 price still published in ${hits.join(", ")}`);
});

test("every published programme claim list carries David's approval", async () => {
  const { programmes } = await import("@/lib/programmes");
  for (const p of programmes) assert.match(p.approval, /^Approved by Sayia David Givondo/, `${p.code} claims are not approved`);
});
