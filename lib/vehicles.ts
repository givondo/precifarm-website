const homeSolarImage = "/images/charging-private-house-hybrid.png";
const corridorImage = "/images/products/corridor-v5.png";
const depotImage = "/images/products/depot-v5.png";
const familyImage = "/images/charging-ecosystem-hero-v20.png";

export const hubImages = {
  /** Home solar + storage + wall charging — passenger EV, not a bus */
  homeSolar: {
    image: homeSolarImage,
    imageAlt:
      "Home with rooftop solar panels, battery storage and a wall charger powering an electric car",
    objectPosition: "object-[42%_48%]",
  },
  /** Corridor DC fast charger product */
  intercityCharger: {
    image: corridorImage,
    imageAlt: "Precifarm Corridor 120 kW DC fast charger with dual CCS2 holsters and M-Pesa on the display",
    objectPosition: "object-center",
  },
  /** Fleet depot AC pedestal */
  fleetCanopy: {
    image: depotImage,
    imageAlt: "Precifarm Depot 22 kW AC charging pedestal with Type 2 cable in the holster",
    objectPosition: "object-center",
  },
  /** Charging and energy product family */
  intercityWide: {
    image: familyImage,
    imageAlt:
      "Precifarm charging and energy family — Pulse, Spark, P1 Go, Pod, Corridor, Depot and Boda Hub",
    objectPosition: "object-center",
  },
  /** Highway DC product showcase */
  showcasePremium: {
    image: corridorImage,
    imageAlt:
      "Precifarm Corridor DC fast charger — T-canopy, dual CCS2 holsters and M-Pesa session pay",
    objectPosition: "object-center",
  },
} as const;

export type HubImageKey = keyof typeof hubImages;

/** @deprecated Use hubImages — kept for any legacy crop references */
export const hubImageCrops = hubImages;

export type HubImageCrop = HubImageKey;

/** Hub photography used on about, partners and charging pages */
export const siteImages = {
  about: hubImages.intercityWide,
  networkHub: hubImages.intercityCharger,
  hubSpotlight: hubImages.intercityCharger,
} as const;
