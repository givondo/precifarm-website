import { InPageNav, InteriorHero, InteriorSection, MediaFrame, SpecSheet, StageLabel, StepFlow } from "@/components/interior";
import ArcDispenserExplorer from "@/components/arc/ArcDispenserExplorer";
import ArcElectricalDiagram from "@/components/arc/ArcElectricalDiagram";
import ArcHostChecklist from "@/components/arc/ArcHostChecklist";
import ArcTierExplorer from "@/components/arc/ArcTierExplorer";
import {
  arcEnquiryHref,
  arcFaqs,
  arcHero,
  arcHostSteps,
  arcImages,
  arcNav,
  arcPath,
  arcSpecGroups,
  arcSpecSource,
  arcStatusLedger,
  arcTiers,
} from "@/lib/pages/arc-corridor";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Charging", href: "/charging" },
  { name: "ARC Corridor", href: arcPath },
];

export default function ArcCorridorView() {
  return (
    <>
      <InteriorHero
        eyebrow={arcHero.eyebrow}
        title={arcHero.title}
        lead={arcHero.lead}
        breadcrumbs={breadcrumbs}
        stage="pilot"
        actions={[
          { href: arcEnquiryHref, label: "Host an ARC Corridor site" },
          { href: "#configurations", label: "Station configurations", variant: "secondary" },
        ]}
        media={{ src: arcImages.dispenser.src, alt: arcImages.dispenser.alt, fit: "cover", stage: "illustrative" }}
        facts={arcHero.facts}
      />

      <InPageNav links={arcNav} />

      {/* What is real today */}
      <InteriorSection
        id="status"
        eyebrow="Status"
        title="Certified hardware, a proposed design, no sites yet"
        lead="Three things are easy to confuse on a page full of renders. This is where each one stands."
      >
        <ol className="divide-y divide-border overflow-hidden rounded-2xl ring-1 ring-border">
          {arcStatusLedger.map((row, i) => (
            <li key={row.title} className="grid gap-3 bg-white px-4 py-5 sm:px-6 md:grid-cols-[3rem_minmax(0,14rem)_minmax(0,1fr)] md:items-start md:gap-6">
              <span className="font-mono text-xs font-semibold text-forest-400">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col items-start gap-2">
                <h3 className="text-base font-semibold text-forest-950">{row.title}</h3>
                <StageLabel kind={row.stage} />
              </div>
              <div>
                <p className="text-[15px] leading-relaxed text-forest-700">{row.body}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-forest-500">{row.source}</p>
              </div>
            </li>
          ))}
        </ol>
      </InteriorSection>

      {/* Dispenser */}
      <InteriorSection
        id="dispenser"
        tone="graphite"
        eyebrow="The ARC dispenser"
        title="Two cables, two holders, one clear screen"
        lead="Precifarm's dispenser design for Corridor sites: a silver column with a floating crown, a cable and holder on each side, and the session screen and emergency stop on a dark front panel."
      >
        <ArcDispenserExplorer />

        <div className="mt-12 grid gap-5 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] sm:items-start">
          <MediaFrame
            src={arcImages.crownDetail.src}
            alt={arcImages.crownDetail.alt}
            aspect="aspect-[18/13]"
            stage="illustrative"
            caption="Crown detail, render R02. The cap sits on a recessed light band above the front panel."
            sizes="(max-width: 640px) 100vw, 60vw"
            className="[&_figcaption]:text-white/55"
          />
          <MediaFrame
            src={arcImages.day.src}
            alt={arcImages.day.alt}
            aspect="aspect-[160/194]"
            stage="illustrative"
            caption="Daylight view, render R02. Both cables loop down from their holders to the island."
            sizes="(max-width: 640px) 100vw, 40vw"
            className="[&_figcaption]:text-white/55"
          />
        </div>
      </InteriorSection>

      {/* Station configurations */}
      <InteriorSection
        id="configurations"
        tone="silver"
        eyebrow="Proposed station configurations"
        title="ARC 120, ARC 240/360 and ARC 600+"
        lead="The same dispenser and canopy language at three scales. Choose a configuration to see the render and its bay plan."
        aside={<StageLabel kind="proposed" />}
      >
        <ArcTierExplorer />

        <div className="mt-10 overflow-hidden rounded-2xl bg-white ring-1 ring-border">
          <table className="w-full text-left text-sm">
            <caption className="caption-bottom border-t border-border px-4 py-3 text-left text-xs text-forest-500 sm:px-5">
              All four are proposed configurations, counted from the R03 renders. None is installed.
            </caption>
            <thead className="bg-[#f6f7f8] text-[11px] uppercase tracking-widest text-forest-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Configuration</th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Dispenser islands</th>
                <th scope="col" className="px-4 py-3 font-semibold sm:px-5">Marked bays</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {arcTiers.flatMap((t) =>
                t.variants.map((v) => (
                  <tr key={v.id}>
                    <th scope="row" className="px-4 py-3 font-semibold text-forest-900 sm:px-5">{v.label}</th>
                    <td className="px-4 py-3 font-mono text-forest-700 sm:px-5">{v.layout.dispensers}</td>
                    <td className="px-4 py-3 font-mono text-forest-700 sm:px-5">{v.layout.bays}</td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
          <MediaFrame
            src={arcImages.eyeLevel.src}
            alt={arcImages.eyeLevel.alt}
            aspect="aspect-[16/9]"
            stage="proposed"
            caption="ARC 240 at eye level under the canopy, render R03."
          />
          <div>
            <h3 className="text-lg font-semibold text-forest-950">Designed for Kenyan forecourts</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-forest-600">
              Every configuration keeps the same pattern: dispensers on raised islands with bollards, a bay on each side of every island, a canopy over the
              bays and the electrical equipment in a yard behind them, away from traffic. Precifarm engineers the grid connection, protection, bay layout,
              signage and operations around each site.
            </p>
          </div>
        </div>
      </InteriorSection>

      {/* Electrical */}
      <InteriorSection
        id="electrical"
        tone="graphite"
        eyebrow="Electrical architecture"
        title="From the Kenya Power supply to the car"
        lead="AC from the grid is stepped down and protected on site, converted to DC in the certified OEM power cabinet and delivered through the ARC dispensers. Sessions and M-Pesa payment run on a separate control layer."
      >
        <ArcElectricalDiagram />
      </InteriorSection>

      {/* Host a site */}
      <InteriorSection
        id="host"
        eyebrow="For site hosts"
        title="Host an ARC Corridor site"
        lead="Fuel stations, malls and roadside stops on busy routes. Every site starts with a free survey and a power study with Kenya Power before anything is committed."
      >
        <StepFlow steps={arcHostSteps} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-4 text-[15px] leading-relaxed text-forest-600">
            <h3 className="text-lg font-semibold text-forest-950">What a host provides, and what Precifarm does</h3>
            <p>
              You bring a site with space for the dispensers, their bays and the switchgear, with safe vehicle access. Precifarm brings the certified charger,
              the engineering around it and the operations that keep it running.
            </p>
            <p>
              The grid connection is sized per site, and storage is considered only where the Kenya Power study shows the grid cannot meet demand. Charging
              speed always depends on the car.
            </p>
          </div>
          <ArcHostChecklist />
        </div>
      </InteriorSection>

      {/* Specification */}
      <InteriorSection
        id="specification"
        tone="silver"
        eyebrow="Specification"
        title="Approved Corridor claims"
        lead="Every figure on this page comes from the approved engineering register. Anything not listed here is not yet a published figure."
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <SpecSheet groups={arcSpecGroups} source={arcSpecSource} />
          <div>
            <h3 className="text-lg font-semibold text-forest-950">Common questions</h3>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {arcFaqs.map((f) => (
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
          </div>
        </div>
      </InteriorSection>
      {/* The shared footer carries the ARC Corridor site-host call to action for this route. */}
    </>
  );
}
