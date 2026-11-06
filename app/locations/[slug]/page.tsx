import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorHero, InteriorSection, StageLabel } from "@/components/interior";
import RouteSchematic from "@/components/locations/RouteSchematic";
import ArticleBody from "@/components/publications/ArticleBody";
import { ArticleByline, SourcesList } from "@/components/publications/ArticleMeta";
import RelatedLinks from "@/components/publications/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import { cityServices, staticCityPage, staticCitySlugs } from "@/lib/locations-page";
import { parseMarkdownBlocks } from "@/lib/publications";
import { cmsGetSeoContent, cmsGetSeoEntity, cmsListLocalContent, cmsListSeoEntities, type CmsSeoContent } from "@/lib/seo/cms-client";
import { internalLinksForPath } from "@/lib/seo/entities/registry";
import { createPageSeo } from "@/lib/seo/metadata";
import { articleSchema, localBusinessSchema } from "@/lib/seo/schema";

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
  // `ev-charging-<city>` serves the same entity as `<city>`: consolidate onto the bare slug.
  const canonicalPath = `/locations/${slug.replace(/^ev-charging-/, "")}`;
  return createPageSeo({
    title,
    description,
    path,
    canonicalPath,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", href: "/" },
      { name: "Locations", href: "/locations" },
      { name: title, href: path },
    ],
  });
}

export async function generateStaticParams() {
  const [locations, localPages] = await Promise.all([cmsListSeoEntities("location"), cmsListLocalContent()]);
  const slugs = new Set<string>(staticCitySlugs());
  for (const loc of locations) {
    slugs.add(loc.slug);
    slugs.add(`ev-charging-${loc.slug}`);
  }
  for (const page of localPages) slugs.add(page.slug);
  return [...slugs].map((slug) => ({ slug }));
}

/** CMS content first; the website's own city page when the CMS has nothing (or is not configured). */
async function resolve(slug: string) {
  let content: CmsSeoContent | null = await cmsGetSeoContent(slug);
  if (content && content.contentType !== "local_page") content = null;
  const entitySlug = slug.replace(/^ev-charging-/, "");
  const entity = await cmsGetSeoEntity(entitySlug);
  const cmsOk = !!content || (!!entity && entity.type === "location");
  const fallback = cmsOk ? null : staticCityPage(entitySlug);
  return { content, entity: entity?.type === "location" ? entity : null, fallback, entitySlug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { content, entity, fallback } = await resolve(slug);
  if (content) return buildSeo(slug, content.title, content.description).metadata;
  if (entity) {
    const title = slug.startsWith("ev-charging-") ? `EV charging in ${entity.name}, Kenya` : `${entity.name}: Precifarm Charging Hub`;
    return buildSeo(slug, title, entity.description).metadata;
  }
  if (fallback) return buildSeo(slug, fallback.title, fallback.description).metadata;
  return {};
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const { content, entity, fallback, entitySlug } = await resolve(slug);
  if (!content && !entity && !fallback) notFound();

  const path = `/locations/${slug}`;
  const breadcrumbsFor = (title: string) => [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations" },
    { name: title, href: path },
  ];

  if (fallback) {
    const seo = buildSeo(slug, fallback.title, fallback.description);
    return (
      <>
        <JsonLd data={seo.jsonLd} />
        <InteriorHero
          eyebrow={`Locations · ${fallback.county}`}
          title={fallback.title}
          lead={fallback.lead}
          breadcrumbs={breadcrumbsFor(fallback.name)}
          actions={[
            { href: "/charging/home", label: "Request a home survey" },
            { href: "/hub", label: "Open Charging Hub", variant: "secondary" },
          ]}
          media={<RouteSchematic highlight={fallback.slug} />}
        />
        <InteriorSection id="services" eyebrow={`In ${fallback.name}`} title="What you can order, and what is planned.">
          <ul className="divide-y divide-border border-y border-border">
            {fallback.services.map((s) => (
              <li key={s.name}>
                <Link href={s.href} className="group grid gap-2 py-5 sm:grid-cols-[16rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8">
                  <span className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-lg font-semibold tracking-tight text-forest-950 group-hover:text-charge-700">{s.name}</span>
                  </span>
                  <span className="text-[15px] leading-relaxed text-forest-700">{s.text}</span>
                  <StageLabel kind={s.stage} className="w-fit" />
                </Link>
              </li>
            ))}
          </ul>
          {fallback.routeNote ? <p className="mt-6 max-w-3xl text-sm leading-relaxed text-forest-600">{fallback.routeNote}</p> : null}
        </InteriorSection>
        {fallback.plannedSites.length ? (
          <InteriorSection id="planned" tone="silver" eyebrow="On the Charging Hub map" title={`Planned Precifarm sites in and around ${fallback.name}.`} lead="These are planning locations. None is open, and none takes sessions yet.">
            <ul className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-3">
              {fallback.plannedSites.map((site) => (
                <li key={site.id} className="flex flex-col gap-3 bg-white p-5">
                  <StageLabel kind="planned" className="w-fit" />
                  <p className="font-semibold text-forest-950">{site.name}</p>
                  <p className="text-sm text-forest-600">{site.kind}</p>
                </li>
              ))}
            </ul>
          </InteriorSection>
        ) : null}
        <RelatedLinks
          title="Next"
          links={[
            { href: "/locations", label: "All locations", reason: "Six cities, with status for each" },
            { href: "/guides/ev-charging-stations-kenya", label: "Where to charge in Kenya", reason: "Public charging, plugs and prices" },
            { href: "/guides/charge-electric-car-at-home-kenya", label: "Charging at home", reason: "What your supply needs" },
            { href: "/contact?interest=survey", label: "Book a survey", reason: "We reply within one business day" },
          ]}
        />
      </>
    );
  }

  const title = content?.title ?? `${entity!.name}: Precifarm Charging Hub`;
  const description = content?.description ?? entity!.description;
  const seo = buildSeo(slug, title, description);
  const geo = entity ? locationFromMetadata(entity) : { county: "Kenya" };
  const jsonLd = [
    ...seo.jsonLd,
    localBusinessSchema({ name: title, description, path, addressLocality: entity?.name ?? title, addressRegion: geo.county }),
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
  const services = cityServices(entitySlug);

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <InteriorHero eyebrow="Location" title={title} lead={description} breadcrumbs={breadcrumbsFor(title)}>
          {content ? (
            <ArticleByline authorName={content.authorName} reviewerName={content.reviewerName} reviewedAt={content.reviewedAt} publishedAt={content.publishedAt} updatedAt={content.updatedAt} />
          ) : null}
        </InteriorHero>
        <div className="interior-container max-w-3xl py-12 sm:py-16">
          {content?.bodyMd ? (
            <ArticleBody blocks={parseMarkdownBlocks(content.bodyMd)} />
          ) : entity ? (
            <p className="text-[1.0625rem] leading-[1.75] text-forest-700">{entity.description}</p>
          ) : null}
          {services.length ? (
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {services.map((s) => (
                <li key={s.name} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <Link href={s.href} className="font-semibold text-forest-950 hover:text-charge-700">
                    {s.name}
                  </Link>
                  <StageLabel kind={s.stage} />
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-12">
            <SourcesList sources={content?.sources} />
          </div>
        </div>
        <RelatedLinks title="Related" links={internalLinksForPath(path).slice(0, 4)} />
      </article>
    </>
  );
}
