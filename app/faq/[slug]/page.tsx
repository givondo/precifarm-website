import Link from "next/link";
import AisoPageSections from "@/components/seo/AisoPageSections";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import MarkdownContent from "@/components/seo/MarkdownContent";
import TrustSignals from "@/components/seo/TrustSignals";
import { cmsGetSeoContent, cmsListSeoContent, type CmsSeoContent } from "@/lib/seo/cms-client";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import type { AisoContentBlock, FaqItem } from "@/lib/seo/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function faqsFromBlocks(blocks: CmsSeoContent["aisoBlocks"]): FaqItem[] {
  const faqBlock = blocks.find((b) => b.type === "faq");
  if (!faqBlock?.items) return [];
  return faqBlock.items as FaqItem[];
}

function buildSeo(slug: string, content: CmsSeoContent) {
  const path = `/faq/${slug}`;
  const faqs = faqsFromBlocks(content.aisoBlocks);
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
  const items = await cmsListSeoContent({ status: "published" });
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
  const faqs = faqsFromBlocks(content.aisoBlocks);
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

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="bg-white">
        <header className="border-b border-border section-pad">
          <div className="page-container max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "FAQ", href: "/faq" },
                { name: content.title, href: path },
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">FAQ</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
              {content.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-forest-600">{content.description}</p>
            <TrustSignals
              authorName={content.authorName}
              reviewerName={content.reviewerName}
              reviewedAt={content.reviewedAt}
              updatedAt={content.updatedAt}
              sources={content.sources}
            />
          </div>
        </header>

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

        <div className="border-t border-border section-pad">
          <div className="page-container max-w-3xl">
            <Link href="/contact" className="btn-secondary inline-flex rounded-full px-6 py-3 text-sm">
              Contact support
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
