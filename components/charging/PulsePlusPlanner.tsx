"use client";

import { useId, useMemo, useState } from "react";
import { runEngineeringTool } from "@/lib/agent/tools/engineering";
import { formatHours } from "@/lib/pages/format";

type CarClass = { id: string; kw: number; label: string };

const EFFICIENCY = 0.9;
const PF = 0.95; // power factor used inside calculatePeakLoad

function Field({ label, unit, value, onChange, min, max, step = 1, hint }: { label: string; unit: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; hint?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-forest-900">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-xl bg-white ring-1 ring-border focus-within:ring-2 focus-within:ring-forest-700/30">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          className="min-w-0 flex-1 rounded-xl bg-transparent px-3.5 py-3 font-mono text-sm text-forest-900 outline-none"
        />
        <span className="pr-3.5 text-xs font-medium text-forest-500">{unit}</span>
      </div>
      {hint ? <p className="mt-1.5 text-xs text-forest-500">{hint}</p> : null}
    </div>
  );
}

type Plan =
  | { ok: false; message: string }
  | {
      ok: true;
      bays: number;
      carKw: number;
      demandKw: number;
      existingKw: number;
      capacityKw: number;
      availableKw: number;
      sharing: boolean;
      perBayKw: number;
      kwhPerVehicle: number;
      hoursPerVehicle: number | null;
      perBayPerShift: number;
      vehicles: number;
      partialKwh: number;
      steps: string[];
    };

