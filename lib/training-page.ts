/** Training page copy. Tier, track and delivery data live in lib/training.ts. */

import { trainingNavLabel } from "@/lib/training";

export const trainingPage = {
  hero: {
    eyebrow: trainingNavLabel,
    title: "EV charging training in three tiers: T1, T2 and T3.",
    description:
      "Precifarm certificates for site staff, installers and field engineers on the Pulse charger, Pulse+, Boda Hub and Corridor: Nairobi classroom and supervised field modules.",
    primaryLabel: "Enquire about a cohort",
  },
  facts: [
    { value: "T1, T2, T3", label: "Taken in sequence" },
    { value: "1 to 5 days", label: "Per tier" },
    { value: "6 to 16", label: "People per cohort" },
    { value: "5 business days", label: "To certificate after passing" },
  ],
  qualification: {
    title: "What the certificate is, and is not",
    text: "Certificates are issued by Precifarm and cover work on the equipment Precifarm installs. They are not a government licence or an accredited national qualification, and they do not replace the licensed electrical qualification that T3 already requires.",
  },
  nav: [
    { href: "#ladder", label: "Tiers" },
    { href: "#t1", label: "T1" },
    { href: "#t2", label: "T2" },
    { href: "#t3", label: "T3" },
    { href: "#tracks", label: "Product tracks" },
    { href: "#delivery", label: "Delivery" },
    { href: "#enrol", label: "Enrol" },
    { href: "#faq", label: "FAQ" },
  ] as const,
  ladder: {
    eyebrow: "Certification ladder",
    title: "Three tiers, each with a clear scope of work.",
    lead: "Start at T1 unless Precifarm engineering approves equivalence. Each certificate states what the holder may do, so partners know who can open an enclosure.",
  },
  tracks: {
    eyebrow: "Product tracks",
    title: "Which tiers each product needs.",
    lead: "Plan a cohort by the hardware your team will work on day to day.",
  },
  delivery: {
    eyebrow: "Delivery",
    title: "How cohorts run.",
  },
  enrol: {
    eyebrow: "Enrol",
    title: "Book a cohort.",
    lead: "Email us your team size, current tier and the tracks you need. We reply within one business day.",
    checklist: [
      "Organisation name and number of participants",
      "Current tier (T1, T2, T3 or none)",
      "Tracks: home, fleet, highway or boda",
      "Preferred month and a contact phone",
    ],
  },
} as const;

export const trainingPageFaqs = [
  {
    id: "who-for",
    question: "Who should attend Precifarm EV charging training?",
    answer:
      "Site operators and hosts (T1), installation crews and maintenance leads for Pulse and Pulse+ (T2), and commissioning engineers authorised to sign off Corridor and depot handover (T3). Fleet managers often send bay staff at T1 plus one T2 lead per site.",
  },
  {
    id: "prerequisites",
    question: "Do I need prior EV experience for T1?",
    answer:
      "No. T1 is open enrolment, with basic workplace safety awareness recommended. T2 requires a valid T1 certificate plus an electrical trade background or 12 months of site operations. T3 requires T2, a licensed electrical qualification and written authorisation from Precifarm engineering.",
  },
  {
    id: "accreditation",
    question: "Is the certificate a licence or a national qualification?",
    answer:
      "No. It is a Precifarm certificate for work on the equipment Precifarm installs. It does not replace an electrical licence, which T3 candidates must already hold.",
  },
  {
    id: "hardware",
    question: "Is training aligned to Precifarm chargers only?",
    answer:
      "Yes. Modules reference Pulse, Pulse+, Boda Hub and Corridor hardware, the Precifarm CSMS and M-Pesa session flows, not generic classroom simulators.",
  },
  {
    id: "refresher",
    question: "How long is each certificate valid?",
    answer:
      "T1 is valid for 24 months. T2 and T3 need an annual refresher and, for T3, authorisation renewal. Certificates are issued within five business days of passing the assessment.",
  },
  {
    id: "partner-cohorts",
    question: "Can we run a private cohort for our fleet or dealer network?",
    answer:
      "Yes. Partner cohorts of 6 to 16 participants can be scheduled on request with custom dates. Field modules use Precifarm installation sites where available.",
  },
] as const;
