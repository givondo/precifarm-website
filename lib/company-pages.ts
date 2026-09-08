/** Hero and index copy for Company nav pages (About lives in about-page.ts). */

export const guidesPage = {
  eyebrow: "Guides · Kenya",
  title: "Home install, highway DC and M-Pesa — step by step",
  description:
    "Written for Kenyan drivers and installers: Pulse charger and Pod energy storage at home, Corridor sessions on the highway, Charging Hub labels and Precifarm Agent on Android.",
  cta: {
    title: "Ready to charge?",
    description: "Browse the charging range or open the Charging Hub to see what is live near you.",
    primaryHref: "/charging",
    primaryLabel: "Explore charging",
    secondaryHref: "/hub",
    secondaryLabel: "Open Charging Hub",
  },
} as const;

export const faqPage = {
  eyebrow: "FAQ · Kenya",
  title: "Prices, plugs, Lipa Pole Pole and what is live today",
  description:
    "Straight answers on Pulse from KES 79,000, a home day about KES 140, public DC from KES 39/kWh, Charging Hub status labels and Precifarm Agent on Android.",
  cta: {
    title: "Still have questions?",
    description: "Request a home survey, download Precifarm Agent, or reach us on phone, email and WhatsApp.",
    primaryHref: "/charging/home",
    primaryLabel: "Home charging",
    secondaryHref: "/download",
    secondaryLabel: "Precifarm Agent",
  },
} as const;

export const contactPage = {
  eyebrow: "Contact · Kenya",
  title: "Home survey, fleet depot or highway hub — tell us which you need",
  description:
    "We respond within one business day. Homeowners get a Pulse or Pod survey; fleets and site hosts get engineering scoped to grid, solar and the duty cycle.",
  primaryCta: { href: "/charging/home", label: "Request a home survey" },
} as const;
