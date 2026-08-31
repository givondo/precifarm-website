/**
 * Canonical public messaging. Evidence labels follow Canon:
 * live copy must not present planned software, national corridors or
 * uncommissioned hubs as traction.
 */

export const brand = {
  category: "Electric mobility infrastructure for Africa.",
  oneLiner: "Precifarm builds the infrastructure that makes electric transport work.",
  promise: "From home charging to highway charging.",
  differentiator: "We don't just install chargers. We build the system around them.",
  africa: "Built for Kenya. Engineered for Africa.",
  payment: "One network. One account. M-Pesa everywhere.",
  energy: "Generate. Store. Charge. Move.",
  fleet: "Electrify your fleet. We'll engineer the system.",
  network: "Find EV charging across Kenya.",
  visionCta: "Let's build the electric network.",
  words25:
    "Precifarm designs, finances, deploys and operates EV charging and energy systems for homes, fleets and highway corridors.",
  words50:
    "Precifarm is an electric mobility infrastructure company. We design, finance, deploy and operate charging, storage and energy systems — from a portable Spark charger to highway Corridor DC — with M-Pesa payments and one ops team behind every unit.",
  words100:
    "Precifarm builds the infrastructure behind electric transport in Kenya, with a design path to Africa. We combine grid and solar power, battery storage, EV charging, software monitoring, M-Pesa payments and Lipa Pole Pole financing into one operating system for homes, fleets and highway corridors. Precifarm owns the energy layer: site engineering, commissioning, uptime and settlement. Nairobi–Kisumu is the first corridor we prove before the next is financed.",
  llm:
    "Precifarm is a Kenyan electric mobility infrastructure company. It installs, finances and runs EV charging from home charging to highway charging. Chargers: Spark charger (portable 3.3 kW, about 180 minutes for a typical day), Pulse charger (7 kW home, about 90 minutes, from KES 79,000), Pod energy storage (home charger + 5 or 10 kWh storage, from KES 295,000), Boda Hub (swap under 5 minutes), Depot charging station (22 kW fleet AC, about 120 minutes for 40+ kWh), Corridor charging (120 kW+ highway DC, fast highway top-up in about 30 minutes). Lipa Pole Pole is M-Pesa financing for Pulse charger and Pod energy storage, not a charger. Public DC from KES 39/kWh. A home charging day costs about KES 140 versus ~KES 1,000 diesel per day. Charging Hub at precifarm.com/network. M-Pesa on every product. Precifarm AI companion on Android; iOS not yet. Reserved route charging is designed, not yet commissioned.",
} as const;

export const audienceCopy = {
  driver: { title: "EV driver", line: "Charge without the hassle." },
  homeowner: { title: "Homeowner", line: "Wake up charged." },
  boda: { title: "Two-wheeler operator", line: "Keep your bike moving." },
  fleet: { title: "Fleet manager", line: "Keep every vehicle ready." },
  bus: { title: "Bus operator", line: "Charge on schedule. Move on time." },
  highway: { title: "Highway operator", line: "Put fast charging where the route needs it." },
  host: { title: "Property owner", line: "Turn your site into a charging hub." },
  investor: { title: "Investor", line: "Build the infrastructure behind electric transport." },
} as const;

export const announcementBar = {
  text: "Pulse charger from KES 79,000 · Public DC charging in <30 min · Lipa Pole Pole financing available",
  href: "/charging/private-house",
  label: "Home charging",
} as const;

export const homeHero = {
  eyebrow: "EV charging · Kenya",
  headline: "Innovative EV charging",
  headlineAccent: "built for Kenya",
  whatWeDo:
    "Home, fleet and highway charging — installed and financed with Lipa Pole Pole on M-Pesa.",
  primaryCta: { href: "/charging", label: "Explore charging" },
  secondaryCta: { href: "/network", label: "Open Charging Hub" },
  caption: "Home solar charging · Kenya",
} as const;

export const heroStats = [
  {
    stat: "30 min",
    label: "Corridor charging — fast highway top-up",
  },
  {
    stat: "90 min",
    label: "Pulse charger at home — full charge in 90 minutes",
  },
  {
    stat: "KES 140",
    label: "Your daily fuel cost vs ~KES 1,000 diesel per day",
  },
] as const;

