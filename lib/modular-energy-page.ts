/** Modular energy — overview tables and product pages */

export const modularEnergyPaths = {
  overview: "/charging/modular-energy",
  p1Go: "/charging/modular-energy/p1-go",
  p2Home: "/charging/modular-energy/p2-home",
  podStack: "/charging/modular-energy/pod-stack",
  megapack: "/charging/modular-energy/megapack",
} as const;

export type ModularEnergyProductSlug = "p1-go" | "p2-home" | "pod-stack";

/** Handled by app/charging/modular-energy/[slug]/page.tsx */
export const modularEnergyProductSlugs = ["p1-go", "p2-home", "pod-stack"] as const satisfies readonly ModularEnergyProductSlug[];

export const modularEnergyStatusNote =
  "Conceptual platform — design targets and renders show intent, not a certified product for sale.";

export const modularEnergyNav = {
  title: "Modular energy",
  overview: { href: modularEnergyPaths.overview, label: "Platform overview" },
  products: [
    { href: modularEnergyPaths.p1Go, label: "P1 Go", slug: "p1-go" as const },
    { href: modularEnergyPaths.p2Home, label: "P2 Home", slug: "p2-home" as const },
    { href: modularEnergyPaths.podStack, label: "Pod Stack", slug: "pod-stack" as const },
  ],
  megapack: {
    href: modularEnergyPaths.megapack,
    label: "MegaPack",
    description: "Project-engineered BESS",
  },
} as const;

/**
 * Platform voice. Keep these lines consistent wherever modular energy appears —
 * overview, product pages, nav descriptions and cross-links from charging.
 */
export const modularEnergyBrand = {
  /** Primary positioning line — what the platform is, in one sentence. */
  positioning:
    "One 2.56 kWh Energy Module, repeated at three scales — carried, stacked or mounted outdoors.",
  /** Short form for nav, cards and cross-links. */
  shortLine: "One module. Three scales. Built for Kenyan homes and shops.",
  /** How this relates to what Precifarm sells today. */
  relationToCharging:
    "Modular energy is the home and shop storage layer. Pulse and Spark charge the car; Corridor and Depot serve the network; MegaPack is engineered per project.",
  /** Honest status language — reuse verbatim rather than inventing new phrasing. */
  status: {
    today: "Available to install today",
    roadmap: "On the platform roadmap",
    note: modularEnergyStatusNote,
  },
} as const;

/** Why the platform is modular — the argument behind the product family. */
export const modularEnergyPrinciples = [
  {
    id: "one-block",
    label: "One block",
    title: "The same 2.56 kWh module in every product",
    text: "P1 Go, P2 Home and Pod Stack are built around one capacity block — one spare part, one test rig, one service procedure.",
  },
  {
    id: "size-to-load",
    label: "Sized to load",
    title: "Buy the hours you need, add bays later",
    text: "Start at one module and grow to four in P2, or two to six in Pod Stack, without replacing the Power Core or inverter.",
  },
  {
    id: "serviceable",
    label: "Serviceable",
    title: "Swap the faulty bay, not the whole system",
    text: "Modules slide out on rails. A fault becomes a module swap on site instead of a full teardown and replacement.",
  },
  {
    id: "kenya-basis",
    label: "Kenya basis",
    title: "230 V / 50 Hz, 4.7 peak sun hours, weak-grid evenings",
    text: "Design inputs are Kenyan grid behaviour, heat, dust and the loads households and shops actually run during a dip.",
  },
] as const;

