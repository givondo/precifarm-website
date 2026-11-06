"use client";

import { useState } from "react";
import StageLabel from "@/components/interior/StageLabel";
import SiteImage from "@/components/SiteImage";
import { arcDispenserHotspots, arcImages } from "@/lib/pages/arc-corridor";

/** The R02 dispenser render with numbered call-outs; the list beside it carries the same content for screen readers. */
export default function ArcDispenserExplorer() {
  const [active, setActive] = useState<string>(arcDispenserHotspots[0].id);
  const current = arcDispenserHotspots.find((h) => h.id === active) ?? arcDispenserHotspots[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
      <figure className="min-w-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.5rem] bg-[#5f5953] ring-1 ring-white/10">
          <SiteImage src={arcImages.dispenser.src} alt={arcImages.dispenser.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          <StageLabel kind="illustrative" tone="dark" className="absolute left-3 top-3 backdrop-blur" />
          {arcDispenserHotspots.map((h, i) => {
            const on = h.id === active;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActive(h.id)}
                aria-pressed={on}
                aria-label={`${i + 1}. ${h.title}`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-xs font-semibold ring-2 transition-[background-color,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-9 sm:w-9 ${
                  on ? "scale-110 bg-brand-300 text-forest-950 ring-white" : "bg-forest-950/80 text-white ring-white/70 hover:bg-forest-950"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <figcaption className="mt-2.5 text-xs leading-relaxed text-white/55">
          ARC dispenser, design render R02 at dusk. Select a number to read about that part.
        </figcaption>
      </figure>

      <div className="min-w-0">
        <div aria-live="polite" className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
          <p className="font-mono text-xs text-brand-300">
            {String(arcDispenserHotspots.findIndex((h) => h.id === current.id) + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/72">{current.text}</p>
        </div>
        <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {arcDispenserHotspots.map((h, i) => {
            const on = h.id === active;
            return (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => setActive(h.id)}
                  aria-pressed={on}
                  className={`flex min-h-11 w-full items-center gap-3 py-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    on ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  <span className={`font-mono text-xs ${on ? "text-brand-300" : "text-white/60"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{h.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
