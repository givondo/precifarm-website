/** Page copy for the programme pages. Ratings live in lib/generated/product-specs.json, not here. */
import { productImages } from "@/lib/product-images";
import type { ProgrammeId } from "@/lib/programmes";

export type ProgrammePageContent = {
  id: ProgrammeId;
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  image?: { src: string; alt: string; caption: string };
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
    src: productImages.pulsePlus.src,
    alt: productImages.pulsePlus.alt,
    caption: "Engineering render of Pulse+ Rev B. Not a photograph of a production unit.",
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
  cta: { href: "/contact?interest=pulse-plus", label: "Register interest" },
  secondaryCta: { href: "/partners", label: "Fleet programmes" },
  closing: {
    title: "Planning fleet or workplace charging?",
    text: "Pulse+ is in development. Tell us about your site and vehicles and we will include it in the first deployments.",
  },
};

export const corridorPage: ProgrammePageContent = {
  id: "corridor",
  path: "/charging/corridor",
  eyebrow: "EV Charging · Highway and town",
  title: "Corridor DC fast charging",
  intro:
    "DC fast charging for highways and towns. Each Corridor site starts with a certified OEM charger of 120 to 180 kW under the Precifarm brand, with the grid connection, layout and M-Pesa session pay engineered around the site. The first site, starting on Nairobi to Kisumu, is a pilot in development.",
  image: {
    src: productImages.corridor.src,
    alt: productImages.corridor.alt,
    caption: "Concept visualisation from an earlier Precifarm design. The first site uses a certified OEM charger.",
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
    text: "We are selecting the first Corridor pilot site. Tell us where your site is and what supply it has today.",
  },
};

export const harnessPage: ProgrammePageContent = {
  id: "harness",
  path: "/ai",
  eyebrow: "AI Platform",
  title: "Agent Harness: AI agents on the right model for each job",
  intro:
    "The platform Precifarm builds its engineering agents on. It sends each task to the hosted AI model that suits it, DeepSeek by default with Claude or ChatGPT where a task needs them, runs a bounded team of agents through a visual workflow you can watch, and holds every result for a person to approve before it is exported.",
  stack: [
    { name: "Model routing", text: "Hosted models through their providers' APIs, picked per task. DeepSeek is the default." },
    { name: "Bounded agents", text: "A set team of agent roles working to a plan, never more than the job needs." },
    { name: "Visual workflows", text: "Each step shown as it runs, with every event journaled for replay and audit." },
    { name: "Human sign-off", text: "Nothing is exported until a person approves it." },
  ],
  features: [
    {
      title: "The right model per task",
      text: "Fast, low-cost models handle routine steps; stronger models are used only where a task needs them, so cost follows the work.",
    },
    {
      title: "Work you can see",
      text: "Every step, input and output is visible while it runs and kept afterwards, so a reviewer can see how a result was reached.",
    },
    {
      title: "Built for engineering work",
      text: "Precifarm uses it to turn charging-site briefs into calculated, checked engineering packages that a registered engineer then reviews.",
    },
  ],
  useCases: [
    "Engineering teams that want AI to draft calculations and packages for a qualified person to check.",
    "Companies that need an audit trail of what an AI system did and who approved it.",
    "Precifarm's own site engineering, as its first user.",
  ],
  requirementsTitle: "What it is and is not",
  requirements: [
    "In development. Early access is by request.",
    "Prompts and documents are sent to the chosen model provider's API. Precifarm Agent on this website is also a hosted assistant and does not run privately on your machine.",
    "Results are drafts until a qualified person reviews them; the harness never approves its own work.",
  ],
  cta: { href: "/contact?interest=ai", label: "Request early access" },
  secondaryCta: { href: "/agent", label: "Try Precifarm Agent" },
  closing: {
    title: "Want AI agents working on your engineering?",
    text: "Tell us about your team and the work you want to automate.",
  },
};
