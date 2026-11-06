"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import StageLabel from "@/components/interior/StageLabel";
import { type EnrichedLocation, type LocationRegionFilter, locationRegionLabels } from "@/lib/locations-page";

function LocationRow({ location }: { location: EnrichedLocation }) {
  return (
    <li>
      <Link href={location.href} className="group grid gap-4 py-6 lg:grid-cols-[14rem_minmax(0,1fr)_auto] lg:items-start lg:gap-8">
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-widest text-forest-500">{location.county}</span>
          <span className="mt-1 block font-display text-2xl font-semibold tracking-tight text-forest-950 group-hover:text-charge-700">{location.name}</span>
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] leading-relaxed text-forest-700">{location.description}</span>
          <span className="mt-3 flex flex-wrap gap-2">
            {location.services.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-2 rounded-full bg-[#f1f3f4] py-1 pl-3 pr-1 text-xs text-forest-800">
                {s.name}
                <StageLabel kind={s.stage} />
              </span>
            ))}
          </span>
        </span>
        <span className="text-sm font-semibold text-charge-700 lg:pt-2">City page ›</span>
      </Link>
    </li>
  );
}

/** City list with a region filter. All cities are server-rendered; the filter only hides rows. */
export function LocationsDirectory({ locations }: { locations: EnrichedLocation[] }) {
  const [region, setRegion] = useState<LocationRegionFilter>("all");
  const filtered = useMemo(() => (region === "all" ? locations : locations.filter((l) => l.region === region)), [locations, region]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: locations.length };
    for (const l of locations) c[l.region] = (c[l.region] ?? 0) + 1;
    return c;
  }, [locations]);

  return (
    <div>
      <div role="group" aria-label="Filter cities by region" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
        {(Object.keys(locationRegionLabels) as LocationRegionFilter[])
          .filter((id) => id === "all" || counts[id])
          .map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={region === id}
              onClick={() => setRegion(id)}
              className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                region === id ? "border-forest-950 bg-forest-950 font-medium text-white" : "border-forest-200 bg-white text-forest-700 hover:border-forest-300"
              }`}
            >
              {locationRegionLabels[id]}
              <span className={`font-mono text-[11px] ${region === id ? "text-white/70" : "text-forest-400"}`}>{counts[id] ?? 0}</span>
            </button>
          ))}
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {filtered.length} cities shown
      </p>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {filtered.map((l) => (
          <LocationRow key={l.slug} location={l} />
        ))}
      </ul>
    </div>
  );
}
