import { contact } from "@/lib/contact";
import { chargingOfferings } from "@/lib/charging";

export type TrainingTierId = "t1" | "t2" | "t3";

export type TrainingTier = {
  id: TrainingTierId;
  code: string;
  title: string;
  subtitle: string;
  duration: string;
  format: string;
  audience: string;
  summary: string;
  assessment: string;
  certificate: string;
  canDoAfter: string;
  outcomes: string[];
  modules: string[];
};

export type EvChargingTrack = {
  id: string;
  title: string;
  description: string;
  tiers: TrainingTierId[];
  topics: string[];
  roles: string;
};

export const trainingHeroImage = {
  src: chargingOfferings.routeHub.image,
  alt: "Field engineers and hub staff at a Precifarm DC fast charging site with solar canopy and battery storage on an intercity route",
  caption:
    "Training uses the same charger models, monitoring tools and hub layouts deployed on live Precifarm routes.",
} as const;

export const trainingIntro = {
  eyebrow: "Training",
  title: "EV charging training — T1, T2 and T3",
  description:
    "Precifarm trains hub staff, partner operators and field engineers to work safely on DC fast charging, solar-backed hubs and fleet charging across Kenya.",
  lead:
    "Our three-tier programme builds competence in a clear sequence: safe awareness (T1), routine field maintenance (T2), then commissioning and advanced diagnostics (T3). Every module is mapped to the chargers, CSMS and hub layouts we operate on live intercity routes — not generic classroom theory.",
  whoShouldAttend: [
    "Hub operators and site hosts on Nairobi–Kisumu and partner locations",
    "Partner bus operators, fleet managers and front-line depot staff",
    "Field engineers, electricians and maintenance teams installing or servicing chargers",
    "Precifarm partner cohorts — operators, financiers and OEM field teams on request",
  ],
} as const;

export const trainingTiers: TrainingTier[] = [
  {
    id: "t1",
    code: "T1",
    title: "Awareness & site safety",
    subtitle: "Entry level",
    duration: "1 day",
    format: "Classroom (4 hrs) + guided hub walkthrough (4 hrs)",
    audience: "Hub staff, drivers, site hosts, partner front-line teams",
    summary:
      "Understand EV charging fundamentals, high-voltage safety and Precifarm hub protocols before working near energized equipment or passenger areas.",
    assessment: "Written safety quiz + observed hub walkthrough checklist",
    certificate: "Precifarm T1 — EV charging site safety (valid 24 months)",
    canDoAfter:
      "Work safely near chargers, support passenger dwell, report faults and follow emergency procedures — without opening enclosures or performing live repairs.",
    outcomes: [
      "Identify DC charger components, CCS2 connectors and isolation points",
      "Follow lock-out / tag-out and emergency stop procedures",
      "Escalate faults correctly without attempting live repairs",
      "Support passengers and fleet dwell safely during charging windows",
    ],
    modules: [
      "EV and battery basics for intercity buses and fleet vehicles",
      "High-voltage awareness and PPE requirements",
      "Hub layout: chargers, solar canopy, storage and passenger zones",
      "Incident reporting, CCTV and emergency contact escalation",
    ],
  },
  {
    id: "t2",
    code: "T2",
    title: "Field technician",
    subtitle: "Intermediate",
    duration: "3 days",
    format: "2 days classroom + 1 day supervised field work on a live hub",
    audience: "Hub operators, maintenance staff, partner technicians",
    summary:
      "Perform routine inspection, cleaning, connector care and first-line fault recovery on Precifarm DC chargers — with remote support from our engineering team.",
    assessment: "Practical fault-drill assessment + CSMS log review",
    certificate: "Precifarm T2 — EV charging field technician (annual refresher required)",
    canDoAfter:
      "Run daily hub checks, resolve common first-line faults, reset sessions and coordinate spares with Precifarm NOC — within defined SLA boundaries.",
    outcomes: [
      "Run daily pre-session checks and post-session logs",
      "Handle common CCS2 cable, contactor and cooling faults",
      "Read charger status, session data and OCPP alerts in the CSMS",
      "Coordinate spare parts and SLA response with Precifarm NOC",
    ],
    modules: [
      "DC fast charging operation (IEC 61851 / CCS2)",
      "Preventive maintenance schedules and thermal inspection",
      "OCPP monitoring, session troubleshooting and reset procedures",
      "Solar + storage awareness at route hubs (read-only interfaces)",
    ],
  },
  {
    id: "t3",
    code: "T3",
    title: "Specialist & commissioning",
    subtitle: "Advanced",
    duration: "5 days",
    format: "2 days classroom + 1 day lab + 2 days live hub commissioning module",
    audience: "Lead engineers, commissioning teams, authorised partner specialists",
    summary:
      "Commission, acceptance-test and maintain Precifarm charging infrastructure — including load management, BESS integration and advanced diagnostics on route hubs.",
    assessment: "Commissioning checklist sign-off + supervised acceptance test on live hardware",
    certificate: "Precifarm T3 — EV charging specialist (annual refresher + authorisation renewal)",
    canDoAfter:
      "Lead commissioning, configure CSMS reservations and load sharing, diagnose module-level faults and sign off hub handover documentation.",
    outcomes: [
      "Execute charger acceptance tests against Precifarm checklists",
      "Configure power sharing, reservations and fleet windows in CSMS",
      "Diagnose module, communication and payment-layer faults",
      "Document handover, warranty evidence and ten-year spares planning",
    ],
    modules: [
      "Electrical isolation, earthing and Kenya grid / EPRA compliance context",
      "Commissioning: 400 V and 800 V vehicle envelope validation",
      "BESS, dynamic load management and hub power architecture",
      "Cybersecurity basics, OTA updates and audit-ready maintenance records",
    ],
  },
];

