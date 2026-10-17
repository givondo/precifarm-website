/**
 * Deterministic engineering tools. The Agent orchestrates; these run the maths.
 * Every result carries an evidence label so the UI can show what was calculated,
 * estimated or assumed. Pure functions, no I/O, safe to unit test.
 */

import { precifarmProducts, type PrecifarmProductId } from "@/lib/agent/products";

export type EvidenceLabel = "calculated" | "estimated" | "assumed" | "needs site check";

export type ToolResult = {
  label: EvidenceLabel;
  summary: string;
  data: Record<string, number | string | boolean | null | Array<string | number> | Record<string, unknown>>;
  /** Assumptions or limits the engineer must review. */
  notes?: string[];
};

/** Public catalogue for the Agent page, derived from the same definitions the model sees. */
export const agentToolCatalogue = [
  { name: "calculateEvEnergy", label: "EV energy" },
  { name: "calculateChargingTime", label: "Charge time" },
  { name: "calculatePeakLoad", label: "Peak load" },
  { name: "sizePvSystem", label: "Solar" },
  { name: "sizeBattery", label: "Battery" },
  { name: "sizeInverter", label: "Inverter" },
  { name: "calculateVoltageDrop", label: "Cables" },
  { name: "sizeProtection", label: "Protection" },
  { name: "calculateEnergyCost", label: "Costs" },
  { name: "lookupPrecifarmProduct", label: "Products" },
] as const;

export type EngineeringToolName = (typeof agentToolCatalogue)[number]["name"];

/* ------------------------------------------------------------------ */
/* Tool schemas (OpenAI-compatible function calling)                   */
/* ------------------------------------------------------------------ */

const fn = (
  name: EngineeringToolName,
  description: string,
  properties: Record<string, unknown>,
  required: string[],
) => ({
  type: "function" as const,
  function: { name, description, parameters: { type: "object", properties, required } },
});

