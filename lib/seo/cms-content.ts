import { BOOKING_FAQ_SLUG, faqIndexChargingFaqs, homepageChargingFaqs } from "@/lib/charging-faqs";
import {
  cmsListSeoContent,
  type CmsSeoContent,
} from "@/lib/seo/cms-client";
import { siteConfig } from "@/lib/seo/config";
import type { FaqItem } from "@/lib/seo/types";

const GUIDE_TYPES = new Set(["guide", "howto", "article"]);

export function isGuideContent(item: CmsSeoContent): boolean {
  return GUIDE_TYPES.has(item.contentType);
}

export function isFaqContent(item: CmsSeoContent): boolean {
  return item.contentType === "faq";
}

export function faqsFromCmsContent(content: CmsSeoContent): FaqItem[] {
  const faqBlock = content.aisoBlocks.find((block) => block.type === "faq");
  if (!faqBlock?.items) return [];
  return faqBlock.items as FaqItem[];
}

export function collectFaqItems(contents: CmsSeoContent[]): FaqItem[] {
  const seen = new Set<string>();
  const items: FaqItem[] = [];

  for (const content of contents) {
    for (const item of faqsFromCmsContent(content)) {
      if (seen.has(item.question)) continue;
      seen.add(item.question);
      items.push(item);
    }
  }

  return items;
}

export function guideTypeLabel(contentType: string): string {
  switch (contentType) {
    case "howto":
      return "How-to";
    case "article":
      return "Article";
    default:
      return "Guide";
  }
}

export function excerptFromMarkdown(md: string | null, maxLength = 180): string | undefined {
  if (!md) return undefined;

  for (const line of md.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
      continue;
    }
    const text = trimmed.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    if (!text) continue;
    return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}…` : text;
  }

  return undefined;
}

export function formatContentDate(iso: string | null | undefined): string | undefined {
  if (!iso) return undefined;
  return new Intl.DateTimeFormat("en-KE", {
    month: "short",
    year: "numeric",
    timeZone: siteConfig.timezone,
  }).format(new Date(iso));
}

function sortByPublishedDesc(a: CmsSeoContent, b: CmsSeoContent): number {
  const aTime = new Date(a.publishedAt ?? a.updatedAt).getTime();
  const bTime = new Date(b.publishedAt ?? b.updatedAt).getTime();
  return bTime - aTime;
}

export async function getPublishedGuides(): Promise<CmsSeoContent[]> {
  const items = await cmsListSeoContent({ status: "published", locale: siteConfig.locale });
  return items.filter(isGuideContent).sort(sortByPublishedDesc);
}

export async function getPublishedFaqs(): Promise<CmsSeoContent[]> {
  const items = await cmsListSeoContent({ status: "published", locale: siteConfig.locale });
  return items.filter(isFaqContent).filter((item) => item.slug !== BOOKING_FAQ_SLUG).sort(sortByPublishedDesc);
}

export async function getHomepageFaqs(limit = 6): Promise<FaqItem[]> {
  return homepageChargingFaqs.slice(0, limit);
}

export async function getHomepageFaqsForSchema(): Promise<FaqItem[]> {
  return homepageChargingFaqs;
}

export async function getFaqIndexItems(): Promise<FaqItem[]> {
  return faqIndexChargingFaqs;
}
