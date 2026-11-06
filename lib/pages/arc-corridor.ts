/**
 * ARC Corridor product page (/charging/corridor).
 *
 * Ratings and claims come from the approved engineering register (lib/generated/product-specs.ts,
 * read through lib/programmes.ts). Nothing here adds a rating, price, time or count. Station tiers
 * are proposed configurations drawn in the R03 renders; the bay and dispenser counts below describe
 * what each render shows, not an approved site design.
 */
import { evidenceNote, programme, programmeSpecsGenerated } from "@/lib/programmes";

export const arcPath = "/charging/corridor" as const;
export const arcEnquiryHref = "/contact?interest=corridor" as const;

const corridor = programme("corridor");
const claim = (id: string) => {
  const c = corridor.claims.find((x) => x.spec_id === id);
  if (!c) throw new Error(`Corridor claim ${id} missing from the register export`);
  return c;
};

export const arcClaims = {
  connectors: claim("COR-04"),
  power: claim("COR-15"),
  storage: claim("COR-03"),
  grid: claim("COR-08"),
  price: claim("COR-16"),
};

export const arcImages = {
  dispenser: {
    src: "/images/renders/arc-dispenser-dusk-r02.jpg",
    alt: "ARC dispenser at dusk: a silver column with a dark front panel, session screen, emergency stop and two charging cables, each docked in its own holder on either side",
    width: 1920,
    height: 1200,
  },
  crownDetail: {
    src: "/images/arc/arc-dispenser-crown-detail-r02.jpg",
    alt: "Close-up of the ARC dispenser crown: a floating cap above the silver body, with the light band and ARC mark on the dark front panel",
  },
  day: {
    src: "/images/arc/arc-dispenser-day-r02.jpg",
    alt: "ARC dispenser in daylight on its island, showing both cables looping down from the side holders",
  },
  eyeLevel: {
    src: "/images/arc/arc-240-eye-level-dusk-r03.jpg",
    alt: "Eye-level view under the canopy of a proposed ARC 240 station, with a dispenser on its island between bays",
  },
} as const;

export const arcHero = {
  eyebrow: "EV Charging · Highway and town",
  title: "ARC Corridor DC fast charging",
  lead:
    "DC fast charging for highways and towns. Each site starts with a certified OEM charger of 120 to 180 kW under the Precifarm brand, with the grid connection, layout and M-Pesa session pay engineered around the site. The first site is being prepared on the Nairobi to Kisumu route.",
  facts: [
    { label: "Connectors", value: "CCS2" },
    { label: "First-site charger", value: "Certified OEM, 120 to 180 kW" },
    { label: "Site storage", value: "None at the first site" },
    { label: "Price per kWh", value: "Set at commissioning" },
  ],
} as const;

export const arcNav = [
  { href: "#status", label: "What is real today" },
  { href: "#dispenser", label: "Dispenser" },
  { href: "#configurations", label: "Station configurations" },
  { href: "#electrical", label: "Electrical architecture" },
  { href: "#host", label: "Host a site" },
  { href: "#specification", label: "Specification" },
] as const;

/** The three things a reader could confuse. Order: what exists, what is designed, what is not built. */
export const arcStatusLedger = [
  {
    stage: "pilot" as const,
    title: "Certified OEM charger",
    body: "The first site uses a certified OEM charger of 120 to 180 kW under the Precifarm brand. The maker certifies the power conversion; Precifarm does not build its own DC power electronics for public sites.",
    source: `Engineering register ${arcClaims.power.spec_id}`,
  },
  {
    stage: "proposed" as const,
    title: "ARC dispenser and station tiers",
    body: "ARC is Precifarm's dispenser and station design around that certified power core. ARC 120, ARC 240/360 and ARC 600+ are proposed station configurations shown as design renders.",
    source: "Design renders R02 (dispenser) and R03 (stations)",
  },
  {
    stage: "planned" as const,
    title: "Installed sites",
    body: "Nothing is installed or operating yet. The first site, on the Nairobi to Kisumu route, is being prepared. The price per kWh is set for each site at commissioning, so none is published.",
    source: `Engineering register ${arcClaims.price.spec_id}`,
  },
] as const;

