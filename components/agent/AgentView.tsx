import Link from "next/link";
import AgentExampleDemo from "@/components/agent/AgentExampleDemo";
import AgentWorkflowStrip from "@/components/agent/AgentWorkflowStrip";
import AgentWorkspaceMock from "@/components/agent/AgentWorkspaceMock";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import PageCTA from "@/components/ui/PageCTA";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  agentPage,
  agentPageFaqs,
  agentPath,
  agentStatusNote,
} from "@/lib/agent-page";

export default function AgentView() {
  const p = agentPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-container pt-6 sm:pt-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Precifarm Agent", href: agentPath },
            ]}
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 pb-10 sm:pb-12">
            <div className="max-w-xl">
              <p className="text-eyebrow">{p.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.85rem] leading-[1.08] sm:text-4xl lg:text-[2.65rem]">
                {p.hero.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-forest-600 sm:text-[1.05rem]">
                {p.hero.subhead}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={p.hero.primaryCta.href} className="btn-primary">
                  {p.hero.primaryCta.label}
                </Link>
                <Link href={p.hero.secondaryCta.href} className="btn-secondary">
                  {p.hero.secondaryCta.label}
                </Link>
              </div>
              <p className="mt-5 text-xs text-forest-400">
                {agentStatusNote}{" "}
                <Link href="/download" className="underline underline-offset-2 hover:text-forest-600">
                  Request access
                </Link>
              </p>
            </div>
            <AgentWorkspaceMock />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow={p.differentiation.eyebrow}
            title={p.differentiation.title}
            description={p.differentiation.body}
          />
          <AgentWorkflowStrip />
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={p.workflow.eyebrow} title={p.workflow.title} />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {p.workflow.steps.map((step) => (
              <li key={step.n} className="bg-white p-5 sm:p-6">
                <p className="font-mono text-[11px] text-charge-600">{step.n}</p>
                <h3 className="mt-2 text-base font-semibold text-forest-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={p.capabilities.eyebrow} title={p.capabilities.title} />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {p.capabilities.cards.map((card) => (
              <article key={card.title} className="bg-white p-5 sm:p-6">
                <h3 className="text-base font-semibold text-forest-900">{card.title}</h3>
                <ul className="mt-4 space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="text-sm text-forest-600">
                      · {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[#0c0f12] section-pad text-white">
        <div className="page-container">
          <SectionHeader
            inverted
            eyebrow={p.kernel.eyebrow}
            title={p.kernel.title}
            description={p.kernel.lead}
          />
          <ol className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
            {p.kernel.pipeline.map((node, i) => (
              <li key={node} className="flex items-center gap-2 sm:gap-3">
                <span className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-white/85 sm:text-xs">
                  {node}
                </span>
                {i < p.kernel.pipeline.length - 1 && (
                  <span className="text-white/30" aria-hidden>
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.kernel.tools.map((tool) => (
              <div
                key={tool.fn}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-charge-300">
                  {tool.label}
                </p>
                <p className="mt-2 font-mono text-sm text-white/90">{tool.fn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="example" className="scroll-mt-24 border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={p.example.eyebrow} title={p.example.title} />
          <AgentExampleDemo />
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader
            eyebrow={p.trust.eyebrow}
            title={p.trust.title}
            description={p.trust.body}
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {p.trust.labels.map((label) => (
              <li
                key={label}
                className="rounded-md border border-border bg-muted/25 px-3 py-1.5 font-mono text-[11px] text-forest-700"
              >
                {label}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-forest-600">{p.trust.note}</p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Common questions." />
          <div className="mt-8">
            <FaqAccordion items={[...agentPageFaqs]} />
          </div>
        </div>
      </section>

      <PageCTA
        title={p.cta.title}
        description={`${p.cta.description} ${p.cta.finalLine}`}
        primaryHref={p.cta.primaryHref}
        primaryLabel={p.cta.primaryLabel}
        secondaryHref={p.cta.secondaryHref}
        secondaryLabel={p.cta.secondaryLabel}
      />
    </>
  );
}
