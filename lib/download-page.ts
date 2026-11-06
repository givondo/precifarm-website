/**
 * /download: how to use Precifarm Agent on each platform, with verified availability only.
 * Cloud only (HD-043): every option uses hosted models through their providers' APIs. A download
 * button appears only where a real file exists today (the OpenCode configuration served by
 * /api/agent/opencode-config). No native Android or desktop installer is published on this site.
 */

import { appBrand, appDownload } from "@/lib/app-download";
import { agentToolCatalogue } from "@/lib/agent/tools/engineering";
import type { FaqItem } from "@/lib/seo/types";

export const downloadPageFaqs: FaqItem[] = [
  {
    question: "How do I use Precifarm Agent right now?",
    answer:
      "Open the web workspace at precifarm.com/agent/chat in any modern browser, on a computer or an Android phone. It runs on DeepSeek V4 Flash with the Precifarm engineering tools on our server.",
  },
  {
    question: "Is there an Android app to download?",
    answer:
      "Not as a public download. On Android, use the web workspace in Chrome; you can add it to your home screen from the browser menu. A packaged Android build is shared on request.",
  },
  {
    question: "What is the desktop option?",
    answer:
      "OpenCode, an open-source agent for the terminal, with a Precifarm configuration file you download here. It uses the hosted DeepSeek model with your own API key. The Precifarm calculation tools and trace run in the web workspace only.",
  },
  {
    question: "Does any option run an AI model on my computer or phone?",
    answer:
      "No. Every option sends your brief to a hosted model provider over the internet. Nothing downloads or runs a model on your device, so there is no GPU or large install to manage.",
  },
  {
    question: "Can I try it without an API key?",
    answer:
      "Yes, in the web workspace, which uses Precifarm's server key with a fair-use limit. OpenCode needs your own DeepSeek API key from platform.deepseek.com.",
  },
];

export type PlatformStatus = "available" | "setup" | "on-request";

export type PlatformOption = {
  id: "web" | "android" | "desktop";
  name: string;
  devices: string;
  status: PlatformStatus;
  statusLabel: string;
  summary: string;
  gets: readonly string[];
  needs: readonly string[];
  primary: { href: string; label: string; kind: "link" | "file" };
  secondary?: { href: string; label: string };
};

export const platformOptions: readonly PlatformOption[] = [
  {
    id: "web",
    name: "Web workspace",
    devices: "Any modern browser on Windows, macOS, Linux or Android",
    status: "available",
    statusLabel: "Available now",
    summary: `The full Agent: planning, the ${agentToolCatalogue.length}-tool engineering kernel and a calculation trace on every reply.`,
    gets: ["Ask and Plan modes", "Engineering tools and evidence labels", "No install, no API key"],
    needs: ["An internet connection"],
    primary: { href: appDownload.webChatHref, label: "Open the web workspace", kind: "link" },
    secondary: { href: appDownload.productHref, label: "See how it works" },
  },
  {
    id: "android",
    name: "Android",
    devices: "Android phones and tablets",
    status: "available",
    statusLabel: "In the browser today",
    summary: "Use the web workspace in Chrome and add it to your home screen. A packaged Android build is shared on request; it is not published for download.",
    gets: ["The same workspace as on a computer", "Works on mobile data"],
    needs: ["Chrome or another current browser"],
    primary: { href: appDownload.webChatHref, label: "Open on this phone", kind: "link" },
    secondary: { href: appDownload.requestAccessHref, label: "Request the Android build" },
  },
  {
    id: "desktop",
    name: "Desktop terminal",
    devices: "Windows, macOS and Linux through OpenCode",
    status: "setup",
    statusLabel: "OpenCode setup",
    summary: "Run the Agent's instructions in OpenCode with the hosted DeepSeek model. For engineers who work in project folders.",
    gets: ["Precifarm instructions and evidence labels", "Your project files in the terminal"],
    needs: ["OpenCode 1.14.24 or later", "Your own DeepSeek API key", "Calculation tools and trace stay on the web workspace"],
    primary: { href: appDownload.opencodeConfigHref, label: "Download configuration (.json)", kind: "file" },
    secondary: { href: appDownload.requestAccessHref, label: "Request a packaged desktop app" },
  },
] as const;

export const platformComparison = {
  columns: ["Web workspace", "Android", "Desktop terminal"] as const,
  rows: [
    { label: "Install", values: ["None", "None (browser)", "OpenCode plus a config file"] },
    { label: "Account or key", values: ["None", "None", "Your DeepSeek API key"] },
    { label: "Model", values: ["DeepSeek V4 Flash, hosted", "DeepSeek V4 Flash, hosted", "DeepSeek V4 Flash, hosted"] },
    { label: "Engineering tools and trace", values: ["Yes", "Yes", "No, web only"] },
    { label: "Status", values: ["Available now", "Browser today; packaged build on request", "Setup available; packaged app on request"] },
  ],
} as const;

export const downloadPage = {
  hero: {
    eyebrow: `${appBrand.fullName} · Platforms`,
    title: "Use Precifarm Agent on the web, your phone or a desktop terminal.",
    lead: "Three verified ways in today. Every one runs on hosted models in the cloud: nothing installs or runs an AI model on your device.",
    meta: `Web workspace v${appDownload.version} · ${appDownload.deepseekModel}`,
  },
  platforms: {
    id: "platforms",
    eyebrow: "Platforms",
    title: "Choose how you run the Agent.",
    lead: "Web is the fastest start and the only option with the engineering tools today.",
  },
  compare: {
    id: "compare",
    eyebrow: "Compare",
    title: "What each option gives you.",
  },
  setup: {
    id: "desktop-setup",
    eyebrow: "Desktop setup",
    title: "OpenCode in three steps.",
    steps: [
      { title: "Install OpenCode", text: "From opencode.ai, version 1.14.24 or later, on Windows, macOS or Linux." },
      { title: "Connect DeepSeek", text: "Run opencode, type /connect, choose deepseek and paste your DeepSeek API key." },
      { title: "Add the Precifarm config", text: "Download precifarm-agent.opencode.json and merge its instructions into your OpenCode config." },
    ],
    configHref: appDownload.opencodeConfigHref,
    docsHref: appDownload.opencodeDocsUrl,
  },
  data: {
    title: "Where your brief goes",
    text: "In the web workspace, your messages pass through Precifarm's server to the hosted model provider, and the engineering tools run on our server. In OpenCode, your messages go from your computer straight to DeepSeek with your key. Do not paste passwords or personal data you would not share with a cloud service.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions.",
    items: downloadPageFaqs,
  },
} as const;
