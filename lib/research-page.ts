/** Precifarm R&D — public research programmes. Status is evidence-based. */

import type { FaqItem } from "@/lib/seo/types";

export const researchPath = "/research";

export const researchNavLabel = "R&D";

export const researchReviewed = "16 October 2026";

export type MilestoneStatus = "demonstrated" | "published" | "early_access" | "planned";

export type ResearchMilestone = {
  id: string;
  title: string;
  status: MilestoneStatus;
  acceptance: string;
  /** Public proof for the gate. Omitted until the gate is reached. */
  evidence?: string;
};

export type ResearchProgramme = {
  id: string;
  code: string;
  title: string;
  classification: string;
  question: string;
  overview: string;
  evidence: string;
  objectives: readonly string[];
  links: readonly { href: string; label: string }[];
  milestones: readonly ResearchMilestone[];
};

export const researchMethod = [
  { id: "define", step: "01", title: "Define", text: "The problem and what counts as a useful result." },
  { id: "model", step: "02", title: "Model", text: "Electrical, thermal or software models before hardware." },
  { id: "simulate", step: "03", title: "Simulate", text: "Compare alternatives and failure cases." },
  { id: "prototype", step: "04", title: "Prototype", text: "Build only what the model says must be proven." },
  { id: "validate", step: "05", title: "Validate", text: "Test against written acceptance criteria." },
  { id: "deploy", step: "06", title: "Deploy", text: "Controlled pilot, only after approvals." },
] as const;

export const researchProgrammes: readonly ResearchProgramme[] = [
  {
    id: "wireless-ev",
    code: "A",
    title: "Wireless EV charging",
    classification: "Experimental power transfer",
    question:
      "Can stationary inductive charging reduce the friction of everyday EV charging while staying efficient, safe and affordable under Kenyan site conditions?",
    overview:
      "We are studying coil geometry, coupling, power electronics, alignment, foreign- and living-object protection, efficiency and interoperability for home, fleet and depot use. Our wired Pulse, Pod, Depot and Corridor chargers are available today.",
    evidence: "Wireless EV charging R&D policy (16 October 2026).",
    objectives: [
      "Study 7–11 kW stationary architectures.",
      "Define coupling and alignment tolerances worth testing.",
      "Specify foreign-object and living-object protection before any hosted trial.",
      "Plan how end-to-end efficiency would be measured.",
      "Use IEC 61980 and SAE J2954 as reference standards.",
      "Estimate hardware and installation cost from the design.",
    ],
    links: [
      { href: "/research/wireless-ev-charging-policy", label: "Wireless charging R&D policy" },
      { href: "/charging", label: "Wired charging we sell today" },
    ],
    milestones: [
      {
        id: "w-g1",
        title: "Requirements and reference architecture",
        status: "published",
        acceptance: "Written scope, safety gates and industry references.",
        evidence: "R&D policy, effective 16 October 2026.",
      },
      {
        id: "w-g2",
        title: "Electromagnetic and thermal modelling",
        status: "planned",
        acceptance: "Documented coil, gap and loss model with stated assumptions.",
      },
      {
        id: "w-g3",
        title: "Power-electronics bench validation",
        status: "planned",
        acceptance: "Measured transfer under a written test procedure.",
      },
      {
        id: "w-g4",
        title: "Integrated prototype",
        status: "planned",
        acceptance: "Protection, alignment and metering exercised together.",
      },
      {
        id: "w-g5",
        title: "Controlled pilot assessment",
        status: "planned",
        acceptance: "Hosted trial against the policy gates, including FOD/LOP.",
      },
    ],
  },
  {
    id: "precifarm-agent",
    code: "B",
    title: "Precifarm Agent",
    classification: "Engineering software — early access",
    question:
      "How can software speed first-pass sizing for EV charging and site energy without replacing an engineer’s sign-off?",
    overview:
      "An early-access engineering workspace. A language model drafts and explains; deterministic calculators return labelled numbers. An engineer reviews and signs off every design.",
    evidence:
      "Live at /agent/chat, with an OpenCode config for local use.",
    objectives: [
      "Keep EV energy, charge time, peak load, backup size and tariff cost on deterministic code.",
      "Label model text separately from calculator results.",
      "Offer the same model locally via OpenCode for engineers who bring their own API key.",
    ],
    links: [
      { href: "/agent", label: "Agent overview" },
      { href: "/agent/chat", label: "Open web workspace" },
      { href: "/download", label: "OpenCode setup" },
    ],
    milestones: [
      {
        id: "a-g1",
        title: "Web workspace",
        status: "demonstrated",
        acceptance: "Visitors can run a chat that calls server-side tools.",
        evidence: "precifarm.com/agent/chat.",
      },
      {
        id: "a-g2",
        title: "Deterministic calculators",
        status: "demonstrated",
        acceptance: "EV energy, charge time, peak load, energy cost and battery size return numbers.",
        evidence: "Five calculators live in the workspace.",
      },
      {
        id: "a-g3",
        title: "Local OpenCode setup",
        status: "early_access",
        acceptance: "A published config so an engineer can connect their own DeepSeek key.",
        evidence: "Config download for OpenCode.",
      },
      {
        id: "a-g4",
        title: "Android",
        status: "early_access",
        acceptance: "A build available on request ahead of a store release.",
        evidence: "Request via /download.",
      },
      {
        id: "a-g5",
        title: "Simulation and CAD interfaces",
        status: "planned",
        acceptance: "A named tool, a version, and a result an engineer can reproduce.",
      },
    ],
  },
  {
    id: "hub-energy",
    code: "C",
    title: "Grid-integrated energy hubs",
    classification: "Distributed energy — modelling",
    question:
      "How should a charging site combine grid supply, solar and storage without overstating what the connection can deliver?",
    overview:
      "We model depot and corridor sites where chargers, PV and batteries share one connection. Each design is sized to inverter ratings, battery limits and the Kenya Power connection study.",
    evidence:
      "Engineering design basis PF-ENG-SOLAR-HUB-001.",
    objectives: [
      "Characterise charger concurrency before sizing PV or batteries.",
      "Treat grid import as a design constraint from the start.",
      "Publish site numbers with their model, assumptions and date.",
    ],
    links: [
      { href: "/charging/engineering", label: "Engineering design basis" },
      { href: "/sustainability", label: "Sustainability goals" },
      { href: "/hub", label: "Charging Hub (wired sites)" },
    ],
    milestones: [
      {
        id: "h-g1",
        title: "Site questions and load framing",
        status: "published",
        acceptance: "Public design basis states what a corridor or depot study must answer.",
        evidence: "Engineering design basis PF-ENG-SOLAR-HUB-001.",
      },
      {
        id: "h-g2",
        title: "PV and storage model",
        status: "planned",
        acceptance: "Irradiance, performance ratio, usable kWh and reserve written down.",
      },
      {
        id: "h-g3",
        title: "Dispatch and tariff cases",
        status: "planned",
        acceptance: "At least one peak and one outage case with units.",
      },
      {
        id: "h-g4",
        title: "Protection and operating rules",
        status: "planned",
        acceptance: "Rules for islanding, export and load shedding.",
      },
      {
        id: "h-g5",
        title: "Site validation",
        status: "planned",
        acceptance: "Measured import, PV and storage against the model.",
      },
    ],
  },
];

