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
    source: "SAE J2954 (light-duty WPT, revision August 2024)",
    benchmark: "Three classes up to 11.1 kVA input (WPT1 3.7, WPT2 7.7, WPT3 11.1 kVA), 79 to 90 kHz band, parking tolerance ± 75 mm fore and aft and ± 100 mm lateral; 22 kVA planned. Heavy duty sits in J2954/2",
    note: "Global baseline for passenger static wireless charging interoperability.",
  },
  {
    source: "IEC 61980 series",
    benchmark: "IEC 61980-1:2020 general and EMC requirements (CISPR 11), plus parts for magnetic field WPT. Two- and three-wheelers are not yet covered; IEC lists them as under consideration",
    note: "Used as a compliance reference frame for any Precifarm pilot hardware.",
  },
  {
    source: "ISO 15118-20:2022",
    benchmark: "Digital communication for WPT sessions alongside wired charging protocols",
    note: "Research track for session control and future hub integration.",
  },
  {
    source: "Porsche Wireless Charging (Cayenne Electric)",
    benchmark: "Up to 11 kW factory option, orderable in Europe from 2026. Porsche claims up to 90% grid to battery; German list price about EUR 6,960 for ground plate and vehicle pad",
    note: "OEM benchmark for premium passenger static WPT. Not available from Precifarm.",
  },
  {
    source: "BMW (530e iPerformance Wireless Charging)",
    benchmark: "3.2 kW inductive pad offered from 2018 in limited markets, mostly to lease customers; no longer offered",
    note: "Shows multi-kW residential WPT has shipped at OEM level, at small volume.",
  },
  {
    source: "WiTricity / licensed automaker programmes",
    benchmark: "Resonant magnetic WPT licensing ecosystem for 7 to 11 kW class systems",
    note: "Industry pattern Precifarm studies; we do not claim WiTricity IP or licences unless disclosed.",
  },
  {
    source: "Fleet & depot WPT pilots (global)",
    benchmark: "Higher-power static bays (often 50 kW+) in limited bus and depot trials",
    note: "Precifarm depot research looks at alignment-first yards, not replacing commissioned Depot AC today.",
  },
  {
    source: "Published efficiency literature",
    benchmark: "Grid to battery efficiencies of about 85 to 93% are reported for well-aligned static car systems (Idaho National Laboratory measured up to 88.8% on a 3.3 kW system)",
    note: "Site, gap, and thermal management dominate; Precifarm publishes numbers only from measured bench data.",
  },
  {
    source: "Two-wheeler WPT (e-bikes and scooters)",
    benchmark: "No published WPT standard yet. The Wireless Power Consortium began light electric vehicle work in 2023; products are low power, for example a 150 W e-bike kickstand system",
    note: "Closest reference for Precifarm's e-boda track. Precifarm's 3.3 kW e-boda target is well above shipping two-wheeler systems.",
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
      "Wired beachhead: Customers needing charging today are directed to the wired products Precifarm markets.",
    ],
  },
  benchmarksIntro: {
    title: "3. Industry benchmarks (reference only)",
    description:
      "The table summarises what leading standards bodies and EV programmes publish or ship in supported markets. It is not a statement that Precifarm meets these figures today.",
  },
  targets: {
    title: "4. Precifarm research targets",
    description: "Internal targets, not results. They change when bench results require it.",
    items: [
      "Static WPT for electric motorcycles (e-bodas) first, at a 3.3 kW research target, then the passenger 7.7 to 11.1 kVA class (SAE J2954 WPT2 and WPT3).",
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
    secondaryLabel: "Research programmes",
  },
} as const;
