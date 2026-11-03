/** Product range: the charging and swapping programmes. `status` keeps the PRECIFARM_MASTER maturity for internal use; it is not shown as a label. */

import { homeNetworkTeaser } from "@/lib/brand-messaging";
import { productImages } from "@/lib/product-images";
import type { ProductStatusKind } from "@/lib/product-status";

export const productNames = {
  pulse: "Pulse charger",
  pulsePlus: "Pulse+ charger",
  boda: "Boda Hub",
  corridor: "Corridor charging",
  financing: "Lipa Pole Pole",
} as const;

/**
 * Typical charge times for public copy. Pulse: a ~10 kWh typical Nairobi day (~60 km) needs about
 * 12 kWh from the meter, about 103 minutes at 7 kW, so "under two hours" (engineering register SSOT V02).
 */
export const productChargeTimes = {
  pulse: "under two hours",
  pulsePlus: "about 2 hours for 40 kWh on a 22 kW car, about 4 hours on an 11 kW car",
  boda: "under 5 minutes",
  corridor: "about 30 minutes",
} as const;

export type ProductId = keyof typeof productNames;

export type HomeProduct = {
  id: ProductId;
  name: string;
  summary: string;
  tagline: string;
  category: "home" | "boda" | "commercial" | "highway" | "financing";
  status: ProductStatusKind;
  priceLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  imageBrand?: "corridor" | "pulse" | "none";
};

export const homeProducts: HomeProduct[] = [
  {
    id: "pulse",
    name: productNames.pulse,
    summary: "Plug in when you get home. By morning the car is ready, and petrol stops being part of the weekday.",
    tagline:
      "The Pulse charger is the wallbox most homeowners start with. We survey, install and look after it; Lipa Pole Pole spreads the cost on M-Pesa.",
    category: "home",
    status: "available",
    priceLabel: "KES 79,000 · Lipa Pole Pole",
    href: "/charging/home",
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    imageBrand: productImages.pulse.brand,
  },
  {
    id: "pulsePlus",
    name: productNames.pulsePlus,
    summary: "22 kW three-phase charging for fleet yards, workplaces and apartment parking.",
    tagline:
      "Pulse+ is the three-phase member of the Pulse family. It adapts to each car and shares one site meter across up to ten units. Register your site.",
    category: "commercial",
    status: "development",
    priceLabel: "Quoted per site",
    href: "/charging/pulse-plus",
    image: productImages.pulsePlus.src,
    imageAlt: productImages.pulsePlus.alt,
    imageBrand: productImages.pulsePlus.brand,
  },
  {
    id: "boda",
    name: productNames.boda,
    summary: "Keep your bike moving: swap a flat pack for a charged one and pay on M-Pesa.",
    tagline:
      "Boda Hub sites are built with partners, and the Automated Boda Hub cabinet adds self-service with a controller in every bay. Partner with us on a site.",
    category: "boda",
    status: "pilot",
    priceLabel: "Fleet pricing",
    href: "/charging/boda-hub",
    image: productImages.boda.src,
    imageAlt: productImages.boda.alt,
    imageBrand: productImages.boda.brand,
  },
  {
    id: "corridor",
    name: productNames.corridor,
    summary: "DC fast charging for highways and towns, engineered around each site's grid connection.",
    tagline:
      "Corridor starts with a certified OEM DC charger of 120 to 180 kW under the Precifarm brand. The first site, on the Nairobi to Kisumu route, is being prepared.",
    category: "highway",
    status: "pilot",
    priceLabel: "Price per kWh shown upfront",
    href: "/charging/corridor",
    image: productImages.corridor.src,
    imageAlt: productImages.corridor.alt,
    imageBrand: productImages.corridor.brand,
  },
  {
    id: "financing",
    name: productNames.financing,
    summary: "M-Pesa instalments for the Pulse charger. No bank account needed.",
    tagline: "Lipa Pole Pole lets you pay in M-Pesa instalments, with the deposit, monthly amount and total shown up front.",
    category: "financing",
    status: "available",
    priceLabel: "From KES 3,300/month",
    href: "/charging/home",
    image: productImages.financing.src,
    imageAlt: productImages.financing.alt,
    imageBrand: productImages.financing.brand,
  },
];

export const categoryLabels: Record<HomeProduct["category"], string> = {
  home: "Home",
  boda: "Boda Hub",
  commercial: "Fleet and workplace",
  highway: "Highway",
  financing: "Financing",
};

export const flagshipIds = ["pulse", "pulsePlus", "corridor"] as const;

export type FlagshipProductId = (typeof flagshipIds)[number];

export type FlagshipProductDetail = {
  id: FlagshipProductId;
  shortName: string;
  headline: string;
  hook: string;
  description: string;
  priceLabel: string;
  specs: readonly string[];
  bestFor: string;
  ctaLabel: string;
  href: string;
};

export const flagshipProductDetails: Record<FlagshipProductId, FlagshipProductDetail> = {
  pulse: {
    id: "pulse",
    shortName: "Pulse",
    headline: "7 kW Home Charger",
    hook: "Charge at home. Wake up ready.",
    description:
      "Your everyday EV charger. Plug in at night and start every morning with a full battery, without depending on public chargers.",
    priceLabel: "KES 79,000 · From KES 3,300/month",
    specs: ["7 kW AC", "Type 2", "Home"],
    bestFor: "Daily drivers",
    ctaLabel: "Get Pulse charger",
    href: "/charging/home",
  },
  pulsePlus: {
    id: "pulsePlus",
    shortName: "Pulse+",
    headline: "22 kW Three-Phase Charger",
    hook: "Charge the fleet while it is parked.",
    description:
      "Three-phase AC for yards, workplaces and apartments. Adapts to each car's on-board charger and shares one site meter across up to ten units.",
    priceLabel: "Quoted per site",
    specs: ["22 kW AC", "Type 2", "Fleet"],
    bestFor: "Fleets and workplaces",
    ctaLabel: "Register interest",
    href: "/charging/pulse-plus",
  },
  corridor: {
    id: "corridor",
    shortName: "Corridor",
    headline: "DC Fast Charging",
    hook: "Charge fast. Keep moving.",
    description:
      "A certified OEM DC charger of 120 to 180 kW under the Precifarm brand, engineered around each site's grid. The first site, on the Nairobi to Kisumu route, is being prepared.",
    priceLabel: "Price per kWh shown upfront",
    specs: ["DC", "CCS2", "Highway", "M-Pesa"],
    bestFor: "Long-distance driving and fleets",
    ctaLabel: "Host a Corridor site",
    href: "/charging/corridor",
  },
};

export const compactRangeIds = ["boda", "financing"] as const;

export { homeNetworkTeaser };
