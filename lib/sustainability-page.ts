import { productImages } from "@/lib/product-images";
import { siteCtas, sitePricing } from "@/lib/site-copy";

export type GoalProgress = "done" | "underway" | "planned";

export const sustainabilitySectionNav = [
 { href: "#impact", label: "Why it matters" },
 { href: "#social", label: "Jobs & towns" },
 { href: "#commitment", label: "2030 goals" },
 { href: "#circularity", label: "Batteries" },
 { href: "#outlook", label: "Reporting" },
] as const;

export const sustainabilityHeroMetrics = [
 {
 value: sitePricing.homeDay,
 label: "Typical home charging day",
 note: "Diesel for the same ~60 km is about " + sitePricing.dieselDay,
 },
 {
 value: sitePricing.lipaFrom,
 label: "Lipa Pole Pole on M-Pesa",
 note: "Instalments on the Pulse charger",
 },
 {
 value: "100%",
 label: "Honest Hub labels",
 note: "Open, coming soon or partner on every listing",
 },
] as const;

export const whyItMattersCards = [
 {
 id: "drivers",
 icon: "drivers",
 title: "Drivers",
 headline: "A cheaper day on the road",
 text: "Home charging for a typical 60 km day is published in KES next to diesel, so the saving is easy to check before you switch.",
 },
 {
 id: "households",
 icon: "households",
 title: "Households",
 headline: "Pay over months, not all at once",
 text: "Lipa Pole Pole on M-Pesa shows the full Pulse price before you confirm, then splits it into monthly instalments.",
 },
 {
 id: "businesses",
 icon: "businesses",
 title: "Businesses",
 headline: "One energy bill instead of a moving diesel price",
 text: "Fleet charging at the depot, with the site monitored and one team behind the install.",
 },
 {
 id: "communities",
 icon: "communities",
 title: "Communities",
 headline: "Cleaner air on the streets people use",
 text: "Less exhaust where bodas, vans and cars actually run.",
 },
] as const;

export const socialImpactCards = [
 {
 id: "jobs",
 icon: "jobs",
 title: "Local jobs",
 headline: "Installers and hub hosts",
 text: "Home chargers, swap cabinets and highway chargers all need people to fit, run and fix them as the network grows.",
 },
 {
 id: "technicians",
 icon: "technicians",
 title: "Technicians",
 headline: "Trained on Precifarm kit",
 text: "Field training on the chargers we deploy: install, fault-finding and handover to the customer.",
 href: "/training",
 label: "EV charging training",
 },
 {
 id: "operators",
 icon: "operators",
 title: "Operators",
 headline: "Back on shift fast",
 text: "Boda swap in under five minutes. Fleet charging while vehicles are parked, sized to the working day.",
 },
 {
 id: "smes",
 icon: "smes",
 title: "Shops & SMEs",
 headline: "Power for the business",
 text: "Solar, storage and charging sized for fridges, tills and back-office load: one survey, one install team.",
 href: "/charging/engineering",
 label: "Site design",
 },
] as const;

export const circularitySteps = [
 { step: "01", title: "Watch", text: "Remote monitoring on hubs and home units we maintain." },
 { step: "02", title: "Service", text: "Preventive checks before a fault takes a charger offline." },
 { step: "03", title: "Repair", text: "Fix hardware before replacing it." },
 { step: "04", title: "Reuse", text: "Suitable packs used for backup power where that makes sense." },
 { step: "05", title: "Collect", text: "End-of-life batteries picked up through a Kenya partner by 2030." },
 { step: "06", title: "Recycle", text: "Materials recovered under Kenya's rules for taking back used products." },
] as const;

