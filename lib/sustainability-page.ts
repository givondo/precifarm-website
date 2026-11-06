import { siteCtas, sitePricing } from "@/lib/site-copy";

/**
 * /sustainability. Precifarm has no commissioned site yet (lib/hub-locations.ts), so there are no
 * measured operational results to report. Every figure here is either a published price or label a
 * reader can check today, or a target with a date. Keep it that way until a method is published.
 */

export type GoalProgress = "done" | "estimate" | "planned";

/** How a reader should treat a figure on this page. */
export type EvidenceClass = "checkable" | "target" | "pending";

export const evidenceClasses: Record<EvidenceClass, { label: string; text: string }> = {
  checkable: { label: "Checkable today", text: "A published price, label or offer you can verify on this site now. Not a measured impact." },
  target: { label: "Target", text: "A goal with a date. Not achieved, and not a forecast of results." },
  pending: { label: "Method pending", text: "A figure we will only publish once the counting method is public." },
};

export const sustainabilitySectionNav = [
  { href: "#evidence", label: "How to read this" },
  { href: "#today", label: "Checkable today" },
  { href: "#goals", label: "2030 targets" },
  { href: "#methods", label: "Methods" },
  { href: "#batteries", label: "Batteries" },
  { href: "#people", label: "People" },
] as const;

/** Figures a reader can check on the site today, each with the basis the site already states. */
export const checkableFigures = [
  {
    value: sitePricing.homeDay,
    label: "Typical home charging day",
    basis: "A typical Nairobi day of about 60 km, roughly 10 kWh, charged at home on your own Kenya Power tariff.",
    caveat: "Your cost depends on your tariff, your vehicle's efficiency and the kilometres you drive.",
    href: "/charging/home",
    link: "Home charging",
  },
  {
    value: sitePricing.dieselDay,
    label: "Diesel for the same day",
    basis: "The comparison the site uses for the same 60 km day.",
    caveat: "The fuel consumption and pump price behind this comparison are not yet published.",
    href: "/guides/kenya-power-ev-charging-tariff",
    link: "EV tariff guide",
  },
  {
    value: sitePricing.lipaFrom,
    label: "Lipa Pole Pole on M-Pesa",
    basis: "Instalments on the Pulse charger, with the full price shown before you confirm.",
    caveat: "An offer, not an impact result.",
    href: "/charging/home",
    link: "Pulse and Lipa Pole Pole",
  },
  {
    value: "Every listing",
    label: "Charging Hub status labels",
    basis: "Each site on the map is labelled planned or partner. No Precifarm site is shown as open until it is commissioned.",
    caveat: "Labels describe status, not availability in real time.",
    href: siteCtas.chargingHub.href,
    link: "Open Charging Hub",
  },
] as const;

/** What each future figure needs before it can appear on this page. */
export const pendingMeasures = [
  {
    id: "methodology-disclosure",
    title: "Electric kilometres",
    measure: "Fossil-fuel kilometres replaced by electric kilometres on Precifarm charging.",
    prerequisite: "A published counting method, before any running total is shown.",
  },
  {
    id: "pcf",
    title: "Product carbon footprint",
    measure: "Carbon footprint of the Pulse charger and Corridor charging.",
    prerequisite: "An independent carbon study. None has started.",
  },
  {
    id: "renewable",
    title: "Solar share per site",
    measure: "How much of each charging site's energy comes from its own solar panels.",
    prerequisite: "Commissioned sites with metered solar. The first Corridor site is planned without storage.",
  },
  {
    id: "takeback",
    title: "Batteries taken back",
    measure: "Deployed packs collected and recycled in Kenya.",
    prerequisite: "A contracted recycling partner in Kenya. None is signed yet.",
  },
  {
    id: "annual-report",
    title: "Annual impact report",
    measure: "Progress on all six 2030 targets in one document.",
    prerequisite: "The methods above, published first.",
  },
] as const;

export const reportingPublished = [
  { id: "pricing", title: "Charging prices in KES", detail: "Home-day and public tariffs on product pages.", href: "/charging/home" },
  { id: "hub-labels", title: "Charging Hub labels", detail: "Planned and partner status on every listing.", href: siteCtas.chargingHub.href },
  { id: "lfp", title: "Pulse charger specs", detail: "Ratings and protection, from the engineering register.", href: "/charging/home" },
  { id: "aftersale", title: "Three-year aftersale care", detail: "Coverage on Pulse home installs we complete.", href: "/charging/home" },
  { id: "engineering", title: "Install standards", detail: "Survey, wiring and handover requirements.", href: "/charging/engineering" },
] as const;

export const circularitySteps = [
  { step: "01", title: "Watch", text: "Remote monitoring on units we maintain.", kind: "practice" as const },
  { step: "02", title: "Service", text: "Preventive checks before a fault takes a charger offline.", kind: "practice" as const },
  { step: "03", title: "Repair", text: "Fix hardware before replacing it.", kind: "practice" as const },
  { step: "04", title: "Reuse", text: "Suitable packs used for backup power where that makes sense.", kind: "practice" as const },
  { step: "05", title: "Collect", text: "End-of-life batteries picked up through a Kenya partner.", kind: "target" as const },
  { step: "06", title: "Recycle", text: "Materials recovered under Kenya's rules for taking back used products.", kind: "target" as const },
] as const;

