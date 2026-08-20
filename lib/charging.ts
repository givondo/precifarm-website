/** EV charger images — self-hosted in /public/images/ (AI-generated brand imagery) */
export const chargingPage = {
  eyebrow: "Charging",
  title: "From home charging to highway charging",
  description:
    "Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway — M-Pesa on every product, Lipa Pole Pole for home installations.",
} as const;

export const chargingOfferings = {
  routeHub: {
    eyebrow: "Highway charging",
    image: "/images/charging-route-hub.png",
    imageAlt:
      "Electric intercity bus charging at a DC fast charger under a solar canopy with battery storage cabinets beside the highway",
  },
  hubAnatomy: {
    image: "/images/charging-route-hub.png",
    imageAlt:
      "Route charging hub with solar canopy, DC fast charger and battery storage serving an electric car on a Kenyan highway corridor",
    caption:
      "Energy supply, Corridor DC, dwell and operations — integrated in one dependable stop for your EV.",
  },
  home: {
    eyebrow: "Home charging",
    image: "/images/charging-private-house-hybrid.png",
    imageAlt:
      "Grid-connected and hybrid private house EV charging — wall DC charger, rooftop solar, home battery storage and electric SUV at a Kenyan residence, installed to the same engineering standard as Precifarm route hubs",
  },
  privateSite: {
    eyebrow: "Fleet charging",
    image: "/images/charging-private-site.png",
    imageAlt:
      "Row of charging pedestals under a solar canopy serving electric vans and a shuttle bus at a campus car park",
  },
} as const;

export const chargingCategories = [
  {
    title: "Home charging",
    text: "Pulse charger from KES 79,000, Pod energy storage for weak-grid evenings, Spark charger in the boot — a typical home charging day about KES 140.",
    image: chargingOfferings.home.image,
    imageAlt: chargingOfferings.home.imageAlt,
  },
  {
    title: "Fleet charging",
    text: "Depot charging station adds 40+ kWh in about 120 minutes while vehicles are parked. Boda Hub swaps a fresh battery in under 5 minutes.",
    image: chargingOfferings.privateSite.image,
    imageAlt: chargingOfferings.privateSite.imageAlt,
  },
  {
    title: "Highway charging",
    text: "Corridor charging adds about 60 kWh in 30 minutes at highway hubs. Find live sites on the Charging Hub and pay with M-Pesa.",
    image: chargingOfferings.routeHub.image,
    imageAlt: chargingOfferings.routeHub.imageAlt,
  },
] as const;
