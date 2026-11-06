"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import StageLabel from "@/components/interior/StageLabel";
import type { KenyaEvModel } from "@/lib/kenya-ev-compatibility";
import { bodyFilters, bodyGroup, fitLabels, fitTags, productStage, usesChademo, type BodyFilter } from "@/lib/pages/evs";
import { rangeText } from "@/lib/publications";

function FitPanel({ m }: { m: KenyaEvModel }) {
  const chademo = usesChademo(m);
  const bike = bodyGroup(m) === "bike";
  const rows: { label: string; value: string; note?: string }[] = [
    { label: "Body", value: m.body },
    { label: "Battery", value: rangeText(m.battery) },
    { label: "Practical range", value: rangeText(m.practicalRange), note: "On Kenyan roads; varies with speed, load and terrain" },
    { label: bike ? "Charging" : "DC charging", value: rangeText(m.dcCharging) },
  ];
  const times = [
    m.chargingTime.swap ? { k: "Battery swap", v: m.chargingTime.swap.replace("<", "under "), product: "Boda Hub" } : null,
    m.chargingTime.home ? { k: bike ? "Home charge" : "Home, Pulse charger", v: m.chargingTime.home.replace(/ h$/, " hours").replace(/ hr$/, " hours"), product: bike ? undefined : "Pulse charger" } : null,
    m.chargingTime.dc ? { k: "DC fast charging", v: m.chargingTime.dc, product: chademo ? undefined : "ARC Corridor" } : null,
  ].filter(Boolean) as { k: string; v: string; product?: string }[];

  return (
    <div className="rounded-2xl bg-white ring-1 ring-border">
      <div className="border-b border-border px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Selected vehicle</p>
        <p className="mt-1 font-display text-xl font-semibold tracking-tight text-forest-950">{m.model}</p>
      </div>
      <dl className="divide-y divide-border text-sm">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3 px-5 py-2.5">
            <dt className="text-forest-500">{r.label}</dt>
            <dd className="font-medium text-forest-900">
              {r.value}
              {r.note ? <span className="mt-0.5 block text-xs font-normal text-forest-500">{r.note}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-border bg-[#fbfbfc] px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Daily top-up, about 60 km</p>
        <ul className="mt-3 space-y-2.5">
          {times.map((t) => (
            <li key={t.k} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="text-sm text-forest-700">{t.k}</span>
              <span className="flex items-center gap-2">
                {t.product && productStage[t.product] ? <StageLabel kind={productStage[t.product]} /> : null}
                <span className="font-mono text-sm font-semibold tabular-nums text-forest-950">{t.v}</span>
              </span>
            </li>
          ))}
        </ul>
        {chademo ? (
          <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-950 ring-1 ring-inset ring-amber-200">
            This car fast-charges through CHAdeMO. ARC Corridor and many Kenyan DC chargers are CCS2 only, so confirm a CHAdeMO connector before a trip.
          </p>
        ) : null}
      </div>
      <div className="border-t border-border px-5 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Where it charges with Precifarm</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {fitTags(m).map((tag) => {
            const f = fitLabels[tag];
            const text = f?.product ? `${f.label}: ${f.product}` : (f?.label ?? tag);
            return (
              <li key={tag}>
                {f?.href ? (
                  <Link href={f.href} className="inline-flex min-h-9 items-center rounded-full bg-[#f1f3f4] px-3 text-xs font-medium text-forest-800 hover:bg-forest-100">
                    {text}
                  </Link>
                ) : (
                  <span className="inline-flex min-h-9 items-center rounded-full bg-[#f1f3f4] px-3 text-xs font-medium text-forest-800">{text}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** Pick a vehicle and see its range, top-up times and which Precifarm charging fits it. */
export default function EvExplorer({ models }: { models: readonly KenyaEvModel[] }) {
  const [query, setQuery] = useState("");
  const [body, setBody] = useState<BodyFilter>("all");
  const [selected, setSelected] = useState<string>(models.find((m) => m.featured)?.id ?? models[0]?.id);
  const searchId = useId();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter((m) => (body === "all" || bodyGroup(m) === body) && (!q || `${m.model} ${m.body}`.toLowerCase().includes(q)));
  }, [models, query, body]);

  const current = models.find((m) => m.id === selected) ?? list[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
      <div className="min-w-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor={searchId} className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
              Find your vehicle
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Leaf, Atto 3, Roam…"
              autoComplete="off"
              className="mt-2 h-12 w-full rounded-xl border border-forest-200 bg-white px-4 text-[15px] text-forest-950 placeholder:text-forest-400 focus:border-charge-600 focus:outline-none focus:ring-2 focus:ring-charge-600/20"
            />
          </div>
        </div>
        <div role="group" aria-label="Filter by body type" className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {bodyFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={body === f.id}
              onClick={() => setBody(f.id)}
              className={`inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm transition-colors ${
                body === f.id ? "border-forest-950 bg-forest-950 font-medium text-white" : "border-forest-200 bg-white text-forest-700 hover:border-forest-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="mt-4 text-sm text-forest-600">
          {list.length} of {models.length} models
        </p>
        {list.length ? (
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl bg-white ring-1 ring-border">
            {list.map((m) => {
              const on = current?.id === m.id;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSelected(m.id)}
                    className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_7rem_6rem] sm:px-5 ${
                      on ? "bg-charge-50/70" : "hover:bg-[#fbfbfc]"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className={`block font-semibold ${on ? "text-charge-700" : "text-forest-950"}`}>{m.model}</span>
                      <span className="block text-xs text-forest-500">
                        {m.body}
                        {usesChademo(m) ? " · CHAdeMO" : ""}
                      </span>
                    </span>
                    <span className="hidden text-right font-mono text-xs text-forest-700 sm:block">{rangeText(m.practicalRange)}</span>
                    <span className="text-right font-mono text-xs text-forest-700">{rangeText(m.battery)}</span>
                  </button>
                  {on ? (
                    <div className="border-t border-border bg-[#f6f7f8] p-3 lg:hidden">
                      <FitPanel m={m} />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-3 rounded-2xl border border-dashed border-forest-200 px-5 py-8 text-center text-sm text-forest-600">
            No model in this guide matches. Check the spelling, or{" "}
            <Link href="/contact?interest=general" className="font-semibold text-charge-700 underline underline-offset-2">
              ask us about your vehicle
            </Link>
            .
          </div>
        )}
      </div>
      <div className="hidden lg:block">
        <div className="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)]">{current ? <FitPanel m={current} /> : null}</div>
      </div>
    </div>
  );
}
