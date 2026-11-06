import { contact } from "@/lib/contact";

/** Public nav, breadcrumbs and page eyebrow — keep in sync across the site. */
export const trainingNavLabel = "EV charging training";

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

/** Same frame as homepage hero poster (Pulse @ 0:42 in Precifarm_Ad_v2). */
export const trainingHeroImage = {
  src: "/images/home-hero-video-wallpaper.jpg",
  alt: "Precifarm Pulse 7 kW home wallbox on a Kenyan home",
} as const;

export const trainingIntro = {
  eyebrow: trainingNavLabel,
  title: "EV charging training: T1, T2 and T3",
  description:
    "Precifarm certificates for site staff, installers and field engineers on the chargers Precifarm installs in Kenya.",
  lead:
    "Three tiers in sequence: site safety (T1), routine maintenance (T2), then commissioning and diagnostics (T3). Mapped to Pulse, Pulse+, Boda Hub and Corridor, not generic classroom theory.",
  whoShouldAttend: [
    "Hub operators and site hosts",
    "Home installation crews for Pulse",
    "Fleet, depot and boda operators",
    "Field engineers and electricians servicing chargers",
  ],
} as const;

export const trainingTiers: TrainingTier[] = [
  {
    id: "t1",
    code: "T1",
    title: "Awareness & site safety",
    subtitle: "Entry level",
    duration: "1 day",
    format: "Classroom (4 hours) and a guided site walkthrough (4 hours)",
    audience: "Hub staff, drivers, site hosts, partner front-line teams",
    summary:
      "Understand EV charging fundamentals, high-voltage safety and Precifarm site protocols before working near energised equipment or public bays.",
    assessment: "Written safety quiz and an observed site walkthrough checklist",
    certificate: "Precifarm T1: EV charging site safety (valid 24 months)",
    canDoAfter:
      "Work safely near chargers, support drivers during a session, report faults and follow emergency procedures, without opening enclosures or performing live repairs.",
    outcomes: [
      "Identify DC charger components, CCS2 connectors and isolation points",
      "Follow lock-out, tag-out and emergency stop procedures",
      "Escalate faults correctly without attempting live repairs",
      "Keep drivers and site users clear of live bays during charging windows",
    ],
    modules: [
      "EV and battery basics for cars, vans and fleet vehicles",
      "High-voltage awareness and PPE requirements",
      "Hub layout: chargers, solar canopy, storage and public dwell areas",
      "Incident reporting, CCTV and emergency contact escalation",
    ],
  },
  {
    id: "t2",
    code: "T2",
    title: "Field technician",
    subtitle: "Intermediate",
    duration: "3 days",
    format: "2 days classroom and 1 day of supervised field work at an installation site",
    audience: "Site operators, maintenance staff, partner technicians",
    summary:
      "Perform routine inspection, cleaning, connector care and first-line fault recovery on Precifarm chargers, with remote support from our engineering team.",
    assessment: "Practical fault-drill assessment and a CSMS log review",
    certificate: "Precifarm T2: EV charging field technician (annual refresher required)",
    canDoAfter:
      "Run daily site checks, resolve common first-line faults, reset sessions and coordinate spares with Precifarm engineering, within defined service limits.",
    outcomes: [
      "Run daily pre-session checks and post-session logs",
      "Handle common CCS2 cable, contactor and cooling faults",
      "Read charger status, session data and OCPP alerts in the CSMS",
      "Coordinate spare parts and service response with Precifarm engineering",
    ],
    modules: [
      "DC fast charging operation (IEC 61851, CCS2)",
      "Preventive maintenance schedules and thermal inspection",
      "OCPP monitoring, session troubleshooting and reset procedures",
      "Solar and storage awareness at route sites (read-only interfaces)",
    ],
  },
  {
    id: "t3",
    code: "T3",
    title: "Specialist & commissioning",
    subtitle: "Advanced",
    duration: "5 days",
    format: "2 days classroom, 1 day lab and 2 days of supervised commissioning",
    audience: "Lead engineers, commissioning teams, authorised partner specialists",
    summary:
      "Commission, acceptance-test and maintain Precifarm charging infrastructure, including load management, BESS integration and advanced diagnostics at route sites.",
    assessment: "Commissioning checklist sign-off and a supervised acceptance test on energised hardware",
    certificate: "Precifarm T3: EV charging specialist (annual refresher and authorisation renewal)",
    canDoAfter:
      "Lead commissioning, configure CSMS reservations and load sharing, diagnose module-level faults and sign off site handover documentation.",
    outcomes: [
      "Execute charger acceptance tests against Precifarm checklists",
      "Configure power sharing, reservations and fleet windows in CSMS",
      "Diagnose module, communication and payment-layer faults",
      "Document handover, warranty evidence and ten-year spares planning",
    ],
    modules: [
      "Electrical isolation, earthing, and the Kenya grid and EPRA compliance context",
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
    requirement: "Valid T1 certificate, plus an electrical trade background or 12 months of site operations experience.",
  },
  {
    from: "T2",
    to: "T3",
    requirement: "Valid T2 certificate, a licensed electrical qualification and written authorisation from Precifarm engineering.",
  },
] as const;

export const evChargingTracks: EvChargingTrack[] = [
  {
    id: "route-hub",
    title: "Highway charging",
    description:
      "ARC Corridor at highway sites: CCS2 DC, site status and M-Pesa session pay.",
    tiers: ["t1", "t2", "t3"],
    roles: "Site operators, route engineers, partner depot leads",
    topics: [
      "ARC Corridor sessions and load sharing",
      "Site status and M-Pesa session pay",
      "Uptime targets and honest recovery",
    ],
  },
  {
    id: "home",
    title: "Home charging",
    description:
      "Pulse charger installs, from survey through three-year aftersale service, with Lipa Pole Pole on M-Pesa.",
    tiers: ["t2", "t3"],
    roles: "Install engineers, survey teams, warranty service technicians",
    topics: [
      "Site survey, earthing and consumer protection",
      "Wallbox installation and customer handover",
      "Remote monitoring and warranty service visits",
    ],
  },
  {
    id: "private-site",
    title: "Fleet charging",
    description:
      "Pulse+ three-phase charging for yards, campuses and industrial sites: dedicated charging for fleets and staff vehicles.",
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
    title: "Boda Hub & last-mile",
    description:
      "Battery swap for electric bodas at partner-run sites, designed for a swap in under 5 minutes.",
    tiers: ["t1", "t2"],
    roles: "Boda operators, depot supervisors, last-mile partners",
    topics: [
      "Swap cabinet and kerbside bay operations",
      "M-Pesa session pay on every bay",
      "Utilisation gates before expanding a site",
    ],
  },
];

export type TrackTierLevel = "Required" | "Recommended" | "Not required";

export const trainingTrackMatrix: {
  track: string;
  t1: TrackTierLevel;
  t2: TrackTierLevel;
  t3: TrackTierLevel;
  note: string;
}[] = [
  {
    track: "Highway charging",
    t1: "Required",
    t2: "Required",
    t3: "Required",
    note: "All tiers needed for Corridor sites, starting on the Nairobi to Kisumu route",
  },
  {
    track: "Home charging",
    t1: "Not required",
    t2: "Required",
    t3: "Recommended",
    note: "T3 for lead installers and Pulse commissioning",
  },
  {
    track: "Fleet charging",
    t1: "Not required",
    t2: "Required",
    t3: "Recommended",
    note: "T3 for Pulse+ sites with shared load management",
  },
  {
    track: "Boda Hub & last-mile",
    t1: "Required",
    t2: "Required",
    t3: "Not required",
    note: "T1 for bay staff; T2 for swap-cabinet maintenance leads",
  },
];

export const trainingDeliveryDetails = [
  { item: "Classroom venue", detail: "Nairobi" },
  { item: "Field modules", detail: "Precifarm installation sites, where available" },
  { item: "Cohort size", detail: "6 to 16 participants per intake (partner cohorts on request)" },
  { item: "Language", detail: "English (Kiswahili support materials on request)" },
  { item: "Equipment", detail: "The charger models and CSMS Precifarm installs" },
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
  "Classes run in Nairobi with field modules at Precifarm installation sites.",
  "Partner cohorts available on request for operators and site hosts.",
  "Certificates issued per tier with annual refresher for T2 and T3.",
  "Training content aligned to the chargers and CSMS Precifarm installs.",
] as const;

export function getTrainingTier(id: TrainingTierId): TrainingTier | undefined {
  return trainingTiers.find((tier) => tier.id === id);
}

export function trainingEnquiryMailto(): string {
  const subject = encodeURIComponent("Training cohort enquiry: Precifarm EV charging");
  const body = encodeURIComponent(
    [
      "Hello Precifarm training team,",
      "",
      "Organisation:",
      "Team size:",
      "Current tier (if any): T1 / T2 / T3 / None",
      "Modules needed (tick all that apply):",
      "  [ ] Highway charging (Corridor)",
      "  [ ] Home charging (Pulse)",
      "  [ ] Fleet charging (Pulse+)",
      "  [ ] Boda Hub & last-mile",
      "Preferred month or dates:",
      "",
      "Contact name & phone:",
      "",
      "Additional notes:",
    ].join("\n"),
  );

  return `mailto:${contact.trainingEmail}?subject=${subject}&body=${body}`;
}
