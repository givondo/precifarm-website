/** Company policy for Precifarm wireless EV charging R&D. */

import type { FaqItem } from "@/lib/seo/types";

export const wirelessChargingPolicyPath = "/research/wireless-ev-charging-policy";

export const wirelessChargingPolicyEffective = "16 October 2026";

export const wirelessChargingPolicyFaqs: FaqItem[] = [
  {
    question: "What does this policy cover?",
    answer:
      "How Precifarm runs its wireless charging R&D and how we compare our work with industry references. For charging at home today, we install the wired Pulse charger, with Lipa Pole Pole on M-Pesa.",
  },
  {
    question: "How will Precifarm measure up to OEM wireless charging?",
    answer:
      "Through the gates in this policy: bench data first, then field data from Kenyan sites. Each step moves forward on measured results.",
  },
  {
    question: "Who owns safety sign-off?",
    answer:
      "Precifarm and qualified partners at each site. Foreign-object detection, living-object protection and EMC pass defined tests before any wireless site opens to drivers.",
  },
];

/** Public industry references. These are other organisations' figures, not Precifarm performance. */
export const wirelessIndustryBenchmarks = [
  {
    source: "SAE J2954 (light-duty WPT)",
    benchmark: "Standardised power classes up to 11 kW (WPT1 to WPT3) for stationary pad charging",
    note: "Global baseline for passenger static wireless charging interoperability.",
  },
  {
    source: "IEC 61980 series",
    benchmark: "Safety and performance requirements for EV wireless power transfer systems",
    note: "The compliance reference frame for Precifarm wireless hardware.",
  },
  {
    source: "ISO 15118-20",
    benchmark: "Digital communication for WPT sessions alongside wired charging protocols",
    note: "Basis for session control and future hub integration.",
  },
  {
    source: "Mercedes-Benz (optional factory WPT)",
    benchmark: "Up to 11 kW inductive home charging offered on select models in supported markets",
    note: "OEM benchmark for passenger static WPT.",
  },
  {
    source: "BMW (optional Wireless Charging)",
    benchmark: "Factory inductive pad programmes around the 3.2 to 3.7 kW class in prior generations",
    note: "Shows multi-kW residential WPT shipping at OEM level in some regions.",
  },
  {
    source: "WiTricity and licensed automaker programmes",
    benchmark: "Resonant magnetic WPT licensing ecosystem for 7 to 11 kW class systems",
    note: "An industry pattern Precifarm studies. Precifarm holds no WiTricity licence.",
  },
  {
    source: "Fleet and depot WPT trials (global)",
    benchmark: "Higher-power static bays (often 50 kW and above) in bus and depot trials",
    note: "Precifarm depot work looks at alignment-first yards alongside wired fleet AC charging.",
  },
  {
    source: "Published efficiency literature",
    benchmark: "Coil-to-battery efficiencies of about 85 to 93% quoted for well-aligned static systems",
    note: "Site, gap and thermal management dominate; Precifarm publishes efficiency from its own bench data.",
  },
] as const;

export const wirelessChargingPolicyPage = {
  hero: {
    eyebrow: "Company policy · R&D",
    title: "Wireless EV charging R&D policy",
    lead: "How Precifarm runs wireless power transfer (WPT) R&D, how we use industry benchmarks, and what must be true before wireless charging reaches a Kenyan site.",
  },
  scope: {
    title: "1. Scope",
    paragraphs: [
      "This policy covers Precifarm wireless EV charging R&D. Warranties, install terms and pricing for Pulse, Pulse+, Boda Hub, Corridor and Lipa Pole Pole are set in their own terms.",
      "Wireless pads, receivers and their software become a Precifarm offer through a product page with commercial terms of their own.",
    ],
  },
  principles: {
    title: "2. Principles",
    items: [
      "Site before claim: a wireless site opens to drivers once it is commissioned, metered and safety-reviewed.",
      "Measured before marketed: efficiency, kW class and alignment figures come from traceable bench or field data.",
      "Kenya first: grid quality, dust, parking behaviour and M-Pesa settlement are design inputs from day one.",
      "Wired today: drivers who need charging now get the wired chargers Precifarm installs and operates.",
    ],
  },
  benchmarksIntro: {
    title: "3. Industry benchmarks",
    description:
      "What leading standards bodies and EV programmes publish or ship in supported markets. These are the references Precifarm measures its own work against.",
  },
  targets: {
    title: "4. Precifarm R&D targets",
    description: "Internal gates, reviewed as bench results come in.",
    items: [
      "Static WPT in the passenger 7 to 11 kW class (the SAE J2954 WPT2 and WPT3 band), light-duty cars first.",
      "Foreign-object detection and living-object protection integrated before any hosted site.",
      "Alignment tolerance and driver feedback suited to shared parking at Kenyan sites.",
      "Session metering compatible with M-Pesa settlement.",
      "Product gate: a commercial offer once economics, uptime, EMC and safety match wired Pulse for the same duty cycle.",
    ],
  },
  governance: {
    title: "5. Governance and updates",
    paragraphs: [
      "R&D progress is reported on precifarm.com/research. Material changes to this policy are posted on this page with an updated effective date.",
      "Partners (universities, site hosts, power electronics suppliers) work under a written scope before hardware is installed.",
    ],
  },
  cta: {
    title: "Questions or collaboration",
    description: "For R&D partnerships or policy questions, contact the Precifarm R&D team.",
    primaryHref: "/contact",
    primaryLabel: "Contact R&D",
    secondaryHref: "/research",
    secondaryLabel: "Precifarm R&D",
  },
} as const;