/** Hotspots on the R02 dusk product shot (1920 x 1200). x and y are percentages of the image. */
export const arcDispenserHotspots = [
  {
    id: "crown",
    x: 51,
    y: 7,
    title: "Floating crown",
    text: "A cap that floats above the body on a light band, so the dispenser reads clearly across a forecourt at night.",
  },
  {
    id: "screen",
    x: 48.5,
    y: 35,
    title: "Screen and emergency stop",
    text: "Pick a connector, see the price per kWh before you start and pay with M-Pesa. The red emergency stop sits just above the screen, in reach from either bay.",
  },
  {
    id: "holder-left",
    x: 39.5,
    y: 50,
    title: "Left holder",
    text: "Each cable docks in its own ergonomic holder at hand height, one on each side, so cables are not left on the ground.",
  },
  {
    id: "holder-right",
    x: 59,
    y: 50,
    title: "Right holder",
    text: "The second holder mirrors the first, giving each bay its own connector and a clear place to return it.",
  },
  {
    id: "cables",
    x: 36,
    y: 76,
    title: "Two cables",
    text: "Two CCS2 cables, one each side of the dispenser, so one island can serve a bay on either side.",
  },
  {
    id: "base",
    x: 58,
    y: 78,
    title: "Service base",
    text: "Ventilation grille and service access low on the body, on a raised island that protects it from vehicles.",
  },
] as const;

export type ArcTierId = "arc-120" | "arc-240-360" | "arc-600";

export type ArcLayout = {
  /** dispensers drawn in the render */
  dispensers: number;
  /** marked bays drawn in the render (two per dispenser island) */
  bays: number;
};

export type ArcVariant = {
  id: string;
  label: string;
  image: { src: string; alt: string };
  layout: ArcLayout;
  /** connector count printed on the pylon sign in the render */
  signConnectors: string;
};

export type ArcTier = {
  id: ArcTierId;
  name: string;
  summary: string;
  host: string;
  variants: readonly ArcVariant[];
};

export const arcTiers: readonly ArcTier[] = [
  {
    id: "arc-120",
    name: "ARC 120",
    summary: "One dispenser island under a canopy, serving a bay on each side. The smallest ARC station.",
    host: "Town hubs and fuel retail forecourts where a few fast-charging sessions a day justify one island.",
    variants: [
      {
        id: "120",
        label: "ARC 120",
        image: {
          src: "/images/arc/arc-120-station-dusk-r03.jpg",
          alt: "Proposed ARC 120 station at dusk: one ARC dispenser on an island under a curved canopy, a car in the left bay, equipment cabinets behind and an ARC pylon sign at the entrance",
        },
        layout: { dispensers: 1, bays: 2 },
        signConnectors: "2 CCS2",
      },
    ],
  },
  {
    id: "arc-240-360",
    name: "ARC 240/360",
    summary: "Two or three dispenser islands in a row under one canopy, with the equipment yard behind.",
    host: "Highway service areas on intercity routes and malls, where several cars may arrive together.",
    variants: [
      {
        id: "240",
        label: "ARC 240",
        image: {
          src: "/images/arc/arc-240-station-dusk-r03.jpg",
          alt: "Proposed ARC 240 station at dusk: two ARC dispensers on islands under a long canopy with three cars in bays",
        },
        layout: { dispensers: 2, bays: 4 },
        signConnectors: "4 CCS2",
      },
      {
        id: "360",
        label: "ARC 360",
        image: {
          src: "/images/arc/arc-360-station-dusk-r03.jpg",
          alt: "Proposed ARC 360 station at dusk: three ARC dispensers on islands under a long canopy, with cars in several bays",
        },
        layout: { dispensers: 3, bays: 6 },
        signConnectors: "6 CCS2",
      },
    ],
  },
  {
    id: "arc-600",
    name: "ARC 600+",
    summary: "Four or more dispenser islands under an extended canopy: the configuration for the busiest corridor stops.",
    host: "Major highway stops and fleet sites that need fast turnaround between shifts.",
    variants: [
      {
        id: "600",
        label: "ARC 600+",
        image: {
          src: "/images/arc/arc-600-plus-station-dusk-r03.jpg",
          alt: "Proposed ARC 600+ station at dusk: four ARC dispensers on islands under an extended canopy with cars in most bays",
        },
        layout: { dispensers: 4, bays: 8 },
        signConnectors: "8 CCS2",
      },
    ],
  },
] as const;

export const arcTierNote =
  "Tier names are working names for proposed layouts. Dispenser and bay counts describe the R03 renders. Site power for each tier is not a published rating: it is set per site by the Kenya Power study and the certified OEM power equipment chosen.";

