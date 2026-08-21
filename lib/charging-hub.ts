/** Canonical public name for precifarm.com/network */
export const chargingHub = {
  name: "Charging Hub",
  path: "/network" as const,
  label: "Charging Hub",
  openLabel: "Open Charging Hub",
  /** Mid-sentence, lowercase */
  nameLower: "charging hub",
  description:
    "Corridor DC on the highway, Boda Hub battery swap in the city and partner retail stops across Kenya — find sites in the Precifarm app, navigate and pay with M-Pesa.",
  url: "https://precifarm.com/network",
} as const;

export const chargingHubPage = {
  hero: {
    title: "Find EV charging across Kenya",
    description: chargingHub.description,
    primaryHref: "/download",
    primaryLabel: "Download the Android app",
    secondaryHref: "/contact",
    secondaryLabel: "Host a hub site",
    tertiaryHref: "/charging",
    tertiaryLabel: "Explore charging range",
  },
  siteTypes: {
    eyebrow: "What you'll find",
    title: "Three ways to charge on the go",
    description:
      "Precifarm runs Corridor DC on intercity routes, Boda Hub swap for e-motorcycles and lists partner chargers — all searchable in one place.",
    types: [
      {
        id: "corridor",
        title: "Corridor DC",
        stat: "120 kW+",
        detail: "About 60 kWh in 30 minutes at highway hubs. CCS2 and CHAdeMO where listed. From KES 39/kWh on M-Pesa.",
        imageKey: "corridor" as const,
        href: "/charging",
      },
      {
        id: "boda",
        title: "Boda Hub swap",
        stat: "<5 min",
        detail: "Fresh battery for Roam Air and compatible e-bodas in Nairobi, Kisumu and Nakuru — swap or kerbside charge.",
        imageKey: "boda" as const,
        href: "/partners#boda-operators",
      },
      {
        id: "partners",
        title: "Partner chargers",
        stat: "Retail & malls",
        detail: "Shell, Total, Naivas, malls and campuses — DC stops along the routes you already drive.",
        imageKey: "depot" as const,
        href: "/partners",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Open the app, pick a site, pay with M-Pesa",
    description:
      "The Charging Hub lives in the Precifarm Android app today. Filter by DC, Boda swap or partner — then navigate and pay.",
    steps: [
      {
        step: "01",
        title: "Download Precifarm",
        text: "Install the Android app from precifarm.com — no Play Store required.",
      },
      {
        step: "02",
        title: "Open Charging Hub",
        text: "Filter Corridor DC, Boda Hub swap or partner sites. Live and planned labels stay honest.",
      },
      {
        step: "03",
        title: "Navigate",
        text: "Open directions in Google Maps — see connector type and site notes before you leave.",
      },
      {
        step: "04",
        title: "Pay with M-Pesa",
        text: "Session price is shown before you charge. History and receipts in the app.",
      },
    ],
  },
  anatomy: {
    eyebrow: "Hub anatomy",
    title: "More than a charger on a car park",
    description:
      "Every Precifarm hub combines dependable energy, fast DC or Boda battery swap, a comfortable stop and monitored operations — built for Kenyan EV drivers and e-boda operators.",
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
        text: "Remote monitoring, M-Pesa payments, session history and honest recovery when something fails.",
      },
    ],
  },
  corridors: {
    eyebrow: "Corridor coverage",
    title: "Highway routes we are building",
    description:
      "We open the next corridor only when the current one shows real session volume, uptime and partner returns — every hub earns its place.",
    exploreHref: "/charging",
    exploreLabel: "Explore Corridor charging →",
    phases: [
      {
        phase: "A",
        route: "Nairobi – Kisumu",
        hubs: "Kisumu terminus, Nakuru en-route and Nairobi hub access",
        purpose:
          "Western corridor — DC for EV drivers between Nairobi and Kisumu, with partner retail stops along the route.",
        active: true,
        status: "First" as const,
      },
      {
        phase: "B",
        route: "Nairobi – Mombasa",
        hubs: "Mtito Andei, Voi and Mombasa hubs with Nairobi hub access",
        purpose:
          "Coast corridor — dependable Nairobi–Mombasa DC once the western route hits utilisation and uptime targets.",
        active: false,
        status: "Next" as const,
      },
      {
        phase: "C",
        route: "Nairobi – Garissa",
        hubs: "En-route charging along the eastern route, with Garissa as the terminus hub",
        purpose:
          "Eastern reach to northeastern Kenya — opened after western and Mombasa corridors pass demand gates.",
        active: false,
        status: "Planned" as const,
      },
    ],
  },
  locations: {
    eyebrow: "Sites directory",
    title: "Precifarm, Boda Hub and partner locations",
    description:
      "Reference list of sites on the Charging Hub. Open the app for filters and directions — availability is not shown on this page.",
    groups: [
      { id: "corridor" as const, label: "Corridor DC" },
      { id: "boda" as const, label: "Boda Hub swap" },
      { id: "partners" as const, label: "Partner DC" },
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
    title: "Find charging in the Precifarm app",
    description:
      "Download the Android app for the full Charging Hub — filters, directions and M-Pesa on every session. Have a site on a busy route? Talk to us about hosting.",
    primaryHref: "/download",
    primaryLabel: "Download the app",
    secondaryHref: "/contact",
    secondaryLabel: "Host a hub site",
  },
} as const;

export const chargingHubPhaseStyles = {
  First: "bg-forest-100 text-forest-700 border-forest-500/25",
  Next: "bg-muted text-forest-600 border-border",
  Planned: "bg-muted text-forest-500 border-border",
} as const;

export const chargingHubSitePhaseStyles = {
  live: "bg-green-50 text-green-800 border-green-200",
  next: "bg-amber-50 text-amber-800 border-amber-200",
  planned: "bg-muted text-forest-500 border-border",
} as const;
