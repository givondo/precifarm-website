/** Precifarm Agent — AI electrical & energy engineer product page */

import type { FaqItem } from "@/lib/seo/types";
import { siteConfig } from "@/lib/seo/config";
import { agentToolCatalogue } from "@/lib/agent/tools/engineering";

export const agentPath = "/agent";

export const agentStatusNote =
  "Web workspace in early access · Ask and Plan modes · OpenCode config for local runs.";

export const agentPageFaqs: FaqItem[] = [
  {
    question: "What is Precifarm Agent?",
    answer:
      "An agentic AI for EV charging, solar, batteries and electrical systems, not customer-service chat. It plans the work, runs real calculators, and labels every result as calculated, estimated, or needing a site check.",
  },
  {
    question: "Does the AI do the maths itself?",
    answer:
      "No. The Agent decides what to calculate; ten deterministic engineering tools do the maths. Every reply shows a calculation trace with each tool call, its result and its evidence label.",
  },
  {
    question: "Is Precifarm Agent live today?",
    answer:
      "Yes, in early access. The web workspace is open at precifarm.com/agent/chat and on this page. The desktop workspace is coming; request access at precifarm.com/download.",
  },
  {
    question: "Who is it for?",
    answer:
      "Engineers, technicians, installers and energy businesses working on EV charging, solar and storage, including Precifarm Pulse, Pod, Spark, Depot, Boda Hub and Corridor projects.",
  },
  {
    question: "Can it replace a site survey?",
    answer:
      "No. Photos and documents accelerate early design. Safety-critical work still needs a physical visit and a qualified professional.",
  },
  {
    question: "Will it pay with M-Pesa or control my car?",
    answer:
      "No. Today's workspace runs in Ask and Plan modes only, with no side effects. Act and Auto modes, with explicit approval for anything involving money or a vehicle, are on the roadmap.",
  },
];