/** Electrical chain, grid to vehicle. owner says who is responsible; stage marks maturity. */
export const arcElectricalChain = [
  {
    id: "grid",
    title: "Grid connection",
    detail: "Kenya Power supply, sized per site after a power study.",
    owner: "Kenya Power, with Precifarm engineering the application",
  },
  {
    id: "switchgear",
    title: "Transformer and switchgear",
    detail: "Step-down, protection and isolation for the site, with the utility meter at the point of supply.",
    owner: "Engineered by Precifarm per site",
  },
  {
    id: "cabinet",
    title: "Certified OEM power cabinet",
    detail: "The DC power conversion: a certified OEM charger of 120 to 180 kW at the first site.",
    owner: "OEM certified, under the Precifarm brand",
  },
  {
    id: "dispensers",
    title: "ARC dispensers",
    detail: "Two CCS2 cables per dispenser, session screen and emergency stop.",
    owner: "Precifarm design, proposed",
  },
  {
    id: "vehicles",
    title: "Vehicles",
    detail: "Each car draws only what its battery accepts at that moment.",
    owner: "The driver's car",
  },
] as const;

export const arcControlLayer = {
  title: "Charge-point management and M-Pesa",
  points: [
    "Starts and stops sessions at each connector",
    "Shows the price per kWh before you start",
    "Takes payment with M-Pesa and sends the receipt to your phone",
    "Reports faults and uptime to the Precifarm operations team",
  ],
} as const;

export const arcStorageNote = `Battery storage: ${arcClaims.storage.text.charAt(0).toLowerCase()}${arcClaims.storage.text.slice(1)}. It is added only where the Kenya Power study shows the grid cannot meet demand.`;

export const arcHostSteps = [
  {
    title: "Tell us about the site",
    text: "Location, the route it serves, who controls the land and what supply it has today.",
    meta: "You",
  },
  {
    title: "Survey and power study",
    text: "A free site survey, then a power study with Kenya Power before any commitment.",
    meta: "Precifarm with Kenya Power",
  },
  {
    title: "Layout and configuration",
    text: "Bay layout, canopy, equipment yard and the station configuration that fits the demand and the supply.",
    meta: "Precifarm engineering",
  },
  {
    title: "Agreement and approvals",
    text: "Commercial terms, site rights and the regulatory and safety approvals required before public operation.",
    meta: "Both parties",
  },
  {
    title: "Build and commission",
    text: "Installation, testing and commissioning. The price per kWh is set for the site at this point.",
    meta: "Precifarm",
  },
] as const;

/** What a site host should have ready. Checklist only: no figures are asked of them here. */
export const arcHostChecklist = [
  { id: "location", label: "Site location", hint: "An address or a map pin, and the route or town it serves" },
  { id: "rights", label: "Land control", hint: "Ownership, lease or a letter from the owner allowing the discussion" },
  { id: "supply", label: "Today's supply", hint: "Meter or account number, transformer if one is on site, recent electricity bills" },
  { id: "space", label: "Space and access", hint: "Photos or a sketch of the forecourt, the entry and exit, and where equipment could sit" },
  { id: "traffic", label: "Who stops there", hint: "What you know about the vehicles and visitors your site already sees" },
  { id: "contact", label: "A decision maker", hint: "The person who can agree to a survey and sign site terms" },
] as const;

export const arcSpecGroups = [
  {
    title: "Charging",
    rows: [arcClaims.connectors, arcClaims.power].map((c) => ({ label: c.label, value: c.text, note: evidenceNote(c) })),
  },
  {
    title: "Site",
    rows: [arcClaims.grid, arcClaims.storage].map((c) => ({ label: c.label, value: c.text, note: evidenceNote(c) })),
  },
  {
    title: "Payment",
    rows: [{ label: arcClaims.price.label, value: arcClaims.price.text, note: "Paid with M-Pesa. No public price until a site is commissioned and costed." }],
  },
] as const;

export const arcSpecSource = `From the approved engineering register (${corridor.code}, generated ${programmeSpecsGenerated}). Charging speed depends on the car: each vehicle draws only what its battery accepts.`;

export const arcFaqs = [
  {
    question: "When does the first Corridor site open?",
    answer:
      "The first site, on the Nairobi to Kisumu route, is being prepared. The price per kWh is set for each site when it opens, shown before you start and paid with M-Pesa.",
  },
  {
    question: "Can I host a Corridor site?",
    answer:
      "Yes. Fuel stations, malls and roadside stops on busy routes can register interest. Each site needs a power study with Kenya Power before anything is built.",
  },
  {
    question: "Is the ARC dispenser certified?",
    answer:
      "The power conversion at the first site is a certified OEM charger of 120 to 180 kW. The ARC dispenser and station tiers are Precifarm's proposed design around it and are shown here as renders, not as installed equipment.",
  },
  {
    question: "How fast will my car charge?",
    answer:
      "It depends on the car. Each vehicle draws only what its battery accepts, so a car with a lower DC limit charges more slowly at the same dispenser.",
  },
] as const;