/** What we can install now versus what is still design intent. */
export const modularEnergyAvailability = {
  eyebrow: "Availability",
  title: "What installs today, and what is still design intent",
  description:
    "Modular energy is not on sale. If you need backup or solar this quarter, these are the products we commission today.",
  today: {
    title: modularEnergyBrand.status.today,
    items: [
      {
        name: "Pulse · 7 kW home wallbox",
        text: "Daily EV charging on your meter, with Lipa Pole Pole on M-Pesa.",
        href: "/charging/home",
      },
      {
        name: "Pod energy storage",
        text: "Home charger with 5 or 10 kWh built-in storage — a separate product from Pod Stack.",
        href: "/charging/home",
      },
      {
        name: "Rooftop solar and storage",
        text: "Sized from your driving day and household load in a site survey.",
        href: "/charging/engineering",
      },
    ],
  },
  roadmap: {
    title: modularEnergyBrand.status.roadmap,
    items: [
      { name: "P1 Go", text: "Portable ~1 kWh with foldable solar in the box." },
      { name: "P2 Home", text: "1–4 module tower for essential loads on a sub-board." },
      { name: "Pod Stack", text: "2–6 module outdoor enclosure for retail sites." },
      { name: "MegaPack", text: "Project-engineered BESS, quoted per site." },
    ],
  },
} as const;

