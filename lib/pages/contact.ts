/** /contact: enquiry categories grouped for the form. Values stay exactly as lib/contact-interests.ts sends them. */

import { contactInterests, type ContactInterestKey } from "@/lib/contact-interests";

export type ContactGroup = { label: string; next: string; keys: readonly ContactInterestKey[] };

export const contactGroups: readonly ContactGroup[] = [
  {
    label: "Home charging",
    next: "An engineer contacts you to arrange the survey. Nothing is quoted before your supply, earthing and parking are checked.",
    keys: ["survey", "home"],
  },
  {
    label: "Fleets, workplaces and sites",
    next: "We scope the site with you: the supply, the parking layout and how your vehicles are used.",
    keys: ["pulse-plus", "corridor", "boda-hub"],
  },
  {
    label: "Precifarm Agent",
    next: "Tell us what you want to design. We reply about access and what the Agent can do for that job.",
    keys: ["ai", "agent-desktop"],
  },
  {
    label: "Partnerships",
    next: "Tell us about your business and what you want to build with us.",
    keys: ["dealer", "finance"],
  },
  {
    label: "Anything else",
    next: "We pass your message to the right person in the team.",
    keys: ["general"],
  },
];

export function groupForInterest(value: string): ContactGroup | undefined {
  return contactGroups.find((g) => g.keys.some((k) => contactInterests[k] === value));
}

export const contactLimits = { nameMin: 2, messageMin: 10, messageMax: 2000 } as const;

export type ContactFields = { name: string; email: string; phone: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-side checks; the API and CMS still validate on their side. */
export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  const name = f.name.trim();
  if (!name) e.name = "Enter your name.";
  else if (name.length < contactLimits.nameMin) e.name = "Enter your full name.";
  const email = f.email.trim();
  if (!email) e.email = "Enter your email address so we can reply.";
  else if (!EMAIL.test(email)) e.email = "Enter an email address like name@example.com.";
  const phone = f.phone.trim();
  if (phone) {
    const digits = phone.replace(/[\s()+.-]/g, "");
    if (!/^\d+$/.test(digits) || digits.length < 9 || digits.length > 15) e.phone = "Enter a phone number like 0712 345 678 or +254 712 345 678, or leave it blank.";
  }
  const message = f.message.trim();
  if (!message) e.message = "Tell us what you need.";
  else if (message.length < contactLimits.messageMin) e.message = `Add a little more detail (at least ${contactLimits.messageMin} characters).`;
  else if (message.length > contactLimits.messageMax) e.message = `Keep the message under ${contactLimits.messageMax} characters.`;
  return e;
}
