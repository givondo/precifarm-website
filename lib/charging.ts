/** EV charger images: product photography in /public/images/products/ */
import { productImages } from "@/lib/product-images";
import { brand } from "@/lib/brand-messaging";
import { siteCtas, sitePricing } from "@/lib/site-copy";

export const chargingPage = {
  eyebrow: "Charging",
  title: brand.promise,
  description:
    "Home, fleet and highway: Pulse charger, Pulse+ charger, ARC Corridor DC fast charging and Boda Hub battery swapping. M-Pesa on every product.",
} as const;

type CopyPart = string | { readonly bold: string };

export const whereYouCharge = {
  eyebrow: "Where you charge",
  title: "Charge where your journey takes you.",
  lead: "At home. At the depot. On the highway.",
  description:
    "Precifarm gives you the right charging solution for every part of the journey, with installation, financing, monitoring and M-Pesa built in.",
  pillars: [
    {
      id: "home",
      eyebrow: "Home",
      title: "Wake up charged.",
      body: [
        "Charge overnight from your own driveway. ",
        { bold: "Pulse charger" },
        " handles daily charging, and ",
        { bold: "Lipa Pole Pole" },
        " spreads the cost on M-Pesa.",
      ] as const satisfies readonly CopyPart[],
      products: "Pulse charger · Lipa Pole Pole",
      cta: siteCtas.homeCharging,
      offeringsKey: "home" as const,
    },
    {
      id: "fleet",
      eyebrow: "Fleet",
      title: "Charge while you work.",
      body: [
        "Keep vehicles moving without changing your operation. ",
        { bold: "Pulse+" },
        " brings 22 kW three-phase charging to yards and workplaces, while ",
        { bold: "Boda Hub" },
        " swaps batteries for electric two-wheelers at partner-hosted sites.",
      ] as const satisfies readonly CopyPart[],
      products: "Pulse+ · Boda Hub",
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
        " DC fast charging from a certified OEM charger, with M-Pesa session pay. The first site, on the ",
        { bold: "Nairobi to Kisumu" },
        " route, is being prepared.",
      ] as const satisfies readonly CopyPart[],
      products: "Corridor · DC fast charging · price shown before you start",
      cta: { href: "/charging/corridor", label: "ARC Corridor" },
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
      "Grid connection, ARC Corridor and a stop worth making, in one dependable site for your EV.",
  },
  home: {
    eyebrow: "Home charging",
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
    products: [
      { id: "pulse" as const, ...productImages.pulse },
      { id: "financing" as const, ...productImages.financing },
    ],
  },
  privateSite: {
    eyebrow: "Fleet charging",
    image: productImages.pulsePlus.src,
    imageAlt: productImages.pulsePlus.alt,
    brand: productImages.pulsePlus.brand,
    products: [
      { id: "pulsePlus" as const, ...productImages.pulsePlus },
      { id: "boda" as const, ...productImages.boda },
    ],
  },
} as const;
