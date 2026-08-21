"use client";

import { useState } from "react";
import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingOfferings } from "@/lib/charging";
import { chargingHubPage, chargingHubPhaseStyles, chargingHubSitePhaseStyles } from "@/lib/charging-hub";
import {
  type ChargingHub,
  getChargingHubDirectory,
  googleDirectionsUrl,
  hubPhaseDisplay,
  hubSiteTypeLabel,
} from "@/lib/hub-locations";
import { productImages } from "@/lib/product-images";

const productImageByKey = {
  corridor: productImages.corridor,
  boda: productImages.boda,
  depot: productImages.depot,
} as const;

const layerIcons = [
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </>,
  <path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z" />,
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
];

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
      {hub.route ? (
        <p className="mt-2 text-xs text-forest-500">{hub.route}</p>
      ) : null}
      {hub.swapTime ? (
        <p className="mt-1 text-xs font-medium text-charge-700">Swap {hub.swapTime}</p>
      ) : null}
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
              <Link
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
                  <span className="mt-4 text-sm font-medium text-forest-900">Learn more ›</span>
                </div>
              </Link>
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
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            Download the Android app
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
        <div
          role="tablist"
          aria-label="Filter site directory"
          className="mt-8 flex flex-wrap gap-2"
        >
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
              <span className="ml-1.5 font-mono text-xs opacity-70">
                ({directory[item.id].length})
              </span>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hubs.map((hub) => (
            <SiteCard key={hub.id} hub={hub} />
          ))}
        </div>
        <p className="mt-6 text-sm text-forest-500">
          For filters, session pay and the full list —{" "}
          <Link href="/download" className="font-medium text-charge-700 hover:text-charge-600">
            download the Precifarm Android app
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function ChargingHubAnatomy() {
  const { anatomy } = chargingHubPage;

  return (
    <section className="border-b border-border bg-white section-pad">
      <div className="page-container">
        <SectionHeader
          eyebrow={anatomy.eyebrow}
          title={anatomy.title}
          description={anatomy.description}
        />
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="relative space-y-3">
            {anatomy.layers.map((layer, index) => (
              <article
                key={layer.title}
                className="group flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:border-forest-500/35 hover:shadow-md sm:gap-5 sm:p-5"
              >
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-700 transition-colors group-hover:bg-forest-600">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="var(--color-forest-100)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {layerIcons[index]}
                    </svg>
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-forest-600">
                    {layer.step}
                  </span>
                </div>
                <div className="min-w-0 flex-1 border-l border-forest-500/15 pl-4 sm:pl-5">
                  <h3 className="text-base font-semibold text-forest-900 sm:text-lg">{layer.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-forest-600/80">{layer.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-xl">
              <ProductPhoto
                src={chargingOfferings.hubAnatomy.image}
                alt={chargingOfferings.hubAnatomy.imageAlt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="mx-auto aspect-[4/3] w-full object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-forest-600">
              <span className="font-semibold text-forest-900">{anatomy.imageEyebrow}. </span>
              {anatomy.imageCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChargingHubSiteSelection() {
  const { siteSelection } = chargingHubPage;

  return (
    <section className="section-pad page-container">
      <SectionHeader
        eyebrow={siteSelection.eyebrow}
        title={siteSelection.title}
        description={siteSelection.description}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteSelection.criteria.map((c, i) => (
          <div key={c.title} className="card p-5">
            <span className="font-mono text-xs font-semibold text-forest-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-semibold text-forest-900">{c.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-forest-600/80">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