export const modularEnergyPage = {
  hero: {
    eyebrow: "Energy platform · Kenya",
    title: "One 2.56 kWh module — carried, stacked or mounted outdoors.",
    description:
      "P1 Go, P2 Home and Pod Stack are three scales of the same Energy Module: a pack you carry through a dip, a tower beside the consumer board, or an outdoor enclosure at a street-front shop. One capacity block means one spare part and one service procedure across the family.",
    primaryCta: { href: "/contact", label: "Talk to us about energy" },
    secondaryCta: { href: "/charging/home", label: "See what installs today" },
    note: modularEnergyStatusNote,
    /** Three-scale hero — carried, stacked, mounted outdoors */
    familyImages: [
      {
        src: "/images/modular-energy/render-p1-go-v5.png",
        alt: "P1 Go portable power station with foldable solar panel",
        label: "P1 Go · carried",
      },
      {
        src: "/images/modular-energy/render-p2-home-v2.png",
        alt: "P2 Home backup tower with stacked Energy Modules",
        label: "P2 Home · stacked",
      },
      {
        src: "/images/modular-energy/render-pod.png",
        alt: "Pod Stack outdoor enclosure with service door open and Energy Modules on rails",
        label: "Pod Stack · outdoors",
      },
    ] as const,
    image: {
      src: "/images/modular-energy/render-family-hero-v3.jpg",
      alt: "Precifarm modular energy family — P1 Go, P2 Home, Pod Stack and MegaPack share one Energy Module",
    },
  },
  stats: [
    { label: "Energy Module", value: "2.56 kWh", note: "The block repeated across the family" },
    { label: "P2 Home tower", value: "1–4 modules", note: "About 2.6 to 10.2 kWh nameplate" },
    { label: "Pod Stack enclosure", value: "2–6 modules", note: "Outdoor plinth for retail sites" },
  ] as const,
  principlesSection: {
    eyebrow: "Why modular",
    title: "Four decisions that shape every product in the family",
    description:
      "Modularity is not a styling choice. It determines what a customer pays for, how the system grows and what happens on the day something fails.",
  },
  productCards: {
    eyebrow: "Product family",
    title: "Portable P1 Go, home P2 tower, outdoor Pod Stack — MegaPack for projects",
    caption: "P1 Go, P2 Home and Pod Stack share the 2.56 kWh block. MegaPack is a separate line, engineered per site for factories, EV hubs and grid-connected plants.",
    items: [
      {
        href: modularEnergyPaths.p1Go,
        name: "P1 Go",
        role: "Portable backup",
        scale: "~1 kWh carry",
        summary: "Keeps the router, laptop and phones alive through a dip. Foldable solar ships in the box.",
        image: "/images/modular-energy/render-p1-go-v5.png",
        imageAlt: "P1 Go portable power station with foldable solar panel and Type 2 trickle cable",
      },
      {
        href: modularEnergyPaths.p2Home,
        name: "P2 Home",
        role: "Home tower",
        scale: "1–4 modules",
        summary: "Stands beside the consumer board and carries essential loads on a sub-board. Add bays as you need hours.",
        image: "/images/modular-energy/render-p2-home-v2.png",
        imageAlt: "P2 Home backup tower beside a consumer board",
      },
      {
        href: modularEnergyPaths.podStack,
        name: "Pod Stack",
        role: "Shop backup",
        scale: "2–6 modules",
        summary: "Mounts outdoors on a plinth where there is no utility room. Holds up the fridge, till and lights.",
        image: "/images/modular-energy/render-pod.png",
        imageAlt: "Precifarm Pod Stack outdoor backup unit with service door and sun-shield canopy",
      },
      {
        href: modularEnergyPaths.megapack,
        name: "MegaPack",
        role: "Project BESS",
        scale: "MWh to GWh",
        summary: "A separate line for factories, EV hubs and grid plants. Scoped, engineered and quoted per site.",
        image: "/images/megapack-hero-v3.png",
        imageAlt: "Precifarm MegaPack utility-scale battery storage",
      },
    ],
  },
  familyTable: {
    eyebrow: "Choose by site",
    title: "Which product suits your building, and how much energy it holds",
    caption: "Every row below is design intent. Nothing in the modular energy family is certified or on sale yet.",
    columns: ["Product", "Where it goes", "Scale", "Sized for"] as const,
    rows: [
      {
        href: modularEnergyPaths.p1Go,
        name: "P1 Go",
        role: "Carried in a bag",
        scale: "~1 kWh carry",
        bestFor: "Router, laptop and phones through a short outage",
      },
      {
        href: modularEnergyPaths.overview,
        name: "Energy Module",
        role: "Inside every product",
        scale: "2.56 kWh",
        bestFor: "The capacity block you add or swap",
      },
      {
        href: modularEnergyPaths.p2Home,
        name: "P2 Home",
        role: "Utility room floor",
        scale: "1–4 modules",
        bestFor: "Lights, router, TV, fan and security on a sub-board",
      },
      {
        href: modularEnergyPaths.podStack,
        name: "Pod Stack",
        role: "Outdoor plinth",
        scale: "2–6 modules",
        bestFor: "Fridge, till and lights with rooftop PV",
      },
      {
        href: modularEnergyPaths.megapack,
        name: "MegaPack",
        role: "Engineered site",
        scale: "Industrial to utility",
        bestFor: "Factories, EV hubs and grid-connected plants",
      },
    ],
  },
  stackSection: {
    eyebrow: "Stack to scale",
    title: "Each bay adds 2.56 kWh — four modules on one Power Core",
    description:
      "Buy the outage hours you need now. Every P2 bay holds one 2.56 kWh module, so a one-module tower can grow to four without changing the Power Core, the inverter or the sub-board wiring.",
    image: {
      src: "/images/modular-energy/render-p2-stack-scale-v2.png",
      alt: "Precifarm P2 Home towers at two, three and four modules — floor-standing, no wheels",
    },
    tiers: [
      { modules: 2, label: "~5.1 kWh" },
      { modules: 3, label: "~7.7 kWh" },
      { modules: 4, label: "~10.2 kWh" },
    ],
    cta: { href: modularEnergyPaths.p2Home, label: "P2 Home" },
  },
  moduleSection: {
    eyebrow: "Service model",
    title: "A fault becomes a module swap, not a replacement system",
    description:
      "Because P1 Go, P2 Home and Pod Stack share one 2.56 kWh module, a failed bay is a part our technician carries. The site keeps the enclosure, the wiring and the remaining capacity — only the module changes.",
    image: {
      src: "/images/modular-energy/render-energy-module-rack-v1.png",
      alt: "Precifarm Energy Module rack in a test lab with modules extended on sliding rails and monitoring dashboards",
    },
    steps: [
      { title: "The system names the bay", text: "Monitoring identifies which module is out of tolerance before the customer notices a shortfall." },
      { title: "Pull it out on the rails", text: "The technician slides the module clear and tests it without disturbing the rest of the stack." },
      { title: "Fit a replacement and close", text: "A known-good module goes back in the same bay; the failed one returns for repair or recovery." },
    ],
  },
  kenyaSection: {
    eyebrow: "Kenya first",
    title: "Four Kenyan settings the platform is drawn around",
    description:
      "Where the hardware goes changes everything about it — indoor or outdoor, wall or plinth, essential loads or a whole charging hub.",
    cards: [
      {
        setting: "Urban home",
        hardware: "P2 Home beside the consumer board",
        loads: "Lights, router, TV, fan and security on a sub-board",
        image: "/images/modular-energy/render-kenya-home-v2.png",
        imageAlt: "P2 Home installed beside a Kenyan urban residence distribution board",
        href: modularEnergyPaths.p2Home,
      },
      {
        setting: "SME retail",
        hardware: "Pod Stack on a plinth, shaded by the wall",
        loads: "Refrigeration, point of sale and lighting through a dip",
        image: "/images/modular-energy/render-kenya-sme.png",
        imageAlt: "Precifarm Pod at a Kenyan SME retail site with rooftop solar",
        href: modularEnergyPaths.podStack,
      },
      {
        setting: "Solar and EV",
        hardware: "Storage plus a Pulse wallbox",
        loads: "House on backup, daytime solar surplus into the car",
        image: "/images/modular-energy/render-solar-ev.png",
        imageAlt: "Carport EV charging from rooftop solar surplus at a Kenyan home",
        href: "/charging/home",
      },
      {
        setting: "Charging hub or industrial",
        hardware: "MegaPack, engineered per project",
        loads: "Peak support and solar shifting where the site specifies it",
        image: "/images/megapack-ev-hub-v2.png",
        imageAlt: "Precifarm EV charging hub with MegaPack storage and solar canopy",
        href: modularEnergyPaths.megapack,
      },
    ],
  },
  targetsTable: {
    eyebrow: "Design targets",
    title: "The numbers we are engineering against",
    caption: "Prototype review targets, not a certified data sheet. Figures change as testing proceeds.",
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
    title: "Where storage ends and the charger begins",
    caption: "Modular energy backs up the building. Precifarm chargers move the vehicle.",
    columns: ["Charger", "How they work together"] as const,
    rows: [
      ["Pulse · 7 kW wallbox", "Charges the car overnight on your meter. P2 Home or Pod Stack covers the house when the grid dips and puts daytime solar surplus to use."],
      ["Spark · 3.3 kW portable", "The charger you keep in the boot. P1 Go is a backup pack with a Type 2 trickle lead for emergencies — it does not replace Spark."],
      ["Corridor / Depot", "Public DC and fleet AC on the network. Modular energy is the home and shop layer; hubs that need storage get MegaPack, engineered per site."],
    ],
  },
  faqs: [
    {
      question: "Can I buy P1 Go, P2 Home or Pod Stack today?",
      answer:
        "No. These pages describe design intent, and the renders show where the engineering is heading rather than a certified product. What we commission today is Pulse home charging, Pod energy storage, and rooftop solar sized in a site survey. Tell us your site and we will separate clearly what is available now from what is still on the roadmap.",
    },
    {
      question: "Is MegaPack just a lot of P2 modules stacked together?",
      answer:
        "No. MegaPack is a separate line, engineered and quoted per project for industrial, EV-hub and grid-connected sites. P1 Go, P2 Home and Pod Stack are the products that share the 2.56 kWh Energy Module, and they stay at home and shop scale.",
    },
    {
      question: "What will a home tower actually keep running?",
      answer:
        "Essential loads on a dedicated sub-board — lights, router, TV, fan and security. Air conditioning, cooking and water heating stay on the main consumer unit. Our design example is about 1.4 kWh for an essentials day, so a four-module tower targets roughly a day of essentials rather than full household demand.",
    },
    {
      question: "Is Pod Stack the same as Pod energy storage?",
      answer:
        "No, and the names are close enough to be worth separating. Pod energy storage is a home charger with 5 or 10 kWh built in, and we install it today. Pod Stack is the conceptual outdoor enclosure that holds two to six Energy Modules at a retail site.",
    },
    {
      question: "Does P1 Go replace my EV charger?",
      answer:
        "No. The Type 2 lead in the box trickles enough range to reach a charger in an emergency. Spark for a portable 3.3 kW top-up and Pulse for 7 kW at home remain the chargers for a driving day.",
    },
  ] as const,
  faqSection: {
    title: "Sale status, module sizing and how this relates to Pulse",
  },
  cta: {
    title: "Tell us your loads and outage hours. We will tell you what installs today.",
    description:
      "Send us the appliances you need through a dip and how long the power usually stays off. We will size it, quote what we can commission now — Pulse, storage, solar — and say plainly what is still on the platform roadmap.",
    primaryHref: "/contact",
    primaryLabel: "Contact Precifarm",
    secondaryHref: "/charging/home",
    secondaryLabel: "Request a house survey",
  },
} as const;

