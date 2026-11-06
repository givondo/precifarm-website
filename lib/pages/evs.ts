/** /evs: display helpers over lib/kenya-ev-compatibility.ts (read-only data). */

import type { StageKind } from "@/components/interior/StageLabel";
import type { KenyaEvModel } from "@/lib/kenya-ev-compatibility";
import { productImages } from "@/lib/product-images";

export type BodyFilter = "all" | "car" | "suv" | "bike";

export const bodyFilters: { id: BodyFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "car", label: "Hatchbacks and sedans" },
  { id: "suv", label: "SUVs and crossovers" },
  { id: "bike", label: "Motorcycles" },
];

export function bodyGroup(m: KenyaEvModel): Exclude<BodyFilter, "all"> {
  if (m.body === "Electric motorcycle") return "bike";
  if (/SUV|Crossover/i.test(m.body)) return "suv";
  return "car";
}

export function usesChademo(m: KenyaEvModel): boolean {
  return /chademo/i.test(m.dcCharging);
}

/** Charging fit tags in the data, spelled out for readers. */
export const fitLabels: Record<string, { label: string; product?: string; href?: string }> = {
  Home: { label: "Home", product: "Pulse charger", href: "/charging/home" },
  Workplace: { label: "Workplace and fleet yard", product: "Pulse+ charger", href: "/charging/pulse-plus" },
  Hub: { label: "Public chargers on the Charging Hub map", href: "/hub" },
  DC: { label: "DC fast charging", product: "ARC Corridor", href: "/charging/corridor" },
  "DC+": { label: "High-power DC fast charging", product: "ARC Corridor", href: "/charging/corridor" },
  Swap: { label: "Battery swap", product: "Boda Hub", href: "/charging/boda-hub" },
};

export function fitTags(m: KenyaEvModel): string[] {
  return m.precifarmCharging.split("·").map((s) => s.trim()).filter(Boolean);
}

/** Matches the homepage product eyebrows. */
export const productStage: Record<string, StageKind> = {
  "Pulse charger": "available",
  "Pulse+ charger": "development",
  "ARC Corridor": "pilot",
  "Boda Hub": "development",
};

export const requirementImages: Record<string, { src: string; alt: string }> = {
  "/charging/home": productImages.pulse,
  "/charging/pulse-plus": productImages.pulsePlus,
  "/charging/corridor": productImages.corridor,
  "/charging/boda-hub": productImages.bodaStudio,
};

/** Market size, as sourced in the website's own guide (lib/seo/static-guides.ts). */
export const evMarketFigure = {
  value: "24,754",
  text: "registered EVs in Kenya at the end of 2025, up from 796 in 2022 (Ministry of Roads and Transport).",
  source: { title: "Capital FM: Registered EVs in Kenya reach 24,754", url: "https://capitalfm.africa/registered-evs-in-kenya-reaches-24754/" },
};
