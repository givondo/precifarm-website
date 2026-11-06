"use client";

import { useId, useMemo, useState } from "react";
import { runEngineeringTool } from "@/lib/agent/tools/engineering";
import { clock, formatHours } from "@/lib/pages/format";

type Car = { id: string; model: string; battery: string };

type Props = {
  /** Pulse maximum from the register (PUL-03) */
  pulseKw: number;
  /** Common on-board charger ratings named in the register (PUL-20) */
  obcOptions: readonly number[];
  cars: readonly Car[];
  obcNote: string;
};

const EFFICIENCY = 0.9; // the Agent tool's default; shown to the visitor
const WINDOW_START = 18; // 18:00
const WINDOW_HOURS = 12; // to 06:00

/** First number in a battery string such as "~45–60 kWh" or "40 kWh". */
function batteryLowerBound(s: string): number {
  const m = s.match(/(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 50;
}

function Segmented<T extends string>({ name, value, options, onChange, legend }: { name: string; value: T; options: readonly { value: T; label: string }[]; onChange: (v: T) => void; legend: string }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-forest-900">{legend}</legend>
      <div className="mt-2 grid auto-cols-fr grid-flow-col gap-1 rounded-full bg-[#eef0f2] p-1">
        {options.map((o) => (
          <label
            key={o.value}
            className={`relative flex min-h-10 cursor-pointer items-center justify-center rounded-full px-3 text-center text-[13px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-charge-600 ${
              value === o.value ? "bg-white text-forest-950 shadow-sm" : "text-forest-600 hover:text-forest-900"
            }`}
          >
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function NumberField({ label, unit, value, onChange, min, max, step = 1, hint }: { label: string; unit: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; hint?: string }) {
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

export default function HomeChargeCalculator({ pulseKw, obcOptions, cars, obcNote }: Props) {
  const [mode, setMode] = useState<"daily" | "topup">("daily");
  const [km, setKm] = useState(60);
  const [consumption, setConsumption] = useState(17);
  const [carId, setCarId] = useState(cars[0]?.id ?? "");
  const [battery, setBattery] = useState(batteryLowerBound(cars[0]?.battery ?? "50"));
  const [fromPct, setFromPct] = useState(20);
  const [toPct, setToPct] = useState(80);
  const [obc, setObc] = useState(String(obcOptions[obcOptions.length - 1] ?? pulseKw));
  const [plugIn, setPlugIn] = useState(20);
  const carSelectId = useId();
  const plugId = useId();

  const car = cars.find((c) => c.id === carId);

  const result = useMemo(() => {
    const energy =
      mode === "daily"
        ? runEngineeringTool("calculateEvEnergy", { dailyKm: km, kwhPer100km: consumption })
        : null;
    const kwh = mode === "daily" ? Number(energy?.data.kwhPerDay) : Math.max(0, (battery * (toPct - fromPct)) / 100);
    const kw = Math.min(pulseKw, Number(obc));
    if (!Number.isFinite(kwh) || kwh <= 0 || !Number.isFinite(kw) || kw <= 0) {
      return { ok: false as const, message: energy?.summary ?? "Enter a battery size and a target above the starting charge." };
    }
    const time = runEngineeringTool("calculateChargingTime", { kwh: Number(kwh.toFixed(2)), chargerKw: kw, efficiency: EFFICIENCY });
    if (time.data.error) return { ok: false as const, message: time.summary };
    return {
      ok: true as const,
      kwh: Number(kwh.toFixed(1)),
      kw,
      hours: Number(time.data.hoursWithLosses),
      ideal: Number(time.data.hoursIdeal),
      gridKwh: Number(time.data.gridKwh),
      steps: [energy?.summary, time.summary].filter(Boolean) as string[],
      notes: time.notes ?? [],
    };
  }, [mode, km, consumption, battery, fromPct, toPct, obc, pulseKw]);

  const done = result.ok ? plugIn + result.hours : plugIn;
  const barStart = ((plugIn - WINDOW_START) / WINDOW_HOURS) * 100;
  const barWidth = result.ok ? Math.min(100 - barStart, (result.hours / WINDOW_HOURS) * 100) : 0;
  const overflow = result.ok && plugIn + result.hours > WINDOW_START + WINDOW_HOURS;

  return (
    <div className="grid overflow-hidden rounded-[1.75rem] ring-1 ring-border lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <form className="grid content-start gap-6 bg-[#f6f7f8] p-5 sm:p-8" onSubmit={(e) => e.preventDefault()} aria-label="Charge time inputs">
        <Segmented
          name="calc-mode"
          legend="Work it out from"
          value={mode}
          onChange={setMode}
          options={[
            { value: "daily", label: "Daily driving" },
            { value: "topup", label: "Battery top-up" },
          ]}
        />

        {mode === "daily" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField label="Distance per day" unit="km" value={km} onChange={setKm} min={0} max={2000} step={5} />
            <NumberField
              label="Your car's consumption"
              unit="kWh/100 km"
              value={consumption}
              onChange={setConsumption}
              min={1}
              max={200}
              step={0.5}
              hint="Starts at 17, about the site's typical day: 60 km on roughly 10 kWh."
            />
          </div>
        ) : (
          <div className="grid gap-5">
            <div>
              <label htmlFor={carSelectId} className="text-sm font-semibold text-forest-900">
                Car (Kenya EV guide)
              </label>
              <select
                id={carSelectId}
                value={carId}
                onChange={(e) => {
                  setCarId(e.target.value);
                  const c = cars.find((x) => x.id === e.target.value);
                  if (c) setBattery(batteryLowerBound(c.battery));
                }}
                className="field-input mt-2"
              >
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.model} ({c.battery})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <NumberField label="Battery" unit="kWh" value={battery} onChange={setBattery} min={1} max={250} step={0.5} hint={car ? `Guide lists ${car.battery}` : undefined} />
              <NumberField label="From" unit="%" value={fromPct} onChange={setFromPct} min={0} max={100} step={5} />
              <NumberField label="To" unit="%" value={toPct} onChange={setToPct} min={0} max={100} step={5} />
            </div>
          </div>
        )}

        <div>
          <Segmented
            name="calc-obc"
            legend="Your car's on-board AC charger"
            value={obc}
            onChange={setObc}
            options={obcOptions.map((v) => ({ value: String(v), label: `${v} kW` }))}
          />
          <p className="mt-2 text-xs leading-relaxed text-forest-500">{obcNote}</p>
        </div>

        <div>
          <label htmlFor={plugId} className="text-sm font-semibold text-forest-900">
            Plug in at
          </label>
          <select id={plugId} value={plugIn} onChange={(e) => setPlugIn(Number(e.target.value))} className="field-input mt-2">
            {[18, 19, 20, 21, 22, 23].map((h) => (
              <option key={h} value={h}>
                {clock(h)}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="flex min-w-0 flex-col bg-forest-950 p-5 text-white sm:p-8" aria-live="polite">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Result · calculated</p>
        {result.ok ? (
          <>
            <p className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{formatHours(result.hours)}</p>
            <p className="mt-2 text-sm text-white/70">
              at {result.kw} kW for {result.kwh} kWh into the battery
            </p>

            <div className="mt-8">
              <div className="flex justify-between text-[11px] font-medium text-white/55">
                <span>{clock(WINDOW_START)}</span>
                <span>{clock(WINDOW_START + WINDOW_HOURS / 2)}</span>
                <span>{clock(WINDOW_START + WINDOW_HOURS)}</span>
              </div>
              <div className="relative mt-2 h-3 rounded-full bg-white/10">
                <div className="absolute inset-y-0 rounded-full bg-brand-400 motion-safe:transition-all motion-safe:duration-500" style={{ left: `${barStart}%`, width: `${Math.max(barWidth, 1)}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/80">
                {overflow ? (
                  <>Plug in at {clock(plugIn)} and it runs past {clock(WINDOW_START + WINDOW_HOURS)}: more than one night on Pulse.</>
                ) : (
                  <>
                    Plug in at {clock(plugIn)}, done by <span className="font-semibold text-white">{clock(done)}</span>.
                  </>
                )}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
              <div className="bg-forest-950 p-4">
                <dt className="text-[11px] uppercase tracking-wider text-white/55">From your meter</dt>
                <dd className="mt-1 font-mono text-lg font-semibold">{result.gridKwh} kWh</dd>
              </div>
              <div className="bg-forest-950 p-4">
                <dt className="text-[11px] uppercase tracking-wider text-white/55">Without losses</dt>
                <dd className="mt-1 font-mono text-lg font-semibold">{formatHours(result.ideal)}</dd>
              </div>
            </dl>

            <details className="mt-6 text-sm text-white/70">
              <summary className="cursor-pointer font-semibold text-white/85">How this was calculated</summary>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5">
                {result.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              {result.notes.map((n) => (
                <p key={n} className="mt-2 text-xs text-white/55">
                  {n}
                </p>
              ))}
            </details>
          </>
        ) : (
          <p role="status" className="mt-4 text-sm text-white/80">
            {result.message}
          </p>
        )}
        <p className="mt-auto pt-6 text-xs leading-relaxed text-white/50">
          Charging efficiency is assumed at {Math.round(EFFICIENCY * 100)}%. Real times change with battery temperature, state of charge and the car&apos;s own charging curve.
        </p>
      </div>
    </div>
  );
}
