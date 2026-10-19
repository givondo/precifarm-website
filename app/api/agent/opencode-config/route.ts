import { NextResponse } from "next/server";
import { agentPublic } from "@/lib/agent/public";

const OPENCODE_DEEPSEEK_MODEL = "deepseek-v4-flash";
/** Public endpoint only: never echo server env (a private gateway URL) to anonymous visitors. */
const DEEPSEEK_PUBLIC_BASE_URL = "https://api.deepseek.com";

/** OpenCode starter config: DeepSeek V4 Flash provider (user adds their own API key locally). No secrets. */
export async function GET() {
  const config = {
    $schema: "https://opencode.ai/config.schema.json",
    name: "Precifarm Agent",
    description: "EV charging and energy design: DeepSeek V4 Flash via OpenCode",
    model: OPENCODE_DEEPSEEK_MODEL,
    provider: {
      deepseek: {
        baseURL: DEEPSEEK_PUBLIC_BASE_URL,
        model: OPENCODE_DEEPSEEK_MODEL,
      },
    },
    instructions: [
      "Use Precifarm engineering tools for numeric work when available.",
      "Label outputs: calculated, estimated, assumed, needs site check.",
      "Commercial products: Pulse, Pod, Spark, Depot, Boda Hub, Corridor. Wireless pads are R&D only.",
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
