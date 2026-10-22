import { NextResponse } from "next/server";
import { BOOKING_FAQ_SLUG, BOOKING_GUIDE_SLUG } from "@/lib/charging-faqs";
import { homepageAisoBlocks, chargingHowToBlock } from "@/lib/seo/aiso/blocks";
import { entityRegistry, internalLinksForPath } from "@/lib/seo/entities/registry";
import { publicRoutes, siteConfig } from "@/lib/seo/config";
import { cmsGetSeoContent, cmsListSeoEntities } from "@/lib/seo/cms-client";

function faqsFromBlocks(blocks: { type: string; items?: unknown[] }[]) {
  const faqBlock = blocks.find((b) => b.type === "faq");
  return faqBlock?.items ?? [];
}

async function resolveCmsKnowledge(path: string, locale: string) {
  const guideMatch = path.match(/^\/guides\/([^/]+)$/);
  const faqMatch = path.match(/^\/faq\/([^/]+)$/);
  const locationMatch = path.match(/^\/locations\/([^/]+)$/);
  const effectiveLocale = locale;

  let slug: string | null = null;
  if (guideMatch) slug = guideMatch[1];
  if (faqMatch) slug = faqMatch[1];
  if (locationMatch) slug = locationMatch[1];

  // Retired passenger-booking content must not surface to AI crawlers or agents.
  if (slug === BOOKING_GUIDE_SLUG || slug === BOOKING_FAQ_SLUG) {
    return null;
  }

  if (slug) {
    const content = await cmsGetSeoContent(slug, effectiveLocale);
    if (content) {
      return {
        source: "cms",
        content: {
          slug: content.slug,
          title: content.title,
          description: content.description,
          contentType: content.contentType,
          bodyMd: content.bodyMd,
          aisoBlocks: content.aisoBlocks,
          authorName: content.authorName,
          sources: content.sources,
          locale: content.locale ?? effectiveLocale,
        },
        faqs: faqsFromBlocks(content.aisoBlocks),
      };
    }
  }

  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path") ?? "/";
  // Swahili pages are retired; /sw paths map to their English page.
  const path = rawPath === "/sw" ? "/" : rawPath.startsWith("/sw/") ? rawPath.slice(3) : rawPath;
  const locale = "en-KE";

  const route = publicRoutes.find((r) => r.path === path);
  const cmsKnowledge = await resolveCmsKnowledge(path, locale);
  const entities = (await cmsListSeoEntities()).slice(0, 20);
  const entityFallback = entities.length ? entities : entityRegistry.slice(0, 20);

  if (cmsKnowledge) {
    return NextResponse.json({
      site: {
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.defaultDescription,
      },
      path: rawPath,
      locale,
      page: route ?? null,
      ...cmsKnowledge,
      relatedLinks: internalLinksForPath(path),
      entities: entityFallback,
      meta: {
        version: "2.0",
        purpose: "Structured knowledge payload for AI search and agent consumption",
      },
    });
  }

  return NextResponse.json({
    site: {
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.defaultDescription,
    },
    path: rawPath,
    locale,
    page: route ?? null,
    source: "static",
    executiveSummary: homepageAisoBlocks.find((b) => b.type === "executive_summary")?.content,
    keyFacts: homepageAisoBlocks.find((b) => b.type === "key_facts")?.items,
    faqs: homepageAisoBlocks.find((b) => b.type === "faq")?.items,
    howTo: chargingHowToBlock.items,
    relatedLinks: internalLinksForPath(path),
    entities: entityFallback,
    meta: {
      version: "2.0",
      purpose: "Structured knowledge payload for AI search and agent consumption",
    },
  });
}
