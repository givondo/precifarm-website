import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import SiteImage from "@/components/SiteImage";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { modularEnergyPaths } from "@/lib/modular-energy-page";
import { megapackDisclaimer, megapackPageContent, megapackStatusNote } from "@/lib/megapack-page";

function HighlightCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-forest-900">{value}</p>
    </div>
  );
}

function ApplicationCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-semibold text-forest-900">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-forest-600">{text}</p>
    </div>
  );
}

function SystemStack({
  items,
}: {
  items: readonly { name: string; role: string }[];
}) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item.name} className="relative pl-8">
          {index < items.length - 1 ? (
            <span
              aria-hidden
              className="absolute left-[0.6875rem] top-8 h-[calc(100%+0.25rem)] w-px bg-charge-300"
            />
          ) : null}
          <span
            aria-hidden
            className="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charge-600 text-[10px] font-bold text-white"
          >
            {index + 1}
          </span>
          <div className="rounded-xl border border-border bg-white px-4 py-3 shadow-sm">
            <p className="font-semibold text-forest-900">{item.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-forest-600">{item.role}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ScaleLadder({
  stages,
}: {
  stages: readonly { name: string; detail: string; range: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className="rounded-2xl border border-forest-800/10 bg-white p-5 shadow-sm"
          style={{ marginTop: index > 0 ? undefined : 0 }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-semibold text-forest-900">{stage.name}</h3>
            <span className="font-mono text-xs font-semibold text-charge-700">{stage.range}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-forest-600">{stage.detail}</p>
        </div>
      ))}
    </div>
  );
}

function SizingProfile({
  title,
  mw,
  mwh,
  hours,
  example,
}: {
  title: string;
  mw: string;
  mwh: string;
  hours: string;
  example: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-forest-500">{title}</h3>
      <dl className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-forest-500">Power</dt>
          <dd className="mt-1 font-mono text-xl font-semibold text-forest-900">{mw}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-forest-500">Energy</dt>
          <dd className="mt-1 font-mono text-xl font-semibold text-forest-900">{mwh}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-forest-500">Duration</dt>
          <dd className="mt-1 font-mono text-sm font-semibold text-forest-900">{hours}</dd>
        </div>
      </dl>
      <p className="mt-5 text-sm leading-relaxed text-forest-600">{example}</p>
    </div>
  );
}

export default function MegaPackView() {
  const {
    hero,
    lead,
    highlights,
    plantImage,
    applications,
    system,
    scale,
    evHub,
    sizing,
    process,
    compliance,
    faqs,
    cta,
  } = megapackPageContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Modular energy", href: modularEnergyPaths.overview },
          { name: "MegaPack", href: modularEnergyPaths.megapack },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
          >
            {hero.primaryCta.label}
          </Link>
          <a
            href={hero.secondaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
        <p className="mt-4 text-sm text-forest-500">{megapackStatusNote}</p>
      </PageHero>

      <section className="border-b border-border bg-white pb-12 sm:pb-16">
        <div className="page-container">
          <figure className="overflow-hidden rounded-[1.75rem] border border-border bg-[#f5f5f7]">
            <SiteImage
              src={hero.image.src}
              alt={hero.image.alt}
              width={1600}
              height={900}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </figure>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
            <div>
              <p className="max-w-3xl text-base leading-relaxed text-forest-700">{lead}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <HighlightCard key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-border bg-[#f5f5f7] shadow-sm">
              <SiteImage
                src={plantImage.src}
                alt={plantImage.alt}
                width={880}
                height={495}
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="border-t border-border px-4 py-3 text-sm leading-relaxed text-forest-600">
                {plantImage.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={applications.eyebrow}
            title={applications.title}
            className="mb-10"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-charge-700">
                {applications.industrial.title}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {applications.industrial.items.map((item) => (
                  <ApplicationCard key={item.name} name={item.name} text={item.text} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-charge-700">
                {applications.utility.title}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {applications.utility.items.map((item) => (
                  <ApplicationCard key={item.name} name={item.name} text={item.text} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-forest-900 text-white">
        <div className="page-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={system.eyebrow}
              title={system.title}
              description={system.caption}
              inverted
              className="mb-8 max-w-none"
            />
            <SystemStack items={system.stack} />
          </div>
          <div>
            <SectionHeader
              eyebrow={scale.eyebrow}
              title={scale.title}
              inverted
              className="mb-8 max-w-none"
            />
            <ScaleLadder stages={scale.stages} />
            <p className="mt-4 text-sm text-white/60">{scale.caption}</p>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader eyebrow={evHub.eyebrow} title={evHub.title} className="mb-10" />
          <div className="grid gap-8 overflow-hidden rounded-[1.75rem] border border-border bg-muted/20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <figure className="overflow-hidden bg-[#f5f5f7]">
              <SiteImage
                src={evHub.image.src}
                alt={evHub.image.alt}
                width={1200}
                height={675}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full min-h-[16rem] w-full object-cover lg:min-h-full"
              />
            </figure>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-4">
                {evHub.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-mono text-2xl font-semibold text-forest-900">{stat.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-forest-500">{stat.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-forest-600">{evHub.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader eyebrow={sizing.eyebrow} title={sizing.title} className="mb-8" />
            <div className="space-y-4">
              {sizing.profiles.map((profile) => (
                <SizingProfile key={profile.title} {...profile} />
              ))}
            </div>
            <p className="mt-4 text-sm text-forest-500">{sizing.note}</p>
          </div>
          <div>
            <SectionHeader eyebrow={process.eyebrow} title={process.title} className="mb-8" />
            <ol className="space-y-3">
              {process.steps.map((item) => (
                <li
                  key={item.step}
                  className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <span className="font-mono text-sm font-semibold text-charge-600">{item.step}</span>
                  <div>
                    <h3 className="font-semibold text-forest-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={compliance.eyebrow}
            title={compliance.title}
            description={compliance.caption}
            className="mb-8"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-muted/20 p-5">
                <h3 className="font-semibold text-forest-900">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-forest-500">{megapackDisclaimer}</p>
        </div>
      </section>

      <section className="section-pad border-b border-border bg-charge-50/40">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions about MegaPack projects"
            className="mb-8"
          />
          <FaqAccordion items={[...faqs]} />
        </div>
      </section>

      <PageCTA
        title={cta.title}
        description={cta.description}
        primaryHref={cta.primaryHref}
        primaryLabel={cta.primaryLabel}
        secondaryHref={cta.secondaryHref}
        secondaryLabel={cta.secondaryLabel}
      />
    </>
  );
}
