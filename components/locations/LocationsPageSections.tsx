"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  type EnrichedLocation,
  type LocationRegionFilter,
  locationRegionLabels,
  locationsPage,
  locationStatusLabels,
  locationStatusStyles,
} from "@/lib/locations-page";

function LocationCard({ location }: { location: EnrichedLocation }) {
  return (
    <Link
      href={location.href}
      className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all hover:border-forest-300 hover:shadow-md"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-forest-500">{location.county}</p>
          <h3 className="mt-0.5 text-lg font-semibold text-forest-900 group-hover:text-charge-700">
            {location.name}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${locationStatusStyles[location.status]}`}
        >
          {locationStatusLabels[location.status]}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-600">{location.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {location.services.map((service) => (
          <span
            key={service}
            className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-forest-700"
          >
            {service}
          </span>
        ))}
      </div>
      <span className="mt-4 text-sm font-medium text-forest-900">Read city guide ›</span>
    </Link>
  );
}

type Props = {
  locations: EnrichedLocation[];
};

export function LocationsDirectory({ locations }: Props) {
  const { directory } = locationsPage;
  const [region, setRegion] = useState<LocationRegionFilter>("all");

  const filtered = useMemo(() => {
    if (region === "all") return locations;
    return locations.filter((loc) => loc.region === region);
  }, [locations, region]);

  const regionCounts = useMemo(() => {
    const counts: Record<LocationRegionFilter, number> = {
      all: locations.length,
      "nairobi-metro": 0,
      western: 0,
      coast: 0,
      "rift-eastern": 0,
    };
    for (const loc of locations) {
      counts[loc.region] += 1;
    }
    return counts;
  }, [locations]);

  return (
    <section className="border-b border-border bg-muted/20 section-pad">
      <div className="page-container">
        <SectionHeader
          eyebrow={directory.eyebrow}
          title={directory.title}
          description={directory.description}
        />
        <div
          role="tablist"
          aria-label="Filter cities by region"
          className="mt-8 flex flex-wrap gap-2"
        >
          {(Object.keys(locationRegionLabels) as LocationRegionFilter[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={region === id}
              onClick={() => setRegion(id)}
              className={`filter-tab ${
                region === id
                  ? "border-forest-900 bg-forest-900 text-white"
                  : "border-border bg-white text-forest-700 hover:border-forest-300"
              }`}
            >
              {locationRegionLabels[id]}
              <span className="ml-1.5 font-mono text-xs opacity-70">({regionCounts[id]})</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-forest-600 sm:col-span-2 lg:col-span-3">
              No cities in this region yet — check back as Precifarm expands.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function LocationsServices() {
  const { services } = locationsPage;

  return (
    <section className="border-b border-border bg-white section-pad">
      <div className="page-container">
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-border bg-muted/20 p-5 transition-colors hover:border-forest-300 hover:bg-white"
            >
              <h3 className="font-semibold text-forest-900 group-hover:text-charge-700">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.detail}</p>
              <span className="mt-3 inline-block text-sm font-medium text-forest-900">Learn more ›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationsCorridorsNote() {
  const { corridors } = locationsPage;

  return (
    <section className="section-pad page-container">
      <div className="rounded-2xl border border-forest-500/20 bg-forest-50/80 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest-600">
          {corridors.eyebrow}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-forest-900 sm:text-2xl">{corridors.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest-600">{corridors.description}</p>
        <Link href={corridors.href} className="text-link mt-4 inline-block text-sm font-semibold">
          {corridors.label}
        </Link>
      </div>
    </section>
  );
}