export const agentPage = {
  hero: {
    eyebrow: "Precifarm Agent",
    title: "Your AI electrical and energy engineer.",
    subhead:
      "Give it a brief. It plans the design, runs real engineering tools for every number, and tells you what still needs a site check. EV charging, solar, batteries, cables and protection, built for Kenya.",
    primaryCta: { href: "#try", label: "Try it now" },
    secondaryCta: { href: "/agent/chat", label: "Open full workspace" },
  },

  progress: [
    { stat: String(agentToolCatalogue.length), label: "Deterministic engineering tools: EV, solar, battery, inverter, cables, protection, costs, products" },
    { stat: "100%", label: "Of numbers come from a tool and carry an evidence label you can audit" },
    { stat: siteConfig.androidApp.name, label: "Android companion in early access · desktop workspace next" },
  ],

  northStar: {
    eyebrow: "Ambition",
    title: "Your car has a companion. Your energy has a brain.",
    description:
      "Precifarm Agent is the intelligent layer connecting driver, vehicle, journey, charging, home energy, M-Pesa and the Precifarm network, without becoming a generic chatbot or a map with lipstick.",
    quote:
      "We are building command-centre-first software: the map is a tool the Agent uses, not the product.",
  },

  tryIt: {
    id: "try",
    eyebrow: "Try it",
    title: "Give it a real brief.",
    description:
      "Pick an example or describe your own site. Open the calculation trace under each reply to see every tool the Agent ran.",
  },

  modes: {
    eyebrow: "Interaction modes",
    title: "You always know what the Agent is allowed to do.",
    description: "Every screen shows the active mode. Today's workspace runs Ask and Plan only; Act and Auto come with approval controls.",
    items: [
      {
        mode: "Ask",
        title: "Answer only",
        text: "Questions, explanations and what-if scenarios. Zero changes to schedules, payments or hardware.",
      },
      {
        mode: "Plan",
        title: "Recommend a path",
        text: "Trip, charge schedule, bill of materials or upgrade plan, presented for review, not executed.",
      },
      {
        mode: "Act",
        title: "Execute with approval",
        text: "Book a survey, start a session, export a report, only after you confirm.",
      },
      {
        mode: "Auto",
        title: "Your rules, narrowly",
        text: "Low-risk automations you define (e.g. charge before 7 AM). Never silent money or vehicle control.",
      },
    ] as const,
  },

  roadmap: {
    eyebrow: "Progress & roadmap",
    title: "Shipped, in build, and next.",
    columns: {
      shipped: "In the wild today",
      building: "In active build",
      next: "Next horizon",
    },
    shipped: [
      "Web workspace in early access, Ask and Plan modes",
      "Ten-tool engineering kernel: EV, solar, battery, inverter, voltage drop, protection, cost, products",
      "Calculation trace with evidence labels on every reply",
      `${siteConfig.androidApp.name} early access on Android`,
    ],
    building: [
      "Kenyan benchmark: 50 real survey cases graded by registered engineers (Q1 2027)",
      "Install pack export: calc sheet, single line diagram, parts list (Q2 2027)",
      "Use on live Pulse home surveys with partner installers (Q3 2027)",
    ],
    next: [
      "Desktop workspace and survey to quote handover",
      "Journey planning: route, charge stops, cost and time",
      "M-Pesa and Lipa Pole Pole actions behind explicit approval",
      "Wireless pad site modelling, shared with the R&D programme",
    ],
  },

  agentLoop: {
    eyebrow: "Core agent loop",
    title: "Observe, plan, verify, act: with consent.",
    steps: [
      "Observe",
      "Understand",
      "Plan",
      "Verify",
      "Propose",
      "Approve",
      "Act",
      "Confirm",
      "Learn",
    ] as const,
    note: "Specialized backend agents, one Precifarm face. Verify always includes tools, permissions and data freshness.",
  },

  differentiation: {
    eyebrow: "The difference",
    title: "Don’t just ask AI. Give it a job.",
    body: "Most AI answers questions. Precifarm Agent works through the design step by step, with the same discipline we use commissioning hardware in the field.",
    stages: [
      "Understand",
      "Plan",
      "Research",
      "Calculate",
      "Design",
      "Check",
      "Iterate",
      "Deliver",
    ] as const,
  },

  workflow: {
    id: "how-it-works",
    eyebrow: "How it works",
    title: "From a problem to a clear design.",
    steps: [
      {
        n: "01",
        title: "Understand",
        text: "Read the brief: site, vehicle, energy need and limits.",
      },
      {
        n: "02",
        title: "Plan",
        text: "Break the job into steps and note what’s missing.",
      },
      {
        n: "03",
        title: "Research",
        text: "Check datasheets, standards and rules when needed.",
      },
      {
        n: "04",
        title: "Calculate",
        text: "Run real engineering calculators, not guesswork from the AI.",
      },
      {
        n: "05",
        title: "Design",
        text: "Pick the system layout and the right equipment.",
      },
      {
        n: "06",
        title: "Verify",
        text: "Check sizing, cables, protection and what still needs a site visit.",
      },
      {
        n: "07",
        title: "Iterate",
        text: "Change one input and related numbers update with it.",
      },
      {
        n: "08",
        title: "Deliver",
        text: "Get calcs, diagrams, parts lists, reports and install notes.",
      },
    ] as const,
  },

  capabilities: {
    eyebrow: "What it covers",
    title: "Built for real energy work.",
    cards: [
      {
        title: "EV charging",
        items: ["Charger size", "Charge time", "Daily energy", "Site power", "Cost to charge"],
      },
      {
        title: "Solar",
        items: ["Panel size", "Expected yield", "Inverter size", "Match to your load"],
      },
      {
        title: "Batteries",
        items: ["Backup size", "How long it lasts", "Critical loads", "Charge strategy"],
      },
      {
        title: "Electrical",
        items: ["Peak load", "Cable size", "Voltage drop", "Protection", "Earthing"],
      },
      {
        title: "Costs",
        items: ["Upfront cost", "Running cost", "Diesel vs EV", "Payback"],
      },
      {
        title: "Sites & fleets",
        items: ["Home systems", "Depots", "Boda Hubs", "Highway charging"],
      },
    ] as const,
  },

  kernel: {
    eyebrow: "How the maths works",
    title: "AI plans. Tools calculate.",
    lead: "The Agent chooses what to work out. Dedicated, deterministic tools run the numbers, validate inputs and attach notes on what still needs checking.",
    pipeline: [
      "Your brief",
      "AI Agent",
      "Engineering tool",
      "Clear calculation",
      "Check",
      "Result",
    ] as const,
    tools: agentToolCatalogue.map((t) => ({ label: t.label, fn: `${t.name}()` })),
  },

  example: {
    id: "example",
    eyebrow: "Example",
    title: "Give it a real problem.",
    prompt: "Design an EV charging system for a home where the customer drives 100 km every day.",
    steps: [
      { label: "Vehicle use", value: "18 kWh / 100 km" },
      { label: "Daily driving", value: "100 km" },
      { label: "Daily energy", value: "18 kWh/day" },
      { label: "Time to charge", value: "10 hours available" },
      { label: "Power needed", value: "1.8 kW average" },
    ] as const,
    recommendation: {
      title: "Recommendation",
      charger: "7 kW home charger",
      time: "~2.6 hours",
    },
    continueTitle: "It keeps going.",
    continueChecks: [
      "Home load",
      "Main supply",
      "Peak demand",
      "Cable size",
      "Protection",
      "Charge schedule",
      "Solar option",
      "Battery backup",
    ] as const,
  },

  companion: {
    eyebrow: "Hardware meets software",
    title: "Agent is an R&D programme with a public goal.",
    description:
      "Target: agree with engineer-checked reference designs on at least 90% of a 50-case Kenyan benchmark by Q2 2027, then run on every Precifarm home survey. Progress, gates and the path are published on the R&D page.",
    researchHref: "/research#precifarm-agent",
    researchLabel: "See the Agent programme on R&D",
  },

  trust: {
    eyebrow: "Trust & safety",
    title: "Faster work. You stay responsible.",
    body: "Precifarm Agent speeds up design. It does not replace a qualified professional.",
    labels: [
      "Calculated",
      "Estimated",
      "Assumed",
      "Measured",
      "Verified",
      "Needs site check",
    ] as const,
    note: "For safety-critical installs, it flags what still needs a physical check or professional sign-off.",
  },

  cta: {
    title: "Start with the problem. Scale to the journey.",
    description: "Tell Precifarm Agent what you’re building. Add the files you have. Let it work through the design.",
    primaryHref: "/agent/chat",
    primaryLabel: "Start designing",
    secondaryHref: "/download",
    secondaryLabel: "Request desktop access",
    finalLine: "EV charging. Solar. Batteries. Electrical systems. One Agent.",
  },

  heroMock: {
    project: "Karen Residence · EV charging",
    user: [
      "Design an EV charging system for a",
      "3-bedroom house in Nairobi.",
      "",
      "The customer drives about",
      "80 km per day and has unreliable power.",
    ] as const,
    agentLead: "I’ve broken this into 7 tasks.",
    tasks: [
      { label: "Daily EV energy", done: true },
      { label: "Charge window", done: true },
      { label: "Size home charger", done: true },
      { label: "Home peak load", done: true },
      { label: "Check supply capacity", done: false },
      { label: "Size battery backup", done: false },
      { label: "Draw system layout", done: false },
    ] as const,
    analysis: [
      { label: "Daily EV energy", value: "14.4 kWh" },
      { label: "Recommended charger", value: "7 kW" },
      { label: "Charge time", value: "~2.1 hrs" },
      { label: "Battery backup", value: "10 kWh" },
      { label: "Status", value: "Checking supply" },
    ] as const,
    tabs: ["Calculations", "System Diagram", "Parts list"] as const,
  },
} as const;
