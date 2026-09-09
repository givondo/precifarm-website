import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import SiteImage from "@/components/SiteImage";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  bodaHubDisclaimer,
  bodaHubPageContent,
  bodaHubPath,
  bodaHubStatusNote,
} from "@/lib/boda-hub-page";

export default function BodaHubView() {
  const p = bodaHubPageContent;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-container pt-6 sm:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Charging", href: "/charging" },
              { name: "Automated Boda Hub", href: bodaHubPath },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-eyebrow">{p.hero.eyebrow}</p>
            <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.1] sm:text-3xl lg:text-4xl">
              {p.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-forest-600">
              {p.hero.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={p.hero.primaryCta.href} className="btn-primary">
                {p.hero.primaryCta.label}
              </Link>
              <Link href={p.hero.secondaryCta.href} className="btn-secondary">
                {p.hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-4 text-sm text-forest-500">{bodaHubStatusNote}</p>
          </div>
        </div>
        <figure className="mt-8 sm:mt-10">
          <div className="page-container">
            <div className="visual-frame overflow-hidden">
              <SiteImage
                src={p.hero.image.src}
                alt={p.hero.image.alt}
                width={1920}
                height={1080}
                priority
                sizes="100vw"
                className="aspect-[16/9] w-full object-cover object-center"
              />
            </div>
            <figcaption className="mt-3 text-sm text-forest-500">{p.hero.image.caption}</figcaption>
          </div>
        </figure>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <p className="text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">
            {p.brandLine.headline}
          </p>
          <p className="mt-4 text-base leading-relaxed text-forest-600">{p.brandLine.body}</p>
          <p className="mt-6 text-base leading-relaxed text-forest-600">{p.lead}</p>
          <dl className="mt-10 space-y-6 border-t border-border pt-8">
            {p.highlights.map((item) => (
              <div key={item.label} className="sm:grid sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-xs font-semibold uppercase tracking-widest text-forest-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-forest-900 sm:mt-0">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={p.lockers.eyebrow}
            title={p.lockers.title}
            description={p.lockers.description}
          />
          <figure className="visual-frame mt-10">
            <SiteImage
              src={p.lockers.image.src}
              alt={p.lockers.image.alt}
              width={1920}
              height={1080}
              sizes="100vw"
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="mt-3 text-sm text-forest-500">{p.lockers.image.caption}</figcaption>
          </figure>
          <div className="mt-10 divide-y divide-border border-t border-border">
            {p.lockers.configs.map((config) => (
              <div
                key={config.name}
                className="grid gap-2 py-5 sm:grid-cols-[10rem_7rem_7rem_1fr] sm:items-baseline sm:gap-6"
              >
                <h3 className="font-semibold text-forest-900">{config.name}</h3>
                <p className="font-mono text-sm text-charge-700">{config.bays}</p>
                <p className="font-mono text-sm text-forest-500">{config.modules}</p>
                <p className="text-sm leading-relaxed text-forest-600">{config.for}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={p.module.eyebrow}
            title={p.module.title}
            description={p.module.description}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(260px,400px)_minmax(0,1fr)] lg:items-start">
            <figure className="visual-frame">
              <SiteImage
                src={p.module.image.src}
                alt={p.module.image.alt}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="mt-3 text-sm text-forest-500">{p.module.image.caption}</figcaption>
            </figure>
            <div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                {p.module.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-forest-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-forest-900">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-8 space-y-3 border-t border-border pt-8">
                {p.module.points.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-forest-600">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href={p.module.href} className="btn-secondary mt-8 inline-flex">
                {p.module.hrefLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,400px)] lg:items-start">
            <div>
              <SectionHeader
                eyebrow={p.build.eyebrow}
                title={p.build.title}
                description={p.build.description}
              />
              <ol className="mt-8 space-y-6">
                {p.build.anatomy.map((part, index) => (
                  <li key={part.name} className="flex gap-4">
                    <span className="font-mono text-xs font-semibold text-forest-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-semibold text-forest-900">{part.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-forest-600">{part.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="visual-frame">
              <SiteImage
                src={p.build.image.src}
                alt={p.build.image.alt}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="mt-3 text-sm text-forest-500">{p.build.image.caption}</figcaption>
            </figure>
          </div>

          <div className="mt-14 max-w-3xl border-t border-border pt-10">
            <SectionHeader
              eyebrow={p.networkSites.eyebrow}
              title={p.networkSites.title}
              description={p.networkSites.description}
            />
            <ul className="mt-6 space-y-2">
              {p.networkSites.points.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-forest-600">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow={p.journey.eyebrow}
            title={p.journey.title}
            description={p.journey.description}
          />
          <p className="mt-8 text-sm leading-relaxed text-forest-500">
            {p.journey.uiScreens.map((screen, index) => (
              <span key={screen.title}>
                {index > 0 ? <span className="mx-2 text-forest-300">→</span> : null}
                <span className="font-semibold text-forest-900">{screen.title}</span>
                <span className="text-forest-500"> · {screen.line}</span>
              </span>
            ))}
          </p>
          <ol className="mt-10 space-y-6 border-t border-border pt-8">
            {p.journey.steps.map((step, index) => (
              <li key={step.name} className="flex gap-4">
                <span className="font-mono text-xs font-semibold text-forest-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-forest-900">{step.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container grid max-w-5xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow={p.safety.eyebrow}
              title={p.safety.title}
              description={p.safety.description}
            />
            <ul className="mt-6 space-y-2">
              {p.safety.points.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-forest-600">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-10">
            <SectionHeader
              eyebrow={p.reliability.eyebrow}
              title={p.reliability.title}
              description={p.reliability.description}
            />
            <SectionHeader
              eyebrow={p.batteries.eyebrow}
              title={p.batteries.title}
              description={p.batteries.description}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow={p.system.eyebrow} title={p.system.title} />
          <dl className="mt-8 space-y-6 border-t border-border pt-8">
            {p.system.items.map((item) => (
              <div key={item.name} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-semibold text-forest-900">{item.name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-forest-600 sm:mt-0">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow={p.partners.eyebrow}
              title={p.partners.title}
              description={p.partners.description}
            />
            <p className="mt-6 text-sm leading-relaxed text-forest-600">
              {p.partners.sites.join(" · ")}
            </p>
          </div>
          <div>
            <SectionHeader eyebrow={p.roadmap.eyebrow} title={p.roadmap.title} />
            <ol className="mt-8 space-y-5">
              {p.roadmap.phases.map((phase) => (
                <li key={phase.name}>
                  <h3 className="font-semibold text-forest-900">{phase.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest-600">{phase.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 space-y-2 border-t border-border pt-6 text-sm leading-relaxed text-forest-500">
              <p>{p.note.economics}</p>
              <p>{p.note.regulatory}</p>
              <p>{bodaHubDisclaimer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-forest-900">Common questions</h2>
          <div className="mt-8">
            <FaqAccordion items={[...p.faqs]} />
          </div>
        </div>
      </section>

      <PageCTA
        title={p.cta.title}
        description={p.cta.description}
        primaryHref={p.cta.primary.href}
        primaryLabel={p.cta.primary.label}
        secondaryHref={p.cta.secondary.href}
        secondaryLabel={p.cta.secondary.label}
      />
    </>
  );
}
