import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import MarkdownContent from "@/components/seo/MarkdownContent";
import TrustSignals from "@/components/seo/TrustSignals";
import AisoPageSections from "@/components/seo/AisoPageSections";
import { faqsFromCmsContent } from "@/lib/seo/cms-content";
import { cmsGetSeoContent, cmsListSeoContent, type CmsSeoContent } from "@/lib/seo/cms-client";
import { siteConfig } from "@/lib/seo/config";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import type { AisoContentBlock } from "@/lib/seo/types";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function buildSeo(slug: string, content: CmsSeoContent) {
  const path = `/guides/${slug}`;
  const faqs = faqsFromCmsContent(content);
  return createPageSeo({
    title: content.title,
    description: content.description,
    path,
    ogType: "article",
    publishedTime: content.publishedAt ?? undefined,
    modifiedTime: content.updatedAt,
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Guides", href: "/guides" },
      { name: content.title, href: path },
    ],
    faqs: faqs.length ? faqs : undefined,
  });
}

export async function generateStaticParams() {
  const items = await cmsListSeoContent({ status: "published", locale: siteConfig.locale });
  return items
    .filter((item) => ["guide", "howto", "article"].includes(item.contentType))
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug);
  if (!content) return {};
  return buildSeo(slug, content).metadata;
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug);
  if (!content || !["guide", "howto", "article"].includes(content.contentType)) {
    notFound();
  }

  const path = `/guides/${slug}`;
  const seo = buildSeo(slug, content);
  const jsonLd = [
    ...seo.jsonLd,
    articleSchema({
      title: content.title,
      description: content.description,
      path,
      publishedTime: content.publishedAt ?? undefined,
      modifiedTime: content.updatedAt,
      authorName: content.authorName ?? undefined,
      reviewerName: content.reviewerName ?? undefined,
      reviewedTime: content.reviewedAt ?? undefined,
      sources: content.sources,
    }),
  ];
  const aisoBlocks = content.aisoBlocks as AisoContentBlock[];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="bg-white">
        <PageHero
          eyebrow="Guide"
          title={content.title}
          description={content.description}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: content.title, href: path },
          ]}
        >
          <TrustSignals
            authorName={content.authorName}
            reviewerName={content.reviewerName}
            reviewedAt={content.reviewedAt}
            updatedAt={content.updatedAt}
            sources={content.sources}
          />
        </PageHero>

        {content.bodyMd && (
          <div className="section-pad">
            <div className="page-container max-w-3xl">
              <MarkdownContent md={content.bodyMd} />
            </div>
          </div>
        )}

        {aisoBlocks.length > 0 && (
          <AisoPageSections blocks={aisoBlocks} relatedLinks={internalLinksForPath(path)} />
        )}

        <PageCTA
          title="Ready to charge?"
          description="Explore Pulse charger, Pod energy storage and Corridor charging — or open the Charging Hub to find public DC near you."
          primaryHref="/charging"
          primaryLabel="Explore charging"
          secondaryHref="/network"
          secondaryLabel="Open Charging Hub"
        />
      </article>
    </>
  );
}
