import { absoluteUrl, publicRoutes, siteConfig } from "@/lib/seo/config";
import type { KnowledgeEntity } from "@/lib/seo/types";

/**
 * Seed knowledge graph — extensible to millions of entities via CMS.
 * Domain: electric transport, EV charging, renewable energy (Precifarm core).
 */
export const entityRegistry: KnowledgeEntity[] = [
  {
    id: "org-precifarm",
    slug: "precifarm",
    type: "organization",
    name: "Precifarm",
    description:
      "Kenyan company building charging hubs and operating network for intercity electric travel.",
    url: siteConfig.url,
    relatedIds: ["route-nairobi-kisumu", "vehicle-yutong-u18", "service-bus-booking"],
  },
  {
    id: "route-nairobi-kisumu",
    slug: "nairobi-kisumu",
    type: "route",
    name: "Nairobi – Kisumu",
    description: "Live intercity electric bus route operated on the Precifarm network.",
    url: absoluteUrl("/#book"),
    metadata: { duration: "4h 45m", distance: "345 km", fare: 1550, currency: "KES" },
    relatedIds: ["vehicle-yutong-u18", "service-bus-booking", "equipment-ev-charger"],
  },
  {
    id: "vehicle-yutong-u18",
    slug: "yutong-u18",
    type: "equipment",
    name: "Yutong U18",
    description: "Electric intercity bus used on Nairobi–Kisumu scheduled service.",
    relatedIds: ["route-nairobi-kisumu", "manufacturer-yutong"],
  },
  {
    id: "vehicle-yutong-u12",
    slug: "yutong-u12",
    type: "equipment",
    name: "Yutong U12",
    description: "Electric city bus operated by partner fleets on urban routes.",
    relatedIds: ["manufacturer-yutong", "service-fleet-charging"],
  },
  {
    id: "manufacturer-yutong",
    slug: "yutong",
    type: "manufacturer",
    name: "Yutong",
    description: "Commercial electric vehicle manufacturer.",
    relatedIds: ["vehicle-yutong-u18", "vehicle-yutong-u12"],
  },
  {
    id: "equipment-ev-charger",
    slug: "ev-fast-charger",
    type: "equipment",
    name: "DC Fast Charger",
    description: "Hub fast charging equipment for intercity electric buses and fleets.",
    relatedIds: ["service-hub-charging", "component-inverter", "component-battery"],
  },
  {
    id: "component-inverter",
    slug: "inverter",
    type: "component",
    name: "Inverter",
    description: "Power conversion component in charging and solar hub systems.",
    relatedIds: ["equipment-ev-charger", "equipment-solar-panel"],
  },
  {
    id: "component-battery",
    slug: "battery-storage",
    type: "component",
    name: "Battery Storage",
    description: "Stationary storage at charging hubs for peak shaving and resilience.",
    relatedIds: ["equipment-ev-charger", "equipment-solar-panel"],
  },
  {
    id: "equipment-solar-panel",
    slug: "solar-panel",
    type: "equipment",
    name: "Solar Panel Array",
    description: "On-site solar generation at Precifarm route charging hubs.",
    relatedIds: ["service-hub-charging", "component-inverter", "component-battery"],
  },
  {
    id: "service-bus-booking",
    slug: "bus-booking",
    type: "service",
    name: "Bus Seat Booking",
    description: "Online seat reservation with M-Pesa payment and SMS ticket delivery.",
    url: absoluteUrl("/#book"),
    relatedIds: ["route-nairobi-kisumu"],
  },
  {
    id: "service-hub-charging",
    slug: "hub-charging",
    type: "service",
    name: "Route Hub Charging",
    description: "Reserved fast-charging windows for partner operators at intercity hubs.",
    url: absoluteUrl("/charging"),
    relatedIds: ["equipment-ev-charger", "location-nairobi", "location-kisumu", "service-charge-map"],
  },
  {
    id: "service-charge-map",
    slug: "charge-map",
    type: "service",
    name: "Charge Map",
    description: "Interactive map of Precifarm EV charging hubs and Nairobi–Kisumu route coverage.",
    url: absoluteUrl("/network"),
    relatedIds: ["service-hub-charging", "service-private-house-charging", "location-nairobi", "location-kisumu"],
  },
  {
    id: "service-private-house-charging",
    slug: "private-house-charging",
    type: "service",
    name: "Private House Charging",
    description:
      "House-based private DC EV charging on the customer's property and meter, with optional solar and storage.",
    url: absoluteUrl("/charging/private-house"),
    relatedIds: ["service-hub-charging", "equipment-ev-charger"],
  },
  {
    id: "service-fleet-charging",
    slug: "fleet-charging",
    type: "service",
    name: "Fleet & Partner Charging",
    description: "Energy services for fleet operators and logistics partners.",
    url: absoluteUrl("/partners"),
    relatedIds: ["vehicle-yutong-u12", "equipment-ev-charger"],
  },
  {
    id: "service-mobile-app",
    slug: "mobile-app",
    type: "service",
    name: "Precifarm Mobile App",
    description:
      "Android app for Charge Map, personal home charging management and Nairobi–Kisumu booking. iOS not available yet.",
    url: absoluteUrl("/download"),
    relatedIds: ["service-charge-map", "service-private-house-charging", "service-bus-booking"],
  },
  {
    id: "location-nairobi",
    slug: "nairobi",
    type: "location",
    name: "Nairobi",
    description: "Origin city for Nairobi–Kisumu electric bus service.",
    relatedIds: ["route-nairobi-kisumu"],
  },
  {
    id: "location-kisumu",
    slug: "kisumu",
    type: "location",
    name: "Kisumu",
    description: "Destination city for Nairobi–Kisumu electric bus service.",
    relatedIds: ["route-nairobi-kisumu"],
  },
];

