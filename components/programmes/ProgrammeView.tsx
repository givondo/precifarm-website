import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import PageCTA from "@/components/ui/PageCTA";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgrammeSpecTable from "@/components/programmes/ProgrammeSpecTable";
import type { ProgrammePageContent } from "@/lib/programme-pages";
import { programme } from "@/lib/programmes";
import { productStatusCopy } from "@/lib/product-status";

export default function ProgrammeView({ content }: { content: ProgrammePageContent }) {
  const p = programme(content.id);
  return (
    <>
      <section className="page-hero">
        <div className="page-container page-hero-container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow">{content.eyebrow}</p>
            <h1 className="heading-display page-hero-title">{content.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={p.status} />
              <span className="text-xs text-forest-500">{productStatusCopy[p.status].meaning}</span>
            </div>
            <p className="page-hero-description">{content.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={content.cta.href} className="btn-primary">
                {content.cta.label}
              </Link>
              {content.secondaryCta ? (
                <Link href={content.secondaryCta.href} className="btn-secondary">
                  {content.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
          {content.image ? (
            <figure className="overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative aspect-[4/3] w-full surface-well">
                <SiteImage src={content.image.src} alt={content.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4" />
              </div>
              <figcaption className="border-t border-border px-4 py-2 text-xs text-forest-500">{content.image.caption}</figcaption>
            </figure>
          ) : (
            <ol className="space-y-3 rounded-2xl border border-border bg-white p-6" aria-label={`${p.name} architecture`}>
              {content.stack?.map((layer, i) => (
                <li key={layer.name} className="flex gap-4">
                  <span className="font-mono text-xs font-semibold text-forest-400">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-sm font-semibold text-forest-900">{layer.name}</span>
                    <span className="block text-sm text-forest-600">{layer.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="section-pad border-b border-border bg-white">
        <div className="page-container grid gap-6 md:grid-cols-3">
          {content.features.map((f) => (
            <article key={f.title} className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold tracking-tight text-forest-900">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad border-b border-border bg-muted/20">
        <div className="page-container grid gap-12 lg:grid-cols-[3fr_2fr]">
          <ProgrammeSpecTable programme={p} />
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-forest-900">Where it fits</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-forest-700">
                {content.useCases.map((u) => (
                  <li key={u} className="border-l-2 border-forest-200 pl-3">{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-forest-900">{content.requirementsTitle}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-forest-700">
                {content.requirements.map((u) => (
                  <li key={u} className="border-l-2 border-forest-200 pl-3">{u}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        title={content.closing.title}
        description={content.closing.text}
        primaryHref={content.cta.href}
        primaryLabel={content.cta.label}
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