/** At-a-glance comparison for the summary table */
export const trainingTierComparison = trainingTiers.map((tier) => ({
  tier: tier.code,
  level: tier.subtitle,
  duration: tier.duration,
  format: tier.format,
  audience: tier.audience,
  certificate: tier.certificate,
  href: `#${tier.id}`,
}));

export const trainingProgression = [
  {
    from: "No prior EV experience",
    to: "T1",
    requirement: "Open enrolment. Basic workplace safety awareness recommended.",
  },
  {
    from: "T1",
    to: "T2",
    requirement: "Valid T1 certificate + electrical trade background or 12 months hub operations experience.",
  },
  {
    from: "T2",
    to: "T3",
    requirement: "Valid T2 certificate + licensed electrical qualification + written authorisation from Precifarm engineering.",
  },
] as const;

export const evChargingTracks: EvChargingTrack[] = [
  {
    id: "route-hub",
    title: "Route hub charging",
    description:
      "DC fast charging under solar canopies on intercity corridors — the core of Nairobi–Kisumu operations.",
    tiers: ["t1", "t2", "t3"],
    roles: "Hub operators, route engineers, partner depot leads",
    topics: [
      "Reserved bus charging windows and fleet dwell",
      "Multi-port load sharing and queue management",
      "Uptime targets, MTTR and passenger communication",
    ],
  },
  {
    id: "home",
    title: "Home EV charging",
    description:
      "Residential DC installs integrated with Neura Pod solar and storage — survey through five-year service.",
    tiers: ["t2", "t3"],
    roles: "Install engineers, survey teams, warranty service technicians",
    topics: [
      "Site survey, earthing and consumer protection",
      "Wallbox / DC unit install and customer handover",
      "Remote monitoring and warranty service visits",
    ],
  },
  {
    id: "private-site",
    title: "Private in-house stations",
    description:
      "Campus, estate and industrial sites with dedicated charging for fleets and staff vehicles.",
    tiers: ["t2", "t3"],
    roles: "Project engineers, estate facilities teams, fleet managers",
    topics: [
      "Multi-bay layout, access control and billing options",
      "Fleet invoicing without per-session friction",
      "Expansion planning: spare ducts, switchboard ways and MV headroom",
    ],
  },
  {
    id: "fleet",
    title: "Fleet & logistics charging",
    description:
      "Contracted daytime charging for cargo vans and depot fleets on the same dependable hub network.",
    tiers: ["t1", "t2"],
    roles: "Fleet dispatch, cargo partners, depot supervisors",
    topics: [
      "ET01 cargo van and mixed-fleet CCS2 compatibility",
      "Depot overnight vs route-side daytime charging",
      "Energy cost reporting for fleet operators",
    ],
  },
];

