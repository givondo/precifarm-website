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
    "Charging Hub lists Precifarm fast chargers, boda battery swap and partner stops across Kenya — with honest open and coming-soon labels, and M-Pesa pay at the bay.",
  url: "https://precifarm.com/hub",
} as const;

export const chargingHubPage = {
  hero: {
    eyebrow: "Kenya · live map",
    title: "Highway DC, boda swap and partner stops — each one labelled open or coming soon",
    description:
      "Browse free on the web. Check plug type, public DC from KES 39/kWh and whether the bay is live before you drive — then pay with M-Pesa.",
    image: {
      src: productImages.corridor.src,
      alt: "Precifarm Charging Hub — highway DC, boda battery swap and partner charging stops across Kenya",
    },
    stopImages: [
      {
        src: productImages.corridor.src,
        alt: "Precifarm Corridor DC fast charger under a T-canopy with dual CCS2 holsters",
        label: "Highway DC",
      },
      {
        src: productImages.boda.src,
        alt: "Precifarm Boda Hub twelve-bay battery swap cabinet for electric motorcycles",
        label: "Boda swap",
      },
      {
        src: productImages.depot.src,
        alt: "Precifarm Depot 22 kW AC charging pedestal at a fleet or partner site",
        label: "Partner & fleet",
      },
    ] as const,
    primaryHref: "/download",
    primaryLabel: "Get Precifarm Agent",
    secondaryHref: "/contact",
    secondaryLabel: "Host a charger",
  },
  stats: [
    { value: sitePricing.publicDcFrom, label: "Public fast charge from" },
    { value: "Under 5 min", label: "Boda battery swap" },
    { value: "M-Pesa", label: "Pay before you charge" },
  ],
  highlights: {
    eyebrow: "What you get",
    title: "A charging list you can trust",
    items: [
      {
        id: "honest",
        title: "Open or coming soon",
        text: "Every site is labelled honestly. Coming-soon sites are never shown as open.",
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
        detail: "Fast top-up on major routes. From " + sitePricing.publicDcFrom + " on M-Pesa.",
        imageKey: "corridor" as const,
      },
      {
        id: "boda",
        title: "Boda battery swap",
        stat: "Under 5 min",
        detail: "Drop a flat pack and pick up a charged one in Nairobi, Kisumu and Nakuru.",
        imageKey: "boda" as const,
      },
      {
        id: "partner",
        title: "Partner chargers",
        stat: "Shops & malls",
        detail: "Chargers at fuel stations, malls and retail stops along routes you already drive.",
        imageKey: "depot" as const,
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Three steps to your next charge",
    description: "Browse free on the web. Use Precifarm Agent for engineering and project work — desktop coming soon.",
    items: [
      {
        step: "1",
        title: "Open Charging Hub",
        text: "Use precifarm.com/hub in your browser to browse live and coming-soon sites.",
      },
      {
        step: "2",
        title: "Pick a site",
        text: "Choose fast charge, boda swap or partner. Check the open or coming-soon label.",
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
  statusLabels: {
    eyebrow: "Site labels",
    title: "What the labels mean",
    items: [
      { label: "Open now", text: "You can charge here today." },
      { label: "Coming soon", text: "Still being built — not open yet." },
      { label: "Partner", text: "Run by the shop or station on site." },
    ],
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
        text: "Safe parking, shade and amenities drivers want while charging — worth stopping for, not just a quick plug-in.",
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
    lead: "Public charging on the Charging Hub. Home Pulse and Pod installs are on ",
    homeHref: "/charging/home",
    homeLabel: "home charging",
  },
  cta: {
    title: "Ready to charge?",
    description: "Browse the hub for live sites. Want Precifarm Agent on desktop? Request access. Have land for a charger? Talk to us.",
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
