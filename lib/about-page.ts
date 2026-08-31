import { africaSection, brand, problemSolution } from "@/lib/brand-messaging";

export const aboutPage = {
  hero: {
    eyebrow: "About Precifarm",
    title: brand.differentiator,
    description: brand.words50,
  },
  intro: {
    title: "Why we exist",
    paragraphs: [
      problemSolution.problemTitle +
        " Precifarm connects power, charging, storage and M-Pesa so drivers and operators can rely on the system — not hunt for a free charger.",
      "We install and operate Pulse and Pod at home, Depot and Boda Hub for fleets, and Corridor on the highway. Licensed operators run the vehicles; we own the energy layer.",
      africaSection.description,
    ],
  },
  principlesSection: {
    eyebrow: "How we work",
    title: "One partner from the wallbox to the highway",
    description: "Power, charging, storage, software and financing — engineered as one system.",
  },
  principles: [
    {
      title: brand.promise,
      text: "Home, fleet and highway products under one team. M-Pesa on every surface.",
    },
    {
      title: "Partners run the vehicles",
      text: "Precifarm is not a fleet company. We survey, install, monitor and settle energy.",
    },
    {
      title: "Uptime is the product",
      text: "Live versus planned is labelled honestly. A charger that is down is a missed morning.",
    },
    {
      title: africaSection.title,
      text: africaSection.description,
    },
  ],
  cta: {
    title: "Work with Precifarm",
    description: "Home survey, fleet depot, highway hub or site host — we respond within one business day.",
    primaryHref: "/contact",
    primaryLabel: "Contact us",
    secondaryHref: "/charging",
    secondaryLabel: "Explore charging",
  },
} as const;
