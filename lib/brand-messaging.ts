/**
 * Canonical public messaging. Evidence labels follow Canon:
 * live copy must not present planned software, national corridors or
 * uncommissioned hubs as traction.
 */

import { modularEnergyBrand, modularEnergyNav, modularEnergyPaths } from "@/lib/modular-energy-page";
import { sitePricing } from "@/lib/site-copy";

export const brand = {
 category: "Electric mobility infrastructure for Africa.",
 oneLiner: "Precifarm builds the infrastructure that makes electric transport work.",
 promise: "From home charging to highway charging.",
 differentiator: "We don't just install chargers. We build the system around them.",
 africa: "Built for Kenya. Engineered for Africa.",
 payment: "One network. One account. M-Pesa everywhere.",
 energy: "Generate. Store. Charge. Move.",
 /** Modular energy platform as keep in sync with modularEnergyBrand. */
 energyPlatform: modularEnergyBrand.shortLine,
 fleet: "Electrify your fleet. We'll engineer the system.",
 network: "Find EV charging across Kenya.",
 visionCta: "Let's build the electric network.",
 words25:
 "Precifarm designs, finances, deploys and operates EV charging and energy systems for homes, fleets and highway corridors.",
 words50:
 "Precifarm is an electric mobility infrastructure company. We design, finance, deploy and operate charging, storage and energy systems as from a portable Spark charger to highway Corridor DC as with M-Pesa payments and one ops team behind every unit.",
 words100:
 "Precifarm builds the infrastructure behind electric transport in Kenya, with a design path to Africa. We combine grid and solar power, battery storage, EV charging, software monitoring, M-Pesa payments and Lipa Pole Pole financing into one operating system for homes, fleets and highway corridors. Precifarm handles site engineering, commissioning, uptime and settlement. Nairobi–Kisumu is the first corridor we prove before the next is financed.",
 llm:
 "Precifarm is a Kenyan electric mobility infrastructure company. It installs, finances and runs EV charging from home charging to highway charging. Chargers: Spark charger (portable 3.3 kW, about 180 minutes for a typical day), Pulse charger (7 kW home, about 90 minutes, from KES 79,000), Pod energy storage (home charger + 5 or 10 kWh storage, from KES 295,000), Boda Hub (swap under 5 minutes), Depot charging station (22 kW fleet AC, about 120 minutes for 40+ kWh), Corridor charging (120 kW+ highway DC, fast highway top-up in about 30 minutes). Lipa Pole Pole is M-Pesa financing for Pulse charger and Pod energy storage, not a charger. Public DC from KES 39/kWh. A home charging day costs about KES 140 versus ~KES 1,000 diesel per day. Charging Hub at precifarm.com/hub. M-Pesa on every product. Precifarm Agent desktop coming soon at precifarm.com/download. Modular energy (P1 Go, P2 Home, Mini Stack) is conceptual — not on sale.",
} as const;

export const audienceCopy = {
 driver: { title: "EV driver", line: "Charge without the hassle." },
 homeowner: { title: "Homeowner", line: "Wake up charged." },
 boda: { title: "Two-wheeler operator", line: "Keep your bike moving." },
 fleet: { title: "Fleet manager", line: "Keep every vehicle ready." },
 bus: { title: "Fleet operator", line: "Depot and corridor charging for the duty cycle." },
 highway: { title: "Highway operator", line: "Put fast charging where the route needs it." },
 host: { title: "Property owner", line: "Turn your site into a charging hub." },
 investor: { title: "Investor", line: "Build the infrastructure behind electric transport." },
} as const;

export const announcementBar = {
 text: "Pulse charger from KES 79,000 · Public DC charging in <30 min · Lipa Pole Pole financing available",
 textShort: "Pulse charger from KES 79,000 · Lipa Pole Pole on M-Pesa",
 href: "/charging/home",
 label: "Home charging",
} as const;

export const homeHero = {
 eyebrow: "EV charging · Kenya",
 headline: "Ultra EV fast charging.",
 headlineAccent: "For electric cars and motorcycles.",
 whatWeDo:
 "Precifarm builds and finances innovative EV charging solutions to power electric cars and motorcycles from as low as KES 3,000/month.",
 primaryCta: { href: "/charging/home", label: "Home charging" },
 secondaryCta: { href: "/partners", label: "Fleet & partners" },
 caption: "Pulse charger · Kenya",
 video: {
 youtubeId: "vMJp49Denaw",
 title: "Precifarm EV charging in Kenya",
 posterSrc: "/images/home-hero-video-wallpaper.jpg",
 },
} as const;

