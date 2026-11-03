import { productImages } from "@/lib/product-images";
import { sitePricing } from "@/lib/site-copy";

/** Canonical public name and path for the Charging Hub */
export const chargingHub = {
  name: "Charging Hub",
  path: "/hub" as const,
  label: "Charging Hub",
  openLabel: "Open Charging Hub",
  nameLower: "charging hub",
  description:
    "Charging Hub maps planned Precifarm Corridor locations, boda battery swap sites and partner stops across Kenya, with M-Pesa pay at the bay.",
  url: "https://precifarm.com/hub",
} as const;

export const chargingHubPage = {
  hero: {
    eyebrow: "Kenya · charging map",
    title: "Highway DC, boda swap and partner stops along your route",
    description:
      "Browse free on the web. See where Precifarm Corridor and Boda Hub sites are planned, check partner stops and plug types, and get directions in one tap.",
    image: {
      src: productImages.corridor.src,
      alt: "Precifarm Charging Hub: highway DC, boda battery swap and partner charging stops across Kenya",
    },
    stopImages: [
      {
        src: productImages.corridor.src,
        alt: "Precifarm Corridor DC fast charger under a T-canopy with dual CCS2 holsters",
        label: "Highway DC",
      },
      {
        src: productImages.bodaStudio.src,
        alt: productImages.bodaStudio.alt,
        label: "Boda swap",
      },
      {
        src: productImages.pulsePlus.src,
        alt: "Precifarm Pulse+ 22 kW AC wallbox for fleet and partner sites",
        label: "Partner & fleet",
      },
    ] as const,
    primaryHref: "/download",
    primaryLabel: "Get Precifarm Agent",
    secondaryHref: "/contact",
    secondaryLabel: "Host a charger",
  },
  stats: [
    { value: sitePricing.publicDcPrice, label: "Public fast charge price" },
    { value: "Under 5 min", label: "Boda battery swap" },
    { value: "M-Pesa", label: "Pay before you charge" },
  ],
  highlights: {
    eyebrow: "What you get",
    title: "A charging list you can trust",
    items: [
      {
        id: "honest",
        title: "Know before you go",
        text: "Each site shows what it offers and where it sits on your route.",
      },
      {
        id: "pick",
        title: "Pick what you need",
        text: "Fast highway charge, boda battery swap, or a charger at a shop you already visit.",
      },
      {
        id: "price",
        title: "Price before you pay",
        text: "Session cost appears in the app before you enter your M-Pesa PIN.",
      },
      {
        id: "maps",
        title: "Directions in one tap",
        text: "Open Google Maps from any site and see what plug it has before you drive.",
      },
    ],
  },
  siteTypes: {
    eyebrow: "Where you can charge",
    title: "Three kinds of stop",
    types: [
      {
        id: "highway",
        title: "Highway fast charge",
        stat: "~60 kWh in 30 min",
        detail: "Fast top-up on major routes. Price per kWh shown before you start; pay on M-Pesa.",
        imageKey: "corridor" as const,
        status: "pilot" as const,
      },
      {
        id: "boda",
        title: "Boda battery swap",
        stat: "Under 5 min",
        detail: "Drop a flat pack and pick up a charged one at partner-run swap sites.",
        imageKey: "boda" as const,
        status: "pilot" as const,
      },
      {
        id: "partner",
        title: "Partner chargers",
        stat: "Shops & malls",
        detail: "Chargers at fuel stations, malls and retail stops along routes you already drive.",
        imageKey: "depot" as const,
        status: "available" as const,
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Three steps to your next charge",
    description: "Browse free on the web. Use Precifarm Agent for engineering and project work.",
    items: [
      {
        step: "1",
        title: "Open Charging Hub",
        text: "Use precifarm.com/hub in your browser to browse sites along your route.",
      },
      {
        step: "2",
        title: "Pick a site",
        text: "Choose fast charge, boda swap or partner. Check the plug type and what the site offers.",
      },
      {
        step: "3",
        title: "Go and pay",
        text: "Get directions in Maps, then start the session and pay with M-Pesa.",
      },
    ],
    appHref: "/download",
    appLabel: "Desktop download",
    guideHref: "/guides",
    guideLabel: "Guides",
  },
  siteSelection: {
    eyebrow: "Site selection",
    title: "Five tests before we build a hub",
    description:
      "Intercity EV charging needs more than a single plug. Every Precifarm site passes five gates before we commit capital.",
    criteria: [
      {
        title: "Proven demand",
        text: "Enough EV sessions and corridor traffic to justify the investment before we deploy capital.",
      },
      {
        title: "Power and tariff",
        text: "Feeder studies, interconnection and tariff clarity must be resolved before irreversible spend.",
      },
      {
        title: "Site and dwell",
        text: "Safe parking, shade and amenities drivers want while charging, so the stop is worth making.",
      },
      {
        title: "Durable control",
        text: "Long-term site rights at fuel retailers, malls, yards or transport termini.",
      },
      {
        title: "Approvals",
        text: "Regulatory and safety sign-off in place before public operation begins.",
      },
    ],
  },
  faq: {
    title: "Common questions",
    lead: "Public charging on the Charging Hub. Home Pulse installs are on ",
    homeHref: "/charging/home",
    homeLabel: "home charging",
  },
  cta: {
    title: "Ready to charge?",
    description: "Browse the hub for sites on your route. Want Precifarm Agent on desktop? Request access. Have land for a charger? Talk to us.",
    primaryHref: "/download",
    primaryLabel: "Get Precifarm Agent",
    secondaryHref: "/contact",
    secondaryLabel: "Host a charger",
  },
} as const;

export const chargingHubSitePhaseStyles = {
  live: "bg-green-50 text-green-800 border-green-200",
  next: "bg-amber-50 text-amber-800 border-amber-200",
  planned: "bg-muted text-forest-500 border-border",
} as const;