export const peopleRows = [
  { who: "Drivers", benefit: "A cheaper day on the road", text: "Home charging cost is published in KES next to diesel, so the saving can be checked before you switch." },
  { who: "Households", benefit: "Pay over months", text: "Lipa Pole Pole on M-Pesa shows the full Pulse price before you confirm, then splits it into monthly instalments." },
  { who: "Businesses", benefit: "One energy bill", text: "Fleet charging at the depot, monitored, with one team behind the install." },
  { who: "Communities", benefit: "Cleaner street air", text: "Less exhaust where bodas, vans and cars actually run." },
  { who: "Technicians", benefit: "Trained on Precifarm kit", text: "Install, fault-finding and customer handover on the chargers we deploy.", href: "/training", link: "EV charging training" },
  { who: "Riders", benefit: "Back on shift fast", text: "Boda Hub is designed for a swap in under five minutes. It is in development." },
] as const;

export const sustainabilityPage = {
  hero: {
    eyebrow: "Sustainability",
    headline: "Make clean charging the affordable choice for Kenya.",
    lead: "Our 2030 goal, with six targets behind it. We report what you can check today, and we label every target as a target.",
    primaryCta: { href: "#goals", label: "See the 2030 targets" },
    secondaryCta: { href: "#methods", label: "How we will measure" },
  },
  evidenceSection: {
    eyebrow: "How to read this page",
    title: "No verified impact results yet. Here is what each number is.",
    lead: "Precifarm has not yet commissioned a charging site, so there are no measured operational results to report. Every figure below carries one of three labels.",
  },
  todaySection: {
    eyebrow: "Checkable today",
    title: "Published prices and labels, with their basis.",
    lead: "These are offers and estimates you can check on this site. They describe what charging costs, not what Precifarm has achieved.",
  },
  goalsSection: {
    eyebrow: "2030 targets",
    title: "Six targets for 2030.",
    lead: "Each target shows where it stands today. “In place” means an offer or practice exists, not that an outcome has been measured.",
  },
  ambition: {
    value: "1 billion km",
    title: "A 2050 ambition",
    text: "By 2050, we aim to help replace 1 billion kilometres of fossil-fuel driving with electric kilometres across Kenya. That number is a target. We will publish how we count before any running total appears on this page.",
  },
  methodsSection: {
    eyebrow: "Methods",
    title: "What must exist before each figure is published.",
    lead: "We publish annual impact reports once the counting method is ready, so every figure can be checked. Until then, these stay blank on purpose.",
  },
  batteriesSection: {
    eyebrow: "Batteries",
    title: "Maintain, repair and reuse before recycling.",
    lead: "Boda swap batteries, and any storage at later Corridor sites, are to be watched and serviced in the field. A contracted recycling partner in Kenya is a 2030 target.",
  },
  peopleSection: {
    eyebrow: "People",
    title: "Who clean charging is for, and who it needs.",
    lead: "Home chargers, swap cabinets and highway stops need people nearby to survey, fit, run and repair them.",
  },
  sdgNote:
    "This work aligns with UN Sustainable Development Goals 7, 9, 11 and 13: affordable and clean energy, industry and infrastructure, sustainable cities, and climate action. Precifarm is not a UN partner.",
  goalGroups: [
    {
      theme: "Home charging",
      goals: [
        {
          id: "1",
          shortName: "Cheaper than diesel",
          target: "Most home customers pay less than diesel for a typical 60 km day",
          by: "2030",
          today: "About " + sitePricing.homeDay + " to charge 60 km at home, against about " + sitePricing.dieselDay + " in diesel for the same distance (published estimate).",
          progress: "estimate" as GoalProgress,
        },
        {
          id: "3",
          shortName: "Lipa Pole Pole",
          target: "Offer Lipa Pole Pole on every Pulse home survey we complete",
          by: "2030",
          today: "Offered from " + sitePricing.lipaFrom + " on the Pulse charger.",
          progress: "done" as GoalProgress,
        },
      ],
    },
    {
      theme: "Network and sites",
      goals: [
        {
          id: "2",
          shortName: "Honest Hub labels",
          target: "Keep every public charger listing clearly labelled",
          by: "2030",
          today: "Every site on Charging Hub is labelled planned or partner.",
          progress: "done" as GoalProgress,
        },
        {
          id: "4",
          shortName: "Solar on hubs",
          target: "Solar plus storage on every Corridor site that needs it",
          by: "2030",
          today: "The first Corridor site is planned without storage; storage follows the Kenya Power study for each later site.",
          progress: "planned" as GoalProgress,
        },
      ],
    },
    {
      theme: "Batteries and data",
      goals: [
        {
          id: "5",
          shortName: "Battery recycling",
          target: "A Kenya partner takes back used batteries",
          by: "2030",
          today: "We have not signed a recycling partner in Kenya yet.",
          progress: "planned" as GoalProgress,
        },
        {
          id: "6",
          shortName: "Carbon study",
          target: "An outside review of Pulse and Corridor",
          by: "2030",
          today: "Product specs are on the site. No independent carbon study has started.",
          progress: "planned" as GoalProgress,
        },
      ],
    },
  ],
} as const;

export const goalProgressLabel: Record<GoalProgress, string> = {
  done: "In place",
  estimate: "Estimate only",
  planned: "Not started",
};

export type SustainabilityGoal = (typeof sustainabilityPage.goalGroups)[number]["goals"][number];
export type SustainabilityGoalWithTheme = SustainabilityGoal & { theme: string };

/** Goals 1 to 6 in order, with their theme. */
export const sustainabilityGoalsOrdered: SustainabilityGoalWithTheme[] = sustainabilityPage.goalGroups
  .flatMap((group) => group.goals.map((goal) => ({ ...goal, theme: group.theme })))
  .sort((a, b) => Number(a.id) - Number(b.id));
