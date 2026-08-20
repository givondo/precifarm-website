import type { Metadata } from "next";
import ConnectivityMapSection from "@/components/hub-map/ConnectivityMapSection";
import SiteImage from "@/components/SiteImage";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { chargingHub, chargingHubPage, chargingHubPhaseStyles } from "@/lib/charging-hub";
import { chargingOfferings } from "@/lib/charging";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/network");

const layerIcons = [
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </>,
  <path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z" />,
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>,
  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
];

export default function HubGridPage() {
  const { hero, anatomy, rollout, siteSelection, cta } = chargingHubPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/network")} />
      <PageHero eyebrow={chargingHub.name} title={hero.title} description={hero.description} />

      <ConnectivityMapSection />

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={anatomy.eyebrow}
            title={anatomy.title}
            description={anatomy.description}
          />
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
            <div className="relative space-y-3">
              <div
                className="pointer-events-none absolute bottom-6 left-[1.375rem] top-6 hidden w-px bg-gradient-to-b from-forest-500/40 via-forest-500/20 to-forest-500/40 sm:block"
                aria-hidden
              />
              {anatomy.layers.map((layer, index) => (
                <article
                  key={layer.title}
                  className="group relative flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-forest-500/35 hover:shadow-md sm:gap-5 sm:p-5"
                >
                  <div className="relative z-10 flex shrink-0 flex-col items-center gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-700 ring-4 ring-muted transition-colors group-hover:bg-forest-600">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="var(--color-forest-100)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {layerIcons[index]}
                      </svg>
                    </span>
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-forest-600">
                      {layer.step}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 border-l border-forest-500/15 pl-4 sm:pl-5">
                    <h3 className="text-base font-semibold text-forest-900 sm:text-lg">{layer.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest-600/80">{layer.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="lg:sticky lg:top-8">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl">
                <SiteImage
                  src={chargingOfferings.hubAnatomy.image}
                  alt={chargingOfferings.hubAnatomy.imageAlt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-900/85 via-forest-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-eyebrow text-xs font-semibold uppercase tracking-widest text-forest-100">
                    {anatomy.imageEyebrow}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{anatomy.imageCaption}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {anatomy.layers.map((layer) => (
                  <span
                    key={layer.title}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-forest-700"
                  >
                    <span className="font-mono text-[10px] font-semibold text-forest-600">{layer.step}</span>
                    {layer.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow={rollout.eyebrow}
          title={rollout.title}
          description={rollout.description}
        />
        <div className="mt-8 space-y-4">
          {rollout.phases.map((p) => (
            <div
              key={p.phase}
              className={`grid gap-4 rounded-2xl border bg-white p-5 md:grid-cols-[auto_auto_1fr_1.5fr] md:items-center md:gap-5 ${
                p.active ? "border-forest-500/30" : "border-border"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-lg font-semibold text-forest-900">
                {p.phase}
              </div>
              <span
                className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${chargingHubPhaseStyles[p.status]}`}
              >
                {p.status}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-forest-900">{p.route}</h3>
                <p className="mt-0.5 text-sm text-forest-600/80">{p.hubs}</p>
              </div>
              <p className="text-sm leading-relaxed text-forest-600/80">{p.purpose}</p>
            </div>
          ))}
        </div>
        <a href={rollout.exploreHref} className="text-link mt-6 inline-block text-sm font-semibold">
          {rollout.exploreLabel}
        </a>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={siteSelection.eyebrow}
            title={siteSelection.title}
            description={siteSelection.description}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteSelection.criteria.map((c, i) => (
              <div key={c.title} className="card p-5">
                <span className="font-mono text-xs font-semibold text-forest-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-semibold text-forest-900">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-forest-600/80">{c.text}</p>
              </div>
            ))}
          </div>
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