export const engineeringToolDefinitions = [
  fn(
    "calculateEvEnergy",
    "Daily EV energy (kWh/day) from daily distance and vehicle consumption.",
    {
      dailyKm: { type: "number", description: "Typical daily driving in km" },
      kwhPer100km: { type: "number", description: "Vehicle consumption in kWh/100 km (typical 15 to 20 for cars, 3 to 5 for e-bodas)" },
    },
    ["dailyKm", "kwhPer100km"],
  ),
  fn(
    "calculateChargingTime",
    "Hours to deliver an amount of energy at a charger power. Returns ideal hours and hours including charging losses.",
    {
      kwh: { type: "number", description: "Energy to deliver to the battery in kWh" },
      chargerKw: { type: "number", description: "Charger power in kW (limited by the vehicle's onboard charger for AC)" },
      efficiency: { type: "number", description: "Charging efficiency 0.5 to 1 (default 0.9)" },
    },
    ["kwh", "chargerKw"],
  ),
  fn(
    "calculatePeakLoad",
    "Peak demand estimate from connected loads with a diversity factor, optionally checked against the supply size.",
    {
      loadsKw: { type: "array", items: { type: "number" }, description: "Connected loads in kW" },
      diversityFactor: { type: "number", description: "0 to 1 diversity applied to the non-EV sum (default 0.7)" },
      evChargerKw: { type: "number", description: "EV charger kW, added at full rating (continuous load, no diversity)" },
      supplyKva: { type: "number", description: "Available supply in kVA, if known" },
    },
    ["loadsKw"],
  ),
  fn(
    "sizePvSystem",
    "Size a solar PV array from daily energy need. Returns kWp, panel count and expected yield.",
    {
      dailyKwh: { type: "number", description: "Daily energy the PV should supply in kWh" },
      peakSunHours: { type: "number", description: "Peak sun hours (default 5.5, typical for much of Kenya; use site data when available)" },
      performanceRatio: { type: "number", description: "System performance ratio 0.5 to 0.95 (default 0.78)" },
      panelWatts: { type: "number", description: "Module rating in W (default 550)" },
    },
    ["dailyKwh"],
  ),
  fn(
    "sizeBattery",
    "Battery backup size from critical load and backup hours, with depth of discharge and module rounding.",
    {
      criticalLoadKw: { type: "number", description: "Average critical load during backup in kW" },
      backupHours: { type: "number", description: "Hours of backup required" },
      depthOfDischarge: { type: "number", description: "Usable fraction 0.5 to 1 (default 0.9 for LiFePO4)" },
      roundToKwh: { type: "number", description: "Module size to round up to in kWh (default 2.56, the Precifarm Energy Module)" },
    },
    ["criticalLoadKw", "backupHours"],
  ),
  fn(
    "sizeInverter",
    "Size an inverter from peak load and optional PV array, rounded to a standard rating.",
    {
      peakLoadKw: { type: "number", description: "Peak simultaneous AC load in kW" },
      pvKwp: { type: "number", description: "PV array size in kWp, if any" },
      margin: { type: "number", description: "Continuous rating margin (default 1.25)" },
      surgeKw: { type: "number", description: "Largest motor or compressor starting load in kW, if any" },
    },
    ["peakLoadKw"],
  ),
  fn(
    "calculateVoltageDrop",
    "Voltage drop for a cable run (resistive method). Checks against a limit and recommends the smallest standard size that passes.",
    {
      currentA: { type: "number", description: "Design current in A" },
      lengthM: { type: "number", description: "One-way cable length in m" },
      csaMm2: { type: "number", description: "Conductor cross-section in mm² (if omitted, only the recommendation is returned)" },
      system: { type: "string", enum: ["single-phase", "three-phase", "dc"], description: "Default single-phase" },
      voltageV: { type: "number", description: "Nominal voltage (default 230 single-phase, 400 three-phase)" },
      conductor: { type: "string", enum: ["copper", "aluminium"], description: "Default copper" },
      limitPct: { type: "number", description: "Allowed drop in percent (default 5; 3 is a common target for final circuits)" },
    },
    ["currentA", "lengthM"],
  ),
  fn(
    "sizeProtection",
    "Design current and protective device for a circuit, including RCD type for EV chargers.",
    {
      loadKw: { type: "number", description: "Load in kW" },
      system: { type: "string", enum: ["single-phase", "three-phase"], description: "Default single-phase" },
      voltageV: { type: "number", description: "Nominal voltage (default 230 or 400)" },
      powerFactor: { type: "number", description: "Default 1.0 for EV chargers" },
      continuous: { type: "boolean", description: "Continuous load such as EV charging (default true, applies 1.25 factor)" },
      isEvCharger: { type: "boolean", description: "Adds EV-specific RCD and earthing notes (default true)" },
    },
    ["loadKw"],
  ),
  fn(
    "calculateEnergyCost",
    "Daily, monthly and yearly energy cost, with an optional fuel comparison for the same distance.",
    {
      kwhPerDay: { type: "number", description: "Energy per day in kWh" },
      kesPerKwh: { type: "number", description: "Tariff in KES/kWh (ask the user or label as assumed)" },
      dailyKm: { type: "number", description: "Daily distance, for the fuel comparison" },
      fuelLPer100km: { type: "number", description: "Comparable fuel vehicle consumption in L/100 km" },
      kesPerLitre: { type: "number", description: "Fuel price in KES/L" },
    },
    ["kwhPerDay", "kesPerKwh"],
  ),
  fn(
    "lookupPrecifarmProduct",
    "Look up Precifarm products (rating, use, price, availability). Use before recommending any Precifarm hardware.",
    {
      productId: {
        type: "string",
        enum: ["pulse", "spark", "pod", "depot", "corridor", "boda-hub", "lipa-pole-pole", "all"],
        description: "Product to look up, or all",
      },
    },
    ["productId"],
  ),
] as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

class ToolInputError extends Error {}

