import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hasEngineeringFigures } from "@/lib/agent/untooled";

describe("hasEngineeringFigures", () => {
  it("ignores standard names, connector types and step numbers", () => {
    for (const text of [
      "Use a Type 2 connector.",
      "Follow IEC 60364-5-52 and IEC 61851-1.",
      "Step 3: confirm the earthing with BS 7671.",
      "Both CCS2 and CHAdeMO exist; Mode 3 is the AC standard.",
      "Plan A is the wallbox.",
    ]) {
      assert.equal(hasEngineeringFigures(text), false, text);
    }
  });
  it("flags numbers with engineering units or currency", () => {
    for (const text of [
      "A 7 kW wallbox",
      "about 14.4 kWh a day",
      "a 40 A MCB",
      "240 V single-phase",
      "6 mm² cable",
      "use 10 mm2",
      "35 m from the board",
      "a 3% drop",
      "KES 85,000 installed",
      "costs 85,000 KES",
      "$1,200 for the charger",
      "takes 2.5 hours",
      "about 4 h",
      "30 min at 120 kW",
      "a 9.35 kWp array",
    ]) {
      assert.equal(hasEngineeringFigures(text), true, text);
    }
  });
});
