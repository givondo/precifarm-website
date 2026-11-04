/** Shared facts and CTAs for inner pages — homepage bands keep their own copy in brand-messaging. */

export const sitePricing = {
  pulseFrom: "KES 79,000",
  lipaFrom: "KES 3,300/month",
  homeDay: "KES 140",
  dieselDay: "KES 1,000",
  /** ARC Corridor: no public price until a site is commissioned and costed (engineering register COR-13, COR-16). */
  publicDcPrice: "Shown before you start",
} as const;

export const siteCtas = {
  homeSurvey: { href: "/charging/home", label: "Request a house survey" },
  homeCharging: { href: "/charging/home", label: "Explore home charging" },
  fleetCharging: { href: "/partners", label: "Explore fleet charging" },
  chargingHub: { href: "/hub", label: "Find a charging hub" },
  exploreCharging: { href: "/charging", label: "Explore charging" },
  allFaq: { href: "/faq", label: "All FAQ" },
  partners: { href: "/partners", label: "Fleet & partners" },
} as const;