function num(args: Record<string, unknown>, key: string, opts: { min?: number; max?: number; def?: number } = {}): number {
  const raw = args[key];
  if (raw === undefined || raw === null || raw === "") {
    if (opts.def !== undefined) return opts.def;
    throw new ToolInputError(`${key} is required`);
  }
  const v = typeof raw === "string" ? Number(raw) : raw;
  if (typeof v !== "number" || !Number.isFinite(v)) throw new ToolInputError(`${key} must be a number`);
  if (opts.min !== undefined && v < opts.min) throw new ToolInputError(`${key} must be at least ${opts.min}`);
  if (opts.max !== undefined && v > opts.max) throw new ToolInputError(`${key} must be at most ${opts.max}`);
  return v;
}

function optNum(args: Record<string, unknown>, key: string, opts: { min?: number; max?: number } = {}): number | undefined {
  const raw = args[key];
  if (raw === undefined || raw === null || raw === "") return undefined;
  return num(args, key, opts);
}

const r = (v: number, dp = 2) => Number(v.toFixed(dp));

const STANDARD_CSA_MM2 = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
const STANDARD_BREAKER_A = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250];
const STANDARD_INVERTER_KW = [1, 1.5, 2, 3, 3.6, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100];
/** Resistivity at about 70 °C conductor temperature, Ω·mm²/m */
const RESISTIVITY = { copper: 0.0225, aluminium: 0.036 } as const;

const nextUp = (list: number[], v: number) => list.find((x) => x >= v - 1e-9) ?? null;

/* ------------------------------------------------------------------ */
/* Runner                                                              */
/* ------------------------------------------------------------------ */

export function runEngineeringTool(name: string, rawArgs: unknown): ToolResult {
  const args = (rawArgs && typeof rawArgs === "object" ? rawArgs : {}) as Record<string, unknown>;
  try {
    return dispatch(name, args);
  } catch (e) {
    const message = e instanceof Error ? e.message : "invalid input";
    return {
      label: "assumed",
      summary: `Could not run ${name}: ${message}. Ask the user for the missing value or state an assumption.`,
      data: { error: message },
    };
  }
}

