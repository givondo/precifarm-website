import { privateHouseChargingFaqs as houseFaqs } from "@/lib/charging-faqs";
import { contact } from "@/lib/contact";
import { productImages } from "@/lib/product-images";
import { sitePricing } from "@/lib/site-copy";

/** Homepage band — links to the dedicated private house charging page */
export const homeChargingHighlight = {
  eyebrow: "Private house charging",
  title: "House-based private charging on your own property",
  paragraphs: [
    "A 7 kW Pulse charger on your driveway or car port — sized to your EV, on your meter, with no public access or shared hub queues.",
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
    title: "Pulse and Pod on your property",
    description:
      "Wallbox or storage on your land, for your car — survey, install and three-year care from one team. Lipa Pole Pole on M-Pesa.",
  },
  lead:
    "We size the unit to your EV and your meter, install on your parking spot, and keep it online. Optional Spark for top-ups away from home.",
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
      title: "Typical day in ~90 min",
      text: "About 60 km on Pulse or Pod at home.",
    },
    {
      title: "Lipa Pole Pole",
      text: `Pulse from ${sitePricing.pulseFrom}. Instalments from ${sitePricing.lipaFrom} on M-Pesa.`,
    },
    {
      title: "Weak grid cover",
      text: "Pod adds 5 or 10 kWh when Kenya Power dips.",
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
    bestFor: "House with stable supply — typical 60 km day in about 90 minutes",
    includes: [
      "7 kW Pulse charger wallbox on your property",
      "Installation from consumer unit to parking spot",
      "Lipa Pole Pole on M-Pesa · from KES 79,000",
    ],
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
  },
  {
    name: "Pod energy storage",
    bestFor: "Weak-grid evenings — storage keeps a typical day charging in about 90 minutes",
    includes: [
      "Pod energy storage with 5 or 10 kWh LiFePO₄ at the house",
      "Optional rooftop solar",
      "Lipa Pole Pole on M-Pesa · from KES 295,000",
    ],
    image: productImages.podHomeHero.src,
    imageAlt: productImages.podHomeHero.alt,
    brand: productImages.pod.brand,
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
      "Interest: Pulse charger / Pod energy storage / optional rooftop solar",
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
