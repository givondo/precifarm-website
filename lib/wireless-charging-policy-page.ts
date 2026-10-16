/** Company policy — Wireless EV charging R&D (public, not a product spec). */

import type { FaqItem } from "@/lib/seo/types";

export const wirelessChargingPolicyPath = "/research/wireless-ev-charging-policy";

export const wirelessChargingPolicyEffective = "16 October 2026";

export const wirelessChargingPolicyFaqs: FaqItem[] = [
  {
    question: "Is this policy a product datasheet?",
    answer:
      "No. It explains how Precifarm runs wireless charging research and how we compare against industry references. Sellable products remain wired Pulse, Pod, Spark, Depot, Boda Hub and Corridor.",
  },
  {
    question: "When will Precifarm match OEM wireless charging?",
    answer:
      "Only if bench and pilot data meet the gates in this policy. We do not commit to a ship date or to matching any single OEM feature on a marketing timeline.",
  },
  {
    question: "Who owns safety sign-off?",
    answer:
      "Precifarm and qualified partners on each pilot. Foreign-object detection, living-object protection and EMC must pass defined tests before a site is labelled live on Charging Hub.",
  },
];

/** Public industry references — not Precifarm performance claims. */
export const wirelessIndustryBenchmarks = [
  {
    source: "SAE J2954 (light-duty WPT)",
    benchmark: "Standardised power classes up to 11 kW (WPT1–WPT3) for stationary pad charging",
    note: "Global baseline for passenger static wireless charging interoperability.",
  },
  {
    source: "IEC 61980 series",
    benchmark: "Safety and performance requirements for EV wireless power transfer systems",
    note: "Used as a compliance reference frame for any Precifarm pilot hardware.",
  },
  {
    source: "ISO 15118-20",
    benchmark: "Digital communication for WPT sessions alongside wired charging protocols",
    note: "Research track for session control and future hub integration.",
  },
  {
    source: "Mercedes-Benz (optional factory WPT)",
    benchmark: "Up to 11 kW inductive home charging offered on select models in supported markets",
    note: "OEM benchmark for luxury passenger static WPT — not available from Precifarm today.",
  },
  {
    source: "BMW (optional Wireless Charging)",
    benchmark: "Factory/inductive pad programmes around ~3.2–3.7 kW class in prior generations",
    note: "Shows multi-kW residential WPT is shipping at OEM level in some regions.",
  },
  {
    source: "WiTricity / licensed automaker programmes",
    benchmark: "Resonant magnetic WPT licensing ecosystem for 7–11 kW class systems",
    note: "Industry pattern Precifarm studies; we do not claim WiTricity IP or licences unless disclosed.",
  },
  {
    source: "Fleet & depot WPT pilots (global)",
    benchmark: "Higher-power static bays (often 50 kW+) in limited bus and depot trials",
    note: "Precifarm depot research looks at alignment-first yards, not replacing commissioned Depot AC today.",
  },
  {
    source: "Published efficiency literature",
    benchmark: "Typical coil-to-battery efficiencies often quoted ~85–93% for well-aligned static systems",
    note: "Site, gap, and thermal management dominate; Precifarm publishes numbers only from measured bench data.",
  },
] as const;

export const wirelessChargingPolicyPage = {
  hero: {
    eyebrow: "Company policy · R&D",
    title: "Wireless EV charging research policy",
    lead: "How Precifarm runs wireless power transfer (WPT) research, how we use industry benchmarks, and what must be true before anything leaves the lab.",
  },
  scope: {
    title: "1. Scope",
    paragraphs: [
      "This policy applies to Precifarm’s wireless EV charging research programme only. It does not amend warranties, install terms, or pricing for Pulse, Pod, Spark, Depot, Boda Hub, Corridor, or Lipa Pole Pole.",
      "Wireless charging pads, receivers, and related software described here are not products for sale unless a separate product page and commercial terms say otherwise.",
    ],
  },
  principles: {
    title: "2. Principles",
    items: [
      "Live vs lab: Charging Hub and marketing may not label wireless hardware as live until commissioned, metered, and safety-reviewed.",
      "Measured vs marketed: Efficiency, kW class, and alignment claims require traceable bench or field data.",
      "Kenya-first: Grid quality, dust, parking behaviour, and M-Pesa settlement are design inputs from day one.",
      "Wired beachhead: Customers needing charging today are directed to wired products Precifarm installs and operates.",
    ],
  },
  benchmarksIntro: {
    title: "3. Industry benchmarks (reference only)",
    description:
      "The table summarises what leading standards bodies and EV programmes publish or ship in supported markets. It is not a statement that Precifarm meets these figures today.",
  },
  targets: {
    title: "4. Precifarm research targets",
    description: "Internal gates — subject to change when bench results require it.",
    items: [
      "Static WPT in the passenger 7–11 kW class (aligned with SAE J2954 WPT2/WPT3 research band).",
      "Foreign-object detection and living-object protection integrated before any hosted pilot.",
      "Alignment tolerance and driver feedback suitable for shared parking in Kenyan sites.",
      "Session metering compatible with M-Pesa settlement and Charging Hub live/planned labels.",
      "Product gate: commercial offer only if economics, uptime, EMC, and safety match wired Pulse for the same duty cycle.",
    ],
  },
  governance: {
    title: "5. Governance & updates",
    paragraphs: [
      "R&D progress is reported on precifarm.com/research. Material changes to this policy are posted on this page with an updated effective date.",
      "Partners (universities, site hosts, power-electronics suppliers) operate under written scope before hardware is installed.",
    ],
  },
  cta: {
    title: "Questions or collaboration",
    description: "For R&D partnerships or policy clarifications, contact Precifarm — not the home survey queue.",
    primaryHref: "/contact",
    primaryLabel: "Contact R&D",
    secondaryHref: "/research",
    secondaryLabel: "R&D progress",
  },
} as const;
