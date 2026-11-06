import Link from "next/link";
import FaqList from "@/components/faq/FaqList";
import { CalloutNote, InPageNav, InteriorHero, InteriorSection, SpecSheet, StageLabel, type StageKind } from "@/components/interior";
import SiteImage from "@/components/SiteImage";
import { contact } from "@/lib/contact";
import { productImages } from "@/lib/product-images";
import {
  evChargingTracks,
  trainingDeliveryDetails,
  trainingEnquiryMailto,
  trainingNavLabel,
  trainingProgression,
  trainingTiers,
  trainingTrackMatrix,
  type TrackTierLevel,
} from "@/lib/training";
import { trainingPage, trainingPageFaqs } from "@/lib/training-page";

const trackVisual: Record<string, { image: { src: string; alt: string }; stage: StageKind; product: string; matrix: string }> = {
  "route-hub": { image: productImages.corridor, stage: "pilot", product: "ARC Corridor", matrix: "Highway charging" },
  home: { image: productImages.pulse, stage: "available", product: "Pulse charger", matrix: "Home charging" },
  "private-site": { image: productImages.pulsePlus, stage: "development", product: "Pulse+ charger", matrix: "Fleet charging" },
  fleet: { image: productImages.bodaStudio, stage: "development", product: "Boda Hub", matrix: "Boda Hub & last-mile" },
};

