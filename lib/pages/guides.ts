/** /guides: topics, figure placement and related product pages for the website's own guides. */

export type GuideFigureKey = "off-peak" | "power-ladder" | "supply-checks" | "swap-flow";

type GuideExtras = {
  topic: string;
  /** heading id (from lib/publications slugify) that the figure follows */
  figure?: { after: string; key: GuideFigureKey };
  product?: { href: string; label: string; reason: string };
};

export const guideExtras: Record<string, GuideExtras> = {
  "kenya-power-ev-charging-tariff": {
    topic: "Tariffs",
    figure: { after: "off-peak-hours-for-ev-charging", key: "off-peak" },
    product: { href: "/charging/home", label: "Pulse home charging", reason: "Charge off-peak on your own meter" },
  },
  "ev-charging-stations-kenya": {
    topic: "Public charging",
    figure: { after: "how-long-charging-takes", key: "power-ladder" },
    product: { href: "/hub", label: "Charging Hub map", reason: "Planned and partner sites, clearly labelled" },
  },
  "charge-electric-car-at-home-kenya": {
    topic: "Home charging",
    figure: { after: "what-your-electricity-supply-needs", key: "supply-checks" },
    product: { href: "/charging/home", label: "Request a home survey", reason: "Supply, earthing and cable route checked on site" },
  },
  "electric-boda-battery-swap-kenya": {
    topic: "Battery swapping",
    figure: { after: "the-short-answer", key: "swap-flow" },
    product: { href: "/charging/boda-hub", label: "Boda Hub", reason: "Battery swapping, in development" },
  },
};

export const guidesIndexCopy = {
  intro: "Written for Kenyan drivers, riders, homeowners and installers. Each guide opens with the short answer, dates its outside figures and lists its sources.",
  standards: [
    { title: "Answer first", text: "The first section answers the question. Detail follows." },
    { title: "Sourced and dated", text: "Outside figures carry a source and the date it was read." },
    { title: "Plans stay plans", text: "Sites being prepared are never described as open." },
  ],
} as const;
