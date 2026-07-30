import { chargingOfferings } from "@/lib/charging";
import { contact } from "@/lib/contact";

/** Homepage band — links to the dedicated private house charging page */
export const homeChargingHighlight = {
  eyebrow: "Private house charging",
  title: "House-based private charging on your own property",
  paragraphs: [
    "A DC fast charger on your driveway or car port — sized to your EV, on your meter, with no public access or shared hub queues.",
    "Optional Neura Pod solar and storage where you want dependable overnight top-up at home.",
    "Survey, install and five-year support from the same Precifarm crews that commission our route hubs.",
  ],
  primaryLabel: "Private house charging",
  primaryHref: "/charging/private-house",
  secondaryLabel: "All charging services",
  secondaryHref: "/charging",
  tertiaryLabel: "Charge map",
  tertiaryHref: "/network",
} as const;

export const privateHouseChargingPage = {
  hero: {
    eyebrow: "Private house charging",
    title: "House-based private charging — on your property, your meter",
    description:
      "Precifarm installs DC fast chargers at private houses and townhouses — on your land, for your vehicle only. Not a public hub, not a shared commercial site.",
  },
  lead:
    "House-based private charging means a charger at your home that you control: your driveway or car port, your consumer unit, your overnight schedule. Precifarm surveys the site, installs and commissions the unit, and supports it for five years — with the same engineering discipline we use on intercity route hubs.",
  notThisPage:
    "This page is for private residential properties. For public route hubs see the Charge Map. For schools, campuses and industrial private-site stations see Charging services.",
  image: chargingOfferings.home,
  benefits: [
    {
      title: "Your property only",
      text: "Charger on private land — no public access, no shared queues, no hub timetables.",
    },
    {
      title: "Sized to your EV",
      text: "DC output matched to your battery and daily mileage at home, not an oversized public unit.",
    },
    {
      title: "Same hub engineers",
      text: "Regional Precifarm crews install and commission with route-hub checklists and monitoring.",
    },
    {
      title: "Solar optional",
      text: "Neura Pod solar and storage integration where you want lower grid cost or backup at home.",
    },
  ],
  included: [
    "Remote intake and private-property survey (earthing, consumer unit, cable route, parking)",
    "Written quote and single-line diagram for your house",
    "DC charger supply and install on your property (CCS2 or Type 2 for your vehicle)",
    "Commissioning, safety test and handover to the homeowner",
    "Remote monitoring and five-year engineering support",
    "Optional Neura Pod solar and LiFePO₄ storage at the house",
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
    type: "House-based private charging",
    where: "Your private house or townhouse",
    access: "Homeowner only — private property",
    typical: "Overnight top-up, daily commute EV",
    page: "/charging/private-house",
  },
  {
    type: "Route charging hubs",
    where: "Public intercity stops on Nairobi–Kisumu and partner routes",
    access: "Coaches, fleets and public sessions",
    typical: "Scheduled coach windows and fleet dwell",
    page: "/network",
  },
  {
    type: "Private in-house stations",
    where: "Schools, campuses, estates and industrial sites",
    access: "Organisation staff, fleet and visitors",
    typical: "Multi-bay sites on private commercial land",
    page: "/charging",
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
    detail: "Fixed-scope quote and diagram for install on your private property.",
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
    stage: "Five-year support",
    detail: "Warranty visits and remote monitoring for the unit at your home.",
    timing: "Ongoing",
  },
] as const;

export const privateHouseChargingPackages = [
  {
    name: "Grid-connected DC",
    bestFor: "House with stable supply and private parking",
    includes: [
      "DC wallbox or pedestal on your property",
      "Install from consumer unit to parking spot",
      "Homeowner handover and monitoring",
    ],
  },
  {
    name: "Solar + storage at home",
    bestFor: "Households cutting grid cost or needing backup",
    includes: [
      "Neura Pod solar and LiFePO₄ at the house",
      "DC charger with load management",
      "Private-property commissioning only",
    ],
  },
] as const;

export const privateHouseChargingFaqs = [
  {
    question: "Is this different from a public charging hub?",
    answer:
      "Yes. House-based private charging is on your property for your vehicle only. Route hubs on the Charge Map serve scheduled coaches and public sessions.",
  },
  {
    question: "Can you install at an apartment?",
    answer:
      "Only where you have a dedicated private parking bay and written approval from the landlord or management. The charger serves your unit, not a shared public bay.",
  },
  {
    question: "What about a whole estate or school?",
    answer:
      "Multi-bay private-site stations for organisations are covered under Private in-house stations on our Charging services page — not house-based private charging.",
  },
  {
    question: "How long does a house install take?",
    answer:
      "Most single-house jobs finish in one to two days on site after survey and quote approval.",
  },
] as const;

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
