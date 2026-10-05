import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ProductShowcaseRow from "@/components/ProductShowcaseRow";
import {
  TrainingCurriculumTable,
  TrainingDeliveryTable,
  TrainingProgressionTable,
  TrainingTableSection,
  TrainingTierDetailTable,
  TrainingTierOverviewTable,
  TrainingTrackMatrixTable,
  TrainingTracksDetailTable,
} from "@/components/training/TrainingTables";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteImage from "@/components/SiteImage";
import { contact } from "@/lib/contact";
import { trainingEnquiryMailto, trainingHeroImage, trainingNavLabel, trainingTiers } from "@/lib/training";
import { trainingPage, trainingPageFaqs } from "@/lib/training-page";

export default function TrainingView() {
  const {
    hero,
    stats,
    who,
    explore,
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

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Charging", href: "/charging" },
              { name: trainingNavLabel, href: "/training" },
            ]}
          />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,480px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.1] sm:text-3xl lg:text-4xl">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">
                {hero.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={trainingEnquiryMailto()} className="btn-primary">
                  {hero.primaryLabel}
                </a>
                <Link href={hero.secondaryHref} className="btn-secondary">
                  {hero.secondaryLabel}
                </Link>
              </div>
              <p className="mt-4 text-sm text-forest-500">{hero.meta}</p>
            </div>
            <figure className="visual-frame overflow-hidden">
              <SiteImage
                src={trainingHeroImage.src}
                alt={trainingHeroImage.alt}
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="border-t border-border bg-muted/30 px-5 py-3 text-sm leading-relaxed text-forest-600">
                {trainingHeroImage.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="stats-band border-b border-border">
        <div className="stats-band-inner">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.stat} className="bg-white px-5 py-5 text-center sm:px-6 sm:py-6">
                <p className="font-mono text-xl font-bold text-forest-900 sm:text-2xl">{item.stat}</p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow={who.eyebrow} title={who.title} description={who.description} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {who.audience.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm font-medium text-forest-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-forest-900 py-6 text-white">
        <div className="page-container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <span className="font-semibold text-white/70">Jump to</span>
          {explore.map((item) => (
            <a key={item.href} href={item.href} className="font-medium hover:text-charge-300">
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={why.eyebrow} title={why.title} />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {why.cards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-forest-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad" id="tiers">
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
                className={`rounded-2xl border border-border border-l-4 bg-white p-6 shadow-sm ${tiers.accent[tier.id]}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-sm font-semibold text-charge-600">
                    <a href={`#${tier.id}`} className="hover:text-charge-500">
                      {tier.code}
                    </a>
                  </p>
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
                </dl>
                <ul className="mt-5 space-y-1.5 text-sm text-forest-600">
                  {tier.modules.slice(0, 3).map((module) => (
                    <li key={module}>• {module}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-forest-500">
                  <a href={`#${tier.id}`} className="font-semibold text-forest-800 hover:text-charge-700">
                    Full modules & outcomes ↓
                  </a>
                </p>
              </article>
            ))}
          </div>

          <TrainingTableSection eyebrow={comparison.eyebrow} title={comparison.title}>
            <TrainingTierOverviewTable />
            <p className="training-table-hint mt-3">{comparison.caption}</p>
          </TrainingTableSection>

          <TrainingTableSection eyebrow="Specification" title="Compare T1, T2 and T3 side by side">
            <TrainingTierDetailTable />
          </TrainingTableSection>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <TrainingTableSection
            eyebrow={curriculum.eyebrow}
            title={curriculum.title}
            description={curriculum.description}
          >
            <TrainingCurriculumTable />
          </TrainingTableSection>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad" id="tracks">
        <div className="page-container space-y-14">
          <SectionHeader
            eyebrow={tracks.eyebrow}
            title={tracks.title}
            description={tracks.description}
          />
          <ProductShowcaseRow
            products={tracks.products.map((item) => ({
              src: item.src,
              alt: item.alt,
              label: item.label,
            }))}
          />
          <TrainingTableSection title="Which tier for which product?">
            <TrainingTrackMatrixTable />
          </TrainingTableSection>
          <TrainingTableSection title="Track detail — roles and topics">
            <TrainingTracksDetailTable />
          </TrainingTableSection>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container grid gap-14 lg:grid-cols-2">
          <TrainingTableSection eyebrow={progression.eyebrow} title={progression.title}>
            <TrainingProgressionTable />
          </TrainingTableSection>
          <TrainingTableSection eyebrow={delivery.eyebrow} title={delivery.title}>
            <TrainingDeliveryTable />
          </TrainingTableSection>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow={faqs.eyebrow} title={faqs.title} description={faqs.description} />
          <div className="mt-8">
            <FaqAccordion items={[...trainingPageFaqs]} />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20" id="enrol">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeader eyebrow={enrol.eyebrow} title={enrol.title} description={enrol.description} />
              <ul className="mt-6 space-y-2.5">
                {enrol.checklist.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
              <p className="mt-6 text-sm text-forest-600">
                Related:{" "}
                <Link href="/evs" className="text-link font-medium">
                  Kenya EV guide
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
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
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
                <a href={trainingEnquiryMailto()} className="btn-primary">
                  Send enquiry
                </a>
                <a href={contact.phoneHref} className="btn-secondary">
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
