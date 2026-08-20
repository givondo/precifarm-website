import { chargingOfferings } from "@/lib/charging";
import { privateHouseChargingFaqs as houseFaqs } from "@/lib/charging-faqs";
import { contact } from "@/lib/contact";

/** Homepage band — links to the dedicated private house charging page */
export const homeChargingHighlight = {
  eyebrow: "Private house charging",
  title: "House-based private charging on your own property",
  paragraphs: [
    "A DC fast charger on your driveway or car port — sized to your EV, on your meter, with no public access or shared hub queues.",
    "Optional Pod energy storage with solar and LiFePO₄ where you want dependable overnight top-up at home.",
    "Survey, installation and three-year aftersale support from the same Precifarm crews that commission our route hubs.",
  ],
  primaryLabel: "Private house charging",
  primaryHref: "/charging/private-house",
  secondaryLabel: "All charging services",
  secondaryHref: "/charging",
  tertiaryLabel: "Charging Hub",
  tertiaryHref: "/network",
} as const;

export const privateHouseChargingPage = {
  hero: {
    eyebrow: "Home charging",
    title: "Pulse charger and Pod energy storage on your property",
    description:
      "Precifarm installs the Pulse charger or Pod energy storage at private houses — on your land, for your vehicle, paid with M-Pesa. Keep a Spark charger in the boot for top-ups away from home.",
  },
  lead:
    "Start with the Pulse charger on your wall, add Pod energy storage when you want backup for weak-grid evenings, or keep the Spark charger in the boot. A home charging day costs about KES 140 instead of ~KES 1,000 in diesel per day. Precifarm surveys the site, installs and commissions the unit, and supports it for three years.",
  notThisPage:
    "This page is for private residential properties. For Depot and Boda Hub see Partners. For Corridor charging and public DC see the Charging Hub.",
  image: chargingOfferings.home,
  benefits: [
    {
      title: "Your property only",
      text: "Pulse charger or Pod energy storage on private land — no public access, no shared queues.",
    },
    {
      title: "About 90 minutes",
      text: "A typical 60 km Nairobi day on Pulse charger or Pod energy storage at home — paid with M-Pesa.",
    },
    {
      title: "Lipa Pole Pole",
      text: "Pulse charger from KES 79,000. Instalments on M-Pesa — no bank account required.",
    },
    {
      title: "Pod energy storage when the grid is weak",
      text: "5 or 10 kWh storage keeps a typical day charging when Kenya Power dips.",
    },
  ],
  included: [
    "Remote intake and private-property survey (earthing, consumer unit, cable route, parking)",
    "Written quote and single-line diagram for your house",
    "Pulse charger or Pod energy storage supply and installation on your property",
    "Commissioning, safety test and handover to the homeowner",
    "Remote monitoring and three-year aftersale support",
    "Optional Spark charger for top-ups away from home",
  ],
  propertyTypes: [
    "Detached house with private driveway or car port",
    "Townhouse with a dedicated private parking bay on your title",
    "House in a gated community where you own or control the parking spot",
  ],
  serviceAreas: contact.hubs,
} as const;

/** How house-based private charging differs from other Precifarm offerings */
export const chargingTypeComparison = [
  {
    type: "Home charging",
    where: "Your private house or townhouse",
    access: "Homeowner only — Pulse charger, Pod energy storage or Spark charger",
    typical: "Typical 60 km day in about 90 minutes on Pulse charger",
    page: "/charging/private-house",
  },
  {
    type: "Fleet charging",
    where: "Yards, campuses and boda stops",
    access: "Depot charging station and Boda Hub",
    typical: "About 120 minutes at the depot · under 5 minutes for a boda swap",
    page: "/partners",
  },
  {
    type: "Highway charging",
    where: "Corridor hubs and partner sites",
    access: "Public DC and contracted fleets",
    typical: "About 60 kWh in 30 minutes · pay with M-Pesa",
    page: "/network",
  },
] as const;

export const privateHouseChargingProcess = [
  {
    step: "1",
    stage: "Enquiry",
    detail: "Tell us your house location, EV model and send photos of the consumer unit and parking spot.",
    timing: "1–2 business days",
  },
  {
    step: "2",
    stage: "Home survey",
    detail: "Engineer visits your property — earthing, cable route, load and wall/pedestal position.",
    timing: "1 visit",
  },
  {
    step: "3",
    stage: "Quote",
    detail: "Fixed-scope quote and diagram for installation on your private property.",
    timing: "3–5 business days",
  },
  {
    step: "4",
    stage: "Install",
    detail: "DC charger mounted at your house, tested and connected to monitoring.",
    timing: "1–2 days",
  },
  {
    step: "5",
    stage: "Three-year aftersale",
    detail: "Warranty visits and remote monitoring for the unit at your home.",
    timing: "Ongoing",
  },
] as const;

export const privateHouseChargingPackages = [
  {
    name: "Pulse charger",
    bestFor: "House with stable supply — typical 60 km day in about 90 minutes",
    includes: [
      "7 kW Pulse charger wallbox on your property",
      "Installation from consumer unit to parking spot",
      "Lipa Pole Pole on M-Pesa · from KES 79,000",
    ],
  },
  {
    name: "Pod energy storage",
    bestFor: "Weak-grid evenings — storage keeps a typical day charging in about 90 minutes",
    includes: [
      "Pod energy storage with 5 or 10 kWh LiFePO₄ at the house",
      "Optional rooftop solar",
      "Lipa Pole Pole on M-Pesa · from KES 295,000",
    ],
  },
] as const;

export const privateHouseChargingFaqs = houseFaqs;

export function privateHouseSurveyMailto(): string {
  const subject = encodeURIComponent("Private house charging survey request");
  const body = encodeURIComponent(
    [
      "Hello Precifarm,",
      "",
      "I would like a survey for house-based private charging.",
      "",
      "House location:",
      "Property type (detached / townhouse / gated community house):",
      "Vehicle make and model:",
      "Private parking (driveway / car port / dedicated bay):",
      "Interest: Grid-connected DC / Solar + storage at home",
      "Contact phone:",
      "",
      "Additional notes:",
    ].join("\n"),
  );

  return `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

/** @deprecated Use privateHouseChargingPage — kept for any stale imports */
export const homeChargingPage = privateHouseChargingPage;
export const homeChargingProcess = privateHouseChargingProcess;
export const homeChargingPackages = privateHouseChargingPackages;
export const homeChargingFaqs = privateHouseChargingFaqs;
export const homeChargingSurveyMailto = privateHouseSurveyMailto;
