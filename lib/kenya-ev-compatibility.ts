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
  /** Typical daily top-up: Pulse charger at home; DC where listed */
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
    practicalRange: "~200 to 250 km",
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
    practicalRange: "~300 to 350 km",
    dcCharging: "~50 to 100 kW CHAdeMO",
    chargingTime: carCharge("12 min"),
    precifarmCharging: "Home · Hub",
    marketNote: "leaf",
  },
  {
    id: "byd-dolphin",
    model: "BYD Dolphin",
    body: "Hatchback",
    battery: "~45 to 60 kWh",
    practicalRange: "~280 to 400 km",
    dcCharging: "~60 to 80 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub · DC",
    marketNote: "byd",
  },
  {
    id: "byd-atto3",
    model: "BYD Atto 3",
    body: "SUV",
    battery: "~50 to 61 kWh",
    practicalRange: "~300 to 400 km",
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
    battery: "~61 to 83 kWh",
    practicalRange: "~400 to 550 km",
    dcCharging: "~150 kW",
    chargingTime: carCharge("8 min"),
    precifarmCharging: "Home · DC",
    marketNote: "byd",
  },
  {
    id: "byd-dolphin-surf",
    model: "BYD Dolphin Surf",
    body: "Compact hatch",
    battery: "~30 to 43 kWh",
    practicalRange: "~200 to 300 km",
    dcCharging: "~30 to 85 kW",
    chargingTime: carCharge("15 min"),
    precifarmCharging: "Home · Workplace",
    marketNote: "byd",
  },
  {
    id: "byd-sealion-7",
    model: "BYD Sealion 7",
    body: "SUV",
    battery: "~72 to 92 kWh",
    practicalRange: "~400 to 550 km",
    dcCharging: "~150 kW+",
    chargingTime: carCharge("8 min"),
    precifarmCharging: "Home · DC",
    marketNote: "byd",
  },
  {
    id: "mg4",
    model: "MG4 EV",
    body: "Hatchback",
    battery: "~51 to 64 kWh",
    practicalRange: "~300 to 420 km",
    dcCharging: "~100 to 135 kW",
    chargingTime: carCharge("8 min"),
    precifarmCharging: "Home · Hub · DC",
    featured: true,
  },
  {
    id: "kona",
    model: "Hyundai Kona Electric",
    body: "SUV",
    battery: "~48 to 65 kWh",
    practicalRange: "~300 to 450 km",
    dcCharging: "~100 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub",
  },
  {
    id: "kia-niro",
    model: "Kia Niro EV",
    body: "SUV",
    battery: "~64.8 kWh",
    practicalRange: "~350 to 450 km",
    dcCharging: "~80 kW",
    chargingTime: carCharge("12 min"),
    precifarmCharging: "Home · Hub",
  },
  {
    id: "kia-ev6",
    model: "Kia EV6",
    body: "Crossover",
    battery: "~77 kWh",
    practicalRange: "~400 to 500 km",
    dcCharging: "~170 to 240 kW",
    chargingTime: carCharge("6 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "ioniq-5",
    model: "Hyundai Ioniq 5",
    body: "Crossover",
    battery: "~58 to 77 kWh",
    practicalRange: "~350 to 480 km",
    dcCharging: "~175 to 235 kW",
    chargingTime: carCharge("6 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "model-3",
    model: "Tesla Model 3",
    body: "Sedan",
    battery: "~60 to 79 kWh",
    practicalRange: "~400 to 550 km",
    dcCharging: "Up to ~250 kW",
    chargingTime: carCharge("5 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "model-y",
    model: "Tesla Model Y",
    body: "SUV",
    battery: "~60 to 79 kWh",
    practicalRange: "~380 to 530 km",
    dcCharging: "Up to ~250 kW",
    chargingTime: carCharge("5 min"),
    precifarmCharging: "Home · DC+",
  },
  {
    id: "id4",
    model: "VW ID.4",
    body: "SUV",
    battery: "~52 to 77 kWh",
    practicalRange: "~300 to 450 km",
    dcCharging: "~100 to 135 kW",
    chargingTime: carCharge("10 min"),
    precifarmCharging: "Home · Hub · DC",
  },
  {
    id: "roam-air",
    model: "Roam Air",
    body: "Electric motorcycle",
    battery: "~3.6 kWh",
    practicalRange: "~80 to 100 km",
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
    battery: "~2 to 3 kWh",
    practicalRange: "~60 to 100 km",
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
    title: "Nissan Leaf: Kenya's used-EV staple",
    text: "The Leaf is among Kenya's most imported EVs, often a 40 kWh or e+ 62 kWh unit with CHAdeMO fast charging. Precifarm maps home, workplace and destination charging around that reality.",
  },
  byd: {
    title: "BYD: official dealer in Kenya",
    text: "Dolphin, Atto 3, Seal, Dolphin Surf and Sealion 7 reflect Kenya's newer passenger-EV market. Battery and DC specs vary by trim and import batch, so check your car's own figures against this guide.",
  },
  ebike: {
    title: "Electric motorcycles: Kenya's fastest-growing EV segment",
    text: "Roam Air and M-KOPA-financed bikes account for a large share of new EV registrations. Boda Hub, in development, is designed for a swap in under 5 minutes; many bikes also charge overnight at home.",
  },
} as const;

export const kenyaEvCompatibilityPage = {
  path: "/evs",
  eyebrow: "17 models · Kenya market",
  title: "Leaf, BYD or Roam Air: how long to charge and where Precifarm fits",
  lead:
    "Compare practical range, DC speed and daily top-up time for the cars and e-bodas Kenyan drivers actually buy, then see whether home Pulse, Charging Hub, ARC Corridor or Boda Hub swap matches your vehicle.",
  vehicleAware:
    "Precifarm is built for vehicle-aware charging in Kenya. Tell Precifarm Agent about your car or e-boda, and its battery size, plug type and daily distance shape the charging plan it sizes. You should not need to decode charger specs first.",
  dataLayer:
    "Practical range and charging times here reflect Kenyan roads rather than WLTP or NEDC brochure figures. Over time, Precifarm session data will sharpen them into Kenya-specific range and charging insights.",
  marketContext:
    "Kenya's EV market is expanding quickly: the Ministry of Roads and Transport put registered EVs at 24,754 at the end of 2025, up from 796 in 2022. New imports, BYD dealer stock and e-motorcycle finance are shifting the mix, and this guide updates as the market does.",
  variantDisclaimer:
    "Battery size, DC speed, charging time and practical range vary with build batch, import spec, software and the charger used. Charging times show a typical daily top-up rather than a full 0 to 100% charge.",
  chargingTimeNote: "Daily top-up · Home = Pulse charger · DC = public fast charge · Swap = Boda Hub",
  chargingKey:
    "Precifarm charging fit: Home, Pulse charger · Workplace and fleet yard, Pulse+ charger · Highway, ARC Corridor · Boda Hub: battery swap under 5 min at partner-hosted sites.",
  chargingRequirementsSection: {
    eyebrow: "Charging requirements",
    title: "What your EV needs from Precifarm",
    description:
      "Match plug type, power level and session length to the charger we install: home Type 2 AC, fleet three-phase AC, highway DC or boda swap.",
    columns: ["Need", "Typical requirement", "Precifarm product"] as const,
    products: [
      {
        need: "Daily home top-up",
        requirement: "Type 2 · 7 kW AC · under two hours for a Nairobi day",
        product: "Pulse charger",
        href: "/charging/home",
      },
      {
        need: "Fleet yard overnight",
        requirement: "22 kW AC three phase · Type 2 (11 kW on most cars)",
        product: "Pulse+ charger",
        href: "/charging/pulse-plus",
      },
      {
        need: "Highway fast charge",
        requirement: "CCS2 DC fast charging",
        product: "ARC Corridor",
        href: "/charging/corridor",
      },
      {
        need: "E-boda continuity",
        requirement: "Swap at partner-hosted sites · one battery make per site",
        product: "Boda Hub",
        href: "/charging/boda-hub",
      },
    ] as const,
  },
  practicalRangeFootnote:
    "* Practical range on Kenyan roads depends on speed, traffic, terrain, temperature, payload, driving style and battery condition.",
  whyTheseModels:
    "Nissan Leaf covers Kenya's used-EV and CHAdeMO legacy. BYD, MG, Hyundai, Kia, Tesla and VW cover newer imports. Roam Air and M-KOPA motorbikes cover the fast-growing e-boda segment.",
  carTableTitle: "Passenger cars",
  bikeTableTitle: "Electric motorcycles",
  carTableCaption: "Kenya passenger EV comparison: range, DC charging, daily top-up and Precifarm fit",
  bikeTableCaption: "Kenya electric motorcycle comparison: swap, home charge and Precifarm fit",
  caption: "Kenya EV comparison: practical range, DC charging, daily top-up time and Precifarm fit",
  columns: {
    model: "Model",
    body: "Body",
    battery: "Battery",
    practicalRange: "Practical range*",
    dcCharging: "DC charging",
    chargingTime: "Charging time",
    precifarmCharging: "Charging requirement",
  },
} as const;

export const kenyaEvHomeSection = {
  id: "ev-cars-comparison",
  eyebrow: "Kenya EV guide",
  title: "Which EV you drive, and how long Precifarm takes to charge it",
  description:
    "Practical range and daily top-up for Leaf, BYD, MG and e-bodas on Kenyan roads. Specs vary by import batch and trim.",
  footnote:
    "* Charging times show a daily top-up. Full comparison on the guide page.",
  fullGuideCta: { href: "/evs", label: "View full Kenya EV guide" },
} as const;

export const evCarComparisonRows = kenyaEvModels;
export const evCarsComparisonSection = kenyaEvHomeSection;
