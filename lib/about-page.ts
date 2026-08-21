import { africaSection, brand, problemSolution } from "@/lib/brand-messaging";

export const aboutPage = {
  hero: {
    eyebrow: "About Precifarm",
    title: brand.differentiator,
    description:
      "Precifarm installs, finances and runs EV charging in Kenya — from a Pulse charger at home to Corridor DC on the highway. A typical home charging day costs about KES 140 instead of ~KES 1,000 in diesel per day, paid with M-Pesa.",
  },
  intro: {
    title: "Why we exist",
    paragraphs: [
      "Electric vehicles are arriving in Kenya faster than dependable charging. Most drivers still pay ~KES 1,000 in diesel per day for a typical Nairobi commute — while the same kilometres at home on Pulse charger cost about KES 140 if the charger is installed, financed and kept online.",
      "Precifarm closes that gap with Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, and Corridor charging on the highway — Lipa Pole Pole from KES 3,300/month on M-Pesa, remote monitoring and honest live versus planned labels on the Charging Hub.",
      africaSection.description,
    ],
  },
  principlesSection: {
    eyebrow: "How we work",
    title: "One partner from the wallbox to the highway",
    description:
      "Precifarm connects power, charging, storage, software and financing so electric travel works as a system — not as isolated chargers.",
  },
  principles: [
    {
      title: brand.promise,
      text: "Pulse charger and Pod energy storage at home, Depot and Boda Hub for fleets, Corridor charging on the highway — one engineering team and M-Pesa on every product.",
    },
    {
      title: "Partners run the vehicles",
      text: "Precifarm is not a fleet company. Licensed operators own the buses and employ the drivers. We own the energy layer: survey, installation, uptime and settlement.",
    },
    {
      title: "Uptime is the product",
      text: "An offline charger breaks a home morning and a highway timetable. We monitor commissioned sites, recover quickly and label live versus planned honestly.",
    },
    {
      title: africaSection.title,
      text: africaSection.description,
    },
  ],
  cta: {
    title: "Join us in building EV charging in Kenya",
    description:
      "Whether you want a Pulse charger at home, host a highway hub, operate a fleet or support a project as a partner, we respond within one business day.",
    primaryHref: "/contact",
    primaryLabel: "Contact us",
    secondaryHref: "/charging",
    secondaryLabel: "Explore charging",
  },
} as const;
