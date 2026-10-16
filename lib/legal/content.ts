import type { FaqItem } from "@/lib/seo/types";
import { contact } from "@/lib/contact";
import { legalEffectiveDate, legalEntity } from "@/lib/legal/paths";

export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

function contactBlock(): string {
  return `${contact.email} · ${contact.phone} · ${contact.hq}`;
}

export const legalHubContent = {
  hero: {
    eyebrow: "Legal",
    title: "Policies for precifarm.com",
    lead: "How we run the website, handle your data, and separate research from products we sell in Kenya.",
  },
} as const;

export const termsOfUseSections: readonly LegalSection[] = [
  {
    title: "1. Who we are",
    paragraphs: [
      `${legalEntity.siteUrl} is operated by ${legalEntity.legalName} (public name “${legalEntity.publicName}”), ${legalEntity.country}. Contact: ${contactBlock()}.`,
    ],
  },
  {
    title: "2. What this website is",
    paragraphs: [
      "Precifarm.com provides information about EV charging, energy products, partners, training, Precifarm Agent, and research programmes. It is not a real-time quote engine unless a specific flow says otherwise.",
      "Charging Hub and product pages use honest labels (live, planned, research). Do not treat marketing copy as a binding offer until you have a written quote or contract from Precifarm.",
    ],
  },
  {
    title: "3. Products vs research",
    bullets: [
      "Commercial beachhead: wired EV charging and related services we commission (e.g. Pulse, Pod, Spark, Depot, Boda Hub, Corridor) as described on product pages.",
      "Modular energy (P1 Go, P2 Home, Mini Stack, MegaPack): conceptual unless a page states it is on sale.",
      "Wireless EV charging: research only — see the Wireless EV charging R&D policy.",
      "Precifarm Agent: software with early access; outputs are aids for professionals, not automatic sign-off for safety-critical work.",
    ],
  },
  {
    title: "4. Acceptable use",
    bullets: [
      "Do not attempt to disrupt the site, scrape it in ways that impair service, or misuse contact or Agent endpoints.",
      "Do not submit unlawful, infringing, or malicious content through forms or chat.",
      "You are responsible for how you use sizing or design output from Precifarm Agent on site.",
    ],
  },
  {
    title: "5. Intellectual property",
    paragraphs: [
      "Precifarm logos, product renders, and site content are owned by Precifarm or licensors. You may share public URLs and quote short excerpts with attribution; do not republish full pages or PDFs as your own materials without permission.",
    ],
  },
  {
    title: "6. Third-party services",
    paragraphs: [
      "Links to WhatsApp, M-Pesa, app stores, maps, or social networks take you to third-party terms. Payment and messaging there are governed by those providers.",
      "Precifarm Agent may use third-party AI infrastructure when you use the web workspace; see the Privacy policy.",
    ],
  },
  {
    title: "7. Liability",
    paragraphs: [
      "The site is provided “as is”. To the extent permitted by law, Precifarm is not liable for indirect loss arising from reliance on website content alone. Installation, grid, and safety decisions require qualified professionals and site-specific contracts.",
    ],
  },
  {
    title: "8. Governing law",
    paragraphs: [`These terms are governed by the laws of ${legalEntity.country}, unless mandatory consumer protections require otherwise.`],
  },
  {
    title: "9. Changes",
    paragraphs: [
      `We may update these terms by posting a new version on ${legalEntity.siteUrl}/legal/terms with an updated effective date.`,
    ],
  },
];

