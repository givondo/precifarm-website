import { aiCompanionDoc } from "@/lib/ai-companion-doc";
import { appDownload } from "@/lib/app-download";
import { chargingHub } from "@/lib/charging-hub";
import { productImages } from "@/lib/product-images";
import { sitePricing } from "@/lib/site-copy";
import type { FaqItem } from "@/lib/seo/types";

export type CopilotScreen = "hub" | "home" | "pay";

export const downloadPageFaqs: FaqItem[] = [
  {
    question: "What is Precifarm Agent?",
    answer:
      "The Precifarm Android app for EV charging in Kenya — find a Charging Hub, request a Pulse charger or Pod energy storage survey, and pay with M-Pesa.",
  },
  {
    question: "What works today vs what is coming?",
    answer:
      "Live now: Charging Hub with honest live and planned labels, home Pulse and Pod surveys, M-Pesa session pay and Lipa Pole Pole. Rolling out: smarter vehicle-aware hub suggestions and charging cost estimates. Roadmap: deeper home-energy features tied to Pod and modular energy.",
  },
  {
    question: "Is it on the Google Play Store?",
    answer:
      "Not yet. Install the APK from precifarm.com/download. iOS is not available yet.",
  },
  {
    question: "Will Precifarm Agent spend M-Pesa without asking?",
    answer:
      "No. Session price, deposit and instalment totals are shown before you confirm.",
  },
  {
    question: "Can I use Charging Hub without installing?",
    answer: "Yes — precifarm.com/hub works in your browser. Filters, directions and session pay live in the Android app.",
  },
];

export const downloadPage = {
  hero: {
    eyebrow: "Precifarm Agent · Android",
    title: "Kenya's EV charging app.",
    titleAccent: "Hub, home energy, M-Pesa.",
    lead:
      "One install for public Charging Hub, Pulse and Pod home surveys, and M-Pesa pay — the same Precifarm products we deploy across Kenya.",
    tagline: "Charging Hub, home surveys and M-Pesa in one Android app.",
    primaryLabel: "Download for Android",
    secondaryHref: chargingHub.path,
    secondaryLabel: chargingHub.openLabel,
    pdfHref: aiCompanionDoc.downloadHref,
    pdfLabel: aiCompanionDoc.downloadLabel,
    meta: `Android ${appDownload.minAndroid}+ · APK from precifarm.com · Play Store & iOS not yet`,
  },
  stats: [
    { stat: sitePricing.publicDcFrom, label: "Public DC from" },
    { stat: sitePricing.pulseFrom, label: "Pulse home charger" },
    { stat: sitePricing.lipaFrom, label: "Lipa Pole Pole" },
  ],
  usps: [
    {
      id: "honest",
      title: "Honest hub map",
      text: "Live, planned and partner sites labelled — no fake “open now”.",
    },
    {
      id: "unified",
      title: "One Precifarm account",
      text: "Public charge, home survey and M-Pesa history on the same login.",
    },
    {
      id: "mpesa",
      title: "M-Pesa before PIN",
      text: "Session price and instalment totals shown before you confirm.",
    },
  ],
  valueCards: [
    {
      id: "hub",
      label: "Hub",
      screen: "hub" as CopilotScreen,
      eyebrow: "Charging Hub",
      title: "Find where to charge",
      headline: "Corridor DC, Boda swap and partners — before you leave.",
      text: "Filter by connector and site type. Every pin shows live or planned status so you know what is actually open.",
      image: productImages.corridor,
      bullets: ["Corridor DC & Boda Hub swap", "Partner retail sites", "Directions in-app"],
      href: chargingHub.path,
      linkLabel: "Open Charging Hub",
    },
    {
      id: "home",
      label: "Home",
      screen: "home" as CopilotScreen,
      eyebrow: "Home energy",
      title: "Size Pulse or Pod",
      headline: "Survey your wall and feeder before we quote.",
      text: "Request a Pulse charger or Pod energy storage install in the same app you use for public charging — not a separate sales form.",
      image: productImages.podHomeHero,
      bullets: ["Pulse from KES 79,000", "Pod from KES 295,000", "Certified install + 3yr care"],
      href: "/charging/home",
      linkLabel: "Home charging survey",
    },
    {
      id: "pay",
      label: "M-Pesa",
      screen: "pay" as CopilotScreen,
      eyebrow: "Pay",
      title: "Price before PIN",
      headline: "Sessions and Lipa Pole Pole on any phone.",
      text: "Pay a public DC session or monthly instalment with M-Pesa, USSD or SMS. Totals are locked in before you enter your PIN.",
      image: productImages.financing,
      bullets: ["Public DC from " + sitePricing.publicDcFrom, "Lipa Pole Pole instalments", "No bank account required"],
      href: "/charging/home",
      linkLabel: "See Lipa Pole Pole",
    },
  ],
  install: {
    title: "Install on Android",
    description: "Download only from precifarm.com · com.precifarm.mobile",
    apkLabel: `Download APK v${appDownload.version}`,
    packageLine: `v${appDownload.version} · Android ${appDownload.minAndroid}+`,
    steps: ["Download from this page", "Allow browser installs if asked", "Open APK · Install · Open Precifarm Agent"],
  },
  faqs: {
    title: "Questions",
    items: downloadPageFaqs,
  },
  cta: {
    title: "Try Charging Hub first",
    description: "No install required. Precifarm Agent adds home surveys and M-Pesa on your phone.",
    primaryHref: chargingHub.path,
    primaryLabel: chargingHub.openLabel,
    secondaryHref: "/charging/home",
    secondaryLabel: "Home charging survey",
  },
} as const;