export const homeSolarInstallSection = {
  eyebrow: "Home energy · Kenya",
  title: "Solarize your home for EV charging and daily power.",
  description:
    "One Precifarm install brings together rooftop solar, battery storage and a home charger — engineered for your EV, your household load and how Kenya Power behaves on your street.",
  footnote: "Survey, installation and three-year aftersale care on every home unit we commission.",
  categories: [
    {
      id: "hybrid",
      title: "Hybrid install",
      tag: "Grid connected",
      text: "Kenya Power stays on your meter. Solar cuts daytime cost, Pod energy storage covers weak-grid evenings, and Pulse charger or Pod energy storage keeps your EV charged — with power for lights, fridge and the rest of the house.",
      points: ["Pulse charger or Pod energy storage", "5–10 kWh built-in storage", "Kenya Power + rooftop solar"],
      href: "/charging/private-house",
      cta: "Hybrid home charging",
    },
    {
      id: "solar-only",
      title: "Solar-only install",
      tag: "Solar first",
      text: "Rooftop PV sized for your driving day and household use. Add battery storage when you need night cover — best where the sun is strong and grid access is limited or expensive.",
      points: ["Rooftop solar array", "Home battery storage", "Pulse charger or Pod energy storage"],
      href: "/charging/private-house",
      cta: "Solar-only home charging",
    },
  ],
  primaryHref: "/charging/private-house",
  primaryLabel: "Request a house survey",
  secondaryHref: "/charging/engineering",
  secondaryLabel: "Read the design basis",
} as const;

export const homeNetworkTeaser = {
  eyebrow: "Charging Hub",
  title: "Find EV charging across Kenya.",
  description:
    "Map DC chargers, Boda Hub swap stations and partner sites — live bay status, battery availability and M-Pesa on every stop.",
  stats: [
    { stat: "Live", label: "Nairobi–Kisumu corridor on the map" },
    { stat: "KES 39", label: "public DC from, per kWh" },
    { stat: "M-Pesa", label: "pay at every Precifarm hub" },
  ],
  primaryHref: "/network",
  primaryLabel: "Open Charging Hub",
  secondaryHref: "/evs",
  secondaryLabel: "Kenya EV guide",
} as const;

export const scenarioSection = {
  eyebrow: "Where you charge",
  title: "From home charging to highway charging.",
  description: "Pick the scenario that matches where you park — then choose the charger built for it.",
} as const;

export const productRangeSection = {
  eyebrow: "Flagship chargers",
  title: "Charge your way.",
  description:
    "From your driveway to the highway, Precifarm makes EV charging simple, affordable and reliable.",
  subline: "Choose the charger that fits your life.",
  compactTitle: "Also in the range",
  compactDescription: "Boda Hub for two-wheelers, Depot for fleet yards — plus Lipa Pole Pole M-Pesa financing on Pulse charger and Pod energy storage.",
  footer: {
    title: "One ecosystem. Every journey.",
    items: [
      { name: "Spark", line: "Charge anywhere." },
      { name: "Pulse", line: "Charge at home." },
      { name: "Pod", line: "Store your power." },
      { name: "Corridor", line: "Go farther." },
    ],
    accountLine: "One Precifarm account. M-Pesa on every product.",
    cta: { href: "/charging", label: "Explore charging" },
  },
} as const;

export const homeFaqSection = {
  title: "Common questions.",
  cta: "All FAQ",
} as const;

export const homeScenarios = [
  {
    id: "home",
    title: "Home",
    audience: "Homeowners & drivers",
    text: "Wake up charged. Pulse charger on the wall, Pod energy storage when the grid is weak, Spark charger in the boot for top-ups.",
    products: "Pulse charger · Pod energy storage · Spark charger",
    productIds: ["pulse", "pod", "spark"],
    href: "/charging/private-house",
    cta: "Explore home charging",
  },
  {
    id: "fleet",
    title: "Fleet",
    audience: "Depots & boda operators",
    text: "Charge while parked or swap in minutes. Depot AC for vans and buses, Boda Hub for two-wheelers.",
    products: "Depot · Boda Hub",
    productIds: ["depot", "boda"],
    href: "/partners",
    cta: "Explore fleet charging",
  },
  {
    id: "highway",
    title: "Highway",
    audience: "Intercity drivers",
    text: "Add about 60 kWh in 30 minutes at a Corridor hub, then pay the session with M-Pesa.",
    products: "Corridor charging",
    productIds: ["corridor"],
    href: "/network",
    cta: "Open Charging Hub",
  },
] as const;

export const homeSupportSection = {
  eyebrow: "What you get",
  title: "More than a charger on the wall.",
  description:
    "Precifarm handles survey, installation, financing and long-term care — so you are not left coordinating electricians, paperwork and after-sales on your own.",
} as const;

