/**
 * Precifarm product library for the Agent. Mirrors public facts on precifarm.com
 * (lib/home-products.ts, lib/charging.ts, lib/boda-hub-page.ts). Update together.
 */

export type PrecifarmProductId = "pulse" | "spark" | "pod" | "depot" | "corridor" | "boda-hub" | "lipa-pole-pole";

export type PrecifarmProduct = {
  id: PrecifarmProductId;
  name: string;
  segment: "home" | "portable" | "fleet" | "highway" | "two-wheeler" | "financing";
  rating: string;
  connector?: string;
  supply?: string;
  price: string;
  /** Never claim a hub is live; Charging Hub (/hub) is the source of truth. */
  status: "available" | "by contract" | "partner-hosted" | "see Charging Hub for live and planned sites";
  useWhen: string;
  href: string;
};

export const precifarmProducts: readonly PrecifarmProduct[] = [
  {
    id: "pulse",
    name: "Pulse charger",
    segment: "home",
    rating: "7 kW AC",
    connector: "Type 2, tethered",
    supply: "Single-phase 240 V on a dedicated circuit (about 32 A charging current)",
    price: "KES 79,000 installed, or Lipa Pole Pole from KES 3,300/month on M-Pesa",
    status: "available",
    useWhen: "Overnight home or SME parking charging; covers a typical 60 to 120 km day in a few hours.",
    href: "/charging/home",
  },
  {
    id: "spark",
    name: "Spark charger",
    segment: "portable",
    rating: "3.3 kW portable",
    connector: "Type 2",
    supply: "Dedicated 16 A outlet on its own circuit for the full 3.3 kW. On a 13 A domestic socket a portable charger must be limited to 10 A (about 2.4 kW)",
    price: "From KES 25,000",
    status: "available",
    useWhen: "Away from home: office, visits, upcountry. Backup to a wallbox.",
    href: "/charging",
  },
  {
    id: "pod",
    name: "Pod energy storage",
    segment: "home",
    rating: "Home charging plus 5 or 10 kWh battery storage",
    price: "From KES 295,000, Lipa Pole Pole available",
    status: "available",
    useWhen: "Unreliable grid: keeps the car charging and essentials running through outages.",
    href: "/charging/home",
  },
  {
    id: "depot",
    name: "Depot charging station",
    segment: "fleet",
    rating: "22 kW AC pedestal",
    connector: "Type 2",
    supply: "Three-phase 400 V",
    price: "KES 39/kWh public sessions; fleet terms by contract",
    status: "by contract",
    useWhen: "Vans, buses and fleets parked in a yard for several hours.",
    href: "/partners",
  },
  {
    id: "corridor",
    name: "Corridor DC fast charging",
    segment: "highway",
    rating: "120 kW+ DC, two bays",
    connector: "Dual CCS2",
    price: "KES 39/kWh, M-Pesa per session",
    status: "see Charging Hub for live and planned sites",
    useWhen: "Intercity trips; Nairobi to Kisumu is the first Corridor. Common CCS2 cars add about 35 to 43 kWh in 30 minutes (the car's DC acceptance and taper set the rate).",
    href: "/hub",
  },
  {
    id: "boda-hub",
    name: "Boda Hub",
    segment: "two-wheeler",
    rating: "Battery-swap lockers with the 2.56 kWh Energy Module",
    price: "Fleet pricing, M-Pesa on every swap",
    status: "partner-hosted",
    useWhen: "Electric motorcycle riders and boda fleets; swap in under 5 minutes.",
    href: "/charging/boda-hub",
  },
  {
    id: "lipa-pole-pole",
    name: "Lipa Pole Pole",
    segment: "financing",
    rating: "M-Pesa instalment financing",
    price: "From KES 3,300/month; deposit, monthly amount and total shown up front",
    status: "available",
    useWhen: "Spread the cost of a Pulse charger or Pod energy storage install. Not for public sessions.",
    href: "/charging/home",
  },
] as const;
