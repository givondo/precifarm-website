import type { Metadata } from "next";
import HubImage from "@/components/HubImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import RouteRolesTable from "@/components/RouteRolesTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { aboutPage } from "@/lib/about-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  const page = aboutPage;

  return (
    <>
      <JsonLd data={pageJsonLd("/about")} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
      />

      <section className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]}
        />
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <HubImage variant="homeSolar" aspectClass="aspect-video" />
          </div>
          <div className="space-y-5 leading-relaxed text-forest-600/85">
            <h2 className="text-lg font-semibold text-forest-900 sm:text-xl">{page.intro.title}</h2>
            {page.intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={page.principlesSection.eyebrow}
            title={page.principlesSection.title}
            description={page.principlesSection.description}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.principles.map((p) => (
              <div key={p.title} className="card p-5">
                <h3 className="font-semibold text-forest-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad page-container">
        <RouteRolesTable />
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
