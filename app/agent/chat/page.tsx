import type { Metadata } from "next";
import Link from "next/link";
import AgentChat from "@/components/agent/AgentChat";
import EvidenceChip, { evidenceMeaning } from "@/components/agent/EvidenceChip";
import StageLabel from "@/components/interior/StageLabel";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { agentPath, agentStatusNote } from "@/lib/agent-page";
import { agentPublic } from "@/lib/agent/public";
import { agentToolCatalogue, type EvidenceLabel } from "@/lib/agent/tools/engineering";

export const metadata: Metadata = {
  title: "Precifarm Agent Workspace",
  description: `Design EV charging, solar, storage, cables and protection with Precifarm Agent. ${agentToolCatalogue.length} engineering tools, a visible calculation trace and evidence labels on every number.`,
  robots: { index: false, follow: true },
};

const evidenceOrder: EvidenceLabel[] = ["calculated", "estimated", "assumed", "needs site check"];

export default async function AgentChatPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const raw = (await searchParams).brief;
  const brief = (Array.isArray(raw) ? raw[0] : raw)?.slice(0, 2000) ?? "";

  return (
    <section className="bg-forest-950 text-white">
      <div className="interior-container py-6 sm:py-8">
        <Breadcrumbs
          inverted
          items={[
            { name: "Home", href: "/" },
            { name: "Precifarm Agent", href: agentPath },
            { name: "Workspace", href: agentPublic.chatPath },
          ]}
        />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Precifarm Agent</p>
              <StageLabel kind="available" label="Live" tone="dark" />
            </div>
            <h1 className="heading-display heading-inverted mt-3 text-2xl sm:text-3xl">Agent workspace</h1>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              The Agent plans the job; engineering tools run every number. Open the calculation trace under each reply to audit it.{" "}
              {brief ? "Your brief from the demonstration is ready to send." : null}
            </p>
          </div>
          <Link href="/download" className="hidden min-h-11 items-center rounded-full border border-white/25 px-5 sm:inline-flex text-sm font-semibold text-white hover:border-white/50">
            Web, Android and desktop
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-8">
          <div className="min-w-0">
            <AgentChat initialInput={brief} />
          </div>
          <aside className="space-y-6 text-sm" aria-label="How to read the workspace">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Evidence labels</p>
              <dl className="mt-3 space-y-3">
                {evidenceOrder.map((l) => (
                  <div key={l}>
                    <dt>
                      <EvidenceChip label={l} />
                    </dt>
                    <dd className="mt-1 text-[12.5px] leading-snug text-white/65">{evidenceMeaning[l]}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Tools the Agent can call</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {agentToolCatalogue.map((t) => (
                  <li key={t.name} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/75">
                    {t.label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12.5px] leading-snug text-white/60">{agentStatusNote}. Your brief goes to the hosted model provider; nothing runs on your device.</p>
            </div>
            <Link href={`${agentPath}#workspace`} className="inline-flex min-h-11 items-center text-sm font-semibold text-white/85 hover:text-white">
              See a worked demonstration <span aria-hidden className="ml-1">›</span>
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
