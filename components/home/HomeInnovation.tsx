import Link from "next/link";
import AgentWorkspaceDemo from "@/components/home/AgentWorkspaceDemo";
import WirelessSimulation from "@/components/home/WirelessSimulation";
import { researchPath } from "@/lib/research-page";

/**
 * Software and research, shown working (HD-049): the Agent runs a real calculation with its
 * trace; wireless charging runs as a labelled research simulation, not operational hardware.
 */
export default function HomeInnovation() {
  return (
    <section className="home-section border-b border-forest-900 bg-forest-900 text-white" aria-labelledby="home-innovation-title">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-charge-300">Software &amp; research</p>
          <h2 id="home-innovation-title" className="heading-display heading-inverted mt-3 text-2xl sm:text-3xl">
            Building what charges Africa next.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Design your charging system with AI today. See the technology we are developing for tomorrow.
          </p>
        </div>

        <div className="home-section-grid mt-10 grid gap-4 lg:grid-cols-2">
          <article className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-charge-300">Precifarm Agent</p>
            <h3 className="heading-display heading-inverted mt-3 text-xl sm:text-2xl">Interactive engineering workspace.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Change the brief and watch the engineering tools work it through: energy, charge time, protection and cable,
              with every step in the trace.
            </p>
            <AgentWorkspaceDemo />
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
              <Link href="/agent#try" className="btn-primary">
                Try Precifarm Agent
              </Link>
              <Link href="/agent" className="text-sm font-semibold text-white hover:text-charge-300">
                How it works ›
              </Link>
            </div>
          </article>

          <article className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-charge-300">Wireless EV charging</p>
            <h3 className="heading-display heading-inverted mt-3 text-xl sm:text-2xl">Interactive R&amp;D simulation.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Park over the charging pad and slide the car off-centre to see coil alignment, energy transfer and what
              happens when the car is misaligned.
            </p>
            <WirelessSimulation />
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-8">
              <Link href={`${researchPath}#wireless-ev`} className="btn-primary">
                See the research
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
