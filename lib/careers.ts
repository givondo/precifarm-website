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
  eyebrow: "Careers",
  title: "Help build dependable electric travel between Kenyan cities",
  description:
    "Precifarm is growing the team that delivers charging hubs, live booking and route operations for Nairobi–Kisumu — and the routes that follow.",
  lead:
    "We hire for route-one first: people who care about uptime, honest passenger communication and infrastructure that works in the field — not slide decks.",
} as const;

export const careersHighlights = [
  { stat: "Live route", label: "Nairobi–Kisumu in production today" },
  { stat: "Small team", label: "Direct impact on hubs, booking and ops" },
  { stat: "Field + software", label: "Engineering from chargers to M-Pesa checkout" },
  { stat: "Kenya-first", label: "Hubs and hires in the cities we serve" },
] as const;

export const careerOpenings: CareerOpening[] = [
  {
    id: "field-engineer",
    title: "Field engineer — charging hubs",
    department: "Infrastructure",
    location: "Nairobi · Kisumu · route corridor",
    type: "Full-time",
    summary:
      "Install, commission and maintain DC fast chargers, solar and storage at intercity hubs. You keep uptime high so buses leave on schedule.",
    points: [
      "Electrical or renewable energy background with field experience",
      "Comfortable with CCS2 chargers, monitoring and fault recovery",
      "Willing to travel along Nairobi–Kisumu during route launch",
      "T2/T3 EV charging certification pathway for qualified candidates",
    ],
  },
  {
    id: "hub-operations-lead",
    title: "Hub operations lead",
    department: "Operations",
    location: "Nairobi–Kisumu corridor",
    type: "Full-time",
    summary:
      "Run day-to-day hub activity — charging windows, passenger dwell, partner coordination and honest status updates when plans change.",
    points: [
      "Operations or transport background; calm under timetable pressure",
      "Clear communication with drivers, partners and passengers",
      "Data-minded: sessions, dwell and incident logs matter",
    ],
  },
  {
    id: "software-engineer",
    title: "Software engineer — booking & payments",
    department: "Engineering",
    location: "Nairobi (hybrid)",
    type: "Full-time · Contract",
    summary:
      "Extend the ticketing CMS, passenger website and mobile app — M-Pesa STK, seat maps, analytics and the SEO knowledge layer behind precifarm.com.",
    points: [
      "TypeScript, React/Next.js or React Native experience",
      "Care about reliable payments and clear passenger UX",
      "Bonus: PostgreSQL, Cloud Run or mobile release experience",
    ],
  },
];

export const careersValues = [
  "We prove one route properly before financing the next.",
  "Uptime and honest communication beat glossy decks.",
  "Partners operate vehicles; we build the energy and booking layer.",
  "Kenya-first engineering — hubs in the cities we serve.",
] as const;

export const careersPerks = [
  {
    title: "Real infrastructure",
    text: "Work on live DC hubs, solar and storage — not pilot demos parked in a warehouse.",
  },
  {
    title: "Route-one focus",
    text: "Ship improvements passengers and operators feel on Nairobi–Kisumu this quarter.",
  },
  {
    title: "Training pathway",
    text: "Field roles align with Precifarm T1–T3 EV charging certification.",
  },
  {
    title: "Hybrid where it fits",
    text: "Software and commercial roles split time between Nairobi and the corridor.",
  },
] as const;

export const careersApplySteps = [
  {
    title: "Pick a role or send a general CV",
    text: "Apply to an open role below or email a short note if your fit is broader.",
  },
  {
    title: "Tell us what you have shipped",
    text: "Include projects, field work or products — links and metrics help.",
  },
  {
    title: "Conversation with the team",
    text: "We respond to every careers message. Expect a practical discussion, not a trivia test.",
  },
] as const;

export function careersApplyMailto(roleTitle?: string): string {
  const subject = roleTitle ? `Application: ${roleTitle}` : "Careers at Precifarm";
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
}
