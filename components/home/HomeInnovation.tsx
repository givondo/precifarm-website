import Link from "next/link";
import { agentPage } from "@/lib/agent-page";
import { agentToolCatalogue } from "@/lib/agent/tools/engineering";
import { type ResearchArea, researchAreas, researchGates, researchPath } from "@/lib/research-page";

const gateName = Object.fromEntries(researchGates.map((g) => [g.id, g.name]));

const featuredAreas = researchAreas.filter((a) => a.id !== "precifarm-agent").slice(0, 3);

const exampleBrief = "3-bedroom house in Nairobi. Drives 80 km a day. Power cuts most weeks.";
const exampleResults = agentPage.heroMock.analysis.filter((row) => row.label !== "Status");

function pilotTarget(area: ResearchArea) {
  return area.milestones.find((m) => m.title.includes("(G3)"))?.when;
}

export default function HomeInnovation() {
  return (
    <section className="home-section border-b border-forest-900 bg-forest-900 text-white">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-charge-300">
            Software &amp; research
          </p>
          <h2 className="heading-display heading-inverted mt-3 text-2xl sm:text-3xl">
            Building what charges Africa next.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Design your charging and energy system with AI today. See the technology we are testing for tomorrow.
          </p>
        </div>

        <div className="home-section-grid mt-10 grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-charge-300">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#22c55e]" />
              Precifarm Agent · live
            </p>
            <h3 className="heading-display heading-inverted mt-3 text-xl sm:text-2xl">An energy engineer in your browser.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Describe your site. It sizes the charger, load and backup with {agentToolCatalogue.length} engineering
              tools, and labels every number so you can check it.
            </p>

            <figure className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
              <blockquote className="border-b border-white/10 px-4 py-3 text-sm leading-relaxed text-white/85">
                <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-white/50">Brief</span>
                {exampleBrief}
              </blockquote>
              <dl className="grid grid-cols-2">
                {exampleResults.map((row, i) => (
                  <div
                    key={row.label}
                    className={`px-4 py-3 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i >= 2 ? "border-t border-white/10" : ""}`}
                  >
                    <dt className="text-[11px] text-white/55">{row.label}</dt>
                    <dd className="mt-0.5 font-mono text-base font-semibold text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <figcaption className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-charge-300">
                Calculated by tools · reviewed by an engineer
              </figcaption>
            </figure>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
              <Link href="/agent#try" className="btn-primary">
                Try it now
              </Link>
              <Link href="/agent" className="text-sm font-semibold text-white hover:text-charge-300">
                How it works ›
              </Link>
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-charge-300">
              R&amp;D · {researchAreas.length} programmes
            </p>
            <h3 className="heading-display heading-inverted mt-3 text-xl sm:text-2xl">
              Tomorrow&apos;s charging and storage, tested in Kenya.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Each programme has a measurable goal and a dated path from lab bench to a Kenyan field pilot.
            </p>

            <ul className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10">
              {featuredAreas.map((area) => {
                const pilot = pilotTarget(area);
                return (
                  <li key={area.id}>
                    <Link href={`${researchPath}#${area.id}`} className="group block px-4 py-3.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-white group-hover:text-charge-300">{area.title}</span>
                        <span aria-hidden className="text-white/40 group-hover:text-charge-300">
                          ›
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
                        <div className="h-full rounded-full bg-charge-500" style={{ width: `${area.progress}%` }} />
                      </div>
                      <p className="mt-1.5 flex justify-between gap-3 font-mono text-[11px] text-white/55">
                        <span>
                          {gateName[area.workingTowards]} stage · {area.progress}%
                        </span>
                        {pilot ? <span>Pilot {pilot}</span> : null}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
              <Link href={researchPath} className="btn-primary">
                See all research
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-white hover:text-charge-300">
                Partner with us ›
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
