/** Modular energy — overview tables and product pages */

export const modularEnergyNav = {
  title: "Modular energy",
  overview: { href: "/charging/modular-energy", label: "Platform overview" },
  products: [
    { href: "/charging/modular-energy/p1-go", label: "P1 Go", slug: "p1-go" },
    { href: "/charging/modular-energy/p2-home", label: "P2 Home", slug: "p2-home" },
    { href: "/charging/modular-energy/pod", label: "Pod enclosure", slug: "pod" },
  ],
} as const;

export const modularEnergyPage = {
  hero: {
    eyebrow: "Energy platform · Kenya",
    title: "One module. From a handle to a shop.",
    description:
      "A 2.56 kWh Energy Module you can carry, roll into a home tower, or stack in a shop. Same design language as Pulse and Corridor. Conceptual — not on sale yet.",
    primaryCta: { href: "/contact", label: "Talk to us about energy" },
    secondaryCta: { href: "/charging/private-house", label: "Home charging today" },
    note: "Design targets and renders show intent, not a certified product.",
    image: {
      src: "/images/modular-energy/render-family-hero.png",
      alt: "Precifarm modular energy family — P1 Go, Energy Module, P2 Home and Pod",
    },
  },
  familyTable: {
    eyebrow: "Family",
    title: "Four pieces, one platform.",
    caption: "Links open the product pages. Energy Module is the shared block inside each SKU.",
    columns: ["Product", "Role", "Scale", "Best for"] as const,
    rows: [
      {
        href: "/charging/modular-energy/p1-go",
        name: "P1 Go",
        role: "Portable backup",
        scale: "~1 kWh carry",
        bestFor: "Essentials off-grid — foldable solar in the box",
      },
      {
        href: "/charging/modular-energy",
        name: "Energy Module",
        role: "Capacity block",
        scale: "2.56 kWh",
        bestFor: "The brick repeated from P1 through Pod",
      },
      {
        href: "/charging/modular-energy/p2-home",
        name: "P2 Home",
        role: "Home tower",
        scale: "1–4 modules",
        bestFor: "Nairobi utility room, essential-load sub-board",
      },
      {
        href: "/charging/modular-energy/pod",
        name: "Pod enclosure",
        role: "Shop / outdoor",
        scale: "2–6 modules",
        bestFor: "SME fridge, till and rooftop PV",
      },
    ],
  },
  kenyaTable: {
    eyebrow: "Kenya first",
    title: "Where it sits on site.",
    columns: ["Setting", "Hardware", "What stays up"] as const,
    rows: [
      ["Urban home", "P2 beside the consumer board", "Lights, router, TV, fan, security"],
      ["SME retail", "Wall-shaded Pod on a plinth", "Fridge, till, lights"],
      ["Solar + EV", "Pod or P2 + Pulse charger", "Household loop and solar surplus into the car"],
    ],
  },
  targetsTable: {
    eyebrow: "Design targets",
    title: "Numbers for prototype review — not a data sheet.",
    columns: ["Parameter", "Target"] as const,
    rows: [
      ["Energy Module nameplate", "2.56 kWh"],
      ["Usable AC per module", "2.17 kWh"],
      ["Daily cycling AC", "1.68 kWh"],
      ["Kenya grid", "230 V / 50 Hz"],
      ["Design peak sun hours", "4.7 PSH"],
      ["Essential home day (example)", "~1.4 kWh"],
    ],
  },
  chargingTable: {
    eyebrow: "With charging",
    title: "How energy sits next to chargers we install today.",
    columns: ["Charger", "Relationship"] as const,
    rows: [
      ["Pulse · 7 kW wallbox", "Daily EV charging on your meter. Add P2 or Pod for backup and solar self-use."],
      ["Spark · 3.3 kW portable", "Boot charger. P1 Go is backup with foldable solar in the box — not a Spark replacement."],
      ["Corridor / Depot", "Public and fleet DC/AC. Modular energy is the home and shop layer, not the highway post."],
    ],
  },
  cta: {
    title: "Want this at a home or shop?",
    description:
      "Tell us how you use power. We will say what we can install now — Pulse, storage, solar — and what is still on this platform roadmap.",
    primaryHref: "/contact",
    primaryLabel: "Contact Precifarm",
    secondaryHref: "/charging/private-house",
    secondaryLabel: "Request a house survey",
  },
} as const;

