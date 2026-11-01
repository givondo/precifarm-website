/**
 * Product schema catalogue: published prices and specs only.
 * Only products on sale carry an Offer. Pilots, products in development and
 * research programmes are described without an Offer so they are never implied
 * as for sale. Ratings follow the PRECIFARM_MASTER register (lib/programmes.ts).
 */

import { homeProducts, productNames } from "@/lib/home-products";
import { productImages } from "@/lib/product-images";
import type { ProductSchemaInput } from "@/lib/seo/schema";
import { productSchema } from "@/lib/seo/schema";
import type { JsonLd } from "@/lib/seo/types";

function byId(id: string) {
 const product = homeProducts.find((item) => item.id === id);
 if (!product) throw new Error(`Missing home product: ${id}`);
 return product;
}

/** Charging and swapping programmes. Pulse is the only one with an Offer. */
export const commercialProductCatalog = {
 pulse: {
 name: productNames.pulse,
 description: byId("pulse").tagline,
 path: "/charging/home",
 image: productImages.pulse.src,
 sku: "pulse-7kw",
 category: "Home EV Charger",
 additionalProperty: [
 { name: "Power", value: "Up to 7 kW class AC (32 A, single phase), design target" },
 { name: "Connector", value: "Type 2, tethered" },
 { name: "Typical day charge", value: "under two hours for ~60 km" },
 { name: "Financing", value: "Lipa Pole Pole on M-Pesa from KES 3,300/month" },
 ],
 offer: {
 price: "79000",
 priceCurrency: "KES",
 availability: "InStock" as const,
 },
 },
 pulsePlus: {
 name: productNames.pulsePlus,
 description: byId("pulsePlus").tagline,
 path: "/charging/pulse-plus",
 image: productImages.pulsePlus.src,
 sku: "pulse-plus-22kw",
 category: "Fleet EV Charger",
 additionalProperty: [
 { name: "Power", value: "Up to 22 kW AC three phase, design target" },
 { name: "Connector", value: "Type 2, tethered" },
 { name: "Availability", value: "In development, not yet on sale" },
 ],
 // In development: no Offer.
 },
 corridor: {
 name: productNames.corridor,
 description: byId("corridor").tagline,
 path: "/charging/corridor",
 image: productImages.corridor.src,
 sku: "corridor-dc",
 category: "DC Fast Charger",
 additionalProperty: [
 { name: "Connectors", value: "Dual CCS2" },
 { name: "Site storage", value: "On-site battery, sized per site" },
 { name: "Public DC rate", value: "set per site at commissioning" },
 { name: "Availability", value: "Pilot sites in development" },
 ],
 // Pilot: no commissioned site yet, so no Offer.
 },
 boda: {
 name: productNames.boda,
 description: byId("boda").tagline,
 path: "/charging/boda-hub",
 image: productImages.boda.src,
 sku: "boda-hub",
 category: "Electric Motorcycle Battery Swap",
 additionalProperty: [
 { name: "Turnaround", value: "under 5 minutes at partner-run sites" },
 { name: "Batteries", value: "One battery make per site" },
 { name: "Availability", value: "Partner-run pilots; Automated Boda Hub cabinet in development" },
 ],
 // Fleet pricing only; no catalogue unit price.
 },
} as const satisfies Record<string, ProductSchemaInput>;

/** Retained for API compatibility; the modular energy family is no longer on the site. */
export const conceptualProductCatalog: Record<string, ProductSchemaInput> = {};

export function commercialProductsOnPath(path: string): ProductSchemaInput[] {
 return Object.values(commercialProductCatalog).filter((product) => product.path === path);
}

export function productSchemasForPath(path: string): JsonLd[] {
 // /charging is the category hub: every charging and swapping programme appears there.
 if (path === "/charging") {
 return Object.values(commercialProductCatalog).map(productSchema);
 }
 return commercialProductsOnPath(path).map(productSchema);
}
