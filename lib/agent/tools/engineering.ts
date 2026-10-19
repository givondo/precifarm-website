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
    "Hours to deliver an amount of energy to the battery. Uses the lower of charger and vehicle limit, and returns grid energy including losses.",
    {
      kwh: { type: "number", description: "Energy to deliver to the battery in kWh" },
      chargerKw: { type: "number", description: "Charger rated power in kW" },
      mode: { type: "string", enum: ["ac", "dc"], description: "AC (onboard charger) or DC fast charging. Default ac" },
      vehicleMaxKw: {
        type: "number",
        description: "Vehicle limit in kW: onboard charger rating for AC (often 3.7, 7.4 or 11), or peak DC acceptance for DC",
      },
      efficiency: {
        type: "number",
        description: "Grid to battery efficiency 0.5 to 1 (planning assumption: 0.9 for AC, 0.95 for DC)",
      },
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
    "Battery backup size from critical load and backup hours, with depth of discharge, discharge efficiency and module rounding.",
    {
      criticalLoadKw: { type: "number", description: "Average critical load during backup in kW" },
      backupHours: { type: "number", description: "Hours of backup required" },
      depthOfDischarge: { type: "number", description: "Usable fraction 0.5 to 1 (default 0.9 for LiFePO4)" },
      dischargeEfficiency: {
        type: "number",
        description: "Battery to AC load efficiency 0.7 to 1: inverter x battery discharge (default 0.92, about 0.95 x 0.97)",
      },
      roundToKwh: { type: "number", description: "Storage step to round up to in kWh (default 5; Pod energy storage comes in 5 or 10 kWh)" },
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
      voltageV: { type: "number", description: "Nominal voltage (Kenyan default 240 single-phase, 415 three-phase)" },
      conductor: { type: "string", enum: ["copper", "aluminium"], description: "Default copper" },
      limitPct: { type: "number", description: "Allowed drop in percent (default 5; 3 is a common target for final circuits)" },
      deratingFactor: {
        type: "number",
        description: "Combined ambient and grouping correction factor Ca x Cg, 0.3 to 1 (default 1: 30 °C, no grouping)",
      },
    },
    ["currentA", "lengthM"],
  ),
  fn(
    "sizeProtection",
    "Design current and protective device for a circuit, including RCD type for EV chargers.",
    {
      loadKw: { type: "number", description: "Load in kW" },
      system: { type: "string", enum: ["single-phase", "three-phase"], description: "Default single-phase" },
      voltageV: { type: "number", description: "Nominal voltage (Kenyan default 240 single-phase, 415 three-phase)" },
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
      kwhPerDay: { type: "number", description: "Energy per day in kWh delivered to the battery (as from calculateEvEnergy)" },
      kesPerKwh: {
        type: "number",
        description:
          "All-in tariff in KES/kWh. Ask the user or label as assumed. October 2026 planning references: 24.70 (e-mobility base), 27.81 (domestic DC3)",
      },
      chargingEfficiency: {
        type: "number",
        description: "Grid to battery efficiency 0.5 to 1 (default 0.9 AC; 0.95 DC; 1 if kwhPerDay is already metered grid energy)",
      },
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

function oneOf<T extends string>(args: Record<string, unknown>, key: string, allowed: readonly T[], def: T, aliases: Record<string, T> = {}): T {
  const raw = args[key];
  if (raw === undefined || raw === null || raw === "") return def;
  const v = String(raw).trim().toLowerCase();
  const hit = (allowed as readonly string[]).includes(v) ? (v as T) : aliases[v];
  if (!hit) throw new ToolInputError(`${key} must be one of ${allowed.join(", ")}`);
  return hit;
}

/** Strict boolean: the strings "false" and "0" mean false (Boolean("false") is true). */
function bool(args: Record<string, unknown>, key: string, def: boolean): boolean {
  const raw = args[key];
  if (raw === undefined || raw === null || raw === "") return def;
  if (typeof raw === "boolean") return raw;
  const v = String(raw).trim().toLowerCase();
  if (v === "true" || v === "1" || v === "yes") return true;
  if (v === "false" || v === "0" || v === "no") return false;
  throw new ToolInputError(`${key} must be true or false`);
}

const r = (v: number, dp = 2) => Number(v.toFixed(dp));

/** Kenyan nominal LV supply (Kenya Power): 240 V single-phase, 415 V three-phase, 50 Hz. */
export const KENYA_LV = { singlePhaseV: 240, threePhaseV: 415 } as const;

const STANDARD_CSA_MM2 = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
const STANDARD_BREAKER_A = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250];
const STANDARD_INVERTER_KW = [1, 1.5, 2, 3, 3.6, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100];
/**
 * Resistivity for voltage drop, Ω·mm²/m: 1.25 × the 20 °C value, as IEC 60364-5-52 Annex G
 * (copper 0.0225, aluminium 0.036).
 */
const RESISTIVITY = { copper: 0.0225, aluminium: 0.036 } as const;

/**
 * Screening current-carrying capacity, A, PVC 70 °C insulation, reference method C (clipped
 * direct), 30 °C ambient, no grouping. IEC 60364-5-52:2009 Table B.52.2 (two loaded conductors:
 * single-phase or DC) and Table B.52.4 (three loaded conductors: three-phase). BS 7671
 * equivalent: Table 4D2A for copper, 4H2A for aluminium. A screen, not a substitute for the
 * installation-method table on site.
 */
const IZ_CU_PVC_METHOD_C: Record<number, { twoLoaded: number; threeLoaded: number }> = {
  1.5: { twoLoaded: 19.5, threeLoaded: 17.5 },
  2.5: { twoLoaded: 27, threeLoaded: 24 },
  4: { twoLoaded: 36, threeLoaded: 32 },
  6: { twoLoaded: 46, threeLoaded: 41 },
  10: { twoLoaded: 63, threeLoaded: 57 },
  16: { twoLoaded: 85, threeLoaded: 76 },
  25: { twoLoaded: 112, threeLoaded: 96 },
  35: { twoLoaded: 138, threeLoaded: 119 },
  50: { twoLoaded: 168, threeLoaded: 144 },
  70: { twoLoaded: 213, threeLoaded: 184 },
  95: { twoLoaded: 258, threeLoaded: 223 },
  120: { twoLoaded: 299, threeLoaded: 259 },
  150: { twoLoaded: 344, threeLoaded: 299 },
  185: { twoLoaded: 392, threeLoaded: 341 },
  240: { twoLoaded: 461, threeLoaded: 403 },
};

/**
 * Aluminium, PVC, method C, two loaded conductors: IEC 60364-5-52 Table B.52.2. Values agree in
 * two independent reproductions: EUPEN "Technical Data for Low Voltage Power and Control cable
 * 0.6/1 kV" (Ed. 05 2022, section 4.2.2) and Schneider Electric Electrical Installation Guide,
 * Fig. G21, method C "2 PVC" column. Only 16 mm² and up, as aluminium is not used below that here.
 */
export const IZ_AL_PVC_METHOD_C_TWO_LOADED: Record<number, number> = {
  16: 66,
  25: 83,
  35: 103,
  50: 125,
  70: 160,
  95: 195,
  120: 226,
  150: 261,
  185: 298,
  240: 352,
};

/**
 * Three-phase aluminium (Table B.52.4) is deliberately not tabulated. Only one reproduction of
 * B.52.4 itself was found (EUPEN); the Schneider guide gives its simplified table instead, which
 * differs at 16, 150, 185 and 240 mm². Without two agreeing sources the tool refuses rather than
 * guess, and the caller is told an engineer must size it.
 */
export const ALUMINIUM_THREE_PHASE_NEEDS_ENGINEER =
  "aluminium sizing for three-phase circuits needs an engineer: the Agent has no verified IEC 60364-5-52 Table B.52.4 aluminium values (only one published reproduction could be confirmed), so it will not screen this size";

/** Smallest standard size whose screening Iz × derating ≥ current. */
export function minCsaForCurrent(
  currentA: number,
  opts: { threePhase: boolean; conductor: "copper" | "aluminium"; deratingFactor?: number },
): number | null {
  const f = opts.deratingFactor ?? 1;
  if (opts.conductor === "aluminium" && opts.threePhase) throw new ToolInputError(ALUMINIUM_THREE_PHASE_NEEDS_ENGINEER);
  for (const csa of STANDARD_CSA_MM2) {
    const base =
      opts.conductor === "aluminium"
        ? IZ_AL_PVC_METHOD_C_TWO_LOADED[csa]
        : opts.threePhase
          ? IZ_CU_PVC_METHOD_C[csa].threeLoaded
          : IZ_CU_PVC_METHOD_C[csa].twoLoaded;
    if (base === undefined) continue;
    if (base * f >= currentA - 1e-9) return csa;
  }
  return null;
}

/** Module area per watt: 2.6 m² for a 550 W module. */
const MODULE_AREA_M2_PER_W = 2.6 / 550;

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
      const mode = oneOf(args, "mode", ["ac", "dc"] as const, "ac");
      const vehicleMaxKw = optNum(args, "vehicleMaxKw", { min: 0.5, max: 1000 });
      const efficiency = num(args, "efficiency", { min: 0.5, max: 1, def: mode === "dc" ? 0.95 : 0.9 });
      const effectiveKw = vehicleMaxKw !== undefined ? Math.min(chargerKw, vehicleMaxKw) : chargerKw;
      const ideal = kwh / effectiveKw;
      // AC: the rating is drawn from the grid and the onboard charger loses the rest, so the battery
      // fills at kW × efficiency. DC: the rating is delivered at the connector; losses sit in the
      // charger cabinet and show up as extra grid energy, not as extra time.
      const real = mode === "ac" ? kwh / (effectiveKw * efficiency) : ideal;
      const notes: string[] = [
        `Efficiency ${efficiency} is a planning assumption (0.9 AC, 0.95 DC) unless measured.`,
      ];
      if (vehicleMaxKw === undefined) {
        notes.push(
          mode === "ac"
            ? "AC charging is capped by the vehicle's onboard charger rating; confirm it for the specific model."
            : "DC charging is capped by the vehicle's peak DC acceptance; confirm it for the specific model.",
        );
      } else if (vehicleMaxKw < chargerKw) {
        notes.push(`Vehicle limit ${vehicleMaxKw} kW is below the ${chargerKw} kW charger rating, so the vehicle sets the rate.`);
      }
      if (mode === "dc") {
        notes.push(
          "DC power tapers as the battery fills, so real sessions are longer than this constant-power figure. Planning reference: a 120 kW Corridor charger adds about 35 to 43 kWh in 30 min for common CCS2 cars.",
        );
      }
      return {
        label: mode === "dc" ? "estimated" : "calculated",
        summary: `${kwh} kWh ${mode.toUpperCase()} at ${r(effectiveKw)} kW takes ${r(ideal)} h at full power${
          mode === "ac" ? `, about ${r(real)} h with ${Math.round(efficiency * 100)}% efficiency` : " before taper"
        }; ${r(kwh / efficiency)} kWh from the grid.`,
        data: {
          kwh,
          chargerKw,
          mode,
          vehicleMaxKw: vehicleMaxKw ?? null,
          effectiveKw: r(effectiveKw),
          efficiency,
          hoursIdeal: r(ideal),
          hoursWithLosses: r(real),
          gridKwh: r(kwh / efficiency),
        },
        notes,
      };
    }

    case "calculatePeakLoad": {
      const rawLoads = Array.isArray(args.loadsKw) ? args.loadsKw : [];
      const loads = rawLoads.map((v) => (typeof v === "number" || (typeof v === "string" && v.trim() !== "") ? Number(v) : NaN));
      if (!loads.length || loads.length > 200 || loads.some((v) => !Number.isFinite(v) || v < 0 || v > 10000)) {
        throw new ToolInputError("loadsKw must be a list of 1 to 200 numbers between 0 and 10000 kW");
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
          roofAreaM2: r(panels * MODULE_AREA_M2_PER_W * panelW, 0),
        },
        notes: [
          ...(args.peakSunHours === undefined ? ["Peak sun hours assumed at 5.5 (Kenya is roughly 5 to 6); use site irradiance data for design."] : []),
          ...(args.performanceRatio === undefined ? ["Performance ratio assumed at 0.78."] : []),
          "If the energy passes through a battery or an EV charger, add those losses to dailyKwh first.",
          "Roof area assumes about 2.6 m² per 550 W module (about 21% module efficiency); check orientation, shading and structure on site.",
        ],
      };
    }

    case "sizeBattery": {
      const loadKw = num(args, "criticalLoadKw", { min: 0.01, max: 10000 });
      const hours = num(args, "backupHours", { min: 0.1, max: 168 });
      const dod = num(args, "depthOfDischarge", { min: 0.5, max: 1, def: 0.9 });
      const eff = num(args, "dischargeEfficiency", { min: 0.7, max: 1, def: 0.92 });
      const step = num(args, "roundToKwh", { min: 0.1, max: 1000, def: 5 });
      const energy = loadKw * hours;
      // Usable energy must cover the load plus inverter and battery discharge losses.
      const nameplate = energy / (dod * eff);
      const modules = Math.ceil(nameplate / step - 1e-9);
      const sized = modules * step;
      return {
        label: "calculated",
        summary: `${loadKw} kW for ${hours} h is ${r(energy, 1)} kWh at the load; at ${Math.round(dod * 100)}% depth of discharge and ${Math.round(eff * 100)}% discharge efficiency that is ${r(nameplate, 1)} kWh nameplate: ${modules} × ${step} kWh = ${r(sized, 2)} kWh.`,
        data: {
          criticalLoadKw: loadKw,
          backupHours: hours,
          loadKwh: r(energy, 1),
          depthOfDischarge: dod,
          dischargeEfficiency: eff,
          nameplateKwh: r(nameplate, 1),
          modules,
          moduleKwh: step,
          sizedKwh: r(sized, 2),
        },
        notes: [
          ...(args.dischargeEfficiency === undefined ? ["Discharge efficiency assumed at 0.92 (inverter about 95% × battery about 97%)."] : []),
          "Check inverter continuous and surge rating against the same critical load.",
          "Allow for capacity fade over life (about 70 to 80% at end of warranty) if backup hours must hold for the full life.",
        ],
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
      if (pv) notes.push("PV check assumes a DC to AC ratio up to 1.3; confirm the inverter's maximum PV input and MPPT voltage window.");
      if (surge && (rating === null || surge > rating * 2)) notes.push(`Starting load ${surge} kW exceeds a typical 2× surge rating; consider a soft starter or a larger unit.`);
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
      const system = oneOf(args, "system", ["single-phase", "three-phase", "dc"] as const, "single-phase", {
        "single phase": "single-phase",
        "1-phase": "single-phase",
        "three phase": "three-phase",
        "3-phase": "three-phase",
      });
      const conductor = oneOf(args, "conductor", ["copper", "aluminium"] as const, "copper", { aluminum: "aluminium", cu: "copper", al: "aluminium" });
      const voltage = num(args, "voltageV", {
        min: 12,
        max: 1500,
        def: system === "three-phase" ? KENYA_LV.threePhaseV : system === "single-phase" ? KENYA_LV.singlePhaseV : undefined,
      });
      const limit = num(args, "limitPct", { min: 0.5, max: 10, def: 5 });
      const derating = num(args, "deratingFactor", { min: 0.3, max: 1, def: 1 });
      const csa = optNum(args, "csaMm2", { min: 0.5, max: 630 });
      const rho = RESISTIVITY[conductor];
      // Line-to-line drop for three-phase (√3), loop drop for single-phase and DC (2).
      const k = system === "three-phase" ? Math.sqrt(3) : 2;
      const dropFor = (a: number) => (k * current * length * rho) / a;
      const minCsaVd = (k * current * length * rho) / ((limit / 100) * voltage);
      const minCsaIz = minCsaForCurrent(current, { threePhase: system === "three-phase", conductor, deratingFactor: derating });
      const vdSize = STANDARD_CSA_MM2.find((x) => x >= minCsaVd - 1e-9 && (conductor === "copper" || x >= 16)) ?? null;
      const recommended = vdSize === null || minCsaIz === null ? null : Math.max(vdSize, minCsaIz);
      const data: ToolResult["data"] = {
        system,
        voltageV: voltage,
        conductor,
        limitPct: limit,
        deratingFactor: derating,
        minimumCsaForDropMm2: r(minCsaVd),
        minimumCsaForCurrentMm2: minCsaIz,
        recommendedCsaMm2: recommended,
      };
      let summary = `${current} A over ${length} m (${system}, ${conductor}, ${voltage} V) needs at least ${r(minCsaVd)} mm² for ≤ ${limit}% drop and ${
        minCsaIz ?? "above 240"
      } mm² to carry the current (method C screen); smallest standard size that passes both: ${recommended ?? "above 240"} mm².`;
      if (csa !== undefined) {
        const dropV = dropFor(csa);
        const pct = (dropV / voltage) * 100;
        data.csaMm2 = csa;
        data.dropV = r(dropV);
        data.dropPct = r(pct);
        data.pass = pct <= limit;
        data.currentCapacityOk = minCsaIz !== null && csa >= minCsaIz;
        summary = `${csa} mm² ${conductor}: ${r(dropV)} V drop (${r(pct)}%), ${pct <= limit ? "within" : "over"} the ${limit}% limit${
          minCsaIz !== null && csa < minCsaIz ? `, but below the ${minCsaIz} mm² needed to carry ${current} A` : ""
        }. ` + summary;
      }
      return {
        label: "calculated",
        summary,
        data,
        notes: [
          "Resistive method, IEC 60364-5-52 Annex G (ρ = 1.25 × ρ20); ignores reactance, which matters above roughly 25 mm².",
          "The limit applies from the origin of the installation (3% lighting, 5% other uses); subtract any drop already in the submain.",
          `Current-carrying screen uses ${conductor} PVC, reference method C, 30 °C (IEC 60364-5-52 Table ${system === "three-phase" ? "B.52.4" : "B.52.2"}), derating ${derating}. Buried, enclosed, grouped or hot runs need the installation-method table: needs site check.`,
        ],
      };
    }

    case "sizeProtection": {
      const kw = num(args, "loadKw", { min: 0.01, max: 5000 });
      const system = oneOf(args, "system", ["single-phase", "three-phase"] as const, "single-phase", {
        "single phase": "single-phase",
        "1-phase": "single-phase",
        "three phase": "three-phase",
        "3-phase": "three-phase",
      });
      const voltage = num(args, "voltageV", { min: 100, max: 1000, def: system === "three-phase" ? KENYA_LV.threePhaseV : KENYA_LV.singlePhaseV });
      const pf = num(args, "powerFactor", { min: 0.5, max: 1, def: 1 });
      const continuous = bool(args, "continuous", true);
      const isEv = bool(args, "isEvCharger", true);
      const ib = (kw * 1000) / (system === "three-phase" ? Math.sqrt(3) * voltage * pf : voltage * pf);
      const design = continuous ? ib * 1.25 : ib;
      const breaker = nextUp(STANDARD_BREAKER_A, design);
      const notes = [
        "Coordinate Ib ≤ In ≤ Iz: the cable rating must be at least the breaker rating for its installation method. minCableCsaMm2 is a copper PVC method C screen at 30 °C.",
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
        minCableCsaMm2: breaker === null ? null : minCsaForCurrent(breaker, { threePhase: system === "three-phase", conductor: "copper" }),
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
      const eff = num(args, "chargingEfficiency", { min: 0.5, max: 1, def: 0.9 });
      const gridKwh = kwhDay / eff;
      const perDay = gridKwh * tariff;
      const data: ToolResult["data"] = {
        kwhPerDay: kwhDay,
        chargingEfficiency: eff,
        gridKwhPerDay: r(gridKwh),
        kesPerKwh: tariff,
        kesPerDay: r(perDay, 0),
        kesPerMonth: r(perDay * 30, 0),
        kesPerYear: r(perDay * 365, 0),
      };
      let summary = `${kwhDay} kWh/day at the battery is ${r(gridKwh)} kWh/day from the grid at ${Math.round(eff * 100)}% efficiency; × KES ${tariff}/kWh = KES ${r(perDay, 0).toLocaleString("en-KE")}/day, about KES ${r(perDay * 30, 0).toLocaleString("en-KE")}/month.`;
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
        notes: [
          ...(args.chargingEfficiency === undefined ? ["Charging efficiency assumed at 0.9 (AC planning assumption)."] : []),
          "Tariffs and fuel prices change; confirm current figures before quoting. October 2026 planning references: all-in KES 24.70/kWh e-mobility base, KES 27.81/kWh domestic DC3.",
        ],
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
