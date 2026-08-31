import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import FaqAccordion from "@/components/seo/FaqAccordion";
import ProductShowcaseRow from "@/components/ProductShowcaseRow";
import SpecTable from "@/components/modular-energy/SpecTable";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteImage from "@/components/SiteImage";
import { contact } from "@/lib/contact";
import { absoluteUrl } from "@/lib/seo/config";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";
import { trainingEnquiryMailto, trainingHeroImage, trainingTiers } from "@/lib/training";
import {
  trainingComparisonRows,
  trainingCurriculumRows,
  trainingDeliveryRows,
  trainingPage,
  trainingPageFaqs,
  trainingProgressionRows,
  trainingTrackMatrixRows,
} from "@/lib/training-page";

export const metadata: Metadata = pageMetadata("/training");

export default function TrainingPage() {
  const {
    hero,
    stats,
    why,
    tiers,
    comparison,
    curriculum,
    tracks,
    progression,
    delivery,
    enrol,
    faqs,
    cta,
  } = trainingPage;

  const jsonLd = [
    ...pageJsonLd("/training"),
    itemListSchema({
      name: "Precifarm EV charging training programmes",
      description: "T1, T2 and T3 certification for EV charging hub staff and field engineers in Kenya.",
      path: "/training",
      items: trainingTiers.map((tier) => ({
        name: `${tier.code} — ${tier.title}`,
        url: absoluteUrl(`/training#${tier.id}`),
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: "Training", href: "/training" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={trainingEnquiryMailto()}
            className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            {hero.primaryLabel}
          </a>
          <Link
            href={hero.secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            {hero.secondaryLabel}
          </Link>
        </div>
        <p className="mt-4 text-sm text-forest-500">{hero.meta}</p>
      </PageHero>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.stat} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="font-mono text-2xl font-semibold text-charge-600">{item.stat}</p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeader eyebrow={why.eyebrow} title={why.title} />
            <div className="mt-8 space-y-5">
              {why.cards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border bg-muted/20 p-6">
                  <h3 className="font-semibold text-forest-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
            <div className="relative aspect-[4/3] w-full">
              <SiteImage
                src={trainingHeroImage.src}
                alt={trainingHeroImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-border px-5 py-3 text-sm leading-relaxed text-forest-600">
              {trainingHeroImage.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad" id="tiers">
        <div className="page-container space-y-14">
          <SectionHeader
            eyebrow={tiers.eyebrow}
            title={tiers.title}
            description={tiers.description}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {trainingTiers.map((tier) => (
              <article
                key={tier.id}
                id={tier.id}
                className={`rounded-2xl border border-border border-l-4 bg-white p-6 shadow-sm ${tiers.accent[tier.id]}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-sm font-semibold text-charge-600">{tier.code}</p>
                  <span className="text-xs font-medium uppercase tracking-wide text-forest-500">
                    {tier.subtitle}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-forest-900">{tier.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-600">{tier.summary}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-forest-900">Duration</dt>
                    <dd className="text-forest-600">{tier.duration}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-forest-900">Format</dt>
                    <dd className="text-forest-600">{tier.format}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-forest-900">Assessment</dt>
                    <dd className="text-forest-600">{tier.assessment}</dd>
                  </div>
                </dl>
                <p className="mt-5 rounded-xl bg-white/80 p-4 text-sm leading-relaxed text-forest-700 ring-1 ring-border">
                  {tier.canDoAfter}
                </p>
              </article>
            ))}
          </div>
          <div>
            <SectionHeader eyebrow={comparison.eyebrow} title={comparison.title} />
            <div className="mt-8">
              <SpecTable
                caption={comparison.caption}
                columns={comparison.columns}
                rows={trainingComparisonRows()}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={curriculum.eyebrow}
            title={curriculum.title}
            description={curriculum.description}
          />
          <div className="mt-8">
            <SpecTable columns={curriculum.columns} rows={trainingCurriculumRows()} />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad" id="tracks">
        <div className="page-container space-y-14">
          <div>
            <SectionHeader
              eyebrow={tracks.eyebrow}
              title={tracks.title}
              description={tracks.description}
            />
            <div className="mt-8">
              <ProductShowcaseRow
                products={tracks.products.map((item) => ({
                  src: item.src,
                  alt: item.alt,
                  label: item.label,
                }))}
              />
            </div>
            <div className="mt-10">
              <SpecTable columns={tracks.matrixColumns} rows={trainingTrackMatrixRows()} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {tracks.trackCards.map((track) => (
              <div key={track.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-forest-900">{track.title}</h3>
                  {track.tiers.map((code) => (
                    <span
                      key={code}
                      className="rounded-full bg-charge-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-charge-700"
                    >
                      {code}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-forest-600">{track.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-forest-500">
                  Typical roles
                </p>
                <p className="mt-1 text-sm text-forest-700">{track.roles}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-forest-600">
                  {track.topics.map((topic) => (
                    <li key={topic}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={progression.eyebrow} title={progression.title} />
            <div className="mt-8">
              <SpecTable columns={progression.columns} rows={trainingProgressionRows()} />
            </div>
          </div>
          <div>
            <SectionHeader eyebrow={delivery.eyebrow} title={delivery.title} />
            <div className="mt-8">
              <SpecTable columns={delivery.columns} rows={trainingDeliveryRows()} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow={faqs.eyebrow}
            title={faqs.title}
            description={faqs.description}
          />
          <div className="mt-8">
            <FaqAccordion items={[...trainingPageFaqs]} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeader
                eyebrow={enrol.eyebrow}
                title={enrol.title}
                description={enrol.description}
              />
              <ul className="mt-6 space-y-2.5">
                {enrol.checklist.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
              <p className="mt-6 text-sm text-forest-600">
                Related:{" "}
                <Link href="/charging" className="text-link font-medium">
                  charging
                </Link>
                ,{" "}
                <Link href="/charging/engineering" className="text-link font-medium">
                  engineering
                </Link>
                ,{" "}
                <Link href="/partners" className="text-link font-medium">
                  partners
                </Link>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-charge-50/40 p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-500">
                {enrol.panelTitle}
              </p>
              <a
                href={trainingEnquiryMailto()}
                className="text-link mt-3 block break-all text-xl font-semibold text-forest-900 sm:text-2xl"
              >
                {contact.trainingEmail}
              </a>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={trainingEnquiryMailto()} className="btn-primary rounded-full px-6 py-3 text-sm">
                  Send enquiry
                </a>
                <a href={contact.phoneHref} className="btn-secondary rounded-full px-6 py-3 text-sm">
                  Call {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        title={cta.title}
        description={cta.description}
        primaryHref={trainingEnquiryMailto()}
        primaryLabel={cta.primaryLabel}
        secondaryHref={cta.secondaryHref}
        secondaryLabel={cta.secondaryLabel}
      />
    </>
  );
}