export const reportingPublished = [
 {
 id: "pricing",
 title: "Charging prices in KES",
 detail: "Home-day and public tariffs on product pages.",
 href: "/charging/home",
 },
 {
 id: "hub-labels",
 title: "Charging Hub labels",
 detail: "Open, coming soon and partner on every listing.",
 href: siteCtas.chargingHub.href,
 },
 {
 id: "lfp",
 title: "Pulse charger specs",
 detail: "Ratings and protection on the home charging page, labelled as design targets until tested.",
 href: "/charging/home",
 },
 {
 id: "aftersale",
 title: "Three-year aftersale care",
 detail: "Coverage on Pulse home installs we complete.",
 href: "/contact",
 },
 {
 id: "engineering",
 title: "Install standards",
 detail: "Survey, wiring and handover requirements.",
 href: "/charging/engineering",
 },
] as const;

export const reportingPlanned = [
 {
 id: "methodology-disclosure",
 title: "How we count electric kilometres",
 detail: "Published before any running kilometre or CO₂ total on this site.",
 },
 {
 id: "pcf",
 title: "Independent carbon study",
 detail: "An outside review of Pulse and Corridor.",
 },
 {
 id: "takeback",
 title: "Battery recycling partner",
 detail: "Contracted take-back in Kenya for deployed packs.",
 },
 {
 id: "renewable",
 title: "Solar share per site",
 detail: "How much of each hub's power comes from solar panels.",
 },
 {
 id: "annual-report",
 title: "First annual report",
 detail: "Progress on all six 2030 goals in one document.",
 },
] as const;

