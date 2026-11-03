/**
 * Canonical product shots for inner pages (2026 industrial renders where available).
 * Homepage bands use lib/home-page-images.ts — not this file for featured Pulse / Pod hero.
 */

import { productRenderPaths } from "@/lib/product-renders-catalog";

export const productImages = {
  pulse: {
    src: productRenderPaths.pulse7kW,
    alt: "Precifarm Pulse 7 kW home wallbox with holstered Type 2 cable and green Precifarm branding",
    brand: "pulse" as const,
  },
  boda: {
    src: productRenderPaths.bodaHub,
    alt: "Precifarm Boda Hub battery-swap locker with twenty bays, one bay open with a battery pack ready, between yellow safety bollards",
    brand: "none" as const,
  },
  bodaStudio: {
    src: productRenderPaths.bodaHubStudio,
    alt: "Precifarm Boda Hub battery-swap locker on its swap pad in golden evening light, with the rider screen on the side totem",
    brand: "none" as const,
  },
  pulsePlusDepot: {
    src: "/images/renders/pulse-plus-22kw-depot-rb.jpg",
    alt: "Three Precifarm Pulse+ 22 kW chargers on a fleet depot wall above marked parking bays",
    brand: "none" as const,
  },
  pulsePlus: {
    src: productRenderPaths.pulsePlus22kW,
    alt: "Precifarm Pulse+ 22 kW three-phase wallbox with its tethered Type 2 cord coiled on the wall dock",
    brand: "none" as const,
  },
  corridor: {
    /** ARC R02 dispenser render, dusk (HD-048: no canopy scenes). Widened to 16:10 from the portrait master. */
    src: productRenderPaths.arcDispenserDusk,
    alt: "Precifarm ARC Corridor DC fast-charging dispenser at dusk, with two CCS2 cables, a touchscreen and an emergency stop",
    brand: "corridor" as const,
  },
  corridorDispenserRender: {
    src: productRenderPaths.corridorDispenser,
    alt: "Precifarm ARC Corridor dispenser unit with dual CCS2 holsters and emergency stop",
    brand: "corridor" as const,
  },
  corridorPowerCabinet: {
    src: productRenderPaths.corridorPowerCabinet,
    alt: "Precifarm Corridor power cabinet for highway DC charging",
    brand: "none" as const,
  },
  financing: {
    /** Lipa Pole Pole pays for this same Pulse install; the earlier image showed a generic charger. */
    src: "/images/renders/pulse-7kw-installed-4x3.jpg",
    alt: "Precifarm Pulse charger installed on a home wall, paid for in M-Pesa instalments with Lipa Pole Pole",
    brand: "none" as const,
  },
} as const;
