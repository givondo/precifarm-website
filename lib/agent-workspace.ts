/**
 * Precifarm Agent workspace demonstration (/agent).
 *
 * The plan (which tools run, in what order) is scripted for each example brief. Every number is computed
 * by the deterministic engineering kernel in lib/agent/tools/engineering.ts, the same functions the live
 * Agent calls through /api/agent/chat. Product facts come from lib/agent/products.ts through the
 * lookupPrecifarmProduct tool. Brief inputs and the assumptions listed with each brief are example values a
 * visitor can change, not Precifarm claims.
 */

import { precifarmProducts } from "@/lib/agent/products";
import { runEngineeringTool, type EngineeringToolName, type EvidenceLabel, type ToolResult } from "@/lib/agent/tools/engineering";

export type WorkspaceControl = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
};

export type WorkspaceTask = {
  id: string;
  /** What the Agent is working out, in plain words */
  task: string;
  tool: EngineeringToolName;
  args: Record<string, unknown>;
  result: ToolResult;
  /** The one figure this task contributes to the design */
  headline: string;
};

export type DiagramNodeKind = "grid" | "board" | "protection" | "charger" | "vehicle" | "load" | "pv" | "battery" | "inverter" | "control";

export type DiagramNode = {
  id: string;
  title: string;
  lines: string[];
  kind: DiagramNodeKind;
  /** true when the value still needs a site check */
  check?: boolean;
  /** centre in the landscape layout; the diagram fits its viewBox to the nodes */
  land: [number, number];
  /** centre in the portrait layout used on phones (columns at x 90 and 270) */
  port: [number, number];
};

export type DiagramEdge = { from: string; to: string; kind: "ac" | "dc" | "data"; label?: string };

export type PartLine = { item: string; spec: string; qty: string; source: string; label: EvidenceLabel };

export type WorkspaceRun = {
  project: string;
  prompt: string;
  assumptions: string[];
  tasks: WorkspaceTask[];
  /** A step the Agent derives from tool outputs without a tool call (shown as such in the trace) */
  derived?: { after: string; text: string };
  diagram: { nodes: DiagramNode[]; edges: DiagramEdge[]; caption: string };
  parts: PartLine[];
  result: {
    headline: string;
    figures: { label: string; value: string; label2: EvidenceLabel }[];
    checks: string[];
    status: { ok: boolean; text: string };
  };
};

