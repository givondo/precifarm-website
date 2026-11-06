/** Precifarm Agent: engineering workspace page (/agent) */

import type { FaqItem } from "@/lib/seo/types";
import { agentPublic } from "@/lib/agent/public";
import { agentToolCatalogue } from "@/lib/agent/tools/engineering";

export const agentPath = "/agent";

export const agentStatusNote = `Ask and Plan modes · ${agentPublic.modelLabel}, hosted`;

export const agentPageFaqs: FaqItem[] = [
  {
    question: "What is Precifarm Agent?",
    answer:
      "An AI engineering assistant for EV charging, solar, batteries and electrical systems. It plans the work, runs deterministic engineering tools for every number, and labels each result as calculated, estimated, assumed or needing a site check.",
  },
  {
    question: "Does the AI do the maths itself?",
    answer: `No. The model decides what to calculate; ${agentToolCatalogue.length} deterministic engineering tools do the maths. Every reply shows a calculation trace with each tool call, its result and its evidence label.`,
  },
  {
    question: "Which parts of this page are live?",
    answer:
      "The Agent workspace (on this page and at precifarm.com/agent/chat) and the engineering tool kernel are live. The worked demonstration follows a scripted plan, but every number in it is computed by the same tools the live Agent calls.",
  },
  {
    question: "Who is it for?",
    answer:
      "Engineers, technicians, installers and energy businesses working on EV charging, solar and storage, including Precifarm Pulse, Pulse+, Boda Hub and ARC Corridor projects.",
  },
  {
    question: "Can it replace a site survey?",
    answer: "No. It speeds up early design. Earthing, cable ratings, roof and supply details still need a physical visit and a qualified professional.",
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
    title: "From a project brief to a design you can trace.",
    lead: "Precifarm Agent plans EV charging, solar and storage work, then runs deterministic engineering tools for every number. Each result carries an evidence label, so an engineer can check it before anything is built.",
    actions: [
      { href: "#workspace", label: "Watch a brief become a design" },
      { href: agentPublic.chatPath, label: "Open the live workspace", variant: "secondary" as const },
    ],
    facts: [
      { value: String(agentToolCatalogue.length), label: "Engineering tools" },
      { value: "4", label: "Evidence labels" },
      { value: "Ask, Plan", label: "Modes live today" },
      { value: agentPublic.modelLabel, label: "Hosted model" },
    ],
  },

  /** What a visitor sees on this page, and how real each part is */
  liveness: [
    { kind: "available" as const, label: "Live", title: "Agent workspace", text: "Your brief goes to the hosted model, which calls the engineering tools on our server." },
    { kind: "available" as const, label: "Live", title: "Engineering tool kernel", text: "The same deterministic functions run in your browser on this page." },
    { kind: "simulation" as const, label: "Scripted", title: "Worked demonstration", text: "The plan is scripted for three example briefs. The numbers are computed live." },
    { kind: "planned" as const, label: "Planned", title: "Act and Auto modes", text: "Actions such as booking a survey, only after you approve them." },
  ],

  workspace: {
    id: "workspace",
    eyebrow: "Demonstration",
    title: "Watch a brief become a design.",
    lead: "Pick a brief and change it. The Agent's plan runs task by task: calculations, a single line diagram, a parts list and a result whose every figure traces back to a tool call.",
  },

  tryIt: {
    id: "try",
    eyebrow: "Live workspace",
    title: "Give the Agent your own brief.",
    lead: "Describe a site, a fleet or a circuit. Open the calculation trace under each reply to see every tool the Agent ran.",
  },

  kernel: {
    id: "kernel",
    eyebrow: "How the maths works",
    title: "The model plans. Deterministic tools calculate.",
    lead: "The language model chooses which calculation to run and with what inputs. The tool validates the inputs, does the arithmetic and returns the result with its evidence label and the notes an engineer must review.",
    pipeline: [
      { title: "Brief", text: "Site, vehicles, loads, limits" },
      { title: "Hosted model", text: `${agentPublic.modelLabel} plans the tasks` },
      { title: "Tool call", text: "Named function, typed inputs" },
      { title: "Kernel", text: "Validates and calculates" },
      { title: "Evidence label", text: "Calculated, estimated, assumed or site check" },
      { title: "Reply and trace", text: "Every number auditable" },
    ],
  },

  modes: {
    id: "modes",
    eyebrow: "Permissions",
    title: "You always know what the Agent is allowed to do.",
    lead: "Every screen shows the active mode. Today's workspace runs Ask and Plan only, with no payments, bookings or hardware control.",
    items: [
      { mode: "Ask", status: "available" as const, statusLabel: "Live", text: "Questions, explanations and what-if scenarios. Changes nothing." },
      { mode: "Plan", status: "available" as const, statusLabel: "Live", text: "A design, schedule or parts list presented for review, not executed." },
      { mode: "Act", status: "planned" as const, statusLabel: "Planned", text: "Book a survey or export a report, only after you confirm." },
      { mode: "Auto", status: "planned" as const, statusLabel: "Planned", text: "Narrow automations you define. Never silent money or vehicle control." },
    ],
  },

  roadmap: {
    id: "roadmap",
    eyebrow: "Progress",
    title: "Shipped, in build, and next.",
    columns: [
      {
        title: "Live today",
        kind: "available" as const,
        items: [
          "Web workspace in Ask and Plan modes",
          `${agentToolCatalogue.length}-tool engineering kernel: EV, solar, battery, inverter, voltage drop, protection, cost, products`,
          "Calculation trace with evidence labels on every reply",
        ],
      },
      {
        title: "In build",
        kind: "development" as const,
        items: [
          "Kenyan benchmark: 50 real survey cases graded by registered engineers (Q1 2027)",
          "Install pack export: calc sheet, single line diagram, parts list (Q2 2027)",
          "Use on live Pulse home surveys with partner installers (Q3 2027)",
        ],
      },
      {
        title: "Next",
        kind: "planned" as const,
        items: [
          "Desktop workspace and survey to quote handover",
          "Journey planning: route, charge stops, cost and time",
          "M-Pesa and Lipa Pole Pole actions behind explicit approval",
        ],
      },
    ],
    researchHref: "/research#precifarm-agent",
    researchLabel: "Agent programme on the R&D page",
  },
} as const;
