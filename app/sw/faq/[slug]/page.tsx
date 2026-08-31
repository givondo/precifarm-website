import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AisoPageSections from "@/components/seo/AisoPageSections";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import MarkdownContent from "@/components/seo/MarkdownContent";
import TrustSignals from "@/components/seo/TrustSignals";
import { BOOKING_FAQ_SLUG } from "@/lib/charging-faqs";
import { cmsGetSeoContent, cmsListSeoContent } from "@/lib/seo/cms-client";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import type { AisoContentBlock, FaqItem } from "@/lib/seo/types";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const LOCALE = "sw-KE";

function faqsFromBlocks(blocks: AisoContentBlock[]): FaqItem[] {
  const faqBlock = blocks.find((b) => b.type === "faq");
  if (!faqBlock?.items) return [];
  return faqBlock.items as FaqItem[];
}

export async function generateStaticParams() {
  const items = await cmsListSeoContent({ status: "published", locale: LOCALE });
  return items
    .filter((i) => i.contentType === "faq" && i.slug !== BOOKING_FAQ_SLUG)
    .map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug, LOCALE);
  if (!content) return {};
  const path = `/sw/faq/${slug}`;
  return createPageSeo({
    title: content.title,
    description: content.description,
    path,
    ogType: "article",
    breadcrumbs: [
      { name: "Nyumbani", href: "/sw" },
      { name: "Maswali", href: "/sw" },
      { name: content.title, href: path },
    ],
    faqs: faqsFromBlocks(content.aisoBlocks as AisoContentBlock[]),
  }).metadata;
}

export default async function SwahiliFaqPage({ params }: Props) {
  const { slug } = await params;
  if (slug === BOOKING_FAQ_SLUG) {
    notFound();
  }
  const content = await cmsGetSeoContent(slug, LOCALE);
  if (!content || content.contentType !== "faq") notFound();

  const path = `/sw/faq/${slug}`;
  const seo = createPageSeo({
    title: content.title,
    description: content.description,
    path,
    faqs: faqsFromBlocks(content.aisoBlocks as AisoContentBlock[]),
  });
  const faqs = faqsFromBlocks(content.aisoBlocks as AisoContentBlock[]);
  const jsonLd = faqs.length ? [...seo.jsonLd, faqSchema(faqs), articleSchema({ title: content.title, description: content.description, path })] : seo.jsonLd;

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="bg-white">
        <header className="border-b border-border section-pad">
          <div className="page-container max-w-3xl">
            <Breadcrumbs
              items={[
                { name: "Nyumbani", href: "/sw" },
                { name: "Maswali", href: "/sw" },
                { name: content.title, href: path },
              ]}
            />
            <h1 className="mt-3 text-3xl font-semibold text-forest-900">{content.title}</h1>
            <p className="mt-4 text-forest-600">{content.description}</p>
            <TrustSignals
              authorName={content.authorName}
              reviewerName={content.reviewerName}
              reviewedAt={content.reviewedAt}
              updatedAt={content.updatedAt}
              sources={content.sources}
            />
            <Link href="/faq" className="text-link mt-4 inline-block text-sm">
              English version
            </Link>
          </div>
        </header>
        {content.bodyMd && (
          <div className="section-pad">
            <div className="page-container max-w-3xl">
              <MarkdownContent md={content.bodyMd} />
            </div>
          </div>
        )}
        {(content.aisoBlocks as AisoContentBlock[]).length > 0 && (
          <AisoPageSections blocks={content.aisoBlocks as AisoContentBlock[]} relatedLinks={[]} />
        )}
      </article>
    </>
  );
}
