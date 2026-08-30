/** EV charger images — product photography in /public/images/products/ */
import { productImages } from "@/lib/product-images";
import { brand } from "@/lib/brand-messaging";
import { siteCtas, sitePricing } from "@/lib/site-copy";

export const chargingPage = {
  eyebrow: "Charging",
  title: brand.promise,
  description:
    "Home, fleet and highway — Pulse, Pod, Spark, Depot, Boda Hub and Corridor. M-Pesa on every product.",
} as const;

type CopyPart = string | { readonly bold: string };

export const whereYouCharge = {
  eyebrow: "Where you charge",
  title: "Charge where your journey takes you.",
  lead: "At home. At the depot. On the highway.",
  description:
    "Precifarm gives you the right charging solution for every part of the journey — with installation, financing, monitoring and M-Pesa built in.",
  pillars: [
    {
      id: "home",
      eyebrow: "Home",
      title: "Wake up charged.",
      body: [
        "Charge overnight from your own driveway. ",
        { bold: "Pulse" },
        " handles daily charging, ",
        { bold: "Pod" },
        " adds energy storage and backup, while ",
        { bold: "Spark" },
        " keeps a portable charger in your boot.",
      ] as const satisfies readonly CopyPart[],
      products: "Pulse · Pod · Spark",
      cta: siteCtas.homeCharging,
      offeringsKey: "home" as const,
    },
    {
      id: "fleet",
      eyebrow: "Fleet",
      title: "Charge while you work.",
      body: [
        "Keep vehicles moving without changing your operation. ",
        { bold: "Depot" },
        " charges vans and buses while parked, while ",
        { bold: "Boda Hub" },
        " enables fast battery swapping for electric two-wheelers.",
      ] as const satisfies readonly CopyPart[],
      products: "Depot · Boda Hub",
      cta: siteCtas.fleetCharging,
      offeringsKey: "privateSite" as const,
    },
    {
      id: "highway",
      eyebrow: "Highway",
      title: "Charge fast. Keep moving.",
      body: [
        "Go beyond the city with ",
        { bold: "Corridor" },
        " DC fast charging. Add about ",
        { bold: "60 kWh in 30 minutes" },
        ", check availability and pay with M-Pesa.",
      ] as const satisfies readonly CopyPart[],
      products: `Corridor · 120 kW+ DC · From ${sitePricing.publicDcFrom}`,
      cta: siteCtas.chargingHub,
      offeringsKey: "routeHub" as const,
    },
  ],
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
      "Grid, T-canopy Corridor DC and dwell — integrated in one dependable stop for your EV.",
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
