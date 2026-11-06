"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import ArchitectureDiagram from "@/components/engineering/ArchitectureDiagram";
import StageLabel from "@/components/interior/StageLabel";
import { architectures } from "@/lib/engineering-page";

/** Tabbed system architectures. Tabs follow the WAI-ARIA pattern: arrow keys move between them. */
export default function ArchitectureExplorer() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const a = architectures[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = architectures.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-border">
      <div role="tablist" aria-label="Site type" className="flex gap-1 overflow-x-auto border-b border-border bg-[#f6f7f8] p-2 [scrollbar-width:none]">
        {architectures.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${uid}-tab-${x.id}`}
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${i === active ? "bg-forest-950 text-white" : "text-forest-600 hover:bg-white hover:text-forest-900"}`}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${a.id}`}>
        <figure className="border-b border-border p-4 sm:p-6">
          <div className="rounded-2xl bg-[linear-gradient(180deg,#fafbfb,#f1f3f4)] p-3 ring-1 ring-border sm:p-4">
            <ArchitectureDiagram nodes={a.nodes} edges={a.edges} title={a.title} />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-forest-600">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-0.5 w-5 bg-forest-800" /> AC power
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-0.5 w-5 bg-[#c9a46a]" /> DC power
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="w-5 border-t-2 border-dotted border-[#3b6fb6]" /> Data
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-3 w-5 rounded-sm border border-dashed border-forest-400" /> Optional or sized per site
            </span>
            <StageLabel kind="illustrative" label="Schematic" />
          </figcaption>
        </figure>

        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-3 lg:gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-forest-900">{a.product}</p>
              <StageLabel kind={a.stage} />
            </div>
            <h3 className="heading-display mt-2 text-xl leading-snug text-forest-900">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-forest-600">{a.summary}</p>
            <Link href={a.href} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
              {a.product} programme{" "}
              <span aria-hidden className="ml-1">
                ›
              </span>
            </Link>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">What we engineer</p>
            <ul className="mt-2 space-y-1.5">
              {a.engineer.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-forest-700">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-charge-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start overflow-hidden rounded-xl ring-1 ring-border">
            <dl>
              {a.register.map((r, i) => (
                <div key={r.label} className={`px-3.5 py-2.5 ${i ? "border-t border-border" : ""}`}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-forest-500">{r.label}</dt>
                  <dd className="mt-0.5 text-sm text-forest-900">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="border-t border-border bg-[#f6f7f8] px-3.5 py-2 text-[11px] text-forest-500">
              From the approved engineering register; design targets unless stated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
