import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AisoPageSections from "@/components/seo/AisoPageSections";
import JsonLd from "@/components/seo/JsonLd";
import MarkdownContent from "@/components/seo/MarkdownContent";
import TrustSignals from "@/components/seo/TrustSignals";
import {
  cmsGetSeoContent,
  cmsGetSeoEntity,
  cmsListLocalContent,
  cmsListSeoEntities,
  type CmsSeoContent,
} from "@/lib/seo/cms-client";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, localBusinessSchema } from "@/lib/seo/schema";
import type { AisoContentBlock } from "@/lib/seo/types";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

function locationFromMetadata(entity: NonNullable<Awaited<ReturnType<typeof cmsGetSeoEntity>>>) {
  const meta = entity.metadata ?? {};
  return {
    county: String(meta.county ?? meta.region ?? "Kenya"),
    lat: typeof meta.lat === "number" ? meta.lat : undefined,
    lng: typeof meta.lng === "number" ? meta.lng : undefined,
  };
}

function buildSeo(slug: string, title: string, description: string) {
  const path = `/locations/${slug}`;
  return createPageSeo({
    title,
    description,
    path,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Locations", href: "/locations" },
      { name: title, href: path },
    ],
  });
}

export async function generateStaticParams() {
  const [locations, localPages] = await Promise.all([
    cmsListSeoEntities("location"),
    cmsListLocalContent(),
  ]);

  const slugs = new Set<string>();
  for (const loc of locations) {
    slugs.add(loc.slug);
    slugs.add(`ev-charging-${loc.slug}`);
  }
  for (const page of localPages) slugs.add(page.slug);

  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await cmsGetSeoContent(slug);
  if (content?.contentType === "local_page") {
    return buildSeo(slug, content.title, content.description).metadata;
  }

  const entity = await cmsGetSeoEntity(slug.replace(/^ev-charging-/, ""));
  if (!entity || entity.type !== "location") return {};

  const title = slug.startsWith("ev-charging-")
    ? `EV charging in ${entity.name}, Kenya`
    : `${entity.name} — Precifarm network`;
  return buildSeo(slug, title, entity.description).metadata;
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  let content: CmsSeoContent | null = await cmsGetSeoContent(slug);
  if (content && content.contentType !== "local_page") {
    content = null;
  }

  const entitySlug = slug.replace(/^ev-charging-/, "");
  const entity = await cmsGetSeoEntity(entitySlug);

  if (!content && (!entity || entity.type !== "location")) {
    notFound();
  }

  const title = content?.title ?? `${entity!.name} — Precifarm network`;
  const description = content?.description ?? entity!.description;
  const path = `/locations/${slug}`;
  const seo = buildSeo(slug, title, description);
  const geo = entity ? locationFromMetadata(entity) : { county: "Kenya" };

  const jsonLd = [
    ...seo.jsonLd,
    localBusinessSchema({
      name: title,
      description,
      path,
      addressLocality: entity?.name ?? title,
      addressRegion: geo.county,
    }),
  ];

  if (content) {
    jsonLd.push(
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
    );
  }

  const aisoBlocks = (content?.aisoBlocks ?? []) as AisoContentBlock[];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="bg-white">
        <PageHero
          eyebrow="Location"
          title={title}
          description={description}
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Locations", href: "/locations" },
            { name: title, href: path },
          ]}
        >
          <TrustSignals
            authorName={content?.authorName}
            reviewerName={content?.reviewerName}
            reviewedAt={content?.reviewedAt}
            updatedAt={content?.updatedAt}
            sources={content?.sources}
          />
        </PageHero>

        {content?.bodyMd && (
          <div className="section-pad">
            <div className="page-container max-w-3xl">
              <MarkdownContent md={content.bodyMd} />
            </div>
          </div>
        )}

        {!content?.bodyMd && entity && (
          <div className="section-pad">
            <div className="page-container max-w-3xl prose prose-forest">
              <p>{entity.description}</p>
              {entity.related && entity.related.length > 0 && (
                <>
                  <h2>Related</h2>
                  <ul>
                    {entity.related.map((rel) => (
                      <li key={rel.slug}>{rel.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        {aisoBlocks.length > 0 && (
          <AisoPageSections blocks={aisoBlocks} relatedLinks={internalLinksForPath(path)} />
        )}

        <PageCTA
          title="Plan your trip"
          description="Explore charging services or book a seat on Nairobi–Kisumu."
          primaryHref="/#book"
          primaryLabel="Book a trip"
          secondaryHref="/charging"
          secondaryLabel="Charging services"
        />
      </article>
    </>
  );
}
