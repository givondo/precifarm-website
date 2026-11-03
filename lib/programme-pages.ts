/** Page copy for the programme pages. Ratings live in lib/generated/product-specs.json, not here. */
import { productImages } from "@/lib/product-images";
import type { ProgrammeId } from "@/lib/programmes";

export type ProgrammePageContent = {
  id: ProgrammeId;
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** cover fills the frame (scenes); contain keeps a cut-out product whole. */
  image?: { src: string; alt: string; fit?: "contain" | "cover" };
  stack?: readonly { name: string; text: string }[];
  features: readonly { title: string; text: string }[];
  useCases: readonly string[];
  requirementsTitle: string;
  requirements: readonly string[];
  cta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  closing: { title: string; text: string };
};

export const pulsePlusPage: ProgrammePageContent = {
  id: "pulsePlus",
  path: "/charging/pulse-plus",
  eyebrow: "EV Charging · Fleet and workplace",
  title: "Pulse+ 22 kW charger",
  intro:
    "The three-phase member of the Pulse family, for fleet yards, workplaces, apartment parking and partner sites. It shares the Pulse safety architecture and adapts to every car it charges.",
  image: {
    src: productImages.pulsePlusDepot.src,
    alt: productImages.pulsePlusDepot.alt,
    fit: "cover",
  },
  features: [
    {
      title: "Adapts to each car",
      text: "22 kW where the car's on-board charger accepts it, 11 kW on most three-phase cars, and a single-phase mode for cars that charge on one phase.",
    },
    {
      title: "One meter, many chargers",
      text: "Up to ten Pulse+ units share one site meter and divide the available current per phase, so the supply is never overloaded.",
    },
    {
      title: "Safety in the unit",
      text: "6 mA DC fault detection on all four conductors, welded-contact checks on every pole and phase-loss detection, independent of the network.",
    },
  ],
  useCases: [
    "Fleet depots where vans and cars charge while parked overnight or between shifts.",
    "Workplace parking, charging staff cars during the working day.",
    "Apartment blocks, with load sharing across bays on one supply.",
  ],
  requirementsTitle: "Site and vehicle requirements",
  requirements: [
    "A three-phase 400 V supply with neutral, surveyed before quotation.",
    "An upstream four-pole Type A 30 mA RCD per unit, installed by a licensed electrician as part of every Precifarm install.",
    "Charging time depends on the car: a car limited to 11 kW AC takes about twice as long as one that accepts 22 kW.",
  ],
  cta: { href: "/contact?interest=pulse-plus", label: "Plan your site" },
  secondaryCta: { href: "/partners", label: "Fleet programmes" },
  closing: {
    title: "Planning fleet or workplace charging?",
    text: "Tell us about your site and vehicles, and we will survey the supply and plan the bays, load sharing and payments.",
  },
};

export const corridorPage: ProgrammePageContent = {
  id: "corridor",
  path: "/charging/corridor",
  eyebrow: "EV Charging · Highway and town",
  title: "Corridor DC fast charging",
  intro:
    "DC fast charging for highways and towns. Each Corridor site starts with a certified OEM charger of 120 to 180 kW under the Precifarm brand, with the grid connection, layout and M-Pesa session pay engineered around the site. The first site is being prepared on the Nairobi to Kisumu route.",
  image: {
    src: productImages.corridor.src,
    alt: productImages.corridor.alt,
  },
  features: [
    {
      title: "Certified charger",
      text: "The charger itself is bought from an established maker and certified by them. Precifarm does not build its own DC power conversion for public sites.",
    },
    {
      title: "Engineered site",
      text: "Precifarm engineers what surrounds it: the grid connection, protection, bay layout, signage and the operations that keep the site running.",
    },
    {
      title: "Storage only where needed",
      text: "The first site has no on-site battery. Storage is added at later sites only where the Kenya Power study shows the grid cannot meet demand.",
    },
  ],
  useCases: [
    "Highway service areas on intercity routes, starting with Nairobi to Kisumu.",
    "Town fast-charging hubs at malls, fuel retail and transport yards.",
    "Fleet sites that need fast turnaround between shifts.",
  ],
  requirementsTitle: "For site hosts",
  requirements: [
    "Space for the charger, its bays and the switchgear, with safe vehicle access.",
    "A power study with Kenya Power before any commitment; the grid connection is sized per site.",
    "Charging speed depends on the car: each vehicle draws only what its battery accepts.",
  ],
  cta: { href: "/contact?interest=corridor", label: "Host a Corridor site" },
  secondaryCta: { href: "/charging/engineering", label: "Engineering approach" },
  closing: {
    title: "Have a site on a busy route?",
    text: "Tell us where your site is and what supply it has today, and we will start with a free survey and a Kenya Power study.",
  },
};
