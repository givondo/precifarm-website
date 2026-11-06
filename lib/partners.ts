/**
 * /partners: customer journeys. Each journey says what Precifarm does, what the partner provides, the steps
 * and the right enquiry (keys from lib/contact-interests.ts). Product status follows the programme labels:
 * Pulse available; Pulse+ in development; ARC Corridor pilot development; Boda Hub partner-run sites today,
 * the automated cabinet in development. No partners, sites or customers are named or implied.
 *
 * Section ids keep inbound links working: hub-hosts, fleet-logistics, boda-operators, dealers-installers, finance-oem.
 */

import type { ContactInterestKey } from "@/lib/contact-interests";
import type { StageKind } from "@/components/interior/StageLabel";

export const partnersPage = {
  hero: {
    eyebrow: "Partners",
    title: "Five ways to build electric transport with Precifarm.",
    lead: "Fleets, site hosts, property owners, installers and infrastructure partners each start somewhere different. Pick your journey to see what we do, what you bring and the first step.",
  },
} as const;

export type ProductRef = { name: string; stage: StageKind; stageLabel?: string; href: string };

export type PartnerJourney = {
  id: string;
  /** short label for the chooser */
  who: string;
  title: string;
  forWhom: string;
  icon: "fleet" | "site" | "property" | "installer" | "infrastructure";
  precifarm: readonly string[];
  partner: readonly string[];
  steps: readonly { title: string; text: string }[];
  products: readonly ProductRef[];
  cta: { interest: ContactInterestKey; label: string };
  secondary?: { href: string; label: string };
  /** optional sub-journey with its own anchor */
  sub?: { id: string; title: string; text: string; cta: { interest: ContactInterestKey; label: string } };
};

const pulse: ProductRef = { name: "Pulse charger", stage: "available", href: "/charging/home" };
const pulsePlus: ProductRef = { name: "Pulse+ charger", stage: "development", href: "/charging/pulse-plus" };
const corridor: ProductRef = { name: "ARC Corridor", stage: "pilot", href: "/charging/corridor" };
const boda: ProductRef = { name: "Boda Hub", stage: "development", href: "/charging/boda-hub" };

