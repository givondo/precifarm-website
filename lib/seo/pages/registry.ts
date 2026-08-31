import {
  chargingServicesFaqs,
  privateHouseChargingFaqs,
} from "@/lib/charging-faqs";
import { engineeringPageFaqs } from "@/lib/engineering-page";
import { trainingPageFaqs } from "@/lib/training-page";
import { chargingHub } from "@/lib/charging-hub";
import { downloadPageFaqs } from "@/lib/download-page";
import { homepageAisoBlocks } from "@/lib/seo/aiso/blocks";
import { defaultSiteTitle } from "@/lib/seo/config";
import type { PageSeoInput } from "@/lib/seo/types";

/** Central registry for SEO audit and metadata consistency */
export const pageSeoRegistry: PageSeoInput[] = [
  {
    path: "/",
    title: defaultSiteTitle,
    description:
      "Precifarm designs, finances, installs and operates EV charging infrastructure in Kenya — from home charging to fleet and high-power corridor stations, with M-Pesa payments.",
    faqs: (homepageAisoBlocks.find((b) => b.type === "faq")?.items ?? []) as PageSeoInput["faqs"],
    breadcrumbs: [{ name: "Home", href: "/" }],
  },
  {
    path: chargingHub.path,
    title: "EV Charging Stations in Kenya",
    description: chargingHub.description,
    keywords: [
      "EV charging map Kenya",
      "find EV chargers Kenya",
      "Boda Hub swap Kenya",
      "battery swap station Nairobi",
      "DC fast charging Nairobi Kisumu",
      "Precifarm Charging Hub",
      "EV charger locations Kenya",
      "M-Pesa EV charging",
      "public EV charging Kenya",
      "Nissan Leaf charging Kenya",
      "BYD charging Kenya",
    ],
    faqs: [
      {
        question: "How do I find EV chargers in Kenya?",
        answer:
          "Get the Precifarm AI companion and open Charging Hub. Filter Corridor DC, Boda Hub swap or partner sites, get directions and pay with M-Pesa — live and planned sites are labelled honestly.",
      },
      {
        question: "Can I pay for EV charging with M-Pesa?",
        answer:
          "Yes. Every Precifarm hub supports M-Pesa payment. Session price is shown before you charge; history and receipts stay in the companion.",
      },
      {
        question: "Which EV charging corridor is live in Kenya?",
        answer:
          "The Nairobi–Kisumu corridor is first — DC hubs at Kisumu, Nakuru and Nairobi plus partner retail stops along the western route. Mombasa and Garissa corridors follow proven demand.",
      },
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: chargingHub.label, href: chargingHub.path },
    ],
  },
  {
    path: "/charging",
    title: "EV Charging Infrastructure in Kenya",
    description:
      "Home, fleet and highway EV charging in Kenya — Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor DC on the highway. M-Pesa on every product.",
    keywords: ["EV charging Kenya", "fleet charging", "home AC charger installation", "KES 39 kWh"],
    faqs: chargingServicesFaqs,
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
    ],
  },
  {
    path: "/charging/private-house",
    title: "Home EV Charging in Kenya",
    description:
      "Home EV charger installation in Kenya — Pulse charger from KES 79,000, Pod energy storage, Lipa Pole Pole from KES 3,300/month on M-Pesa. Survey and three-year Precifarm aftersale support.",
    faqs: privateHouseChargingFaqs,
    keywords: [
      "private house EV charging Kenya",
      "home AC wallbox private property",
      "Pulse charger installation Nairobi",
      "residential private charging install",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
      { name: "Home charging", href: "/charging/private-house" },
    ],
  },
  {
    path: "/charging/engineering",
    title: "EV charging site engineering — Kenya",
    description:
      "Precifarm engineering design basis for home, fleet and highway charging — grid, solar, LiFePO₄ storage, Corridor T-canopy DC, Kenya Power hold points and phased task sheet. PDF download.",
    faqs: [...engineeringPageFaqs],
    keywords: [
      "EV charging station design Kenya",
      "solar EV charger engineering",
      "DC fast charging hub task sheet",
      "Precifarm charging station design",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
      { name: "Engineering", href: "/charging/engineering" },
    ],
  },
  {
    path: "/charging/modular-energy",
    title: "Modular Energy — P1 Go, P2 Home and Pod for Kenya",
    description:
      "Precifarm modular energy platform: one 2.56 kWh Energy Module from portable P1 Go backup through P2 Home and outdoor Pod. Designed for weak-grid Kenya. Conceptual — not on sale yet.",
    keywords: [
      "home battery storage Kenya",
      "modular energy platform",
      "LiFePO4 home backup Kenya",
      "Precifarm P1 Go P2 Home Pod",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Modular energy", href: "/charging/modular-energy" },
    ],
  },
  {
    path: "/charging/modular-energy/p1-go",
    title: "P1 Go — Portable Backup",
    description:
      "P1 Go is Precifarm’s portable backup unit: aluminum unibody, fold-flat handle and Type 2 trickle lead. Conceptual — not a daily EV charger, not on sale yet.",
    keywords: ["P1 Go", "portable power station Kenya", "home backup battery Kenya"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Modular energy", href: "/charging/modular-energy" },
      { name: "P1 Go", href: "/charging/modular-energy/p1-go" },
    ],
  },
  {
    path: "/charging/modular-energy/p2-home",
    title: "P2 Home — Home Backup Tower",
    description:
      "P2 Home stacks 1–4 Energy Modules beside the consumer board for essential-load backup in Kenyan homes. Conceptual — not certified for sale.",
    keywords: ["P2 Home", "home battery storage Kenya", "LiFePO4 backup Kenya"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Modular energy", href: "/charging/modular-energy" },
      { name: "P2 Home", href: "/charging/modular-energy/p2-home" },
    ],
  },
  {
    path: "/charging/modular-energy/pod",
    title: "Pod Enclosure — Shop and Outdoor Backup",
    description:
      "Precifarm Pod enclosure is the outdoor modular energy unit for SME sites — not Pod energy storage for home EV charging. Conceptual — not certified for sale.",
    keywords: ["Precifarm Pod enclosure", "SME battery storage Kenya", "outdoor energy storage Kenya"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Modular energy", href: "/charging/modular-energy" },
      { name: "Pod enclosure", href: "/charging/modular-energy/pod" },
    ],
  },
  {
    path: "/evs",
    title: "Electric Vehicles in Kenya",
    description:
      "Compare EVs in Kenya — Nissan Leaf, BYD Atto 3, MG4, Tesla Model 3, Roam Air and more. Practical range, DC charging speed, daily top-up time and where Precifarm home, hub and corridor charging fit.",
    keywords: [
      "EV Kenya comparison",
      "Kenya EV guide",
      "Nissan Leaf Kenya",
      "BYD Atto 3 Kenya",
      "BYD Dolphin Kenya",
      "Roam Air Kenya",
      "electric motorcycle Kenya",
      "EV practical range Kenya",
      "EV charging time Kenya",
      "CHAdeMO Kenya",
      "Precifarm EV charging",
    ],
    faqs: [
      {
        question: "Which EVs are most common in Kenya?",
        answer:
          "Used Nissan Leaf imports with CHAdeMO fast charging remain widespread. Newer BYD models (Dolphin, Atto 3, Seal), MG, Hyundai, Kia and Tesla imports are growing, alongside Roam Air and M-KOPA electric motorcycles in the e-boda segment.",
      },
      {
        question: "How long does home EV charging take in Kenya?",
        answer:
          "On a Precifarm Pulse charger, a typical daily top-up for most passenger EVs takes about 90 minutes. DC fast charging at a public hub can add the same energy in roughly 5–15 minutes depending on the vehicle and charger power.",
      },
      {
        question: "Does Precifarm support Nissan Leaf CHAdeMO charging?",
        answer:
          "Yes. Precifarm maps home, workplace and destination charging for Leaf drivers in Kenya, including CHAdeMO-capable DC sessions where available — without requiring every Leaf to use high-power CCS corridor chargers.",
      },
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Kenya EV guide", href: "/evs" },
    ],
  },
  {
    path: "/partners",
    title: "Fleet EV Charging Solutions in Kenya",
    description:
      "Partner with Precifarm to host Corridor hubs, run Depot and Boda Hub for fleets, or sell Pulse charger and Pod energy storage home installations — M-Pesa on every product.",
    faqs: [
      {
        question: "Who can partner with Precifarm?",
        answer:
          "Fleet operators, fuel retailers, malls, transport yards, property owners and certified installers can partner to host hubs, run depot charging or sell home charging.",
      },
      {
        question: "What fleet charging does Precifarm offer?",
        answer:
          "Depot charging station (22 kW AC pedestals), Boda Hub battery swap and Corridor DC on intercity routes — engineered, commissioned and operated by Precifarm.",
      },
    ],
    keywords: [
      "EV charging partner Kenya",
      "charging hub site host",
      "fleet depot charging",
      "Precifarm dealer install",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Partners", href: "/partners" },
    ],
  },
  {
    path: "/training",
    title: "EV Charging Training in Kenya",
    description:
      "Precifarm EV charging training for hub staff and field engineers. T1 safety awareness, T2 field technician and T3 commissioning specialist certification in Kenya.",
    faqs: [...trainingPageFaqs],
    keywords: [
      "EV charging training Kenya",
      "T1 T2 T3 technician certification",
      "DC fast charger training",
      "Precifarm training",
      "EV charger commissioning course",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
      { name: "Training", href: "/training" },
    ],
  },
  {
    path: "/about",
    title: "About Precifarm — EV Charging in Kenya",
    description:
      "Precifarm builds EV charging infrastructure in Kenya — Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor DC on the highway. M-Pesa everywhere.",
    faqs: [
      {
        question: "What does Precifarm do?",
        answer:
          "Precifarm designs, finances, installs and operates EV charging infrastructure in Kenya — from home charging to fleet depots and highway Corridor DC, with M-Pesa on every product.",
      },
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
    ],
  },
  {
    path: "/careers",
    title: "EV Charging Careers in Kenya",
    description:
      "Join Precifarm to install Pulse charger and Pod energy storage at home, commission Depot and Corridor charging, and keep M-Pesa sessions online across Kenya.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    path: "/download",
    title: "Precifarm AI Companion for Android",
    description:
      "Get the Precifarm AI companion: find EV charging, size Pulse charger or Pod energy storage, and pay with M-Pesa. Android APK from precifarm.com — iOS not yet.",
    faqs: downloadPageFaqs,
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Modular energy", href: "/charging/modular-energy" },
      { name: "AI companion", href: "/download" },
    ],
  },
  {
    path: "/contact",
    title: "Contact Precifarm — EV Charging Kenya",
    description:
      "Contact Precifarm for home EV charger installation, fleet Depot, Boda Hub swap, highway hub hosting and site partnerships — M-Pesa on every product.",
    faqs: [
      {
        question: "How do I request a home EV charger in Kenya?",
        answer:
          "Visit precifarm.com/charging/private-house or contact Precifarm to request a Pulse charger or Pod energy storage survey. Lipa Pole Pole instalments are available on M-Pesa.",
      },
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    path: "/faq",
    title: "FAQ — EV charging in Kenya",
    description:
      "FAQs on Precifarm charging — Pulse charger from KES 79,000, a home day about KES 140 vs ~KES 1,000 diesel, Lipa Pole Pole from KES 3,300/month, public DC in under 30 minutes and the Charging Hub.",
    keywords: [
      "Precifarm FAQ",
      "EV charging Kenya cost",
      "home charger Kenya price",
      "KES 39 kWh",
      "Lipa Pole Pole financing",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    path: "/guides",
    title: "EV Charging Guides for Kenya",
    description:
      "Precifarm guides for home EV charger installs, DC fast charging, the Charging Hub and partner services in Kenya.",
    faqs: [
      {
        question: "Where can I learn about EV charging in Kenya?",
        answer:
          "Precifarm publishes guides on home charging, public DC charging, M-Pesa payment and the Charging Hub — written for Kenyan drivers, homeowners and fleet operators.",
      },
    ],
    keywords: ["Precifarm guides", "home EV charger Kenya", "EV charging guide"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Guides", href: "/guides" },
    ],
  },
  {
    path: "/locations",
    title: "Locations — EV charging across Kenya",
    description:
      "City guides for Precifarm EV charging in Nairobi, Kisumu, Nakuru, Mombasa and beyond — home Pulse charger installs, Corridor DC, Boda Hub swap and fleet Depot.",
    keywords: ["EV charging Kenya cities", "Precifarm hubs", "electric travel locations"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Locations", href: "/locations" },
    ],
  },
  {
    path: "/sw",
    title: "Precifarm — Usafiri wa umeme Kenya",
    description:
      "Precifarm inajenga na kuendesha kuchaji umeme nchini Kenya — kutoka Pulse charger nyumbani hadi Corridor DC barabarani, Lipa Pole Pole kutoka KES 3,300 kwa mwezi, kulipwa na M-Pesa.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Kiswahili", href: "/sw" },
    ],
  },
];

export function getPageSeo(path: string): PageSeoInput | undefined {
  return pageSeoRegistry.find((p) => p.path === path);
}
