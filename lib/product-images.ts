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
    alt: "Precifarm Boda Hub smart locker for electric motorcycle battery swap, one door open with an Energy Module ready",
    brand: "none" as const,
  },
  bodaStudio: {
    src: productRenderPaths.bodaHubStudio,
    alt: "Precifarm Boda Hub battery-swap locker on its swap pad, with safety bollards and the rider screen on the side totem",
    brand: "none" as const,
  },
  pulsePlus: {
    src: productRenderPaths.pulsePlus22kW,
    alt: "Precifarm Pulse+ 22 kW three-phase wallbox with its tethered Type 2 cord coiled on the wall dock",
    brand: "none" as const,
  },
  corridor: {
    /** Corridor concept visualisation: two CCS2 guns, M-Pesa tap-to-pay. */
    src: "/images/products/corridor-v6.jpg",
    alt: "Precifarm Corridor DC fast charger concept with dual CCS2 holsters and M-Pesa tap-to-pay on the display",
    brand: "corridor" as const,
  },
  corridorDispenserRender: {
    src: productRenderPaths.corridorDispenser,
    alt: "Precifarm Corridor DC dispenser unit with dual CCS2 holsters and emergency stop",
    brand: "corridor" as const,
  },
  corridorForecourt: {
    src: "/images/renders/corridor-forecourt-v6.jpg",
    alt: "Precifarm Corridor DC fast charging bay at a Kenyan highway service area with solar canopy and M-Pesa session display",
    brand: "corridor" as const,
  },
  corridorPowerCabinet: {
    src: productRenderPaths.corridorPowerCabinet,
    alt: "Precifarm Corridor power cabinet for highway DC charging",
    brand: "none" as const,
  },
  financing: {
    src: "/images/products/financing.png",
    alt: "Lipa Pole Pole M-Pesa instalments for Precifarm home charging",
    brand: "none" as const,
  },
} as const;
