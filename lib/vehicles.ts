const routeHubImage = "/images/charging-route-hub.png";
const fleetHubImage = "/images/charging-private-site.png";
const routeHubAlt =
  "Precifarm intercity route charging hub with DC fast chargers, solar canopy and battery storage in Kenya";

export const hubImages = {
  /** Home solar + storage + wall charging */
  homeSolar: {
    image: "/images/charging-private-house-hybrid.png",
    imageAlt:
      "Home with rooftop solar panels, battery storage and a wall charger powering an electric car",
    objectPosition: "object-[42%_48%]",
  },
  /** Intercity route hub — bus at charger */
  intercityCharger: {
    image: routeHubImage,
    imageAlt: "Electric vehicles charging at a Precifarm DC fast charger on an intercity route",
    objectPosition: "object-[22%_58%]",
  },
  /** Fleet / private-site hub — solar canopy over multiple bays */
  fleetCanopy: {
    image: fleetHubImage,
    imageAlt:
      "Electric vans and shuttle bus charging under a solar canopy at a Precifarm fleet hub",
    objectPosition: "object-[48%_38%]",
  },
  /** Balanced wide view of intercity hub */
  intercityWide: {
    image: routeHubImage,
    imageAlt: routeHubAlt,
    objectPosition: "object-[45%_45%]",
  },
  /** Large-scale route hub — premium minimal showcase */
  showcasePremium: {
    image: "/images/charging-hub-premium-kenya.png",
    imageAlt:
      "Large-scale Precifarm electric vehicle charging hub with solar canopy and DC fast chargers in Kenya",
    objectPosition: "object-[50%_42%]",
  },
} as const;

export type HubImageKey = keyof typeof hubImages;

/** @deprecated Use hubImages — kept for any legacy crop references */
export const hubImageCrops = hubImages;

export type HubImageCrop = HubImageKey;

/** Hub photography used on about, partners and charging pages */
export const siteImages = {
  about: hubImages.intercityWide,
  networkHub: hubImages.fleetCanopy,
  hubSpotlight: hubImages.fleetCanopy,
} as const;
