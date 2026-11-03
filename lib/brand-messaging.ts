/**
 * Canonical public messaging. Evidence labels follow Canon:
 * live copy must not present planned software, national corridors or
 * uncommissioned hubs as traction.
 */

import { trainingNavLabel } from "@/lib/training";
import { sitePricing } from "@/lib/site-copy";

export const brand = {
 category: "Electric mobility infrastructure for Africa.",
 oneLiner: "Precifarm builds the infrastructure that makes electric transport work.",
 promise: "From home charging to highway charging.",
 differentiator: "We don't just install chargers. We build the system around them.",
 africa: "Built for Kenya. Engineered for Africa.",
 payment: "One network. One account. M-Pesa everywhere.",
 energy: "Generate. Store. Charge. Move.",
 energyPlatform: "Energy infrastructure and private AI, engineered in Kenya.",
 fleet: "Electrify your fleet. We'll engineer the system.",
 network: "Find EV charging across Kenya.",
 visionCta: "Let's build the electric network.",
 words25:
 "Precifarm designs, finances, deploys and operates EV charging and energy systems for homes, fleets and highway corridors.",
 words50:
 "Precifarm is an electric mobility infrastructure company. We design, finance, deploy and operate charging, storage and energy systems, from a Pulse charger on the driveway to Corridor DC fast charging, with M-Pesa payments and one ops team behind every unit.",
 words100:
 "Precifarm builds the infrastructure behind electric transport in Kenya, with a design path to Africa. We combine grid and solar power, battery storage, EV charging, software monitoring, M-Pesa payments and Lipa Pole Pole financing into one operating system for homes, fleets and highway corridors. Precifarm handles site engineering, commissioning, uptime and settlement. The first Corridor sites, starting on Nairobi to Kisumu, are pilots we prove before the next is financed.",
 llm:
 "Precifarm is a Kenyan electric mobility infrastructure company with two pillars. Energy infrastructure: Pulse charger (7 kW home wallbox, available, from KES 79,000, a typical 60 km day in under two hours), Pulse+ charger (22 kW three-phase AC for fleets and workplaces, in development), Corridor charging (DC fast charging from a certified OEM charger of 120 to 180 kW with CCS2 connectors, under the Precifarm brand; the first site, starting on Nairobi to Kisumu, is a pilot in development with no on-site storage at first; price per kWh set per site and shown before you start), Boda Hub (battery swapping for electric motorcycles, partner-run pilot sites, swap under 5 minutes; the Automated Boda Hub cabinet is in development) and wireless EV charging research (light-duty cars first, not a product). AI systems: Agent Harness (Precifarm's AI agent platform: agent workflows on hosted models chosen per task, DeepSeek by default, in development) and Precifarm Agent (hosted engineering assistant at precifarm.com/agent). Lipa Pole Pole is M-Pesa financing for the Pulse charger, from KES 3,300/month, not a charger. A home charging day costs about KES 140 versus about KES 1,000 in diesel. M-Pesa on every product.",
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

/** Browser tab title — keep in sync with lib/seo/config.ts; hero H1 uses homeHero.headline */
export const homePageTitle = "EV Charging in Kenya: Home Chargers & Fast Charging | Precifarm" as const;

export const announcementBar = {
 text: "Pulse charger from KES 79,000 · Public DC charging in <30 min · Lipa Pole Pole financing available",
 textShort: "Pulse charger from KES 79,000 · Lipa Pole Pole on M-Pesa",
 /** One-line promo on small screens */
 textMobile: "Pulse · from KES 79,000",
 href: "/charging/home",
 label: "Home charging",
 labelMobile: "Home",
} as const;

export const homeHero = {
 eyebrow: "Precifarm EV Charging",
 headline: "EV charging for Kenya, from your home to the highway.",
 headlineAccent: "",
 whatWeDo:
 "Fast, reliable charging for electric cars and motorcycles, fully installed and financed from KES 3,300/month.",
 primaryCta: { href: "/charging/home", label: "Home charging" },
 secondaryCta: { href: "/partners", label: "Fleet & partners" },
 caption: "Pulse charger · Kenya",
 video: {
 /** Hosted on GCS — see scripts/upload-hero-video.ps1 & compress-hero-video.mjs */
 src:
 "https://storage.googleapis.com/precifarm-public-media-skilled-orbit/videos/precifarm-ad-v2-web.mp4",
 srcMobile:
 "https://storage.googleapis.com/precifarm-public-media-skilled-orbit/videos/precifarm-ad-v2-mobile.mp4",
 posterSrc: "/images/home-hero-video-wallpaper.jpg",
 title: "Precifarm EV charging in Kenya",
 },
} as const;

export const heroStats = [
 {
 stat: "Under 2 hours",
 label: "Puts back a typical ~60 km Nairobi day with a Pulse charger. Plug in after work, ready by morning",
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
 "Highway DC, boda swap and partner stops on one map — each site labelled live or coming soon. Price per kWh shown before you start.",
 stats: [
 { stat: "Upfront", label: "Price per kWh shown before you charge" },
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
 eyebrow: "Charging",
 title: "Charge your way.",
 description:
 "From your driveway to the highway, Precifarm makes EV charging simple, affordable and reliable.",
 subline: "Choose the charger that fits your site.",
 compactTitle: "Also in the range",
 compactDescription: "Boda Hub battery swapping for two-wheelers, plus Lipa Pole Pole M-Pesa financing on the Pulse charger.",
 footer: {
 title: "One ecosystem. Every journey.",
 items: [
 { name: "Pulse charger", line: "Charge at home." },
 { name: "Pulse+", line: "Charge the fleet." },
 { name: "Corridor", line: "Go farther." },
 { name: "Boda Hub", line: "Swap and ride." },
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
 audience: "Homeowners and drivers",
 status: "available",
 text: "Plug in on your driveway overnight. We survey, install and look after the Pulse charger, and Lipa Pole Pole spreads the cost on M-Pesa.",
 products: "Pulse charger · Lipa Pole Pole",
 productIds: ["pulse", "financing"],
 href: "/charging/home",
 cta: "Home charging",
 },
 {
 id: "fleet",
 title: "Fleet and two-wheelers",
 audience: "Depots, workplaces and boda operators",
 status: "pilot",
 text: "Pulse+ brings 22 kW three-phase charging to yards and workplaces (in development). Boda Hub swaps batteries for electric motorcycles at partner-run pilot sites.",
 products: "Pulse+ · Boda Hub",
 productIds: ["pulsePlus", "boda"],
 href: "/partners",
 cta: "Fleet and boda programmes",
 },
 {
 id: "highway",
 title: "Highway",
 audience: "Intercity drivers and site hosts",
 status: "pilot",
 text: "Corridor DC fast charging from a certified OEM charger, engineered around each site's grid. The first site, starting on Nairobi to Kisumu, is a pilot in development.",
 products: "Corridor charging · M-Pesa session pay",
 productIds: ["corridor"],
 href: "/charging/corridor",
 cta: "Corridor charging",
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
 text: "Licensed wiring, protection gear, commissioning and Kenya Power paperwork (typical Pulse charger installation).",
 },
 {
 label: "Lipa Pole Pole",
 stat: "From KES 3,300/mo",
 text: "Own a Pulse charger on M-Pesa instalments. No bank account required.",
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
 "Public chargers are fragmented: no shared status, account or M-Pesa flow.",
 "A typical Nairobi day of ~60 km is about ~KES 1,000 in diesel per day versus about KES 140 at home.",
 "Fleets cannot run a duty cycle on a charger that might be occupied or offline.",
 ],
 answerTitle: "Power. Charging. Storage. Software. Financing. One partner.",
 answerPoints: [
 "Site survey, grid, solar, storage and DC: engineered as one site, not a bolted-on charger.",
 "Lipa Pole Pole and session pay on M-Pesa. No bank account required.",
 "Remote monitoring and three-year aftersale care on home units we commission.",
 ],
} as const;

export const energySection = {
 eyebrow: "Energy",
 title: "Charge when power is there. Store when it pays. Deliver when vehicles need it.",
 description:
 "Grid, rooftop solar and LiFePO₄ storage sit behind the charger. Solar does not replace Kenya Power. It cuts cost and covers weak-grid gaps. Planning assumption, sized per site.",
 layers: [
 { name: "Grid", text: "Kenya Power connection and e-mobility tariff first.", status: "Available" },
 { name: "Solar", text: "Canopy or rooftop PV for cost, shade and daytime yield.", status: "Available" },
 { name: "Storage", text: "LiFePO₄ to peak-shave and cover weak-grid evenings.", status: "Available" },
 { name: "Charging", text: "CCS2 DC and Type 2 AC sized to the duty cycle.", status: "Available" },
 { name: "Software", text: "OCPP monitoring, status and session records.", status: "In service" },
 { name: "Energy OS", text: "Full grid + solar + battery optimisation (Precifarm OS).", status: "In design" },
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
 "Route energy, depot layout, chargers, M-Pesa billing and uptime: one partner from survey to daily operation. You keep the vehicles and PSV obligations.",
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
 "Kenya already pays on the phone. Precifarm puts home instalments, public sessions and fleet billing on the same rail: USSD and SMS on basic phones.",
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
 "Licensed electrical design, Kenya Power hold points, OCPP commissioning and three-year aftersale care. Heat, dust, weak feeders and mobile money are design inputs, not slogans.",
 cta: { href: "/charging/engineering", label: "Read the design basis" },
} as const;

export const africaSection = {
 eyebrow: "Kenya first",
 title: "Built for Kenya. Engineered for Africa.",
 description:
 "We start with pilot sites on Nairobi to Kisumu. Expansion beyond route one waits on utilisation, uptime and partner return. The engineering is made for African grids and distances; the network is not claimed where it is not built.",
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
 { id: "dealers", title: "Dealers & installers", line: "Deploy Pulse and Pulse+ chargers with Precifarm engineering.", href: "/partners#dealers-installers" },
] as const;

export const headerCta = {
 href: "/contact",
 label: "Contact us",
} as const;


export const siteNavGroups = [
 {
 title: "EV Charging",
 links: [
 { href: "/charging/home", label: "Pulse charger", description: "7 kW home · from KES 79,000" },
 { href: "/charging/pulse-plus", label: "Pulse+ charger", description: "22 kW three phase · in development" },
 { href: "/charging/corridor", label: "Corridor charging", description: "DC fast charging · pilot" },
 { href: "/charging", label: "All charging", description: "Home, fleet and highway" },
 ],
 },
 {
 title: "Swapping & R&D",
 links: [
 { href: "/charging/boda-hub", label: "Boda Hub", description: "Battery swap for e-bodas · pilot" },
 { href: "/research", label: "Wireless EV charging", description: "Research programme" },
 { href: "/charging/engineering", label: "Engineering", description: "Site design and commissioning" },
 ],
 },
 {
 title: "AI Platform",
 links: [
 { href: "/ai", label: "Agent Harness", description: "AI agent workflows · in development" },
 { href: "/agent", label: "Precifarm Agent", description: "Hosted energy engineering assistant" },
 ],
 },
 {
 title: "Company",
 links: [
 { href: "/partners", label: "Fleet & partners", description: "Fleet, boda and corridor programmes" },
 { href: "/training", label: trainingNavLabel, description: "T1 · T2 · T3 certification" },
 { href: "/evs", label: "Kenya EV guide", description: "Models and charging requirements" },
 { href: "/guides", label: "Guides", description: "Charging costs, tariffs and installs" },
 { href: "/about", label: "About us" },
 { href: "/faq", label: "FAQ" },
 { href: "/contact", label: "Contact us" },
 ],
 },
] as const;

export const footerNavGroups = [
 {
 title: "Charging",
 links: [
 { href: "/charging/home", label: "Home EV chargers" },
 { href: "/hub", label: "Charging stations map" },
 { href: "/charging", label: "All chargers" },
 { href: "/charging/boda-hub", label: "Boda battery swap" },
 ],
 },
 {
 title: "Guides",
 links: [
 { href: "/guides/ev-charging-stations-kenya", label: "EV charging stations in Kenya" },
 { href: "/guides/kenya-power-ev-charging-tariff", label: "Kenya Power EV tariff" },
 { href: "/guides/charge-electric-car-at-home-kenya", label: "Charge an EV at home" },
 { href: "/guides/electric-boda-battery-swap-kenya", label: "Electric boda battery swap" },
 { href: "/guides", label: "All guides" },
 ],
 },
 {
 title: "Programmes",
 links: [
 { href: "/charging/pulse-plus", label: "Pulse+ 22 kW" },
 { href: "/charging/corridor", label: "Corridor DC" },
 { href: "/research", label: "Wireless EV charging" },
 { href: "/ai", label: "Agent Harness" },
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
 { href: "/evs", label: "Kenya EV guide" },
 { href: "/agent", label: "Precifarm Agent" },
 { href: "/training", label: `${trainingNavLabel} · T1–T3` },
 { href: "/about", label: "About us" },
 { href: "/faq", label: "FAQ" },
 { href: "/contact", label: "Contact us" },
 ],
 },
] as const;

export const footerProducts = [
 { label: "Pulse charger", href: "/charging/home" },
 { label: "Pulse+ charger", href: "/charging/pulse-plus" },
 { label: "Corridor DC", href: "/charging/corridor" },
 { label: "Boda Hub", href: "/charging/boda-hub" },
 { label: "Lipa Pole Pole", href: "/charging/home" },
 { label: "Agent Harness", href: "/ai" },
] as const;

export const footerLegalLinks = [
 { href: "/legal", label: "Legal & policies" },
 { href: "/legal/terms", label: "Terms" },
 { href: "/legal/privacy", label: "Privacy" },
 { href: "/legal/cookies", label: "Cookies" },
] as const;

export const footerSection = {
 tagline: "Powering the shift to electric transport.",
 taglineSupport:
 "We design, install, finance and operate EV charging and battery swapping in Kenya, and build private AI for engineering teams. M-Pesa on every product.",
 productsHeading: "Explore the range",
 socialLabel: "Follow Precifarm",
 meta: `${brand.africa} · M-Pesa on every product`,
} as const;
