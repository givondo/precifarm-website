import { contact } from "@/lib/contact";

export type CareerDepartment = "Infrastructure" | "Operations" | "Engineering";

export type CareerOpening = {
  id: string;
  title: string;
  department: CareerDepartment;
  location: string;
  type: string;
  summary: string;
  points: string[];
};

export const careersIntro = {
  eyebrow: "Careers · Kenya",
  title: "Build the charging Kenya will rely on, from Pulse at home to Corridor on the highway.",
  description:
    "Precifarm installs the Pulse home charger today and is preparing its first ARC Corridor site on the Nairobi to Kisumu route. We are a small team hiring for field, operations and software work.",
  lead: "We hire for field outcomes: uptime, honest Charging Hub labels and hardware that survives Kenyan heat, dust and weak feeders.",
} as const;

export const careersHighlights = [
  { stat: "Route one", label: "Nairobi to Kisumu, the first Corridor route, being prepared" },
  { stat: "Small team", label: "Direct ownership of home installs, sites and software" },
  { stat: "Field and software", label: "From the wallbox to M-Pesa checkout" },
  { stat: "Kenya first", label: "Teams in the cities we serve" },
] as const;

export const careerOpenings: CareerOpening[] = [
  {
    id: "field-engineer",
    title: "Field engineer, charging",
    department: "Infrastructure",
    location: "Nairobi · Kisumu · route corridor",
    type: "Full-time",
    summary:
      "Survey, install and commission Pulse home chargers today, and Pulse+ and Corridor sites as they are built. You keep chargers online so homes and highway stops can rely on them.",
    points: [
      "Electrical or renewable energy background with field experience",
      "Comfortable with chargers, monitoring and fault recovery",
      "Willing to travel along Nairobi to Kisumu as the first Corridor site is built",
      "T2 and T3 training pathway for qualified candidates",
    ],
  },
  {
    id: "hub-operations-lead",
    title: "Site operations lead",
    department: "Operations",
    location: "Nairobi to Kisumu corridor",
    type: "Full-time",
    summary:
      "Set up and then run day-to-day site operations: Corridor sessions, partner coordination and honest status updates when plans change.",
    points: [
      "Operations or transport background; calm when sessions queue and plans change",
      "Clear communication with drivers, partners and site hosts",
      "Data-minded: sessions, dwell and incident logs matter",
    ],
  },
  {
    id: "software-engineer",
    title: "Software engineer, charging and payments",
    department: "Engineering",
    location: "Nairobi (hybrid)",
    type: "Full-time · Contract",
    summary:
      "Extend the Charging Hub, the website and Precifarm Agent: M-Pesa sessions, Lipa Pole Pole, hub status and the knowledge layer behind precifarm.com.",
    points: [
      "TypeScript, React or Next.js, or React Native experience",
      "Care about reliable M-Pesa flows and clear charging UX",
      "Bonus: PostgreSQL, Cloud Run or mobile release experience",
    ],
  },
];

export const careersValues = [
  { title: "Prove one route first", text: "We prove one route properly before financing the next." },
  { title: "Honest over glossy", text: "Uptime and honest communication beat glossy decks." },
  { title: "Partners run vehicles", text: "We survey, install and keep chargers online; operators keep their fleets." },
  { title: "Kenya-first engineering", text: "Designed for Kenyan grids, heat, dust and M-Pesa." },
] as const;

export const careersPerks = [
  { title: "Real hardware", text: "Field roles work on chargers, solar and storage on site, not on slides." },
  { title: "Early, visible work", text: "Join before the first Corridor site opens and shape how it runs." },
  { title: "Training pathway", text: "Field roles align with Precifarm T1 to T3 EV charging training." },
  { title: "Hybrid where it fits", text: "Software and commercial roles split time between Nairobi and the field." },
] as const;

export const careersApplySteps = [
  { title: "Pick a role or write to us", text: "Apply to an open role below, or email a short note if your fit is broader." },
  { title: "Show what you have built", text: "Projects, field work or products. Links and numbers help." },
  { title: "Talk with the team", text: "We reply to every careers message. Expect a practical conversation, not a trivia test." },
] as const;

export function careersApplyMailto(roleTitle?: string): string {
  const subject = roleTitle ? `Application: ${roleTitle}` : "Careers at Precifarm";
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
}
