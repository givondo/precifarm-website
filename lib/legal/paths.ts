import { wirelessChargingPolicyPath } from "@/lib/wireless-charging-policy-page";

export const legalHubPath = "/legal";

export const privacyPolicyPath = "/legal/privacy";

export const termsOfUsePath = "/legal/terms";

export const cookiesPolicyPath = "/legal/cookies";

export const legalEffectiveDate = "16 October 2026";

export const legalEntity = {
  publicName: "Precifarm",
  legalName: "Precifarm AI Ltd",
  country: "Kenya",
  siteUrl: "https://precifarm.com",
} as const;

/** All public policy documents linked from the site footer. */
export const sitePolicyDocuments = [
  {
    title: "Terms of use",
    description: "Using precifarm.com, content accuracy, and product vs research claims.",
    href: termsOfUsePath,
    category: "Website",
  },
  {
    title: "Privacy policy",
    description: "What we collect through forms, Agent chat, and analytics — and your rights.",
    href: privacyPolicyPath,
    category: "Website",
  },
  {
    title: "Cookies & analytics",
    description: "Cookies, local storage, and optional usage analytics.",
    href: cookiesPolicyPath,
    category: "Website",
  },
  {
    title: "Wireless EV charging R&D",
    description: "Research programme rules, industry benchmarks, and pilot gates.",
    href: wirelessChargingPolicyPath,
    category: "R&D",
  },
] as const;