export type ModularEnergyProductSlug = "p1-go" | "p2-home" | "pod";

export const modularEnergyProducts: Record<
  ModularEnergyProductSlug,
  {
    name: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    specColumns: readonly ["Item", "Target"];
    specs: readonly (readonly [string, string])[];
    useColumns: readonly ["Use", "Notes"];
    uses: readonly (readonly [string, string])[];
  }
> = {
  "p1-go": {
    name: "P1 Go",
    tag: "Portable backup",
    title: "Essential power you can carry — solar in the box.",
    description:
      "Aluminum unibody, fold-flat handle, glass display, a Type 2 trickle lead and a foldable solar panel in the box. Top up from grid, car 12 V or unfold the panel outdoors — designed for a blackout bag or a trip, not as your daily EV charger.",
    image: "/images/modular-energy/render-p1-go-v4.png",
    imageAlt: "P1 Go portable energy unit on a tilt stand with foldable solar panel and glass display",
    specColumns: ["Item", "Target"],
    specs: [
      ["Role", "Portable backup"],
      ["Energy class", "~1 kWh carry"],
      ["Module inside", "Energy Module architecture (scaled pack)"],
      ["AC out", "UK 3-pin sockets"],
      ["USB", "USB-C and USB-A"],
      ["Solar", "Foldable panel included · 100–200 W · XT60 input"],
      ["Charge sources", "Grid · car 12 V · included solar panel"],
      ["EV", "Type 2 trickle only — not daily charging"],
      ["Status", "Conceptual · not certified for sale"],
    ],
    useColumns: ["Use", "Notes"],
    uses: [
      ["Home outage bag", "Lights, router, phone, laptop"],
      ["Off-grid top-up", "Unfold the included panel — no roof required"],
      ["Travel / site", "Carry handle, tilt stand, panel folds flat in the bag"],
      ["EV emergency", "Trickle lead only — use Spark or Pulse for a driving day"],
    ],
  },
  "p2-home": {
    name: "P2 Home",
    tag: "Home backup",
    title: "A tower beside the consumer board.",
    description:
      "Power Core above, module bays below, retractable handle and rear castors. Add modules when the house needs more hours — without swapping the inverter.",
    image: "/images/modular-energy/render-p2-home.png",
    imageAlt: "P2 Home backup tower with Power Core and four module bays",
    specColumns: ["Item", "Target"],
    specs: [
      ["Role", "Home backup tower"],
      ["Modules", "1–4 Energy Modules"],
      ["Nameplate (4 modules)", "Up to ~10.2 kWh"],
      ["Install", "Essential-load sub-board"],
      ["Move", "Handle and rear castors"],
      ["Grid", "230 V / 50 Hz Kenya"],
      ["Status", "Conceptual · not certified for sale"],
    ],
    useColumns: ["Use", "Notes"],
    uses: [
      ["Urban home", "Lights, router, TV, fan, security (~1.4 kWh/day example)"],
      ["Grow later", "Start with one module, add bays as load grows"],
      ["With Pulse", "Wallbox charges the EV; P2 covers the house when Kenya Power dips"],
    ],
  },
  pod: {
    name: "Pod enclosure",
    tag: "Shop / outdoor",
    title: "Outdoor backup for a till and a fridge.",
    description:
      "Power Unit, module rack, service door and sun-shield canopy. Plinth-mounted for SME sites that cannot put a tower in a utility room.",
    image: "/images/modular-energy/render-pod.png",
    imageAlt: "Precifarm Pod outdoor enclosure with service door and sun-shield canopy",
    specColumns: ["Item", "Target"],
    specs: [
      ["Role", "SME / outdoor enclosure"],
      ["Modules", "2–6 in the first enclosure"],
      ["Mount", "Plinth, cable entries, wall shade"],
      ["Canopy", "Sun-shield service door"],
      ["PV", "Rooftop-ready"],
      ["Grid", "230 V / 50 Hz Kenya"],
      ["Status", "Conceptual · not certified for sale"],
    ],
    useColumns: ["Use", "Notes"],
    uses: [
      ["Retail / kiosk", "Fridge, till, lights through a dip"],
      ["With solar", "Daytime PV, evening discharge"],
      ["With Pulse", "Shop EV or owner car on solar surplus (Phase A, ~3.7 kW AC)"],
    ],
  },
};
