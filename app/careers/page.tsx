import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  careerOpenings,
  careersApplyMailto,
  careersApplySteps,
  careersHighlights,
  careersIntro,
  careersPerks,
  careersValues,
  type CareerDepartment,
} from "@/lib/careers";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { jobPostingSchema } from "@/lib/seo/schema";

export const metadata: Metadata = pageMetadata("/careers");

const departmentStyles: Record<CareerDepartment, string> = {
  Infrastructure: "bg-charge-50 text-charge-700 ring-charge-200/80",
  Operations: "bg-green-50 text-green-800 ring-green-200/80",
  Engineering: "bg-forest-100 text-forest-800 ring-forest-200/80",
};

function DepartmentBadge({ department }: { department: CareerDepartment }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${departmentStyles[department]}`}
    >
      {department}
    </span>
  );
}

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
      <PageHero
        eyebrow={careersIntro.eyebrow}
        title={careersIntro.title}
        description={careersIntro.description}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#roles" className="btn-primary rounded-full px-6 py-2.5 text-sm">
            View open roles
          </a>
          <a href={careersApplyMailto()} className="btn-secondary rounded-full px-6 py-2.5 text-sm">
            Send your CV
          </a>
        </div>
      </PageHero>

      <section className="careers-highlights border-y border-border bg-muted/30 section-pad">
        <div className="page-container">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-forest-500">
            Why join Precifarm
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careersHighlights.map((item) => (
              <div key={item.stat} className="careers-highlight-card">
                <p className="font-mono text-xl font-bold tracking-tight text-forest-900 sm:text-2xl">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm leading-snug text-forest-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roles" className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Careers", href: "/careers" },
          ]}
        />
        <SectionHeader
          className="mt-6"
          eyebrow="Open roles"
          title="Current opportunities"
          description={`${careersIntro.lead} If you do not see a perfect match, general applications are welcome.`}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {careerOpenings.map((role) => (
            <article key={role.id} className="careers-role-card card flex flex-col p-6">
              <div className="flex flex-wrap items-center gap-2">
                <DepartmentBadge department={role.department} />
                <span className="text-xs font-medium text-forest-500">{role.type}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-forest-900">{role.title}</h2>
              <p className="mt-1 text-xs font-medium text-forest-500">{role.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-forest-600/90">{role.summary}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {role.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
              {role.department === "Infrastructure" && (
                <p className="mt-4 text-sm text-forest-600">
                  Field engineers can progress through our{" "}
                  <Link href="/training" className="text-link font-medium">
                    T1–T3 training programme
                  </Link>
                  .
                </p>
              )}
              <a
                href={careersApplyMailto(role.title)}
                className="btn-primary mt-6 inline-flex w-full justify-center rounded-xl px-4 py-2.5 text-sm sm:w-auto"
              >
                Apply for this role
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeader
                eyebrow="How to apply"
                title="A straightforward process"
                description="We read every message. No automated rejections — just a practical conversation with the team."
              />
              <ol className="mt-8 space-y-6">
                {careersApplySteps.map((step, index) => (
                  <li key={step.title} className="careers-step flex gap-4">
                    <span className="careers-step-num">{index + 1}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-forest-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-forest-600">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <SectionHeader
                eyebrow="What we offer"
                title="Build on live infrastructure"
                description="Small team, measurable outcomes on charging people use today."
              />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {careersPerks.map((perk) => (
                  <li key={perk.title} className="careers-perk-card">
                    <h3 className="text-sm font-semibold text-forest-900">{perk.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{perk.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container max-w-2xl">
          <SectionHeader
            eyebrow="How we work"
            title="What it is like to build with us"
            description="Principles we hire for — not slogans on a wall."
          />
          <ul className="mt-6 space-y-3">
            {careersValues.map((value) => (
              <CheckItem key={value}>{value}</CheckItem>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad page-container">
        <div className="mx-auto max-w-2xl card-elevated px-6 py-10 text-center sm:px-10">
          <h2 className="text-lg font-semibold text-forest-900">General applications</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest-600/90">
            Operators, engineers, designers and commercial talent — if EV charging from home to highway in
            Kenya motivates you, introduce yourself with a short note and CV.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={careersApplyMailto("General application")}
              className="btn-primary rounded-full px-6 py-2.5 text-sm"
            >
              Email careers
            </a>
            <Link href="/about" className="btn-secondary rounded-full px-6 py-2.5 text-sm">
              About Precifarm
            </Link>
            <Link href="/training" className="btn-secondary rounded-full px-6 py-2.5 text-sm">
              EV training
            </Link>
          </div>
        </div>
      </section>

      <PageCTA
        title="Questions about working at Precifarm?"
        description="Reach the team through contact or email — we read every careers message."
        primaryHref={careersApplyMailto("Careers enquiry")}
        primaryLabel="Email us"
        secondaryHref="/contact"
        secondaryLabel="Contact page"
      />
    </>
  );
}
