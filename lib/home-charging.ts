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
    "Residential only. Fleet depots: see Pulse+. Public DC charging: see the Charging Hub.",
  image: {
    image: productImages.pulse.src,
    imageAlt: productImages.pulse.alt,
    brand: productImages.pulse.brand,
  },
  benefits: [
    {
      title: "Your property only",
      text: "Private parking, with no public access or shared queues.",
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
    "Pulse charger supply and installation on your property",
    "Commissioning, safety test and handover to the homeowner",
    "Remote monitoring and three-year aftersale support",
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
    timing: "1 to 2 business days",
  },
  {
    step: "2",
    stage: "Home survey",
    detail: "An engineer visits your property: earthing, cable route, load and the wall or pedestal position.",
    timing: "1 visit",
  },
  {
    step: "3",
    stage: "Quote",
    detail: "Fixed-scope quote and diagram for installation on your private property.",
    timing: "3 to 5 business days",
  },
  {
    step: "4",
    stage: "Install",
    detail: "Pulse charger mounted at your house, tested and connected to monitoring.",
    timing: "1 to 2 days",
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
    { id: "pulse", label: "Pulse charger (home charging)" },
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

/* ------------------------------------------------------------------ */
/* /charging/home product detail (interior redesign, Nov 2026)          */
/* Figures: register (lib/pages/register.ts) and the copy above only.   */
/* ------------------------------------------------------------------ */

export const pulseDetail = {
  inPage: [
    { href: "#on-the-wall", label: "On the wall" },
    { href: "#installation", label: "Installation" },
    { href: "#charge-time", label: "Charge time" },
    { href: "#specification", label: "Specification" },
    { href: "#pricing", label: "Pricing" },
    { href: "#process", label: "Process" },
    { href: "#survey", label: "Survey" },
    { href: "#questions", label: "Questions" },
  ],
  wall: {
    eyebrow: "On the wall",
    title: "A wallbox sized for a carport, not a plant room.",
    lead: "Pulse mounts on the wall or a pedestal beside your parking spot. The cable stays on the unit and hangs on its own holster, so there is nothing to carry in the boot.",
    imageAlt:
      "Precifarm Pulse charger mounted on a house wall, Type 2 plug docked in the wall holster and the tethered cable coiled below",
    details: [
      { title: "Position set at the survey", text: "The engineer chooses the wall or pedestal position with you, close to where the car's charging port sits when parked." },
      { title: "Cable on a holster", text: "Tethered Type 2 cable, 5 m as standard with a 7 m option for longer reaches. The plug docks in its holster between sessions." },
      { title: "Its own circuit", text: "Every Pulse runs on a dedicated circuit from your consumer unit, behind a Type A RCD." },
      { title: "Built for outdoors", text: "Designed for IP65 in a carport or on an outside wall. The rating is confirmed by accredited testing before it is published as tested." },
    ],
  },
  installation: {
    eyebrow: "Installation",
    title: "From your meter to the car, on one dedicated circuit.",
    lead: "Every install follows the same chain. The survey sets the breaker rating, the cable size and the route; the diagram shows where each part sits.",
    cableNote:
      "Voltage drop is calculated with the same engineering tool Precifarm Agent uses, at the Pulse charging current of 32 A on a 230 V single-phase circuit, copper conductor, against a 5% limit. The installed cable must also carry the current for its installation method and grouping; the engineer confirms both on site.",
  },
  calculator: {
    eyebrow: "Charge time",
    title: "How long your car takes on Pulse.",
    lead: "Work it out from your daily driving or from a battery top-up. The numbers are calculated, not looked up: the same charging-time tool Precifarm Agent runs, at 90% charging efficiency.",
    obcNote:
      "AC charging runs at the lower of the charger's power and your car's on-board charger. Many cars accept 6.6 to 7.4 kW; your handbook gives the figure for yours.",
  },
  safety: [
    "Charging current never runs through a circuit board.",
    "An independent safety processor and a hardware watchdog control the contactor.",
    "Earth and supply are checked before every session, and welded contacts are detected.",
  ],
  pricing: {
    eyebrow: "Pricing",
    title: "What you pay, and what is quoted after the survey.",
    lead: "The from-price covers the charger and a standard installation. Anything your property needs beyond that is listed on your written quote before you approve it.",
  },
  survey: {
    eyebrow: "Survey",
    title: "Start with a survey of your house.",
    lead: "We look at your supply, earthing, consumer unit and parking spot, then send a fixed-scope quote and a single-line diagram for your house.",
  },
} as const;

/** Price stack for /charging/home. Only figures already in site copy; splits not published are marked as such. */
export const pulsePriceStack = [
  {
    id: "survey",
    item: "Home survey",
    detail: "Remote intake and an engineer's visit: earthing, consumer unit, cable route, load and parking.",
    price: "Free",
    tag: "Before you commit",
  },
  {
    id: "hardware",
    item: "Pulse charger hardware",
    detail: "7 kW Pulse wallbox with tethered Type 2 cable and holster, remote monitoring and three-year aftersale support.",
    price: "In the from-price",
    tag: "Hardware",
  },
  {
    id: "install",
    item: "Standard installation",
    detail: "Dedicated circuit from your consumer unit to the parking spot, mounting, commissioning, safety test and handover.",
    price: "In the from-price",
    tag: "Installation",
  },
  {
    id: "site-work",
    item: "Optional site work",
    detail: "Consumer-unit upgrades, extra cabling, civil works and Kenya Power service upgrades: only if your property needs them, and only if they appear on your quote.",
    price: "Quoted after the survey",
    tag: "Only if needed",
  },
] as const;

export const pulseFinancing = {
  title: "Or spread it with Lipa Pole Pole",
  text: "The same Pulse install, paid in M-Pesa instalments. The deposit, monthly amount and total are shown before you approve. No bank account needed. Lipa Pole Pole covers Pulse installations, not public charging sessions.",
  from: sitePricing.lipaFrom,
} as const;
