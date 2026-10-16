/** Precifarm Agent — download & access metadata. */

import { agentPublic } from "@/lib/agent/public";

export const appBrand = {
  shortName: "Agent",
  fullName: "Precifarm Agent",
} as const;

export const appDownload = {
  version: "1.0.0",
  platform: "desktop" as const,
  /** Browser workspace — DeepSeek V4 Flash on server */
  webChatAvailable: true,
  webChatHref: agentPublic.chatPath,
  pageHref: "/download",
  productHref: "/agent",
  requestAccessHref: "/contact?interest=agent-desktop",
  opencodeConfigHref: agentPublic.setupConfigPath,
  opencodeDocsUrl: "https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/",
  deepseekModel: "deepseek-v4-flash",
  platforms: [
    { id: "web", label: "Web workspace", status: "available" as const },
    { id: "windows", label: "Windows · OpenCode", status: "setup" as const },
    { id: "macos", label: "macOS · OpenCode", status: "setup" as const },
    { id: "android", label: "Android", status: "early_access" as const },
  ],
} as const;
