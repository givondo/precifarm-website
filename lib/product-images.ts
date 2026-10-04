/**
 * Canonical product shots for inner pages (2026 industrial renders where available).
 * Homepage bands use lib/home-page-images.ts — not this file for featured Pulse / Pod hero.
 */

import { productRenderPaths } from "@/lib/product-renders-catalog";

export const productImages = {
  chargingEcosystemHero: {
    src: productRenderPaths.energyStorageFamily,
    alt: "Precifarm charging and energy family — Pulse charger, Spark charger, P1 Go, Pod, Corridor, Depot and Boda Hub",
    brand: "none" as const,
  },
  p1Go: {
    src: productRenderPaths.p1Go,
    alt: "Precifarm P1 Go portable power station with foldable solar panel and green-accent display",
    brand: "none" as const,
  },
  homeEnergyFullSystem: {
    src: productRenderPaths.p2Home,
    alt: "Precifarm P2 Home tower with Pulse charger — home energy and EV charging",
    brand: "pod" as const,
  },
  spark: {
    src: "/images/products/spark-v3.png",
    alt: "Precifarm Spark portable EV charger as Type 2 connector, control box and industrial plug",
    brand: "spark" as const,
  },
  pulse: {
    src: productRenderPaths.pulse7kW,
    alt: "Precifarm Pulse 7 kW home wallbox with holstered Type 2 cable and green Precifarm branding",
    brand: "pulse" as const,
  },
  pod: {
    src: productRenderPaths.p2Home,
    alt: "Precifarm P2 Home backup tower — modular home energy beside the consumer board",
    brand: "pod" as const,
  },
  podHomeHero: {
    src: productRenderPaths.p2Home,
    alt: "Precifarm P2 Home tower for home backup and EV-ready essential loads",
    brand: "pod" as const,
  },
  podHomeHeroWide: {
    src: productRenderPaths.p2Home,
    alt: "Precifarm P2 Home modular tower for Kenyan home energy and backup",
    brand: "none" as const,
  },
  podCharging: {
    src: productRenderPaths.miniStack,
    alt: "Precifarm Mini Stack outdoor modular energy enclosure with service door",
    brand: "none" as const,
  },
  familyHero: {
    src: productRenderPaths.energyStorageFamily,
    alt: "Precifarm energy storage family — P1 Go, P2 Home, Mini Stack and corridor-scale cabinet",
    brand: "none" as const,
  },
  boda: {
    src: productRenderPaths.bodaHub,
    alt: "Precifarm Boda Hub smart locker for electric motorcycle battery swap",
    brand: "none" as const,
  },
  bodaStudio: {
    src: productRenderPaths.bodaHubStudio,
    alt: "Precifarm Boda Hub smart locker at a Kenyan petrol station with electric motorcycles",
    brand: "none" as const,
  },
  depot: {
    src: productRenderPaths.pulsePlus22kW,
    alt: "Precifarm 22 kW AC charging pedestal (Pulse Plus) with dual holsters and session display",
    brand: "none" as const,
  },
  corridor: {
    /** T-canopy DC product shot — matches public Corridor copy (120 kW+, dual CCS2, M-Pesa). */
    src: "/images/products/corridor-v5.png",
    alt: "Precifarm Corridor 120 kW DC fast charger with T-canopy, dual CCS2 holsters and M-Pesa on the display",
    brand: "corridor" as const,
  },
  corridorDispenserRender: {
    src: productRenderPaths.corridorDispenser,
    alt: "Precifarm Corridor DC dispenser unit with dual CCS2 holsters and emergency stop",
    brand: "corridor" as const,
  },
  corridorForecourt: {
    src: productRenderPaths.corridorForecourt,
    alt: "Precifarm Corridor forecourt with T-canopy DC fast charging",
    brand: "corridor" as const,
  },
  corridorPowerCabinet: {
    src: productRenderPaths.corridorPowerCabinet,
    alt: "Precifarm Corridor power cabinet for highway DC charging",
    brand: "none" as const,
  },
  corridorSafety: {
    src: productRenderPaths.corridorPowerCabinet,
    alt: "Precifarm Corridor DC fast charging — power conversion and safety enclosure",
    brand: "none" as const,
  },
  energyModule: {
    src: productRenderPaths.energyModuleEm256,
    alt: "Precifarm 2.56 kWh Energy Module — swap pack for Boda Hub and modular energy",
    brand: "none" as const,
  },
  p1GoSolar: {
    src: productRenderPaths.p1GoSolar,
    alt: "Precifarm P1 Go with foldable solar panel for portable backup",
    brand: "none" as const,
  },
  miniStack: {
    src: productRenderPaths.miniStack,
    alt: "Precifarm Mini Stack outdoor backup unit with service door and sun-shield canopy",
    brand: "none" as const,
  },
  commercialCabinet: {
    src: productRenderPaths.commercialCabinet,
    alt: "Precifarm C215 commercial energy cabinet for site-scale storage",
    brand: "none" as const,
  },
  financing: {
    src: "/images/products/financing.png",
    alt: "Lipa Pole Pole M-Pesa instalments for Precifarm home charging",
    brand: "none" as const,
  },
} as const;
