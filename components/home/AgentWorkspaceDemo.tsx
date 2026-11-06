"use client";

import { useEffect, useMemo, useState } from "react";
import AnimatedNumber from "@/components/home/AnimatedNumber";
import { runEngineeringTool, type ToolResult } from "@/lib/agent/tools/engineering";
import { useInView } from "@/lib/use-in-view";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * A working Precifarm Agent calculation on the homepage. The numbers come from the same
 * deterministic tools the Agent calls (lib/agent/tools/engineering.ts), run in the browser
 * when the visitor changes the brief. No model call, so nothing here is scripted.
 * Motion: when the card scrolls into view, or the brief changes, the steps run one after
 * another (queued, running, done) and the single line diagram energises at the end.
 */

const STEP_MS = 520;

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
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  /** How many steps have finished; steps.length + 1 means the diagram is live. */
  const [doneStep, setDone] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const timers = Array.from({ length: steps.length + 2 }, (_, n) => window.setTimeout(() => setDone(n), n * STEP_MS));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, reduced, dailyKm, steps.length]);

  const done = reduced && inView ? steps.length + 1 : doneStep;
  const live = done > steps.length;
  const values = [
    <AnimatedNumber key="e" value={Number(energy.result.data.kwhPerDay)} format={(n) => `${n.toFixed(1)} kWh`} />,
    <AnimatedNumber key="t" value={Number(time.result.data.hoursWithLosses)} format={hoursText} />,
    <>{`${prot.result.data.breakerA} A + RCD`}</>,
    <AnimatedNumber key="c" value={Number(cable.result.data.dropPct)} format={(n) => `${n.toFixed(2)}% drop`} />,
  ];

  return (
    <div ref={ref} className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
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

      <ol className="divide-y divide-white/10">
        {steps.map((s, i) => {
          const state = i < done ? "done" : i === done ? "running" : "queued";
          return (
            <li
              key={s.tool}
              className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-300 ${state === "running" ? "bg-brand-400/[0.07]" : ""}`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors duration-300 ${
                  state === "done" ? "bg-brand-300 text-forest-950" : "bg-brand-400/25 text-brand-300"
                }`}
                aria-hidden
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <span className={`min-w-0 flex-1 text-sm transition-colors duration-300 ${state === "queued" ? "text-white/45" : "text-white/85"}`}>
                {s.label}
              </span>
              <span className="font-mono text-sm font-semibold text-white">
                {state === "done" ? (
                  values[i]
                ) : state === "running" ? (
                  <span className="inline-flex gap-1 text-brand-300" aria-label="Calculating">
                    <span className="agent-dot">●</span>
                    <span className="agent-dot [animation-delay:150ms]">●</span>
                    <span className="agent-dot [animation-delay:300ms]">●</span>
                  </span>
                ) : (
                  <span className="text-white/35">queued</span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {live ? `Results for ${dailyKm} km a day: ${energy.result.data.kwhPerDay} kWh daily energy, ${hoursText(Number(time.result.data.hoursWithLosses))} charge time, ${prot.result.data.breakerA} A breaker with RCD, ${cable.result.data.dropPct}% cable voltage drop.` : ""}
      </p>

      <figure className="border-t border-white/10 px-4 py-4">
        <figcaption className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/60">
          Single line diagram
          <span className={`transition-opacity duration-500 ${live ? "text-brand-300 opacity-100" : "opacity-0"}`}>Energised</span>
        </figcaption>
        <ol className="mt-3 flex items-stretch text-center" aria-label="From the meter to the car">
          {[
            { top: "Meter", sub: "Kenya Power" },
            { top: `${prot.result.data.breakerA} A MCB`, sub: "30 mA RCD" },
            { top: `${CABLE_MM2} mm² Cu`, sub: `${CABLE_M} m · ${cable.result.data.dropPct}%`, cable: true },
            { top: "Pulse", sub: "7 kW", accent: true },
            { top: "EV", sub: "Type 2" },
          ].map((n, i, all) => (
            <li key={n.top} className="flex min-w-0 flex-1 items-center">
              <span
                style={{ transitionDelay: live ? `${i * 140}ms` : "0ms" }}
                className={`flex h-full w-full min-w-0 flex-col justify-center rounded-lg border px-1 py-1.5 transition-[border-color,box-shadow,background-color] duration-500 ${
                  live
                    ? "border-brand-300 bg-brand-400/10 shadow-[0_0_14px_rgba(126,192,157,0.25)]"
                    : n.accent
                      ? "border-brand-300/60"
                      : n.cable
                        ? "border-dashed border-brand-300/40"
                        : "border-white/25"
                }`}
              >
                <span className="font-mono text-[10px] font-semibold leading-tight text-white sm:text-[11px]">{n.top}</span>
                <span className="mt-0.5 text-[9px] leading-tight text-white/60 sm:text-[10px]">{n.sub}</span>
              </span>
              {i < all.length - 1 ? (
                <span aria-hidden data-live={live && !reduced} className="sld-wire mx-0.5 h-0.5 w-2 shrink-0 rounded-full sm:w-3" />
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
