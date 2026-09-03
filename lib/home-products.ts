/** Homepage product range — aligned with mobile app / catalogue 2026 */

import { homeNetworkTeaser } from "@/lib/brand-messaging";
import { productImages } from "@/lib/product-images";

export const productNames = {
  spark: "Spark charger",
  pulse: "Pulse charger",
  pod: "Pod energy storage",
  boda: "Boda Hub",
  depot: "Depot charging station",
  corridor: "Corridor charging",
  financing: "Lipa Pole Pole",
} as const;

/** Illustrative charge times for public copy — based on ~10 kWh typical Nairobi day (~60 km) unless noted. */
export const productChargeTimes = {
  spark: "about 180 minutes",
  pulse: "about 90 minutes",
  pod: "about 90 minutes",
  boda: "under 5 minutes",
  depot: "about 120 minutes",
  corridor: "about 30 minutes",
} as const;

export type ProductId = keyof typeof productNames;

export type HomeProduct = {
  id: ProductId;
  name: string;
  summary: string;
  tagline: string;
  category: "portable" | "home" | "boda" | "commercial" | "highway" | "financing";
  priceLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  imageBrand?: "corridor" | "pulse" | "spark" | "pod" | "none";
};

export const homeProducts: HomeProduct[] = [
  {
    id: "spark",
    name: productNames.spark,
    summary: "Keep one in the boot for days away from home — office, visit, upcountry, anywhere with a socket.",
    tagline:
      "Spark is the portable lead for when you are not at your own wallbox. Small enough to carry, simple enough to use.",
    category: "portable",
    priceLabel: "From KES 25,000",
    href: "/charging",
    image: productImages.spark.src,
    imageAlt: productImages.spark.alt,
    imageBrand: productImages.spark.brand,
  },
  {
    id: "pulse",
    name: productNames.pulse,
    summary: "Plug in when you get home. By morning the car is ready — petrol stops being part of the weekday.",
    tagline:
      "Pulse is the wallbox most homeowners start with. We install it, you charge overnight, Lipa Pole Pole if you want to spread the cost.",
    category: "home",
    priceLabel: "KES 79,000 · Lipa Pole Pole",
    href: "/charging/home",
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    imageBrand: productImages.pulse.brand,
  },
  {
    id: "pod",
    name: productNames.pod,
    summary: "When Kenya Power dips, Pod keeps the car charging and the essentials running at home.",
    tagline:
      "Pod is for streets where the grid cannot be trusted — home charging plus storage so one outage does not ruin the evening.",
    category: "home",
    priceLabel: "From KES 295,000 · Lipa Pole Pole",
    href: "/charging/home",
    image: productImages.podHomeHero.src,
    imageAlt: productImages.podHomeHero.alt,
    imageBrand: productImages.pod.brand,
  },
  {
    id: "boda",
    name: productNames.boda,
    summary: "Battery swap or kerbside charge in under 5 minutes.",
    tagline: "Boda Hub gets riders back on the road in under 5 minutes with a battery swap or kerbside charge.",
    category: "boda",
    priceLabel: "Fleet pricing",
    href: "/partners#boda-operators",
    image: productImages.boda.src,
    imageAlt: productImages.boda.alt,
    imageBrand: productImages.boda.brand,
  },
  {
    id: "depot",
    name: productNames.depot,
    summary: "22 kW AC pedestal for fleet yards and depots.",
    tagline:
      "The Depot charging station is a 22 kW AC pedestal that adds 40+ kWh in about 120 minutes while the fleet is parked.",
    category: "commercial",
    priceLabel: "KES 39/kWh",
    href: "/hub",
    image: productImages.depot.src,
    imageAlt: productImages.depot.alt,
    imageBrand: productImages.depot.brand,
  },
  {
    id: "corridor",
    name: productNames.corridor,
    summary: "On Nairobi–Kisumu, pull in, top up fast, pay with M-Pesa, and carry on.",
    tagline:
      "Corridor is a T-canopy highway DC hub — cables from overhead, 120 kW+ to the car, dual CCS2 for two bays.",
    category: "highway",
    priceLabel: "KES 39/kWh",
    href: "/hub",
    image: productImages.corridor.src,
    imageAlt: productImages.corridor.alt,
    imageBrand: productImages.corridor.brand,
  },
  {
    id: "financing",
    name: productNames.financing,
    summary: "M-Pesa instalments for Pulse charger and Pod energy storage — no bank account.",
    tagline: "Lipa Pole Pole lets you pay in M-Pesa instalments, with the deposit, monthly amount and total shown.",
    category: "financing",
    priceLabel: "From KES 3,300/month",
    href: "/charging/home",
    image: productImages.financing.src,
    imageAlt: productImages.financing.alt,
    imageBrand: productImages.financing.brand,
  },
];

