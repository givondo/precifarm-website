/**
 * Precifarm MegaPack — public copy (single page).
 * Project-engineered BESS from industrial sites to grid-connected plants.
 * Do not name competitor brands on the public site.
 * Legal sources (Sep 2026): KPLC new-connections FAQ, KNDGC Mar 2024, Net-Metering 2024.
 */

import { modularEnergyPaths } from "@/lib/modular-energy-page";

export const megapackInterest =
  "MegaPack energy-storage project (industrial or utility BESS)" as const;

export const megapackPath = modularEnergyPaths.megapack;

export const megapackPaths = {
  product: megapackPath,
  brief: "/downloads/precifarm-megapack-project-brief.html",
  contact: "/contact?interest=megapack",
} as const;

const illustrative = "Illustrative — final MW, MWh and duration are engineered per project.";

export const megapackStatusNote =
  "Conceptual platform. Not on sale as a catalogue product. Precifarm designs and integrates; we do not manufacture cells, PCS or containers.";

export const megapackDisclaimer =
  "MegaPack is a project-engineered platform. Export, public EV charging and electricity supply may need licences and agreements under Kenyan law.";

export const megapackPageContent = {
  hero: {
    eyebrow: "MegaPack · project-engineered BESS",
    title: "Project-engineered battery storage from industrial sites to grid-connected plants",
    description:
      "Precifarm designs and integrates BESS for factories, EV charging hubs, solar + storage and utility-scale plants in Kenya. Power, energy and equipment are specified per site — not sold as a catalogue SKU.",
    image: {
      src: "/images/megapack-hero.png",
      alt: "Precifarm MegaPack site — storage, solar and EV charging in Kenya",
    },
    primaryCta: { href: megapackPaths.contact, label: "Start a project" },
    secondaryCta: { href: megapackPaths.brief, label: "Project brief" },
  },
  lead:
    "Precifarm is the designer, integrator and project developer. Cells, PCS and enclosures come from qualified suppliers. We size from your load, connection point and operating hours — whether that is a facility meter or a grid interconnection.",
  highlights: [
    { label: "Precifarm role", value: "Design, integrate and develop the project" },
    { label: "Typical range", value: "From single-digit MWh toward GWh-class parks" },
    { label: "Kenya context", value: "Kenya Power, Grid Code and EPRA per project" },
  ] as const,
  plantImage: {
    src: "/images/megapack-grid-hero.png",
    alt: "Precifarm utility-scale storage plant with solar in Kenya",
    caption: "Utility-scale plants are engineered from the grid connection inward.",
  },
  applications: {
    eyebrow: "Applications",
    title: "Battery storage for industrial sites and grid-connected plants",
    industrial: {
      title: "Industrial and commercial",
      items: [
        { name: "Solar + storage", text: "Shift daytime generation to evening demand" },
        { name: "Commercial / industrial", text: "Clip peaks and manage maximum demand" },
        { name: "EV charging hub", text: "Buffer charging spikes alongside grid and solar" },
        { name: "Microgrid", text: "Coordinate generation, storage and local loads" },
      ],
    },
    utility: {
      title: "Grid-connected plants",
      items: [
        { name: "Grid-scale BESS", text: "System support where approved and contracted" },
        { name: "Renewable park", text: "Shift output and reduce variability at plant level" },
        { name: "Solar + storage park", text: "Integrate renewable output at park scale" },
        { name: "Energy park", text: "Multi-block plant with shared grid infrastructure" },
      ],
    },
  },
  system: {
    eyebrow: "System architecture",
    title: "An integrated storage stack from connection to battery blocks",
    caption:
      "Typical grid-connected layout. EMS and metering sit in the operating layer. Final equipment is specified per project.",
    stack: [
      { name: "Point of connection", role: "Kenya Power tie-in or facility supply" },
      { name: "Protection + switchgear", role: "Fault isolation and coordination" },
      { name: "PCS / inverters", role: "Bidirectional AC conversion" },
      { name: "Battery blocks", role: "Modular storage — LFP where appropriate" },
      { name: "BMS", role: "Cell and block monitoring and limits" },
      { name: "EMS / SCADA", role: "Charge, discharge, dispatch and operator visibility" },
    ] as const,
  },
  scale: {
    eyebrow: "Plant scale",
    title: "Storage capacity grows in modular blocks as the project stages",
    caption: illustrative,
    stages: [
      { name: "Energy Block", detail: "Repeatable storage and conversion block", range: "Project engineered" },
      { name: "MegaPack", detail: "Integrated site or plant section", range: "~5–100 MWh" },
      { name: "Energy Hub", detail: "Multi-unit site, shared connection", range: "~25–500 MWh" },
      { name: "Energy Park", detail: "Staged park infrastructure", range: "500 MWh → GWh" },
    ] as const,
  },
  evHub: {
    eyebrow: "EV charging hub",
    title: "Battery storage supports the hub but does not replace grid capacity",
    stats: [
      { label: "Grid", value: "1 MW", note: "Kenya Power study required" },
      { label: "Solar", value: "1 MW", note: "Site dependent" },
      { label: "BESS", value: "5 MWh", note: "Engineered per project" },
      { label: "Chargers", value: "1–2 MW", note: "Vehicle mix dependent" },
    ] as const,
    image: {
      src: "/images/megapack-ev-hub.png",
      alt: "Illustrative Precifarm EV hub with storage and DC charging",
    },
    note: "Illustrative only. Storage can reduce instantaneous grid demand. It does not remove interconnection studies or reinforcement.",
  },
  sizing: {
    eyebrow: "Power and energy",
    title: "Power and energy are specified separately for each project",
    note: "Usable hours depend on SOC limits, efficiency, reserves, grid dispatch rules and operating strategy.",
    profiles: [
      {
        title: "Industrial site",
        mw: "2 MW",
        mwh: "8 MWh",
        hours: "~4 h at rated power",
        example: "Peak shaving at a factory or charging hub",
      },
      {
        title: "Utility plant",
        mw: "50 MW",
        mwh: "200 MWh",
        hours: "~4 h at rated power",
        example: "Grid-connected renewable or BESS park",
      },
    ] as const,
  },
  process: {
    eyebrow: "Project delivery",
    title: "How we deliver a MegaPack project in Kenya",
    steps: [
      { step: "01", title: "Discover", text: "Load or export objectives, land and operating model" },
      { step: "02", title: "Model", text: "MW, MWh, duration and economics" },
      { step: "03", title: "Connect", text: "Kenya Power application, studies and Grid Code alignment" },
      { step: "04", title: "Engineer", text: "Electrical, civil, protection and controls" },
      { step: "05", title: "Permit", text: "EPRA, county and environmental where required" },
      { step: "06", title: "Build", text: "Procure, install and integrate in agreed stages" },
      { step: "07", title: "Commission", text: "Protection tests and witness where required" },
      { step: "08", title: "Operate", text: "Monitor, maintain and report" },
    ] as const,
  },
  compliance: {
    eyebrow: "Kenya regulatory context",
    title: "Approvals depend on connection type, scale and how the system is used",
    caption:
      "Grid-connected BESS needs Kenya Power interconnection, applicable EPRA requirements, and county or environmental permits where they apply. Precifarm does not promise approval or grid revenue.",
    items: [
      { name: "Kenya Power", text: "Connection, metering, testing and Premium large requirements where they apply" },
      { name: "Grid Code", text: "ESS technical requirements at the point of connection" },
      { name: "EPRA", text: "Licensing framework where it applies to the project" },
      { name: "Net metering", text: "Consumer self-generation up to 1 MW — not assumed for utility-scale BESS" },
      { name: "County / NEMA", text: "Permits where applicable" },
      { name: "Market / offtake", text: "Grid services or export only where contracted" },
    ] as const,
  },
  faqs: [
    {
      question: "Is MegaPack a product I can buy off the shelf?",
      answer:
        "No. MegaPack is project-engineered. Power, energy and equipment are specified from your site load, connection point and operating model.",
    },
    {
      question: "Does Precifarm manufacture the battery?",
      answer:
        "No. We design and integrate. Cells, PCS, switchgear and enclosures come from qualified suppliers.",
    },
    {
      question: "Can storage replace a larger grid connection?",
      answer:
        "No. It can reduce instantaneous demand where that helps. Kenya Power interconnection studies still apply.",
    },
    {
      question: "Does BESS qualify for net metering?",
      answer:
        "Not by default. Kenya's net-metering framework targets consumer self-generation up to 1 MW. Utility-scale plants follow a different regulatory path.",
    },
    {
      question: "Can the plant export power to the grid?",
      answer:
        "Only with the right connection agreement, licensing and market structure. Export is not assumed in early-stage discussions.",
    },
    {
      question: "Does it provide backup in a blackout?",
      answer:
        "Only if designed for it — topology, transfer gear, protection and state of charge all matter.",
    },
  ] as const,
  cta: {
    title: "Share your site or connection point to start a MegaPack conversation",
    description: "Tell us what you power, your MWh target, and where the system connects.",
    primaryHref: megapackPaths.contact,
    primaryLabel: "Start a MegaPack project",
    secondaryHref: modularEnergyPaths.overview,
    secondaryLabel: "Modular energy overview",
  },
} as const;

export const megapackFaqs = megapackPageContent.faqs;

/** @deprecated — SEO registry */
export const megapackPage = {
  positioning: { headline: megapackPageContent.hero.title },
  cloud: { eyebrow: "", title: "", disclaimer: "", label: "", metrics: [], alerts: "" },
  cta: {
    title: megapackPageContent.cta.title,
    description: megapackPageContent.cta.description,
    primary: {
      href: megapackPageContent.cta.primaryHref,
      label: megapackPageContent.cta.primaryLabel,
    },
    secondary: { href: megapackPaths.contact, label: "Contact" },
    tertiary: { href: megapackPaths.brief, label: "Project brief" },
  },
  disclaimer: megapackDisclaimer,
} as const;

/** @deprecated */
export const megapackShared = {
  statusNote: megapackStatusNote,
  disclaimer: megapackDisclaimer,
} as const;
