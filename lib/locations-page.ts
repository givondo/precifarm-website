/**
 * /locations and the static fallback for /locations/<city>. City pages must work without the CMS,
 * and must not describe any Precifarm site as open: no site is commissioned yet (lib/hub-locations.ts).
 * Partner sites on the map are not named here; their status belongs to the Charging Hub.
 */

import type { StageKind } from "@/components/interior/StageLabel";
import { contact } from "@/lib/contact";
import { chargingHubs, routePhases, type ChargingHub } from "@/lib/hub-locations";
import type { CmsSeoEntity } from "@/lib/seo/cms-client";

export type LocationRegion = "nairobi-metro" | "western" | "coast" | "rift-eastern";
export type LocationRegionFilter = "all" | LocationRegion;

export const locationsPage = {
  hero: {
    eyebrow: "Locations",
    title: "EV charging where Kenya drives.",
    description:
      "City pages for the places Precifarm works from: what you can order today, and what is planned. Pulse home charging is available now; Corridor and Boda Hub sites are being planned, starting on the Nairobi to Kisumu route.",
  },
  directory: {
    eyebrow: "City pages",
    title: "Six cities, one honest status line each.",
    description: "Every city lists what is available today and what is still planned.",
  },

} as const;

export const locationRegionLabels: Record<LocationRegionFilter, string> = {
  all: "All cities",
  "nairobi-metro": "Nairobi metro",
  western: "Western route",
  coast: "Coast",
  "rift-eastern": "Rift and eastern",
};

type CityService = { name: string; stage: StageKind; text: string; href: string };

type CityMeta = {
  name: string;
  region: LocationRegion;
  county: string;
  /** one line, honest about what is available and what is planned */
  description: string;
  /** hub id in lib/hub-locations.ts that marks the city centre */
  hubId: string;
  routeNote?: string;
};

const cityMeta: Record<string, CityMeta> = {
  nairobi: {
    name: "Nairobi",
    region: "nairobi-metro",
    county: "Nairobi County",
    hubId: "nairobi",
    description: "Headquarters. Pulse home surveys today; planned Boda Hub swap sites and the start of the first Corridor route.",
    routeNote: "Start of the first Corridor route to Kisumu, and of the planned routes to Mombasa and Garissa.",
  },
  kisumu: {
    name: "Kisumu",
    region: "western",
    county: "Kisumu County",
    hubId: "kisumu",
    description: "Western end of the first Corridor route. Pulse home surveys today; Corridor and Boda Hub sites planned.",
    routeNote: "Western end of the first Corridor route from Nairobi.",
  },
  nakuru: {
    name: "Nakuru",
    region: "western",
    county: "Nakuru County",
    hubId: "nakuru",
    description: "On the first Corridor route between Nairobi and Kisumu. Pulse home surveys today; Corridor and Boda Hub sites planned.",
    routeNote: "A planned stop on the first Corridor route, between Nairobi and Kisumu.",
  },
  mombasa: {
    name: "Mombasa",
    region: "coast",
    county: "Mombasa County",
    hubId: "mombasa",
    description: "Coast end of the planned Nairobi to Mombasa route. Pulse home surveys today.",
    routeNote: "End of the planned Nairobi to Mombasa route, which follows the western route.",
  },
  eldoret: {
    name: "Eldoret",
    region: "rift-eastern",
    county: "Uasin Gishu County",
    hubId: "eldoret",
    description: "Regional engineering and Pulse home surveys.",
  },
  kitui: {
    name: "Kitui",
    region: "rift-eastern",
    county: "Kitui County",
    hubId: "kitui",
    description: "Eastern Kenya engineering support and Pulse home surveys.",
  },
};

export type EnrichedLocation = {
  slug: string;
  name: string;
  description: string;
  county: string;
  href: string;
  region: LocationRegion;
  services: readonly CityService[];
};

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(h));
}

/** Precifarm sites on the Charging Hub map within 30 km of the city. All are planned today. */
export function plannedSitesNear(slug: string): ChargingHub[] {
  const meta = cityMeta[slug];
  const centre = meta ? chargingHubs.find((h) => h.id === meta.hubId) : undefined;
  if (!centre) return [];
  return chargingHubs.filter((h) => h.operator === "precifarm" && distanceKm(centre, h) <= 30);
}