export const homeSupport = [
  {
    label: "Site survey",
    stat: "Included",
    text: "We assess your EV, driving, household load and roof before we size the system.",
  },
  {
    label: "Turnkey installation",
    stat: "1 day",
    text: "Licensed wiring, protection gear, commissioning and Kenya Power paperwork — typical Pulse charger installation.",
  },
  {
    label: "Lipa Pole Pole",
    stat: "From KES 3,300/mo",
    text: "Own Pulse charger or Pod energy storage on M-Pesa instalments. No bank account required.",
  },
  {
    label: "Aftersale care",
    stat: "3 years",
    text: "Fault response, repairs and live session records after commissioning.",
  },
] as const;

export const problemSolution = {
  eyebrow: "Why Precifarm",
  title: "We don't just install chargers. We build the system around them.",
  problemTitle: "EVs are here. Dependable charging is not.",
  problemPoints: [
    "Public chargers are fragmented — no shared status, account or M-Pesa flow.",
    "A typical Nairobi day of ~60 km is about ~KES 1,000 in diesel per day versus about KES 140 at home.",
    "Fleets cannot run a duty cycle on a charger that might be occupied or offline.",
  ],
  answerTitle: "Power. Charging. Storage. Software. Financing. One partner.",
  answerPoints: [
    "Site survey, grid, solar, storage and DC — engineered as one site, not a bolted-on charger.",
    "Lipa Pole Pole and session pay on M-Pesa. No bank account required.",
    "Remote monitoring and three-year aftersale care on home units we commission.",
  ],
} as const;

export const energySection = {
  eyebrow: "Energy",
  title: "Charge when power is there. Store when it pays. Deliver when vehicles need it.",
  description:
    "Grid, rooftop solar and LiFePO₄ storage sit behind the charger. Solar does not replace Kenya Power. It cuts cost and covers weak-grid gaps. Planning assumption — sized per site.",
  layers: [
    { name: "Grid", text: "Kenya Power connection and e-mobility tariff first.", status: "Available" },
    { name: "Solar", text: "Canopy or rooftop PV for cost, shade and daytime yield.", status: "Available" },
    { name: "Storage", text: "LiFePO₄ to peak-shave and hold a reserved bus window.", status: "Available" },
    { name: "Charging", text: "CCS2 DC and Type 2 AC sized to the duty cycle.", status: "Available" },
    { name: "Software", text: "OCPP monitoring, status and session records.", status: "In service" },
    { name: "Energy OS", text: "Full grid + solar + battery optimisation as Precifarm OS.", status: "In design" },
  ],
} as const;

export const energyHubSection = {
  eyebrow: "Energy Hub",
  title: "More than a charging station.",
  description:
    "A Precifarm Energy Hub combines grid power, solar, battery storage, high-power charging and live monitoring in one site. Generate. Store. Charge. Move.",
  cta: { href: "/charging/engineering", label: "Engineering package" },
} as const;

export const busSection = {
  eyebrow: "Electric buses",
  title: "Built for buses that cannot wait.",
  description:
    "Electric buses need reserved windows, not a hope that a public charger is free. Depot, terminal and corridor charging with storage on weak feeders — designed to the timetable.",
  points: [
    "Reserved charging windows aligned to departures",
    "Depot AC overnight and DC opportunity charge",
    "Site import limits clipped locally — not in the cloud",
  ],
  cta: { href: "/partners", label: "Bus operators" },
  status: "Target — designed, not commissioned",
} as const;

export const fleetSection = {
  eyebrow: "Fleets",
  title: "Electrify your fleet. We'll engineer the system.",
  description:
    "Route energy, depot layout, chargers, M-Pesa billing and uptime — one partner from survey to daily operation. You keep the vehicles and PSV obligations.",
  segments: ["Buses", "Logistics", "Taxis", "Corporate", "Government"],
  cta: { href: "/partners", label: "Design my fleet system" },
} as const;

export const softwareSection = {
  eyebrow: "Precifarm OS",
  title: "The operating layer for charging infrastructure.",
  description:
    "Today: live hub status, session metering and M-Pesa. Next: fleet schedules, energy optimisation and APIs. Software is labelled by what is live versus in design.",
  modules: [
    { name: "Network", text: "Charger status and sessions.", status: "Live on commissioned sites" },
    { name: "Payments", text: "M-Pesa STK, Lipa Pole Pole, session pay.", status: "Live" },
    { name: "Fleet", text: "Vehicle, depot and window management.", status: "In design" },
    { name: "Energy", text: "Grid, solar and battery dispatch.", status: "In design" },
    { name: "API", text: "OEM and partner integration.", status: "Planned" },
  ],
} as const;