export const privacyPolicySections: readonly LegalSection[] = [
  {
    title: "1. Controller",
    paragraphs: [
      `${legalEntity.legalName} (“Precifarm”) is the data controller for personal data collected through precifarm.com unless a signed project contract names a different controller for that project.`,
    ],
  },
  {
    title: "2. Data we collect",
    bullets: [
      "Contact and survey forms: name, email, phone, company, message content, and fields you choose to submit.",
      "Precifarm Agent (web chat): messages you send and technical metadata needed to operate the service (e.g. timestamps, session identifiers). Do not send payment card numbers or national ID through chat.",
      "Analytics (if enabled): aggregated page views and events proxied to our CMS — not sold to ad networks.",
      "Server logs: IP address, user agent, and request paths for security and debugging, retained for a limited period.",
    ],
  },
  {
    title: "3. Why we use it",
    bullets: [
      "Respond to sales, training, R&D, and support enquiries.",
      "Operate and improve the website and Agent workspace.",
      "Secure the site and prevent abuse.",
      "Comply with law and enforce our terms.",
    ],
  },
  {
    title: "4. Legal bases (Kenya)",
    paragraphs: [
      "We rely on consent (forms you submit), contract steps (when you request a quote or install), legitimate interests (security, analytics, product improvement), and legal obligation where applicable. Kenya’s Data Protection Act, 2019 applies to processing in Kenya.",
    ],
  },
  {
    title: "5. Sharing",
    bullets: [
      "Hosting and infrastructure providers (e.g. cloud hosting for precifarm.com).",
      "AI model providers when you use Agent chat on the website, under their API terms and our instructions not to use your content for unrelated training where contractually available.",
      "Professional advisers or authorities when required by law.",
      "We do not sell personal data.",
    ],
  },
  {
    title: "6. Retention",
    paragraphs: [
      "Enquiry data is kept as long as needed for the conversation and legitimate business records, then deleted or anonymised unless law requires longer retention.",
    ],
  },
  {
    title: "7. Your rights",
    bullets: [
      "Request access, correction, or deletion of personal data we hold about you.",
      "Object to or restrict certain processing where the law allows.",
      "Withdraw consent where processing is consent-based (without affecting prior lawful processing).",
      "Lodge a complaint with the Office of the Data Protection Commissioner (Kenya).",
    ],
  },
  {
    title: "8. Contact",
    paragraphs: [`Privacy requests: ${contact.email} · ${contactBlock()}.`],
  },
];

export const cookiesPolicySections: readonly LegalSection[] = [
  {
    title: "1. What we use",
    bullets: [
      "Strictly necessary: session and security-related cookies or storage required for the site to function.",
      "Preferences: choices you make that we store locally (where implemented).",
      "Analytics: if our CMS analytics ingest is enabled, events may be sent to our own API — see Privacy policy.",
    ],
  },
  {
    title: "2. What we do not use",
    paragraphs: [
      "We do not use third-party advertising cookies on precifarm.com as of the effective date below. If that changes, we will update this page.",
    ],
  },
  {
    title: "3. Control",
    paragraphs: [
      "You can block or delete cookies in your browser; some features may not work. For analytics opt-out where offered, contact us.",
    ],
  },
];

export const termsFaqs: FaqItem[] = [
  {
    question: "Does the website price list bind Precifarm?",
    answer:
      "No. Published prices and specs are marketing unless confirmed in a written quote or contract for your site.",
  },
  {
    question: "Where is wireless charging covered?",
    answer: "Under R&D policies — not sold via the main product catalogue. See the Wireless EV charging R&D policy linked from /legal.",
  },
];

export const privacyFaqs: FaqItem[] = [
  {
    question: "Does Precifarm Agent chat train public models?",
    answer:
      "We configure provider APIs for service delivery. Do not submit secrets in chat. See section 5 of this policy for sharing with AI infrastructure providers.",
  },
];

export const cookiesFaqs: FaqItem[] = [
  {
    question: "Do you use Google Analytics?",
    answer: "Not by default on precifarm.com. Usage may be collected through our own CMS analytics endpoint when enabled.",
  },
];

export function legalDocMeta(type: "terms" | "privacy" | "cookies") {
  const titles = {
    terms: "Terms of use",
    privacy: "Privacy policy",
    cookies: "Cookies & analytics",
  };
  return {
    title: titles[type],
    effective: legalEffectiveDate,
  };
}
