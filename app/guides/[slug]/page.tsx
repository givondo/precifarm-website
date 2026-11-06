import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import FaqList from "@/components/faq/FaqList";
import { OffPeakFigure, PowerLadderFigure, SupplyChecksFigure, SwapFlowFigure } from "@/components/guides/GuideFigures";
import ArticleBody from "@/components/publications/ArticleBody";
import { ArticleByline, SourcesList } from "@/components/publications/ArticleMeta";
import ArticleToc from "@/components/publications/ArticleToc";
import RelatedLinks, { type RelatedLink } from "@/components/publications/RelatedLinks";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { BOOKING_GUIDE_SLUG } from "@/lib/charging-faqs";
import { guideExtras, type GuideFigureKey } from "@/lib/pages/guides";
import { parseMarkdownBlocks, readingMinutes, slugify, tocFromBlocks, type TocItem } from "@/lib/publications";
import { faqsFromCmsContent, getPublishedGuides, guideTypeLabel } from "@/lib/seo/cms-content";
import { cmsGetSeoContent, cmsListSeoContent, type CmsSeoContent } from "@/lib/seo/cms-client";
import { siteConfig } from "@/lib/seo/config";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, omitSchemaTypes } from "@/lib/seo/schema";
import { getStaticGuide, staticGuides } from "@/lib/seo/static-guides";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const figures: Record<GuideFigureKey, () => ReactNode> = {
  "off-peak": () => <OffPeakFigure />,
  "power-ladder": () => <PowerLadderFigure />,
  "supply-checks": () => <SupplyChecksFigure />,
  "swap-flow": () => <SwapFlowFigure />,
};

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
  const slugs = new Set(
    items
      .filter((item) => ["guide", "howto", "article"].includes(item.contentType))
      .filter((item) => item.slug !== BOOKING_GUIDE_SLUG)
      .map((item) => item.slug),
  );
  for (const guide of staticGuides) slugs.add(guide.slug);
  return [...slugs].map((slug) => ({ slug }));
}

/** The CMS guide for a slug, or the website's own guide when the CMS has none. */
async function getGuide(slug: string) {
  return (await cmsGetSeoContent(slug)) ?? getStaticGuide(slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getGuide(slug);
  if (!content) return {};
  return buildSeo(slug, content).metadata;
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  if (slug === BOOKING_GUIDE_SLUG) {
    notFound();
  }
  const content = await getGuide(slug);
  if (!content || !["guide", "howto", "article"].includes(content.contentType)) {
    notFound();
  }

  const path = `/guides/${slug}`;
  const seo = buildSeo(slug, content);
  const jsonLd = [
    ...omitSchemaTypes(seo.jsonLd, ["Article"]),
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

  const extras = guideExtras[slug];
  const blocks = content.bodyMd ? parseMarkdownBlocks(content.bodyMd) : [];
  const faqs = faqsFromCmsContent(content);
  const otherBlocks = content.aisoBlocks.filter((b) => b.type !== "faq" && b.content);
  const toc: TocItem[] = [
    ...tocFromBlocks(blocks),
    ...(faqs.length ? [{ id: "common-questions", label: "Common questions", level: 2 as const }] : []),
    ...(content.sources?.length ? [{ id: "sources", label: "Sources", level: 2 as const }] : []),
  ];
  const minutes = readingMinutes(content.bodyMd, ...faqs.map((f) => `${f.question} ${f.answer}`));
  const after = extras?.figure && blocks.some((b) => "id" in b && b.id === extras.figure!.after) ? { [extras.figure.after]: figures[extras.figure.key]() } : {};

  const others = (await getPublishedGuides()).filter((g) => g.slug !== slug);
  const related: RelatedLink[] = [
    ...(extras?.product ? [{ ...extras.product, kicker: "Precifarm" }] : []),
    ...others.slice(0, 3).map((g) => ({ href: `/guides/${g.slug}`, label: g.title, kicker: guideExtras[g.slug]?.topic ?? guideTypeLabel(g.contentType) })),
  ];
  const relatedLinks = related.length >= 2 ? related : [...related, ...internalLinksForPath(path)].slice(0, 4);
  const kicker = extras?.topic ?? guideTypeLabel(content.contentType);

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <header className="border-b border-border bg-[linear-gradient(180deg,#f6f7f8_0%,#ffffff_100%)]">
          <div className="interior-container py-8 sm:py-12 lg:py-14">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Guides", href: "/guides" },
                { name: content.title, href: path },
              ]}
            />
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">
                {guideTypeLabel(content.contentType)} · {kicker}
              </p>
              <h1 className="heading-display mt-4 text-[1.875rem] leading-[1.1] sm:text-4xl lg:text-[2.625rem]">{content.title}</h1>
              {content.description ? <p className="mt-5 text-[1.0625rem] leading-relaxed text-forest-600 sm:text-lg">{content.description}</p> : null}
              <div className="mt-8">
                <ArticleByline
                  authorName={content.authorName}
                  reviewerName={content.reviewerName}
                  reviewedAt={content.reviewedAt}
                  publishedAt={content.publishedAt}
                  updatedAt={content.updatedAt}
                  minutes={minutes}
                />
              </div>
            </div>
          </div>
        </header>

        <div className="interior-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[15rem_minmax(0,42rem)_1fr]">
          <aside className="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:self-start">
            <ArticleToc items={toc} variant="rail" />
          </aside>
          <div className="min-w-0">
            <ArticleToc items={toc} variant="inline" />
            <div className="mt-8 lg:mt-0">
              {blocks.length ? <ArticleBody blocks={blocks} after={after} /> : null}

              {otherBlocks.map((block) => (
                <section key={block.id} id={slugify(block.title)} className="mt-12 scroll-mt-28">
                  <h2 className="font-display text-[1.375rem] font-semibold tracking-tight text-forest-950">{block.title}</h2>
                  <p className="mt-4 text-[1.0625rem] leading-[1.75] text-forest-700">{block.content}</p>
                </section>
              ))}

              {faqs.length ? (
                <section id="common-questions" aria-labelledby="common-questions-title" className="mt-14 scroll-mt-28">
                  <h2 id="common-questions-title" className="font-display text-[1.375rem] font-semibold tracking-tight text-forest-950">
                    Common questions
                  </h2>
                  <div className="mt-5">
                    <FaqList items={faqs.map((f, i) => ({ id: `q-${slugify(f.question) || i + 1}`, question: f.question, answer: f.answer }))} />
                  </div>
                </section>
              ) : null}

              <div className="mt-14">
                <SourcesList sources={content.sources} />
              </div>

              <p className="mt-10 text-sm">
                <Link href="/guides" className="font-semibold text-charge-700 hover:underline">
                  ‹ All guides
                </Link>
              </p>
            </div>
          </div>
        </div>

        <RelatedLinks links={relatedLinks.slice(0, 4)} />
      </article>
    </>
  );
}
