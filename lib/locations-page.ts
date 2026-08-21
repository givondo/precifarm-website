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
      "Precifarm installs Pulse charger and Pod energy storage at home, runs Corridor DC on intercity routes and Boda Hub swap in major cities — starting Nairobi, Kisumu and the western corridor.",
    primaryHref: "/charging/private-house",
    primaryLabel: "Request home charging",
    secondaryHref: "/network",
    secondaryLabel: "Charging Hub",
    tertiaryHref: "/contact",
    tertiaryLabel: "Talk to the team",
  },
  services: {
    eyebrow: "In every city we serve",
    title: "Home, fleet, highway and boda",
    description: "The same Precifarm team commissions wallboxes at home and corridor hubs on the highway.",
    items: [
      {
        title: "Home charging",
        detail: "Pulse charger from KES 79,000 · Lipa Pole Pole from KES 3,300/month",
        href: "/charging/private-house",
      },
      {
        title: "Corridor DC",
        detail: "Highway fast charge on Nairobi–Kisumu — about 60 kWh in 30 minutes",
        href: "/network",
      },
      {
        title: "Boda Hub swap",
        detail: "Battery swap for e-motorcycles in under 5 minutes",
        href: "/partners#boda-operators",
      },
      {
        title: "Fleet Depot",
        detail: "22 kW AC pedestals for yards and campuses",
        href: "/partners",
      },
    ],
  },
  directory: {
    eyebrow: "City pages",
    title: "Local guides and network pages",
    description:
      "Each city page covers what Precifarm installs locally, corridor access and how to charge with M-Pesa. Open a city for the full guide.",
  },
  corridors: {
    eyebrow: "Corridor context",
    title: "Cities connect to highway routes",
    description:
      "Nairobi–Kisumu is first. Mombasa and Garissa corridors follow once session volume and uptime prove the model — see the Charging Hub for the full site list.",
    href: "/network",
    label: "View corridor coverage →",
  },
  cta: {
    title: "Not sure which product fits your city?",
    description:
      "Tell us where you drive and park — we recommend home charging, a fleet depot or the nearest Corridor DC stop.",
    primaryHref: "/contact",
    primaryLabel: "Contact Precifarm",
    secondaryHref: "/download",
    secondaryLabel: "Download the app",
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
    description:
      "Capital hub — home installs, Boda Hub swap across the metro and corridor access to Kisumu and the coast.",
  },
  kisumu: {
    region: "western",
    services: ["Corridor DC", "Boda Hub", "Home"],
    status: "live",
    county: "Kisumu County",
    description:
      "Western terminus on Nairobi–Kisumu — Corridor DC, lake-side Boda Hub swap and home charging surveys.",
  },
  nakuru: {
    region: "western",
    services: ["Corridor DC", "Boda Hub", "Home"],
    status: "live",
    county: "Nakuru County",
    description:
      "En-route stop between Nairobi and Kisumu — Corridor DC and Boda Hub on the Rift Valley corridor.",
  },
  mombasa: {
    region: "coast",
    services: ["Home", "Corridor DC"],
    status: "next",
    county: "Mombasa County",
    description:
      "Coast corridor terminus (next phase) — home charging today; Nairobi–Mombasa DC follows western route proof.",
  },
  eldoret: {
    region: "rift-eastern",
    services: ["Home", "Engineering"],
    status: "planned",
    county: "Uasin Gishu County",
    description:
      "Regional engineering and home charging — corridor expansion follows proven western demand.",
  },
  kitui: {
    region: "rift-eastern",
    services: ["Home", "Engineering"],
    status: "planned",
    county: "Kitui County",
    description:
      "Eastern Kenya home installs and engineering support — linked to future corridor planning.",
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

/** Static city list when CMS is offline or empty */
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
