import { appDownload } from "@/lib/app-download";
import { chargingHub } from "@/lib/charging-hub";
import { productImages } from "@/lib/product-images";
import type { FaqItem } from "@/lib/seo/types";

export const downloadPageFaqs: FaqItem[] = [
  {
    question: "What is the Precifarm AI companion?",
    answer:
      "It is Precifarm's Android companion for charging in Kenya. Use it to find a hub, size Pulse charger or Pod energy storage, and pay with M-Pesa. It is not a live chatbot.",
  },
  {
    question: "Is it on the Google Play Store?",
    answer:
      "Not yet. Install the APK from this page on precifarm.com. Allow installs from your browser if Android asks. iOS is not available yet.",
  },
  {
    question: "How do I pay in the companion?",
    answer:
      "Charging sessions and Lipa Pole Pole instalments use M-Pesa. Session price, deposit, monthly and total are shown before you confirm. USSD and SMS work on phones without a bank account.",
  },
  {
    question: "Can I use Charging Hub without installing?",
    answer:
      "Yes. Open Charging Hub on precifarm.com/network in your browser for the site list. Filters, directions and session pay live in the companion.",
  },
];

export const downloadPage = {
  hero: {
    eyebrow: "AI companion",
    title: "Your charging companion for Kenya.",
    description:
      "Find a live hub, size Pulse charger or Pod energy storage, and pay with M-Pesa — built around how you drive and park. Android only.",
    primaryLabel: "Get the AI companion",
    secondaryHref: chargingHub.path,
    secondaryLabel: "Open Charging Hub on web",
    meta: `Android ${appDownload.minAndroid}+ · Direct APK from precifarm.com · Not on Play Store yet · iOS not available`,
  },
  stats: [
    {
      stat: "Android",
      label: `${appDownload.minAndroid}+ companion. iOS is not available yet.`,
    },
    {
      stat: "M-Pesa",
      label: "Sessions and Lipa Pole Pole — price shown before you confirm.",
    },
    {
      stat: chargingHub.name,
      label: "Corridor DC, Boda Hub swap and partner sites in one map.",
    },
  ],
  jobs: {
    eyebrow: "What it does",
    title: "Three jobs. One companion.",
    description:
      "The Precifarm AI companion is for charging in Kenya — not a generic charger catalogue, and not a live chatbot.",
    items: [
      {
        step: "01",
        title: "Find a hub",
        text: "Open Charging Hub. Filter Corridor DC, Boda Hub swap or partner sites. Live and planned labels stay honest. Get directions before you leave.",
        href: chargingHub.path,
        label: "Charging Hub",
      },
      {
        step: "02",
        title: "Size home energy",
        text: "See whether Pulse charger or Pod energy storage fits your wall, feeder and parking. Request a survey — we confirm the site before we quote.",
        href: "/charging/private-house",
        label: "Home charging",
      },
      {
        step: "03",
        title: "Pay with M-Pesa",
        text: "Pay a session or Lipa Pole Pole instalments on any phone. Deposit, monthly and total are shown before you confirm — no bank account required.",
        href: "/charging",
        label: "Charging",
      },
    ],
  },
  features: {
    eyebrow: "In the companion",
    title: "Charging, home energy and pay in one place.",
    description:
      "Same products we install. Same M-Pesa flows. Built for Kenyan roads, sockets and Kenya Power.",
    cards: [
      {
        title: "Charging Hub",
        text: "Precifarm, EVChaja, ChargeNet and partner sites — filter by fast DC or Boda swap, then navigate in maps.",
      },
      {
        title: "Home + storage",
        text: "Request a Pulse charger or Pod energy storage survey. Certified installation and three-year aftersale care on M-Pesa.",
      },
      {
        title: "Vehicle-aware",
        text: "Select your car or e-boda so recommendations follow battery size, connector and how far you actually drive.",
      },
      {
        title: "Lipa Pole Pole",
        text: "Pay deposit and monthly instalments via M-Pesa, USSD or SMS. Totals shown before you confirm.",
      },
    ],
  },
  status: {
    eyebrow: "What's live",
    title: "Honest about what you can do today.",
    liveEyebrow: "Live",
    live: [
      "Charging Hub map with live and planned labels",
      "Home Pulse charger and Pod energy storage survey requests",
      "M-Pesa session pay and Lipa Pole Pole instalments",
    ],
    designedEyebrow: "In design",
    designed: [
      "Fleet dashboard for vehicles, chargers and kWh — not live yet",
      "iOS companion — not available yet",
      "Play Store listing — install the APK from this page for now",
    ],
  },
  products: {
    eyebrow: "Works with",
    title: "The same products we install.",
    description: "Spark through Corridor — specs, fit and M-Pesa in the companion and on the website.",
    items: [
      { ...productImages.spark, label: "Spark" },
      { ...productImages.pulse, label: "Pulse" },
      { ...productImages.pod, label: "Pod" },
      { ...productImages.boda, label: "Boda Hub" },
      { ...productImages.depot, label: "Depot" },
      { ...productImages.corridor, label: "Corridor" },
    ],
  },
  install: {
    eyebrow: "Install",
    title: "Install the APK from this page.",
    description:
      "The Precifarm AI companion is not on the Play Store yet. Download is safe when it comes from precifarm.com.",
    apkLabel: `Download APK v${appDownload.version}`,
    steps: [
      {
        title: "Download",
        text: "Tap Get the AI companion on this page.",
      },
      {
        title: "Allow",
        text: "When prompted, allow downloads from your browser.",
      },
      {
        title: "Open the file",
        text: "If Android blocks the install, go to Settings → Security and allow installs from your browser.",
      },
      {
        title: "Install",
        text: "Tap Install, then open the Precifarm AI companion.",
      },
    ],
  },
  faqs: {
    eyebrow: "FAQ",
    title: "Before you install.",
    items: downloadPageFaqs,
  },
  cta: {
    title: "Need charging without the install?",
    description:
      "Charging Hub and home surveys work in the browser. The companion adds filters, directions and M-Pesa on your phone.",
    primaryHref: chargingHub.path,
    primaryLabel: "Open Charging Hub",
    secondaryHref: "/charging/private-house",
    secondaryLabel: "Request a house survey",
  },
} as const;