export default function PulsePlusPlanner({ maxUnits, classes, disclaimer }: { maxUnits: number; classes: readonly CarClass[]; disclaimer: string }) {
  const [bays, setBays] = useState(Math.min(4, maxUnits));
  const [supplyKva, setSupplyKva] = useState(50);
  const [existingKw, setExistingKw] = useState(15);
  const [carId, setCarId] = useState(classes[Math.min(1, classes.length - 1)].id);
  const [km, setKm] = useState(120);
  const [consumption, setConsumption] = useState(20);
  const [windowH, setWindowH] = useState(8);
  const carSelect = useId();
  const windowId = useId();

  const plan: Plan = useMemo(() => {
    const car = classes.find((c) => c.id === carId) ?? classes[0];
    const inputs = [supplyKva, existingKw, km, consumption, windowH];
    if (inputs.some((v) => !Number.isFinite(v))) return { ok: false, message: "Fill in every field to see the estimate." };
    const evKw = bays * car.kw;
    const peak = runEngineeringTool("calculatePeakLoad", { loadsKw: [existingKw], diversityFactor: 1, evChargerKw: evKw, supplyKva });
    if (peak.data.error) return { ok: false, message: peak.summary };
    const energy = runEngineeringTool("calculateEvEnergy", { dailyKm: km, kwhPer100km: consumption });
    if (energy.data.error) return { ok: false, message: energy.summary };
    const headroom = Number(peak.data.headroomKw);
    const availableKw = Math.max(0, headroom + evKw);
    const capacityKw = supplyKva * PF;
    const perBayKw = Math.min(car.kw, availableKw / bays);
    const kwhPerVehicle = Number(energy.data.kwhPerDay);
    const steps = [peak.summary, energy.summary];
    let hoursPerVehicle: number | null = null;
    let perBayPerShift = 0;
    if (perBayKw >= 0.1 && kwhPerVehicle > 0) {
      const t = runEngineeringTool("calculateChargingTime", { kwh: kwhPerVehicle, chargerKw: Number(perBayKw.toFixed(2)), efficiency: EFFICIENCY });
      hoursPerVehicle = Number(t.data.hoursWithLosses);
      perBayPerShift = Math.floor(windowH / hoursPerVehicle + 1e-9);
      steps.push(t.summary);
    }
    return {
      ok: true,
      bays,
      carKw: car.kw,
      demandKw: evKw,
      existingKw,
      capacityKw,
      availableKw,
      sharing: headroom < 0,
      perBayKw,
      kwhPerVehicle,
      hoursPerVehicle,
      perBayPerShift,
      vehicles: bays * perBayPerShift,
      partialKwh: perBayKw * windowH * EFFICIENCY,
      steps,
    };
  }, [bays, supplyKva, existingKw, carId, km, consumption, windowH, classes]);

  const scale = plan.ok ? Math.max(plan.capacityKw, plan.existingKw + plan.demandKw) : 1;
  const pct = (v: number) => `${Math.max(0, (v / scale) * 100)}%`;

  return (
    <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-border">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <form className="grid content-start gap-5 bg-[#f6f7f8] p-5 sm:p-8" onSubmit={(e) => e.preventDefault()} aria-label="Site planner inputs">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Example inputs: replace with your site&apos;s</p>
          <div>
            <p className="text-sm font-semibold text-forest-900" id="pp-bays-label">
              Pulse+ bays
            </p>
            <div className="mt-2 flex items-center gap-3" role="group" aria-labelledby="pp-bays-label">
              <button type="button" onClick={() => setBays((b) => Math.max(1, b - 1))} disabled={bays <= 1} aria-label="One bay fewer" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-semibold text-forest-900 ring-1 ring-border hover:ring-forest-300 disabled:opacity-40">
                −
              </button>
              <output aria-live="polite" className="min-w-10 text-center font-display text-2xl font-semibold text-forest-950">
                {bays}
              </output>
              <button type="button" onClick={() => setBays((b) => Math.min(maxUnits, b + 1))} disabled={bays >= maxUnits} aria-label="One bay more" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-semibold text-forest-900 ring-1 ring-border hover:ring-forest-300 disabled:opacity-40">
                +
              </button>
              <span className="text-xs text-forest-500">Up to {maxUnits} on one meter</span>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Site supply" unit="kVA" value={supplyKva} onChange={setSupplyKva} min={0.5} max={10000} hint="From your Kenya Power bill or meter" />
            <Field label="Building peak load" unit="kW" value={existingKw} onChange={setExistingKw} min={0} max={10000} hint="Without the chargers" />
          </div>
          <div>
            <label htmlFor={carSelect} className="text-sm font-semibold text-forest-900">
              Vehicles&apos; on-board charger
            </label>
            <select id={carSelect} value={carId} onChange={(e) => setCarId(e.target.value)} className="field-input mt-2">
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Distance per vehicle per day" unit="km" value={km} onChange={setKm} min={0} max={2000} step={5} />
            <Field label="Consumption" unit="kWh/100 km" value={consumption} onChange={setConsumption} min={1} max={200} step={0.5} />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={windowId} className="text-sm font-semibold text-forest-900">
                Charging window per shift
              </label>
              <output htmlFor={windowId} className="font-mono text-sm font-semibold text-forest-900">
                {windowH} h
              </output>
            </div>
            <input id={windowId} type="range" min={1} max={14} step={0.5} value={windowH} onChange={(e) => setWindowH(Number(e.target.value))} className="mt-2 h-11 w-full cursor-pointer accent-[#1f6f4a]" />
          </div>
        </form>

        <div className="min-w-0 bg-white p-5 sm:p-8" aria-live="polite">
          {!plan.ok ? (
            <p role="status" className="text-sm text-forest-700">
              {plan.message}
            </p>
          ) : (
            <>
              <div className={`rounded-2xl px-4 py-3.5 ${plan.availableKw <= 0 ? "bg-red-50 text-red-900" : plan.sharing ? "bg-status-pilot-bg text-status-pilot" : "bg-status-available-bg text-status-available"}`}>
                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">Planning estimate</p>
                <p className="mt-1 text-lg font-semibold">
                  {plan.availableKw <= 0 ? "No spare supply for charging" : plan.sharing ? "Load sharing needed" : "Load sharing not needed at these inputs"}
                </p>
                <p className="mt-1 text-sm opacity-90">
                  {plan.availableKw <= 0
                    ? "The building already uses the supply. A supply upgrade comes before any charger."
                    : plan.sharing
                      ? `${plan.bays} bays at ${plan.carKw} kW would ask for ${plan.demandKw} kW; about ${Math.round(plan.availableKw)} kW is spare.`
                      : `${plan.bays} bays at ${plan.carKw} kW ask for ${plan.demandKw} kW, inside about ${Math.round(plan.availableKw)} kW spare.`}
                </p>
              </div>

              <figure className="mt-6">
                <figcaption className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Supply, in kW</figcaption>
                <div className="relative mt-3 h-9 overflow-hidden rounded-lg bg-[#eef0f2]">
                  <div className="absolute inset-y-0 left-0 bg-forest-300" style={{ width: pct(Math.min(plan.existingKw, plan.capacityKw)) }} />
                  <div
                    className="absolute inset-y-0 bg-charge-600 motion-safe:transition-all motion-safe:duration-500"
                    style={{ left: pct(Math.min(plan.existingKw, plan.capacityKw)), width: pct(Math.min(plan.demandKw, plan.availableKw)) }}
                  />
                  {plan.sharing && plan.availableKw > 0 ? (
                    <div
                      className="absolute inset-y-0 bg-[repeating-linear-gradient(45deg,#b91c1c_0,#b91c1c_3px,transparent_3px,transparent_8px)] opacity-60"
                      style={{ left: pct(plan.capacityKw), width: pct(plan.existingKw + plan.demandKw - plan.capacityKw) }}
                    />
                  ) : null}
                  <div className="absolute inset-y-0 w-0.5 bg-forest-950" style={{ left: pct(plan.capacityKw) }} />
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-forest-600">
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-forest-300" />
                    Building {plan.existingKw} kW
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-charge-600" />
                    Charging {Math.round(Math.min(plan.demandKw, plan.availableKw))} kW
                  </li>
                  {plan.sharing && plan.availableKw > 0 ? (
                    <li className="flex items-center gap-1.5">
                      <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-[repeating-linear-gradient(45deg,#b91c1c_0,#b91c1c_2px,transparent_2px,transparent_4px)]" />
                      Held back by sharing {Math.round(plan.existingKw + plan.demandKw - plan.capacityKw)} kW
                    </li>
                  ) : null}
                  <li className="flex items-center gap-1.5">
                    <span aria-hidden className="h-3 w-0.5 bg-forest-950" />
                    Supply {Math.round(plan.capacityKw)} kW
                  </li>
                </ul>
              </figure>

              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Each bay, all bays busy</p>
                <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
                  {Array.from({ length: plan.bays }, (_, i) => (
                    <li key={i} className="flex flex-col items-center gap-1.5">
                      <div className="relative h-16 w-full max-w-10 overflow-hidden rounded-md bg-[#eef0f2] ring-1 ring-border" aria-hidden>
                        <div className="absolute inset-x-0 bottom-0 bg-charge-600 motion-safe:transition-all motion-safe:duration-500" style={{ height: `${(plan.perBayKw / plan.carKw) * 100}%` }} />
                      </div>
                      <span className="font-mono text-[11px] text-forest-600">{plan.perBayKw.toFixed(1)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-forest-500">kW per bay, against the {plan.carKw} kW each vehicle could take.</p>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border">
                <div className="bg-white p-4">
                  <dt className="text-[11px] uppercase tracking-wider text-forest-500">Energy per vehicle</dt>
                  <dd className="mt-1 font-mono text-lg font-semibold text-forest-900">{plan.kwhPerVehicle} kWh</dd>
                </div>
                <div className="bg-white p-4">
                  <dt className="text-[11px] uppercase tracking-wider text-forest-500">Time per vehicle</dt>
                  <dd className="mt-1 font-mono text-lg font-semibold text-forest-900">{plan.hoursPerVehicle ? formatHours(plan.hoursPerVehicle) : "n/a"}</dd>
                </div>
                <div className="col-span-2 bg-forest-950 p-4 text-white">
                  <dt className="text-[11px] uppercase tracking-wider text-white/60">Vehicles charged per {windowH} h shift</dt>
                  <dd className="mt-1">
                    <span className="font-display text-3xl font-semibold">{plan.vehicles > 0 ? `About ${plan.vehicles}` : "None in full"}</span>
                    <span className="mt-1 block text-sm text-white/70">
                      {plan.vehicles > 0
                        ? `${plan.perBayPerShift} per bay, if each full vehicle is moved off its bay.`
                        : plan.perBayKw > 0
                          ? `Each bay adds about ${plan.partialKwh.toFixed(1)} kWh in the window, short of the ${plan.kwhPerVehicle} kWh each vehicle needs.`
                          : "No supply is left for charging."}
                    </span>
                  </dd>
                </div>
              </dl>

              <details className="mt-5 text-xs text-forest-600">
                <summary className="cursor-pointer text-sm font-semibold text-forest-800">How this was calculated</summary>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                  {plan.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                  <li>
                    Spare for charging = supply × {PF} − building load = {Math.round(plan.availableKw)} kW, shared over {plan.bays} bays and capped at {plan.carKw} kW each.
                  </li>
                </ol>
              </details>
            </>
          )}
        </div>
      </div>
      <p className="border-t border-border bg-white px-5 py-4 text-xs leading-relaxed text-forest-500 sm:px-8">{disclaimer}</p>
    </div>
  );
}
