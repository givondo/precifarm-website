// Agent, platforms, research, partners and engineering pages: numbers come from the engineering kernel or the
// register, simulations stay labelled, /download stays cloud only, and partner journeys use real enquiry keys.
import { test } from "node:test";
import assert from "node:assert/strict";

test("Agent workspace: every task is a real kernel call and its result matches a fresh run", async () => {
  const { workspaceBriefs } = await import("@/lib/agent-workspace");
  const { runEngineeringTool, agentToolCatalogue } = await import("@/lib/agent/tools/engineering");
  const names = new Set<string>(agentToolCatalogue.map((t) => t.name));
  assert.equal(workspaceBriefs.length, 3);
  for (const b of workspaceBriefs) {
    const run = b.run(b.defaults);
    assert.ok(run.tasks.length >= 4, `${b.id} has a plan`);
    for (const t of run.tasks) {
      assert.ok(names.has(t.tool), `${b.id}: ${t.tool} is a kernel tool`);
      assert.deepEqual(t.result, runEngineeringTool(t.tool, t.args), `${b.id}: ${t.tool} result is the kernel's`);
      assert.ok(!("error" in t.result.data), `${b.id}: ${t.tool} ran without an input error`);
    }
    assert.ok(run.diagram.nodes.length && run.parts.length && run.result.figures.length);
  }
});

test("Agent workspace: extremes of every control still produce a result", async () => {
  const { workspaceBriefs } = await import("@/lib/agent-workspace");
  for (const b of workspaceBriefs)
    for (const pick of ["min", "max"] as const) {
      const v = Object.fromEntries(b.controls.map((c) => [c.id, c[pick]]));
      const run = b.run(v);
      assert.ok(run.result.headline.length > 0, `${b.id} at ${pick}`);
    }
});

test("wireless model: coupling and efficiency fall with misalignment and gap; protection stops transfer", async () => {
  const { coupling, linkEfficiency, simulate, wptModel } = await import("@/lib/wireless-wpt-model");
  assert.ok(coupling(0, 0, 150) > coupling(100, 0, 150));
  assert.ok(coupling(0, 0, 120) > coupling(0, 0, 220));
  assert.ok(linkEfficiency(0.2, 200) > linkEfficiency(0.02, 200));
  assert.ok(linkEfficiency(0.2, 200) < 1);
  assert.equal(simulate({ x: 0, y: 0, gap: 150, q: 200, foreignObject: true }).transferring, false);
  assert.equal(simulate({ x: wptModel.WINDOW_MM + 10, y: 0, gap: 150, q: 200, foreignObject: false }).state, "outside");
});

test("research page keeps wireless efficiency as not yet measured", async () => {
  const { researchPage, wirelessEvidence } = await import("@/lib/research-page");
  const specs = (await import("@/lib/generated/product-specs")).default as unknown as { products: { code: string; claims: { spec_id: string; text: string }[] }[] };
  const wpt04 = specs.products.find((p) => p.code === "WPT")?.claims.find((c) => c.spec_id === "WPT-04");
  assert.equal(wpt04?.text, "Not yet measured");
  assert.ok(researchPage.hero.stats.some((s) => s.value === "Not yet measured"));
  assert.equal(wirelessEvidence.find((e) => e.item === "Transfer efficiency")?.status, "Not yet measured");
});

test("/download: cloud only, and a download button only for the real OpenCode config", async () => {
  const { platformOptions, downloadPage, downloadPageFaqs } = await import("@/lib/download-page");
  const files = platformOptions.filter((p) => p.primary.kind === "file");
  assert.deepEqual(
    files.map((f) => f.primary.href),
    ["/api/agent/opencode-config"],
  );
  const text = JSON.stringify([platformOptions, downloadPage, downloadPageFaqs]).toLowerCase();
  for (const w of ["chatbot", "play store", "google play", "app store", "ios", "iphone", ".apk", "local model", "offline"]) assert.ok(!text.includes(w), `/download mentions "${w}"`);
});

test("partner journeys keep inbound anchors and use existing enquiry keys", async () => {
  const { partnerJourneys } = await import("@/lib/partners");
  const { contactInterests } = await import("@/lib/contact-interests");
  const ids = partnerJourneys.flatMap((j) => [j.id, ...(j.sub ? [j.sub.id] : [])]);
  for (const id of ["hub-hosts", "fleet-logistics", "boda-operators", "dealers-installers", "finance-oem"]) assert.ok(ids.includes(id), `#${id} missing`);
  for (const j of partnerJourneys) {
    assert.ok(j.cta.interest in contactInterests, `${j.id} uses unknown interest ${j.cta.interest}`);
    if (j.sub) assert.ok(j.sub.cta.interest in contactInterests);
  }
});

test("engineering architectures quote the register, never an empty claim", async () => {
  const { architectures, assessmentTypes } = await import("@/lib/engineering-page");
  const { contactInterests } = await import("@/lib/contact-interests");
  for (const a of architectures) for (const r of a.register) assert.ok(r.value.length > 0, `${a.id} ${r.label} not found in the register`);
  for (const t of assessmentTypes) assert.ok(t.interest in contactInterests);
});
