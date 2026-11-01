/**
 * R&D — research programmes with goals, stage gates and a dated path to each gate.
 * Progress is engineering completion toward the next gate. It is never traction,
 * installed base or a promise to sell.
 */

import type { FaqItem } from "@/lib/seo/types";
export const researchPath = "/research";

export const researchNavLabel = "R&D";

export const researchLastReviewed = "Q4 2026";
export const researchNextReview = "Q1 2027";

/* ------------------------------------------------------------------ */
/* Stage-gate method                                                   */
/* ------------------------------------------------------------------ */

export type GateId = "G0" | "G1" | "G2" | "G3" | "G4";

export type ResearchGate = {
  id: GateId;
  name: string;
  question: string;
  exit: string;
};

export const researchGates: readonly ResearchGate[] = [
  {
    id: "G0",
    name: "Frame",
    question: "Is the question worth answering?",
    exit: "Research question, success metric and first safety case written down.",
  },
  {
    id: "G1",
    name: "Model",
    question: "Does it work on paper?",
    exit: "Simulation or desk study checked against standards, with a cost envelope.",
  },
  {
    id: "G2",
    name: "Bench",
    question: "Does it work in the lab?",
    exit: "Measured prototype data, safety tests passed, bench report published.",
  },
  {
    id: "G3",
    name: "Pilot",
    question: "Does it work in Kenya?",
    exit: "Hosted site, metered and monitored for at least 90 days with a partner.",
  },
  {
    id: "G4",
    name: "Decide",
    question: "Should it become a product?",
    exit: "Productise, license or stop. A product page exists only after this gate.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Programmes                                                          */
/* ------------------------------------------------------------------ */

export type MilestoneStatus = "done" | "active" | "next" | "later";

export type ResearchMilestone = {
  when: string;
  title: string;
  status: MilestoneStatus;
};

export type ResearchArea = {
  id: string;
  title: string;
  horizon: "Now" | "Next" | "Later";
  /** Gate the programme is working towards (the next one to pass). */
  workingTowards: GateId;
  /** 0 to 100 engineering progress toward `workingTowards`. Not revenue or deployment. */
  progress: number;
  stage: string;
  question: string;
  summary: string;
  goal: string;
  targets: readonly { label: string; value: string }[];
  milestones: readonly ResearchMilestone[];
  needs: readonly string[];
  href?: string;
  hrefLabel?: string;
};

export const researchAreas: readonly ResearchArea[] = [
  {
    id: "wireless-ev",
    title: "Wireless charging for cars, then e-bodas",
    horizon: "Now",
    workingTowards: "G2",
    progress: 38,
    stage: "Modelling and bench preparation",
    question:
      "Can a parked car charge without a plug, safely, at home or in a fleet depot, through dust, rain and imperfect parking?",
    summary:
      "Stationary inductive charging for light-duty cars first, at home and in fleet depots, then a later study for e-bodas. Coil and compensation design, alignment, foreign and living object protection, and field exposure. This is research, not a product: the Pulse wired charger is what we install today.",
    goal:
      "A measured, safe car pad on the bench, with efficiency, misalignment and foreign-object results recorded against SAE J2954 and IEC 61980. No product or sale date is promised.",
    targets: [
      { label: "First vehicle class", value: "Light-duty cars" },
      { label: "Research power class", value: "About 7.7 kVA input" },
      { label: "Transfer efficiency", value: "Not yet measured; reported with its boundary" },
      { label: "Foreign object detection", value: "100% of standard test objects" },
      { label: "Field exposure", value: "Within ICNIRP public reference levels" },
    ],
    milestones: [
      { when: "In progress", title: "Coil, ferrite and LCC compensation modelled for a car pad (simulation only)", status: "active" },
      { when: "Next", title: "Reduced-power car pad bench rig; first efficiency and thermal map", status: "next" },
      { when: "Then", title: "Foreign and living object protection on the bench", status: "next" },
      { when: "Later", title: "EMC pre-compliance against IEC 61980; bench report published (G2)", status: "later" },
      { when: "Later", title: "E-boda pad study sized from the car bench data", status: "later" },
    ],
    needs: [
      "Power electronics lab time and an EMC pre-compliance test house",
      "Litz wire and ferrite supply for prototype coils",
      "A fleet or vehicle maker willing to fit a receiver pad to a test car",
    ],
    href: "/research/wireless-ev-charging-policy",
    hrefLabel: "Wireless research policy",
  },
  {
    id: "precifarm-agent",
    title: "Precifarm Agent",
    horizon: "Now",
    workingTowards: "G3",
    progress: 62,
    stage: "Web workspace in early access",
    question:
      "Can an AI agent produce an EV charging and energy design that an installer trusts and an engineer is willing to sign?",
    summary:
      "Agentic AI that plans the job and calls deterministic engineering tools for every number: EV energy, charge time, peak load, solar, battery, inverter, voltage drop, protection and cost. Every result carries an evidence label.",
    goal:
      "Agent outputs agree with engineer-checked reference designs on at least 90% of a 50-case Kenyan benchmark by Q2 2027, then run on every Precifarm home survey.",
    targets: [
      { label: "Engineering tools in the kernel", value: "10 (all numbers from tools)" },
      { label: "Benchmark agreement", value: "≥ 90% on 50 graded cases" },
      { label: "Brief to first design", value: "< 10 minutes" },
      { label: "Results with an evidence label", value: "100%" },
    ],
    milestones: [
      { when: "Q4 2026", title: "Ten-tool kernel with visible calculation trace in the web workspace", status: "done" },
      { when: "Q1 2027", title: "Kenyan benchmark: 50 real survey cases graded by registered engineers", status: "active" },
      { when: "Q2 2027", title: "Install pack export: calc sheet, single line diagram, parts list", status: "next" },
      { when: "Q3 2027", title: "Agent used on live Pulse home surveys with partner installers (G3)", status: "next" },
      { when: "Q4 2027", title: "Desktop workspace and survey to quote handover", status: "later" },
    ],
    needs: [
      "Anonymised survey data and installers willing to grade outputs",
      "A standards reviewer for IEC 60364 and Kenyan wiring practice",
    ],
    href: "/agent",
    hrefLabel: "Try Precifarm Agent",
  },
  {
    id: "hub-energy",
    title: "Hub solar and storage",
    horizon: "Now",
    workingTowards: "G2",
    progress: 22,
    stage: "Site modelling",
    question:
      "What mix of grid, solar and battery keeps a Corridor site reliable and profitable on a weak rural feeder?",
    summary:
      "Hourly models of site load, PV yield and battery duty cycle for the first Corridor pilot sites on the Nairobi to Kisumu route, with honest live and planned labelling.",
    goal:
      "A validated sizing and dispatch method, checked against metered site data, that every new hub uses before construction from 2027.",
    targets: [
      { label: "Model vs metered energy error", value: "≤ 10% monthly" },
      { label: "Outage minutes covered by storage", value: "≥ 95% of logged events" },
      { label: "Peak grid draw reduction", value: "≥ 30% at a Corridor site" },
    ],
    milestones: [
      { when: "Q4 2026", title: "Load and PV yield model for the first Corridor site", status: "active" },
      { when: "Q1 2027", title: "Storage duty cycle simulated against Corridor DC session profiles", status: "next" },
      { when: "Q2 2027", title: "Revenue-grade metering on a live site; model validated (G2)", status: "next" },
      { when: "Q4 2027", title: "Dispatch controller pilot with Corridor site storage (G3)", status: "later" },
    ],
    needs: ["A site host with a weak feeder and a year of outage logs", "Utility tariff and demand charge data"],
    href: "/sustainability",
    hrefLabel: "Sustainability goals",
  },
  {
    id: "battery-health",
    title: "Battery health and second life",
    horizon: "Next",
    workingTowards: "G1",
    progress: 12,
    stage: "Data framing",
    question:
      "Can swap and charge data predict the health of a boda battery pack well enough to price swaps fairly and move tired packs into stationary storage?",
    summary:
      "State of health estimation from Boda Hub swap cycles and BMS telemetry, a capacity test protocol, and retirement rules that move packs from motorcycles to stationary duty such as Corridor site storage.",
    goal:
      "State of health estimated within ± 3% of a capacity test, and a second-life rule set proven on a stationary pilot by 2028.",
    targets: [
      { label: "State of health accuracy", value: "± 3% vs capacity test" },
      { label: "Usable second-life capacity", value: "≥ 70% of nameplate" },
      { label: "Packs traced end to end", value: "100%" },
    ],
    milestones: [
      { when: "Q1 2027", title: "Telemetry schema and logging on every swap pack", status: "next" },
      { when: "Q2 2027", title: "Capacity test protocol and first reference dataset (G1)", status: "next" },
      { when: "Q4 2027", title: "Health model validated against cycled packs (G2)", status: "later" },
      { when: "2028", title: "Second-life stationary pilot (G3)", status: "later" },
    ],
    needs: ["Cell cycling equipment or a university battery lab", "Swap data volume from Boda Hub sites"],
    href: "/charging/boda-hub",
    hrefLabel: "Boda Hub",
  },
  {
    id: "bidirectional",
    title: "Bidirectional charging and grid support",
    horizon: "Later",
    workingTowards: "G1",
    progress: 6,
    stage: "Question framed",
    question:
      "Can parked EVs and hub batteries keep Kenyan homes running in outages and support the feeder, under rules the utility accepts?",
    summary:
      "Vehicle to home backup first, then managed export from hub storage. Covers ISO 15118-20 bidirectional sessions, anti-islanding, metering and the regulatory path.",
    goal:
      "A vehicle to home outage demo with a compatible EV, and a written interconnection pathway agreed with regulators, by 2028.",
    targets: [
      { label: "Home backup from a parked EV", value: "≥ 4 h of essential load" },
      { label: "Anti-islanding trip", value: "Meets grid code timing" },
    ],
    milestones: [
      { when: "H2 2027", title: "Desk study: standards, vehicle support in Kenya, regulatory route (G1)", status: "later" },
      { when: "2028", title: "Bench vehicle to home demo with a compatible EV (G2)", status: "later" },
      { when: "2029", title: "Hosted pilot on one home or depot (G3)", status: "later" },
    ],
    needs: ["Access to a bidirectional-capable EV", "Early dialogue with the energy regulator and utility"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Goals and roadmap                                                   */
/* ------------------------------------------------------------------ */

export const researchGoals = [
  {
    year: "2027",
    title: "Measured, not modelled",
    text: "Wireless, Agent and hub energy each pass a bench or validation gate with a published report.",
  },
  {
    year: "2027",
    title: "First Kenyan pilots",
    text: "A wireless car pad bench report, and Agent-assisted home surveys running with partners for 90 days or more.",
  },
  {
    year: "2028",
    title: "Decisions on data",
    text: "Continue, licence or stop decisions on wireless charging and second-life storage, made on measured data.",
  },
  {
    year: "2029",
    title: "Research inside every product",
    text: "Every hub sized with the validated model, every survey run through Agent, and modules tracked from first swap to second life.",
  },
] as const;

export const researchRoadmap = {
  columns: [
    { id: "Now", label: "Now", window: "Q4 2026 to Q2 2027" },
    { id: "Next", label: "Next", window: "H2 2027" },
    { id: "Later", label: "Later", window: "2028 to 2029" },
  ],
  rows: [
    {
      programme: "Wireless charging",
      Now: "Car pad modelling and bench rig preparation",
      Next: "Car pad bench results, object protection, EMC pre-compliance",
      Later: "E-boda pad study; continue or stop decision on data",
    },
    {
      programme: "Precifarm Agent",
      Now: "Ten-tool kernel, Kenyan benchmark, install pack export",
      Next: "Live survey use, desktop workspace",
      Later: "Journey planning and approved M-Pesa actions",
    },
    {
      programme: "Hub solar and storage",
      Now: "Corridor load and PV model, metered validation",
      Next: "Dispatch controller pilot",
      Later: "Standard method for every new hub",
    },
    {
      programme: "Battery health",
      Now: "Telemetry schema on swap packs",
      Next: "Capacity protocol and health model",
      Later: "Second-life stationary pilot",
    },
    {
      programme: "Bidirectional",
      Now: "Watching vehicle support",
      Next: "Desk study and regulatory route",
      Later: "Vehicle to home bench and pilot",
    },
  ],
} as const;

export const researchCollaboration = [
  {
    who: "University labs",
    offer: "Joint bench work on coils, power electronics and battery ageing, with shared authorship on published reports.",
  },
  {
    who: "Site hosts",
    offer: "Host a pilot stand or a metered hub. You get early access, data and a revenue share once a product exists.",
  },
  {
    who: "Suppliers and OEMs",
    offer: "Receiver pad integration on test cars, ferrite and litz supply, bidirectional-capable vehicles for testing.",
  },
  {
    who: "Engineers and installers",
    offer: "Grade Precifarm Agent outputs on real survey cases and shape the install pack before general release.",
  },
] as const;

export const researchPageFaqs: FaqItem[] = [
  {
    question: "Can I buy wireless charging from Precifarm?",
    answer:
      "No. Wireless charging is a research programme and nothing is for sale. The Pulse charger is the wired charger we install today, with Lipa Pole Pole on M-Pesa; Pulse+ and Corridor are in development and pilot."
  },
  {
    question: "What does the progress bar mean?",
    answer:
      "Engineering completion toward the programme's next gate (G0 Frame to G4 Decide). It is not market share, installed base or a launch date.",
  },
  {
    question: "Why stage gates?",
    answer:
      "Each gate has written exit criteria, so a programme only moves forward on evidence. A programme can also stop at any gate, and we will say so here.",
  },
  {
    question: "Will you publish results?",
    answer:
      "Yes. Each G2 bench gate ends with a short public report. Partner data stays under the agreement signed before work starts.",
  },
  {
    question: "Can we collaborate on R&D?",
    answer:
      "Yes: universities, site hosts, suppliers and installers. Tell us which programme fits and we respond within one business day.",
  },
];

export const researchPage = {
  hero: {
    eyebrow: researchNavLabel,
    title: "The future of electric mobility, engineered in Africa.",
    lead: "Five programmes, each with a research question, a measurable goal and a dated path through five gates from model to Kenyan field pilot.",
    primaryCta: { href: "#programmes", label: "See the programmes" },
    secondaryCta: { href: "/contact", label: "Collaborate" },
    stats: [
      { value: "5", label: "Research programmes" },
      { value: "G0 to G4", label: "Evidence gates" },
      { value: researchNextReview, label: "Next public review" },
    ],
  },
  goals: {
    eyebrow: "Goals",
    title: "Where the research is going.",
    description: "Four outcomes we hold ourselves to. Each one is checked at a public review.",
  },
  method: {
    eyebrow: "Method",
    title: "Five gates. Evidence moves work forward.",
    description:
      "Every programme passes the same gates. Exit criteria are written before the work starts, and any programme can stop at any gate.",
  },
  programmes: {
    id: "programmes",
    eyebrow: "Programmes",
    title: "What we are working on, and how we get there.",
  },
  roadmap: {
    id: "roadmap",
    eyebrow: "Roadmap",
    title: "The path, programme by programme.",
    description: "Dates are targets for gate reviews. They move only when measured data says so, and we will note any change here.",
  },
  collaboration: {
    eyebrow: "Work with us",
    title: "Research needs partners.",
    description: "Each programme lists what it needs. These are the four ways in.",
  },
  note: `Progress updates when a programme passes a named gate. Last reviewed ${researchLastReviewed}. Next review ${researchNextReview}.`,
  cta: {
    title: "Partner on a research programme.",
    description: "Wireless hardware, Agent software, hub energy or battery health. Tell us which fits your lab, site or fleet.",
    primaryHref: "/contact",
    primaryLabel: "Contact R&D",
    secondaryHref: "/agent/chat",
    secondaryLabel: "Try the Agent workspace",
  },
} as const;
