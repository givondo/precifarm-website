/**
 * Canonical industrial-design renders (2026).
 * Files live in /public/images/renders/ — sourced from Precifarm_* hero_transparent assets.
 */

export const productRenderPaths = {
  pulse7kW: "/images/renders/pulse-7kw-hero.png",
  pulsePlus22kW: "/images/renders/depot-22kw-hero.png",
  bodaHub: "/images/renders/boda-hub-hero.png",
  bodaHubFront: "/images/renders/boda-hub-front.png",
  bodaHubStudio: "/images/renders/boda-hub-hero-studio.png",
  corridorForecourt: "/images/renders/corridor-forecourt-hero.png",
  corridorDispenser: "/images/renders/corridor-dispenser-hero.png",
  corridorPowerCabinet: "/images/renders/corridor-power-cabinet-hero.png",
  energyModuleEm256: "/images/renders/energy-module-em256-hero.png",
  p1Go: "/images/renders/p1-go-hero.png",
  p1GoSolar: "/images/renders/p1-go-solar-hero.png",
  p2Home: "/images/renders/p2-home-hero.png",
  miniStack: "/images/renders/mini-stack-hero.png",
  commercialCabinet: "/images/renders/commercial-cabinet-hero.png",
  energyStorageFamily: "/images/renders/energy-storage-family-hero.png",
} as const;

/** Source filenames in the design export (for designers / asset handoff). */
export const productRenderSourceIds = {
  pulse7kW: "Precifarm_01_Pulse_7kW",
  pulsePlus22kW: "Precifarm_02_PulsePlus_22kW",
  bodaHub: "Precifarm_03_Boda_Hub",
  corridorForecourt: "Precifarm_04_Corridor_Forecourt",
  corridorDispenser: "Precifarm_05_Corridor_Dispenser",
  corridorPowerCabinet: "Precifarm_06_Corridor_Power_Cabinet",
  energyModuleEm256: "Precifarm_07_Energy_Module_EM-256",
  p1Go: "Precifarm_08_P1_Go",
  p1GoSolar: "Precifarm_09_P1_Go_with_Solar_Panel",
  p2Home: "Precifarm_10_P2_Home",
  miniStack: "Precifarm_11_Mini_Stack",
  commercialCabinet: "Precifarm_12_C215_Commercial_Cabinet",
  energyStorageFamily: "Precifarm_13_Energy_Storage_Family",
} as const;
