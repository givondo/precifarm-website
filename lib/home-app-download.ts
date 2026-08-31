import { chargingHub } from "@/lib/charging-hub";

/** Homepage AI companion band — driver + fleet layers */
export const homeAppDownload = {
  eyebrow: "AI companion",
  title: "Your charging companion.",
  description: `The Precifarm AI companion on Android finds live hubs, sizes Pulse charger and Pod energy storage, and pays with M-Pesa. iOS is not available yet.`,
  features: [
    {
      title: "AI companion",
      text: "Find a hub, size home energy and pay with M-Pesa — one companion for how you actually drive.",
    },
    {
      title: chargingHub.name,
      text: "Precifarm hubs, partner chargers and planned sites — live labelled honestly.",
    },
    {
      title: "Home charging",
      text: "Request a Pulse charger or Pod energy storage survey and track installation on your own meter.",
    },
    {
      title: "Fleet layer",
      text: "One dashboard for vehicles, chargers and kWh — in design, not live yet.",
    },
  ],
  phoneTagline: "From home charging to highway charging",
  phonePill: chargingHub.openLabel,
  primaryLabel: "Get the AI companion",
  iosLabel: "Download for iOS",
  iosUnavailableNote: "Not available yet",
  secondaryLabel: "Install guide & details",
  secondaryHref: "/download",
} as const;