export function cityServices(slug: string): CityService[] {
  const sites = plannedSitesNear(slug);
  const dc = sites.filter((s) => s.siteKind === "dc" && s.role.includes("Corridor"));
  const swap = sites.filter((s) => s.siteKind === "swap");
  const meta = cityMeta[slug];
  const centre = meta ? chargingHubs.find((h) => h.id === meta.hubId) : undefined;
  const firstRoute = routePhases.find((r) => r.phase === "next");
  const onRoute = !!centre && !!firstRoute?.path.some((p) => distanceKm(p, centre) < 5);
  const services: CityService[] = [
    { name: "Pulse home charging", stage: "available", text: "Request a survey; an engineer checks your supply, earthing and parking before a quote.", href: "/charging/home" },
  ];
  if (dc.length)
    services.push({
      name: "ARC Corridor",
      stage: onRoute ? "pilot" : "planned",
      text: onRoute ? "A planned Corridor location on the first route. The first site is being prepared." : "A planned Corridor location on a later route.",
      href: "/charging/corridor",
    });
  if (swap.length)
    services.push({
      name: "Boda Hub",
      stage: "planned",
      text: `${swap.length} planned battery swap ${swap.length === 1 ? "site" : "sites"} on the map. Boda Hub is in development.`,
      href: "/charging/boda-hub",
    });
  services.push({ name: "Fleet and workplace charging", stage: "development", text: "Pulse+ for depots and workplaces. Register a site and we plan it with you.", href: "/charging/pulse-plus" });
  return services;
}

export function resolveLocationHref(slug: string, localPageSlugs: ReadonlySet<string>): string {
  const localSlug = `ev-charging-${slug}`;
  return localPageSlugs.has(localSlug) ? `/locations/${localSlug}` : `/locations/${slug}`;
}

function toLocation(slug: string, localPageSlugs: ReadonlySet<string>, override?: Partial<EnrichedLocation>): EnrichedLocation {
  const meta = cityMeta[slug];
  return {
    slug,
    name: meta?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1),
    description: meta?.description ?? "Pulse home charging surveys. Other services are planned city by city.",
    county: meta?.county ?? "Kenya",
    href: resolveLocationHref(slug, localPageSlugs),
    region: meta?.region ?? "rift-eastern",
    services: cityServices(slug),
    ...override,
  };
}

export function enrichLocationsFromCms(entities: CmsSeoEntity[], localPageSlugs: ReadonlySet<string>): EnrichedLocation[] {
  return entities
    .filter((e) => e.type === "location" && e.published !== false)
    .map((entity) =>
      toLocation(entity.slug, localPageSlugs, {
        name: entity.name,
        county: String(entity.metadata.county ?? entity.metadata.region ?? cityMeta[entity.slug]?.county ?? "Kenya"),
      }),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** The cities Precifarm lists in lib/contact.ts, each with a working static page. */
export function fallbackLocations(localPageSlugs: ReadonlySet<string> = new Set()): EnrichedLocation[] {
  return contact.hubs.map((hub) => toLocation(hub.toLowerCase(), localPageSlugs));
}

export function staticCitySlugs(): string[] {
  return contact.hubs.map((h) => h.toLowerCase()).filter((s) => s in cityMeta);
}

/** Static page content for /locations/<city> when the CMS has nothing for that slug. */
export function staticCityPage(slug: string) {
  const meta = cityMeta[slug];
  if (!meta) return null;
  const sites = plannedSitesNear(slug);
  return {
    slug,
    name: meta.name,
    county: meta.county,
    title: `EV charging in ${meta.name}, Kenya`,
    description: `EV charging in ${meta.name}: Pulse home charging surveys today, with ${
      sites.length ? "Corridor and Boda Hub sites planned nearby" : "fleet and highway charging planned city by city"
    }. Status for every service, from Precifarm.`,
    lead: meta.description,
    routeNote: meta.routeNote,
    services: cityServices(slug),
    plannedSites: sites.map((s) => ({ id: s.id, name: s.name, kind: s.siteKind === "swap" ? "Boda Hub swap site" : "Corridor DC location", role: s.role })),
  };
}

export const locationStatusLabels = {
  available: "Available",
  planned: "Planned",
} as const;
