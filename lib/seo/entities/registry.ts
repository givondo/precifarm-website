import { absoluteUrl, publicRoutes, siteConfig } from "@/lib/seo/config";
import { chargingHub } from "@/lib/charging-hub";
import type { KnowledgeEntity } from "@/lib/seo/types";

/**
 * Seed knowledge graph — extensible via CMS.
 * Domain: EV charging, energy, and electric transport (Precifarm).
 */
export const entityRegistry: KnowledgeEntity[] = [
  {
    id: "org-precifarm",
    slug: "precifarm",
    type: "organization",
    name: "Precifarm",
    description:
      "Kenyan electric mobility infrastructure company — charging, storage and operations for homes, fleets and highways.",
    url: siteConfig.url,
    relatedIds: ["service-charge-map", "service-home-charging", "product-pulse", "product-corridor"],
  },
  {
    id: "product-pulse",
    slug: "pulse",
    type: "equipment",
    name: "Pulse charger",
    description:
      "7 kW home wallbox. A typical 60 km day refills in about 90 minutes. From KES 79,000 with Lipa Pole Pole on M-Pesa.",
    url: absoluteUrl("/charging/home"),
    relatedIds: ["service-home-charging", "equipment-ev-charger"],
  },
  {
    id: "product-pod",
    slug: "pod",
    type: "equipment",
    name: "Pod energy storage",
    description:
      "Home charger with 5 or 10 kWh storage for weak-grid evenings. From KES 295,000 with Lipa Pole Pole on M-Pesa.",
    url: absoluteUrl("/charging/home"),
    relatedIds: ["service-home-charging", "product-pulse"],
  },
  {
    id: "product-spark",
    slug: "spark",
    type: "equipment",
    name: "Spark charger",
    description:
      "Portable 3.3 kW charger for the boot. A typical 60 km day refills in about 180 minutes. From KES 25,000.",
    url: absoluteUrl("/charging"),
    relatedIds: ["service-home-charging", "product-pulse"],
  },
  {
    id: "product-corridor",
    slug: "corridor",
    type: "equipment",
    name: "Corridor charging",
    description:
      "120 kW+ highway DC. Adds about 60 kWh in 30 minutes. Public DC from KES 39/kWh, paid with M-Pesa.",
    url: absoluteUrl("/charging"),
    relatedIds: ["service-hub-charging", "equipment-ev-charger"],
  },
  {
    id: "product-depot",
    slug: "depot",
    type: "equipment",
    name: "Depot charging station",
    description:
      "22 kW AC pedestal for fleets. Adds 40+ kWh in about 120 minutes while vehicles are parked. Public DC from KES 39/kWh.",
    url: absoluteUrl("/partners"),
    relatedIds: ["service-fleet-charging", "product-corridor"],
  },
  {
    id: "product-boda",
    slug: "boda-hub",
    type: "equipment",
    name: "Boda Hub",
    description: "Battery swap or kerbside charge for electric bodas. Back on the road in under 5 minutes.",
    url: absoluteUrl("/partners"),
    relatedIds: ["service-fleet-charging"],
  },
  {
    id: "equipment-ev-charger",
    slug: "ev-fast-charger",
    type: "equipment",
    name: "DC Fast Charger",
    description: "Hub fast charging equipment for EVs, fleets and highway stops.",
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
    id: "service-hub-charging",
    slug: "hub-charging",
    type: "service",
    name: "Highway charging",
    description: "Corridor charging at Precifarm hubs — about 60 kWh in 30 minutes, paid with M-Pesa.",
    url: absoluteUrl("/charging"),
    relatedIds: ["equipment-ev-charger", "location-nairobi", "location-kisumu", "service-charge-map"],
  },
  {
    id: "service-charge-map",
    slug: "charge-map",
    type: "service",
    name: chargingHub.name,
    description: chargingHub.description,
    aliases: ["Charge Map", "Hub Network"],
    url: absoluteUrl("/hub"),
    relatedIds: ["service-hub-charging", "service-home-charging", "location-nairobi", "location-kisumu"],
  },
  {
    id: "service-home-charging",
    slug: "home-charging",
    type: "service",
    name: "Home charging",
    description:
      "Pulse charger and Pod energy storage on private property. A home charging day costs about KES 140 versus ~KES 1,000 diesel per day.",
    url: absoluteUrl("/charging/home"),
    aliases: ["Private house charging", "Pulse charger", "Pod energy storage"],
    relatedIds: ["service-hub-charging", "product-pulse", "product-pod"],
  },
  {
    id: "service-fleet-charging",
    slug: "fleet-charging",
    type: "service",
    name: "Fleet & Partner Charging",
    description: "Energy services for fleet operators, site hosts and installation partners.",
    url: absoluteUrl("/partners"),
    relatedIds: ["service-hub-charging", "equipment-ev-charger", "product-depot"],
  },
  {
    id: "service-mobile-app",
    slug: "mobile-app",
    type: "service",
    name: "Precifarm AI Companion",
    description:
      "Android companion for Charging Hub, home charger installations and the Spark–Corridor product range. iOS not available yet.",
    url: absoluteUrl("/download"),
    relatedIds: ["service-charge-map", "service-home-charging", "product-pulse"],
  },
  {
    id: "location-nairobi",
    slug: "nairobi",
    type: "location",
    name: "Nairobi",
    description: "Major Precifarm hub city with depot access and home charger installs.",
    relatedIds: ["service-charge-map", "service-hub-charging"],
  },
  {
    id: "location-kisumu",
    slug: "kisumu",
    type: "location",
    name: "Kisumu",
    description: "Western Kenya hub city on the Precifarm Charging Hub.",
    relatedIds: ["service-charge-map", "service-hub-charging"],
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
      add(chargingHub.path, chargingHub.label, "Find hubs and partner chargers");
      add("/charging", "EV charging", "Home, fleet and highway charging");
      add("/charging/home", "Home EV charging", "Pulse charger and Pod energy storage");
      add("/evs", "Kenya EV guide", "Compare EVs and charging fit");
      add("/faq", "FAQ", "Charging and installation answers");
      return links.slice(0, 5);
    case "/hub":
      add("/charging", "EV charging", "From home charging to highway charging");
      add("/charging/home", "Home EV charging", "Pulse charger and Pod energy storage");
      add("/locations", "Locations", "City guides across Kenya");
      break;
    case "/charging":
      add(chargingHub.path, chargingHub.label, "See hub locations");
      add("/charging/home", "Home EV charging", "Pulse charger and Pod energy storage");
      add("/partners", "Fleet EV charging", "Partner operator services");
      add("/evs", "Kenya EV guide", "Which charger fits your EV");
      break;
    case "/charging/home":
      add("/charging", "EV charging", "Home, fleet and highway");
      add("/guides", "Guides", "Home charger installation guides");
      add(chargingHub.path, chargingHub.label, "Route hub locations");
      break;
    case "/evs":
      add("/charging/home", "Home EV charging", "Daily top-up at home");
      add(chargingHub.path, chargingHub.label, "Public DC charging");
      add("/faq", "FAQ", "Charging economics in Kenya");
      break;
    case "/locations":
      add(chargingHub.path, chargingHub.label, "Charging Hub directory");
      add("/charging/home", "Home EV charging", "Install in your city");
      break;
    case "/training":
      add("/charging/engineering", "Engineering package", "Hub design basis");
      add("/partners", "Partners", "Fleet and hub operations");
      break;
    case "/about":
      add("/charging", "EV charging", "Products and services");
      add("/contact", "Contact", "Talk to the team");
      break;
    case "/contact":
      add("/charging/home", "Home EV charging", "Request a survey");
      add("/partners", "Partners", "Fleet and hub hosting");
      break;
    case "/download":
      add(chargingHub.path, chargingHub.label, "Hubs and route coverage");
      add("/charging/home", "Home EV charging", "Pulse charger and Pod energy storage installs");
      add("/charging", "EV charging", "Spark charger to Corridor");
      break;
    case "/partners":
      add("/charging", "EV charging", "From home charging to highway charging");
      add("/training", "Training", "Technician certification");
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
