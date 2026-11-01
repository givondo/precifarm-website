import { privateHouseChargingFaqs as houseFaqs } from "@/lib/charging-faqs";
import { contact } from "@/lib/contact";
import { homePageImages } from "@/lib/home-page-images";
import { productImages } from "@/lib/product-images";
import { sitePricing } from "@/lib/site-copy";

/** Homepage band — links to the dedicated private house charging page */
export const homeChargingHighlight = {
  eyebrow: "Featured · Pulse charger",
  title: "Wake up charged at home",
  paragraphs: [
    `7 kW Pulse charger on your driveway — sized to your EV and meter, with no public queues. From ${sitePricing.pulseFrom}, or Lipa Pole Pole from ${sitePricing.lipaFrom} on M-Pesa.`,
    "Pulse trims its current to stay inside your supply, so the main fuse never trips while the car charges.",
    "Survey, install and 3 years of aftersale from the same team that engineers and runs our route hubs.",
  ],
  primaryLabel: "Explore Pulse charger",
  primaryHref: "/charging/home",
  secondaryLabel: "Request a survey",
  secondaryHref: "/charging/home#survey",
  image: homePageImages.featuredPulse.src,
  imageAlt: homePageImages.featuredPulse.alt,
} as const;

export const privateHouseChargingPage = {
  hero: {
    eyebrow: "Home charging",
    title: "Pulse charger on your property",
    description:
      "A tethered Type 2 wallbox on your land, for your car: survey, install and three-year care from one team. Lipa Pole Pole on M-Pesa.",
  },
  lead:
    "We size the unit to your EV and your meter, install on your parking spot, and keep it online.",
  notThisPage:
    "Residential only. Fleet depots → Partners. Public DC → Charging Hub.",
  image: {
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
  },
  benefits: [
    {
      title: "Your property only",
      text: "Private parking — no public access or shared queues.",
    },
    {
      title: "Typical day in under two hours",
      text: "About 60 km put back overnight on a Pulse charger at home.",
    },
    {
      title: "Lipa Pole Pole",
      text: `Pulse charger from ${sitePricing.pulseFrom}. Instalments from ${sitePricing.lipaFrom} on M-Pesa.`,
    },
    {
      title: "Safe by design",
      text: "Charging current never runs through a circuit board. An independent safety processor controls the contactor.",
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
    detail: "Pulse charger or Pod energy storage mounted at your house, tested and connected to monitoring.",
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
    bestFor: "Buy outright: a typical 60 km day in under two hours",
    includes: [
      "7 kW Pulse charger wallbox on your property",
      "Installation from consumer unit to parking spot",
      "From KES 79,000, paid on survey approval",
    ],
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
  },
  {
    name: "Pulse charger on Lipa Pole Pole",
    bestFor: "Spread the cost: the same Pulse install, paid in M-Pesa instalments",
    includes: [
      "7 kW Pulse charger wallbox on your property",
      "Installation from consumer unit to parking spot",
      `Lipa Pole Pole on M-Pesa · from ${sitePricing.lipaFrom}, with deposit, monthly amount and total shown first`,
    ],
    image: productImages.financing.src,
    imageAlt: productImages.financing.alt,
    brand: productImages.financing.brand,
  },
] as const;

export const privateHouseChargingFaqs = houseFaqs;

export const homeSurveyForm = {
  title: "Request a home charging survey.",
  description:
    "Tell us about your house and vehicle. We visit the site, send a quote, and can start Lipa Pole Pole on M-Pesa after you approve.",
  products: [
    { id: "pulse", label: "Pulse charger — home charging" },
    { id: "unsure", label: "Not sure yet" },
  ],
  propertyTypes: ["Detached house", "Townhouse", "Gated community", "Other"],
  parkingTypes: ["Driveway", "Car port", "Dedicated parking bay", "Other"],
  lipaLabel: "I want Lipa Pole Pole instalments on M-Pesa (from " + sitePricing.lipaFrom + ")",
  successTitle: "We have your survey request.",
  successText: "Our installation team will call within one business day to set a site visit.",
} as const;

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
      "Interest: Pulse charger / Lipa Pole Pole instalments",
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
