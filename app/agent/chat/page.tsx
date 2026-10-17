import type { Metadata } from "next";
import Link from "next/link";
import AgentChat from "@/components/agent/AgentChat";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { agentPath } from "@/lib/agent-page";
import { agentPublic } from "@/lib/agent/public";

export const metadata: Metadata = {
  title: "Precifarm Agent Chat",
  description: "Design EV charging, solar, storage, cables and protection with Precifarm Agent. Ten engineering tools, a visible calculation trace and evidence labels on every number.",
  robots: { index: false, follow: true },
};

export default function AgentChatPage() {
  return (
    <section className="page-container section-pad">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Precifarm Agent", href: agentPath },
          { name: "Chat", href: agentPublic.chatPath },
        ]}
      />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="heading-display text-2xl sm:text-3xl">Agent workspace</h1>
          <p className="mt-2 max-w-xl text-sm text-forest-600">
            The Agent plans the job; engineering tools run every number. Open the calculation trace under each reply to audit it. Ask and Plan modes only.
          </p>
        </div>
        <Link href="/download" className="btn-secondary text-sm">
          Download OpenCode setup
        </Link>
      </div>
      <div className="mt-8">
        <AgentChat />
      </div>
    </section>
  );
}
