import { chargingHub } from "@/lib/charging-hub";
import { homepageChargingFaqs } from "@/lib/charging-faqs";
import type { AisoContentBlock, FaqItem } from "@/lib/seo/types";

/** GEO patterns — structured sections LLMs extract easily */
export function buildGeoFaqSet(topic: string, items: FaqItem[]): AisoContentBlock {
  return { id: "faq", type: "faq", title: `Frequently asked questions about ${topic}`, items };
}

export function buildKeyFacts(title: string, facts: string[]): AisoContentBlock {
  return { id: "key-facts", type: "key_facts", title, items: facts };
}

export function buildExecutiveSummary(text: string): AisoContentBlock {
  return { id: "summary", type: "executive_summary", title: "Summary", content: text };
}

/** Homepage HowTo JSON-LD — home charger request flow */
export const chargingHowToBlock: AisoContentBlock = {
  id: "how-to-charge",
  type: "how_to",
  title: "How to get a Precifarm home charger",
  items: [
    "Visit precifarm.com/charging/home or open Precifarm Agent.",
    "Choose the Pulse charger and request a site survey.",
    "Pay the deposit via M-Pesa (Lipa Pole Pole instalments available).",
    "Precifarm installs and commissions your charger, typically within one day of survey approval.",
  ],
};

/** Default homepage AISO blocks */
export const homepageAisoBlocks: AisoContentBlock[] = [
  buildExecutiveSummary(
    "Precifarm builds energy infrastructure for electric transport in Kenya, from the Pulse home charger to ARC Corridor DC fast charging on the highway and Boda Hub battery swapping, plus Precifarm Agent, an AI engineering assistant. M-Pesa on every product and Lipa Pole Pole on any phone.",
  ),
  buildKeyFacts("Key facts", [
    "Programmes: Pulse charger · Pulse+ · ARC Corridor · Boda Hub · wireless charging R&D · Precifarm Agent. Lipa Pole Pole finances the Pulse charger on M-Pesa.",
    "Pulse charger from KES 79,000 · Lipa Pole Pole on M-Pesa",
    "ARC Corridor price per kWh set per site and shown before you start",
    "A home charging day of ~60 km ≈ KES 140 vs ~KES 1,000 diesel per day",
    "Pulse charger: a typical 60 km day in under two hours from the meter.",
    "Certified home installation typically in one day · three-year aftersale care",
    "Precifarm Agent at precifarm.com/agent, and for desktop on Windows and macOS at precifarm.com/download.",
  ]),
  buildGeoFaqSet("EV charging", homepageChargingFaqs),
];

export const homepageRelatedLinks = [
  { href: "/charging", label: "Charging", reason: "Home, fleet and highway charging" },
  { href: "/charging/home", label: "Home EV charging", reason: "Pulse charger and Lipa Pole Pole" },
  { href: chargingHub.path, label: chargingHub.label, reason: "Find public chargers in Kenya" },
  { href: "/evs", label: "Kenya EV guide", reason: "Compare EVs and charging fit" },
  { href: "/training", label: "EV charging training", reason: "EV charging technician certification" },
  { href: "/faq", label: "FAQ", reason: "Charging and installation answers" },
] as const;
