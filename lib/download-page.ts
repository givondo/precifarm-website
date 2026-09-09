import { appBrand, appDownload } from "@/lib/app-download";
import type { FaqItem } from "@/lib/seo/types";

export const downloadPageFaqs: FaqItem[] = [
  {
    question: "Is the desktop app available today?",
    answer: "Not yet. Request access and we’ll tell you when you can install it.",
  },
  {
    question: "Which computers will it run on?",
    answer: "Windows and macOS first.",
  },
  {
    question: "What is Precifarm Agent?",
    answer:
      "An AI that helps you design EV charging, solar, batteries and electrical systems — with real calculators and clear results.",
  },
  {
    question: "Can I try it before the app ships?",
    answer: "Yes. Request access on the contact page, or read the overview on the Agent page.",
  },
];

export const downloadPage = {
  hero: {
    eyebrow: `${appBrand.fullName} · Desktop`,
    title: "Precifarm Agent on your computer.",
    lead: "Design EV charging, solar and storage from your desk. Coming soon for Windows and macOS.",
    primaryLabel: "Request access",
    primaryHref: appDownload.requestAccessHref,
    secondaryLabel: "See how Agent works",
    secondaryHref: appDownload.productHref,
    meta: `v${appDownload.version} · Desktop · Coming soon`,
  },
  capabilities: {
    eyebrow: "On desktop",
    title: "What you get.",
    items: [
      {
        title: "One workspace",
        text: "Projects, calcs, diagrams and files in one place.",
      },
      {
        title: "Real calculators",
        text: "The Agent plans the work. Tools run the maths.",
      },
      {
        title: "Your documents",
        text: "Add datasheets, drawings and site photos to the project.",
      },
      {
        title: "Clear labels",
        text: "See what was calculated, estimated, assumed or still needs a site check.",
      },
    ],
  },
  platforms: {
    eyebrow: "Platforms",
    title: "Windows and macOS first.",
    description: "No public installer yet. Request access and we’ll reach out when it’s ready.",
    items: appDownload.platforms.map((p) => ({
      label: p.label,
      status: "Coming soon",
    })),
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions.",
    items: downloadPageFaqs,
  },
  cta: {
    title: "Join the desktop list.",
    description: "Tell us what you build. We’ll open access when the app is ready.",
    primaryHref: appDownload.requestAccessHref,
    primaryLabel: "Request access",
    secondaryHref: appDownload.productHref,
    secondaryLabel: "Explore Agent",
  },
} as const;
