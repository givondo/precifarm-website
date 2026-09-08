import Link from "next/link";
import ProductPhoto from "@/components/ProductPhoto";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import StakeholderIcon from "@/components/sustainability/StakeholderIcon";
import SustainabilitySectionNav from "@/components/sustainability/SustainabilitySectionNav";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  circularitySteps,
  reportingPlanned,
  reportingPublished,
  socialImpactCards,
  sustainabilityGoalsOrdered,
  sustainabilityHeroMetrics,
  sustainabilityPage,
  whyItMattersCards,
} from "@/lib/sustainability-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Sustainability", href: "/sustainability" },
];

const allGoals = sustainabilityGoalsOrdered;

export default function SustainabilityView() {
  const page = sustainabilityPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,420px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.15] sm:text-3xl lg:text-4xl">
                {page.hero.headline}
              </h1>
              <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-forest-900 sm:text-lg">
                {page.hero.lead}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600">{page.hero.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={page.hero.primaryCta.href} className="btn-primary">
                  {page.hero.primaryCta.label}
                </Link>
                <a href={page.hero.secondaryCta.href} className="btn-secondary">
                  {page.hero.secondaryCta.label}
                </a>
              </div>
            </div>
            <figure className="visual-frame-muted">
              <ProductPhoto
                src={page.hero.image.src}
                alt={page.hero.image.alt}
                width={1600}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/3] w-full object-contain p-4 sm:p-6"
              />
              <figcaption className="border-t border-border bg-white/80 px-4 py-3 text-sm leading-snug text-forest-600">
                {page.hero.imageCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-forest-900 bg-forest-900 section-pad" aria-label="What you can check today">
        <div className="page-container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/60">
            What you can check today
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {sustainabilityHeroMetrics.map((metric) => (
              <article key={metric.label} className="text-center sm:text-left">
                <p className="font-mono text-lg font-bold tracking-tight text-white sm:text-xl">{metric.value}</p>
                <p className="mt-2 text-sm font-medium text-white">{metric.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SustainabilitySectionNav />

      <section id="impact" className="section-pad scroll-mt-28 border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.whySection.eyebrow}
            title={page.whySection.title}
            description={page.whySection.description}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyItMattersCards.map((card) => (
              <article key={card.id} className="sustainability-stakeholder-card">
                <div className="flex items-start gap-3">
                  <StakeholderIcon id={card.icon} />
                  <div>
                    <h3 className="font-semibold text-forest-900">{card.headline}</h3>
                    <p className="mt-1 text-xs text-forest-500">{card.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-forest-600">{card.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="social" className="section-pad scroll-mt-28 border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.socialSection.eyebrow}
            title={page.socialSection.title}
            description={page.socialSection.description}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {socialImpactCards.map((card) => (
              <article key={card.id} className="sustainability-social-card">
                <div className="flex items-start gap-3">
                  <StakeholderIcon id={card.icon} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-forest-900">{card.headline}</h3>
                    <p className="mt-1 text-xs text-forest-500">{card.title}</p>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-600">{card.text}</p>
                {"href" in card && card.href ? (
                  <Link
                    href={card.href}
                    className="mt-4 inline-flex text-sm font-medium text-forest-900 underline-offset-2 hover:underline"
                  >
                    {card.label} ›
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="commitment" className="section-pad scroll-mt-28 border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.commitmentSection.eyebrow}
            title={page.commitmentSection.title}
            description={page.commitmentSection.description}
          />

          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allGoals.map((goal) => (
              <li key={goal.id} className="rounded-xl border border-border bg-white px-5 py-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Goal {goal.id}
                </span>
                <p className="mt-1 font-semibold text-forest-900">{goal.shortName}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="circularity" className="section-pad scroll-mt-28 border-b border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.circularitySection.eyebrow}
            title={page.circularitySection.title}
            description={page.circularitySection.description}
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {circularitySteps.map((step) => (
              <li key={step.step} className="card p-5">
                <span className="font-mono text-xs font-semibold text-forest-500">{step.step}</span>
                <h3 className="mt-2 font-semibold text-forest-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="outlook" className="section-pad scroll-mt-28 border-b border-border bg-white">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.outlookSection.eyebrow}
            title={page.outlookSection.title}
            description={page.outlookSection.description}
          />

          <div className="mt-8 rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
            <p className="font-mono text-2xl font-bold tracking-tight text-forest-900 sm:text-3xl">
              {page.outlookSection.ambition.value}
            </p>
            <h3 className="mt-2 text-base font-semibold text-forest-900">{page.outlookSection.ambition.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-forest-600">
              {page.outlookSection.ambition.text}
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <table className="sustainability-goals-table">
              <caption className="sr-only">
                What is on the site today and what is planned by 2030
              </caption>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Status</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                {reportingPublished.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">
                      <Link href={item.href} className="hover:underline">
                        {item.title}
                      </Link>
                    </th>
                    <td data-label="Status">On the site today</td>
                    <td data-label="Detail">{item.detail}</td>
                  </tr>
                ))}
                {reportingPlanned.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.title}</th>
                    <td data-label="Status">Planned by 2030</td>
                    <td data-label="Detail">{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-forest-600">{page.outlookSection.sdgNote}</p>
        </div>
      </section>

      <PageCTA
        title={page.cta.title}
        description={page.cta.description}
        primaryHref={page.cta.primaryHref}
        primaryLabel={page.cta.primaryLabel}
        secondaryHref={page.cta.secondaryHref}
        secondaryLabel={page.cta.secondaryLabel}
      />
    </>
  );
}
