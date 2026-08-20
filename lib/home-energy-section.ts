/** Homepage home energy section — compact packages and copy */

export const homeEnergyPricingDisclaimer =
  "Indicative pricing — your final quote follows a site survey." as const;

export const homeEnergySection = {
  id: "home-energy",
  eyebrow: "Home energy · Kenya",
  title: "Charge your EV. Power your home. Spend less on electricity.",
  description:
    "One installation brings together solar, battery storage and a home charger — sized for how you drive, how your household uses power, and how Kenya Power behaves on your street.",
  trust: "Site survey · Professional installation · M-Pesa · 3-year aftersale care",
  packages: [
    {
      id: "charge",
      name: "Charge",
      tag: "Charger only",
      priceFrom: "KES 120,000",
      bestFor: "Reliable home EV charging on the grid",
      points: ["7–11 kW AC wallbox", "Full installation and commissioning", "No solar or battery included"],
      image: "/images/products/pulse.png",
      imageAlt: "Precifarm Pulse 7 kW home wallbox",
      href: "/charging/private-house",
      cta: "Get a Charge quote",
    },
    {
      id: "solar-charge",
      name: "Solar + Charge",
      tag: "Solar + EV",
      priceFrom: "KES 450,000",
      bestFor: "Solar to cut EV and household electricity cost",
      points: ["4–5 kWp rooftop solar (example)", "7–11 kW AC charger", "Battery optional"],
      image: "/images/charging-home.png",
      imageAlt: "Home with rooftop solar and EV wall charger",
      href: "/charging/private-house",
      cta: "Build my solar + EV system",
    },
    {
      id: "home-energy",
      name: "Home Energy",
      tag: "Full system",
      priceFrom: "KES 650,000",
      bestFor: "Solar, EV charging and backup in one installation",
      points: ["~5 kWp solar + 5–10 kWh battery", "7–11 kW AC charger", "Essential backup circuits"],
      image: "/images/charging-private-house-hybrid.png",
      imageAlt: "Hybrid home installation with solar, storage and Pulse charger",
      href: "/charging/private-house",
      cta: "Design my home energy system",
    },
  ],
  primaryHref: "/charging/private-house",
  primaryLabel: "Request a home survey",
  secondaryHref: "/charging/engineering",
  secondaryLabel: "Read the design basis",
} as const;