export const categoryLabels: Record<HomeProduct["category"], string> = {
  portable: "Portable",
  home: "Home",
  boda: "Boda Hub",
  commercial: "Depot",
  highway: "Highway",
  financing: "Financing",
};

export const flagshipIds = ["pulse", "pod", "corridor", "spark"] as const;

export type FlagshipProductId = (typeof flagshipIds)[number];

export type FlagshipProductDetail = {
  id: FlagshipProductId;
  shortName: string;
  headline: string;
  hook: string;
  description: string;
  priceLabel: string;
  specs: readonly string[];
  bestFor: string;
  ctaLabel: string;
  href: string;
};

export const flagshipProductDetails: Record<FlagshipProductId, FlagshipProductDetail> = {
  pulse: {
    id: "pulse",
    shortName: "Pulse",
    headline: "7 kW Home Charger",
    hook: "Charge at home. Wake up ready.",
    description:
      "Your everyday EV charger. Plug in at night and start every morning with a full battery — without depending on public chargers.",
    priceLabel: "KES 79,000 · From KES 3,300/month",
    specs: ["7 kW AC", "Type 2", "Home"],
    bestFor: "Daily drivers",
    ctaLabel: "Get Pulse",
    href: "/charging/home",
  },
  pod: {
    id: "pod",
    shortName: "Pod",
    headline: "Modular Home Energy + EV Charging",
    hook: "Charge your car. Power your home.",
    description:
      "EV charging meets backup power. Pod stores energy for your car and essential home loads — keeping you moving when the grid goes down.",
    priceLabel: "From KES 295,000 · Lipa Pole Pole",
    specs: ["Battery", "EV charging", "Backup", "Modular"],
    bestFor: "Energy independence",
    ctaLabel: "Get Pod",
    href: "/charging/home",
  },
  corridor: {
    id: "corridor",
    shortName: "Corridor",
    headline: "120 kW+ DC Fast Charging",
    hook: "Charge fast. Keep moving.",
    description:
      "Built for Kenya's highways. A T-canopy with overhead cables and dual CCS2 — add range in minutes, pay with M-Pesa and keep moving.",
    priceLabel: "KES 39/kWh",
    specs: ["120 kW+ DC", "T-canopy", "Highway", "M-Pesa"],
    bestFor: "Long-distance driving & fleets",
    ctaLabel: "Find a charger",
    href: "/hub",
  },
  spark: {
    id: "spark",
    shortName: "Spark",
    headline: "3.3 kW Portable EV Charger",
    hook: "Your charger. In your boot.",
    description:
      "No wallbox? No problem. Take Spark to work, upcountry or anywhere you have a suitable socket.",
    priceLabel: "From KES 25,000",
    specs: ["3.3 kW", "Portable", "Type 2"],
    bestFor: "Charging on the go",
    ctaLabel: "Get Spark",
    href: "/charging",
  },
};

export const compactRangeIds = ["boda", "depot"] as const;

export { homeNetworkTeaser };
