import type { Metadata } from "next";
import Link from "next/link";
import KenyaEvComparisonTable from "@/components/evs/KenyaEvComparisonTable";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  kenyaEvBikeModels,
  kenyaEvCarModels,
  kenyaEvCompatibilityPage,
  kenyaEvMarketCallouts,
} from "@/lib/kenya-ev-compatibility";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/evs");

export default function KenyaEvCompatibilityPage() {
  const {
    eyebrow,
    title,
    lead,
    vehicleAware,
    dataLayer,
    marketContext,
    chargingKey,
    whyTheseModels,
    carTableTitle,
    bikeTableTitle,
    carTableCaption,
    bikeTableCaption,
    path,
  } = kenyaEvCompatibilityPage;
  const { leaf, byd, ebike } = kenyaEvMarketCallouts;

  return (
    <>
      <JsonLd data={pageJsonLd(path)} />
      <PageHero eyebrow={eyebrow} title={title} description={lead} />

      <section className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Kenya EV guide", href: path },
          ]}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-charge-200 bg-charge-50/60 px-5 py-5">
            <h2 className="text-sm font-semibold text-forest-900">{leaf.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-forest-600">{leaf.text}</p>
          </article>
          <article className="rounded-2xl border border-charge-200 bg-charge-50/60 px-5 py-5">
            <h2 className="text-sm font-semibold text-forest-900">{byd.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-forest-600">{byd.text}</p>
          </article>
          <article className="rounded-2xl border border-charge-200 bg-charge-50/60 px-5 py-5">
            <h2 className="text-sm font-semibold text-forest-900">{ebike.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-forest-600">{ebike.text}</p>
          </article>
        </div>

        <div className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-forest-600">
          <p>{vehicleAware}</p>
          <p>{dataLayer}</p>
          <p>{marketContext}</p>
          <p className="text-sm text-forest-500">{chargingKey}</p>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 section-pad">
        <div className="page-container space-y-10">
          <SectionHeader
            eyebrow="Kenya EV comparison"
            title="17 models — range, DC speed and charging time"
            description={whyTheseModels}
          />

          <div>
            <h3 className="text-lg font-semibold tracking-tight text-forest-900">{carTableTitle}</h3>
            <div className="mt-4">
              <KenyaEvComparisonTable
                models={kenyaEvCarModels}
                caption={carTableCaption}
                showFootnote={false}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold tracking-tight text-forest-900">{bikeTableTitle}</h3>
            <div className="mt-4">
              <KenyaEvComparisonTable
                models={kenyaEvBikeModels}
                caption={bikeTableCaption}
                showFootnote
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="page-container max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-forest-900">
            Plan EV charging in Kenya with Precifarm
          </h2>
          <p className="mt-3 text-base leading-relaxed text-forest-500">
            Connect your vehicle in the AI companion, find compatible chargers on the Charging Hub, pay with M-Pesa — or
            book a home survey for Pulse charger or Pod energy storage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link href="/download" className="btn-primary rounded-full px-6 py-3 text-sm">
              Get the AI companion
            </Link>
            <Link href="/charging/home" className="text-sm font-medium">
              Home charging ›
            </Link>
            <Link href="/hub" className="text-sm font-medium">
              Open Charging Hub ›
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
