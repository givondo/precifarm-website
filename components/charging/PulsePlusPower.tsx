"use client";

import { useId, useMemo, useState } from "react";
import { runEngineeringTool } from "@/lib/agent/tools/engineering";
import { formatHours } from "@/lib/pages/format";

type CarClass = { id: string; kw: number; label: string; note: string };

const EFFICIENCY = 0.9;

/** Delivered power = min(charger, car). Time for the chosen energy is calculated for every car class. */
export default function PulsePlusPower({ chargerKw, classes, note }: { chargerKw: number; classes: readonly CarClass[]; note: string }) {
  const [selected, setSelected] = useState(classes[classes.length - 1].id);
  const [kwh, setKwh] = useState(40);
  const sliderId = useId();

  const rows = useMemo(
    () =>
      classes.map((c) => {
        const delivered = Math.min(chargerKw, c.kw);
        const r = runEngineeringTool("calculateChargingTime", { kwh, chargerKw: delivered, efficiency: EFFICIENCY });
        return { ...c, delivered, hours: Number(r.data.hoursWithLosses), summary: r.summary };
      }),
    [classes, chargerKw, kwh],
  );
  const active = rows.find((r) => r.id === selected) ?? rows[0];
  const maxHours = Math.max(...rows.map((r) => r.hours));

  return (
    <div className="grid overflow-hidden rounded-[1.75rem] ring-1 ring-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="bg-forest-950 p-5 text-white sm:p-8">
        <fieldset>
          <legend className="text-sm font-semibold">Your car&apos;s on-board AC charger</legend>
          <div className="mt-3 grid gap-2">
            {rows.map((r) => (
              <label
                key={r.id}
                className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 ring-1 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-300 ${
                  r.id === selected ? "bg-white/10 ring-brand-300/60" : "ring-white/15 hover:ring-white/35"
                }`}
              >
                <input type="radio" name="pp-car" value={r.id} checked={r.id === selected} onChange={() => setSelected(r.id)} className="sr-only" />
                <span className="text-sm font-semibold">{r.label}</span>
                <span aria-hidden className={`h-3 w-3 rounded-full ring-2 ${r.id === selected ? "bg-brand-300 ring-brand-300" : "ring-white/40"}`} />
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8" aria-live="polite">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Delivered power</p>
          <p className="mt-2 font-display text-5xl font-semibold tracking-tight">
            {active.delivered} <span className="text-2xl text-white/70">kW</span>
          </p>
          <div className="mt-5 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Pulse+ offers</span>
                <span className="font-mono">{chargerKw} kW</span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-white/80" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Your car takes</span>
                <span className="font-mono">{active.delivered} kW</span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-brand-400 motion-safe:transition-all motion-safe:duration-500" style={{ width: `${(active.delivered / chargerKw) * 100}%` }} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">{active.note}</p>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={sliderId} className="text-sm font-semibold text-forest-900">
            Energy to add
          </label>
          <output htmlFor={sliderId} className="font-mono text-sm font-semibold text-forest-900">
            {kwh} kWh
          </output>
        </div>
        <input id={sliderId} type="range" min={10} max={80} step={5} value={kwh} onChange={(e) => setKwh(Number(e.target.value))} className="mt-3 h-11 w-full cursor-pointer accent-[#1f6f4a]" />

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-forest-500">Time on Pulse+, by car</p>
        <ul className="mt-3 space-y-4" aria-live="polite">
          {rows.map((r) => (
            <li key={r.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className={r.id === selected ? "font-semibold text-forest-900" : "text-forest-600"}>{r.label}</span>
                <span className="shrink-0 font-mono font-semibold text-forest-900">{formatHours(r.hours)}</span>
              </div>
              <div className="mt-1.5 h-3 rounded-full bg-[#eef0f2]">
                <div
                  className={`h-full rounded-full motion-safe:transition-all motion-safe:duration-500 ${r.id === selected ? "bg-charge-600" : "bg-forest-300"}`}
                  style={{ width: `${(r.hours / maxHours) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs leading-relaxed text-forest-500">{note}</p>
        <details className="mt-3 text-xs text-forest-600">
          <summary className="cursor-pointer font-semibold text-forest-700">Calculation</summary>
          <ul className="mt-2 space-y-1">
            {rows.map((r) => (
              <li key={r.id}>{r.summary}</li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
