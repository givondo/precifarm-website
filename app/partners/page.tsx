import type { Metadata } from "next";
import Link from "next/link";
import CheckItem from "@/components/ui/CheckItem";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  partnerCommitments,
  partnerHighlights,
  partnerProcess,
  partnerProductFit,
  partnerTypes,
} from "@/lib/partners";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/partners");

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/partners")} />
      <PageHero
        eyebrow="Partners"
        title="Electrify a fleet, host a hub, or sell home charging"
        description="Precifarm designs, installs, finances and operates chargers from Pulse charger and Pod energy storage at home to Corridor DC on the highway. Partners host sites, run fleets or sell installations — each organisation does what it does best."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
          >
            Talk to the team
          </Link>
          <Link
            href="/charging"
            className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            Explore charging range
          </Link>
        </div>
      </PageHero>

      <section className="border-y border-forest-900 bg-forest-900 section-pad">
        <div className="page-container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/60">
            Why partners choose Precifarm
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerHighlights.map((item) => (
              <div key={item.stat} className="text-center lg:text-left">
                <p className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm leading-snug text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow="Partner models"
          title="Five ways to work with Precifarm"
          description="From a single hub site to a national install network — pick the model that matches your assets, fleet or capital."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {partnerTypes.map((p) => (
            <div key={p.id} id={p.id} className="card flex scroll-mt-24 flex-col p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-forest-900">{p.title}</h2>
                <span className="rounded-full bg-charge-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-charge-700">
                  {p.products}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-forest-600/85">{p.summary}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.points.map((pt) => (
                  <CheckItem key={pt}>{pt}</CheckItem>
                ))}
              </ul>
              <p className="mt-5 rounded-xl bg-muted p-4 text-sm leading-relaxed text-forest-600/80">
                {p.keeps}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="How it works"
            title="From first conversation to live charging"
            description="Every partnership follows the same engineering and commercial discipline — assess, agree terms, build and operate."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerProcess.map((step) => (
              <li key={step.step} className="card p-5">
                <span className="font-mono text-xs font-semibold text-forest-600">{step.step}</span>
                <h3 className="mt-2 font-semibold text-forest-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow="Product fit"
          title="Which Precifarm charger fits your partnership?"
          description="Spark charger to Corridor charging with Lipa Pole Pole financing — M-Pesa and remote monitoring on every unit we commission."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/60">
                <tr>
                  <th className="px-5 py-3 font-semibold text-forest-900">Product</th>
                  <th className="px-5 py-3 font-semibold text-forest-900">Spec</th>
                  <th className="px-5 py-3 font-semibold text-forest-900">Best for</th>
                </tr>
              </thead>
              <tbody>
                {partnerProductFit.map((row, i) => (
                  <tr
                    key={row.product}
                    className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}
                  >
                    <td className="px-5 py-4 font-semibold text-forest-900">{row.product}</td>
                    <td className="px-5 py-4 text-forest-600/85">{row.power}</td>
                    <td className="px-5 py-4 text-forest-600/85">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 text-sm text-forest-600/80">
          See full product detail on the{" "}
          <Link href="/charging" className="text-link font-semibold">
            charging services page
          </Link>{" "}
          or the{" "}
          <Link href="/network" className="text-link font-semibold">
            Charging Hub
          </Link>
          .
        </p>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="Our commitments"
            title="What Precifarm commits to every partner"
            description="Partners need more than hardware. They need dependable energy, clear economics and infrastructure that earns its place site by site."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerCommitments.map((p) => (
              <div key={p.title} className="card p-5">
                <h3 className="font-semibold text-forest-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to partner on EV charging?"
        description="Tell us whether you host a highway site, operate a fleet, sell Pulse charger installations or support project finance — we will follow up within one business day."
        primaryHref="/contact"
        primaryLabel="Contact the team"
        secondaryHref="/training"
        secondaryLabel="EV charging training"
      />
    </>
  );
}
