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
  cta: { href: "/contact?topic=pulse-plus", label: "Register interest" },
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
    "A DC fast charging site engineered as one system: dispensers with two CCS2 guns on overhead cable trolleys, an on-site battery that shrinks the grid connection, and M-Pesa session pay. The first sites, starting on Nairobi to Kisumu, are pilots in development.",
  image: {
    src: productImages.corridor.src,
    alt: productImages.corridor.alt,
    caption: "Concept visualisation. The production design follows each site's engineering package.",
  },
  features: [
    {
      title: "Cables from above",
      text: "Balanced cable trolleys keep the heavy DC cables off the ground and within reach of a car's inlet on either side.",
    },
    {
      title: "Storage on site",
      text: "A battery on the DC bus covers the busy hour, so a site that would need a large new transformer can run on a smaller grid connection.",
    },
    {
      title: "Certified power, engineered sites",
      text: "Power conversion comes from certified equipment makers. Precifarm engineers the site, the dispenser layout, the storage and the operations around it.",
    },
  ],
  useCases: [
    "Highway service areas on intercity routes, starting with Nairobi to Kisumu.",
    "Town fast-charging hubs at malls, fuel retail and transport yards.",
    "Fleet sites that need fast turnaround between shifts.",
  ],
  requirementsTitle: "For site hosts",
  requirements: [
    "A site with space for two bays per dispenser plus the storage and switchgear enclosure.",
    "A power study with Kenya Power before any commitment; the grid connection is sized per site.",
    "Charging speed depends on the car: each vehicle draws only what its battery accepts.",
  ],
  cta: { href: "/contact?topic=corridor-host", label: "Host a Corridor site" },
  secondaryCta: { href: "/charging/engineering", label: "Engineering approach" },
  closing: {
    title: "Have a site on a busy route?",
    text: "We are selecting the first Corridor pilot sites. Tell us where your site is and what supply it has today.",
  },
};

export const harnessPage: ProgrammePageContent = {
  id: "harness",
  path: "/ai",
  eyebrow: "AI Platform",
  title: "Agent Harness: private AI on your own machine",
  intro:
    "Run open-weight AI models and agent workflows on hardware you control. Pick a model that fits the machine, describe the goal, watch a bounded team of agents work through a visual workflow, and approve the result before it leaves. No compulsory subscription to a hosted model.",
  stack: [
    { name: "Your machine", text: "A laptop to start, a single-GPU workstation to grow, several machines later." },
    { name: "Local models", text: "Open-weight models served locally through Ollama, tested for instruction following, structured output and tool use." },
    { name: "Bounded agents", text: "Many agent roles, a set number of models running at once. The harness never promises more than the hardware can run." },
    { name: "Visual workflows", text: "Each step shown as it runs, with every event journaled for replay and audit." },
    { name: "Human sign-off", text: "Nothing is exported until a person approves it." },
  ],
  features: [
    {
      title: "Private by default",
      text: "Strict mode blocks every hosted model, so documents and prompts stay on the machine.",
    },
    {
      title: "Honest about hardware",
      text: "Models are matched to the memory you have and their measured speed is shown, not guessed.",
    },
    {
      title: "Built for engineering work",
      text: "Precifarm uses it to turn charging-site briefs into calculated, checked engineering packages that a registered engineer then reviews.",
    },
  ],
  useCases: [
    "Engineers and consultancies who cannot send client documents to a hosted AI service.",
    "Startups that want agent workflows without per-seat model subscriptions.",
    "Companies that need an audit trail of what an AI system did and who approved it.",
  ],
  requirementsTitle: "What it is and is not",
  requirements: [
    "In development. Early access is by request.",
    "Precifarm Agent on this website is a separate, hosted assistant and does not run privately.",
    "Results are drafts until a qualified person reviews them; the harness never approves its own work.",
  ],
  cta: { href: "/contact?topic=agent-harness", label: "Request early access" },
  secondaryCta: { href: "/agent", label: "Try Precifarm Agent (hosted)" },
  closing: {
    title: "Want private AI agents for your team?",
    text: "Tell us about your hardware and the work you want to automate.",
  },
};
