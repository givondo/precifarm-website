import { productImages } from "@/lib/product-images";
import { productRenderPaths } from "@/lib/product-renders-catalog";

const homeSolarImage = productImages.pulse.src;
const corridorImage = productImages.corridor.src;
const depotImage = productRenderPaths.pulsePlus22kW;
const familyImage = productImages.corridor.src;

export const hubImages = {
  /** Home solar + storage + wall charging — passenger EV, not a bus */
  homeSolar: {
    image: homeSolarImage,
    imageAlt:
      "Precifarm Pulse 7 kW home wallbox with its holstered Type 2 cable",
    objectPosition: "object-[42%_48%]",
  },
  /** ARC Corridor DC fast charger product */
  intercityCharger: {
    image: corridorImage,
    imageAlt: productImages.corridor.alt,
    objectPosition: "object-center",
  },
  /** Fleet depot AC pedestal */
  fleetCanopy: {
    image: depotImage,
    imageAlt: "Precifarm Pulse+ 22 kW AC wallbox with the Type 2 connector in its dock",
    objectPosition: "object-center",
  },
  /** Charging and energy product family */
  intercityWide: {
    image: familyImage,
    imageAlt: productImages.corridor.alt,
    objectPosition: "object-center",
  },
  /** Highway DC product showcase */
  showcasePremium: {
    image: corridorImage,
    imageAlt: productImages.corridor.alt,
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
