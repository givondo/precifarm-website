import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/interior";
import JsonLd from "@/components/seo/JsonLd";
import { guidesPage } from "@/lib/company-pages";
import { guideExtras, guidesIndexCopy } from "@/lib/pages/guides";
import { formatLongDate, readingMinutes } from "@/lib/publications";
import { absoluteUrl } from "@/lib/seo/config";
import { excerptFromMarkdown, getPublishedGuides, guideTypeLabel } from "@/lib/seo/cms-content";
import type { CmsSeoContent } from "@/lib/seo/cms-client";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata("/guides");

function meta(item: CmsSeoContent) {
  return {
    kicker: guideExtras[item.slug]?.topic ?? guideTypeLabel(item.contentType),
    minutes: readingMinutes(item.bodyMd),
    date: formatLongDate(item.updatedAt ?? item.publishedAt),
    summary: item.description || excerptFromMarkdown(item.bodyMd),
  };
}

export default async function GuidesIndexPage() {
  const guides = await getPublishedGuides();
  const [lead, ...rest] = guides;

  const listItems = guides.map((item) => ({ name: item.title, url: absoluteUrl(`/guides/${item.slug}`) }));
  const jsonLd = [
    ...pageJsonLd("/guides"),
    ...(listItems.length > 0
      ? [
          itemListSchema({
            name: "Precifarm Guides",
            description: "How-to guides for home charging, public DC and Precifarm Agent.",
            path: "/guides",
            items: listItems,
          }),
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <InteriorHero
        eyebrow={guidesPage.eyebrow}
        title={guidesPage.title}
        lead={guidesPage.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ]}
      >
        <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
          {guidesIndexCopy.standards.map((s) => (
            <div key={s.title}>
              <dt className="text-sm font-semibold text-forest-950">{s.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-forest-600">{s.text}</dd>
            </div>
          ))}
        </dl>
      </InteriorHero>

      <section aria-labelledby="guides-list-title" className="bg-white">
        <div className="interior-container py-12 sm:py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="guides-list-title" className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
              {guides.length ? `${guides.length} ${guides.length === 1 ? "guide" : "guides"}` : "Guides"}
            </h2>
            <Link href="/faq" className="text-sm font-semibold text-charge-700 hover:underline">
              Short answers in the FAQ ›
            </Link>
          </div>

          {!lead ? (
            <p className="mt-6 rounded-2xl border border-dashed border-forest-200 px-5 py-8 text-center text-sm text-forest-600">
              Guides will appear here once published.
            </p>
          ) : (
            <>
              <Link
                href={`/guides/${lead.slug}`}
                className="group mt-5 grid gap-6 overflow-hidden rounded-[1.75rem] bg-forest-950 p-6 text-white transition-colors hover:bg-forest-900 sm:p-9 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12 lg:p-12"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">
                    Latest · {meta(lead).kicker}
                  </p>
                  <h3 className="heading-display heading-inverted mt-4 text-2xl leading-tight sm:text-[2rem]">{lead.title}</h3>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <p className="text-[15px] leading-relaxed text-white/75">{meta(lead).summary}</p>
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
                    <span>{meta(lead).minutes} min read</span>
                    {meta(lead).date ? <span>{meta(lead).date}</span> : null}
                    <span className="ml-auto text-sm font-semibold text-white group-hover:text-brand-300">Read the guide ›</span>
                  </p>
                </div>
              </Link>

              {rest.length ? (
                <ol className="mt-8 divide-y divide-border border-y border-border">
                  {rest.map((item, i) => {
                    const m = meta(item);
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/guides/${item.slug}`}
                          className="group grid gap-2 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_10rem] sm:gap-6 lg:grid-cols-[3rem_minmax(0,1.2fr)_minmax(0,1fr)_10rem]"
                        >
                          <span className="font-mono text-xs text-forest-400 sm:pt-1">{String(i + 2).padStart(2, "0")}</span>
                          <span className="min-w-0">
                            <span className="block text-[11px] font-semibold uppercase tracking-widest text-charge-600">{m.kicker}</span>
                            <span className="mt-1.5 block font-display text-lg font-semibold leading-snug tracking-tight text-forest-950 group-hover:text-charge-700">
                              {item.title}
                            </span>
                          </span>
                          <span className="hidden text-sm leading-relaxed text-forest-600 lg:block">{m.summary}</span>
                          <span className="text-xs text-forest-500 sm:pt-1 sm:text-right">
                            {m.minutes} min read
                            {m.date ? <span className="block">{m.date}</span> : null}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </>
          )}

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-forest-600">{guidesIndexCopy.intro}</p>
        </div>
      </section>
    </>
  );
}