const entityMap = new Map(entityRegistry.map((e) => [e.id, e]));

export function getEntity(id: string): KnowledgeEntity | undefined {
  return entityMap.get(id);
}

export function getEntityBySlug(slug: string): KnowledgeEntity | undefined {
  return entityRegistry.find((e) => e.slug === slug);
}

export function getRelatedEntities(id: string): KnowledgeEntity[] {
  const entity = getEntity(id);
  if (!entity?.relatedIds) return [];
  return entity.relatedIds
    .map((relatedId) => getEntity(relatedId))
    .filter((e): e is KnowledgeEntity => Boolean(e));
}

export function listEntities(type?: KnowledgeEntity["type"]): KnowledgeEntity[] {
  if (!type) return entityRegistry;
  return entityRegistry.filter((e) => e.type === type);
}

/** Contextual internal links for a page path */
export function internalLinksForPath(path: string): { href: string; label: string; reason: string }[] {
  const links: { href: string; label: string; reason: string }[] = [];

  const add = (href: string, label: string, reason: string) => {
    if (href !== path && !links.some((l) => l.href === href)) {
      links.push({ href, label, reason });
    }
  };

  switch (path) {
    case "/":
      add("/network", "Charge Map", "View hub locations on the operating network");
      add("/charging", "Charging services", "Hub, home and private-site charging");
      add("/charging/private-house", "Private house charging", "Manage charging on your property");
      add("/download", "Download app", "Android EV charging app");
      add("/faq", "FAQ", "Booking and travel answers");
      return links.slice(0, 5);
    case "/network":
      add("/charging", "Charging services", "Energy infrastructure behind the map");
      add("/charging/private-house", "Private house charging", "House-based private DC install");
      add("/#book", "Book a seat", "Travel on Nairobi–Kisumu");
      break;
    case "/charging":
      add("/network", "Charge Map", "See hub locations");
      add("/charging/private-house", "Private house charging", "On your property, your meter");
      add("/partners", "Fleet charging", "Partner operator services");
      break;
    case "/charging/private-house":
      add("/charging", "All charging services", "Hubs, home and fleet");
      add("/download", "Download app", "Manage home charging on Android");
      add("/network", "Charge Map", "Route hub locations");
      break;
    case "/download":
      add("/network", "Charge Map", "Hubs and route coverage");
      add("/charging/private-house", "Private house charging", "Home charger installs");
      add("/#book", "Book a seat", "Nairobi–Kisumu on web or app");
      break;
    case "/partners":
      add("/charging", "Charging services", "Energy for partner fleets");
      add("/about", "About Precifarm", "Mission and route-one proof");
      break;
    default:
      break;
  }

  for (const route of publicRoutes) {
    if (route.path !== path && links.length < 5) {
      add(route.path, route.label, `Explore ${route.label.toLowerCase()}`);
    }
  }

  return links.slice(0, 5);
}
