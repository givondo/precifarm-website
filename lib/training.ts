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
    "Certification for hub staff, installers and field engineers on the chargers Precifarm deploys in Kenya.",
  lead:
    "Three tiers in sequence: site safety (T1), routine maintenance (T2), then commissioning and diagnostics (T3). Mapped to Pulse, Pod, Depot, Boda Hub and Corridor — not generic classroom theory.",
  whoShouldAttend: [
    "Hub operators and site hosts",
    "Home installation crews for Pulse and Pod",
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
    format: "Classroom (4 hrs) + guided hub walkthrough (4 hrs)",
    audience: "Hub staff, drivers, site hosts, partner front-line teams",
    summary:
      "Understand EV charging fundamentals, high-voltage safety and Precifarm hub protocols before working near energized equipment or public bays.",
    assessment: "Written safety quiz + observed hub walkthrough checklist",
    certificate: "Precifarm T1 — EV charging site safety (valid 24 months)",
    canDoAfter:
      "Work safely near chargers, support drivers during a session, report faults and follow emergency procedures — without opening enclosures or performing live repairs.",
    outcomes: [
      "Identify DC charger components, CCS2 connectors and isolation points",
      "Follow lock-out / tag-out and emergency stop procedures",
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
    title: "Highway charging",
    description:
      "Corridor charging at route hubs — CCS2 DC, live status and M-Pesa on the Charging Hub.",
    tiers: ["t1", "t2", "t3"],
    roles: "Hub operators, route engineers, partner depot leads",
    topics: [
      "Corridor DC sessions and load sharing",
      "Live status and M-Pesa session pay",
      "Uptime targets and honest recovery",
    ],
  },
  {
    id: "home",
    title: "Home charging",
    description:
      "Pulse charger and Pod energy storage installs — survey through three-year aftersale service, Lipa Pole Pole on M-Pesa.",
    tiers: ["t2", "t3"],
    roles: "Install engineers, survey teams, warranty service technicians",
    topics: [
      "Site survey, earthing and consumer protection",
      "Wallbox / DC unit installation and customer handover",
      "Remote monitoring and warranty service visits",
    ],
  },
  {
    id: "private-site",
    title: "Fleet charging",
    description:
      "Depot charging stations for yards, campuses and industrial sites — dedicated charging for fleets and staff vehicles.",
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
      "Battery swap and kerbside charge for electric bodas — under 5 minutes back on the road.",
    tiers: ["t1", "t2"],
    roles: "Boda operators, depot supervisors, last-mile partners",
    topics: [
      "Swap cabinet and kerbside bay operations",
      "M-Pesa session pay on every bay",
      "Utilisation gates before expanding a site",
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
    track: "Highway charging",
    t1: "Required",
    t2: "Required",
    t3: "Required",
    note: "All tiers needed for Corridor hubs on Nairobi–Kisumu",
  },
  {
    track: "Home charging",
    t1: "—",
    t2: "Required",
    t3: "Recommended",
    note: "T3 for lead installers and Pulse / Pod commissioning",
  },
  {
    track: "Fleet charging",
    t1: "—",
    t2: "Required",
    t3: "Recommended",
    note: "T3 for Depot sites with load management and storage",
  },
  {
    track: "Boda Hub & last-mile",
    t1: "Required",
    t2: "Required",
    t3: "—",
    note: "T1 for bay staff; T2 for swap-cabinet maintenance leads",
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
      "  [ ] Highway charging (Corridor)",
      "  [ ] Home charging (Pulse / Pod)",
      "  [ ] Fleet charging (Depot)",
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
