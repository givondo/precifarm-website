
/** Canonical public name and path for the Charging Hub */
export const chargingHub = {
  name: "Charging Hub",
  path: "/hub" as const,
  label: "Charging Hub",
  openLabel: "Open Charging Hub",
  nameLower: "charging hub",
  description:
    "Charging Hub finds planned ARC Corridor DC charging and Boda Hub battery swap sites in Kenya, with the stage and connector of each. No site is operating yet.",
  url: "https://precifarm.com/hub",
} as const;

export const chargingHubPage = {
  hero: {
    eyebrow: "Kenya · Station finder",
    title: "Charging Hub",
    lead:
      "Find planned ARC Corridor and Boda Hub sites, check each site's connector and stage, and open its location in Maps. No site is operating yet, so the finder shows no live availability and no prices.",
  },
  finderTitle: "Find a site",
  legend: {
    eyebrow: "Reading the finder",
    title: "Every site carries its stage",
    stages: [
      { kind: "available" as const, label: "Operating", text: "Commissioned and open to drivers or riders, with its price shown before you start. No site is at this stage yet." },
      { kind: "planned" as const, label: "Planned", text: "A location Precifarm is planning. Shown so you can see where the network is going, not where to charge today." },
      { kind: "partner-site" as const, label: "Partner site", text: "Run by a site partner, not by Precifarm. Listed only once the partnership is confirmed." },
    ],
    availability:
      "Free and busy bays are not shown. When a site is commissioned it will be labelled operating, with its connector and its price per kWh or per swap.",
  },
  siteTypes: {
    eyebrow: "What you will find",
    title: "Three kinds of stop",
    rows: [
      {
        id: "corridor",
        name: "ARC Corridor DC",
        what: "DC fast charging for cars on highways and in towns",
        connector: "CCS2, on a certified OEM charger",
        pay: "Price per kWh shown before you start; paid with M-Pesa",
        stage: "pilot" as const,
        href: "/charging/corridor",
      },
      {
        id: "swap",
        name: "Boda Hub swap",
        what: "Battery swapping for electric motorcycles",
        connector: "One battery make per site",
        pay: "M-Pesa at the cabinet screen; price shown before you confirm",
        stage: "development" as const,
        href: "/charging/boda-hub",
      },
      {
        id: "partner",
        name: "Partner stops",
        what: "Chargers at fuel stations, malls and retail stops, run by the site partner",
        connector: "Listed per site once confirmed",
        pay: "Set by the partner",
        stage: "planned" as const,
        href: "/partners",
      },
    ],
  },
  hosts: {
    eyebrow: "Put your site on the map",
    title: "Have land on a busy route or a boda stage?",
    options: [
      { title: "Host an ARC Corridor site", text: "Fuel stations, malls and roadside stops. Starts with a free survey and a Kenya Power study.", href: "/contact?interest=corridor" },
      { title: "Host a Boda Hub", text: "Stages, shops, forecourts and depots where riders already stop.", href: "/contact?interest=boda-hub" },
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
  faqs: [
    {
      question: "What is the Charging Hub?",
      answer:
        "A finder for Precifarm's planned ARC Corridor DC charging sites and Boda Hub battery swap sites in Kenya. Each site shows its stage, connector and location. It runs in your browser at precifarm.com/hub.",
    },
    {
      question: "Can I charge at these sites today?",
      answer:
        "Not yet. Every site in the finder is planned. The first ARC Corridor site, on the Nairobi to Kisumu route, is being prepared. A site is labelled operating only once it is commissioned.",
    },
    {
      question: "Why are there no prices or free bays?",
      answer:
        "Because no site is operating. The price per kWh for each Corridor site is set at commissioning and shown before you start. Live bay status is shown only for sites that are operating.",
    },
    {
      question: "How will I pay?",
      answer: "With M-Pesa. You see the price before you confirm, at the charger or the cabinet screen, and the receipt goes to your phone.",
    },
    {
      question: "Does the map work on a weak connection?",
      answer: "Yes. The list view needs no map tiles, so you can filter and read every site without loading the map.",
    },
  ],
} as const;

export const chargingHubSitePhaseStyles = {
  live: "bg-green-50 text-green-800 border-green-200",
  next: "bg-amber-50 text-amber-800 border-amber-200",
  planned: "bg-muted text-forest-500 border-border",
} as const;
