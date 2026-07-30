/** EV charger images — self-hosted in /public/images/ (AI-generated brand imagery) */
export const chargingOfferings = {
  routeHub: {
    eyebrow: "Route charging hubs",
    image: "/images/charging-route-hub.png",
    imageAlt:
      "Electric intercity bus charging at a DC fast charger under a solar canopy with battery storage cabinets beside the highway",
  },
  hubAnatomy: {
    image: "/images/charging-route-hub.png",
    imageAlt:
      "Route charging hub with solar canopy, DC fast charger and battery storage serving an electric bus on an intercity route",
    caption:
      "Energy supply, fast charging, passenger dwell and operations — integrated in one dependable stop.",
  },
  home: {
    eyebrow: "Private house charging",
    image: "/images/charging-private-house-hybrid.png",
    imageAlt:
      "Grid-connected and hybrid private house EV charging — wall DC charger, rooftop solar, home battery storage and electric SUV at a Kenyan residence, installed to the same engineering standard as Precifarm route hubs",
  },
  privateSite: {
    eyebrow: "Private in-house stations",
    image: "/images/charging-private-site.png",
    imageAlt:
      "Row of charging pedestals under a solar canopy serving electric vans and a shuttle bus at a campus car park",
  },
} as const;

export const chargingCategories = [
  {
    title: "Route charging hubs",
    text: "DC fast charging, solar and storage on key intercity routes with reserved windows for scheduled buses and fleets.",
    image: chargingOfferings.routeHub.image,
    imageAlt: chargingOfferings.routeHub.imageAlt,
  },
  {
    title: "Private house charging",
    text: "House-based DC charging on your private property — survey, install, optional Neura Pod solar and five-year support.",
    image: chargingOfferings.home.image,
    imageAlt: chargingOfferings.home.imageAlt,
  },
  {
    title: "Private in-house stations",
    text: "Dedicated charging infrastructure for schools, estates, campuses and industrial sites on private land.",
    image: chargingOfferings.privateSite.image,
    imageAlt: chargingOfferings.privateSite.imageAlt,
  },
] as const;