function dispatch(name: string, args: Record<string, unknown>): ToolResult {
  switch (name) {
    case "calculateEvEnergy": {
      const dailyKm = num(args, "dailyKm", { min: 0, max: 2000 });
      const kwhPer100km = num(args, "kwhPer100km", { min: 1, max: 200 });
      const kwhPerDay = (dailyKm * kwhPer100km) / 100;
      return {
        label: "calculated",
        summary: `${dailyKm} km/day at ${kwhPer100km} kWh/100 km gives ${r(kwhPerDay)} kWh/day at the battery.`,
        data: { dailyKm, kwhPer100km, kwhPerDay: r(kwhPerDay), kwhPerMonth: r(kwhPerDay * 30, 0) },
      };
    }

    case "calculateChargingTime": {
      const kwh = num(args, "kwh", { min: 0, max: 2000 });
      const chargerKw = num(args, "chargerKw", { min: 0.1, max: 1000 });
      const efficiency = num(args, "efficiency", { min: 0.5, max: 1, def: 0.9 });
      const ideal = kwh / chargerKw;
      const real = kwh / (chargerKw * efficiency);
      return {
        label: "calculated",
        summary: `${kwh} kWh at ${chargerKw} kW takes ${r(ideal)} h ideal, about ${r(real)} h with ${Math.round(efficiency * 100)}% efficiency.`,
        data: { kwh, chargerKw, efficiency, hoursIdeal: r(ideal), hoursWithLosses: r(real), gridKwh: r(kwh / efficiency) },
        notes: ["AC charging is capped by the vehicle's onboard charger rating; confirm it for the specific model."],
      };
    }

    case "calculatePeakLoad": {
      const loads = Array.isArray(args.loadsKw) ? args.loadsKw.map(Number) : [];
      if (!loads.length || loads.some((v) => !Number.isFinite(v) || v < 0)) {
        throw new ToolInputError("loadsKw must be a non-empty list of non-negative numbers");
      }
      const diversity = num(args, "diversityFactor", { min: 0.1, max: 1, def: 0.7 });
      const evKw = optNum(args, "evChargerKw", { min: 0, max: 400 }) ?? 0;
      const supplyKva = optNum(args, "supplyKva", { min: 0.5, max: 10000 });
      const sum = loads.reduce((a, b) => a + b, 0);
      const peak = sum * diversity + evKw;
      const headroom = supplyKva !== undefined ? supplyKva * 0.95 - peak : null; // pf ≈ 0.95
      const notes = ["Diversity is an engineering estimate; confirm with metered data or utility records."];
      if (headroom !== null && headroom < 0) {
        notes.push("Peak exceeds supply: consider load management, a smaller charger, storage, or a supply upgrade.");
      }
      return {
        label: "estimated",
        summary:
          `Non-EV loads ${r(sum)} kW × ${diversity} + EV ${evKw} kW gives about ${r(peak)} kW peak` +
          (headroom !== null ? `, ${headroom >= 0 ? "within" : "over"} a ${supplyKva} kVA supply (${r(headroom)} kW headroom).` : "."),
        data: { sumKw: r(sum), diversityFactor: diversity, evChargerKw: evKw, peakKw: r(peak), supplyKva: supplyKva ?? null, headroomKw: headroom === null ? null : r(headroom) },
        notes,
      };
    }

    case "sizePvSystem": {
      const dailyKwh = num(args, "dailyKwh", { min: 0.1, max: 100000 });
      const psh = num(args, "peakSunHours", { min: 2, max: 8, def: 5.5 });
      const pr = num(args, "performanceRatio", { min: 0.5, max: 0.95, def: 0.78 });
      const panelW = num(args, "panelWatts", { min: 50, max: 800, def: 550 });
      const kwp = dailyKwh / (psh * pr);
      const panels = Math.ceil((kwp * 1000) / panelW);
      const installedKwp = (panels * panelW) / 1000;
      return {
        label: args.peakSunHours === undefined ? "estimated" : "calculated",
        summary: `${dailyKwh} kWh/day at ${psh} peak sun hours and PR ${pr} needs ${r(kwp)} kWp: ${panels} × ${panelW} W panels (${r(installedKwp)} kWp installed).`,
        data: {
          requiredKwp: r(kwp),
          panels,
          panelWatts: panelW,
          installedKwp: r(installedKwp),
          dailyYieldKwh: r(installedKwp * psh * pr, 1),
          annualYieldKwh: r(installedKwp * psh * pr * 365, 0),
          roofAreaM2: r(panels * 2.6, 0),
        },
        notes: [
          ...(args.peakSunHours === undefined ? ["Peak sun hours assumed at 5.5; use site irradiance data for design."] : []),
          "Roof area assumes about 2.6 m² per 550 W module; check orientation, shading and structure on site.",
        ],
      };
    }

    case "sizeBattery": {
      const loadKw = num(args, "criticalLoadKw", { min: 0.01, max: 10000 });
      const hours = num(args, "backupHours", { min: 0.1, max: 168 });
      const dod = num(args, "depthOfDischarge", { min: 0.5, max: 1, def: 0.9 });
      const step = num(args, "roundToKwh", { min: 0.1, max: 1000, def: 2.56 });
      const energy = loadKw * hours;
      const nameplate = energy / dod;
      const modules = Math.ceil(nameplate / step - 1e-9);
      const sized = modules * step;
      return {
        label: "calculated",
        summary: `${loadKw} kW for ${hours} h is ${r(energy, 1)} kWh usable; at ${Math.round(dod * 100)}% depth of discharge that is ${r(nameplate, 1)} kWh nameplate: ${modules} × ${step} kWh = ${r(sized, 2)} kWh.`,
        data: { criticalLoadKw: loadKw, backupHours: hours, usableKwh: r(energy, 1), nameplateKwh: r(nameplate, 1), modules, moduleKwh: step, sizedKwh: r(sized, 2) },
        notes: ["Check inverter continuous and surge rating against the same critical load."],
      };
    }

    case "sizeInverter": {
      const peak = num(args, "peakLoadKw", { min: 0.05, max: 10000 });
      const pv = optNum(args, "pvKwp", { min: 0, max: 10000 });
      const margin = num(args, "margin", { min: 1, max: 2, def: 1.25 });
      const surge = optNum(args, "surgeKw", { min: 0, max: 10000 });
      const forLoad = peak * margin;
      const forPv = pv ? pv / 1.3 : 0; // DC:AC ratio up to about 1.3
      const required = Math.max(forLoad, forPv);
      const rating = nextUp(STANDARD_INVERTER_KW, required);
      const notes: string[] = [];
      if (surge && rating && surge > rating * 2) notes.push(`Starting load ${surge} kW exceeds a typical 2× surge rating; consider a soft starter or a larger unit.`);
      if (rating && rating > 10) notes.push("Above about 10 kW, a three-phase inverter and supply are usually needed in Kenya.");
      return {
        label: "calculated",
        summary: `Peak ${peak} kW × ${margin} = ${r(forLoad)} kW${pv ? `; PV ${pv} kWp needs at least ${r(forPv)} kW AC` : ""}. Standard rating: ${rating ?? "above 100"} kW.`,
        data: { requiredKw: r(required), recommendedKw: rating, forLoadKw: r(forLoad), forPvKw: r(forPv) },
        notes,
      };
    }

    case "calculateVoltageDrop": {
      const current = num(args, "currentA", { min: 0.1, max: 5000 });
      const length = num(args, "lengthM", { min: 0.5, max: 5000 });
      const system = (["single-phase", "three-phase", "dc"].includes(String(args.system)) ? String(args.system) : "single-phase") as
        | "single-phase"
        | "three-phase"
        | "dc";
      const conductor = args.conductor === "aluminium" ? "aluminium" : "copper";
      const voltage = num(args, "voltageV", { min: 12, max: 1500, def: system === "three-phase" ? 400 : 230 });
      const limit = num(args, "limitPct", { min: 0.5, max: 10, def: 5 });
      const csa = optNum(args, "csaMm2", { min: 0.5, max: 630 });
      const rho = RESISTIVITY[conductor];
      const k = system === "three-phase" ? Math.sqrt(3) : 2;
      const dropFor = (a: number) => (k * current * length * rho) / a;
      const minCsa = (k * current * length * rho) / ((limit / 100) * voltage);
      const recommended = nextUp(STANDARD_CSA_MM2, minCsa);
      const data: ToolResult["data"] = {
        system,
        voltageV: voltage,
        conductor,
        limitPct: limit,
        minimumCsaMm2: r(minCsa),
        recommendedCsaMm2: recommended,
      };
      let summary = `${current} A over ${length} m (${system}, ${conductor}) needs at least ${r(minCsa)} mm² for ≤ ${limit}% drop; smallest standard size that passes: ${recommended ?? "above 240"} mm².`;
      if (csa) {
        const dropV = dropFor(csa);
        const pct = (dropV / voltage) * 100;
        data.csaMm2 = csa;
        data.dropV = r(dropV);
        data.dropPct = r(pct);
        data.pass = pct <= limit;
        summary = `${csa} mm² ${conductor}: ${r(dropV)} V drop (${r(pct)}%), ${pct <= limit ? "within" : "over"} the ${limit}% limit. ` + summary;
      }
      return {
        label: "calculated",
        summary,
        data,
        notes: [
          "Resistive method at about 70 °C; ignores reactance, which matters above roughly 25 mm².",
          "Cable must also meet current-carrying capacity (Iz) for the installation method and grouping: needs site check.",
        ],
      };
    }

    case "sizeProtection": {
      const kw = num(args, "loadKw", { min: 0.01, max: 5000 });
      const system = args.system === "three-phase" ? "three-phase" : "single-phase";
      const voltage = num(args, "voltageV", { min: 100, max: 1000, def: system === "three-phase" ? 400 : 230 });
      const pf = num(args, "powerFactor", { min: 0.5, max: 1, def: 1 });
      const continuous = args.continuous === undefined ? true : Boolean(args.continuous);
      const isEv = args.isEvCharger === undefined ? true : Boolean(args.isEvCharger);
      const ib = (kw * 1000) / (system === "three-phase" ? Math.sqrt(3) * voltage * pf : voltage * pf);
      const design = continuous ? ib * 1.25 : ib;
      const breaker = nextUp(STANDARD_BREAKER_A, design);
      const notes = [
        "Coordinate Ib ≤ In ≤ Iz: the cable rating must be at least the breaker rating for its installation method.",
        ...(continuous
          ? ["The 1.25 continuous-load margin is conservative; under IEC 60364 In ≥ Ib applies, so follow the charger manual's specified breaker where given."]
          : []),
      ];
      const data: ToolResult["data"] = {
        system,
        voltageV: voltage,
        designCurrentA: r(ib, 1),
        sizingCurrentA: r(design, 1),
        breakerA: breaker,
        breakerType: isEv ? "MCB curve C, dedicated circuit" : "MCB curve B or C to suit load",
        poles: system === "three-phase" ? "3P or 4P" : "1P+N",
      };
      if (isEv) {
        data.rcd = "30 mA Type A RCD with 6 mA DC fault detection (in charger or upstream), or a 30 mA Type B RCD";
        notes.push(
          "EV supply follows IEC 60364-7-722: one dedicated circuit per charging point, RCD protection, and an earthing arrangement checked for PEN-fault risk on TN-C-S supplies.",
          "Earth electrode resistance and surge protection: needs site check.",
        );
      }
      return {
        label: "calculated",
        summary: `${kw} kW ${system} at ${voltage} V draws ${r(ib, 1)} A${continuous ? `, ${r(design, 1)} A with the 1.25 continuous factor` : ""}. Breaker: ${breaker ?? "above 250"} A${isEv ? ", plus 30 mA RCD (Type A + 6 mA DC detection, or Type B)" : ""}.`,
        data,
        notes,
      };
    }

    case "calculateEnergyCost": {
      const kwhDay = num(args, "kwhPerDay", { min: 0, max: 100000 });
      const tariff = num(args, "kesPerKwh", { min: 0, max: 500 });
      const perDay = kwhDay * tariff;
      const data: ToolResult["data"] = {
        kwhPerDay: kwhDay,
        kesPerKwh: tariff,
        kesPerDay: r(perDay, 0),
        kesPerMonth: r(perDay * 30, 0),
        kesPerYear: r(perDay * 365, 0),
      };
      let summary = `${kwhDay} kWh/day × KES ${tariff}/kWh = KES ${r(perDay, 0)}/day, about KES ${r(perDay * 30, 0).toLocaleString("en-KE")}/month.`;
      const km = optNum(args, "dailyKm", { min: 0, max: 2000 });
      const lPer100 = optNum(args, "fuelLPer100km", { min: 1, max: 100 });
      const kesL = optNum(args, "kesPerLitre", { min: 1, max: 1000 });
      if (km !== undefined && lPer100 !== undefined && kesL !== undefined) {
        const fuelDay = (km * lPer100 * kesL) / 100;
        data.fuelKesPerDay = r(fuelDay, 0);
        data.savingKesPerYear = r((fuelDay - perDay) * 365, 0);
        summary += ` Fuel for the same ${km} km: KES ${r(fuelDay, 0).toLocaleString("en-KE")}/day; saving about KES ${r((fuelDay - perDay) * 365, 0).toLocaleString("en-KE")}/year.`;
      }
      return {
        label: "calculated",
        summary,
        data,
        notes: ["Tariffs and fuel prices change; confirm current figures before quoting."],
      };
    }

    case "lookupPrecifarmProduct": {
      const id = String(args.productId ?? "all") as PrecifarmProductId | "all";
      const items = id === "all" ? precifarmProducts : precifarmProducts.filter((p) => p.id === id);
      if (!items.length) throw new ToolInputError(`unknown product ${id}`);
      return {
        label: "calculated",
        summary: items.map((p) => `${p.name}: ${p.rating}, ${p.price}${p.status !== "available" ? ` (${p.status})` : ""}`).join("; "),
        data: { products: items.map((p) => p.name), detail: Object.fromEntries(items.map((p) => [p.id, p])) },
        notes: ["Prices are list prices from precifarm.com; a site survey sets the final quote."],
      };
    }

    default:
      throw new ToolInputError(`unknown tool ${name}`);
  }
}
