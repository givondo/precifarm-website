/**
 * /charging: product discovery across the four ways Precifarm charges a vehicle.
 * Ratings come from the engineering register (lib/pages/register.ts) by spec id; prices and
 * times from existing site copy (lib/site-copy.ts, lib/home-products.ts). Do not type figures here.
 */
import type { StageKind } from "@/components/interior/StageLabel";
import { brand } from "@/lib/brand-messaging";
import { productChargeTimes } from "@/lib/home-products";
import { claimText } from "@/lib/pages/register";
import { siteCtas, sitePricing } from "@/lib/site-copy";

export const chargingPage = {
  eyebrow: "Charging",
  title: brand.promise,
  description:
    "Home, fleet and highway: Pulse charger, Pulse+ charger, ARC Corridor DC fast charging and Boda Hub battery swapping. M-Pesa on every product.",
} as const;

export type ChargingSegmentId = "home" | "fleet" | "highway" | "swap";

export type ChargingSegment = {
  id: ChargingSegmentId;
  /** Tab label: where the vehicle is when it charges */
  where: string;
  product: string;
  stage: StageKind;
  headline: string;
  body: string;
  /** objectPosition keeps the product in frame when the panel crops to 16:9 */
  image: { src: string; alt: string; position?: string };
  /** Short reason this product suits the place, shown under the tab on desktop */
  parked: string;
  facts: readonly { label: string; value: string }[];
  time: { label: string; value: string };
  price: { label: string; value: string };
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

export const chargingSegments: readonly ChargingSegment[] = [
  {
    id: "home",
    where: "Home",
    product: "Pulse charger",
    stage: "available",
    headline: "Wake up charged.",
    body: "Charge overnight from your own driveway. The Pulse charger handles daily charging, trims its current to stay inside your supply, and Lipa Pole Pole spreads the cost on M-Pesa.",
    image: {
      src: "/images/renders/pulse-7kw-installed-4x3.jpg",
      alt: "Precifarm Pulse charger mounted on a house wall with its tethered Type 2 cable coiled on the holster",
      position: "50% 15%",
    },
    parked: "Parked overnight on your own property",
    facts: [
      { label: "Charging power", value: claimText("pulse", "PUL-03") },
      { label: "Connector", value: claimText("pulse", "PUL-04") },
      { label: "Load management", value: claimText("pulse", "PUL-09") },
    ],
    time: { label: "Typical 60 km day", value: `Refills in ${productChargeTimes.pulse}` },
    price: { label: "Price", value: `From ${sitePricing.pulseFrom}, or Lipa Pole Pole from ${sitePricing.lipaFrom}` },
    primary: { href: "/charging/home", label: "Explore Pulse charger" },
    secondary: { href: "/charging/home#survey", label: siteCtas.homeSurvey.label },
  },
  {
    id: "fleet",
    where: "Fleet and workplace",
    product: "Pulse+ charger",
    stage: "development",
    headline: "Charge while you work.",
    body: "22 kW three-phase charging for fleet yards, workplaces and apartment parking. Each car takes what its on-board charger allows, and up to ten units share one site meter without overloading it.",
    image: {
      src: "/images/renders/pulse-plus-22kw-depot-rb.jpg",
      alt: "Three Precifarm Pulse+ 22 kW chargers on a fleet depot wall above marked parking bays",
    },
    parked: "Parked for a shift or a working day",
    facts: [
      { label: "Charging power", value: claimText("pulsePlus", "PP-03") },
      { label: "Load sharing", value: claimText("pulsePlus", "PP-06") },
      { label: "Supply", value: claimText("pulsePlus", "PP-01") },
    ],
    time: { label: "40 kWh top-up", value: `${productChargeTimes.pulsePlus[0].toUpperCase()}${productChargeTimes.pulsePlus.slice(1)}` },
    price: { label: "Price", value: "Quoted per site" },
    primary: { href: "/charging/pulse-plus", label: "Explore Pulse+" },
    secondary: { href: "/charging/pulse-plus#planner", label: "Plan your site" },
  },
  {
    id: "highway",
    where: "Highway",
    product: "ARC Corridor",
    stage: "pilot",
    headline: "Charge fast. Keep moving.",
    body: "DC fast charging for highways and towns from a certified OEM charger under the Precifarm brand, with M-Pesa session pay. The first site, on the Nairobi to Kisumu route, is being prepared.",
    image: {
      src: "/images/renders/arc-dispenser-dusk-r02.jpg",
      alt: "Precifarm ARC Corridor DC fast-charging dispenser at dusk, with two CCS2 cables, a touchscreen and an emergency stop",
    },
    parked: "A stop on an intercity trip",
    facts: [
      { label: "Power equipment", value: claimText("corridor", "COR-15") },
      { label: "Connectors", value: claimText("corridor", "COR-04") },
      { label: "Grid", value: claimText("corridor", "COR-08") },
    ],
    time: { label: "Typical stop", value: `${productChargeTimes.corridor[0].toUpperCase()}${productChargeTimes.corridor.slice(1)}, depending on the car` },
    price: { label: "Price", value: claimText("corridor", "COR-16") },
    primary: { href: "/charging/corridor", label: "Explore ARC Corridor" },
    secondary: { href: "/contact?interest=corridor", label: "Host a Corridor site" },
  },
  {
    id: "swap",
    where: "Battery swapping",
    product: "Boda Hub",
    stage: "development",
    headline: "Swap the pack. Ride on.",
    body: "Battery swapping for electric motorcycles, built with site partners. Riders swap a flat pack for a charged one and pay on M-Pesa; the Automated Boda Hub cabinet adds self-service lockers.",
    image: {
      src: "/images/renders/boda-hub-revd-hero.jpg",
      alt: "Precifarm Boda Hub battery-swap cabinet with twenty numbered bays, one open with a pack, between yellow safety bollards",
      position: "50% 30%",
    },
    parked: "A few minutes between rides",
    facts: [
      { label: "Cabinet", value: claimText("boda", "BH-01") },
      { label: "Safety", value: claimText("boda", "BH-07") },
      { label: "Batteries", value: claimText("boda", "BH-06") },
    ],
    time: { label: "Swap", value: claimText("boda", "BH-12") },
    price: { label: "Price", value: `Fleet pricing; ${claimText("boda", "BH-11")}` },
    primary: { href: "/charging/boda-hub", label: "Explore Boda Hub" },
    secondary: { href: "/contact?interest=boda-hub", label: "Host a swap site" },
  },
];

/** Hero spec strip: the headline rating of each product, from the register. */
export const chargingHeroFacts = [
  { label: "Home · Pulse", value: "Up to 7.4 kW AC" },
  { label: "Fleet · Pulse+", value: "Up to 22 kW AC" },
  { label: "Highway · ARC Corridor", value: "120 to 180 kW DC" },
  { label: "Swapping · Boda Hub", value: "20 bays per cabinet" },
] as const;

/** Comparison table rows. Each cell is register text or existing site copy. */
export const chargingComparison = {
  title: "Side by side",
  lead: "The same questions for each product: where it fits, how fast, what it costs and how far along it is.",
  rows: [
    {
      label: "Best where",
      cells: {
        home: "Detached houses, townhouses and gated communities with private parking",
        fleet: "Fleet yards, workplace parking and apartment blocks",
        highway: "Highway service areas, town hubs, fuel retail and transport yards",
        swap: "Shops, boda stages, petrol stations and urban hubs",
      },
    },
    {
      label: "Power",
      cells: {
        home: claimText("pulse", "PUL-03"),
        fleet: claimText("pulsePlus", "PP-03"),
        highway: claimText("corridor", "COR-15"),
        swap: claimText("boda", "BH-01"),
      },
    },
    {
      label: "Plug or pack",
      cells: {
        home: claimText("pulse", "PUL-04"),
        fleet: claimText("pulsePlus", "PP-09"),
        highway: claimText("corridor", "COR-04"),
        swap: claimText("boda", "BH-06"),
      },
    },
    {
      label: "Typical time",
      cells: {
        home: `A 60 km day in ${productChargeTimes.pulse}`,
        fleet: `${productChargeTimes.pulsePlus[0].toUpperCase()}${productChargeTimes.pulsePlus.slice(1)}`,
        highway: `${productChargeTimes.corridor[0].toUpperCase()}${productChargeTimes.corridor.slice(1)}, depending on the car`,
        swap: claimText("boda", "BH-12"),
      },
    },
    {
      label: "Price",
      cells: {
        home: `From ${sitePricing.pulseFrom}; Lipa Pole Pole from ${sitePricing.lipaFrom}`,
        fleet: "Quoted per site after a survey",
        highway: claimText("corridor", "COR-16"),
        swap: "Fleet pricing",
      },
    },
    {
      label: "Your car or bike",
      cells: {
        home: claimText("pulse", "PUL-20"),
        fleet: claimText("pulsePlus", "PP-13"),
        highway: "Each vehicle draws only what its battery accepts",
        swap: "Bikes that use the battery make approved for that site",
      },
    },
  ],
} as const;

export const chargingNextSteps = [
  {
    title: "Not sure which fits?",
    text: "Tell us how you drive and where you park. A free survey covers homes, workplaces, fuel stations and depots.",
    href: "/contact?interest=survey",
    label: "Request a free survey",
  },
  {
    title: "Find a place to charge",
    text: "The Charging Hub map shows Precifarm and partner sites, with planned sites labelled as planned.",
    href: siteCtas.chargingHub.href,
    label: "Open Charging Hub",
  },
  {
    title: "Designing a site?",
    text: "Energy model, typical site plan and Kenya Power hold points for home, fleet and highway sites.",
    href: "/charging/engineering",
    label: "Engineering approach",
  },
] as const;
