"use client";

import { useMemo, useState } from "react";
import { runEngineeringTool, type ToolResult } from "@/lib/agent/tools/engineering";

/**
 * A working Precifarm Agent calculation on the homepage. The numbers come from the same
 * deterministic tools the Agent calls (lib/agent/tools/engineering.ts), run in the browser
 * when the visitor changes the brief. No model call, so nothing here is scripted.
 */

const DISTANCES = [40, 80, 120, 200] as const;
const KWH_PER_100KM = 18;
const CHARGER_KW = 7;
const CABLE_M = 25;
const CABLE_MM2 = 6;

type Step = { tool: string; label: string; args: Record<string, unknown>; result: ToolResult };

function hoursText(h: number) {
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  return mins === 60 ? `${whole + 1} h` : `${whole} h ${mins.toString().padStart(2, "0")} min`;
}

function run(dailyKm: number): Step[] {
  const energyArgs = { dailyKm, kwhPer100km: KWH_PER_100KM };
  const energy = runEngineeringTool("calculateEvEnergy", energyArgs);
  const kwh = Number(energy.data.kwhPerDay);

  const timeArgs = { kwh, chargerKw: CHARGER_KW };
  const time = runEngineeringTool("calculateChargingTime", timeArgs);

  const protArgs = { loadKw: CHARGER_KW, system: "single-phase", isEvCharger: true };
  const prot = runEngineeringTool("sizeProtection", protArgs);

  const cableArgs = {
    currentA: Number(prot.data.designCurrentA),
    lengthM: CABLE_M,
    system: "single-phase",
    csaMm2: CABLE_MM2,
  };
  const cable = runEngineeringTool("calculateVoltageDrop", cableArgs);

  return [
    { tool: "calculateEvEnergy", label: "Daily EV energy", args: energyArgs, result: energy },
    { tool: "calculateChargingTime", label: "Overnight charge time", args: timeArgs, result: time },
    { tool: "sizeProtection", label: "Circuit protection", args: protArgs, result: prot },
    { tool: "calculateVoltageDrop", label: "Cable check", args: cableArgs, result: cable },
  ];
}

export default function AgentWorkspaceDemo() {
  const [dailyKm, setDailyKm] = useState<number>(80);
  const steps = useMemo(() => run(dailyKm), [dailyKm]);
  const [energy, time, prot, cable] = steps;

  const results = [
    { label: "Daily EV energy", value: `${energy.result.data.kwhPerDay} kWh` },
    { label: "Charge time on Pulse 7 kW", value: hoursText(Number(time.result.data.hoursWithLosses)) },
    { label: "Breaker", value: `${prot.result.data.breakerA} A + RCD` },
    { label: `Cable ${CABLE_MM2} mm², ${CABLE_M} m`, value: `${cable.result.data.dropPct}% drop` },
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
      <div className="border-b border-white/10 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Project brief</p>
        <p className="mt-1.5 text-sm leading-relaxed text-white/85">
          3-bedroom house in Nairobi, single-phase supply, power cuts most weeks.
        </p>
        <p className="mt-3 text-xs text-white/60">Daily driving</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Daily driving distance">
          {DISTANCES.map((km) => (
            <button
              key={km}
              type="button"
              aria-pressed={dailyKm === km}
              onClick={() => setDailyKm(km)}
              className={`min-h-9 rounded-full border px-3.5 text-xs font-semibold transition-colors ${
                dailyKm === km
                  ? "border-brand-300 bg-brand-300 text-forest-950"
                  : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"
              }`}
            >
              {km} km
            </button>
          ))}
        </div>
      </div>

      <ol className="divide-y divide-white/10" aria-live="polite">
        {steps.map((s, i) => (
          <li key={s.tool} className="flex items-center gap-3 px-4 py-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/25 font-mono text-[10px] text-brand-300">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 text-sm text-white/85">{s.label}</span>
            <span className="font-mono text-sm font-semibold text-white">{results[i].value}</span>
          </li>
        ))}
      </ol>

      <figure className="border-t border-white/10 px-4 py-4">
        <figcaption className="font-mono text-[10px] uppercase tracking-widest text-white/60">Single line diagram</figcaption>
        <ol className="mt-3 flex flex-wrap items-stretch gap-y-2 text-center" aria-label="From the meter to the car">
          {[
            { top: "Meter", sub: "Kenya Power" },
            { top: `${prot.result.data.breakerA} A MCB`, sub: "30 mA RCD" },
            { top: `${CABLE_MM2} mm² Cu`, sub: `${CABLE_M} m · ${cable.result.data.dropPct}%`, cable: true },
            { top: "Pulse", sub: "7 kW", accent: true },
            { top: "EV", sub: "Type 2" },
          ].map((n, i, all) => (
            <li key={n.top} className="flex items-center">
              <span
                className={`flex min-w-[4.25rem] flex-col rounded-lg border px-2 py-1.5 ${
                  n.accent ? "border-brand-300 text-brand-300" : n.cable ? "border-dashed border-brand-300/60" : "border-white/25"
                }`}
              >
                <span className="font-mono text-[11px] font-semibold text-white">{n.top}</span>
                <span className="text-[10px] text-white/60">{n.sub}</span>
              </span>
              {i < all.length - 1 ? (
                <span aria-hidden className="mx-1 h-px w-3 bg-white/45 sm:w-4" />
              ) : null}
            </li>
          ))}
        </ol>
      </figure>

      <details className="group border-t border-white/10">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-xs font-semibold uppercase tracking-widest text-brand-300 [&::-webkit-details-marker]:hidden">
          Calculation trace
          <span aria-hidden className="transition-transform group-open:rotate-90">›</span>
        </summary>
        <ol className="space-y-3 px-4 pb-4">
          {steps.map((s) => (
            <li key={s.tool} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="break-words font-mono text-[11px] text-brand-300">
                {s.tool}({Object.entries(s.args).map(([k, v]) => `${k}: ${v}`).join(", ")})
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/80">{s.result.summary}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-white/55">{s.result.label}</p>
            </li>
          ))}
          <li className="text-xs leading-relaxed text-white/60">
            Assumes {KWH_PER_100KM} kWh per 100 km and a {CABLE_M} m run from the consumer unit. A site survey confirms
            the supply, earthing and cable route.
          </li>
        </ol>
      </details>
    </div>
  );
}