export type TrackTierLevel = "Required" | "Recommended" | "—";

export const trainingTrackMatrix: {
  track: string;
  t1: TrackTierLevel;
  t2: TrackTierLevel;
  t3: TrackTierLevel;
  note: string;
}[] = [
  {
    track: "Route hub charging",
    t1: "Required",
    t2: "Required",
    t3: "Required",
    note: "All tiers needed for full hub operations on Nairobi–Kisumu",
  },
  {
    track: "Home EV charging",
    t1: "—",
    t2: "Required",
    t3: "Recommended",
    note: "T3 for lead installers and commissioning sign-off",
  },
  {
    track: "Private in-house stations",
    t1: "—",
    t2: "Required",
    t3: "Recommended",
    note: "T3 for multi-bay sites with load management and BESS",
  },
  {
    track: "Fleet & logistics charging",
    t1: "Required",
    t2: "Required",
    t3: "—",
    note: "T1 for depot staff; T2 for fleet hub maintenance leads",
  },
];

export const trainingDeliveryDetails = [
  { item: "Classroom venue", detail: "Nairobi — Precifarm training facility" },
  { item: "Field modules", detail: "Live Precifarm hubs on the Nairobi–Kisumu corridor" },
  { item: "Cohort size", detail: "6–16 participants per intake (partner cohorts on request)" },
  { item: "Language", detail: "English (Kiswahili support materials on request)" },
  { item: "Equipment", detail: "Same DC charger models and CSMS used on deployed hubs" },
  { item: "Certificate issue", detail: "Within 5 business days of passing assessment" },
  { item: "Refresher", detail: "Annual for T2 and T3; T1 valid 24 months" },
  { item: "Partner cohorts", detail: "Custom dates for operators, site hosts and OEM teams" },
] as const;

export const trainingPrerequisites = [
  {
    tier: "T1",
    requirement: "No prior EV experience required. Basic workplace safety awareness recommended.",
  },
  {
    tier: "T2",
    requirement: "T1 certificate (or equivalent) plus electrical trade background or 12 months hub operations.",
  },
  {
    tier: "T3",
    requirement: "T2 certificate, licensed electrical qualification and authorisation from Precifarm engineering.",
  },
] as const;

export const trainingDelivery = [
  "Classes run in Nairobi with field modules on the Nairobi–Kisumu corridor.",
  "Partner cohorts available on request for operators and site hosts.",
  "Certificates issued per tier with annual refresher for T2 and T3.",
  "Training content aligned to chargers and CSMS deployed on Precifarm hubs.",
] as const;

export function getTrainingTier(id: TrainingTierId): TrainingTier | undefined {
  return trainingTiers.find((tier) => tier.id === id);
}

export function trainingEnquiryMailto(): string {
  const subject = encodeURIComponent("Training cohort enquiry — Precifarm EV charging");
  const body = encodeURIComponent(
    [
      "Hello Precifarm training team,",
      "",
      "Organisation:",
      "Team size:",
      "Current tier (if any): T1 / T2 / T3 / None",
      "Modules needed (tick all that apply):",
      "  [ ] Route hub charging",
      "  [ ] Home EV charging",
      "  [ ] Private in-house stations",
      "  [ ] Fleet & logistics",
      "Preferred month or dates:",
      "",
      "Contact name & phone:",
      "",
      "Additional notes:",
    ].join("\n"),
  );

  return `mailto:${contact.trainingEmail}?subject=${subject}&body=${body}`;
}
