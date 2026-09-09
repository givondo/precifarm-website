/**
 * Product schema catalog as verified published prices and specs only.
 * Conceptual modular-energy items deliberately omit Offer so they are never
 * implied as for sale.
 */

import { homeProducts, productNames } from "@/lib/home-products";
import {
 modularEnergyPaths,
 modularEnergyProducts,
 modularEnergyStatusNote,
} from "@/lib/modular-energy-page";
import { megapackPageContent, megapackStatusNote } from "@/lib/megapack-page";
import { productImages } from "@/lib/product-images";
import type { ProductSchemaInput } from "@/lib/seo/schema";
import { productSchema } from "@/lib/seo/schema";
import type { JsonLd } from "@/lib/seo/types";

function byId(id: string) {
 const product = homeProducts.find((item) => item.id === id);
 if (!product) throw new Error(`Missing home product: ${id}`);
 return product;
}

/** Commercial charging products with verified published prices. */
export const commercialProductCatalog = {
 pulse: {
 name: productNames.pulse,
 description: byId("pulse").tagline,
 path: "/charging/home",
 image: productImages.pulse.src,
 sku: "pulse-7kw",
 category: "Home EV Charger",
 additionalProperty: [
 { name: "Power", value: "7 kW AC" },
 { name: "Connector", value: "Type 2" },
 { name: "Typical day charge", value: "about 90 minutes for ~60 km" },
 { name: "Financing", value: "Lipa Pole Pole on M-Pesa from KES 3,300/month" },
 ],
 offer: {
 price: "79000",
 priceCurrency: "KES",
 availability: "InStock" as const,
 },
 },
 pod: {
 name: productNames.pod,
 description: byId("pod").tagline,
 path: "/charging/home",
 image: productImages.podHomeHero.src,
 sku: "pod-home-storage",
 category: "Home Energy Storage + EV Charging",
 additionalProperty: [
 { name: "Storage", value: "5 or 10 kWh LiFePOâ‚„" },
 { name: "Typical day charge", value: "about 90 minutes for ~60 km" },
 { name: "Financing", value: "Lipa Pole Pole on M-Pesa" },
 ],
 offer: {
 price: "295000",
 priceCurrency: "KES",
 availability: "InStock" as const,
 },
 },
 spark: {
 name: productNames.spark,
 description: byId("spark").tagline,
 path: "/charging",
 image: productImages.spark.src,
 sku: "spark-3-3kw",
 category: "Portable EV Charger",
 additionalProperty: [
 { name: "Power", value: "3.3 kW" },
 { name: "Connector", value: "Type 2" },
 { name: "Typical day charge", value: "about 180 minutes for ~60 km" },
 ],
 offer: {
 price: "25000",
 priceCurrency: "KES",
 availability: "InStock" as const,
 },
 },
 depot: {
 name: productNames.depot,
 description: byId("depot").tagline,
 path: "/partners",
 image: productImages.depot.src,
 sku: "depot-22kw",
 category: "Fleet EV Charger",
 additionalProperty: [
 { name: "Power", value: "22 kW AC" },
 { name: "Session energy", value: "40+ kWh in about 120 minutes" },
 { name: "Public DC rate", value: "from KES 39/kWh" },
 ],
 // Hardware unit price is not published; do not invent an Offer.
 },
 corridor: {
 name: productNames.corridor,
 description: byId("corridor").tagline,
 path: "/hub",
 image: productImages.corridor.src,
 sku: "corridor-120kw",
 category: "Highway DC Fast Charger",
 additionalProperty: [
 { name: "Power", value: "120 kW+ DC" },
 { name: "Connectors", value: "Dual CCS2" },
 { name: "Session energy", value: "about 60 kWh in 30 minutes" },
 { name: "Public DC rate", value: "from KES 39/kWh" },
 ],
 offer: {
 price: "39",
 priceCurrency: "KES",
 unitText: "kWh",
 availability: "InStock" as const,
 },
 },
 boda: {
 name: productNames.boda,
 description: byId("boda").tagline,
 path: "/charging/boda-hub",
 image: productImages.boda.src,
 sku: "boda-hub",
 category: "Electric Motorcycle Battery Swap",
 additionalProperty: [
 { name: "Turnaround", value: "under 5 minutes" },
 { name: "Modes", value: "Battery swap or kerbside charge" },
 { name: "Roadmap", value: "Automated self-service lockers under engineering validation" },
 ],
 // Fleet pricing only as no catalogue unit price.
 },
} as const satisfies Record<string, ProductSchemaInput>;

