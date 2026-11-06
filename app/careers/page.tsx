import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero, InteriorSection, StepFlow } from "@/components/interior";
import JsonLd from "@/components/seo/JsonLd";
import {
  careerOpenings,
  careersApplyMailto,
  careersApplySteps,
  careersHighlights,
  careersIntro,
  careersPerks,
  careersValues,
} from "@/lib/careers";
import { contact } from "@/lib/contact";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { jobPostingSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata("/careers");

export default function CareersPage() {
  const jsonLd = [
    ...pageJsonLd("/careers"),
    ...careerOpenings.map((role) =>
      jobPostingSchema({
        title: role.title,
        description: `${role.summary} ${role.points.join(" ")}`,
        location: role.location,
        employmentType: role.type.toLowerCase().includes("contract") ? "CONTRACTOR" : "FULL_TIME",
      }),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <InteriorHero
        eyebrow={careersIntro.eyebrow}
        title={careersIntro.title}
        lead={careersIntro.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]}
        actions={[
          { href: "#roles", label: "View open roles" },
          { href: careersApplyMailto(), label: "Send your CV", variant: "secondary" },
        ]}
        facts={careersHighlights.map((h) => ({ value: h.stat, label: h.label }))}
      />

      <InteriorSection
        id="roles"
        eyebrow="Open roles"
        title={`${careerOpenings.length} roles`}
        lead={`${careersIntro.lead} No exact match? General applications are welcome.`}
      >
        <ul className="divide-y divide-border border-y border-border">
          {careerOpenings.map((role) => (
            <li key={role.id} id={role.id} className="scroll-mt-28 py-6 sm:py-8">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:gap-10">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-charge-600">{role.department}</p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-forest-950">{role.title}</h3>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-forest-600">
                    <span>{role.location}</span>
                    <span aria-hidden className="text-forest-300">
                      /
                    </span>
                    <span>{role.type}</span>
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] leading-relaxed text-forest-700">{role.summary}</p>
                  <details className="group mt-3">
                    <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-2 text-sm font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
                      <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full border border-forest-300 text-xs transition-transform group-open:rotate-45">
                        +
                      </span>
                      What you bring
                    </summary>
                    <ul className="mt-2 space-y-2 pl-7 text-sm leading-relaxed text-forest-700">
                      {role.points.map((p) => (
                        <li key={p} className="relative">
                          <span aria-hidden className="absolute -left-4 top-[0.6em] h-1.5 w-1.5 rounded-full bg-charge-600" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {role.department === "Infrastructure" ? (
                      <p className="mt-3 pl-7 text-sm text-forest-600">
                        Field roles follow the{" "}
                        <Link href="/training" className="font-medium text-charge-700 underline underline-offset-2">
                          T1 to T3 training pathway
                        </Link>
                        .
                      </p>
                    ) : null}
                  </details>
                </div>
                <div className="lg:pt-6">
                  <a
                    href={careersApplyMailto(role.title)}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-charge-600 px-6 text-sm font-semibold text-white hover:bg-charge-500 sm:w-auto"
                  >
                    Apply<span className="sr-only"> for {role.title}</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </InteriorSection>

      <InteriorSection id="apply" tone="silver" eyebrow="How to apply" title="Three steps, and a reply to every message." lead={`Applications go to ${contact.email}.`}>
        <StepFlow steps={careersApplySteps} />
      </InteriorSection>

      <InteriorSection id="work" tone="graphite" eyebrow="Working here" title="What we offer, and how we work.">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {careersPerks.map((p) => (
              <div key={p.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-semibold text-white">{p.title}</dt>
                <dd className="text-sm leading-relaxed text-white/70">{p.text}</dd>
              </div>
            ))}
          </dl>
          <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2">
            {careersValues.map((v, i) => (
              <li key={v.title} className="bg-forest-950 p-5">
                <p className="font-mono text-xs text-brand-300">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1.5 font-semibold text-white">{v.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </InteriorSection>

      <section aria-labelledby="general-title" className="bg-white">
        <div className="interior-container grid gap-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <h2 id="general-title" className="font-display text-2xl font-semibold tracking-tight text-forest-950">
              General applications
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-forest-600">
              Operators, engineers, designers and commercial people: if EV charging from home to highway in Kenya motivates you, introduce yourself with a short note and CV.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={careersApplyMailto("General application")} className="inline-flex min-h-12 items-center rounded-full bg-charge-600 px-6 text-sm font-semibold text-white hover:bg-charge-500">
              Email careers
            </a>
            <Link href="/about" className="inline-flex min-h-12 items-center rounded-full border border-forest-200 px-6 text-sm font-semibold text-forest-900 hover:border-forest-300">
              About Precifarm
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
