import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqList from "@/components/faq/FaqList";
import { InteriorHero } from "@/components/interior";
import ArticleBody from "@/components/publications/ArticleBody";
import { ArticleByline, SourcesList } from "@/components/publications/ArticleMeta";
import RelatedLinks from "@/components/publications/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { BOOKING_FAQ_SLUG } from "@/lib/charging-faqs";
import { parseMarkdownBlocks, readingMinutes, slugify } from "@/lib/publications";
import { faqsFromCmsContent } from "@/lib/seo/cms-content";
import { cmsGetSeoContent, cmsListSeoContent, type CmsSeoContent } from "@/lib/seo/cms-client";
import { siteConfig } from "@/lib/seo/config";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, faqSchema, omitSchemaTypes } from "@/lib/seo/schema";

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
  return items
    .filter((item) => item.contentType === "faq" && item.slug !== BOOKING_FAQ_SLUG)
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug);
  if (!content) return {};
  return buildSeo(slug, content).metadata;
}

export default async function FaqPage({ params }: Props) {
  const { slug } = await params;
  if (slug === BOOKING_FAQ_SLUG) {
    notFound();
  }
  const content = await cmsGetSeoContent(slug);
  if (!content || content.contentType !== "faq") {
    notFound();
  }

  const path = `/faq/${slug}`;
  const seo = buildSeo(slug, content);
  const faqs = faqsFromCmsContent(content);
  const jsonLd = faqs.length
    ? [
        ...omitSchemaTypes(seo.jsonLd, ["FAQPage", "Article"]),
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
  const supplementalBlocks = content.aisoBlocks.filter((block) => block.type !== "faq" && (block.content || block.items?.length));
  const blocks = content.bodyMd ? parseMarkdownBlocks(content.bodyMd) : [];
  const minutes = readingMinutes(content.bodyMd, ...faqs.map((f) => `${f.question} ${f.answer}`));

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <InteriorHero
          eyebrow="FAQ"
          title={content.title}
          lead={content.description}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "FAQ", href: "/faq" },
            { name: content.title, href: path },
          ]}
        >
          <ArticleByline
            authorName={content.authorName}
            reviewerName={content.reviewerName}
            reviewedAt={content.reviewedAt}
            publishedAt={content.publishedAt}
            updatedAt={content.updatedAt}
            minutes={minutes}
          />
        </InteriorHero>

        <div className="interior-container max-w-3xl py-12 sm:py-16">
          {faqs.length > 0 ? (
            <FaqList items={faqs.map((f, i) => ({ id: slugify(f.question) || `q-${i + 1}`, question: f.question, answer: f.answer }))} />
          ) : null}

          {blocks.length ? (
            <div className={faqs.length ? "mt-14" : ""}>
              <ArticleBody blocks={blocks} />
            </div>
          ) : null}

          {supplementalBlocks.map((block) => (
            <section key={block.id} className="mt-12">
              <h2 className="font-display text-xl font-semibold tracking-tight text-forest-950">{block.title}</h2>
              {block.content ? <p className="mt-3 text-[15px] leading-relaxed text-forest-700">{block.content}</p> : null}
              {Array.isArray(block.items) && block.items.every((i) => typeof i === "string") ? (
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-forest-700">
                  {(block.items as string[]).map((item) => (
                    <li key={item} className="relative pl-5">
                      <span aria-hidden className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-charge-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mt-14">
            <SourcesList sources={content.sources} />
          </div>

          <p className="mt-10 text-sm">
            <Link href="/faq" className="font-semibold text-charge-700 hover:underline">
              ‹ All questions
            </Link>
          </p>
        </div>

        <RelatedLinks title="Related" links={internalLinksForPath(path).slice(0, 4)} />
      </article>
    </>
  );
}