export type ModularEnergyProduct = {
  name: string;
  tag: string;
  title: string;
  description: string;
  /** One line on who this is for — shown above the hero headline. */
  audience: string;
  image: string;
  imageAlt: string;
  highlights: readonly { label: string; value: string }[];
  sections: {
    stack?: { eyebrow: string; title: string };
    spec: { eyebrow: string; title: string };
    features: { eyebrow: string; title: string };
    worksWith: { eyebrow: string; title: string; description: string };
  };
  faqSectionTitle: string;
  scene?: { src: string; alt: string; caption: string };
  stackTiers?: readonly { modules: number; label: string }[];
  specColumns: readonly ["Item", "Target"];
  specs: readonly (readonly [string, string])[];
  specCaption: string;
  features: readonly { title: string; text: string }[];
  /** Cross-links to products we commission today. */
  worksWith: readonly { name: string; text: string; href: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const modularEnergyProducts: Record<ModularEnergyProductSlug, ModularEnergyProduct> = {
  "p1-go": {
    name: "P1 Go",
    tag: "Portable backup",
    title: "The pack you carry when the power goes out",
    audience: "For renters, students and anyone without a fixed install",
    description:
      "An aluminium power station with a fold-flat handle and a magnetic port bay. The foldable solar panel and Type 2 trickle lead ship in the box, so it charges from the grid, a car 12 V socket or sunshine on a balcony. Sized to hold up a router, laptop and phones through an outage — not to charge your car.",
    image: "/images/modular-energy/render-p1-go-v5.png",
    imageAlt: "P1 Go portable power station on kickstand with foldable solar panel, UK sockets and Type 2 cable",
    highlights: [
      { label: "Energy class", value: "~1 kWh carry" },
      { label: "Solar", value: "Foldable panel in the box" },
      { label: "EV", value: "Type 2 trickle only" },
      { label: "AC out", value: "UK 3-pin sockets" },
    ],
    sections: {
      spec: {
        eyebrow: "Design targets",
        title: "Carry class, solar input, AC outputs and the trickle lead",
      },
      features: {
        eyebrow: "Where it fits",
        title: "Four situations P1 Go is drawn for",
      },
      worksWith: {
        eyebrow: "Available today",
        title: "What to buy now if you need charging, not backup",
        description:
          "P1 Go is not on sale. If your problem is charging an EV rather than riding out an outage, these are the products we commission today.",
      },
    },
    faqSectionTitle: "P1 Go — charging role, solar and when it will be available",
    scene: {
      src: "/images/modular-energy/render-p1-go-scene-v1.png",
      alt: "P1 Go powering a router, laptop and phones during a power dip in a Nairobi apartment",
      caption: "Typical use — keep the router, laptop and phones running when Kenya Power dips.",
    },
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
    ],
    specCaption: "Prototype targets for P1 Go. Nothing here is certified or final.",
    features: [
      {
        title: "Work through a short outage",
        text: "Router, laptop and phones stay on so a work-from-home day is not lost to a Kenya Power dip. Whole-house loads are out of scope.",
      },
      {
        title: "Solar without touching the roof",
        text: "The included panel unfolds on a balcony or yard and plugs into an XT60 input. Nothing is mounted, so renters can use it too.",
      },
      {
        title: "Travel, camping and site work",
        text: "The handle folds flat, the kickstand angles the panel, and both pack into one carry bag for a car boot.",
      },
      {
        title: "An emergency EV top-up, nothing more",
        text: "The Type 2 lead trickles enough range to reach a charger. Spark and Pulse stay the chargers for a driving day.",
      },
    ],
    worksWith: [
      {
        name: "Spark · 3.3 kW portable charger",
        text: "The boot charger for a typical day — about 180 minutes on a 13 A socket.",
        href: "/charging",
      },
      {
        name: "Pulse · 7 kW home wallbox",
        text: "Wall-mounted daily charging from KES 79,000, with Lipa Pole Pole on M-Pesa.",
        href: "/charging/home",
      },
      {
        name: "Charging Hub",
        text: "Public DC and Boda Hub swap sites across Kenya, with live bay status.",
        href: "/hub",
      },
    ],
    faqs: [
      {
        question: "Is P1 Go an EV charger?",
        answer:
          "Not in any practical sense. The Type 2 lead in the box trickles enough range to reach a proper charger if you are caught out. For a driving day, Spark gives you 3.3 kW from a wall socket and Pulse gives you 7 kW on the wall at home.",
      },
      {
        question: "Do I need a roof or a mounted array for the solar?",
        answer:
          "No. The panel folds out on a balcony, a yard or a car bonnet and plugs into an XT60 input. Nothing is drilled or mounted, which is the point for renters and anyone who moves often.",
      },
      {
        question: "How long will it hold up my equipment?",
        answer:
          "The carry class is about 1 kWh, which is a working session for a router, laptop and phones rather than an evening of household appliances. Precise runtimes wait on prototype testing.",
      },
      {
        question: "When can I buy one?",
        answer:
          "Not yet — P1 Go is conceptual. Get in touch if you want to be part of early access conversations, and we will tell you what we can supply in the meantime.",
      },
    ],
  },
  "p2-home": {
    name: "P2 Home",
    tag: "Home backup",
    title: "A tower that grows with the hours you need covered",
    audience: "For homeowners with a utility room and a weak evening grid",
    description:
      "The Power Core sits on top; 2.56 kWh module bays stack below it. The tower stands on the floor beside your consumer board and feeds a dedicated sub-board — lights, router, TV, fan and security. Air conditioning, cooking and water heating stay on the main board and on Kenya Power.",
    image: "/images/modular-energy/render-p2-stack-scale-v2.png",
    imageAlt: "Precifarm P2 Home towers at two, three and four modules — floor-standing beside the board",
    highlights: [
      { label: "Modules", value: "1–4 bays" },
      { label: "Max nameplate", value: "~10.2 kWh" },
      { label: "Install", value: "Essential-load sub-board" },
      { label: "Grid", value: "230 V / 50 Hz" },
    ],
    sections: {
      stack: {
        eyebrow: "Stack to scale",
        title: "One tower, four capacities, the same Power Core",
      },
      spec: {
        eyebrow: "Design targets",
        title: "Module count, nameplate energy and essential-load wiring",
      },
      features: {
        eyebrow: "Where it fits",
        title: "What a P2 install actually changes in the house",
      },
      worksWith: {
        eyebrow: "Available today",
        title: "The home energy work we can commission this quarter",
        description:
          "P2 Home is design intent. A survey today can still put charging, storage and solar on your roof and your board.",
      },
    },
    faqSectionTitle: "P2 Home — load coverage, stacking modules and installation",
    scene: {
      src: "/images/modular-energy/render-kenya-home-v2.png",
      alt: "P2 Home installed beside a Kenyan urban residence distribution board",
      caption: "Typical install — tower in the utility room, essential loads on a sub-board.",
    },
    stackTiers: [
      { modules: 1, label: "~2.6 kWh" },
      { modules: 2, label: "~5.1 kWh" },
      { modules: 3, label: "~7.7 kWh" },
      { modules: 4, label: "~10.2 kWh" },
    ],
    specColumns: ["Item", "Target"],
    specs: [
      ["Role", "Home backup tower"],
      ["Modules", "1–4 Energy Modules"],
      ["Nameplate (4 modules)", "Up to ~10.2 kWh"],
      ["Install", "Essential-load sub-board"],
      ["Mount", "Floor-standing beside board"],
      ["Grid", "230 V / 50 Hz Kenya"],
    ],
    specCaption: "Prototype targets for P2 Home. Nothing here is certified or final.",
    features: [
      {
        title: "An essential-load day of about 1.4 kWh",
        text: "Our design example covers lights, router, TV, fan and security through the outage hours a typical Nairobi household sees in an evening.",
      },
      {
        title: "Start with one bay, add the rest later",
        text: "A single module is about 2.6 kWh. Four take the tower to about 10.2 kWh, and the Power Core, inverter and wiring do not change.",
      },
      {
        title: "The car charges on Pulse; the house runs on P2",
        text: "Pulse stays on your meter for the driving day. The tower carries the sub-board when Kenya Power dips, and absorbs daytime solar surplus rather than exporting it.",
      },
      {
        title: "A footprint you can service",
        text: "Floor-standing beside the board, no wall bracket, and modules that slide out on rails so a technician works in place.",
      },
    ],
    worksWith: [
      {
        name: "Pulse · 7 kW home wallbox",
        text: "Full charge in about 90 minutes, from KES 79,000 with Lipa Pole Pole.",
        href: "/charging/home",
      },
      {
        name: "Pod energy storage",
        text: "A home charger with 5 or 10 kWh of storage built in — a different product from Pod Stack.",
        href: "/charging/home",
      },
      {
        name: "Rooftop solar and site engineering",
        text: "Licensed design, Kenya Power hold points and three-year aftersale care.",
        href: "/charging/engineering",
      },
    ],
    faqs: [
      {
        question: "Does P2 Home back up the whole house?",
        answer:
          "No. The design target is essential loads on a dedicated sub-board. Air conditioning, cooking and water heating stay on the main consumer unit, because covering them would need several times the capacity and a much larger inverter.",
      },
      {
        question: "Can I add modules later, or should I buy all four now?",
        answer:
          "Add them later — that is the reason the tower exists. Buy the outage hours you need today, and add bays as your load or your budget grows. The Power Core, the inverter and the sub-board wiring do not change.",
      },
      {
        question: "Does it work with my Pulse charger?",
        answer:
          "Yes, and they do different jobs. Pulse charges the car from your meter overnight. The tower carries the house when Kenya Power dips, and it can absorb daytime solar surplus that would otherwise be exported.",
      },
      {
        question: "Who installs it, and when?",
        answer:
          "Precifarm would specify the essential-load sub-board, wire the intervention and commission the unit, as we do for home charging today. P2 Home itself is not available for sale yet.",
      },
    ],
  },
  "pod-stack": {
    name: "Pod Stack",
    tag: "Shop backup",
    title: "Backup for shops with no room to spare inside",
    audience: "For street-front retail, kiosks and small workshops",
    description:
      "Two to six Energy Modules in a sun-shield enclosure, bolted to a plinth outside the shop. It is ready for rooftop PV and opens through a service door so a module can be swapped without dismantling the shade structure — built for sites where every square metre indoors is selling space.",
    image: "/images/modular-energy/render-pod.png",
    imageAlt: "Precifarm Pod Stack outdoor backup unit with service door and sun-shield canopy",
    highlights: [
      { label: "Modules", value: "2–6 modules" },
      { label: "Mount", value: "Plinth + wall shade" },
      { label: "PV", value: "Rooftop-ready" },
      { label: "Grid", value: "230 V / 50 Hz" },
    ],
    sections: {
      spec: {
        eyebrow: "Design targets",
        title: "Module range, plinth mount, canopy and PV integration",
      },
      features: {
        eyebrow: "Where it fits",
        title: "What Pod Stack protects on a retail site",
      },
      worksWith: {
        eyebrow: "Available today",
        title: "Site energy work we can quote for your shop now",
        description:
          "Pod Stack is design intent. A site visit today can still cover solar, storage and charging for a commercial premises.",
      },
    },
    faqSectionTitle: "Pod Stack — outdoor install, module count and weather design",
    scene: {
      src: "/images/modular-energy/render-kenya-sme.png",
      alt: "Precifarm Pod at a Kenyan SME retail site with rooftop solar",
      caption: "Typical install — Pod Stack on a plinth, fridge and till through a dip.",
    },
    specColumns: ["Item", "Target"],
    specs: [
      ["Role", "SME / outdoor backup"],
      ["Modules", "2–6 modules"],
      ["Mount", "Plinth, cable entries, wall shade"],
      ["Canopy", "Sun-shield service door"],
      ["PV", "Rooftop-ready"],
      ["Grid", "230 V / 50 Hz Kenya"],
    ],
    specCaption: "Prototype targets for Pod Stack. Nothing here is certified or final.",
    features: [
      {
        title: "The fridge keeps cold and the till keeps ringing",
        text: "Sized for retail continuity through a Kenya Power dip — refrigeration, point of sale and lighting. Industrial process loads are out of scope.",
      },
      {
        title: "Daytime solar spent on the shop, not exported",
        text: "Charge from a canopy or roof array while the sun is up, then discharge into the evening trade when the tariff and the load are both highest.",
      },
      {
        title: "Serviced from outside, during trading hours",
        text: "The service door gives a technician access to every bay without entering the shop or taking down the shade structure.",
      },
      {
        title: "Room for a wallbox when the site is ready",
        text: "Where a delivery bike, van or owner's car parks on site, a Pulse wallbox can share the same supply and solar surplus.",
      },
    ],
    worksWith: [
      {
        name: "Site engineering package",
        text: "Load assessment, solar sizing, protection gear and commissioning for commercial premises.",
        href: "/charging/engineering",
      },
      {
        name: "Pulse · 7 kW wallbox",
        text: "On-site charging for a delivery vehicle or the owner's car.",
        href: "/charging/home",
      },
      {
        name: "Host a charging hub",
        text: "If you have frontage and parking, we build and operate the hub on your site.",
        href: "/partners#hub-hosts",
      },
    ],
    faqs: [
      {
        question: "Why not just use P2 Home at a shop?",
        answer:
          "Because most street-front premises have no utility room to give up, and floor space indoors is selling space. Pod Stack mounts outdoors on a plinth with wall shade and a service door, so the footprint costs you nothing in trading area.",
      },
      {
        question: "How many modules will my shop need?",
        answer:
          "The design range is two to six. The number comes from your refrigeration load, your till and lighting, and how many hours you typically lose — which is what a site visit establishes.",
      },
      {
        question: "Is Pod Stack the same as Pod energy storage?",
        answer:
          "No. Pod energy storage is a home charger with 5 or 10 kWh built in, and we install it today. Pod Stack is this conceptual outdoor enclosure for retail sites.",
      },
      {
        question: "Will it survive sun, rain and dust outdoors?",
        answer:
          "That is the design intent — a sun-shield canopy, sealed cable entries and a service door rated for outdoor use. The enclosure is not certified yet, so we will not claim a rating we have not tested to.",
      },
    ],
  },
};
