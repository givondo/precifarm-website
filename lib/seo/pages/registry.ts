import { homepageAisoBlocks } from "@/lib/seo/aiso/blocks";
import { siteConfig } from "@/lib/seo/config";
import type { PageSeoInput } from "@/lib/seo/types";

/** Central registry for SEO audit and metadata consistency */
export const pageSeoRegistry: PageSeoInput[] = [
  {
    path: "/",
    title: siteConfig.defaultTitle,
    description:
      "Book Nairobi–Kisumu electric bus seats online. Precifarm builds charging hubs and the operating network for dependable intercity travel in Kenya.",
    faqs: (homepageAisoBlocks.find((b) => b.type === "faq")?.items ?? []) as PageSeoInput["faqs"],
    breadcrumbs: [{ name: "Home", href: "/" }],
  },
  {
    path: "/network",
    title: "Charge Map — EV hubs & Nairobi–Kisumu route",
    description:
      "Interactive map of Precifarm charging hubs, partner sites and Nairobi–Kisumu route coverage across Kenya's electric transport network.",
    keywords: ["EV charge map Kenya", "Precifarm hubs", "Nairobi Kisumu route map"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charge Map", href: "/network" },
    ],
  },
  {
    path: "/charging",
    title: "Charging Services — Hubs, home & fleet EV charging",
    description:
      "Route hub charging, home DC installation and private-site stations — engineered and operated by Precifarm for intercity and fleet partners.",
    keywords: ["EV charging Kenya", "fleet charging", "home DC charger installation"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
    ],
  },
  {
    path: "/charging/private-house",
    title: "Private House Charging — House-based EV charging in Kenya",
    description:
      "House-based private EV charging for your property — DC install at your home, on your meter, with survey, optional Neura Pod solar and five-year Precifarm support.",
    keywords: [
      "private house EV charging Kenya",
      "home DC charger private property",
      "house based EV charging Nairobi",
      "residential private charging install",
    ],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
      { name: "Private house charging", href: "/charging/private-house" },
    ],
  },
  {
    path: "/partners",
    title: "Partners",
    description:
      "Partner with Precifarm as an operator, fleet or site host. Reserved hub charging, timetables and passenger demand on Kenya's electric route network.",
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
    title: "About",
    description:
      "Precifarm builds charging hubs and the operating network for dependable electric travel between Kenyan cities — proving Nairobi–Kisumu first.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
    ],
  },
  {
    path: "/careers",
    title: "Careers",
    description:
      "Join Precifarm to build charging hubs, booking systems and route operations for electric intercity travel in Kenya.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    path: "/download",
    title: "Download App",
    description:
      "Download the Precifarm Android passenger app to book Nairobi–Kisumu bus seats, pay with M-Pesa and receive SMS tickets.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Download", href: "/download" },
    ],
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Precifarm for booking support, partnership enquiries and charging services across Kenya's electric transport network.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    path: "/faq",
    title: "FAQ — Booking, buses & charging",
    description:
      "Frequently asked questions about Precifarm booking, Nairobi–Kisumu electric buses, M-Pesa tickets and charging hubs in Kenya.",
    keywords: ["Precifarm FAQ", "electric bus booking Kenya", "M-Pesa bus ticket"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    path: "/guides",
    title: "Guides — Booking & EV charging in Kenya",
    description:
      "Precifarm guides for booking Nairobi–Kisumu electric bus travel, EV charging hubs and partner services in Kenya.",
    keywords: ["Precifarm guides", "book electric bus Kenya", "EV charging guide"],
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Guides", href: "/guides" },
    ],
  },
  {
    path: "/locations",
    title: "Locations — EV charging & electric travel in Kenya",
    description:
      "Precifarm hub locations across Kenyan cities. EV charging infrastructure and intercity electric bus connections.",
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
      "Precifarm inajenga vituo vya kuchaji na mtandao wa usafiri wa umeme kati ya miji mikuu nchini Kenya. Hifadhi nafasi Nairobi–Kisumu.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Kiswahili", href: "/sw" },
    ],
  },
];

export function getPageSeo(path: string): PageSeoInput | undefined {
  return pageSeoRegistry.find((p) => p.path === path);
}
