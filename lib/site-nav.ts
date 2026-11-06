/**
 * One source of truth for footer navigation. Every footer link is listed once here;
 * tests/site-nav.test.ts checks each internal link has a page behind it and that no
 * link appears twice.
 */
import { brand } from "@/lib/brand-messaging";

export type NavLink = { href: string; label: string };
export type NavGroup = { id: string; title: string; links: readonly NavLink[] };

export const footerGroups: readonly NavGroup[] = [
  {
    id: "charging",
    title: "Charging",
    links: [
      { href: "/charging/home", label: "Pulse home charger" },
      { href: "/charging/pulse-plus", label: "Pulse+ workplace charging" },
      { href: "/charging/corridor", label: "ARC Corridor" },
      { href: "/charging/boda-hub", label: "Boda Hub battery swap" },
      { href: "/hub", label: "Charging Hub map" },
      { href: "/charging", label: "Compare charging" },
    ],
  },
  {
    id: "business",
    title: "Business",
    links: [
      { href: "/partners", label: "Fleets and partners" },
      { href: "/contact?interest=corridor", label: "Host a charging site" },
      { href: "/charging/engineering", label: "Engineering and site design" },
      { href: "/training", label: "Installer training" },
    ],
  },
  {
    id: "ai-research",
    title: "AI and research",
    links: [
      { href: "/agent", label: "Precifarm Agent" },
      { href: "/download", label: "Get the app" },
      { href: "/research", label: "Research programmes" },
      { href: "/research/wireless-ev-charging-policy", label: "Wireless charging policy" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/evs", label: "Kenya EV guide" },
      { href: "/faq", label: "FAQ" },
      { href: "/locations", label: "Locations" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { href: "/about", label: "About Precifarm" },
      { href: "/sustainability", label: "Sustainability" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const footerLegalLinks: readonly NavLink[] = [
  { href: "/legal", label: "Legal" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cookies", label: "Cookies" },
];

export const footerCopy = {
  description:
    "Precifarm designs, installs and finances EV charging in Kenya, from the Pulse home charger today to highway charging and battery swapping in development, with M-Pesa on every product.",
  meta: `${brand.africa}`,
} as const;

export type FooterCta = {
  eyebrow: string;
  title: string;
  text: string;
  primary: NavLink;
  secondary?: NavLink;
};

const surveyCta: FooterCta = {
  eyebrow: "Start with a survey",
  title: "Plan the right charger for your site.",
  text: "A Precifarm engineer checks your supply, cable route and parking, then quotes the install. The survey is free.",
  primary: { href: "/contact?interest=survey", label: "Book a free EV survey" },
  secondary: { href: "/charging", label: "Compare charging" },
};

/** Footer call to action by section of the site; the first matching prefix wins. */
const ctaByPrefix: ReadonlyArray<[string, FooterCta]> = [
  [
    "/charging/corridor",
    {
      eyebrow: "Site hosts",
      title: "Host an ARC Corridor site.",
      text: "Fuel stations, malls, depots and roadside sites: we assess the grid connection, bay layout and traffic before anything is proposed.",
      primary: { href: "/contact?interest=corridor", label: "Host a site" },
      secondary: { href: "/partners", label: "Partner routes" },
    },
  ],
  [
    "/charging/boda-hub",
    {
      eyebrow: "Boda Hub partners",
      title: "Bring battery swapping to your stage.",
      text: "Tell us about your site, riders and power supply and we will plan a Boda Hub with you.",
      primary: { href: "/contact?interest=boda-hub", label: "Partner on a site" },
      secondary: { href: "/hub?type=swap", label: "See planned swap sites" },
    },
  ],
  [
    "/charging/pulse-plus",
    {
      eyebrow: "Workplaces and fleets",
      title: "Plan workplace and fleet charging.",
      text: "Share your parking, vehicles and supply. We size the chargers, load sharing and cable routes for your site.",
      primary: { href: "/contact?interest=pulse-plus", label: "Plan your site" },
      secondary: { href: "/partners", label: "Fleet partnerships" },
    },
  ],
  [
    "/partners",
    {
      eyebrow: "Partnerships",
      title: "Build the network with Precifarm.",
      text: "Fleet operators, site hosts, property owners, installers and infrastructure partners: tell us what you are planning.",
      primary: { href: "/contact?interest=dealer", label: "Start a partnership" },
      secondary: { href: "/charging/engineering", label: "Engineering services" },
    },
  ],
  [
    "/agent",
    {
      eyebrow: "Precifarm Agent",
      title: "Run your first design in minutes.",
      text: "Describe a home, depot or site. The Agent plans the job and shows every calculation it ran.",
      primary: { href: "/agent#try", label: "Try Precifarm Agent" },
      secondary: { href: "/download", label: "Get the app" },
    },
  ],
  [
    "/download",
    {
      eyebrow: "Precifarm Agent",
      title: "Start designing in your browser.",
      text: "The web workspace needs no install. Run a design now and keep the trace.",
      primary: { href: "/agent#try", label: "Open the workspace" },
      secondary: { href: "/contact?interest=agent-desktop", label: "Request desktop access" },
    },
  ],
  [
    "/research",
    {
      eyebrow: "Research partners",
      title: "Work with us on what comes next.",
      text: "Labs, fleets and vehicle makers: help us move wireless charging and site energy from model to measured data.",
      primary: { href: "/contact?interest=general", label: "Collaborate" },
      secondary: { href: "/research", label: "Research programmes" },
    },
  ],
  [
    "/training",
    {
      eyebrow: "Training",
      title: "Join the next training cohort.",
      text: "Tell us your background and the tier you are aiming for, and we will confirm the next intake.",
      primary: { href: "/contact?interest=general", label: "Ask about training" },
      secondary: { href: "/training", label: "Curriculum" },
    },
  ],
  [
    "/careers",
    {
      eyebrow: "Careers",
      title: "Build Kenya's charging network.",
      text: "Engineers, installers and operators: send us your experience and the work you want to do.",
      primary: { href: "/contact?interest=general", label: "Get in touch" },
      secondary: { href: "/about", label: "About Precifarm" },
    },
  ],
  [
    "/",
    {
      eyebrow: "Fleets, sites and buildings",
      title: "Planning more than one charger?",
      text: "Depots, workplaces, apartment blocks and roadside sites get an engineered plan: supply, layout, load sharing and payments.",
      primary: { href: "/partners", label: "Plan a site" },
      secondary: { href: "/charging/engineering", label: "Engineering services" },
    },
  ],
];

export function footerCtaFor(pathname: string): FooterCta {
  if (pathname === "/") return ctaByPrefix.find(([p]) => p === "/")![1];
  for (const [prefix, cta] of ctaByPrefix) {
    if (prefix !== "/" && (pathname === prefix || pathname.startsWith(`${prefix}/`))) return cta;
  }
  return surveyCta;
}
