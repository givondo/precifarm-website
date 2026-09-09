/** Precifarm Agent — AI electrical & energy engineer product page */

import type { FaqItem } from "@/lib/seo/types";

export const agentPath = "/agent";

export const agentStatusNote = "Desktop app coming soon.";

export const agentPageFaqs: FaqItem[] = [
  {
    question: "What is Precifarm Agent?",
    answer:
      "An AI that helps you design EV charging, solar, batteries and electrical systems. It plans the work, runs real calculators, and gives you clear results — not a chat bot for customer service.",
  },
  {
    question: "Does the AI do the maths itself?",
    answer:
      "No. The Agent decides what to calculate. Separate tools do the maths. You can see what was calculated, estimated, assumed, or still needs a site check.",
  },
  {
    question: "Is Precifarm Agent live today?",
    answer:
      "Early access is open. The desktop app is coming soon — request access at precifarm.com/download.",
  },
  {
    question: "Who is it for?",
    answer:
      "Engineers, technicians, installers and energy businesses working on EV charging, solar and storage — including Precifarm Pulse, Pod, Spark, Depot, Boda Hub and Corridor projects.",
  },
  {
    question: "Can it replace a site survey?",
    answer:
      "No. Photos and documents help early design. Safety-critical work still needs a real visit and a qualified professional.",
  },
];

export const agentPage = {
  hero: {
    eyebrow: "Precifarm Agent",
    title: "Your AI electrical & energy engineer.",
    subhead: "Tell it what you’re building. It sizes, designs and checks the system with you.",
    primaryCta: { href: "/download", label: "Download for desktop" },
    secondaryCta: { href: "/contact", label: "Start designing" },
  },

  differentiation: {
    eyebrow: "The difference",
    title: "Don’t just ask AI. Give it a job.",
    body: "Most AI answers questions. Precifarm Agent works through the design step by step.",
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
        text: "Read the brief — site, vehicle, energy need and limits.",
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
        text: "Run real engineering calculators — not guesswork from the AI.",
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
        text: "Change one input — related numbers update with it.",
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
    lead: "The Agent chooses what to work out. Dedicated tools run the numbers.",
    pipeline: [
      "Your brief",
      "AI Agent",
      "Engineering tool",
      "Clear calculation",
      "Check",
      "Result",
    ] as const,
    tools: [
      { label: "EV energy", fn: "calculateEvEnergy()" },
      { label: "Charging", fn: "calculateChargingTime()" },
      { label: "Load", fn: "calculatePeakLoad()" },
      { label: "Solar", fn: "sizePvSystem()" },
      { label: "Battery", fn: "sizeBattery()" },
      { label: "Inverter", fn: "sizeInverter()" },
      { label: "Cables", fn: "calculateVoltageDrop()" },
      { label: "Protection", fn: "sizeProtection()" },
      { label: "Costs", fn: "calculateEnergyCost()" },
    ] as const,
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
    title: "Start with the problem.",
    description: "Tell Precifarm Agent what you’re building. Add the files you have. Let it work through the design.",
    primaryHref: "/contact",
    primaryLabel: "Start designing",
    secondaryHref: "/download",
    secondaryLabel: "Get desktop access",
    finalLine: "EV charging. Solar. Batteries. Electrical systems. One Agent.",
  },

  heroMock: {
    project: "Karen Residence — EV Charging",
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
