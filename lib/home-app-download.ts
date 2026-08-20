import { chargingHub } from "@/lib/charging-hub";

/** Homepage download app band — driver + fleet layers */
export const homeAppDownload = {
  eyebrow: "App",
  title: "Find charging on your phone.",
  description: `Use the Android app to find a charger, request a home installation and pay with M-Pesa. iOS is not available yet.`,
  features: [
    {
      title: "Driver",
      text: "Find a hub, check power and status, start a session and pay with M-Pesa.",
    },
    {
      title: chargingHub.name,
      text: "Precifarm hubs, partner chargers and planned sites — live labelled live.",
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
  primaryLabel: "Download for Android",
  iosLabel: "Download for iOS",
  iosUnavailableNote: "Not available yet",
  secondaryLabel: "Install guide & details",
  secondaryHref: "/download",
} as const;
