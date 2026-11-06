"use client";

import { useId, useMemo, useState } from "react";
import EvidenceChip from "@/components/agent/EvidenceChip";
import StageLabel from "@/components/interior/StageLabel";
import { agentToolCatalogue, engineeringToolDefinitions, runEngineeringTool, type EngineeringToolName } from "@/lib/agent/tools/engineering";

/**
 * Live tool bench: every tool in the Agent's engineering kernel, its schema (the same definition the model
 * sees) and a form generated from that schema. Results come from runEngineeringTool in the browser.
 * The example inputs are starting values for the visitor to change, not Precifarm claims.
 */

type Prop = { type?: string; enum?: readonly string[]; description?: string; items?: unknown };

const examples: Record<EngineeringToolName, Record<string, unknown>> = {
  calculateEvEnergy: { dailyKm: 80, kwhPer100km: 18 },
  calculateChargingTime: { kwh: 14.4, chargerKw: 7 },
  calculatePeakLoad: { loadsKw: [3, 3, 2], evChargerKw: 7, supplyKva: 15 },
  sizePvSystem: { dailyKwh: 40 },
  sizeBattery: { criticalLoadKw: 3, backupHours: 4, roundToKwh: 5 },
  sizeInverter: { peakLoadKw: 6, pvKwp: 9.35 },
  calculateVoltageDrop: { currentA: 30.4, lengthM: 25, csaMm2: 6, system: "single-phase", limitPct: 3 },
  sizeProtection: { loadKw: 7, system: "single-phase", isEvCharger: true },
  calculateEnergyCost: { kwhPerDay: 16, kesPerKwh: 25, dailyKm: 80, fuelLPer100km: 8, kesPerLitre: 190 },
  lookupPrecifarmProduct: { productId: "pulse" },
};

const defs = Object.fromEntries(engineeringToolDefinitions.map((d) => [d.function.name, d.function])) as Record<
  EngineeringToolName,
  (typeof engineeringToolDefinitions)[number]["function"]
>;

function toText(v: unknown) {
  if (v === undefined || v === null) return "";
  return Array.isArray(v) ? v.join(", ") : String(v);
}

function parse(prop: Prop, raw: string): unknown {
  if (raw.trim() === "") return undefined;
  if (prop.type === "array") return raw.split(/[,\s]+/).filter(Boolean).map(Number);
  if (prop.type === "number") return Number(raw);
  if (prop.type === "boolean") return raw === "true";
  return raw;
}

export default function ToolBench() {
  const uid = useId();
  const [tool, setTool] = useState<EngineeringToolName>("calculateVoltageDrop");
  const [inputs, setInputs] = useState<Record<string, Record<string, string>>>(() =>
    Object.fromEntries(
      agentToolCatalogue.map((t) => [t.name, Object.fromEntries(Object.entries(examples[t.name]).map(([k, v]) => [k, toText(v)]))]),
    ),
  );

  const def = defs[tool];
  const props = def.parameters.properties as Record<string, Prop>;
  const required = def.parameters.required as readonly string[];

  const args = useMemo(() => {
    const out: Record<string, unknown> = {};
    for (const [k, raw] of Object.entries(inputs[tool])) {
      const v = parse(props[k] ?? {}, raw);
      if (v !== undefined) out[k] = v;
    }
    return out;
  }, [inputs, tool, props]);
  const result = useMemo(() => runEngineeringTool(tool, args), [tool, args]);

  const set = (k: string, v: string) => setInputs((all) => ({ ...all, [tool]: { ...all[tool], [k]: v } }));

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold text-forest-900">Engineering tool kernel</p>
        <StageLabel kind="available" label="Live in your browser" />
      </div>
      <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <label htmlFor={`${uid}-tool`} className="sr-only">
            Choose a tool
          </label>
          <select
            id={`${uid}-tool`}
            value={tool}
            onChange={(e) => setTool(e.target.value as EngineeringToolName)}
            className="m-4 block w-[calc(100%-2rem)] rounded-xl border border-border bg-[#f6f7f8] px-3 py-3 text-sm text-forest-900 lg:hidden"
          >
            {agentToolCatalogue.map((t) => (
              <option key={t.name} value={t.name}>
                {t.label}: {t.name}()
              </option>
            ))}
          </select>
          <ul className="hidden p-2 lg:block" aria-label="Tools">
            {agentToolCatalogue.map((t) => (
              <li key={t.name}>
                <button
                  type="button"
                  aria-pressed={t.name === tool}
                  onClick={() => setTool(t.name)}
                  className={`flex w-full flex-col rounded-xl px-3 py-2 text-left transition-colors ${
                    t.name === tool ? "bg-forest-950 text-white" : "text-forest-700 hover:bg-[#f1f3f4]"
                  }`}
                >
                  <span className="text-[13px] font-semibold">{t.label}</span>
                  <span className={`font-mono text-[11px] ${t.name === tool ? "text-white/65" : "text-forest-500"}`}>{t.name}()</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid min-w-0 gap-px bg-border xl:grid-cols-2">
          <div className="min-w-0 bg-white p-4 sm:p-6">
            <p className="font-mono text-[13px] font-semibold text-forest-900">{def.name}()</p>
            <p className="mt-1.5 text-sm leading-relaxed text-forest-600">{def.description}</p>
            <div className="mt-5 space-y-3.5">
              {Object.entries(props).map(([k, p]) => {
                const id = `${uid}-${tool}-${k}`;
                const req = required.includes(k);
                return (
                  <div key={k}>
                    <label htmlFor={id} className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[12px] text-forest-900">
                        {k}
                        {req ? <span className="text-charge-600"> *</span> : null}
                      </span>
                      <span className="text-[11px] text-forest-500">{p.type === "array" ? "comma separated" : p.type}</span>
                    </label>
                    {p.enum || p.type === "boolean" ? (
                      <select
                        id={id}
                        value={inputs[tool][k] ?? ""}
                        onChange={(e) => set(k, e.target.value)}
                        className="mt-1 w-full rounded-lg border border-border bg-[#f6f7f8] px-3 py-2.5 text-sm text-forest-900"
                      >
                        <option value="">default</option>
                        {(p.enum ?? ["true", "false"]).map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={id}
                        inputMode={p.type === "number" ? "decimal" : "text"}
                        value={inputs[tool][k] ?? ""}
                        placeholder="default"
                        onChange={(e) => set(k, e.target.value)}
                        className="mt-1 w-full rounded-lg border border-border bg-[#f6f7f8] px-3 py-2.5 font-mono text-sm text-forest-900"
                      />
                    )}
                    {p.description ? <p className="mt-1 text-[11.5px] leading-snug text-forest-500">{p.description}</p> : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="min-w-0 bg-[#0c0f12] p-4 text-white sm:p-6" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/55">Result</p>
              <EvidenceChip label={result.label} />
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-white/90">{result.summary}</p>
            {result.notes?.length ? (
              <ul className="mt-3 space-y-1.5">
                {result.notes.map((nt) => (
                  <li key={nt} className="text-[12px] leading-snug text-white/60">
                    · {nt}
                  </li>
                ))}
              </ul>
            ) : null}
            <details className="group mt-4">
              <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1.5 font-mono text-[11px] text-white/60 hover:text-white [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="transition-transform group-open:rotate-90">›</span>
                Raw data
              </summary>
              <pre tabIndex={0} className="mt-2 max-h-72 overflow-auto rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-sky-100/85">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
