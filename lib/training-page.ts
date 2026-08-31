/** Training page — structured copy and tables (data lives in lib/training.ts) */

import { productImages } from "@/lib/product-images";
import {
  evChargingTracks,
  trainingDeliveryDetails,
  trainingProgression,
  trainingTiers,
  trainingTrackMatrix,
} from "@/lib/training";

export const trainingPage = {
  hero: {
    eyebrow: "Training",
    title: "Certify your team on the chargers we deploy.",
    description:
      "T1, T2 and T3 programmes for hub staff, installers and field engineers — mapped to Pulse, Pod, Depot, Boda Hub and Corridor, with field modules on live Precifarm hardware.",
    primaryLabel: "Enquire about a cohort",
    secondaryLabel: "Engineering design basis",
    secondaryHref: "/charging/engineering",
    meta: "Nairobi classroom · corridor field modules · certificates within 5 business days",
  },
  stats: [
    { stat: "3 tiers", label: "T1 safety → T2 field tech → T3 commissioning" },
    { stat: "1–5 days", label: "Per tier — classroom plus supervised field work" },
    { stat: "6–16", label: "Participants per cohort · partner intakes on request" },
  ],
  why: {
    eyebrow: "Why Precifarm training",
    title: "Real hardware. Real hubs. Not generic EV theory.",
    cards: [
      {
        title: "Same kit you operate",
        text: "Courseware follows Pulse, Pod, Depot, Boda Hub and Corridor — the models Precifarm commissions in Kenya, not a generic OEM slide deck.",
      },
      {
        title: "Field modules on route",
        text: "T2 and T3 include supervised work on live hubs along the Nairobi–Kisumu corridor — CSMS, M-Pesa sessions and fault drills included.",
      },
      {
        title: "Clear scope of work",
        text: "Each certificate states what the holder may do — from safe passenger support at T1 to commissioning sign-off at T3 — so partners know who can open an enclosure.",
      },
    ],
  },
  tiers: {
    eyebrow: "Certification ladder",
    title: "Three tiers in sequence.",
    description:
      "Start at T1 unless engineering approves equivalence. T2 requires electrical trade or hub experience; T3 requires licensed electrical qualification and authorisation.",
    accent: {
      t1: "border-l-charge-500 bg-charge-50/50",
      t2: "border-l-forest-700 bg-muted/40",
      t3: "border-l-forest-900 bg-forest-50/80",
    } as const,
  },
  comparison: {
    eyebrow: "At a glance",
    title: "Compare tiers.",
    columns: ["Tier", "Duration", "Format", "Typical roles", "Certificate"] as const,
    caption: "Annual refresher for T2 and T3; T1 valid 24 months.",
  },
  curriculum: {
    eyebrow: "Curriculum",
    title: "Modules and assessed outcomes.",
    description: "Every tier ends with a written or practical assessment before the certificate is issued.",
    columns: ["Tier", "Modules", "You can after passing"] as const,
  },
  tracks: {
    eyebrow: "Product tracks",
    title: "Which tier for which charger?",
    description: "Plan a cohort by the hardware your team will run day to day.",
    matrixColumns: ["Track", "T1", "T2", "T3", "Guidance"] as const,
    products: [
      { id: "corridor", ...productImages.corridor, label: "Corridor · highway DC" },
      { id: "pulse", ...productImages.pulse, label: "Pulse · home 7 kW" },
      { id: "depot", ...productImages.depot, label: "Depot · fleet 22 kW" },
      { id: "boda", ...productImages.boda, label: "Boda Hub · swap" },
    ] as const,
    trackCards: evChargingTracks.map((track) => ({
      id: track.id,
      title: track.title,
      description: track.description,
      roles: track.roles,
      tiers: track.tiers.map((id) => trainingTiers.find((t) => t.id === id)?.code ?? id.toUpperCase()),
      topics: track.topics,
    })),
  },
  progression: {
    eyebrow: "Progression",
    title: "Moving between tiers.",
    columns: ["From", "To", "Requirement"] as const,
  },
  delivery: {
    eyebrow: "Delivery",
    title: "How cohorts run.",
    columns: ["Item", "Detail"] as const,
  },
  enrol: {
    eyebrow: "Enrol",
    title: "Book a cohort.",
    description: "Email team size, current tier and tracks needed. We confirm within one business day.",
    checklist: [
      "Organisation name and number of participants",
      "Current tier (T1, T2, T3 or none)",
      "Tracks: home, fleet, highway or boda",
      "Preferred month and contact phone",
    ],
    panelTitle: "Training enquiries",
  },
  faqs: {
    eyebrow: "Common questions",
    title: "Training FAQ.",
    description: "Certification scope, prerequisites and refresher policy.",
  },
  cta: {
    title: "Need engineers certified before go-live?",
    description: "Tell us your site type and team size — we schedule classroom and field modules around your commissioning window.",
    primaryLabel: "Enquire about training",
    secondaryLabel: "Contact sales",
    secondaryHref: "/contact",
  },
} as const;

export const trainingPageFaqs = [
  {
    id: "who-for",
    question: "Who should attend Precifarm EV charging training?",
    answer:
      "Hub operators and site hosts (T1), installation crews and maintenance leads for Pulse, Pod and Depot (T2), and commissioning engineers authorised to sign off Corridor and depot handover (T3). Fleet managers often send bay staff at T1 plus one T2 lead per site.",
  },
  {
    id: "prerequisites",
    question: "Do I need prior EV experience for T1?",
    answer:
      "No. T1 is open enrolment with basic workplace safety awareness recommended. T2 requires a valid T1 certificate plus electrical trade background or 12 months hub operations. T3 requires T2, a licensed electrical qualification and written authorisation from Precifarm engineering.",
  },
  {
    id: "hardware",
    question: "Is training aligned to Precifarm chargers only?",
    answer:
      "Yes. Modules reference Pulse, Pod, Depot, Boda Hub and Corridor hardware, Precifarm CSMS and M-Pesa session flows deployed on commissioned sites — not generic classroom simulators.",
  },
  {
    id: "refresher",
    question: "How long is each certificate valid?",
    answer:
      "T1 is valid 24 months. T2 and T3 require annual refresher and, for T3, authorisation renewal. Certificates are issued within five business days of passing assessment.",
  },
  {
    id: "partner-cohorts",
    question: "Can we run a private cohort for our fleet or dealer network?",
    answer:
      "Yes. Partner cohorts of 6–16 participants can be scheduled on request with custom dates. Field modules use live Precifarm hubs on the Nairobi–Kisumu corridor where applicable.",
  },
] as const;

export function trainingComparisonRows() {
  return trainingTiers.map((tier) => [
    `${tier.code} — ${tier.title}`,
    tier.duration,
    tier.format,
    tier.audience,
    tier.certificate,
  ]);
}

export function trainingCurriculumRows() {
  return trainingTiers.map((tier) => [
    `${tier.code} (${tier.duration})`,
    tier.modules.join(" · "),
    tier.canDoAfter,
  ]);
}

export function trainingTrackMatrixRows() {
  return trainingTrackMatrix.map((row) => [row.track, row.t1, row.t2, row.t3, row.note]);
}

export function trainingProgressionRows() {
  return trainingProgression.map((row) => [row.from, row.to, row.requirement]);
}

export function trainingDeliveryRows() {
  return trainingDeliveryDetails.map((row) => [row.item, row.detail]);
}
