import Link from "next/link";
import { agentToolCatalogue } from "@/lib/agent/tools/engineering";
import { researchAreas, researchPath } from "@/lib/research-page";

const featuredAreas = researchAreas.slice(0, 3);

export default function HomeInnovation() {
  return (
    <section className="home-section border-b border-forest-900 bg-forest-900 text-white">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-charge-300">Innovation</p>
          <h2 className="heading-display mt-3 text-2xl text-white sm:text-3xl">
            Building what charges Africa next.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            An AI engineer that designs EV charging and energy systems today, and a research programme for the
            charging technology of tomorrow.
          </p>
        </div>

        <div className="home-section-grid mt-10 grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-charge-300">
                Precifarm Agent · live in early access
              </p>
            </div>
            <h3 className="heading-display mt-3 text-xl text-white sm:text-2xl">Your AI electrical and energy engineer.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Give it a brief. It plans the design, runs real engineering tools for every number and labels each
              result, so you can check it before an engineer signs off.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Engineering tools">
              {agentToolCatalogue.map((tool) => (
                <li
                  key={tool.name}
                  className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/80"
                >
                  {tool.label}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
              <Link href="/agent#try" className="btn-primary">
                Try the Agent
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
            <h3 className="heading-display mt-3 text-xl text-white sm:text-2xl">
              The future of electric mobility, engineered in Africa.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Wireless charging for e-bodas and cars, hub solar and storage, battery second life and more, each
              with a measurable goal and a dated path to a Kenyan field pilot.
            </p>
            <ul className="mt-6 space-y-4">
              {featuredAreas.map((area) => (
                <li key={area.id}>
                  <Link href={`${researchPath}#${area.id}`} className="group block">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-white group-hover:text-charge-300">{area.title}</span>
                      <span className="font-mono text-[11px] text-white/60">
                        {area.progress}% to {area.workingTowards}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
                      <div className="h-full rounded-full bg-charge-500" style={{ width: `${area.progress}%` }} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
              <Link href={researchPath} className="btn-primary">
                Explore R&amp;D
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-white hover:text-charge-300">
                Collaborate with us ›
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