export const heroStats = [
 {
 stat: "90 min",
 label: "Full charge overnight with a Pulse charger — covers a typical ~60 km Nairobi day",
 },
 {
 stat: `Drive 60 km for about ${sitePricing.homeDay}`,
 label: `Charge at home with a Pulse charger for around ${sitePricing.homeDay} per day, compared with roughly ${sitePricing.dieselDay} in diesel for the same distance.`,
 },
] as const;

export const homeNetworkTeaser = {
 eyebrow: "Charging Hub",
 title: "See what is open before you drive.",
 description:
 "Highway DC, boda swap and partner stops on one map — each site labelled live or coming soon. Public DC from KES 39/kWh where available.",
 stats: [
 { stat: "KES 39", label: "Public DC from, per kWh" },
 { stat: "M-Pesa", label: "Session pay at commissioned sites" },
 ],
 primaryHref: "/hub#map",
 primaryLabel: "Open the map",
 secondaryHref: "/evs",
 secondaryLabel: "Kenya EV guide",
} as const;

export const scenarioSection = {
 eyebrow: "Where you charge",
 title: "Home, depot or highway — the right charger for where you stop.",
 description:
 "Same Precifarm team behind every product: site survey, install, M-Pesa pay and monitoring — sized to your car, fleet or route.",
} as const;

