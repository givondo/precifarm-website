import { absoluteUrl, publicRoutes, siteConfig } from "@/lib/seo/config";
import { chargingHub } from "@/lib/charging-hub";
import type { KnowledgeEntity } from "@/lib/seo/types";

/**
 * Seed knowledge graph, extensible via CMS.
 * Domain: EV charging, energy, and electric transport (Precifarm).
 */
export const entityRegistry: KnowledgeEntity[] = [
 {
 id: "org-precifarm",
 slug: "precifarm",
 type: "organization",
 name: "Precifarm",
 description:
 "Kenyan company building energy infrastructure for electric transport (EV charging and boda battery swapping) and Precifarm Agent, an AI engineering assistant for EV charging and energy design.",
 url: siteConfig.url,
 relatedIds: ["service-charge-map", "service-home-charging", "product-pulse", "product-pulse-plus", "product-corridor", "product-boda", "service-mobile-app", "service-sustainability"],
 },
 {
 id: "product-pulse",
 slug: "pulse",
 type: "equipment",
 name: "Pulse charger",
 description:
 "7 kW home wallbox. A typical 60 km day refills in under two hours. From KES 79,000 with Lipa Pole Pole on M-Pesa.",
 url: absoluteUrl("/charging/home"),
 relatedIds: ["service-home-charging", "equipment-ev-charger"],
 },
 {
 id: "product-corridor",
 slug: "corridor",
 type: "equipment",
 name: "Corridor charging",
 description:
 "DC fast charging from a certified OEM charger of 120 to 180 kW under the Precifarm brand, engineered per site. The first site, on the Nairobi to Kisumu route, is being prepared. Price per kWh set per site and shown before you start.",
 url: absoluteUrl("/charging/corridor"),
 relatedIds: ["service-hub-charging", "equipment-ev-charger"],
 },
 {
 id: "product-pulse-plus",
 slug: "pulse-plus",
 type: "equipment",
 name: "Pulse+ charger",
 description:
 "22 kW three-phase AC wallbox for fleet yards, workplaces and apartments; 11 kW and 7.4 kW modes; up to ten units on one site meter.",
 url: absoluteUrl("/charging/pulse-plus"),
 relatedIds: ["service-fleet-charging", "product-corridor"],
 },
 {
 id: "product-boda",
 slug: "boda-hub",
 type: "equipment",
 name: "Boda Hub",
 description:
 "Battery swap for electric bodas at partner-run sites, and the self-service Automated Boda Hub cabinet. One battery make per site.",
 url: absoluteUrl("/charging/boda-hub"),
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
 description: "Corridor DC fast charging, paid with M-Pesa. The first site, on the Nairobi to Kisumu route, is being prepared.",
 url: absoluteUrl("/charging/corridor"),
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
 "Pulse charger on private property. A home charging day costs about KES 140 versus about KES 1,000 of diesel.",
 url: absoluteUrl("/charging/home"),
 aliases: ["Private house charging", "Pulse charger"],
 relatedIds: ["service-hub-charging", "product-pulse"],
 },
 {
 id: "service-fleet-charging",
 slug: "fleet-charging",
 type: "service",
 name: "Fleet & Partner Charging",
 description: "Energy services for fleet operators, site hosts and installation partners.",
 url: absoluteUrl("/partners"),
 relatedIds: ["service-hub-charging", "equipment-ev-charger", "product-pulse-plus"],
 },
 {
 id: "service-mobile-app",
 slug: "mobile-app",
 type: "service",
 name: "Precifarm Agent",
 description:
 "AI electrical and energy engineering assistant for EV charging, solar, batteries and electrical systems, on the web and on desktop.",
 url: absoluteUrl("/agent"),
 relatedIds: ["service-charge-map", "service-home-charging", "product-pulse"],
 },
 {
 id: "service-sustainability",
 slug: "sustainability",
 type: "service",
 name: "Sustainability & social impact",
 description:
 "2030 commitments on cleaner kilometres, grid-smart energy, circularity and honest impact reporting for Kenya.",
 url: absoluteUrl("/sustainability"),
 relatedIds: ["service-home-charging", "service-charge-map", "product-pulse"],
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
 add("/charging/home", "Home EV charging", "Pulse charger and Lipa Pole Pole");
 add("/evs", "Kenya EV guide", "Compare EVs and charging fit");
 add("/faq", "FAQ", "Charging and installation answers");
 return links.slice(0, 5);
 case "/hub":
 add("/charging", "EV charging", "From home charging to highway charging");
 add("/charging/home", "Home EV charging", "Pulse charger and Lipa Pole Pole");
 add("/locations", "Locations", "City guides across Kenya");
 break;
 case "/charging":
 add(chargingHub.path, chargingHub.label, "See hub locations");
 add("/charging/home", "Home EV charging", "Pulse charger and Lipa Pole Pole");
 add("/charging/pulse-plus", "Pulse+ charger", "22 kW fleet and workplace AC");
 add("/charging/corridor", "Corridor charging", "DC fast charging on the highway");
 add("/charging/boda-hub", "Automated Boda Hub", "Self-service e-motorcycle battery swap");
 add("/partners", "Fleet EV charging", "Partner operator services");
 add("/evs", "Kenya EV guide", "Which charger fits your EV");
 break;
 case "/charging/boda-hub":
 add(chargingHub.path, chargingHub.label, "Swap sites near you");
 add("/partners", "Partner programmes", "Host a Boda Hub site");
 add("/agent", "Precifarm Agent", "AI electrical & energy engineer");
 add("/charging/engineering", "Engineering", "Site design basis");
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
 case "/agent":
 add("/download", "Desktop download", "Precifarm Agent for desktop");
 add("/charging/home", "Home EV charging", "Pulse charger installs");
 add("/charging", "EV charging", "Pulse charger to Corridor");
 break;
 case "/download":
 add("/agent", "Precifarm Agent", "Product overview");
 add("/contact", "Contact", "Request desktop access");
 add("/charging", "EV charging", "Pulse charger to Corridor");
 break;
 case "/partners":
 add("/charging", "EV charging", "From home charging to highway charging");
 add("/training", "EV charging training", "Technician certification");
 add("/about", "About Precifarm", "Mission and route-one proof");
 break;
 case "/sustainability":
 add("/charging", "EV charging", "Infrastructure behind cleaner kilometres");
 add("/research", "Research", "Wireless charging and battery health");
 add("/faq", "FAQ", "Charging and energy answers");
 break;
 case "/charging/pulse-plus":
 add("/charging/home", "Pulse charger", "7 kW home wallbox");
 add("/partners", "Fleet EV charging", "Partner operator services");
 add("/charging/engineering", "Engineering", "Site design basis");
 break;
 case "/charging/corridor":
 add("/partners", "Host a site", "Site-host and fleet programmes");
 add("/charging/engineering", "Engineering", "Site design basis");
 add("/charging", "EV charging", "From home charging to highway charging");
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