export const sustainabilityPage = {
 hero: {
 eyebrow: "Our 2030 goal",
 headline: "Make clean charging the affordable choice for Kenya.",
 lead:
 "By 2050, we aim to help replace 1 billion kilometres of fossil-fuel driving with electric kilometres across Kenya.",
 description:
 "Pulse lets you charge your EV at home, and Lipa Pole Pole spreads the cost on M-Pesa with the full price shown before you commit. Every product is labelled by its stage: available, pilot, in development or research.",
 image: productImages.pulse,
 imageCaption: "Pulse charger, 7 kW home wallbox.",
 primaryCta: { href: siteCtas.exploreCharging.href, label: siteCtas.exploreCharging.label },
 secondaryCta: { href: "#commitment", label: "See the 2030 goals" },
 },
 whySection: {
 eyebrow: "Why it matters",
 title: "Every kilometre starts with charging that works.",
 description:
 "People feel this in the money they spend, the time vehicles sit still, and the air on the streets they use.",
 },
 socialSection: {
 eyebrow: "Jobs & towns",
 title: "Every install needs fitters, operators and technicians, not only drivers.",
 description:
 "Home chargers, swap cabinets and highway stops need people nearby to survey, fit, run and repair them.",
 },
 circularitySection: {
 eyebrow: "Batteries",
 title: "We maintain, repair and reuse packs before they are recycled.",
 description:
 "Boda swap batteries, and any storage at Corridor sites, are watched and serviced in the field. A contracted recycling partner in Kenya is a 2030 goal, not a live take-back scheme.",
 },
 commitmentSection: {
 eyebrow: "2030 goals",
 title: "Six goals for 2030.",
 description: "The 1 billion kilometre figure is a 2050 ambition, not a running total.",
 },
 outlookSection: {
 eyebrow: "Reporting",
 title: "What you can check on this site today, and what we still have to publish.",
 description:
 "We do not show annual impact reports or outside certificates until the counting method is ready. The 1 billion kilometre target stays labelled as an ambition until then.",
 ambition: {
 value: "1 billion km",
 title: "A 2050 ambition, not a live counter",
 text: "By 2050, we aim to help replace 1 billion kilometres of fossil-fuel driving with electric kilometres across Kenya. That number is a target. We will publish how we count before any running total appears on this page.",
 },
 sdgNote:
 "This work aligns with UN Sustainable Development Goals 7, 9, 11 and 13: affordable and clean energy, industry and infrastructure, sustainable cities, and climate action. Precifarm is not a UN partner.",
 },
 goalGroups: [
 {
 theme: "Home charging",
 goals: [
 {
 id: "1",
 shortName: "Cheaper than diesel",
 headline: "Home charging for a typical 60 km day costs about " + sitePricing.homeDay + ", not about " + sitePricing.dieselDay + " in diesel",
 goal: "Home charging costs less than diesel for a typical daily drive",
 target: "Most home customers pay less than diesel for a typical 60 km day",
 by: "2030",
 today: "About " + sitePricing.homeDay + " to charge 60 km at home. About " + sitePricing.dieselDay + " in diesel for that same distance.",
 progress: "underway" as GoalProgress,
 },
 {
 id: "3",
 shortName: "Lipa Pole Pole",
 headline: "Lipa Pole Pole from " + sitePricing.lipaFrom + " on the Pulse charger",
 goal: "Pay for home charging in M-Pesa instalments",
 target: "Offer Lipa Pole Pole on every Pulse home survey we complete",
 by: "2030",
 today: "From " + sitePricing.lipaFrom + " on the Pulse charger",
 progress: "done" as GoalProgress,
 },
 ],
 },
 {
 theme: "Network & sites",
 goals: [
 {
 id: "2",
 shortName: "Honest Hub labels",
 headline: "Every Charging Hub listing says open, coming soon or partner",
 goal: "Honest status on every public charger listing",
 target: "Keep every listing clearly labelled",
 by: "2030",
 today: "Every site on Charging Hub is marked open, coming soon or partner",
 progress: "done" as GoalProgress,
 },
 {
 id: "4",
 shortName: "Solar on hubs",
 headline: "Solar panels and battery storage on charging sites that need them",
 goal: "Solar and storage on operated sites that need it",
 target: "Solar plus storage on every Corridor site that needs it",
 by: "2030",
 today: "The first Corridor site is planned without storage; storage follows the Kenya Power study for each later site. No Corridor site is commissioned yet.",
 progress: "underway" as GoalProgress,
 },
 ],
 },
 {
 theme: "Batteries & data",
 goals: [
 {
 id: "5",
 shortName: "Battery recycling",
 headline: "A contracted battery recycling partner in Kenya",
 goal: "Take-back and recycling for deployed batteries",
 target: "A Kenya partner takes back used batteries",
 by: "2030",
 today: "We have not signed a recycling partner in Kenya yet",
 progress: "planned" as GoalProgress,
 },
 {
 id: "6",
 shortName: "Carbon study",
 headline: "An independent carbon study for Pulse and Corridor",
 goal: "Published carbon footprints for key products",
 target: "An outside review of Pulse and Corridor",
 by: "2030",
 today: "Product specs are on the site. No independent carbon study has started.",
 progress: "planned" as GoalProgress,
 },
 ],
 },
 ],
 cta: {
 title: "More electric kilometres. Less fossil fuel. Better charging for Kenya.",
 description:
 "From a home wallbox to a highway stop, Precifarm installs charging and storage with honest Hub labels and published KES prices.",
 primaryHref: siteCtas.exploreCharging.href,
 primaryLabel: siteCtas.exploreCharging.label,
 secondaryHref: siteCtas.chargingHub.href,
 secondaryLabel: "Open Charging Hub",
 },
} as const;

export const goalProgressLabel: Record<GoalProgress, string> = {
 done: "Live today",
 underway: "Rolling out",
 planned: "Planned",
};

export type SustainabilityGoal = (typeof sustainabilityPage.goalGroups)[number]["goals"][number];

export type SustainabilityGoalWithTheme = SustainabilityGoal & { theme: string };

export const sustainabilityGoals: SustainabilityGoal[] = sustainabilityPage.goalGroups.flatMap((g) => [...g.goals]);

/** Goals 1–6 in order, with theme label for display */
export const sustainabilityGoalsOrdered: SustainabilityGoalWithTheme[] = sustainabilityPage.goalGroups
 .flatMap((group) => group.goals.map((goal) => ({ ...goal, theme: group.theme })))
 .sort((a, b) => Number(a.id) - Number(b.id));