export const productRangeSection = {
 eyebrow: "Flagship chargers",
 title: "Charge your way.",
 description:
 "From your driveway to the highway, Precifarm makes EV charging simple, affordable and reliable.",
 subline: "Choose the charger that fits your life.",
 compactTitle: "Also in the range",
 compactDescription: "Boda Hub for two-wheelers, Depot for fleet yards as plus Lipa Pole Pole M-Pesa financing on Pulse charger and Pod energy storage.",
 footer: {
 title: "One ecosystem. Every journey.",
 items: [
 { name: "Spark", line: "Charge anywhere." },
 { name: "Pulse charger", line: "Charge at home." },
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
 text: "Plug in on your driveway overnight. Add Pod energy storage when the grid dips, and keep a Spark charger in the boot for days away from home.",
 products: "Pulse charger · Pod · Spark charger",
 productIds: ["pulse", "pod", "spark"],
 href: "/charging/home",
 cta: "Home charging & Lipa Pole Pole",
 },
 {
 id: "fleet",
 title: "Fleet",
 audience: "Depots & boda operators",
 text: "Charge vans and buses on 22 kW Depot pedestals while they sit in the yard. Boda Hub smart lockers swap batteries for electric motorcycles in minutes.",
 products: "Depot charging station · Boda Hub",
 productIds: ["depot", "boda"],
 href: "/partners",
 cta: "Fleet & boda programmes",
 },
 {
 id: "highway",
 title: "Highway",
 audience: "Intercity drivers",
 text: "Pull in for 120 kW+ Corridor DC fast charging on long routes. We engineer and operate the site — you pay each session with M-Pesa.",
 products: "Corridor charging · M-Pesa session pay",
 productIds: ["corridor"],
 href: "/partners",
 cta: "Highway corridor programmes",
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
 text: "Licensed wiring, protection gear, commissioning and Kenya Power paperwork as typical Pulse charger installation.",
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
 "Public chargers are fragmented as no shared status, account or M-Pesa flow.",
 "A typical Nairobi day of ~60 km is about ~KES 1,000 in diesel per day versus about KES 140 at home.",
 "Fleets cannot run a duty cycle on a charger that might be occupied or offline.",
 ],
 answerTitle: "Power. Charging. Storage. Software. Financing. One partner.",
 answerPoints: [
 "Site survey, grid, solar, storage and DC as engineered as one site, not a bolted-on charger.",
 "Lipa Pole Pole and session pay on M-Pesa. No bank account required.",
 "Remote monitoring and three-year aftersale care on home units we commission.",
 ],
} as const;

export const energySection = {
 eyebrow: "Energy",
 title: "Charge when power is there. Store when it pays. Deliver when vehicles need it.",
 description:
 "Grid, rooftop solar and LiFePOâ‚„ storage sit behind the charger. Solar does not replace Kenya Power. It cuts cost and covers weak-grid gaps. Planning assumption as sized per site.",
 layers: [
 { name: "Grid", text: "Kenya Power connection and e-mobility tariff first.", status: "Available" },
 { name: "Solar", text: "Canopy or rooftop PV for cost, shade and daytime yield.", status: "Available" },
 { name: "Storage", text: "LiFePOâ‚„ to peak-shave and cover weak-grid evenings.", status: "Available" },
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

export const fleetSection = {
 eyebrow: "Fleets",
 title: "Electrify your fleet. We'll engineer the system.",
 description:
 "Route energy, depot layout, chargers, M-Pesa billing and uptime as one partner from survey to daily operation. You keep the vehicles and PSV obligations.",
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
 "Kenya already pays on the phone. Precifarm puts home instalments, public sessions and fleet billing on the same rail as USSD and SMS on basic phones.",
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
 "Licensed electrical design, Kenya Power hold points, OCPP commissioning and three-year aftersale care. Heat, dust, weak feeders and mobile money are design inputs as not slogans.",
 cta: { href: "/charging/engineering", label: "Read the design basis" },
} as const;

export const africaSection = {
 eyebrow: "Kenya first",
 title: "Built for Kenya. Engineered for Africa.",
 description:
 "We start on Nairobi–Kisumu. Expansion beyond route one waits on utilisation, uptime and partner return. The engineering is made for African grids and distances as the network is not claimed where it is not built.",
} as const;

export const finalCta = {
 title: "Let's build the electric network.",
 description:
 "Whether you need a home survey, a fleet depot, a highway hub or a site host, we respond within one business day.",
 primary: { href: "/contact", label: "Start a project" },
 secondary: { href: "/charging/home", label: "Request a house survey" },
} as const;

export const partnerLines = [
 { id: "fleets", title: "Fleets", line: "Electrify operations without buying a charger catalogue.", href: "/partners#fleet-logistics" },
 { id: "hosts", title: "Property owners", line: "You provide the site. We build and operate the hub.", href: "/partners#hub-hosts" },
 { id: "energy", title: "Energy partners", line: "Grid, solar and storage as one site design.", href: "/partners" },
 { id: "dealers", title: "Dealers & installers", line: "Deploy Pulse charger, Pod energy storage and Depot with Precifarm engineering.", href: "/partners#dealers-installers" },
] as const;

export const headerCta = {
 href: "/contact",
 label: "Contact us",
} as const;


export const siteNavGroups = [
 {
 title: "Charging",
 links: [
 { href: "/charging/home", label: "Pulse charger", description: "7 kW home · from KES 79,000" },
 { href: "/charging", label: "All chargers", description: "Spark, Pod, Depot, Corridor" },
 { href: "/charging/boda-hub", label: "Boda Hub", description: "Battery swap under 5 minutes" },
 ],
 },
 {
 title: "Energy",
 links: [
 {
 href: modularEnergyNav.overview.href,
 label: "Modular energy",
 description: "P1 Go · P2 Home · Mini Stack",
 },
 {
 href: modularEnergyPaths.p2Home,
 label: "P2 Home",
 description: "Home tower · 1–4 modules",
 },
 ],
 },
 {
 title: "For business",
 links: [
 { href: "/partners", label: "Fleet & partners", description: "Depot and corridor programmes" },
 { href: "/charging/engineering", label: "Engineering", description: "Site design and commissioning" },
 ],
 },
 {
 title: "Company",
 links: [
 { href: "/about", label: "About" },
 { href: "/faq", label: "FAQ" },
 { href: "/contact", label: "Contact" },
 ],
 },
] as const;

export const footerNavGroups = [
 {
 title: "Charging",
 links: [
 { href: "/charging/home", label: "Pulse charger · home" },
 { href: "/charging", label: "All chargers" },
 { href: "/charging/boda-hub", label: "Boda Hub" },
 ],
 },
 {
 title: "Energy",
 links: [
 { href: modularEnergyPaths.overview, label: "Modular energy overview" },
 { href: modularEnergyPaths.p2Home, label: "P2 Home" },
 ],
 },
 {
 title: "For business",
 links: [
 { href: "/partners", label: "Fleet & partners" },
 { href: "/charging/engineering", label: "Engineering" },
 ],
 },
 {
 title: "Company",
 links: [
 { href: "/about", label: "About" },
 { href: "/faq", label: "FAQ" },
 { href: "/contact", label: "Contact" },
 ],
 },
] as const;

export const footerSection = {
 tagline: brand.oneLiner,
 productLine: "Pulse charger · Pod · Spark charger · Corridor · Boda Hub · Depot · MegaPack",
 socialLabel: "Follow Precifarm",
 meta: `${brand.africa} · M-Pesa on every product`,
} as const;
