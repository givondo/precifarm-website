/** Canonical public name for precifarm.com/network */
export const chargingHub = {
  name: "Charging Hub",
  path: "/network" as const,
  label: "Charging Hub",
  openLabel: "Open Charging Hub",
  /** Mid-sentence, lowercase */
  nameLower: "charging hub",
  description:
    "Map Precifarm DC chargers, Boda Hub swap stations and partner sites across Kenya — check live status, get directions and pay with M-Pesa.",
  url: "https://precifarm.com/network",
} as const;

export const chargingHubPage = {
  hero: {
    title: "Find EV charging across Kenya.",
    description: chargingHub.description,
  },
  map: {
    eyebrow: "Live network",
    liveBadge: "Live",
    title: "DC charging & Boda swap map",
    description:
      "Corridor DC on Nairobi–Kisumu, seven Boda Hub swap stations in Nairobi, Kisumu and Nakuru, plus partner retail stops. Filter by DC charge, Boda swap or availability.",
    stats: [
      { key: "dcLive", label: "Live DC sites", suffix: "" },
      { key: "swapLive", label: "Boda swap stations", suffix: "" },
      { key: "available", label: "Available now", suffix: "" },
    ],
  },
  anatomy: {
    eyebrow: "Hub anatomy",
    title: "More than a charger on a car park",
    description:
      "Every Precifarm hub combines dependable energy, fast DC or Boda battery swap, a comfortable stop and live operations — built for Kenyan EV drivers and e-boda operators.",
    imageEyebrow: "Four layers, one hub",
    imageCaption:
      "Energy supply, Corridor DC, dwell and operations — integrated in one dependable stop for your EV.",
    layers: [
      {
        step: "01",
        title: "Energy supply",
        text: "Grid power on an e-mobility tariff, rooftop solar and LiFePO₄ storage keep energy dependable and session costs predictable.",
      },
      {
        step: "02",
        title: "Fast charging",
        text: "Modular CCS2 and CHAdeMO DC where listed — Corridor charging adds about 60 kWh in 30 minutes, paid with M-Pesa.",
      },
      {
        step: "03",
        title: "Comfortable stops",
        text: "Safe parking, shade and amenities while your EV charges — not a lone plug at the edge of a car park.",
      },
      {
        step: "04",
        title: "Operations",
        text: "Live status in the app, M-Pesa payments, session history and honest recovery when something fails.",
      },
    ],
  },
  rollout: {
    eyebrow: "Corridor rollout",
    title: "New routes follow proven driver demand",
    description:
      "We finance the next corridor only when the current one shows real session volume, uptime and partner returns — so every hub on the map earns its place.",
    exploreHref: "/charging",
    exploreLabel: "Explore charging →",
    phases: [
      {
        phase: "A",
        route: "Nairobi – Kisumu",
        hubs: "Kisumu terminus, Nakuru en-route and Nairobi hub access",
        purpose:
          "Western corridor — live DC for EV drivers between Nairobi and Kisumu, with partner retail stops along the route.",
        active: true,
        status: "First" as const,
      },
      {
        phase: "B",
        route: "Nairobi – Mombasa",
        hubs: "Mtito Andei, Voi and Mombasa hubs with Nairobi hub access",
        purpose:
          "Coast corridor — dependable Nairobi–Mombasa DC added once the western route hits utilisation and uptime targets.",
        active: false,
        status: "Next" as const,
      },
      {
        phase: "C",
        route: "Nairobi – Garissa",
        hubs: "En-route charging along the eastern route, with Garissa as the terminus hub",
        purpose:
          "Eastern reach to northeastern Kenya — opened only after western and Mombasa corridors pass demand and financeability gates.",
        active: false,
        status: "Planned" as const,
      },
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
  cta: {
    title: "Have a site on a busy route?",
    description:
      "Fuel stations, malls and parking lots make strong Charging Hub hosts. Share the location and we will assess traffic, power and dwell fit.",
    primaryHref: "/contact",
    primaryLabel: "Talk to us about hosting",
    secondaryHref: "/charging",
    secondaryLabel: "Explore charging",
  },
} as const;

export const chargingHubPhaseStyles = {
  First: "bg-forest-100 text-forest-700 border-forest-500/25",
  Next: "bg-muted text-forest-600 border-border",
  Planned: "bg-muted text-forest-500 border-border",
} as const;
