/**
 * Precifarm product library for the Agent. Mirrors public facts on precifarm.com
 * (lib/home-products.ts, lib/charging.ts, lib/boda-hub-page.ts). Update together.
 */

export type PrecifarmProductId = "pulse" | "pulse-plus" | "corridor" | "boda-hub" | "lipa-pole-pole";

export type PrecifarmProduct = {
  id: PrecifarmProductId;
  name: string;
  segment: "home" | "portable" | "fleet" | "highway" | "two-wheeler" | "financing";
  rating: string;
  connector?: string;
  supply?: string;
  price: string;
  /** Never claim a hub is live; Charging Hub (/hub) is the source of truth. */
  status: "available" | "in development" | "pilot" | "partner-hosted pilot";
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
    supply: "Single-phase 230 V on a dedicated circuit (about 32 A charging current)",
    price: "KES 79,000 installed, or Lipa Pole Pole from KES 3,300/month on M-Pesa",
    status: "available",
    useWhen: "Overnight home or SME parking charging; covers a typical 60 to 120 km day in a few hours.",
    href: "/charging/home",
  },
  {
    id: "pulse-plus",
    name: "Pulse+ charger",
    segment: "fleet",
    rating: "22 kW AC three phase (11 kW and 7.4 kW single-phase modes); design target, not yet released",
    connector: "Type 2, tethered",
    supply: "Three-phase 400 V plus neutral, 32 A per phase; upstream 4-pole Type A 30 mA RCD",
    price: "Quoted per site",
    status: "in development",
    useWhen: "Fleet yards, workplaces and apartment parking where vehicles stand for several hours. Most cars accept 11 kW on three phases.",
    href: "/charging/pulse-plus",
  },
  {
    id: "corridor",
    name: "Corridor DC fast charging",
    segment: "highway",
    rating: "DC fast charging, two bays; power sized per site",
    connector: "Dual CCS2",
    price: "Price per kWh set per site at commissioning and shown before each session; M-Pesa",
    status: "pilot",
    useWhen: "Intercity trips. The first Corridor sites, starting on Nairobi to Kisumu, are pilots in development; none is commissioned yet.",
    href: "/charging/corridor",
  },
  {
    id: "boda-hub",
    name: "Boda Hub",
    segment: "two-wheeler",
    rating: "Battery-swap lockers; one battery make per site",
    price: "Fleet pricing, M-Pesa on every swap",
    status: "partner-hosted pilot",
    useWhen: "Electric motorcycle riders and boda fleets; swap in under 5 minutes at partner-run sites. The Automated Boda Hub cabinet is in development.",
    href: "/charging/boda-hub",
  },
  {
    id: "lipa-pole-pole",
    name: "Lipa Pole Pole",
    segment: "financing",
    rating: "M-Pesa instalment financing",
    price: "From KES 3,300/month; deposit, monthly amount and total shown up front",
    status: "available",
    useWhen: "Spread the cost of a Pulse charger install. Not for public sessions.",
    href: "/charging/home",
  },
] as const;
