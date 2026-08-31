/**
 * Kenya EV compatibility — docs/reference/kenya-ev-compatibility.md
 */

import type { ChargingTime } from "@/lib/kenya-ev-charging-time";
import { bikeCharge, carCharge } from "@/lib/kenya-ev-charging-time";

export type { ChargingTime };

export type KenyaEvModel = {
  id: string;
  model: string;
  body: string;
  battery: string;
  practicalRange: string;
  dcCharging: string;
  /** Illustrative daily top-up — Pulse charger at home; DC where listed */
  chargingTime: ChargingTime;
  precifarmCharging: string;
  featured?: boolean;
  marketNote?: "leaf" | "byd" | "ebike";
};

export const kenyaEvModels: KenyaEvModel[] = [
  {
    id: "leaf-40",
    model: "Nissan Leaf 40 kWh",
    body: "Hatchback",
    battery: "40 kWh",
    practicalRange: "~200–250 km",
    dcCharging: "~50 kW CHAdeMO",
    chargingTime: carCharge("15 min"),
    precifarmCharging: "Home · Workplace",
    featured: true,
    marketNote: "leaf",
  },
  {
    id: "leaf-eplus",
    model: "Nissan Leaf e+ 62 kWh",
    body: "Hatchback",
    battery: "62 kWh",
    practicalRange: "~300–350 km",
    dcCharging: "~50–100 kW CHAdeMO",
    chargingTime: carCharge("12 min"),
    precifarmCharging: "Home · Hub",
    marketNote: "leaf",
  },
  {
    id: "byd-dolphin",
    model: "BYD Dolphin",
    body: "Hatchback",
    battery: "~45–60 kWh",
    practicalRange: "~280–400 km",
    dcCharging: "~60–80 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub · DC",
    marketNote: "byd",
  },
  {
    id: "byd-atto3",
    model: "BYD Atto 3",
    body: "SUV",
    battery: "~50–61 kWh",
    practicalRange: "~300–400 km",
    dcCharging: "~80 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub · DC",
    featured: true,
    marketNote: "byd",
  },
  {
    id: "byd-seal",
    model: "BYD Seal",
    body: "Sedan",
    battery: "~61–83 kWh",
    practicalRange: "~400–550 km",
    dcCharging: "~150 kW",
    chargingTime: carCharge("8 min"),
    precifarmCharging: "Home · DC",
    marketNote: "byd",
  },
  {
    id: "byd-dolphin-surf",
    model: "BYD Dolphin Surf",
    body: "Compact hatch",
    battery: "~30–43 kWh",
    practicalRange: "~200–300 km",
    dcCharging: "~30–85 kW",
    chargingTime: carCharge("15 min"),
    precifarmCharging: "Home · Workplace",
    marketNote: "byd",
  },
  {
    id: "byd-sealion-7",
    model: "BYD Sealion 7",
    body: "SUV",
    battery: "~72–92 kWh",
    practicalRange: "~400–550 km",
    dcCharging: "~150 kW+",
    chargingTime: carCharge("8 min"),
    precifarmCharging: "Home · DC",
    marketNote: "byd",
  },
  {
    id: "mg4",
    model: "MG4 EV",
    body: "Hatchback",
    battery: "~51–64 kWh",
    practicalRange: "~300–420 km",
    dcCharging: "~100–135 kW",
    chargingTime: carCharge("8 min"),
    precifarmCharging: "Home · Hub · DC",
    featured: true,
  },
  {
    id: "kona",
    model: "Hyundai Kona Electric",
    body: "SUV",
    battery: "~48–65 kWh",
    practicalRange: "~300–450 km",
    dcCharging: "~100 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub",
  },
  {
    id: "kia-niro",
    model: "Kia Niro EV",
    body: "SUV",
    battery: "~64.8 kWh",
    practicalRange: "~350–450 km",
    dcCharging: "~80 kW",
    chargingTime: carCharge("12 min"),
    precifarmCharging: "Home · Hub",
  },
  {
    id: "kia-ev6",
    model: "Kia EV6",
    body: "Crossover",
    battery: "~77 kWh",
    practicalRange: "~400–500 km",
    dcCharging: "~170–240 kW",
    chargingTime: carCharge("6 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "ioniq-5",
    model: "Hyundai Ioniq 5",
    body: "Crossover",
    battery: "~58–77 kWh",
    practicalRange: "~350–480 km",
    dcCharging: "~175–235 kW",
    chargingTime: carCharge("6 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "model-3",
    model: "Tesla Model 3",
    body: "Sedan",
    battery: "~60–79 kWh",
    practicalRange: "~400–550 km",
    dcCharging: "Up to ~250 kW",
    chargingTime: carCharge("5 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "model-y",
    model: "Tesla Model Y",
    body: "SUV",
    battery: "~60–79 kWh",
    practicalRange: "~380–530 km",
    dcCharging: "Up to ~250 kW",
    chargingTime: carCharge("5 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "id4",
    model: "VW ID.4",
    body: "SUV",
    battery: "~52–77 kWh",
    practicalRange: "~300–450 km",
    dcCharging: "~100–135 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub · DC",
  },
  {
    id: "roam-air",
    model: "Roam Air",
    body: "Electric motorcycle",
    battery: "~3.6 kWh",
    practicalRange: "~80–100 km",
    dcCharging: "AC / swap",
    chargingTime: bikeCharge("<5 min", "3 hr"),
    precifarmCharging: "Swap · Home",
    featured: true,
    marketNote: "ebike",
  },
  {
    id: "m-kopa-ebike",
    model: "M-KOPA Electric Motorbike",
    body: "Electric motorcycle",
    battery: "~2–3 kWh",
    practicalRange: "~60–100 km",
    dcCharging: "AC / swap",
    chargingTime: bikeCharge("<5 min", "2 hr"),
    precifarmCharging: "Swap · Home",
    marketNote: "ebike",
  },
];

export const kenyaEvFeaturedModels = kenyaEvModels.filter((model) => model.featured);

/** Passenger cars in the Kenya EV guide (excludes electric motorcycles). */
export const kenyaEvCarModels = kenyaEvModels.filter((model) => model.body !== "Electric motorcycle");

/** Electric motorcycles in the Kenya EV guide. */
export const kenyaEvBikeModels = kenyaEvModels.filter((model) => model.body === "Electric motorcycle");

export const kenyaEvMarketCallouts = {
  leaf: {
    title: "Nissan Leaf — Kenya's used-EV staple",
    text: "The Leaf is among Kenya's most imported EVs — often a 40 kWh or e+ 62 kWh unit with CHAdeMO fast charging. Precifarm maps home, workplace and destination charging around that reality.",
  },
  byd: {
    title: "BYD — official dealer in Kenya",
    text: "Dolphin, Atto 3, Seal, Dolphin Surf and Sealion 7 reflect Kenya's newer passenger-EV market. Battery and DC specs vary by trim and import batch — use this guide for planning, not as a fixed catalogue.",
  },
  ebike: {
    title: "Electric motorcycles — Kenya's fastest-growing EV segment",
    text: "Roam Air and M-KOPA-financed bikes account for a large share of new EV registrations. Swap at Boda Hub in under 5 minutes, or charge overnight at home with Pulse charger.",
  },
} as const;

export const kenyaEvCompatibilityPage = {
  path: "/evs",
  eyebrow: "Kenya EV compatibility",
  title: "Kenya EV guide — range, charging time and Precifarm fit",
  lead:
    "Compare Nissan Leaf, BYD, MG, Hyundai, Kia, Tesla, Volkswagen and electric motorcycles in Kenya — practical range, DC charging speed, daily top-up time and where Precifarm home, hub and corridor charging fit your vehicle.",
  vehicleAware:
    "Precifarm is built for vehicle-aware EV charging in Kenya. Select or connect your car or e-boda in the AI companion — Precifarm uses battery size, charging standard, state of charge and route to recommend where and when to charge. You should not need to decode charger specs first.",
  dataLayer:
    "Practical range and charging times here are planning estimates for Kenyan roads — not manufacturer WLTP or NEDC guarantees. Over time, Precifarm session data can replace brochure figures with Kenya-specific range and charging insights.",
  marketContext:
    "Kenya's EV market is expanding quickly: government data reported 39,324 cumulative registrations by 2025, with industry estimates above 35,000 in 2026. New imports, BYD dealer stock and e-motorcycle finance are shifting the mix — figures in this guide update as the market does.",
  variantDisclaimer:
    "Battery size, DC speed, charging time and practical range vary by manufacturing batch, import spec, software limits and local charger hardware. Charging times show a typical daily top-up — not a full 0–100% pack charge.",
  chargingTimeNote: "Daily top-up · Home = Pulse charger · DC = public fast charge · Swap = Boda Hub",
  chargingKey:
    "Precifarm charging fit — Home: Pulse charger or Pod energy storage · Destination: Charging Hub or Depot · Corridor: highway DC · High-power corridor: 120 kW+ sessions · Boda Hub: battery swap under 5 min · Workplace: fleet Depot site.",
  practicalRangeFootnote:
    "* Practical range is an indicative planning estimate, not a guaranteed specification. Actual range depends on speed, traffic, terrain, temperature, payload, driving style and battery condition.",
  whyTheseModels:
    "Nissan Leaf covers Kenya's used-EV and CHAdeMO legacy. BYD, MG, Hyundai, Kia, Tesla and VW cover newer imports. Roam Air and M-KOPA motorbikes cover the fast-growing e-boda segment.",
  carTableTitle: "Passenger cars",
  bikeTableTitle: "Electric motorcycles",
  carTableCaption: "Kenya passenger EV comparison — range, DC charging, daily top-up and Precifarm fit",
  bikeTableCaption: "Kenya electric motorcycle comparison — swap, home charge and Precifarm fit",
  caption: "Kenya EV comparison — practical range, DC charging, daily top-up time and Precifarm fit",
  columns: {
    model: "Model",
    body: "Body",
    battery: "Battery",
    practicalRange: "Practical range*",
    dcCharging: "DC charging",
    chargingTime: "Charging time",
    precifarmCharging: "Precifarm fit",
  },
} as const;

export const kenyaEvHomeSection = {
  id: "ev-cars-comparison",
  eyebrow: "Kenya EV guide",
  title: "Which EV — and how Precifarm charges it.",
  description:
    "Practical range and charging time for the cars and motorcycles Kenyan drivers actually buy. Specs vary by import batch and trim.",
  footnote:
    "* Illustrative planning figures — not manufacturer guarantees. Charging times = daily top-up. Full comparison on the guide page.",
  fullGuideCta: { href: "/evs", label: "View full Kenya EV guide" },
} as const;

export const evCarComparisonRows = kenyaEvModels;
export const evCarsComparisonSection = kenyaEvHomeSection;
