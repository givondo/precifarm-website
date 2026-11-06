/** /faq: topic groups over the existing charging FAQ data (lib/charging-faqs.ts). No new answers here. */

import { chargingHubFaq, consumerChargingFaqs, faqIndexChargingFaqs } from "@/lib/charging-faqs";
import type { FaqEntry } from "@/components/faq/FaqList";

export const faqTopics = [
  { id: "costs", label: "Costs and pricing" },
  { id: "home", label: "Home charging" },
  { id: "public", label: "Public and highway" },
  { id: "payments", label: "M-Pesa and payments" },
  { id: "boda", label: "Boda Hub" },
  { id: "agent", label: "Precifarm Agent" },
  { id: "company", label: "Company and training" },
] as const;

export type FaqTopicId = (typeof faqTopics)[number]["id"];

/** Topic for each FAQ id in lib/charging-faqs.ts. */
const topicById: Record<string, FaqTopicId> = {
  "home-day-cost": "costs",
  "pulse-price": "costs",
  "public-dc-price": "costs",
  "home-vs-public": "costs",
  "lipa-pole-pole": "payments",
  "get-home-charger": "home",
  "house-installation-includes": "home",
  "pulse-safety": "home",
  "pulse-plus": "home",
  "home-charge-time": "home",
  "solar-vs-grid": "home",
  "pay-public": "payments",
  "payment-methods": "payments",
  "public-locations": "public",
  "charging-hub": "public",
  corridor: "public",
  "boda-hub": "boda",
  "ai-companion": "agent",
  wireless: "company",
  training: "company",
  "what-is-precifarm": "company",
};

const pool = [...consumerChargingFaqs, chargingHubFaq];

/** The /faq list in its published order, with ids and topics attached. */
export const faqIndexEntries: FaqEntry[] = faqIndexChargingFaqs.map((item) => {
  const match = pool.find((p) => p.question === item.question);
  const id = match?.id ?? item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return { id, question: item.question, answer: item.answer, topic: topicById[id] ?? "company" };
});

export function faqTopicLabel(id: string): string | undefined {
  return faqTopics.find((t) => t.id === id)?.label;
}