function conceptualProduct(
 name: string,
 description: string,
 path: string,
 image: string,
 category: string,
 additionalProperty: { name: string; value: string }[],
): ProductSchemaInput {
 return {
 name,
 description: `${description} ${modularEnergyStatusNote}`,
 path,
 image,
 category,
 additionalProperty,
 // No offer as conceptual, not on sale.
 };
}

/** Modular energy family as Product without Offer. */
export const conceptualProductCatalog: Record<string, ProductSchemaInput> = {
 "p1-go": conceptualProduct(
 modularEnergyProducts["p1-go"].name,
 modularEnergyProducts["p1-go"].description,
 modularEnergyPaths.p1Go,
 modularEnergyProducts["p1-go"].image,
 "Portable Backup Power",
 modularEnergyProducts["p1-go"].highlights.map((h) => ({
 name: h.label,
 value: h.value,
 })),
 ),
 "p2-home": conceptualProduct(
 modularEnergyProducts["p2-home"].name,
 modularEnergyProducts["p2-home"].description,
 modularEnergyPaths.p2Home,
 modularEnergyProducts["p2-home"].image,
 "Home Battery Storage",
 modularEnergyProducts["p2-home"].highlights.map((h) => ({
 name: h.label,
 value: h.value,
 })),
 ),
 "mini-stack": conceptualProduct(
 modularEnergyProducts["mini-stack"].name,
 modularEnergyProducts["mini-stack"].description,
 modularEnergyPaths.miniStack,
 modularEnergyProducts["mini-stack"].image,
 "Outdoor SME Battery Storage",
 modularEnergyProducts["mini-stack"].highlights.map((h) => ({
 name: h.label,
 value: h.value,
 })),
 ),
 megapack: {
 name: "MegaPack",
 description: `${megapackPageContent.hero.description} ${megapackStatusNote}`,
 path: modularEnergyPaths.megapack,
 image: megapackPageContent.hero.image.src,
 category: "Project-Engineered Battery Energy Storage",
 additionalProperty: [{ name: "Availability", value: "Project-engineered as not a catalogue SKU" }],
 },
};

export function commercialProductsOnPath(path: string): ProductSchemaInput[] {
 return Object.values(commercialProductCatalog).filter((product) => product.path === path);
}

export function productSchemasForPath(path: string): JsonLd[] {
 const commercial = commercialProductsOnPath(path).map(productSchema);

 if (path === modularEnergyPaths.overview) {
 return [
 ...commercial,
 productSchema(conceptualProductCatalog["p1-go"]),
 productSchema(conceptualProductCatalog["p2-home"]),
 productSchema(conceptualProductCatalog["mini-stack"]),
 productSchema(conceptualProductCatalog.megapack),
 ];
 }

 if (path === modularEnergyPaths.p1Go) return [...commercial, productSchema(conceptualProductCatalog["p1-go"])];
 if (path === modularEnergyPaths.p2Home) return [...commercial, productSchema(conceptualProductCatalog["p2-home"])];
 if (path === modularEnergyPaths.miniStack) {
 return [...commercial, productSchema(conceptualProductCatalog["mini-stack"])];
 }
 if (path === modularEnergyPaths.megapack) {
 return [...commercial, productSchema(conceptualProductCatalog.megapack)];
 }

 if (path === "/charging/boda-hub") {
 return [productSchema(commercialProductCatalog.boda)];
 }

 // /charging is the category hub as Spark is primary; Depot/Corridor/Boda also appear there.
 if (path === "/charging") {
 return [
 productSchema(commercialProductCatalog.spark),
 productSchema(commercialProductCatalog.depot),
 productSchema(commercialProductCatalog.corridor),
 productSchema(commercialProductCatalog.boda),
 ];
 }

 return commercial;
}