export const partnerJourneys: readonly PartnerJourney[] = [
  {
    id: "fleet-logistics",
    who: "Fleet operators",
    title: "Charge a fleet around its duty cycle.",
    forWhom: "Company cars, vans, taxis, ride-hail and delivery fleets that park at a yard or depot.",
    icon: "fleet",
    precifarm: [
      "Depot load study: vehicles, daily kWh, dwell windows and the site supply",
      "Charger plan with load sharing so the yard stays inside its connection",
      "Survey, installation and commissioning by one team",
      "Session records and M-Pesa billing for the fleet",
    ],
    partner: [
      "Vehicle list, daily distances and when each vehicle is parked",
      "Access to the yard, the meter and the main board",
      "Your supply details or a Kenya Power bill",
      "A named contact for dispatch and site access",
    ],
    steps: [
      { title: "Share the duty cycle", text: "Vehicles, routes, parking hours and the yard address." },
      { title: "Depot load study", text: "We size chargers and load sharing against your supply." },
      { title: "Design and quote", text: "A written design and quote, with Kenya Power steps if the supply needs work." },
      { title: "Install and commission", text: "Install, test and hand over with session records." },
    ],
    products: [pulse, pulsePlus, boda, corridor],
    cta: { interest: "pulse-plus", label: "Plan fleet charging" },
    secondary: { href: "/charging/engineering", label: "How we engineer a depot" },
    sub: {
      id: "boda-operators",
      title: "Electric boda fleets",
      text: "Riders swap batteries at partner-run Boda Hub sites today, with M-Pesa on every swap and one battery make per site. The automated Boda Hub cabinet is in development.",
      cta: { interest: "boda-hub", label: "Talk about Boda Hub" },
    },
  },
  {
    id: "hub-hosts",
    who: "Charging-site hosts",
    title: "Host public fast charging on your site.",
    forWhom: "Fuel stations, malls, hotels and roadside stops with parking, amenities and strong traffic, starting on the Nairobi to Kisumu route.",
    icon: "site",
    precifarm: [
      "Site assessment against five tests: demand, power and tariff, site and dwell, durable control, approvals",
      "Power study and connection application with Kenya Power",
      "A proposed ARC Corridor configuration around a certified OEM charger",
      "Commissioning, session pricing shown before each charge, and M-Pesa payment",
    ],
    partner: [
      "Parking bays with safe access and room for the electrical equipment",
      "Long-term site rights, agreed in writing",
      "Amenities drivers use while charging: shade, food, toilets",
      "Help with the landlord, county and utility approvals",
    ],
    steps: [
      { title: "Offer the site", text: "Location, plot plan, existing supply and traffic." },
      { title: "Five-test assessment", text: "We say plainly whether the site passes, and why." },
      { title: "Terms and design", text: "Commercial terms per site, then the power study and station layout." },
      { title: "Build and commission", text: "Civil and electrical works, testing, then public sessions." },
    ],
    products: [corridor],
    cta: { interest: "corridor", label: "Offer a charging site" },
    secondary: { href: "/charging/corridor", label: "ARC Corridor programme" },
  },
  {
    id: "property-owners",
    who: "Property owners",
    title: "Add charging to apartments, offices and estates.",
    forWhom: "Landlords, managing agents, offices, schools and gated estates whose residents or staff park for hours.",
    icon: "property",
    precifarm: [
      "Survey of the parking, the landlord supply and the cable routes",
      "A plan that starts small and grows bay by bay",
      "Load management so charging never overloads the building",
      "Installation, commissioning and support by one team",
    ],
    partner: [
      "Parking layout and which bays will charge first",
      "Access to the landlord meter and distribution boards",
      "Consent from residents or the management committee where needed",
      "A view on who pays: tenants, the property or a mix",
    ],
    steps: [
      { title: "Request a survey", text: "Address, bay count and the supply you know about." },
      { title: "Site survey", text: "We check boards, meters and routes on the day." },
      { title: "Phased plan and quote", text: "First bays now, a path for more as demand grows." },
      { title: "Install and hand over", text: "Tested circuits, chargers and a handover pack." },
    ],
    products: [pulse, pulsePlus],
    cta: { interest: "survey", label: "Request a site survey" },
    secondary: { href: "/charging/pulse-plus", label: "Pulse+ for shared parking" },
  },
  {
    id: "dealers-installers",
    who: "Installers",
    title: "Install Pulse chargers to Precifarm standards.",
    forWhom: "Licensed electrical contractors, EV dealers and installers who want to offer home charging.",
    icon: "installer",
    precifarm: [
      "The Pulse charger, its installation checklist and commissioning steps",
      "Lipa Pole Pole M-Pesa instalments for your customers",
      "Training on EV charging installation and safety",
      "Referral of surveyed leads in your area",
    ],
    partner: [
      "A licensed electrical contractor on every job",
      "Installation to the checklist, with test results recorded",
      "Your own customer relationship and service area",
      "Feedback from the field on the product and the process",
    ],
    steps: [
      { title: "Apply", text: "Company details, licences and the areas you cover." },
      { title: "Training", text: "Installation, testing and commissioning on the Pulse charger." },
      { title: "Install to the checklist", text: "Survey to commission on the Precifarm-approved checklist, results recorded." },
      { title: "Grow", text: "Take referrals and sell Pulse with Lipa Pole Pole on M-Pesa." },
    ],
    products: [pulse],
    cta: { interest: "dealer", label: "Apply as an installer" },
    secondary: { href: "/training", label: "EV charging training" },
  },
  {
    id: "finance-oem",
    who: "Infrastructure partners",
    title: "Finance, supply or connect charging infrastructure.",
    forWhom: "Financiers, vehicle makers, equipment suppliers and utilities working on electric transport in Kenya.",
    icon: "infrastructure",
    precifarm: [
      "Sites screened on demand, power and approvals before capital is committed",
      "Phased plans with a decision gate before each next site",
      "Metered session data once sites are commissioned",
      "Site engineering around certified OEM power equipment",
    ],
    partner: [
      "Capital, equipment, vehicles or grid capacity, depending on your role",
      "Clear terms on data, reporting and risk",
      "A technical contact for integration and approvals",
    ],
    steps: [
      { title: "Introduce your role", text: "Finance, equipment, vehicles or utility." },
      { title: "Shared screening", text: "We share the site pipeline and the evidence behind each stage." },
      { title: "Agree the structure", text: "Terms set per project, with decision gates." },
      { title: "Deliver and report", text: "Commission, meter and report against what was agreed." },
    ],
    products: [corridor, pulsePlus],
    cta: { interest: "finance", label: "Start a conversation" },
    secondary: { href: "/research", label: "Research programmes" },
  },
] as const;

/** Applies to every journey: what partners can rely on, stated without promises we cannot evidence. */
export const partnerPrinciples = [
  { title: "Survey before quote", text: "Every quote follows a survey or a site assessment. No capex without a feasible site and a power study." },
  { title: "Honest status", text: "Each product carries its stage: available, in development or pilot. Planned sites stay labelled planned." },
  { title: "Certified equipment", text: "Fast charging uses certified OEM power equipment; Precifarm engineers the site around it." },
  { title: "M-Pesa built in", text: "Payment and instalments run on M-Pesa, so drivers and riders need no bank card." },
] as const;
