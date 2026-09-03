import { aiCompanionDoc } from "@/lib/ai-companion-doc";
import { appDownload } from "@/lib/app-download";
import { chargingHub, chargingHubPage } from "@/lib/charging-hub";
import { homeProducts } from "@/lib/home-products";
import { productImages } from "@/lib/product-images";
import { sitePricing } from "@/lib/site-copy";
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

function productCard(id: "spark" | "pulse" | "pod" | "boda" | "depot" | "corridor") {
  const product = homeProducts.find((item) => item.id === id);
  if (!product) {
    throw new Error(`Missing home product: ${id}`);
  }
  const shot = productImages[id];
  return {
    id,
    name: product.name,
    summary: product.summary,
    priceLabel: product.priceLabel,
    href: product.href,
    src: shot.src,
    alt: shot.alt,
  };
}

export const downloadPage = {
  hero: {
    eyebrow: "AI companion · Kenya",
    title: "Your charging companion for Kenya.",
    description:
      "Find a live hub, size Pulse charger or Pod energy storage, and pay with M-Pesa — built around how you drive and park. Android only. Not a live chatbot.",
    primaryLabel: "Get the AI companion",
    secondaryHref: chargingHub.path,
    secondaryLabel: chargingHub.openLabel,
    pdfHref: aiCompanionDoc.downloadHref,
    pdfLabel: aiCompanionDoc.downloadLabel,
    meta: `Android ${appDownload.minAndroid}+ · Direct APK from precifarm.com · Not on Play Store yet · iOS not available`,
    pills: [
      `Android ${appDownload.minAndroid}+`,
      "M-Pesa on every session",
      "Not a chatbot",
    ],
    phoneCaption:
      "Illustrative companion screens — Charging Hub, home survey and M-Pesa. Not a live chatbot.",
  },
  stats: [
    {
      stat: `Android ${appDownload.minAndroid}+`,
      label: "Companion APK from this site. iOS is not available yet.",
    },
    {
      stat: sitePricing.publicDcFrom,
      label: "Public DC from this rate — price shown before you confirm.",
    },
    {
      stat: sitePricing.lipaFrom,
      label: "Lipa Pole Pole on Pulse charger and Pod energy storage.",
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
        label: "Open Charging Hub",
        image: productImages.corridor.src,
        imageAlt: productImages.corridor.alt,
        kicker: "On the road",
      },
      {
        step: "02",
        title: "Size home energy",
        text: "See whether Pulse charger or Pod energy storage fits your wall, feeder and parking. Request a survey — we confirm the site before we quote.",
        href: "/charging/private-house",
        label: "Home charging",
        image: productImages.podHomeHero.src,
        imageAlt: productImages.podHomeHero.alt,
        kicker: "At home",
      },
      {
        step: "03",
        title: "Pay with M-Pesa",
        text: "Pay a session or Lipa Pole Pole instalments on any phone. Deposit, monthly and total are shown before you confirm — no bank account required.",
        href: "/charging",
        label: "Charging & financing",
        image: productImages.financing.src,
        imageAlt: productImages.financing.alt,
        kicker: "On M-Pesa",
      },
    ],
  },
  context: {
    eyebrow: "Built for Kenya",
    title: "A map-only app leaves the driveway to a sales call.",
    lead: "Public EV charging here is a mix of mall plugs, fuel-retailer partners, operator apps and Kenya Power sites — not one national network. Apps that work find a station and take M-Pesa, because most drivers do not pay a charger with a bank card.",
    typicalTitle: "Typical Kenya charging app",
    typicalText:
      "Locate stations, filter by connector, start a session, pay with mobile money. Home wallbox sizing and Lipa Pole Pole usually live on a separate form.",
    oursTitle: "Precifarm AI companion",
    oursText:
      "Charging Hub, Pulse / Pod surveys and M-Pesa on one Android account — the same products we install, with live and planned sites labelled honestly.",
    rows: [
      ["Find a public charger", "Operator map", "Charging Hub — Precifarm, EVChaja, ChargeNet, partners"],
      ["Pay without a bank card", "M-Pesa / mobile money", "M-Pesa, USSD and SMS — price shown first"],
      ["Size a home wallbox", "Usually a separate sales form", "Pulse charger and Pod energy storage survey"],
      ["Spread the hardware cost", "Rarely in the same app", `Lipa Pole Pole from ${sitePricing.lipaFrom}`],
      ["E-boda battery swap", "Some operator apps", "Boda Hub on the same map"],
      ["Honest live vs planned", "Mixed", "Live stays live. Planned stays planned."],
    ] as const,
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
  siteTypes: chargingHubPage.siteTypes,
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
      productCard("spark"),
      productCard("pulse"),
      productCard("pod"),
      productCard("boda"),
      productCard("corridor"),
      productCard("depot"),
    ],
  },
  install: {
    eyebrow: "Install",
    title: "Install the APK from this page.",
    description:
      "The Precifarm AI companion is not on the Play Store yet. Download is safe when it comes from precifarm.com.",
    apkLabel: `Download APK v${appDownload.version}`,
    packageLine: `v${appDownload.version} · Android ${appDownload.minAndroid}+ · ${appDownload.packageId}`,
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
    primaryLabel: chargingHub.openLabel,
    secondaryHref: "/charging/private-house",
    secondaryLabel: "Request a house survey",
  },
} as const;
