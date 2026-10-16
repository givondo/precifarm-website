import { contact } from "@/lib/contact";

export type SocialPlatform = "whatsapp" | "x" | "tiktok" | "linkedin";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

/** Public company page (LinkedIn company ID 27008635 — not /admin URLs). */
export const linkedInCompany = {
  slug: "precifarm",
  companyId: "27008635",
  publicUrl: "https://www.linkedin.com/company/precifarm",
} as const;

/** Public social profiles — update handles here when accounts change. */
export const socialLinks: SocialLink[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: contact.whatsapp,
  },
  {
    id: "tiktok",
    label: "100% Electric on TikTok",
    href: "https://www.tiktok.com/@precifarm",
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com/Precifarm",
  },
  {
    id: "linkedin",
    label: "Precifarm AI on LinkedIn",
    href: linkedInCompany.publicUrl,
  },
];

export const socialProfileUrls = socialLinks.map((link) => link.href);

export const socialHandles = {
  x: "@Precifarm",
  tiktok: "@precifarm",
  tiktokDisplayName: "100% Electric",
  linkedin: linkedInCompany.publicUrl,
} as const;
