"use client";

import { useState } from "react";
import Link from "next/link";
import HubGridMap from "@/components/HubGridMap";
import ProductPhoto from "@/components/ProductPhoto";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingHubPage, chargingHubPhaseStyles, chargingHubSitePhaseStyles } from "@/lib/charging-hub";
import {
  getChargingHubDirectory,
  googleDirectionsUrl,
  hubPhaseDisplay,
  hubSiteTypeLabel,
  type ChargingHub,
} from "@/lib/hub-locations";
import { productImages } from "@/lib/product-images";

const productImageByKey = {
  corridor: productImages.corridor,
  boda: productImages.boda,
  depot: productImages.depot,
} as const;

type LocationGroup = "corridor" | "boda" | "partners";

function SiteCard({ hub }: { hub: ChargingHub }) {
  const phase = hubPhaseDisplay(hub);

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-forest-900">{hub.name}</h3>
          <p className="mt-0.5 text-xs font-medium text-forest-500">{hubSiteTypeLabel(hub)}</p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${chargingHubSitePhaseStyles[phase.tone]}`}
        >
          {phase.label}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-600">{hub.role}</p>
      {hub.route ? <p className="mt-2 text-xs text-forest-500">{hub.route}</p> : null}
      {hub.swapTime ? <p className="mt-1 text-xs font-medium text-charge-700">Swap {hub.swapTime}</p> : null}
      <a
        href={googleDirectionsUrl(hub.lat, hub.lng)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-medium text-charge-700 hover:text-charge-600"
      >
        Get directions →
      </a>
    </article>
  );
}

export function ChargingHubHonesty() {
  const { honesty } = chargingHubPage;

  return (
    <section className="border-b border-border bg-white">
      <div className="page-container py-10 sm:py-12">
        <SectionHeader eyebrow={honesty.eyebrow} title={honesty.title} />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {honesty.items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-muted/30 p-5">
              <h3 className="text-sm font-semibold text-forest-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChargingHubMap() {
  const { map } = chargingHubPage;

  return (
    <section id="map" className="scroll-mt-24 border-b border-border bg-muted/20 section-pad">
      <div className="page-container max-w-6xl">
        <SectionHeader eyebrow={map.eyebrow} title={map.title} description={map.description} />
        <div className="mt-8">
          <HubGridMap />
        </div>
      </div>
    </section>
  );
}

export function ChargingHubSiteTypes() {
  const { siteTypes } = chargingHubPage;

  return (
    <section className="border-b border-border bg-white section-pad">
      <div className="page-container">
        <SectionHeader
          eyebrow={siteTypes.eyebrow}
          title={siteTypes.title}
          description={siteTypes.description}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {siteTypes.types.map((type) => {
            const image = productImageByKey[type.imageKey];
            return (
              <a
                key={type.id}
                href={type.href}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-muted/20 transition-all hover:border-forest-300 hover:bg-white hover:shadow-lg"
              >
                <div className="bg-white px-5 pb-2 pt-6">
                  <ProductPhoto
                    src={image.src}
                    alt={image.alt}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="mx-auto aspect-[4/3] w-full max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-2">
                  <p className="font-mono text-sm font-bold text-charge-600">{type.stat}</p>
                  <h3 className="mt-1 text-xl font-semibold text-forest-900">{type.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{type.detail}</p>
                  <span className="mt-4 text-sm font-medium text-forest-900">See on the map ›</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ChargingHubHowItWorks() {
  const { howItWorks } = chargingHubPage;

  return (
    <section className="border-b border-border bg-forest-950 section-pad text-white">
      <div className="page-container">
        <SectionHeader
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          description={howItWorks.description}
          inverted
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <li
              key={step.step}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="font-mono text-xs font-semibold text-charge-400">{step.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-200">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/download"
            className="inline-flex rounded-full bg-charge-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-400"
          >
            Get the AI companion
          </Link>
          <Link
            href="/guides/download-precifarm-android-app"
            className="inline-flex rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Install guide
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ChargingHubCorridors() {
  const { corridors } = chargingHubPage;

  return (
    <section className="section-pad page-container">
      <SectionHeader
        eyebrow={corridors.eyebrow}
        title={corridors.title}
        description={corridors.description}
      />
      <div className="mt-8 space-y-4">
        {corridors.phases.map((p) => (
          <div
            key={p.phase}
            className={`grid gap-4 rounded-2xl border bg-white p-5 md:grid-cols-[auto_auto_1fr_1.5fr] md:items-center md:gap-5 ${
              p.active ? "border-forest-500/30 shadow-sm" : "border-border"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-lg font-semibold text-forest-900">
              {p.phase}
            </div>
            <span
              className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${chargingHubPhaseStyles[p.status]}`}
            >
              {p.status}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-forest-900">{p.route}</h3>
              <p className="mt-0.5 text-sm text-forest-600/80">{p.hubs}</p>
            </div>
            <p className="text-sm leading-relaxed text-forest-600/80">{p.purpose}</p>
          </div>
        ))}
      </div>
      <a href={corridors.exploreHref} className="text-link mt-6 inline-block text-sm font-semibold">
        {corridors.exploreLabel}
      </a>
    </section>
  );
}

export function ChargingHubLocations() {
  const { locations } = chargingHubPage;
  const directory = getChargingHubDirectory();
  const [group, setGroup] = useState<LocationGroup>("corridor");

  const hubs =
    group === "corridor"
      ? directory.corridor
      : group === "boda"
        ? directory.boda
        : directory.partners;

  return (
    <section className="border-y border-border bg-muted/20 section-pad">
      <div className="page-container">
        <SectionHeader
          eyebrow={locations.eyebrow}
          title={locations.title}
          description={locations.description}
        />
        <div role="tablist" aria-label="Filter site directory" className="mt-8 flex flex-wrap gap-2">
          {locations.groups.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={group === item.id}
              onClick={() => setGroup(item.id)}
              className={`filter-tab ${
                group === item.id
                  ? "border-forest-900 bg-forest-900 text-white"
                  : "border-border bg-white text-forest-700 hover:border-forest-300"
              }`}
            >
              {item.label}
              <span className="ml-1.5 font-mono text-xs opacity-70">({directory[item.id].length})</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((hub) => (
            <SiteCard key={hub.id} hub={hub} />
          ))}
        </div>
        <p className="mt-6 text-sm text-forest-500">
          Session pay lives in the companion —{" "}
          <Link href="/download" className="font-medium text-charge-700 hover:text-charge-600">
            download the Precifarm AI companion
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
