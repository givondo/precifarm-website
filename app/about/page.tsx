import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero, InteriorSection, StageLabel, StepFlow } from "@/components/interior";
import RelatedLinks from "@/components/publications/RelatedLinks";
import RouteRolesTable from "@/components/RouteRolesTable";
import JsonLd from "@/components/seo/JsonLd";
import SiteImage from "@/components/SiteImage";
import { aboutPage } from "@/lib/about-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  const page = aboutPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/about")} />
      <InteriorHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About us", href: "/about" },
        ]}
        actions={[
          { href: "/charging", label: "Explore charging" },
          { href: "/contact", label: "Contact us", variant: "secondary" },
        ]}
        media={{ src: page.hero.image.src, alt: page.hero.image.alt, fit: "cover", stage: "illustrative" }}
        facts={page.facts}
      />

      <section aria-labelledby="problem-title" className="bg-white">
        <div className="interior-container grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">{page.problem.eyebrow}</p>
            <h2 id="problem-title" className="heading-display mt-3 text-2xl leading-tight sm:text-[2rem]">
              {page.problem.title}
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-forest-700 lg:pt-8">
            <p className="text-forest-900">{page.problem.lead}</p>
            <p>{page.problem.body}</p>
          </div>
        </div>
      </section>

      <InteriorSection id="range" tone="silver" eyebrow={page.range.eyebrow} title={page.range.title} lead={page.range.lead}>
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {page.range.items.map((item) => (
            <li key={item.name} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <Link href={item.href} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border transition-shadow hover:shadow-md">
                <div className="relative aspect-[4/5] bg-[#eef0f2]">
                  <SiteImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                    className={item.image.src.endsWith(".png") ? "object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]" : "object-cover transition-transform duration-500 group-hover:scale-[1.03]"}
                  />
                  <StageLabel kind={item.stage} className="absolute left-3 top-3" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">{item.role}</p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-forest-950 group-hover:text-charge-700">{item.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{item.text}</p>
                  <span className="mt-4 text-sm font-semibold text-charge-700">View ›</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-forest-500">Product images are renders, not photographs of installed sites.</p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-forest-950 md:grid-cols-2">
          {page.range.software.map((s) => (
            <li key={s.name} className="flex flex-col bg-forest-950 p-6 text-white sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">{s.name === "Precifarm Agent" ? "AI engineering" : "Research"}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/72">{s.text}</p>
              <Link href={s.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-white hover:text-brand-300">
                {s.cta} ›
              </Link>
            </li>
          ))}
        </ul>
      </InteriorSection>

      <InteriorSection id="model" eyebrow={page.operatingModel.eyebrow} title={page.operatingModel.title} lead={page.operatingModel.description}>
        <StepFlow steps={page.operatingModel.steps} />
      </InteriorSection>

      <InteriorSection id="principles" tone="graphite" eyebrow={page.principlesSection.eyebrow} title={page.principlesSection.title}>
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2">
          {page.principles.map((p, i) => (
            <li key={p.title} className="bg-forest-950 p-6 sm:p-8">
              <p className="font-mono text-xs text-brand-300">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{p.text}</p>
            </li>
          ))}
        </ol>
      </InteriorSection>

      <InteriorSection id="roles" eyebrow={page.rolesSection.eyebrow} title={page.rolesSection.title} lead={page.rolesSection.description}>
        <RouteRolesTable />
      </InteriorSection>

      <RelatedLinks title="Next" links={page.next} />
    </>
  );
}
