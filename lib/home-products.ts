/** Homepage product range — aligned with mobile app / catalogue 2026 */

import { homeNetworkTeaser } from "@/lib/brand-messaging";

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
};

export const homeProducts: HomeProduct[] = [
  {
    id: "spark",
    name: productNames.spark,
    summary: "Fits in the boot — charge wherever you find a socket.",
    tagline:
      "The Spark charger travels with you — top up at a friend's house, the office car park or any suitable outlet.",
    category: "portable",
    priceLabel: "From KES 25,000",
    href: "/charging",
    image: "/images/products/spark.png",
    imageAlt: "Precifarm Spark portable 3.3 kW EV charger with green halo status bar",
  },
  {
    id: "pulse",
    name: productNames.pulse,
    summary: "Plug in at home overnight — start every morning with a full battery.",
    tagline:
      "The Pulse charger mounts on your wall so you charge while you sleep — no petrol station stops on the daily commute.",
    category: "home",
    priceLabel: "KES 79,000 · Lipa Pole Pole",
    href: "/charging/private-house",
    image: "/images/products/pulse.png",
    imageAlt: "Precifarm Pulse 7 kW home wallbox at a Kenyan residence",
  },
  {
    id: "pod",
    name: productNames.pod,
    summary: "Home charging that keeps going when the grid dips — plus backup for the house.",
    tagline:
      "Pod energy storage adds battery backup so you still wake up charged after a weak-grid evening or short outage.",
    category: "home",
    priceLabel: "From KES 295,000 · Lipa Pole Pole",
    href: "/charging/private-house",
    image: "/images/products/pod.png",
    imageAlt: "Precifarm Pod home wallbox with solar and battery storage",
  },
  {
    id: "boda",
    name: productNames.boda,
    summary: "Battery swap or kerbside charge in under 5 minutes.",
    tagline: "Boda Hub gets riders back on the road in under 5 minutes with a battery swap or kerbside charge.",
    category: "boda",
    priceLabel: "Fleet pricing",
    href: "/partners#boda-operators",
    image: "/images/products/boda.png",
    imageAlt: "Precifarm Boda battery swap cabinet for electric motorcycles",
  },
  {
    id: "depot",
    name: productNames.depot,
    summary: "22 kW AC pedestal for fleet yards and depots.",
    tagline:
      "The Depot charging station is a 22 kW AC pedestal that adds 40+ kWh in about 120 minutes while the fleet is parked.",
    category: "commercial",
    priceLabel: "KES 39/kWh",
    href: "/network",
    image: "/images/products/depot.png",
    imageAlt: "Precifarm Depot 22 kW AC charging pedestals at a fleet site",
  },
  {
    id: "corridor",
    name: productNames.corridor,
    summary: "Fast highway top-up in the time of a coffee stop — pay with M-Pesa.",
    tagline:
      "Corridor charging adds enough range for the next leg of your trip while you take a break — no hours at a petrol station.",
    category: "highway",
    priceLabel: "KES 39/kWh",
    href: "/network",
    image: "/images/products/corridor.png",
    imageAlt: "Precifarm Corridor 120 kW DC fast charger at a highway hub",
  },
  {
    id: "financing",
    name: productNames.financing,
    summary: "M-Pesa instalments for Pulse charger and Pod energy storage — no bank account.",
    tagline: "Lipa Pole Pole lets you pay in M-Pesa instalments, with the deposit, monthly amount and total shown.",
    category: "financing",
    priceLabel: "From KES 3,300/month",
    href: "/charging/private-house",
    image: "/images/products/financing.png",
    imageAlt: "Lipa Pole Pole M-Pesa instalments for Precifarm home charging",
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

export const compactRangeIds = ["boda", "depot"] as const;

export { homeNetworkTeaser };
