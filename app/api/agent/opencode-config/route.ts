import { NextResponse } from "next/server";
import { agentRuntime } from "@/lib/agent/config";
import { agentPublic } from "@/lib/agent/public";

/** OpenCode starter config — DeepSeek V4 Flash provider (user adds API key locally). */
export async function GET() {
  const config = {
    $schema: "https://opencode.ai/config.schema.json",
    name: "Precifarm Agent",
    description: "EV charging and energy design — DeepSeek V4 Flash via OpenCode",
    model: agentRuntime.model,
    provider: {
      deepseek: {
        baseURL: agentRuntime.deepseekBaseUrl,
        model: agentRuntime.model,
      },
    },
    instructions: [
      "Use Precifarm engineering tools for numeric work when available.",
      "Label outputs: calculated, estimated, assumed, needs site check.",
      "Commercial products: Pulse, Pod, Spark, Depot, Boda Hub, Corridor — wireless pads are R&D only.",
    ],
    links: {
      product: "https://precifarm.com/agent",
      chat: `https://precifarm.com${agentPublic.chatPath}`,
      knowledgeTools: "https://precifarm.com/api/knowledge/tools",
    },
  };

  return NextResponse.json(config, {
    headers: {
      "Content-Disposition": 'attachment; filename="precifarm-agent.opencode.json"',
    },
  });
}
