/** Locations index — city and corridor pages */

import { contact } from "@/lib/contact";
import type { CmsSeoEntity } from "@/lib/seo/cms-client";

export type LocationRegion = "nairobi-metro" | "western" | "coast" | "rift-eastern";

export type LocationRegionFilter = "all" | LocationRegion;

export const locationsPage = {
  hero: {
    eyebrow: "Locations",
    title: "EV charging where Kenya drives",
    description:
      "City guides for home installs, corridor DC and Boda Hub swap — starting Nairobi, Kisumu and the western route.",
    primaryHref: "/network",
    primaryLabel: "Charging Hub",
    secondaryHref: "/charging/private-house",
    secondaryLabel: "Home charging",
  },
  directory: {
    eyebrow: "City pages",
    title: "Local guides",
    description: "What Precifarm installs in each city and how to charge with M-Pesa.",
  },
  corridors: {
    eyebrow: "Highway context",
    title: "Cities connect to corridors",
    description: "Nairobi–Kisumu is live. Mombasa and Garissa follow proven demand — see the Charging Hub for sites.",
    href: "/network",
    label: "View corridor coverage →",
  },
  cta: {
    title: "Not sure which product fits?",
    description: "Tell us where you drive and park — we will point you to the right charger.",
    primaryHref: "/contact",
    primaryLabel: "Contact Precifarm",
    secondaryHref: "/download",
    secondaryLabel: "Get the AI companion",
  },
} as const;

export const locationRegionLabels: Record<LocationRegionFilter, string> = {
  all: "All cities",
  "nairobi-metro": "Nairobi metro",
  western: "Western corridor",
  coast: "Coast",
  "rift-eastern": "Rift & eastern",
};

const cityMeta: Record<
  string,
  {
    region: LocationRegion;
    services: readonly string[];
    status: "live" | "next" | "planned";
    county: string;
    description: string;
  }
> = {
  nairobi: {
    region: "nairobi-metro",
    services: ["Home", "Corridor DC", "Boda Hub", "Depot", "Partners"],
    status: "live",
    county: "Nairobi County",
    description: "Capital hub — home installs, Boda Hub swap and corridor access west and coast.",
  },
  kisumu: {
    region: "western",
    services: ["Corridor DC", "Boda Hub", "Home"],
    status: "live",
    county: "Kisumu County",
    description: "Western terminus on Nairobi–Kisumu — Corridor DC, Boda Hub and home surveys.",
  },
  nakuru: {
    region: "western",
    services: ["Corridor DC", "Boda Hub", "Home"],
    status: "live",
    county: "Nakuru County",
    description: "En-route stop between Nairobi and Kisumu.",
  },
  mombasa: {
    region: "coast",
    services: ["Home", "Corridor DC"],
    status: "next",
    county: "Mombasa County",
    description: "Coast terminus (next phase) — home charging today; corridor DC follows western proof.",
  },
  eldoret: {
    region: "rift-eastern",
    services: ["Home", "Engineering"],
    status: "planned",
    county: "Uasin Gishu County",
    description: "Regional engineering and home charging.",
  },
  kitui: {
    region: "rift-eastern",
    services: ["Home", "Engineering"],
    status: "planned",
    county: "Kitui County",
    description: "Eastern Kenya home installs and engineering support.",
  },
};

const defaultMeta = {
  region: "rift-eastern" as const,
  services: ["Home"] as const,
  status: "planned" as const,
  county: "Kenya",
  description: "Precifarm home charging and network expansion across Kenya.",
};

export type EnrichedLocation = {
  slug: string;
  name: string;
  description: string;
  county: string;
  href: string;
  region: LocationRegion;
  services: readonly string[];
  status: "live" | "next" | "planned";
};

export function resolveLocationHref(
  slug: string,
  localPageSlugs: ReadonlySet<string>,
): string {
  const localSlug = `ev-charging-${slug}`;
  return localPageSlugs.has(localSlug) ? `/locations/${localSlug}` : `/locations/${slug}`;
}

export function enrichLocationsFromCms(
  entities: CmsSeoEntity[],
  localPageSlugs: ReadonlySet<string>,
): EnrichedLocation[] {
  return entities
    .filter((e) => e.type === "location" && e.published !== false)
    .map((entity) => {
      const meta = cityMeta[entity.slug] ?? defaultMeta;
      return {
        slug: entity.slug,
        name: entity.name,
        description: entity.description || meta.description,
        county: String(entity.metadata.county ?? entity.metadata.region ?? meta.county),
        href: resolveLocationHref(entity.slug, localPageSlugs),
        region: meta.region,
        services: meta.services,
        status: meta.status,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function fallbackLocations(localPageSlugs: ReadonlySet<string>): EnrichedLocation[] {
  const names: Record<string, string> = {
    nairobi: "Nairobi",
    kisumu: "Kisumu",
    nakuru: "Nakuru",
    mombasa: "Mombasa",
    eldoret: "Eldoret",
    kitui: "Kitui",
  };

  return contact.hubs.map((hub) => {
    const slug = hub.toLowerCase();
    const meta = cityMeta[slug] ?? defaultMeta;
    return {
      slug,
      name: names[slug] ?? hub,
      description: meta.description,
      county: meta.county,
      href: resolveLocationHref(slug, localPageSlugs),
      region: meta.region,
      services: meta.services,
      status: meta.status,
    };
  });
}

export const locationStatusStyles = {
  live: "bg-green-50 text-green-800 border-green-200",
  next: "bg-amber-50 text-amber-800 border-amber-200",
  planned: "bg-muted text-forest-500 border-border",
} as const;

export const locationStatusLabels = {
  live: "Live",
  next: "Next corridor",
  planned: "Planned",
} as const;
