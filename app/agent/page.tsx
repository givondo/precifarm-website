import type { Metadata } from "next";
import AgentView from "@/components/agent/AgentView";
import JsonLd from "@/components/seo/JsonLd";
import { agentPath } from "@/lib/agent-page";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata(agentPath);

export default function AgentPage() {
  return (
    <>
      <JsonLd data={pageJsonLd(agentPath)} />
      <AgentView />
    </>
  );
}
