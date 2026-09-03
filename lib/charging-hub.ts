/** Canonical public name and path for the Charging Hub */
export const chargingHub = {
  name: "Charging Hub",
  path: "/hub" as const,
  label: "Charging Hub",
  openLabel: "Open Charging Hub",
  /** Mid-sentence, lowercase */
  nameLower: "charging hub",
  description:
    "Find Precifarm Corridor DC, Boda Hub swap and partner chargers in Kenya. Live sites are labelled live. Pay with M-Pesa in the AI companion.",
  url: "https://precifarm.com/hub",
} as const;

export const chargingHubPage = {
  hero: {
    eyebrow: "Charging Hub",
    title: "See where you can charge before you leave.",
    description:
      "Corridor DC on Nairobi–Kisumu, Boda Hub swap in town, and partner stops at fuel retail and malls. Use this page to pick a site. Use the AI companion to filter, get directions and pay with M-Pesa.",
    pills: ["Live stays live", "Planned stays planned", "M-Pesa on sessions"],
    primaryHref: "/hub#map",
    primaryLabel: "Browse sites",
    secondaryHref: "/download",
    secondaryLabel: "Get the AI companion",
  },
  honesty: {
    eyebrow: "How to read this page",
    title: "Live is live. Planned is not open yet.",
    items: [
      {
        title: "Live",
        text: "A Live label means the site is listed as operating. Use it for a trip you are taking now.",
      },
      {
        title: "Planned",
        text: "Next corridor and planned pins are design-stage. They are not traction and not a promise you can charge there today.",
      },
      {
        title: "Map bays",
        text: "Free-bay and battery counts on the map are a demonstration, not live telemetry.",
      },
    ],
  },
  map: {
    eyebrow: "Sites",
    title: "Corridor DC, Boda Hub swap and partner chargers",
    description:
      "Filter the map, open a pin, get Google directions. Session price and M-Pesa pay live in the AI companion — this page does not take payment.",
  },
  siteTypes: {
    eyebrow: "What you can do",
    title: "Three stops, one list.",
    description:
      "Highway DC when you leave town. A fresh boda pack in under five minutes. Partner chargers at places you already stop.",
    types: [
      {
        id: "corridor",
        title: "Corridor DC",
        stat: "~60 kWh in 30 min",
        detail:
          "T-canopy highway charging on Nairobi–Kisumu first. Dual CCS2 where listed. From KES 39/kWh on M-Pesa.",
        imageKey: "corridor" as const,
        href: "/hub#map",
      },
      {
        id: "boda",
        title: "Boda Hub swap",
        stat: "Under 5 min",
        detail:
          "Swap a pack for Roam Air and compatible e-bodas in Nairobi, Kisumu and Nakuru — or kerbside charge where listed.",
        imageKey: "boda" as const,
        href: "/hub#map",
      },
      {
        id: "partners",
        title: "Partner chargers",
        stat: "Retail & malls",
        detail:
          "EVChaja, ChargeNet, fuel retail and malls — DC along routes you already drive. Listed here; operated by the partner.",
        imageKey: "depot" as const,
        href: "/hub#map",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How to use it",
    title: "This page finds a site. The companion starts a session.",
    description:
      "The web list works in any browser. Filters, session price and M-Pesa are in the Precifarm AI companion — Android APK from precifarm.com. Not a chatbot. Not on the Play Store. iOS is not available yet.",
    steps: [
      {
        step: "01",
        title: "Pick a site here",
        text: "Filter Corridor DC, Boda Hub swap or partner. Live and planned labels stay honest.",
      },
      {
        step: "02",
        title: "Get directions",
        text: "Open Google Maps from the pin. Check connector notes before you leave.",
      },
      {
        step: "03",
        title: "Pay in the companion",
        text: "Session price is shown before you charge. Pay with M-Pesa. History stays on your phone.",
      },
    ],
  },
  corridors: {
    eyebrow: "Highway",
    title: "Nairobi–Kisumu is first.",
    description:
      "The next corridor opens only when session volume and uptime on the western route prove the model. That is a gate, not a launch calendar.",
    exploreHref: "/charging",
    exploreLabel: "Corridor charging hardware →",
    phases: [
      {
        phase: "1",
        route: "Nairobi – Kisumu",
        hubs: "Kisumu terminus, Nakuru en-route, Nairobi access",
        purpose: "Western highway DC for EV drivers, with partner retail stops along the route.",
        active: true,
        status: "First" as const,
      },
      {
        phase: "2",
        route: "Nairobi – Mombasa",
        hubs: "Mtito Andei, Voi, Mombasa",
        purpose: "Coast DC after the western route hits utilisation and uptime targets.",
        active: false,
        status: "Next" as const,
      },
      {
        phase: "3",
        route: "Nairobi – Garissa",
        hubs: "Eastern en-route sites, Garissa terminus",
        purpose: "Opened after western and Mombasa corridors pass demand gates.",
        active: false,
        status: "Planned" as const,
      },
    ],
  },
  locations: {
    eyebrow: "Directory",
    title: "Every site on this page",
    description: "Same list as the map, as cards. Open the companion when you need to pay.",
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
    title: "Need to pay a session?",
    description:
      "Get the AI companion for filters, directions and M-Pesa. Have kerbside or highway land? Talk to us about hosting a hub.",
    primaryHref: "/download",
    primaryLabel: "Get the AI companion",
    secondaryHref: "/contact",
    secondaryLabel: "Host a hub",
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
