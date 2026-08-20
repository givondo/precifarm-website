import {
  chargingServicesFaqs,
  hubEngineeringFaqs,
  privateHouseChargingFaqs,
} from "@/lib/charging-faqs";
import { chargingHub } from "@/lib/charging-hub";
import { homepageAisoBlocks } from "@/lib/seo/aiso/blocks";
import { defaultSiteTitle } from "@/lib/seo/config";
import type { PageSeoInput } from "@/lib/seo/types";

/** Central registry for SEO audit and metadata consistency */
export const pageSeoRegistry: PageSeoInput[] = [
  {
    path: "/",
    title: defaultSiteTitle,
    description:
      "Precifarm installs, finances and runs EV charging in Kenya — from home charging to highway charging, paid with M-Pesa. Pulse charger from KES 79,000. Public DC from KES 39/kWh.",
    faqs: (homepageAisoBlocks.find((b) => b.type === "faq")?.items ?? []) as PageSeoInput["faqs"],
    breadcrumbs: [{ name: "Home", href: "/" }],
  },
  {
    path: chargingHub.path,
    title: `${chargingHub.name} — Find EV charging in Kenya`,
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
          "Open the Precifarm Charging Hub map to see live Precifarm hubs and partner chargers, filter by availability, search by route or name, and get directions to each site.",
      },
      {
        question: "Can I pay for EV charging with M-Pesa?",
        answer:
          "Yes. Every Precifarm hub supports M-Pesa payment. Download the Precifarm app to start a session, see live bay status and view your charging history.",
      },
      {
        question: "Which EV charging corridor is live in Kenya?",
        answer:
          "The Nairobi–Kisumu corridor is live on the Charging Hub map, with hubs at Kisumu, Nakuru and Nairobi plus partner retail stops along the western route.",
      },
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: chargingHub.label, href: chargingHub.path },
    ],
  },
  {
    path: "/charging",
    title: "Charging — From home charging to highway charging",
    description:
      "Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway — M-Pesa on every product. Pulse charger from KES 79,000. Public DC from KES 39/kWh.",
    keywords: ["EV charging Kenya", "fleet charging", "home DC charger installation", "KES 39 kWh"],
    faqs: chargingServicesFaqs,
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
    ],
  },
  {
    path: "/charging/private-house",
    title: "Home Charging — Pulse charger and Pod energy storage in Kenya",
    description:
      "Pulse charger from KES 79,000, Pod energy storage, Lipa Pole Pole on M-Pesa. A typical home charging day about KES 140 vs petrol. Survey and three-year Precifarm aftersale support.",
    faqs: privateHouseChargingFaqs,
    keywords: [
      "private house EV charging Kenya",
      "home DC charger private property",
      "house based EV charging Nairobi",
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
    title: "Solar Chargers & Stations — Engineering Design Doc",
    description:
      "Downloadable Precifarm engineering design basis for solar-assisted DC route hubs, campus stations and private house hybrid charging — energy model, Kenya Power hold points and site task sheet.",
    faqs: hubEngineeringFaqs,
    keywords: [
      "EV charging station design Kenya",
      "solar EV charger engineering",
      "DC fast charging hub task sheet",
      "Precifarm charging station design",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
      { name: "Engineering package", href: "/charging/engineering" },
    ],
  },
  {
    path: "/evs",
    title: "Kenya EV Guide — Range, charging time & Precifarm fit",
    description:
      "Compare 17 EVs in Kenya — Nissan Leaf, BYD Atto 3, MG4, Tesla Model 3, Roam Air and more. Practical range, DC charging speed, daily top-up time and where Precifarm home, hub and corridor charging fit.",
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
    title: "Partners — Fleet charging, hub hosts & home installers",
    description:
      "Partner with Precifarm to host Corridor hubs, run Depot and Boda Hub for fleets, or sell Pulse charger and Pod energy storage home installations — M-Pesa on every product.",
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
    title: "EV Charging Training — T1, T2 & T3",
    description:
      "Precifarm EV charging training for hub staff and field engineers. T1 safety awareness, T2 field technician and T3 commissioning specialist certification in Kenya.",
    keywords: [
      "EV charging training Kenya",
      "T1 T2 T3 technician certification",
      "DC fast charger training",
      "Precifarm training",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Training", href: "/training" },
    ],
  },
  {
    path: "/about",
    title: "About — From home charging to highway charging",
    description:
      "Precifarm installs, finances and runs EV charging in Kenya — Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway, paid with M-Pesa.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
    ],
  },
  {
    path: "/careers",
    title: "Careers",
    description:
      "Join Precifarm to install Pulse charger and Pod energy storage at home, commission Depot and Corridor charging, and keep M-Pesa sessions online across Kenya.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    path: "/download",
    title: "Download App",
    description:
      "Download the Precifarm Android app to find chargers, explore the charging range and request home installation quotes with M-Pesa.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Download", href: "/download" },
    ],
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Precifarm for Pulse charger and Pod energy storage home installations, fleet depot design, highway hub hosting and charging services across Kenya.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    path: "/faq",
    title: "FAQ — EV charging in Kenya",
    description:
      "FAQs on Precifarm charging — a home charging day about KES 140, Pulse charger from KES 79,000, public DC from KES 39/kWh, Lipa Pole Pole and the Charging Hub.",
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
    title: "Guides — EV charging in Kenya",
    description:
      "Precifarm guides for home charger installs, public DC charging, the Charging Hub and partner services in Kenya.",
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
      "Precifarm hub locations across Kenyan cities — from home charging to highway charging.",
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
      "Precifarm inajenga vituo vya kuchaji nchini Kenya — kutoka kuchaji nyumbani hadi kuchaji barabarani, Lipa na M-Pesa.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Kiswahili", href: "/sw" },
    ],
  },
];

export function getPageSeo(path: string): PageSeoInput | undefined {
  return pageSeoRegistry.find((p) => p.path === path);
}
