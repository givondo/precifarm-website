import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import AisoPageSections from "@/components/seo/AisoPageSections";
import FaqAccordion from "@/components/seo/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import MarkdownContent from "@/components/seo/MarkdownContent";
import TrustSignals from "@/components/seo/TrustSignals";
import { faqsFromCmsContent } from "@/lib/seo/cms-content";
import { cmsGetSeoContent, cmsListSeoContent, type CmsSeoContent } from "@/lib/seo/cms-client";
import { siteConfig } from "@/lib/seo/config";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import type { AisoContentBlock } from "@/lib/seo/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function buildSeo(slug: string, content: CmsSeoContent) {
  const path = `/faq/${slug}`;
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
      { name: "FAQ", href: "/faq" },
      { name: content.title, href: path },
    ],
    faqs: faqs.length ? faqs : undefined,
  });
}

export async function generateStaticParams() {
  const items = await cmsListSeoContent({ status: "published", locale: siteConfig.locale });
  return items.filter((item) => item.contentType === "faq").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug);
  if (!content) return {};
  return buildSeo(slug, content).metadata;
}

export default async function FaqPage({ params }: Props) {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug);
  if (!content || content.contentType !== "faq") {
    notFound();
  }

  const path = `/faq/${slug}`;
  const seo = buildSeo(slug, content);
  const faqs = faqsFromCmsContent(content);
  const jsonLd = faqs.length
    ? [
        ...seo.jsonLd,
        faqSchema(faqs),
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
      ]
    : seo.jsonLd;
  const aisoBlocks = content.aisoBlocks as AisoContentBlock[];
  const supplementalBlocks = aisoBlocks.filter((block) => block.type !== "faq");

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="bg-white">
        <PageHero
          eyebrow="FAQ"
          title={content.title}
          description={content.description}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "FAQ", href: "/faq" },
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

        {faqs.length > 0 && (
          <div className="section-pad border-b border-border">
            <div className="page-container max-w-3xl">
              <FaqAccordion items={faqs} />
            </div>
          </div>
        )}

        {content.bodyMd && (
          <div className="section-pad">
            <div className="page-container max-w-3xl">
              <MarkdownContent md={content.bodyMd} />
            </div>
          </div>
        )}

        <AisoPageSections
          blocks={supplementalBlocks}
          relatedLinks={internalLinksForPath(path)}
        />

        <PageCTA
          title="Need more help?"
          description="Contact our team by phone, email or WhatsApp."
          primaryHref="/contact"
          primaryLabel="Contact support"
          secondaryHref="/charging"
          secondaryLabel="Explore charging"
        />
      </article>
    </>
  );
}