function LadderGraphic() {
  return (
    <div className="rounded-[1.75rem] bg-forest-950 p-6 text-white sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Progression</p>
      <ol className="mt-6 flex items-end gap-2 sm:gap-3" aria-label="Training tiers in order">
        {trainingTiers.map((t, i) => (
          <li key={t.id} className="flex-1">
            <a href={`#${t.id}`} className="group block text-white hover:text-white">
              <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{t.code}</span>
              <span className="mt-1 block text-xs leading-snug text-white/65">{t.title}</span>
              <span
                aria-hidden
                className="mt-3 block rounded-t-xl bg-gradient-to-t from-white/[0.06] to-white/[0.14] ring-1 ring-inset ring-white/15 transition-colors group-hover:from-brand-400/20 group-hover:to-brand-400/30"
                style={{ height: `${4 + i * 3.25}rem` }}
              />
              <span className="mt-2 block font-mono text-[11px] text-brand-300">{t.duration}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/60">
        Each tier ends with an assessment. T3 also needs a licensed electrical qualification and written authorisation.
      </p>
    </div>
  );
}

export default function TrainingView() {
  const page = trainingPage;
  const mailto = trainingEnquiryMailto();

  return (
    <>
      <InteriorHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Charging", href: "/charging" },
          { name: trainingNavLabel, href: "/training" },
        ]}
        actions={[
          { href: mailto, label: page.hero.primaryLabel },
          { href: "#ladder", label: "Compare tiers", variant: "secondary" },
        ]}
        media={<LadderGraphic />}
        facts={page.facts}
      >
        <CalloutNote title={page.qualification.title}>{page.qualification.text}</CalloutNote>
      </InteriorHero>

      <InPageNav links={page.nav} />

      <InteriorSection id="ladder" eyebrow={page.ladder.eyebrow} title={page.ladder.title} lead={page.ladder.lead}>
        <ol className="grid gap-4 lg:grid-cols-3 lg:items-start">
          {trainingTiers.map((t, i) => {
            const prereq = trainingProgression[i];
            return (
              <li key={t.id} className={`flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border ${i === 1 ? "lg:mt-10" : i === 2 ? "lg:mt-20" : ""}`}>
                <div className={`px-5 py-4 ${i === 2 ? "bg-forest-950 text-white" : i === 1 ? "bg-forest-700 text-white" : "bg-[#eef0f2] text-forest-950"}`}>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest ${i === 0 ? "text-forest-500" : "text-white/65"}`}>{t.subtitle}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                    {t.code} <span className="font-normal">{t.title}</span>
                  </h3>
                </div>
                <dl className="divide-y divide-border text-sm">
                  {[
                    ["Duration", t.duration],
                    ["Format", t.format],
                    ["For", t.audience],
                    ["Entry", prereq?.requirement ?? ""],
                    ["Certificate", t.certificate],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 px-5 py-3">
                      <dt className="text-forest-500">{k}</dt>
                      <dd className="text-forest-800">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto border-t border-border bg-[#fbfbfc] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">After passing you can</p>
                  <p className="mt-1 text-sm leading-relaxed text-forest-700">{t.canDoAfter}</p>
                  <a href={`#${t.id}`} className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-charge-700 hover:underline">
                    {t.code} curriculum ›
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </InteriorSection>

      {trainingTiers.map((t, i) => (
        <InteriorSection key={t.id} id={t.id} tone={i % 2 === 0 ? "silver" : "white"} eyebrow={`${t.code} · ${t.subtitle}`} title={t.title} lead={t.summary}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
            <SpecSheet
              groups={[
                {
                  title: "At a glance",
                  rows: [
                    { label: "Duration", value: t.duration },
                    { label: "Format", value: t.format },
                    { label: "Assessment", value: t.assessment },
                    { label: "Certificate", value: t.certificate },
                  ],
                },
              ]}
            />
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Modules</h3>
                <ol className="mt-3 space-y-3">
                  {t.modules.map((m, j) => (
                    <li key={m} className="grid grid-cols-[2.75rem_minmax(0,1fr)] text-sm leading-relaxed text-forest-800">
                      <span className="font-mono text-xs text-forest-400">{`${t.code}.${j + 1}`}</span>
                      {m}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Assessed outcomes</h3>
                <ul className="mt-3 space-y-3">
                  {t.outcomes.map((o) => (
                    <li key={o} className="relative pl-6 text-sm leading-relaxed text-forest-800">
                      <svg aria-hidden viewBox="0 0 16 16" className="absolute left-0 top-1 h-4 w-4 text-charge-600">
                        <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </InteriorSection>
      ))}

      <InteriorSection id="tracks" tone="graphite" eyebrow={page.tracks.eyebrow} title={page.tracks.title} lead={page.tracks.lead}>
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Tiers required for each product track</caption>
            <thead className="hidden bg-white/[0.04] md:table-header-group">
              <tr className="text-[11px] uppercase tracking-widest text-white/60">
                <th scope="col" className="px-5 py-3 font-semibold">
                  Track
                </th>
                {trainingTiers.map((t) => (
                  <th key={t.id} scope="col" className="w-28 px-3 py-3 text-center font-semibold">
                    {t.code}
                  </th>
                ))}
                <th scope="col" className="px-5 py-3 font-semibold">
                  Guidance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {evChargingTracks.map((track) => {
                const v = trackVisual[track.id];
                const row = trainingTrackMatrix.find((m) => m.track === v?.matrix);
                return (
                  <tr key={track.id} className="block px-5 py-5 md:table-row md:p-0">
                    <th scope="row" className="block font-normal md:table-cell md:px-5 md:py-5 md:align-top">
                      <span className="flex items-center gap-4">
                        {v ? (
                          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                            <SiteImage src={v.image.src} alt="" fill sizes="64px" className={v.image.src.endsWith(".png") ? "object-contain p-1.5" : "object-cover"} />
                          </span>
                        ) : null}
                        <span className="min-w-0">
                          <span className="block font-display text-base font-semibold text-white">{track.title}</span>
                          {v ? (
                            <span className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-white/60">
                              {v.product} <StageLabel kind={v.stage} tone="dark" />
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </th>
                    {trainingTiers.map((t) => {
                      const level = (row?.[t.id] ?? "Not required") as TrackTierLevel;
                      return (
                        <td key={t.id} className="mt-3 inline-block pr-2 md:mt-0 md:table-cell md:px-3 md:py-5 md:text-center md:align-top">
                          <span className="sr-only md:hidden">{t.code}: </span>
                          <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 text-[11px] font-semibold ${level === "Required" ? "bg-white text-forest-950" : level === "Recommended" ? "ring-1 ring-inset ring-white/40 text-white" : "text-white/70"}`}>
                            <span aria-hidden className="mr-1 md:hidden">{t.code}</span>
                            {level}
                          </span>
                        </td>
                      );
                    })}
                    <td className="mt-3 block text-white/70 md:table-cell md:px-5 md:py-5 md:align-top">
                      <span className="block">{row?.note}</span>
                      <span className="mt-2 block text-xs text-white/50">Roles: {track.roles}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2">
          {evChargingTracks.map((track) => (
            <li key={track.id} className="bg-forest-950 p-5 sm:p-6">
              <h3 className="font-semibold text-white">{track.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{track.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {track.topics.map((topic) => (
                  <li key={topic} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-white/80 ring-1 ring-inset ring-white/10">
                    {topic}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-white/55">Product images are renders. Stage labels show where each product stands today.</p>
      </InteriorSection>

      <InteriorSection id="delivery" eyebrow={page.delivery.eyebrow} title={page.delivery.title}>
        <div className="max-w-3xl">
          <SpecSheet groups={[{ rows: trainingDeliveryDetails.map((d) => ({ label: d.item, value: d.detail })) }]} />
        </div>
      </InteriorSection>

      <InteriorSection id="enrol" tone="silver" eyebrow={page.enrol.eyebrow} title={page.enrol.title} lead={page.enrol.lead}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
          <ol className="divide-y divide-border overflow-hidden rounded-2xl bg-white ring-1 ring-border">
            {page.enrol.checklist.map((c, i) => (
              <li key={c} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline px-5 py-4 text-sm text-forest-800">
                <span className="font-mono text-xs text-forest-400">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ol>
          <div className="flex flex-col justify-between gap-6 rounded-2xl bg-forest-950 p-6 text-white sm:p-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-brand-300">Training enquiries</p>
              <p className="mt-2 break-words font-display text-xl font-semibold">{contact.trainingEmail}</p>
              <p className="mt-2 text-sm text-white/70">The email opens with these questions filled in.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={mailto} className="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-forest-950 hover:bg-brand-50">
                Email a cohort enquiry
              </a>
              <Link href="/contact?interest=general" className="inline-flex min-h-12 items-center text-sm font-semibold text-white/85 hover:text-white">
                Or use the contact form ›
              </Link>
            </div>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="faq" eyebrow="Common questions" title="Training FAQ." width="narrow">
        <FaqList items={trainingPageFaqs.map((f) => ({ id: `faq-${f.id}`, question: f.question, answer: f.answer }))} />
      </InteriorSection>
    </>
  );
}
