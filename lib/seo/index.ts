export { siteConfig, publicRoutes, absoluteUrl } from "@/lib/seo/config";
export { createPageSeo, rootLayoutMetadata } from "@/lib/seo/metadata";
export * from "@/lib/seo/schema";
export * from "@/lib/seo/types";
export {
  entityRegistry,
  getEntity,
  getEntityBySlug,
  getRelatedEntities,
  listEntities,
  internalLinksForPath,
} from "@/lib/seo/entities/registry";
export { runSeoAudit, auditPageSeo } from "@/lib/seo/audit/checks";
export { homepageAisoBlocks, bookingHowToBlock, homepageRelatedLinks, buildGeoFaqSet } from "@/lib/seo/aiso/blocks";
export { buildStaticSitemapEntries, buildImageSitemapEntries } from "@/lib/seo/sitemap";
export * from "@/lib/seo/cms-client";