export const researchPageFaqs: FaqItem[] = [
  {
    question: "Can I buy wireless charging from Precifarm?",
    answer:
      "Wireless charging is a research programme. Pulse, Pod, Spark, Depot, Boda Hub and Corridor are the wired chargers we install today, with M-Pesa.",
  },
  {
    question: "How is progress measured?",
    answer:
      "Each programme moves through five gates. The page shows which gates are reached and the evidence for each one.",
  },
  {
    question: "Is Precifarm Agent a research prototype or something I can use?",
    answer:
      "Yes. The web workspace is early-access software you can open today. Desktop OpenCode uses your own API key, and Android is available on request.",
  },
  {
    question: "Do you have university or laboratory partners?",
    answer:
      "We name partners once a written scope is agreed. Use the contact form to start a technical discussion.",
  },
];

export const researchPage = {
  hero: {
    eyebrow: "Research & Development",
    title: "The future of electric mobility, engineered in Africa.",
    lead: "From wireless charging and engineering software to grid-integrated site energy, Precifarm studies systems that could make electric mobility more practical in Africa.",
    primaryCta: { href: "#programmes", label: "Explore our research" },
    secondaryCta: { href: "/contact", label: "Collaborate with us" },
  },
  method: {
    eyebrow: "Method",
    title: "From an engineering question to a field check.",
    lead: "Every programme moves through the same six steps.",
  },
  programmes: {
    id: "programmes",
    eyebrow: "Programmes",
    title: "Three lines of work. Different evidence.",
  },
  collaboration: {
    eyebrow: "Collaboration",
    title: "Talk to us about the engineering.",
    lead: "We work with researchers, universities and site hosts.",
    areas: [
      "Wireless power electronics and magnetics",
      "EV charging research",
      "Engineering software and calculators",
      "Site energy models",
      "Validation and hosted trials",
    ],
    primaryHref: "/contact",
    primaryLabel: "Discuss a research collaboration",
  },
} as const;
