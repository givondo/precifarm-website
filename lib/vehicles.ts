export const vehicles = {
  city: {
    model: "Yutong U12",
    role: "Within-city travel",
    summary:
      "Premium electric city service for dependable daily movement across Nairobi and other urban networks.",
    image: "/images/yutong-u12.png",
    imageAlt: "Yutong U12 electric city bus for within-city travel",
  },
  intercity: {
    model: "Yutong U18",
    role: "City-to-city travel",
    summary:
      "Long-distance electric bus for scheduled intercity routes such as Nairobi–Kisumu, with reserved charging and premium cabin comfort.",
    image: "/images/yutong-u18.png",
    imageAlt:
      "Yutong U18 electric bus on the Nairobi–Kisumu route",
  },
  cargo: {
    model: "ET01 electric cargo van",
    role: "Fleet and logistics",
    summary:
      "Electric cargo van for last-mile and hub-linked freight — low-floor loading, 200 km range and contracted daytime charging at Precifarm hubs.",
    image: "/images/et01.jpg",
    imageAlt:
      "ET01 electric cargo van for fleet and logistics on the Precifarm network",
  },
} as const;

const routeHubImage = "/images/charging-route-hub.png";
const fleetHubImage = "/images/charging-private-site.png";

const routeHubAlt =
  "Precifarm intercity route charging hub with DC fast chargers, solar canopy and battery storage in Kenya";

/** Hub photography — same ecosystem, different sites and angles */
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
    imageAlt: "Electric bus charging at a Precifarm DC fast charger on an intercity route",
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

/** Vehicle images for mobility and intercity storytelling pages */
export const siteImages = {
  bookingHero: hubImages.intercityCharger,
  about: hubImages.intercityWide,
  networkHub: hubImages.fleetCanopy,
  routeShowcase: hubImages.showcasePremium,
  hubSpotlight: hubImages.fleetCanopy,
} as const;
