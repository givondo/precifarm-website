import { appBrand, appDownload } from "@/lib/app-download";
import type { FaqItem } from "@/lib/seo/types";

export const downloadPageFaqs: FaqItem[] = [
  {
    question: "How do I use Precifarm Agent right now?",
    answer:
      "Open the web workspace at precifarm.com/agent/chat — powered by DeepSeek V4 Flash with Precifarm engineering calculators on the server.",
  },
  {
    question: "What is OpenCode and why download it?",
    answer:
      "OpenCode is an open-source agentic coding assistant. Precifarm publishes a starter config so you can run the same DeepSeek V4 Flash model locally with /connect → deepseek and your own API key.",
  },
  {
    question: "Which DeepSeek model should I select?",
    answer:
      "Use deepseek-v4-flash (or deepseek-flash on the latest API) for fast agent work. Precifarm’s web agent uses V4 Flash by default.",
  },
  {
    question: "Is the native desktop installer available?",
    answer:
      "Windows and macOS use the OpenCode + Precifarm config bundle today. A packaged Precifarm desktop app is on the roadmap — request access if you need enterprise rollout.",
  },
  {
    question: "Can I try it without an API key?",
    answer:
      "The web workspace uses Precifarm’s server key in production. Local OpenCode requires your own DeepSeek API key from platform.deepseek.com.",
  },
];

const platformStatusLabel: Record<(typeof appDownload.platforms)[number]["status"], string> = {
  available: "Available now",
  setup: "OpenCode setup",
  early_access: "Early access",
};

export const downloadPage = {
  hero: {
    eyebrow: `${appBrand.fullName} · Download`,
    title: "Run Precifarm Agent — web, OpenCode, or Android.",
    lead: "DeepSeek V4 Flash for fast agentic design. Use the browser workspace now, or install OpenCode locally with our config.",
    primaryLabel: "Open web workspace",
    primaryHref: appDownload.webChatHref,
    secondaryLabel: "Download OpenCode config",
    secondaryHref: appDownload.opencodeConfigHref,
    meta: `v${appDownload.version} · ${appDownload.deepseekModel} · OpenCode compatible`,
  },
  capabilities: {
    eyebrow: "Stack",
    title: "OpenCode + DeepSeek V4 Flash.",
    items: [
      {
        title: "Web workspace",
        text: "Chat at /agent/chat — Precifarm system prompt, tool kernel, and V4 Flash on our server.",
      },
      {
        title: "Local OpenCode",
        text: "Install OpenCode ≥ v1.14.24, /connect deepseek, import precifarm-agent.opencode.json.",
      },
      {
        title: "Engineering tools",
        text: "EV energy, charge time, peak load, battery size, and tariff cost — not LLM guesswork.",
      },
      {
        title: "Evidence labels",
        text: "Calculated, estimated, assumed, and needs site check on every design output.",
      },
    ],
  },
  platforms: {
    eyebrow: "Platforms",
    title: "Choose how you run the Agent.",
    description: "Web is the fastest start. OpenCode is for offline project folders and power users.",
    items: appDownload.platforms.map((p) => ({
      label: p.label,
      status: platformStatusLabel[p.status] ?? p.status,
      href: p.id === "web" ? appDownload.webChatHref : undefined,
    })),
  },
  setup: {
    eyebrow: "OpenCode setup",
    title: "Three steps on your machine.",
    steps: [
      "Install OpenCode from opencode.ai (version ≥ 1.14.24).",
      "Run opencode, type /connect, choose deepseek, paste your DeepSeek API key.",
      "Download precifarm-agent.opencode.json and merge instructions into your OpenCode config.",
    ],
    configHref: appDownload.opencodeConfigHref,
    docsHref: appDownload.opencodeDocsUrl,
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions.",
    items: downloadPageFaqs,
  },
  cta: {
    title: "Start in the browser or go local.",
    description: "Web workspace for instant sizing. OpenCode when you want the agent in your repo.",
    primaryHref: appDownload.webChatHref,
    primaryLabel: "Open workspace",
    secondaryHref: appDownload.productHref,
    secondaryLabel: "Product overview",
  },
} as const;
