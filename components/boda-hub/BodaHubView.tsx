import { CalloutNote, InPageNav, InteriorHero, InteriorSection, MediaFrame, SpecSheet, StageLabel, StepFlow } from "@/components/interior";
import BodaCabinetSvg from "@/components/boda-hub/BodaCabinetSvg";
import SwapDemo from "@/components/boda-hub/SwapDemo";
import {
  baseDoors,
  bodaCabinet,
  bodaHandling,
  bodaHandlingFault,
  bodaHandlingRules,
  bodaHero,
  bodaHost,
  bodaHubFaqs,
  bodaHubPath,
  bodaHubPaths,
  bodaImages,
  bodaMonitoring,
  bodaNav,
  bodaRoadmap,
  bodaSafeguards,
  bodaSpecRows,
  bodaSpecSource,
  bodaStatusLedger,
} from "@/lib/boda-hub-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Charging", href: "/charging" },
  { name: "Boda Hub", href: bodaHubPath },
];

const arrangementMarks = ["A", "B", "C", "D"] as const;

export default function BodaHubView() {
  return (
    <>
      <InteriorHero
        eyebrow={bodaHero.eyebrow}
        title={bodaHero.title}
        lead={bodaHero.lead}
        breadcrumbs={breadcrumbs}
        stage="development"
        actions={[
          { href: bodaHubPaths.contact, label: "Host a Boda Hub site" },
          { href: "#swap", label: "See how a swap works", variant: "secondary" },
        ]}
        media={{ src: bodaHero.image.src, alt: bodaHero.image.alt, fit: "cover", stage: "proposed" }}
        facts={bodaHero.facts}
      />

      <InPageNav links={bodaNav} />

      <InteriorSection
        id="status"
        eyebrow="Status"
        title="Partner sites, a proposed cabinet, one battery make"
        lead="Three different things sit behind the name Boda Hub. Here is where each one stands."
      >
        <ol className="grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border lg:grid-cols-3">
          {bodaStatusLedger.map((row) => (
            <li key={row.title} className="flex flex-col bg-white p-5 sm:p-6">
              <StageLabel kind={row.stage} label={row.label} className="self-start" />
              <h3 className="mt-4 text-lg font-semibold text-forest-950">{row.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-forest-700">{row.body}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-forest-500">{row.source}</p>
            </li>
          ))}
        </ol>
      </InteriorSection>

      <InteriorSection
        id="swap"
        tone="silver"
        eyebrow="The swap"
        title="From empty to charged at the cabinet"
        lead="Step through a swap at the Automated Boda Hub cabinet: arrive, pay on M-Pesa, return the empty pack, take a charged one and ride. A drawing of the designed sequence, not live data."
      >
        <SwapDemo />
      </InteriorSection>

      <InteriorSection
        id="cabinet"
        eyebrow="Cabinet and doors"
        title="Twenty bays, sixteen rider doors"
        lead={`${bodaCabinet.doors}. ${bodaCabinet.growth}`}
        aside={<StageLabel kind="proposed" />}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <figure className="rounded-[1.5rem] bg-[#f6f7f8] p-4 ring-1 ring-border sm:p-6">
            <div className="mx-auto max-w-[24rem]">
              <BodaCabinetSvg
                doors={{ ...baseDoors, 6: "empty" }}
                annotate
                title="Door arrangement: doors 17 to 20 in the top row charge only; doors 01 to 16 below are rider doors; the side totem holds the rider screen; the swap zone is marked on the pad."
              />
            </div>
            <figcaption className="mt-3 text-xs text-forest-500">Front elevation after the Rev D renders. Not to scale.</figcaption>
          </figure>

          <div>
            <ol className="divide-y divide-border border-y border-border">
              {[...bodaCabinet.arrangement, { rows: "Swap zone", text: "Marked on the pad in front of the doors, between yellow safety bollards." }].map((a, i) => (
                <li key={a.rows} className="flex gap-4 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-950 text-xs font-bold text-white">{arrangementMarks[i]}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-forest-950">{a.rows}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{a.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <dl className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {bodaCabinet.anatomy.map((p) => (
                <div key={p.name}>
                  <dt className="text-sm font-semibold text-forest-950">{p.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-forest-600">{p.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <CalloutNote title="Dimensions">{bodaCabinet.dimensionsNote}</CalloutNote>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <MediaFrame src={bodaImages.front.src} alt={bodaImages.front.alt} stage="proposed" aspect="aspect-[3/2]" caption="Front, render Rev D." sizes="(max-width: 768px) 100vw, 33vw" />
          <MediaFrame src={bodaImages.openBay.src} alt={bodaImages.openBay.alt} stage="proposed" aspect="aspect-[3/2]" caption="Open door with a pack on its tray, render Rev D." sizes="(max-width: 768px) 100vw, 33vw" />
          <MediaFrame src={bodaImages.canopy.src} alt={bodaImages.canopy.alt} stage="proposed" aspect="aspect-[3/2]" caption="Canopy and top rows, render Rev D." sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      </InteriorSection>

      <InteriorSection
        id="batteries"
        tone="graphite"
        eyebrow="Battery handling"
        title="One make per site, checked at every door"
        lead="A pack is only charged after it is recognised, only behind a latched door, and only handed to the next rider if it is healthy."
        aside={<StageLabel kind="development" label="Compatibility not yet validated" tone="dark" />}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <ol className="relative grid gap-4 sm:grid-cols-2">
              {bodaHandling.map((h, i) => (
                <li key={h.title} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                  <span className="font-mono text-xs text-brand-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-semibold text-white">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{h.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-4 rounded-2xl border border-dashed border-amber-300/40 p-5">
              <h3 className="font-semibold text-amber-200">{bodaHandlingFault.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{bodaHandlingFault.text}</p>
            </div>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/60">Site rules</h3>
            <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {bodaHandlingRules.map((r) => (
                <li key={r} className="flex gap-3 py-3 text-sm leading-relaxed text-white/80">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-300" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              We will not claim every e-boda pack works. The approved make for each site is named when that site is planned.
            </p>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="safeguards" eyebrow="Safeguards and monitoring" title="We do not hand out a pack we have not checked">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Safeguards</h3>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {bodaSafeguards.map((s) => (
                <li key={s.text} className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4">
                  <span className="text-sm leading-relaxed text-forest-800">{s.text}</span>
                  {s.ref ? (
                    <span className="font-mono text-[11px] text-forest-500 sm:text-right">
                      {s.ref}
                      {s.note ? <span className="block font-sans text-[11px]">{s.note}</span> : null}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Monitoring</h3>
            <dl className="mt-3 space-y-5">
              {bodaMonitoring.map((m) => (
                <div key={m.name} className="border-l-2 border-forest-200 pl-4">
                  <dt className="text-sm font-semibold text-forest-950">{m.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-forest-600">{m.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection
        id="hosts"
        tone="silver"
        eyebrow="Site hosts"
        title="You bring the site. We bring Boda Hub."
        lead={bodaHost.terms}
      >
        <StepFlow steps={bodaHost.steps} />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-2">
          <div className="bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-forest-950">You provide</h3>
            <ul className="mt-3 space-y-2.5">
              {bodaHost.youProvide.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-forest-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-forest-950">Precifarm provides</h3>
            <ul className="mt-3 space-y-2.5">
              {bodaHost.precifarmProvides.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-forest-700">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Good host sites</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {bodaHost.sites.map((s) => (
                <li key={s} className="rounded-full bg-white px-3 py-1.5 text-sm text-forest-800 ring-1 ring-border">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CalloutNote title="Before a cabinet opens">{bodaHost.regulatory}</CalloutNote>
            </div>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Roadmap</h3>
            <ol className="mt-3 divide-y divide-border border-y border-border">
              {bodaRoadmap.map((r, i) => (
                <li key={r.name} className="flex gap-4 py-3">
                  <span className="font-mono text-xs text-forest-500">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-semibold text-forest-950">{r.name}</p>
                    <p className="mt-0.5 text-sm text-forest-600">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </InteriorSection>

      <InteriorSection id="specification" eyebrow="Specification" title="Approved Boda Hub claims">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <SpecSheet groups={[{ rows: bodaSpecRows }]} source={bodaSpecSource} />
          <div>
            <h3 className="text-lg font-semibold text-forest-950">Common questions</h3>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {bodaHubFaqs.map((f) => (
                <details key={f.question} className="group py-1">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span aria-hidden className="text-forest-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-forest-600">{f.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-sm text-forest-600">
              Planned swap locations are on the{" "}
              <a href={bodaHubPaths.hub} className="font-semibold text-charge-700 underline-offset-2 hover:underline">
                Charging Hub map
              </a>
              , labelled planned.
            </p>
          </div>
        </div>
      </InteriorSection>
    </>
  );
}
