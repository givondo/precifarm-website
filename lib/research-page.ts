/** R&D — three research programmes with public progress (not product claims). */

import type { FaqItem } from "@/lib/seo/types";
import { productImages } from "@/lib/product-images";

export const researchPath = "/research";

export const researchNavLabel = "R&D";

export type ResearchArea = {
  id: string;
  title: string;
  /** 0–100 engineering progress — not revenue or deployment traction */
  progress: number;
  stage: string;
  summary: string;
  focus: readonly string[];
  href?: string;
  hrefLabel?: string;
};

export const researchAreas: readonly ResearchArea[] = [
  {
    id: "wireless-ev",
    title: "Wireless EV charging",
    progress: 38,
    stage: "Architecture + bench",
    summary:
      "Inductive charging pads for home and depot — coil design, alignment, safety interlocks, and M-Pesa-ready metering. Not for sale; Pulse wired charging is what we install today.",
    focus: ["7–11 kW static WPT class", "FOD / LOP test plan", "Pilot site selection (Kenya)"],
    href: "/research/wireless-ev-charging-policy",
    hrefLabel: "Company policy",
  },
  {
    id: "precifarm-agent",
    title: "Precifarm Agent",
    progress: 62,
    stage: "Early access",
    summary:
      "Agentic AI for EV, solar and protection design — DeepSeek V4 Flash, engineering calculators, evidence labels. Web workspace live; OpenCode local setup available.",
    focus: ["Tool kernel (sizing calcs)", "Web + Android access", "Desktop workspace"],
    href: "/agent",
    hrefLabel: "Precifarm Agent",
  },
  {
    id: "hub-energy",
    title: "Hub solar & storage",
    progress: 22,
    stage: "Site modelling",
    summary:
      "How corridor and depot hubs blend grid, PV and battery storage without overstating uptime or carbon on the public map.",
    focus: ["Load + PV yield models", "Storage duty cycle with Corridor DC", "Honest Hub labelling rules"],
    href: "/sustainability",
    hrefLabel: "Sustainability goals",
  },
] as const;

export const researchPageFaqs: FaqItem[] = [
  {
    question: "Can I buy wireless charging from Precifarm?",
    answer:
      "No. It is research only. Order Pulse, Pod, Spark, Depot, Boda Hub or Corridor for wired charging with M-Pesa.",
  },
  {
    question: "What does the progress bar mean?",
    answer:
      "Internal engineering completion toward the next gate (bench sign-off, pilot readiness, or product beta). It is not market share or installed base.",
  },
  {
    question: "Can we collaborate on R&D?",
    answer: "Yes — universities, hosts and power-electronics partners. Contact us with your capability and we respond within one business day.",
  },
];

export const researchPage = {
  hero: {
    eyebrow: researchNavLabel,
    title: "Three research tracks. One honest progress bar each.",
    lead: "Nothing here is a catalogue product unless we say so on a product page. Bars show where engineering stands — not marketing traction.",
    image: productImages.pulse,
    imageCaption: "Commercial today: Pulse and Corridor wired charging.",
    primaryCta: { href: "/contact", label: "Collaborate" },
    secondaryCta: { href: "#programmes", label: "See programmes" },
  },
  programmes: {
    id: "programmes",
    eyebrow: "Research areas",
    title: "Where we are spending lab time.",
  },
  note: "Progress updates when we hit a named gate (bench report, beta release, or commissioned pilot). Last reviewed Q4 2026.",
  cta: {
    title: "Partner on a research track.",
    description: "Wireless hardware, Agent software, or hub energy modelling — tell us which area fits your lab or site.",
    primaryHref: "/contact",
    primaryLabel: "Contact R&D",
    secondaryHref: "/agent/chat",
    secondaryLabel: "Try Agent workspace",
  },
} as const;