export type WorkspaceBrief = {
  id: string;
  label: string;
  short: string;
  controls: WorkspaceControl[];
  defaults: Record<string, number>;
  run: (v: Record<string, number>) => WorkspaceRun;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const n = (r: ToolResult, key: string) => Number(r.data[key]);

function task(id: string, label: string, tool: EngineeringToolName, args: Record<string, unknown>, headline: (r: ToolResult) => string): WorkspaceTask {
  const result = runEngineeringTool(tool, args);
  return { id, task: label, tool, args, result, headline: headline(result) };
}

export function hoursText(h: number) {
  if (!Number.isFinite(h)) return "-";
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  if (mins === 60) return `${whole + 1} h 00 min`;
  return `${whole} h ${String(mins).padStart(2, "0")} min`;
}

const kes = (v: number) => `KES ${Math.round(v).toLocaleString("en-KE")}`;

/** First number in a product rating string, e.g. "7 kW AC" gives 7. */
function ratingKw(id: (typeof precifarmProducts)[number]["id"]) {
  const p = precifarmProducts.find((x) => x.id === id);
  const m = p ? /([\d.]+)\s*kW/.exec(p.rating) : null;
  return m ? Number(m[1]) : NaN;
}

function siteChecks(tasks: WorkspaceTask[]) {
  const all = tasks.flatMap((t) => t.result.notes ?? []);
  return [...new Set(all.filter((s) => /site check|confirm|check /i.test(s)))];
}

/* ------------------------------------------------------------------ */
/* Brief 1: home EV charging                                           */
/* ------------------------------------------------------------------ */

const HOME_KWH_PER_100KM = 18;
const HOME_LOADS_KW = [3, 3, 2];
const TARIFF_KES_KWH = 25;
const FUEL_L_100KM = 8;
const FUEL_KES_L = 190;

const homeBrief: WorkspaceBrief = {
  id: "home",
  label: "Home EV charging",
  short: "Home",
  controls: [
    { id: "dailyKm", label: "Daily driving", min: 20, max: 250, step: 10, unit: "km" },
    { id: "cableM", label: "Board to charger cable", min: 10, max: 60, step: 5, unit: "m" },
    { id: "supplyKva", label: "Main supply", min: 6, max: 20, step: 1, unit: "kVA" },
  ],
  defaults: { dailyKm: 80, cableM: 25, supplyKva: 15 },
  run: ({ dailyKm, cableM, supplyKva }) => {
    const chargerKw = ratingKw("pulse");
    const energy = task("energy", "Daily driving energy", "calculateEvEnergy", { dailyKm, kwhPer100km: HOME_KWH_PER_100KM }, (r) => `${n(r, "kwhPerDay")} kWh/day`);
    const kwh = n(energy.result, "kwhPerDay");
    const product = task("product", "Select the charger", "lookupPrecifarmProduct", { productId: "pulse" }, () => `Pulse charger, ${chargerKw} kW AC`);
    const time = task("time", "Overnight charge time", "calculateChargingTime", { kwh, chargerKw }, (r) => hoursText(n(r, "hoursWithLosses")));
    const peak = task("peak", "House peak load with the charger", "calculatePeakLoad", { loadsKw: HOME_LOADS_KW, evChargerKw: chargerKw, supplyKva }, (r) => {
      const h = n(r, "headroomKw");
      return `${n(r, "peakKw")} kW peak, ${h >= 0 ? `${h} kW headroom` : `${Math.abs(h)} kW over`}`;
    });
    const prot = task("prot", "Circuit protection", "sizeProtection", { loadKw: chargerKw, system: "single-phase", isEvCharger: true }, (r) => `${r.data.breakerA} A MCB + 30 mA RCD`);
    const cable = task(
      "cable",
      "Cable size for voltage drop",
      "calculateVoltageDrop",
      { currentA: n(prot.result, "designCurrentA"), lengthM: cableM, system: "single-phase", limitPct: 3 },
      (r) => `at least ${r.data.recommendedCsaMm2} mm² copper`,
    );
    const csa = n(cable.result, "recommendedCsaMm2");
    const verify = task(
      "verify",
      "Verify the chosen cable",
      "calculateVoltageDrop",
      { currentA: n(prot.result, "designCurrentA"), lengthM: cableM, system: "single-phase", limitPct: 3, csaMm2: csa },
      (r) => `${r.data.dropPct}% drop (${r.data.pass ? "passes" : "fails"} 3%)`,
    );
    const cost = task(
      "cost",
      "Running cost against petrol",
      "calculateEnergyCost",
      { kwhPerDay: n(time.result, "gridKwh"), kesPerKwh: TARIFF_KES_KWH, dailyKm, fuelLPer100km: FUEL_L_100KM, kesPerLitre: FUEL_KES_L },
      (r) => `${kes(n(r, "kesPerMonth"))}/month`,
    );
    const tasks = [energy, product, time, peak, prot, cable, verify, cost];
    const over = n(peak.result, "headroomKw") < 0;
    const pulse = precifarmProducts.find((p) => p.id === "pulse")!;

    return {
      project: `Home EV charging · ${dailyKm} km a day`,
      prompt: `Design home charging for a Nairobi family that drives ${dailyKm} km a day. Single-phase ${supplyKva} kVA supply. The charger goes ${cableM} m from the meter board.`,
      assumptions: [
        `Vehicle uses ${HOME_KWH_PER_100KM} kWh/100 km`,
        `House loads ${HOME_LOADS_KW.join(" + ")} kW at the kernel's default diversity`,
        `Tariff KES ${TARIFF_KES_KWH}/kWh; petrol car ${FUEL_L_100KM} L/100 km at KES ${FUEL_KES_L}/L`,
        "Voltage drop target 3% on the final circuit",
      ],
      tasks,
      diagram: {
        caption: "Single line diagram, single-phase 230 V. Earthing arrangement and cable current rating are confirmed on site.",
        nodes: [
          { id: "grid", title: "Kenya Power", lines: [`${supplyKva} kVA single-phase`], kind: "grid", land: [85, 190], port: [180, 50] },
          { id: "board", title: "Consumer unit", lines: [`Peak ${n(peak.result, "peakKw")} kW`, over ? "Over supply" : `${n(peak.result, "headroomKw")} kW headroom`], kind: "board", check: over, land: [255, 190], port: [180, 170] },
          { id: "house", title: "House loads", lines: [`${HOME_LOADS_KW.reduce((a, b) => a + b, 0)} kW connected`], kind: "load", land: [255, 320], port: [90, 300] },
          { id: "prot", title: "Dedicated circuit", lines: [`${prot.result.data.breakerA} A MCB, curve C`, "30 mA RCD"], kind: "protection", land: [425, 190], port: [270, 300] },
          { id: "charger", title: "Pulse charger", lines: [`${chargerKw} kW AC, Type 2`], kind: "charger", land: [595, 190], port: [270, 440] },
          { id: "ev", title: "Vehicle", lines: [`${kwh} kWh a night`, hoursText(n(time.result, "hoursWithLosses"))], kind: "vehicle", land: [595, 320], port: [270, 570] },
        ],
        edges: [
          { from: "grid", to: "board", kind: "ac" },
          { from: "board", to: "house", kind: "ac" },
          { from: "board", to: "prot", kind: "ac" },
          { from: "prot", to: "charger", kind: "ac", label: `${csa} mm², ${cableM} m` },
          { from: "charger", to: "ev", kind: "ac" },
        ],
      },
      parts: [
        { item: "Pulse charger", spec: `${pulse.rating}, ${pulse.connector}`, qty: "1", source: "lookupPrecifarmProduct()", label: "calculated" },
        { item: "Miniature circuit breaker", spec: `${prot.result.data.breakerA} A, ${String(prot.result.data.breakerType)}, ${prot.result.data.poles}`, qty: "1", source: "sizeProtection()", label: "calculated" },
        { item: "Residual current protection", spec: String(prot.result.data.rcd), qty: "1", source: "sizeProtection()", label: "calculated" },
        { item: "Copper cable", spec: `${csa} mm² minimum by voltage drop; final size set by current rating for the installation method`, qty: `${cableM} m`, source: "calculateVoltageDrop()", label: "needs site check" },
        { item: "Earthing and surge protection", spec: "Electrode resistance and surge device set on site", qty: "1 set", source: "sizeProtection() notes", label: "needs site check" },
      ],
      result: {
        headline: `Pulse charger on a dedicated ${prot.result.data.breakerA} A circuit with ${csa} mm² copper. ${kwh} kWh a day charges in about ${hoursText(n(time.result, "hoursWithLosses"))} overnight.`,
        figures: [
          { label: "Daily energy", value: `${kwh} kWh`, label2: energy.result.label },
          { label: "Charge time", value: hoursText(n(time.result, "hoursWithLosses")), label2: time.result.label },
          { label: "House peak", value: `${n(peak.result, "peakKw")} kW`, label2: peak.result.label },
          { label: "Energy cost", value: `${kes(n(cost.result, "kesPerMonth"))}/mo`, label2: cost.result.label },
        ],
        checks: siteChecks(tasks),
        status: over
          ? { ok: false, text: "Peak demand exceeds the supply. Use the charger's load management, a lower charging current or a supply upgrade, then re-run the peak load check." }
          : { ok: true, text: "Peak demand fits the supply with the charger at full power." },
      },
    };
  },
};

/* ------------------------------------------------------------------ */
/* Brief 2: workplace fleet charging with load sharing                 */
/* ------------------------------------------------------------------ */

const FLEET_KWH_PER_100KM = 18;
const FLEET_CAR_ACCEPT_KW = 11;
const FLEET_BUILDING_LOADS_KW = [20, 12, 8];
const FLEET_CABLE_M = 40;

const fleetBrief: WorkspaceBrief = {
  id: "fleet",
  label: "Workplace fleet charging",
  short: "Fleet",
  controls: [
    { id: "vehicles", label: "Vehicles", min: 2, max: 10, step: 1, unit: "" },
    { id: "dailyKm", label: "Distance per vehicle", min: 40, max: 250, step: 10, unit: "km" },
    { id: "supplyKva", label: "Site supply", min: 50, max: 200, step: 5, unit: "kVA" },
    { id: "windowH", label: "Overnight window", min: 4, max: 14, step: 1, unit: "h" },
  ],
  defaults: { vehicles: 6, dailyKm: 120, supplyKva: 80, windowH: 10 },
  run: ({ vehicles, dailyKm, supplyKva, windowH }) => {
    const unitKw = ratingKw("pulse-plus");
    const fleet = task("energy", "Fleet energy per day", "calculateEvEnergy", { dailyKm: dailyKm * vehicles, kwhPer100km: FLEET_KWH_PER_100KM }, (r) => `${n(r, "kwhPerDay")} kWh/day`);
    const each = task("each", "Energy per vehicle", "calculateEvEnergy", { dailyKm, kwhPer100km: FLEET_KWH_PER_100KM }, (r) => `${n(r, "kwhPerDay")} kWh/day`);
    const product = task("product", "Select the charger", "lookupPrecifarmProduct", { productId: "pulse-plus" }, () => `Pulse+ charger (in development)`);
    const evKw = vehicles * FLEET_CAR_ACCEPT_KW;
    const peak = task("peak", "Site peak, all cars at once", "calculatePeakLoad", { loadsKw: FLEET_BUILDING_LOADS_KW, evChargerKw: evKw, supplyKva }, (r) => {
      const h = n(r, "headroomKw");
      return h >= 0 ? `${n(r, "peakKw")} kW, within supply` : `${n(r, "peakKw")} kW, ${Math.abs(h)} kW over`;
    });
    const over = n(peak.result, "headroomKw") < 0;
    const tasks: WorkspaceTask[] = [fleet, each, product, peak];
    let sharedKw = evKw;
    let derived: WorkspaceRun["derived"];
    if (over) {
      sharedKw = Math.max(0, Math.floor(evKw + n(peak.result, "headroomKw")));
      derived = {
        after: "peak",
        text: `Load sharing: cap the chargers together at ${sharedKw} kW (${evKw} kW demand less ${Math.abs(n(peak.result, "headroomKw"))} kW over), then re-check.`,
      };
      tasks.push(
        task("peak2", "Site peak with load sharing", "calculatePeakLoad", { loadsKw: FLEET_BUILDING_LOADS_KW, evChargerKw: sharedKw, supplyKva }, (r) => `${n(r, "peakKw")} kW, ${n(r, "headroomKw") >= 0 ? "within supply" : "still over"}`),
      );
    }
    const perCarKw = Math.min(FLEET_CAR_ACCEPT_KW, Math.round((sharedKw / vehicles) * 10) / 10);
    const time =
      perCarKw > 0
        ? task("time", "Charge time per vehicle", "calculateChargingTime", { kwh: n(each.result, "kwhPerDay"), chargerKw: perCarKw }, (r) => `${hoursText(n(r, "hoursWithLosses"))} at ${perCarKw} kW`)
        : null;
    if (time) tasks.push(time);
    const prot = task("prot", "Protection per charger", "sizeProtection", { loadKw: unitKw, system: "three-phase", isEvCharger: true }, (r) => `${r.data.breakerA} A 4-pole + RCD`);
    const cable = task(
      "cable",
      "Feeder cable per charger",
      "calculateVoltageDrop",
      { currentA: n(prot.result, "designCurrentA"), lengthM: FLEET_CABLE_M, system: "three-phase", limitPct: 3 },
      (r) => `at least ${r.data.recommendedCsaMm2} mm² copper`,
    );
    tasks.push(prot, cable);
    const hours = time ? n(time.result, "hoursWithLosses") : Infinity;
    const fits = hours <= windowH;
    const pp = precifarmProducts.find((p) => p.id === "pulse-plus")!;

    return {
      project: `Workplace fleet · ${vehicles} vehicles`,
      prompt: `Plan overnight charging for ${vehicles} company cars that each drive ${dailyKm} km a day. The site has a ${supplyKva} kVA three-phase supply and the cars stand for ${windowH} hours.`,
      assumptions: [
        `Each car uses ${FLEET_KWH_PER_100KM} kWh/100 km and accepts ${FLEET_CAR_ACCEPT_KW} kW AC on three phases`,
        `Building loads ${FLEET_BUILDING_LOADS_KW.join(" + ")} kW at the kernel's default diversity`,
        `Each charger ${FLEET_CABLE_M} m from the EV sub-board`,
        "Voltage drop target 3% on each final circuit",
      ],
      tasks,
      derived,
      diagram: {
        caption: "Single line diagram, three-phase 400 V. Pulse+ is in development; load sharing is a design target.",
        nodes: [
          { id: "grid", title: "Kenya Power", lines: [`${supplyKva} kVA three-phase`], kind: "grid", land: [85, 190], port: [180, 50] },
          { id: "board", title: "Main LV board", lines: [`Peak ${over ? "managed" : n(peak.result, "peakKw") + " kW"}`], kind: "board", land: [255, 190], port: [180, 170] },
          { id: "bldg", title: "Building loads", lines: [`${FLEET_BUILDING_LOADS_KW.reduce((a, b) => a + b, 0)} kW connected`], kind: "load", land: [255, 320], port: [90, 300] },
          { id: "sub", title: "EV sub-board", lines: [`${vehicles} x ${prot.result.data.breakerA} A 4P`, "Type A RCD each"], kind: "protection", land: [425, 190], port: [270, 300] },
          { id: "ctrl", title: "Load sharing", lines: [over ? `Cap ${sharedKw} kW` : "No cap needed"], kind: "control", check: over, land: [595, 60], port: [90, 440] },
          { id: "charger", title: `Pulse+ x ${vehicles}`, lines: [`${perCarKw} kW each`], kind: "charger", land: [595, 190], port: [270, 440] },
          { id: "ev", title: `${vehicles} vehicles`, lines: [`${n(each.result, "kwhPerDay")} kWh each`, time ? hoursText(hours) : "-"], kind: "vehicle", check: !fits, land: [595, 320], port: [270, 570] },
        ],
        edges: [
          { from: "grid", to: "board", kind: "ac" },
          { from: "board", to: "bldg", kind: "ac" },
          { from: "board", to: "sub", kind: "ac" },
          { from: "sub", to: "charger", kind: "ac", label: `${cable.result.data.recommendedCsaMm2} mm², ${FLEET_CABLE_M} m` },
          { from: "ctrl", to: "charger", kind: "data", label: "OCPP" },
          { from: "charger", to: "ev", kind: "ac" },
        ],
      },
      parts: [
        { item: "Pulse+ charger", spec: `${pp.rating.split(";")[0]}; ${pp.connector}; ${pp.price.toLowerCase()}`, qty: String(vehicles), source: "lookupPrecifarmProduct()", label: "calculated" },
        { item: "4-pole circuit breaker", spec: `${prot.result.data.breakerA} A, ${String(prot.result.data.breakerType)}`, qty: String(vehicles), source: "sizeProtection()", label: "calculated" },
        { item: "Residual current protection", spec: String(prot.result.data.rcd), qty: String(vehicles), source: "sizeProtection()", label: "calculated" },
        { item: "Copper cable, 5-core", spec: `${cable.result.data.recommendedCsaMm2} mm² minimum by voltage drop; current rating checked for grouping`, qty: `${vehicles} x ${FLEET_CABLE_M} m`, source: "calculateVoltageDrop()", label: "needs site check" },
        { item: "Load sharing", spec: over ? `Shared cap ${sharedKw} kW across ${vehicles} chargers` : "Not required at this supply", qty: "1", source: "calculatePeakLoad()", label: "estimated" },
      ],
      result: {
        headline:
          perCarKw > 0
            ? `${vehicles} Pulse+ chargers${over ? ` sharing ${sharedKw} kW` : ""}: each car gets ${perCarKw} kW and recharges in ${hoursText(hours)} of a ${windowH} h window.`
            : `Building loads use the whole ${supplyKva} kVA supply, so there is no capacity left for charging without an upgrade.`,
        figures: [
          { label: "Fleet energy", value: `${n(fleet.result, "kwhPerDay")} kWh`, label2: fleet.result.label },
          { label: "Per car", value: `${perCarKw} kW`, label2: over ? "estimated" : "calculated" },
          { label: "Charge time", value: time ? hoursText(hours) : "-", label2: time ? time.result.label : "assumed" },
          { label: "Breaker each", value: `${prot.result.data.breakerA} A`, label2: prot.result.label },
        ],
        checks: siteChecks(tasks),
        status: fits
          ? { ok: true, text: over ? "Unmanaged demand exceeds the supply; with load sharing every car still finishes inside the window." : "All cars can charge at full power inside the supply." }
          : { ok: false, text: "The cars do not finish inside the window at this supply. Lengthen the window, stagger shifts or raise the supply, then re-run." },
      },
    };
  },
};

/* ------------------------------------------------------------------ */
/* Brief 3: school solar and backup                                    */
/* ------------------------------------------------------------------ */

const MODULE_KWH = 5;

const solarBrief: WorkspaceBrief = {
  id: "solar",
  label: "School solar and backup",
  short: "Solar",
  controls: [
    { id: "dailyKwh", label: "Daily energy from solar", min: 10, max: 120, step: 5, unit: "kWh" },
    { id: "peakKw", label: "Peak AC load", min: 2, max: 30, step: 1, unit: "kW" },
    { id: "criticalKw", label: "Critical load in outages", min: 1, max: 10, step: 0.5, unit: "kW" },
    { id: "backupH", label: "Backup", min: 1, max: 12, step: 1, unit: "h" },
  ],
  defaults: { dailyKwh: 40, peakKw: 6, criticalKw: 3, backupH: 4 },
  run: ({ dailyKwh, peakKw, criticalKw, backupH }) => {
    const pv = task("pv", "Solar array", "sizePvSystem", { dailyKwh }, (r) => `${r.data.panels} x ${r.data.panelWatts} W, ${r.data.installedKwp} kWp`);
    const batt = task("batt", "Battery for backup", "sizeBattery", { criticalLoadKw: criticalKw, backupHours: backupH, roundToKwh: MODULE_KWH }, (r) => `${r.data.modules} x ${MODULE_KWH} kWh = ${r.data.sizedKwh} kWh`);
    const inv = task("inv", "Inverter rating", "sizeInverter", { peakLoadKw: peakKw, pvKwp: n(pv.result, "installedKwp") }, (r) => `${r.data.recommendedKw} kW`);
    const invKw = n(inv.result, "recommendedKw");
    const three = invKw > 10;
    const prot = task("prot", "Inverter AC protection", "sizeProtection", { loadKw: invKw, system: three ? "three-phase" : "single-phase", isEvCharger: false }, (r) => `${r.data.breakerA} A ${r.data.poles}`);
    const value = task("value", "Value of solar energy", "calculateEnergyCost", { kwhPerDay: n(pv.result, "dailyYieldKwh"), kesPerKwh: TARIFF_KES_KWH }, (r) => `${kes(n(r, "kesPerYear"))}/year`);
    const tasks = [pv, batt, inv, prot, value];

    return {
      project: `School solar · ${dailyKwh} kWh a day`,
      prompt: `A school wants solar to cover ${dailyKwh} kWh a day, with a ${peakKw} kW peak load and ${backupH} hours of backup for a ${criticalKw} kW critical load. Size PV, battery and inverter.`,
      assumptions: [
        "Peak sun hours, performance ratio and module rating at the kernel's defaults",
        `LiFePO4 battery in ${MODULE_KWH} kWh modules, generic`,
        `Grid energy valued at KES ${TARIFF_KES_KWH}/kWh`,
      ],
      tasks,
      diagram: {
        caption: `Hybrid system, ${three ? "three-phase 400 V" : "single-phase 230 V"} AC side. Roof, shading and DC string design are confirmed on site.`,
        nodes: [
          { id: "pv", title: "PV array", lines: [`${n(pv.result, "installedKwp")} kWp`, `${pv.result.data.panels} modules`], kind: "pv", check: true, land: [110, 80], port: [90, 50] },
          { id: "batt", title: "Battery", lines: [`${n(batt.result, "sizedKwh")} kWh LiFePO4`], kind: "battery", land: [110, 300], port: [270, 50] },
          { id: "grid", title: "Kenya Power", lines: [three ? "Three-phase" : "Single-phase"], kind: "grid", land: [380, 70], port: [90, 185] },
          { id: "inv", title: "Hybrid inverter", lines: [`${invKw} kW`, `${prot.result.data.breakerA} A AC breaker`], kind: "inverter", land: [380, 190], port: [270, 185] },
          { id: "crit", title: "Critical loads", lines: [`${criticalKw} kW for ${backupH} h`], kind: "load", land: [640, 120], port: [90, 320] },
          { id: "main", title: "School board", lines: [`${peakKw} kW peak`], kind: "board", land: [640, 260], port: [270, 320] },
        ],
        edges: [
          { from: "pv", to: "inv", kind: "dc" },
          { from: "batt", to: "inv", kind: "dc" },
          { from: "grid", to: "inv", kind: "ac" },
          { from: "inv", to: "crit", kind: "ac" },
          { from: "inv", to: "main", kind: "ac" },
        ],
      },
      parts: [
        { item: "PV modules", spec: `${pv.result.data.panelWatts} W each, about ${pv.result.data.roofAreaM2} m² of roof`, qty: String(pv.result.data.panels), source: "sizePvSystem()", label: "needs site check" },
        { item: "LiFePO4 battery modules", spec: `${MODULE_KWH} kWh each, ${batt.result.data.nameplateKwh} kWh nameplate needed`, qty: String(batt.result.data.modules), source: "sizeBattery()", label: "calculated" },
        { item: "Hybrid inverter", spec: `${invKw} kW continuous`, qty: "1", source: "sizeInverter()", label: "calculated" },
        { item: "AC circuit breaker", spec: `${prot.result.data.breakerA} A, ${prot.result.data.poles}`, qty: "1", source: "sizeProtection()", label: "calculated" },
        { item: "DC isolators and surge protection", spec: "Rated to the string design", qty: "1 set", source: "Engineer", label: "needs site check" },
      ],
      result: {
        headline: `PV array ${n(pv.result, "installedKwp")} kWp, battery ${n(batt.result, "sizedKwh")} kWh, hybrid inverter ${invKw} kW: covers ${dailyKwh} kWh a day and ${backupH} h of backup.`,
        figures: [
          { label: "PV array", value: `${n(pv.result, "installedKwp")} kWp`, label2: pv.result.label },
          { label: "Battery", value: `${n(batt.result, "sizedKwh")} kWh`, label2: batt.result.label },
          { label: "Inverter", value: `${invKw} kW`, label2: inv.result.label },
          { label: "Energy value", value: `${kes(n(value.result, "kesPerYear"))}/yr`, label2: value.result.label },
        ],
        checks: siteChecks(tasks),
        status: { ok: true, text: "Sizing complete. Irradiance, roof and string design need site data before a quote." },
      },
    };
  },
};

export const workspaceBriefs: readonly WorkspaceBrief[] = [homeBrief, fleetBrief, solarBrief];
