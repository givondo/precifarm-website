import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import SiteImage from "@/components/SiteImage";
import {
  TrainingCurriculumTable,
  TrainingDeliveryTable,
  TrainingProgressionTable,
  TrainingTableSection,
  TrainingTierOverviewTable,
  TrainingTrackMatrixTable,
} from "@/components/training/TrainingTables";
import CheckItem from "@/components/ui/CheckItem";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { contact } from "@/lib/contact";
import { absoluteUrl } from "@/lib/seo/config";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";
import {
  trainingEnquiryMailto,
  trainingHeroImage,
  trainingIntro,
  trainingTiers,
} from "@/lib/training";

export const metadata: Metadata = pageMetadata("/training");

export default function TrainingPage() {
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
        eyebrow={trainingIntro.eyebrow}
        title={trainingIntro.title}
        description={trainingIntro.description}
      >
        <a
          href={trainingEnquiryMailto()}
          className="inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
        >
          Enquire about training
        </a>
      </PageHero>

      <section className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Training", href: "/training" },
          ]}
        />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-base leading-relaxed text-forest-600">{trainingIntro.lead}</p>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-forest-900">Who should attend</h2>
              <ul className="mt-4 space-y-2.5">
                {trainingIntro.whoShouldAttend.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
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
                priority
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-muted/20 section-pad" id="overview">
        <div className="page-container space-y-14">
          <TrainingTableSection
            eyebrow="Overview"
            title="Tiers at a glance"
            description="Duration, format, audience and certificate for each level."
          >
            <TrainingTierOverviewTable />
          </TrainingTableSection>

          <TrainingTableSection
            eyebrow="Curriculum"
            title="Modules by tier"
            description="What each cohort covers before certification."
          >
            <TrainingCurriculumTable />
          </TrainingTableSection>
        </div>
      </section>

      <section className="section-pad bg-white" id="ev-charging">
        <div className="page-container">
          <TrainingTableSection
            eyebrow="Product tracks"
            title="Which tier for which charger?"
            description="Home Pulse and Pod, fleet Depot, highway Corridor."
          >
            <TrainingTrackMatrixTable />
          </TrainingTableSection>
          <p className="mt-6 text-sm text-forest-600">
            Related:{" "}
            <Link href="/charging" className="text-link font-medium">
              charging
            </Link>
            ,{" "}
            <Link href="/partners" className="text-link font-medium">
              partners
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-pad border-t border-border bg-muted/20">
        <div className="page-container grid gap-14 lg:grid-cols-2">
          <TrainingTableSection
            eyebrow="Progression"
            title="Moving between tiers"
            description="Sequential path unless engineering approves equivalence."
          >
            <TrainingProgressionTable />
          </TrainingTableSection>

          <TrainingTableSection
            eyebrow="Delivery"
            title="How cohorts run"
            description="Venue, size and certificate timing."
          >
            <TrainingDeliveryTable />
          </TrainingTableSection>
        </div>
      </section>

      <section className="training-enquiry section-pad border-t border-border bg-white">
        <div className="page-container">
          <div className="training-enquiry-grid">
            <div className="training-enquiry-copy">
              <SectionHeader
                eyebrow="Enrol"
                title="Book a cohort"
                description="Email team size, current tier and tracks needed. We confirm within one business day."
              />
              <ul className="mt-6 space-y-2.5">
                {[
                  "Organisation name and number of participants",
                  "Current tier (T1, T2, T3 or none)",
                  "Tracks: home, fleet or highway",
                  "Preferred month and contact phone",
                ].map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>

            <div className="training-enquiry-panel card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-forest-500">
                Training enquiries
              </p>
              <a
                href={trainingEnquiryMailto()}
                className="training-enquiry-email text-link mt-3 block break-all text-xl font-semibold text-forest-900 sm:text-2xl"
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
    </>
  );
}
