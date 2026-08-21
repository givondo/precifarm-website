/** EV charger images — product photography in /public/images/products/ */
import { productImages } from "@/lib/product-images";

export const chargingPage = {
  eyebrow: "Charging",
  title: "From home charging to highway charging",
  description:
    "Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway — M-Pesa on every product. Lipa Pole Pole from KES 3,300/month. Public DC in under 30 minutes from KES 39/kWh.",
} as const;

export const chargingOfferings = {
  routeHub: {
    eyebrow: "Highway charging",
    image: productImages.corridor.src,
    imageAlt: productImages.corridor.alt,
    brand: productImages.corridor.brand,
  },
  hubAnatomy: {
    image: productImages.corridor.src,
    imageAlt: productImages.corridor.alt,
    caption:
      "Energy supply, Corridor DC, dwell and operations — integrated in one dependable stop for your EV.",
  },
  home: {
    eyebrow: "Home charging",
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
    products: [
      { id: "pulse" as const, ...productImages.pulse },
      { id: "pod" as const, ...productImages.pod },
      { id: "spark" as const, ...productImages.spark },
    ],
  },
  privateSite: {
    eyebrow: "Fleet charging",
    image: productImages.depot.src,
    imageAlt: productImages.depot.alt,
    brand: productImages.depot.brand,
    products: [
      { id: "depot" as const, ...productImages.depot },
      { id: "boda" as const, ...productImages.boda },
    ],
  },
} as const;

export const chargingCategories = [
  {
    title: "Home charging",
    text: "Pulse charger from KES 79,000, Pod energy storage for weak-grid evenings, Spark charger in the boot — a typical home charging day about KES 140.",
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
  },
  {
    title: "Fleet charging",
    text: "Depot charging station adds 40+ kWh in about 120 minutes while vehicles are parked. Boda Hub swaps a fresh battery in under 5 minutes.",
    image: productImages.depot.src,
    imageAlt: productImages.depot.alt,
  },
  {
    title: "Highway charging",
    text: "Corridor charging adds about 60 kWh in 30 minutes at highway hubs. Find live sites on the Charging Hub and pay with M-Pesa.",
    image: productImages.corridor.src,
    imageAlt: productImages.corridor.alt,
  },
] as const;
