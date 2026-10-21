// Map and contact data that the Charging Hub and every footer rely on.
import { test } from "node:test";
import assert from "node:assert/strict";

test("Charging Hub sites: unique ids, inside Kenya, sane bay counts", async () => {
  const { chargingHubs, routePhases } = await import("@/lib/hub-locations");
  const ids = chargingHubs.map((h) => h.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate hub id");
  for (const h of chargingHubs) {
    assert.ok(h.lat > -4.9 && h.lat < 5.1 && h.lng > 33.8 && h.lng < 42.0, `${h.id} is outside Kenya (${h.lat}, ${h.lng})`);
    assert.ok(h.freeBays >= 0 && h.freeBays <= h.totalChargers, `${h.id} has ${h.freeBays} free of ${h.totalChargers}`);
    assert.ok(h.name.trim() && h.role.trim(), `${h.id} needs a name and role`);
    if (h.operator === "partner") assert.ok(h.partnerName, `${h.id} is a partner site without a partner name`);
  }
  for (const r of routePhases) for (const p of r.path) assert.ok(p.lat > -4.9 && p.lat < 5.1 && p.lng > 33.8 && p.lng < 42.0, `${r.id} route leaves Kenya`);
});

test("contact details are well formed", async () => {
  const { contact } = await import("@/lib/contact");
  const flat = JSON.stringify(contact);
  for (const m of flat.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []) assert.match(m, /@precifarm\.com$/, `unexpected address ${m}`);
  for (const t of flat.match(/tel:\+?\d+/g) ?? []) assert.match(t, /^tel:\+254\d{9}$/, `bad phone link ${t}`);
});
