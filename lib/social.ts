import { contact } from "@/lib/contact";

export type SocialPlatform =
  | "whatsapp"
  | "x"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "linkedin";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

/** Public social profiles — update handles here when accounts change. */
export const socialLinks: SocialLink[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: contact.whatsapp,
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com/precifarm",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/precifarm",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@precifarm",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/precifarm",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/company/precifarm",
  },
];

export const socialProfileUrls = socialLinks.map((link) => link.href);

export const socialHandles = {
  x: "@precifarm",
  instagram: "@precifarm",
  tiktok: "@precifarm",
} as const;
