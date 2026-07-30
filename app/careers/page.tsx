import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import CheckItem from "@/components/ui/CheckItem";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { contact } from "@/lib/contact";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/careers");

const openings = [
  {
    title: "Field engineer — charging hubs",
    location: "Nairobi · Kisumu · route corridor",
    type: "Full-time",
    summary:
      "Install, commission and maintain DC fast chargers, solar and storage at intercity hubs. You keep uptime high so coaches leave on schedule.",
    points: [
      "Electrical or renewable energy background with field experience",
      "Comfortable with CCS2 chargers, monitoring and fault recovery",
      "Willing to travel along Nairobi–Kisumu during route launch",
    ],
  },
  {
    title: "Hub operations lead",
    location: "Nairobi–Kisumu corridor",
    type: "Full-time",
    summary:
      "Run day-to-day hub activity — charging windows, passenger dwell, partner coordination and honest status updates when plans change.",
    points: [
      "Operations or transport background; calm under timetable pressure",
      "Clear communication with drivers, partners and passengers",
      "Data-minded: sessions, dwell and incident logs matter",
    ],
  },
  {
    title: "Software engineer — booking & payments",
    location: "Nairobi (hybrid)",
    type: "Full-time · Contract",
    summary:
      "Extend the ticketing CMS, passenger website and mobile app — M-Pesa STK, seat maps, analytics and the SEO knowledge layer behind precifarm.com.",
    points: [
      "TypeScript, React/Next.js or React Native experience",
      "Care about reliable payments and clear passenger UX",
      "Bonus: PostgreSQL, Cloud Run or mobile release experience",
    ],
  },
];

const values = [
  "We prove one route properly before financing the next.",
  "Uptime and honest communication beat glossy decks.",
  "Partners operate vehicles; we build the energy and booking layer.",
  "Kenya-first engineering — hubs in the cities we serve.",
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/careers")} />
      <PageHero
        eyebrow="Careers"
        title="Help build dependable electric travel between Kenyan cities"
        description="Precifarm is growing the team that delivers charging hubs, live booking and route operations for Nairobi–Kisumu — and the routes that follow."
      >
        <a
          href={`mailto:${contact.email}?subject=Careers%20at%20Precifarm`}
          className="inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
        >
          Send your CV
        </a>
      </PageHero>

      <section className="page-container pb-12 pt-6 sm:pb-14 sm:pt-8">
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
          description="We hire for route-one first. If you do not see a perfect match, general applications are welcome — tell us how you would help passengers and partners succeed."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {openings.map((role) => (
            <article key={role.title} className="card flex flex-col p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-500">
                <span>{role.type}</span>
                <span aria-hidden>·</span>
                <span>{role.location}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-forest-900">{role.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-forest-600/85">{role.summary}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {role.points.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                className="text-link mt-6 inline-flex text-sm font-semibold"
              >
                Apply for this role →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container max-w-2xl">
          <SectionHeader
            eyebrow="How we work"
            title="What it is like to build with us"
            description="Small team, real infrastructure, measurable outcomes on a live intercity route."
          />
          <ul className="mt-6 space-y-3">
            {values.map((value) => (
              <CheckItem key={value}>{value}</CheckItem>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad page-container">
        <div className="mx-auto max-w-2xl card px-6 py-10 text-center sm:px-10">
          <h2 className="text-lg font-semibold text-forest-900">General applications</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-forest-600/85">
            Operators, engineers, designers and commercial talent — if electric intercity travel in
            Kenya motivates you, introduce yourself with a short note and CV.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${contact.email}?subject=General%20application%20-%20Precifarm`}
              className="btn-primary rounded-full px-6 py-2.5 text-sm"
            >
              Email careers
            </a>
            <Link href="/about" className="btn-secondary rounded-full px-6 py-2.5 text-sm">
              About Precifarm
            </Link>
          </div>
        </div>
      </section>

      <PageCTA
        title="Questions about working at Precifarm?"
        description="Reach the team through contact or email — we read every careers message."
        primaryHref={`mailto:${contact.email}?subject=Careers%20enquiry`}
        primaryLabel="Email us"
        secondaryHref="/contact"
        secondaryLabel="Contact page"
      />
    </>
  );
}