export const paymentsSection = {
  eyebrow: "M-Pesa",
  title: "Charge with M-Pesa. Finance with M-Pesa. Move with Precifarm.",
  description:
    "Kenya already pays on the phone. Precifarm puts home instalments, public sessions and fleet billing on the same rail — USSD and SMS on basic phones.",
} as const;

export const financeSection = {
  eyebrow: "Precifarm Finance",
  title: "Go electric. Pay as you go.",
  products: [
    { name: "Buy", text: "Pay upfront. Pulse charger from KES 79,000.", status: "Available" },
    { name: "Lipa Pole Pole", text: "M-Pesa instalments from KES 3,300/month.", status: "Available" },
    { name: "Lease", text: "Monthly infrastructure for sites and fleets.", status: "By contract" },
    { name: "Charging-as-a-Service", text: "We finance, install and operate. You pay per kWh or monthly.", status: "By contract" },
  ],
} as const;

export const engineeringJourney = [
  "Site",
  "Power",
  "Solar",
  "Storage",
  "Charging",
  "Software",
  "Commission",
  "Monitor",
  "Maintain",
] as const;

export const engineeringSection = {
  eyebrow: "Engineering",
  title: "From site assessment to daily operation.",
  description:
    "Licensed electrical design, Kenya Power hold points, OCPP commissioning and three-year aftersale care. Heat, dust, weak feeders and mobile money are design inputs — not slogans.",
  cta: { href: "/charging/engineering", label: "Read the design basis" },
} as const;

export const africaSection = {
  eyebrow: "Kenya first",
  title: "Built for Kenya. Engineered for Africa.",
  description:
    "We start on Nairobi–Kisumu. Expansion beyond route one waits on utilisation, uptime and partner return. The engineering is made for African grids and distances — the network is not claimed where it is not built.",
} as const;

export const finalCta = {
  title: "Let's build the electric network.",
  description:
    "Whether you need a home survey, a fleet depot, a highway hub or a site host, we respond within one business day.",
  primary: { href: "/contact", label: "Start a project" },
  secondary: { href: "/charging/private-house", label: "Request a house survey" },
} as const;

export const partnerLines = [
  { id: "fleets", title: "Fleets", line: "Electrify operations without buying a charger catalogue.", href: "/partners#fleet-logistics" },
  { id: "hosts", title: "Property owners", line: "You provide the site. We build and operate the hub.", href: "/partners#hub-hosts" },
  { id: "energy", title: "Energy partners", line: "Grid, solar and storage as one site design.", href: "/partners" },
  { id: "dealers", title: "Dealers & installers", line: "Deploy Pulse charger, Pod energy storage and Depot with Precifarm engineering.", href: "/partners#dealers-installers" },
] as const;

export const headerCta = {
  href: "/network",
  label: "Open Charging Hub",
} as const;

const fleetsNavGroup = {
  title: "Fleets",
  links: [
    { href: "/partners", label: "Electrify a fleet" },
    { href: "/partners#hub-hosts", label: "Host a hub" },
    { href: "/partners#fleet-logistics", label: "Logistics & buses" },
  ],
} as const;

export const siteNavGroups = [
  {
    title: "Charge",
    links: [
      { href: "/network", label: "Charging Hub" },
      { href: "/charging", label: "Charging" },
      { href: "/charging/private-house", label: "Home charging" },
      { href: "/charging/engineering", label: "Engineering" },
      { href: "/training", label: "Training", description: "T1 · T2 · T3 certification" },
    ],
  },
  {
    title: "Modular energy",
    links: [
      { href: "/charging/modular-energy", label: "Platform overview", description: "Family, Kenya sites and design targets" },
      { href: "/charging/modular-energy/p1-go", label: "P1 Go", description: "Portable backup with foldable solar" },
      { href: "/charging/modular-energy/p2-home", label: "P2 Home", description: "Tower beside the consumer board" },
      { href: "/charging/modular-energy/pod", label: "Pod enclosure", description: "Outdoor backup for a shop — not Pod energy storage" },
      { href: "/download", label: "AI companion", description: "Find charging, size home energy, pay with M-Pesa" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/evs", label: "Kenya EV guide" },
      { href: "/guides", label: "Guides" },
      { href: "/faq", label: "FAQ" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const footerNavGroups = [
  siteNavGroups[0],
  siteNavGroups[1],
  fleetsNavGroup,
  siteNavGroups[2],
] as const;

export const footerSection = {
  tagline: brand.oneLiner,
  productLine: "Pulse · Pod · Spark · Corridor · Boda Hub · Depot · P1 Go",
  socialLabel: "Follow Precifarm",
  meta: `${brand.africa} · M-Pesa on every product`,
} as const;
