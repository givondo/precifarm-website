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
    "Visit precifarm.com/charging/private-house or open the Precifarm app.",
    "Choose the Pulse charger or Pod energy storage and request a site survey.",
    "Pay the deposit via M-Pesa (Lipa Pole Pole instalments available).",
    "Precifarm installs and commissions your charger — typically within one day after survey approval.",
  ],
};

/** Default homepage AISO blocks */
export const homepageAisoBlocks: AisoContentBlock[] = [
  buildExecutiveSummary(
    "Precifarm designs, finances, deploys and operates electric mobility infrastructure in Kenya — from a Spark charger in the boot to Corridor DC on the highway. One account, M-Pesa on every product, Lipa Pole Pole on any phone.",
  ),
  buildKeyFacts("Key facts", [
    "Chargers: Spark charger · Pulse charger · Pod energy storage · Boda Hub · Depot · Corridor. Lipa Pole Pole finances Pulse charger and Pod energy storage on M-Pesa.",
    "Pulse charger from KES 79,000 · Lipa Pole Pole on M-Pesa",
    "Public DC from KES 39/kWh at Depot charging stations and Corridor charging",
    "A home charging day of ~60 km ≈ KES 140 vs ~KES 1,000 diesel per day",
    "Pulse charger or Pod energy storage: typical day in about 90 minutes. Corridor: fast highway top-up in 30 minutes.",
    "Certified home installation typically in one day · three-year aftersale care",
  ]),
  buildGeoFaqSet("EV charging", homepageChargingFaqs),
];

export const homepageRelatedLinks = [
  { href: "/charging", label: "Charging", reason: "Home, fleet and highway charging" },
  { href: "/charging/private-house", label: "Home EV charging", reason: "Pulse charger and Pod energy storage" },
  { href: chargingHub.path, label: chargingHub.label, reason: "Find public chargers in Kenya" },
  { href: "/evs", label: "Kenya EV guide", reason: "Compare EVs and charging fit" },
  { href: "/training", label: "Training", reason: "EV charging technician certification" },
  { href: "/faq", label: "FAQ", reason: "Charging and installation answers" },
] as const;
