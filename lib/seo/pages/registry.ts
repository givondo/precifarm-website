import { homepageAisoBlocks } from "@/lib/seo/aiso/blocks";
import type { PageSeoInput } from "@/lib/seo/types";

/** Central registry for SEO audit and metadata consistency */
export const pageSeoRegistry: PageSeoInput[] = [
  {
    path: "/",
    title: "Precifarm — Electric transport infrastructure for Kenya",
    description:
      "Book Nairobi–Kisumu electric coach seats online. Precifarm builds charging hubs and the operating network for dependable intercity travel in Kenya.",
    faqs: (homepageAisoBlocks.find((b) => b.type === "faq")?.items ?? []) as PageSeoInput["faqs"],
    breadcrumbs: [{ name: "Home", href: "/" }],
  },
  {
    path: "/network",
    title: "Charge Map",
    description:
      "Interactive map of Precifarm charging hubs, partner sites and Nairobi–Kisumu route coverage across Kenya's electric transport network.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charge Map", href: "/network" },
    ],
  },
  {
    path: "/charging",
    title: "Charging Services",
    description:
      "Route hub charging, home DC installation and private-site stations — engineered and operated by Precifarm for intercity and fleet partners.",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Charging", href: "/charging" },
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
    path: "/download",
    title: "Download App",
    description:
      "Download the Precifarm Android passenger app to book Nairobi–Kisumu coach seats, pay with M-Pesa and receive SMS tickets.",
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
];

export function getPageSeo(path: string): PageSeoInput | undefined {
  return pageSeoRegistry.find((p) => p.path === path);
}
