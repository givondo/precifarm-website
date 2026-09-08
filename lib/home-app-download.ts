import { chargingHub } from "@/lib/charging-hub";

/** Homepage Precifarm Agent band — EV charging pivot */
export const homeAppDownload = {
  eyebrow: "Precifarm Agent",
  title: "Kenya's EV charging app.",
  description:
    "Precifarm Agent on Android — Charging Hub, Pulse and Pod home surveys, and M-Pesa on one account. iOS is not available yet.",
  features: [
    {
      title: chargingHub.name,
      text: "Corridor DC, Boda Hub swap and partner sites — live and planned labelled honestly.",
    },
    {
      title: "Home charging",
      text: "Request a Pulse charger or Pod energy storage survey before we quote your site.",
    },
    {
      title: "M-Pesa built in",
      text: "Public session pay and Lipa Pole Pole instalments. Price shown before you confirm.",
    },
    {
      title: "Modular energy path",
      text: "Pod energy storage today. P1 Go and P2 Home are still on the design roadmap.",
    },
  ],
  phoneTagline: "EV charging and home energy — one Android app",
  phonePill: chargingHub.openLabel,
  primaryLabel: "Get Precifarm Agent",
  iosLabel: "Download for iOS",
  iosUnavailableNote: "Not available yet",
  secondaryLabel: "Agent details & install",
  secondaryHref: "/download",
} as const;
