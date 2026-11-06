import type { ReactNode } from "react";
import { StageLabel } from "@/components/interior";
import specs from "@/lib/generated/product-specs";

/**
 * Explanatory figures for the website's own guides. Every value shown is already stated in the guide
 * text (lib/seo/static-guides.ts) or in the approved register export (lib/generated/product-specs.ts).
 */

function Figure({ title, caption, stage, children }: { title: string; caption: string; stage?: "illustrative"; children: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-2xl bg-[#f6f7f8] ring-1 ring-border">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-600">{title}</p>
        {stage ? <StageLabel kind={stage} /> : null}
      </div>
      <div className="px-4 py-5 sm:px-6 sm:py-6">{children}</div>
      <figcaption className="border-t border-border bg-white px-4 py-3 text-xs leading-relaxed text-forest-600 sm:px-5">{caption}</figcaption>
    </figure>
  );
}

/** Kenya Power e-mobility off-peak windows across a 24-hour day. */
export function OffPeakFigure() {
  const rows: { day: string; windows: [number, number][]; text: string }[] = [
    { day: "Weekdays", windows: [[0, 6], [22, 24]], text: "10pm to 6am" },
    { day: "Saturdays and public holidays", windows: [[0, 8], [14, 24]], text: "Midnight to 8am, 2pm to midnight" },
    { day: "Sundays", windows: [[0, 24]], text: "All day" },
  ];
  return (
    <Figure title="Off-peak hours, e-mobility tariff" caption="Green bands are off-peak, when energy on the e-mobility tariff is KES 8 per kWh instead of KES 16, before levies and VAT. Hours as reported in September 2026.">
      <div className="space-y-5">
        {rows.map((r) => (
          <div key={r.day}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <p className="text-sm font-semibold text-forest-950">{r.day}</p>
              <p className="text-xs text-forest-600">{r.text}</p>
            </div>
            <div aria-hidden className="relative mt-2 h-7 overflow-hidden rounded-md bg-white ring-1 ring-inset ring-forest-200">
              {[6, 12, 18].map((h) => (
                <span key={h} className="absolute inset-y-0 w-px bg-forest-100" style={{ left: `${(h / 24) * 100}%` }} />
              ))}
              {r.windows.map(([a, b]) => (
                <span key={a} className="absolute inset-y-0 bg-charge-600" style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%` }} />
              ))}
            </div>
          </div>
        ))}
        <div aria-hidden className="relative h-4 font-mono text-[10px] text-forest-500">
          {[0, 6, 12, 18, 24].map((h) => (
            <span key={h} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: `${(h / 24) * 100}%` }}>
              {String(h).padStart(2, "0")}:00
            </span>
          ))}
        </div>
      </div>
    </Figure>
  );
}

/** Charging power from a wall socket to highway DC, with what each level means in practice. */
export function PowerLadderFigure() {
  const rows = [
    { name: "Normal 13 A socket", kw: 2.3, value: "about 2.3 kW", meaning: "Roughly 10 to 15 km of range an hour" },
    { name: "Home wallbox (Pulse)", kw: 7.4, value: "7 kW AC", meaning: "A typical 60 km day in under two hours" },
    { name: "Fleet AC (Pulse+)", kw: 22, value: "22 kW AC, three phase", meaning: "About 40 kWh in 2 hours, if the car accepts 22 kW" },
    { name: "Highway DC example", kw: 120, value: "about 120 kW DC", meaning: "Around 60 kWh in 30 minutes; tapers as the battery fills" },
  ];
  return (
    <Figure
      title="Charging power, socket to highway"
      stage="illustrative"
      caption="Bar length is to scale on power. Times are the guide's worked examples; your car's own on-board charger or DC limit sets the real rate."
    >
      <ul className="space-y-4">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="text-sm font-semibold text-forest-950">{r.name}</p>
              <p className="font-mono text-xs text-forest-700">{r.value}</p>
            </div>
            <div aria-hidden className="mt-1.5 h-2.5 rounded-full bg-white ring-1 ring-inset ring-forest-200">
              <div className="h-full rounded-full bg-gradient-to-r from-forest-700 to-charge-600" style={{ width: `${Math.max(2, (r.kw / 120) * 100)}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-forest-600">{r.meaning}</p>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

const pulse = specs.products.find((p) => p.code === "PULSE7K2");
const pulseRcd = pulse?.claims.find((c) => c.spec_id === "PUL-05");

/** The four supply checks a home EV charger needs, in circuit order. */
export function SupplyChecksFigure() {
  const chain = [
    { node: "Kenya Power supply and main breaker", check: "Spare capacity for about 32 A more" },
    { node: "Earthing", check: "Sound earth for the new circuit" },
    { node: "Dedicated circuit and breaker", check: "Nothing else on the charger's circuit" },
    { node: "Residual current protection", check: "As EV charging requires (IEC 60364-7-722)" },
  ];
  return (
    <Figure
      title="What the survey checks, in circuit order"
      caption={
        pulseRcd
          ? `Pulse charger: ${pulseRcd.text.charAt(0).toLowerCase()}${pulseRcd.text.slice(1)} (register ${pulseRcd.spec_id}, design ${pulseRcd.evidence}).`
          : "The survey flags when Kenya Power needs to upgrade the supply."
      }
    >
      <ol className="grid gap-3 lg:grid-cols-4 lg:gap-0">
        {chain.map((c, i) => (
          <li key={c.node} className="relative flex gap-3 lg:flex-col lg:gap-3 lg:pr-6">
            <div className="flex flex-col items-center lg:flex-row">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-950 font-mono text-xs font-semibold text-white">{i + 1}</span>
              {i < chain.length - 1 ? <span aria-hidden className="mt-1 w-px flex-1 bg-forest-200 lg:ml-2 lg:mt-0 lg:h-px lg:w-auto" /> : null}
            </div>
            <div className="min-w-0 pb-1">
              <p className="text-sm font-semibold leading-snug text-forest-950">{c.node}</p>
              <p className="mt-1 text-xs leading-relaxed text-forest-600">{c.check}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-border">
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-charge-600" />
        <span className="text-forest-700">
          Then: the 7 kW wallbox on its own circuit, about <strong className="font-semibold text-forest-950">32 A</strong> at 240 V single phase.
        </span>
      </div>
    </Figure>
  );
}

/** A battery swap from the rider's side. */
export function SwapFlowFigure() {
  const steps = [
    { t: "Ride in", d: "Arrive at a swap station of your bike's network." },
    { t: "Hand over", d: "Return the flat battery." },
    { t: "Take a charged one", d: "Leave with a full pack in a few minutes." },
    { t: "Pay", d: "Per swap or by subscription, usually on M-Pesa." },
  ];
  return (
    <Figure title="A battery swap, step by step" caption="The rider never waits for a charge. Each network's batteries usually fit only its own motorcycles.">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.t} className="rounded-xl bg-white p-4 ring-1 ring-border">
            <p className="font-mono text-[11px] text-forest-500">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 text-sm font-semibold text-forest-950">{s.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-forest-600">{s.d}</p>
          </li>
        ))}
      </ol>
    </Figure>
  );
}
