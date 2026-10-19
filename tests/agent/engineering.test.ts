/**
 * Hand-computed cases for the ten Precifarm Agent engineering tools.
 * Run with: npm test
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  agentToolCatalogue,
  engineeringToolDefinitions,
  IZ_AL_PVC_METHOD_C_TWO_LOADED,
  minCsaForCurrent,
  runEngineeringTool,
  type ToolResult,
} from "@/lib/agent/tools/engineering";

const run = (name: string, args: Record<string, unknown>) => runEngineeringTool(name, args);
const ok = (res: ToolResult) => {
  assert.equal(res.data.error, undefined, `unexpected error: ${res.summary}`);
  return res;
};
const fails = (res: ToolResult, pattern?: RegExp) => {
  assert.equal(res.label, "assumed");
  assert.equal(typeof res.data.error, "string");
  if (pattern) assert.match(String(res.data.error), pattern);
};
const LABELS = new Set(["calculated", "estimated", "assumed", "needs site check"]);

describe("catalogue", () => {
  it("has ten tools, each with a schema and a runner", () => {
    assert.equal(agentToolCatalogue.length, 10);
    assert.deepEqual(
      engineeringToolDefinitions.map((d) => d.function.name).sort(),
      agentToolCatalogue.map((t) => t.name).sort(),
    );
    for (const t of agentToolCatalogue) {
      const res = run(t.name, {});
      assert.doesNotMatch(String(res.data.error ?? ""), /unknown tool/, t.name);
    }
  });

  it("rejects an unknown tool", () => fails(run("rm -rf", {}), /unknown tool/));
});

describe("calculateEvEnergy", () => {
  it("80 km at 18 kWh/100 km = 14.4 kWh/day", () => {
    const res = ok(run("calculateEvEnergy", { dailyKm: 80, kwhPer100km: 18 }));
    assert.equal(res.label, "calculated");
    assert.equal(res.data.kwhPerDay, 14.4);
    assert.equal(res.data.kwhPerMonth, 432);
  });
  it("e-boda 120 km at 4 kWh/100 km = 4.8 kWh/day", () => {
    assert.equal(ok(run("calculateEvEnergy", { dailyKm: 120, kwhPer100km: 4 })).data.kwhPerDay, 4.8);
  });
  it("accepts numeric strings and zero distance", () => {
    assert.equal(ok(run("calculateEvEnergy", { dailyKm: "0", kwhPer100km: "18" })).data.kwhPerDay, 0);
  });
  it("rejects negative, NaN and absurd input", () => {
    fails(run("calculateEvEnergy", { dailyKm: -5, kwhPer100km: 18 }), /at least/);
    fails(run("calculateEvEnergy", { dailyKm: "abc", kwhPer100km: 18 }), /number/);
    fails(run("calculateEvEnergy", { dailyKm: 80, kwhPer100km: 500 }), /at most/);
    fails(run("calculateEvEnergy", { dailyKm: 80 }), /required/);
  });
});

describe("calculateChargingTime", () => {
  it("AC 14.4 kWh at 7 kW, 90%: 2.06 h ideal, 2.29 h with losses, 16 kWh grid", () => {
    const res = ok(run("calculateChargingTime", { kwh: 14.4, chargerKw: 7 }));
    assert.equal(res.data.hoursIdeal, 2.06);
    assert.equal(res.data.hoursWithLosses, 2.29);
    assert.equal(res.data.gridKwh, 16);
    assert.equal(res.label, "calculated");
  });
  it("AC is capped by a 3.7 kW onboard charger", () => {
    const res = ok(run("calculateChargingTime", { kwh: 14.4, chargerKw: 7.4, vehicleMaxKw: 3.7 }));
    assert.equal(res.data.effectiveKw, 3.7);
    assert.equal(res.data.hoursIdeal, 3.89);
    assert.equal(res.data.hoursWithLosses, 4.32);
  });
  it("DC 40 kWh at 120 kW: 0.33 h at full power, 0.5 h with taper 0.7 and 95%, labelled estimated", () => {
    const res = ok(run("calculateChargingTime", { kwh: 40, chargerKw: 120, mode: "dc" }));
    assert.equal(res.data.efficiency, 0.95);
    assert.equal(res.data.dcAverageFactor, 0.7);
    assert.equal(res.data.hoursIdeal, 0.33);
    // 40 / (120 × 0.7 × 0.95) = 0.501 h
    assert.equal(res.data.hoursWithLosses, 0.5);
    assert.equal(res.data.gridKwh, 42.11);
    assert.equal(res.label, "estimated");
    assert.ok(res.notes?.some((n) => n.includes("35 to 43 kWh")));
  });
  it("120 kW DC for 30 min adds 35 to 43 kWh across the 0.63 to 0.75 factor range", () => {
    for (const dcAverageFactor of [0.63, 0.7, 0.75]) {
      const res = ok(run("calculateChargingTime", { kwh: 40, chargerKw: 120, mode: "dc", dcAverageFactor }));
      const added = Number(res.data.kwhIn30Min);
      assert.ok(added >= 35 && added <= 43, `factor ${dcAverageFactor}: ${added} kWh`);
      assert.equal(res.data.kwhIn30Min, Math.round(120 * dcAverageFactor * 0.95 * 0.5 * 100) / 100);
    }
    fails(run("calculateChargingTime", { kwh: 40, chargerKw: 120, mode: "dc", dcAverageFactor: 1.5 }), /dcAverageFactor/);
  });
  it("DC capped by an 80 kW vehicle: 0.5 h", () => {
    assert.equal(ok(run("calculateChargingTime", { kwh: 40, chargerKw: 120, mode: "DC", vehicleMaxKw: 80 })).data.hoursIdeal, 0.5);
  });
  it("rejects zero power, bad mode and efficiency out of range", () => {
    fails(run("calculateChargingTime", { kwh: 10, chargerKw: 0 }));
    fails(run("calculateChargingTime", { kwh: 10, chargerKw: 7, mode: "wireless" }), /mode/);
    fails(run("calculateChargingTime", { kwh: 10, chargerKw: 7, efficiency: 1.2 }));
  });
});

describe("calculatePeakLoad", () => {
  it("[3, 2, 1.5] × 0.7 + 7.4 kW EV = 11.95 kW, 2.3 kW headroom on 15 kVA", () => {
    const res = ok(run("calculatePeakLoad", { loadsKw: [3, 2, 1.5], diversityFactor: 0.7, evChargerKw: 7.4, supplyKva: 15 }));
    assert.equal(res.data.sumKw, 6.5);
    assert.equal(res.data.peakKw, 11.95);
    assert.equal(res.data.headroomKw, 2.3);
    assert.equal(res.label, "estimated");
  });
  it("flags a peak over the supply", () => {
    const res = ok(run("calculatePeakLoad", { loadsKw: [5, 5], evChargerKw: 7, supplyKva: 10 }));
    assert.equal(res.data.peakKw, 14);
    assert.equal(res.data.headroomKw, -4.5);
    assert.ok(res.notes?.some((n) => n.includes("exceeds supply")));
  });
  it("rejects empty, negative, non-numeric and absurd loads", () => {
    fails(run("calculatePeakLoad", { loadsKw: [] }));
    fails(run("calculatePeakLoad", { loadsKw: [-1] }));
    fails(run("calculatePeakLoad", { loadsKw: ["a"] }));
    fails(run("calculatePeakLoad", { loadsKw: [null] }));
    fails(run("calculatePeakLoad", { loadsKw: [1e9] }));
    fails(run("calculatePeakLoad", { loadsKw: "5" }));
  });
});

describe("sizePvSystem", () => {
  it("40 kWh/day at 5.5 PSH, PR 0.78: 9.32 kWp, 17 × 550 W", () => {
    const res = ok(run("sizePvSystem", { dailyKwh: 40 }));
    assert.equal(res.data.requiredKwp, 9.32);
    assert.equal(res.data.panels, 17);
    assert.equal(res.data.installedKwp, 9.35);
    assert.equal(res.data.dailyYieldKwh, 40.1);
    assert.equal(res.data.roofAreaM2, 44);
    assert.equal(res.label, "estimated");
  });
  it("18 kWh/day at 5 PSH, PR 0.8, 450 W: 4.5 kWp, 10 panels, area scales with module size", () => {
    const res = ok(run("sizePvSystem", { dailyKwh: 18, peakSunHours: 5, performanceRatio: 0.8, panelWatts: 450 }));
    assert.equal(res.data.requiredKwp, 4.5);
    assert.equal(res.data.panels, 10);
    assert.equal(res.data.roofAreaM2, 21);
    assert.equal(res.label, "calculated");
  });
  it("rejects implausible sun hours and PR", () => {
    fails(run("sizePvSystem", { dailyKwh: 10, peakSunHours: 12 }));
    fails(run("sizePvSystem", { dailyKwh: 10, performanceRatio: 1.2 }));
    fails(run("sizePvSystem", { dailyKwh: 0 }));
  });
});

describe("sizeBattery", () => {
  it("3 kW for 4 h: 12 kWh / (0.9 × 0.92) = 14.5 kWh, 3 × 5 kWh", () => {
    const res = ok(run("sizeBattery", { criticalLoadKw: 3, backupHours: 4 }));
    assert.equal(res.data.nameplateKwh, 14.5);
    assert.equal(res.data.modules, 3);
    assert.equal(res.data.sizedKwh, 15);
  });
  it("1.1 kW for 10 h on 2.56 kWh modules needs 6 (efficiency pushes it past 5)", () => {
    const res = ok(run("sizeBattery", { criticalLoadKw: 1.1, backupHours: 10, roundToKwh: 2.56 }));
    assert.equal(res.data.nameplateKwh, 13.3);
    assert.equal(res.data.modules, 6);
    assert.equal(res.data.sizedKwh, 15.36);
  });
  it("rejects shallow DoD and zero load", () => {
    fails(run("sizeBattery", { criticalLoadKw: 3, backupHours: 4, depthOfDischarge: 0.3 }));
    fails(run("sizeBattery", { criticalLoadKw: 0, backupHours: 4 }));
  });
});

describe("sizeInverter", () => {
  it("3 kW peak with 9.35 kWp PV: PV sets 7.19 kW, rated 8 kW", () => {
    const res = ok(run("sizeInverter", { peakLoadKw: 3, pvKwp: 9.35 }));
    assert.equal(res.data.forLoadKw, 3.75);
    assert.equal(res.data.forPvKw, 7.19);
    assert.equal(res.data.recommendedKw, 8);
  });
  it("6 kW peak: 7.5 kW, rated 8 kW, 20 kW surge flagged", () => {
    const res = ok(run("sizeInverter", { peakLoadKw: 6, surgeKw: 20 }));
    assert.equal(res.data.recommendedKw, 8);
    assert.ok(res.notes?.some((n) => n.includes("surge")));
  });
  it("above the standard list returns null and still flags surge", () => {
    const res = ok(run("sizeInverter", { peakLoadKw: 90, surgeKw: 50 }));
    assert.equal(res.data.recommendedKw, null);
    assert.ok(res.notes?.some((n) => n.includes("surge")));
  });
});

describe("calculateVoltageDrop", () => {
  it("32 A, 35 m, single-phase 240 V copper, 5%: 4.2 mm² minimum, 6 mm² gives 3.5%", () => {
    const res = ok(run("calculateVoltageDrop", { currentA: 32, lengthM: 35, csaMm2: 6 }));
    assert.equal(res.data.voltageV, 240);
    assert.equal(res.data.minimumCsaForDropMm2, 4.2);
    assert.equal(res.data.minimumCsaForCurrentMm2, 4);
    assert.equal(res.data.recommendedCsaMm2, 6);
    assert.equal(res.data.dropV, 8.4);
    assert.equal(res.data.dropPct, 3.5);
    assert.equal(res.data.pass, true);
  });
  it("same run at 3% needs 10 mm²", () => {
    assert.equal(ok(run("calculateVoltageDrop", { currentA: 32, lengthM: 35, limitPct: 3 })).data.recommendedCsaMm2, 10);
  });
  it("63 A over 2 m is sized by current (10 mm²), not by drop (1.5 mm²)", () => {
    const res = ok(run("calculateVoltageDrop", { currentA: 63, lengthM: 2, csaMm2: 1.5 }));
    assert.equal(res.data.minimumCsaForCurrentMm2, 10);
    assert.equal(res.data.recommendedCsaMm2, 10);
    assert.equal(res.data.pass, true);
    assert.equal(res.data.currentCapacityOk, false);
  });
  it("three-phase 32 A, 50 m at 415 V: 3.01 mm², 4 mm² gives 3.76%", () => {
    const res = ok(run("calculateVoltageDrop", { currentA: 32, lengthM: 50, system: "3-phase", csaMm2: 4 }));
    assert.equal(res.data.system, "three-phase");
    assert.equal(res.data.voltageV, 415);
    assert.equal(res.data.minimumCsaForDropMm2, 3.01);
    assert.equal(res.data.recommendedCsaMm2, 4);
    assert.equal(res.data.dropPct, 3.76);
  });
  it("aluminium 100 A, 20 m: 16 mm² for drop, 35 mm² for current", () => {
    const res = ok(run("calculateVoltageDrop", { currentA: 100, lengthM: 20, conductor: "aluminum" }));
    assert.equal(res.data.conductor, "aluminium");
    assert.equal(res.data.minimumCsaForDropMm2, 12);
    assert.equal(res.data.recommendedCsaMm2, 35);
  });
  it("derating 0.8 lifts 32 A from 4 to 6 mm²", () => {
    assert.equal(ok(run("calculateVoltageDrop", { currentA: 32, lengthM: 5, deratingFactor: 0.8 })).data.minimumCsaForCurrentMm2, 6);
  });
  it("rejects unknown system or conductor instead of silently using single-phase copper", () => {
    fails(run("calculateVoltageDrop", { currentA: 32, lengthM: 35, system: "triple" }), /system/);
    fails(run("calculateVoltageDrop", { currentA: 32, lengthM: 35, conductor: "gold" }), /conductor/);
  });
  it("DC needs an explicit voltage", () => {
    fails(run("calculateVoltageDrop", { currentA: 50, lengthM: 10, system: "dc" }), /voltageV/);
    assert.equal(ok(run("calculateVoltageDrop", { currentA: 50, lengthM: 10, system: "dc", voltageV: 48 })).data.voltageV, 48);
  });
});

describe("current-carrying screen, IEC 60364-5-52 method C, PVC, 30 °C", () => {
  // Boundary currents: exactly the tabulated Iz passes, 1 A more needs the next size.
  const size = (a: number, conductor: "copper" | "aluminium", threePhase: boolean) => minCsaForCurrent(a, { conductor, threePhase });
  it("aluminium two loaded conductors matches Table B.52.2 (EUPEN and Schneider EIG Fig. G21 agree)", () => {
    const expected: Array<[number, number]> = [[16, 66], [25, 83], [35, 103], [50, 125], [95, 195], [150, 261], [240, 352]];
    for (const [csa, iz] of expected) {
      assert.equal(IZ_AL_PVC_METHOD_C_TWO_LOADED[csa], iz, `${csa} mm²`);
      assert.equal(size(iz, "aluminium", false), csa, `${iz} A fits ${csa} mm²`);
    }
    assert.equal(size(67, "aluminium", false), 25);
    assert.equal(size(353, "aluminium", false), null);
  });
  it("85 A single-phase aluminium needs 35 mm²: 25 mm² carries 83 A, not the 87 A the old 0.78 ratio gave", () => {
    assert.equal(size(85, "aluminium", false), 35);
  });
  it("copper matches Table B.52.2 (two loaded) and B.52.4 (three loaded)", () => {
    assert.equal(size(27, "copper", false), 2.5);
    assert.equal(size(85, "copper", false), 16);
    assert.equal(size(258, "copper", false), 95);
    assert.equal(size(259, "copper", false), 120);
    assert.equal(size(24, "copper", true), 2.5);
    assert.equal(size(76, "copper", true), 16);
    assert.equal(size(77, "copper", true), 25);
    assert.equal(size(223, "copper", true), 95);
  });
  it("three-phase aluminium refuses and says an engineer must size it", () => {
    fails(run("calculateVoltageDrop", { currentA: 100, lengthM: 20, conductor: "aluminium", system: "three-phase" }), /needs an engineer/);
  });
});

describe("sizeProtection", () => {
  it("7 kW single-phase 240 V EV: 29.2 A, 36.5 A sizing, 40 A MCB, 6 mm² minimum, RCD", () => {
    const res = ok(run("sizeProtection", { loadKw: 7 }));
    assert.equal(res.data.voltageV, 240);
    assert.equal(res.data.designCurrentA, 29.2);
    assert.equal(res.data.sizingCurrentA, 36.5);
    assert.equal(res.data.breakerA, 40);
    assert.equal(res.data.minCableCsaMm2, 6);
    assert.match(String(res.data.rcd), /6 mA DC/);
  });
  it("22 kW three-phase 415 V: 30.6 A, 40 A MCB", () => {
    const res = ok(run("sizeProtection", { loadKw: 22, system: "three-phase" }));
    assert.equal(res.data.designCurrentA, 30.6);
    assert.equal(res.data.breakerA, 40);
    assert.equal(res.data.poles, "3P or 4P");
  });
  it('treats the string "false" as false', () => {
    const res = ok(run("sizeProtection", { loadKw: 7, continuous: "false", isEvCharger: "false" }));
    assert.equal(res.data.sizingCurrentA, 29.2);
    assert.equal(res.data.breakerA, 32);
    assert.equal(res.data.rcd, undefined);
  });
  it("rejects an unknown system", () => fails(run("sizeProtection", { loadKw: 7, system: "dc" }), /system/));
});

describe("calculateEnergyCost", () => {
  it("14.4 kWh at the battery, 90%, KES 24.70: 16 kWh grid, KES 395/day", () => {
    const res = ok(run("calculateEnergyCost", { kwhPerDay: 14.4, kesPerKwh: 24.7, dailyKm: 80, fuelLPer100km: 8, kesPerLitre: 190 }));
    assert.equal(res.data.gridKwhPerDay, 16);
    assert.equal(res.data.kesPerDay, 395);
    assert.equal(res.data.kesPerMonth, 11856);
    assert.equal(res.data.fuelKesPerDay, 1216);
    assert.equal(res.data.savingKesPerYear, 299592);
  });
  it("10 kWh metered grid energy at KES 27.81: KES 278/day", () => {
    const res = ok(run("calculateEnergyCost", { kwhPerDay: 10, kesPerKwh: 27.81, chargingEfficiency: 1 }));
    assert.equal(res.data.kesPerDay, 278);
    assert.equal(res.data.kesPerMonth, 8343);
  });
  it("rejects a missing or negative tariff", () => {
    fails(run("calculateEnergyCost", { kwhPerDay: 10 }), /required/);
    fails(run("calculateEnergyCost", { kwhPerDay: 10, kesPerKwh: -1 }));
  });
});

describe("lookupPrecifarmProduct", () => {
  it("Spark needs a dedicated 16 A outlet; 13 A sockets cap at 10 A", () => {
    const res = ok(run("lookupPrecifarmProduct", { productId: "spark" }));
    const spark = (res.data.detail as Record<string, { supply: string }>).spark;
    assert.match(spark.supply, /16 A/);
    assert.match(spark.supply, /10 A/);
  });
  it("Corridor states 35 to 43 kWh in 30 minutes", () => {
    const res = ok(run("lookupPrecifarmProduct", { productId: "corridor" }));
    assert.match(JSON.stringify(res.data.detail), /35 to 43 kWh/);
  });
  it("all returns seven products; unknown is rejected", () => {
    assert.equal((ok(run("lookupPrecifarmProduct", { productId: "all" })).data.products as string[]).length, 7);
    fails(run("lookupPrecifarmProduct", { productId: "tesla" }));
  });
});

describe("every tool result carries an evidence label and a summary", () => {
  const cases: Array<[string, Record<string, unknown>]> = [
    ["calculateEvEnergy", { dailyKm: 50, kwhPer100km: 16 }],
    ["calculateChargingTime", { kwh: 10, chargerKw: 3.3 }],
    ["calculatePeakLoad", { loadsKw: [1] }],
    ["sizePvSystem", { dailyKwh: 5 }],
    ["sizeBattery", { criticalLoadKw: 1, backupHours: 2 }],
    ["sizeInverter", { peakLoadKw: 2 }],
    ["calculateVoltageDrop", { currentA: 16, lengthM: 20 }],
    ["sizeProtection", { loadKw: 3.3 }],
    ["calculateEnergyCost", { kwhPerDay: 5, kesPerKwh: 25 }],
    ["lookupPrecifarmProduct", { productId: "pulse" }],
  ];
  for (const [name, args] of cases) {
    it(name, () => {
      const res = ok(run(name, args));
      assert.ok(LABELS.has(res.label));
      assert.ok(res.summary.length > 10);
    });
  }
});
