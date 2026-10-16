import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqAccordion from "@/components/seo/FaqAccordion";
import AgentStackDiagram from "@/components/research/diagrams/AgentStackDiagram";
import HubEnergyResearchDiagram from "@/components/research/diagrams/HubEnergyResearchDiagram";
import MilestoneTrack from "@/components/research/diagrams/MilestoneTrack";
import ResearchHeroVisual from "@/components/research/diagrams/ResearchHeroVisual";
import ResearchMethodPipeline from "@/components/research/diagrams/ResearchMethodPipeline";
import WirelessWptDiagram from "@/components/research/diagrams/WirelessWptDiagram";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  researchNavLabel,
  researchPage,
  researchPageFaqs,
  researchPath,
  researchProgrammes,
  researchReviewed,
  type ResearchProgramme,
} from "@/lib/research-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: researchNavLabel, href: researchPath },
];

function ProgrammeDiagram({ programmeId }: { programmeId: ResearchProgramme["id"] }) {
  if (programmeId === "wireless-ev") return <WirelessWptDiagram />;
  if (programmeId === "precifarm-agent") return <AgentStackDiagram />;
  return <HubEnergyResearchDiagram />;
}

function ProgrammeNav() {
  return (
    <nav aria-label="Research programmes" className="mt-8 flex flex-wrap gap-2">
      {researchProgrammes.map((programme) => (
        <a key={programme.id} href={`#${programme.id}`} className="btn-secondary text-sm">
          {programme.code} · {programme.title}
        </a>
      ))}
    </nav>
  );
}

export default function ResearchView() {
  const page = researchPage;

  return (
    <>
      <section className="page-hero border-b border-border">
        <div className="page-hero-split">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_minmax(300px,480px)] lg:gap-14">
            <div>
              <p className="text-eyebrow">{page.hero.eyebrow}</p>
              <h1 className="heading-display mt-3 text-[1.75rem] leading-[1.12] sm:text-3xl lg:text-4xl">
                {page.hero.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600 sm:text-lg">{page.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={page.hero.primaryCta.href} className="btn-primary">
                  {page.hero.primaryCta.label}
                </a>
                <Link href={page.hero.secondaryCta.href} className="btn-secondary">
                  {page.hero.secondaryCta.label}
                </Link>
              </div>
              <p className="mt-6 text-xs text-forest-500">Last reviewed {researchReviewed}.</p>
            </div>
            <ResearchHeroVisual />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.method.eyebrow} title={page.method.title} description={page.method.lead} />
          <ResearchMethodPipeline />
        </div>
      </section>

      <section id={page.programmes.id} className="scroll-mt-24 border-b border-border bg-muted/20 section-pad">
        <div className="page-container">
          <SectionHeader eyebrow={page.programmes.eyebrow} title={page.programmes.title} />
          <ProgrammeNav />

          <div className="mt-12 space-y-20">
            {researchProgrammes.map((programme) => (
              <article key={programme.id} id={programme.id} className="scroll-mt-24">
                <div className="lg:grid lg:grid-cols-[1fr_minmax(280px,440px)] lg:items-start lg:gap-12">
                  <div>
                    <p className="font-mono text-xs text-forest-500">
                      Programme {programme.code} · {programme.classification}
                    </p>
                    <h2 className="heading-display mt-2 text-2xl text-forest-900 sm:text-3xl">{programme.title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-forest-800">{programme.question}</p>
                    <p className="mt-3 text-sm leading-relaxed text-forest-600">{programme.overview}</p>

                    <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-forest-500">
                      What we are trying to learn
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {programme.objectives.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-forest-700">
                          <span className="text-charge-600" aria-hidden>
                            →
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 rounded-lg border border-border bg-white px-4 py-3 text-sm leading-relaxed text-forest-700">
                      <span className="font-semibold text-forest-900">Public evidence: </span>
                      {programme.evidence}
                    </p>
                  </div>
                  <div className="mt-8 lg:mt-0 lg:sticky lg:top-24">
                    <ProgrammeDiagram programmeId={programme.id} />
                  </div>
                </div>

                <MilestoneTrack milestones={programme.milestones} />

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {programme.links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-medium text-charge-700 hover:underline">
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white section-pad">
        <div className="page-container lg:grid lg:grid-cols-[1fr_minmax(280px,440px)] lg:items-center lg:gap-12">
          <SectionHeader
            eyebrow={page.collaboration.eyebrow}
            title={page.collaboration.title}
            description={page.collaboration.lead}
          />
          <div className="mt-8 lg:mt-0">
            <ul className="flex flex-wrap gap-2">
              {page.collaboration.areas.map((area) => (
                <li key={area} className="rounded-full border border-border bg-muted/30 px-3 py-1 text-sm text-forest-700">
                  {area}
                </li>
              ))}
            </ul>
            <Link href={page.collaboration.primaryHref} className="btn-primary mt-6 inline-flex">
              {page.collaboration.primaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 section-pad">
        <div className="page-container max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Common questions" />
          <div className="mt-8">
            <FaqAccordion items={researchPageFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
