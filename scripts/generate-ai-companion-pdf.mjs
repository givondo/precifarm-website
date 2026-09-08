/**
 * PF-COPILOT-001 — Precifarm Agent product sheet (HTML + PDF).
 * Aligned with /download and docs/agents/PRECIFARM_COPILOT.md.
 *
 * Usage: node scripts/generate-ai-companion-pdf.mjs
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BRAND,
  brandDocFooterHtml,
  brandPageHeadHtml,
  brandPrintCss,
  brandPrintFooterHtml,
  brandToolbarHtml,
  escapeHtml,
  printHtmlToPdf,
} from "./lib/document-brand.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const downloadsDir = join(root, "public", "downloads");
const assetDir = join(downloadsDir, "ai-companion");
const htmlOut = join(downloadsDir, "precifarm-ai-companion.html");
const pdfOut = join(downloadsDir, "precifarm-ai-companion.pdf");

const DOC = {
  id: "PF-COPILOT-001",
  version: "2.0",
  status: "Product sheet",
  date: "4 September 2026",
  pages: 4,
  liveUrl: "/download",
  hubUrl: "/hub",
  apk: "precifarm.apk",
  packageId: "com.precifarm.mobile",
  appVersion: "1.0.0",
  minAndroid: "8.0",
  title: "Precifarm Agent — Mobility & Energy Companion",
};

const MODES = [
  ["Ask", "Questions answered. No side effects.", "Can I make it to Nairobi on 38%?"],
  ["Plan", "Route, charging stops, cost and timing.", "Get me to Kisumu by 5 PM tomorrow."],
  ["Act", "Navigate, charge or pay — after you approve.", "Charge now at the Corridor hub."],
  ["Auto", "Your rules only — never silent payments.", "Prepare 80% before weekday 7 AM departures."],
];

const CAPABILITIES = [
  ["Charging Hub", "Live", "Precifarm, EVChaja, ChargeNet and partners — honest live and planned labels."],
  ["Trip + charge planner", "Rolling out", "Destination, stops, arrival SOC, cost and why this plan."],
  ["Battery brain", "Rolling out", "Can I make it? — range bands with assumptions shown."],
  ["Payment", "Live", "M-Pesa, USSD and SMS. Price shown before PIN."],
  ["Home energy planner", "Roadmap", "Solar, Pod, Pulse, EV and grid orchestration."],
  ["Fleet planner", "Roadmap", "Depot priority, SOC, cost and downtime for fleets."],
];

const LIVE = [
  "Charging Hub with live and planned site labels",
  "Home Pulse and Pod energy storage surveys",
  "M-Pesa session pay and Lipa Pole Pole instalments",
];

const NEXT = [
  "Command-centre home with proactive charging suggestions",
  "Ask · Plan · Act modes and trip planner",
  "Trust centre — what Precifarm Agent knows, estimated and did",
];

const DATA_STATUS = [
  ["LIVE", "Verified now — source and timestamp shown"],
  ["RECENT", "Observed recently; may have changed"],
  ["ESTIMATED", "Model or heuristic — assumptions listed"],
  ["PLANNED", "Announced — not operational yet"],
  ["UNKNOWN", "No reliable source yet"],
];

const FAQS = [
  [
    "What is Precifarm Agent?",
    "The intelligent mobility and energy layer in the Precifarm Android app — trip planning, charging, home energy sizing and M-Pesa pay. Not a live chatbot.",
  ],
  [
    "Was this called AI companion or Copilot?",
    "Yes. Precifarm Agent is the public name for the Android app. The APK filename stays precifarm.apk until Play Store listing ships.",
  ],
  [
    "Will Precifarm Agent spend M-Pesa without asking?",
    "No. Payments require explicit confirmation unless you set a trusted automation rule. Totals are shown before PIN.",
  ],
  [
    "Can I use Charging Hub without installing?",
    "Yes — precifarm.com/hub works in the browser. Filters, directions and session pay live in the Android app.",
  ],
];

function stageAssets() {
  mkdirSync(assetDir, { recursive: true });
  const heroSrc = join(root, "public", "images", "charging-ecosystem-hero-v19.png");
  if (!existsSync(heroSrc)) throw new Error(`Missing hero: ${heroSrc}`);
  copyFileSync(heroSrc, join(assetDir, "hero.png"));
  return 1;
}

function buildHtml() {
  const modes = MODES.map(
    ([name, summary, example]) => `
    <article class="mode">
      <p class="mode-name">${escapeHtml(name)}</p>
      <p class="mode-summary">${escapeHtml(summary)}</p>
      <p class="mode-example">&ldquo;${escapeHtml(example)}&rdquo;</p>
    </article>`,
  ).join("");

  const caps = CAPABILITIES.map(
    ([title, status, text]) => `
    <tr>
      <td class="label">${escapeHtml(title)}</td>
      <td><span class="status status-${status.toLowerCase().replace(/\s+/g, "-")}">${escapeHtml(status)}</span></td>
      <td>${escapeHtml(text)}</td>
    </tr>`,
  ).join("");

  const dataRows = DATA_STATUS.map(
    ([s, m]) => `<tr><td class="label mono">${escapeHtml(s)}</td><td>${escapeHtml(m)}</td></tr>`,
  ).join("");

  const faqs = FAQS.map(
    ([q, a]) => `<article class="faq"><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`,
  ).join("");

  const printBand = brandPrintFooterHtml({ ...DOC, shortTitle: "Precifarm Agent" });
  const toolbar = brandToolbarHtml({
    docId: DOC.id,
    version: DOC.version,
    status: DOC.status,
    pdfFile: "precifarm-ai-companion.pdf",
    backHref: "/download",
    backLabel: "Precifarm Agent",
  });
  const endFooter = brandDocFooterHtml(DOC, {
    livePagePath: DOC.liveUrl,
    extraDisclaimer:
      "Illustrative app screens in this sheet are not live telemetry. Partner-network listings follow published Charging Hub copy.",
  });

  return `<!DOCTYPE html>
<html lang="en-KE">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(DOC.title)} (${DOC.id} v${DOC.version})</title>
<meta name="description" content="Precifarm Agent plans trips, charging and energy for Kenya — Android APK from precifarm.com. Not a chatbot." />
<link rel="stylesheet" href="./precifarm-document-brand.css" />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --ink: #0a0a0a; --muted: #404040; --subtle: #737373; --line: #e5e5e5;
    --soft: #f5f5f7; --blue: #2563eb; --blue-soft: #eff6ff;
    --font: "Plus Jakarta Sans", system-ui, sans-serif;
    --mono: "IBM Plex Mono", ui-monospace, Consolas, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; color: var(--muted); font-family: var(--font); font-size: 8.6pt; line-height: 1.45; }
  .sheet { max-width: 210mm; margin: 0 auto; }
  .page { min-height: 255mm; padding: 10mm 14mm 18mm; break-after: page; page-break-after: always; position: relative; }
  .page:last-child { break-after: auto; page-break-after: auto; }
  .page-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5mm; padding-bottom: 3mm; border-bottom: 2px solid var(--ink); }
  .brand { display: flex; align-items: center; gap: 2.5mm; }
  .brand img { width: 8mm; height: 8mm; }
  .brand-word { display: block; font-size: 7pt; font-weight: 700; letter-spacing: .14em; color: var(--ink); }
  .brand-sub { display: block; font-size: 6.5pt; color: var(--subtle); }
  .doc-id { font-family: var(--mono); font-size: 6.5pt; color: var(--subtle); text-align: right; line-height: 1.5; }
  .cover-accent { position: absolute; top: 0; left: 0; width: 5mm; height: 100%; background: linear-gradient(180deg, var(--blue) 0%, var(--blue-soft) 100%); }
  .cover-eyebrow { margin: 0 0 2mm; font-family: var(--mono); font-size: 6.8pt; letter-spacing: .12em; text-transform: uppercase; color: var(--blue); }
  .cover-title { margin: 0 0 3mm; font-size: 24pt; font-weight: 700; line-height: 1.08; letter-spacing: -.03em; color: var(--ink); }
  .cover-lead { margin: 0 0 4mm; max-width: 155mm; font-size: 10pt; }
  .cover-note { margin: 3mm 0 0; font-size: 7pt; color: var(--subtle); }
  .pills { display: flex; flex-wrap: wrap; gap: 2mm; margin-bottom: 5mm; }
  .pills span { font-family: var(--mono); font-size: 6.4pt; letter-spacing: .06em; text-transform: uppercase; color: var(--blue); border: 1px solid #bfdbfe; background: var(--blue-soft); border-radius: 999px; padding: 1.2mm 3mm; font-weight: 600; }
  .hero { margin: 0 0 4.5mm; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); }
  .hero img { display: block; width: 100%; height: 46mm; object-fit: cover; }
  .hero figcaption { padding: 2mm 3mm; font-size: 6.5pt; color: var(--subtle); border-top: 1px solid var(--line); background: #fff; }
  .sec-title { margin: 0 0 2mm; font-size: 14pt; font-weight: 700; color: var(--ink); }
  .sec-lead { margin: 0 0 4mm; font-size: 8.6pt; max-width: 170mm; }
  .shift { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; margin-bottom: 4mm; }
  .shift div { padding: 3.5mm; border: 1px solid var(--line); border-radius: 10px; }
  .shift .new { background: var(--blue-soft); border-color: #bfdbfe; }
  .shift span { display: block; font-size: 6.4pt; letter-spacing: .08em; text-transform: uppercase; color: var(--subtle); margin-bottom: 1mm; }
  .modes { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2.5mm; margin-bottom: 4mm; }
  .mode { padding: 3mm; border-radius: 10px; background: #0f172a; color: #e2e8f0; }
  .mode-name { margin: 0; font-family: var(--mono); font-size: 7pt; font-weight: 600; color: #93c5fd; }
  .mode-summary { margin: 1.5mm 0; font-size: 7.6pt; color: #fff; }
  .mode-example { margin: 0; font-size: 6.8pt; color: #94a3b8; }
  table { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin: 0 0 4mm; }
  th, td { border: 1px solid var(--line); padding: 2.1mm 2.4mm; text-align: left; vertical-align: top; }
  th { background: var(--soft); color: var(--ink); font-weight: 600; font-size: 6.6pt; text-transform: uppercase; }
  td.label { color: var(--ink); font-weight: 600; }
  td.mono { font-family: var(--mono); font-weight: 600; color: var(--blue); }
  .status { display: inline-block; padding: .4mm 2mm; border-radius: 999px; font-size: 6pt; font-weight: 700; text-transform: uppercase; }
  .status-live { background: #dcfce7; color: #166534; }
  .status-rolling-out { background: #fef3c7; color: #92400e; }
  .status-roadmap { background: var(--soft); color: var(--subtle); }
  .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
  .panel { padding: 3.5mm; border: 1px solid var(--line); border-radius: 10px; }
  .panel.live { background: #f0fdf4; border-color: #bbf7d0; }
  .panel.next { background: #fffbeb; border-color: #fde68a; }
  .panel h3 { margin: 0 0 2mm; font-size: 8pt; text-transform: uppercase; letter-spacing: .06em; }
  .panel ul { margin: 0; padding-left: 4mm; }
  .panel li { margin: 0 0 1.2mm; font-size: 7.6pt; }
  .loop { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2mm; margin-bottom: 4mm; }
  .loop-step { padding: 2.5mm; border: 1px solid var(--line); border-radius: 8px; background: var(--soft); }
  .loop-step span { font-family: var(--mono); font-size: 6pt; color: var(--blue); }
  .loop-step strong { display: block; margin: 1mm 0; font-size: 7.5pt; color: var(--ink); }
  .loop-step p { margin: 0; font-size: 6.8pt; }
  .faqs { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; margin-bottom: 4mm; }
  .faq { padding: 3mm; border: 1px solid var(--line); border-radius: 10px; }
  .faq h3 { margin: 0 0 1.4mm; font-size: 8.2pt; color: var(--ink); }
  .faq p { margin: 0; font-size: 7.4pt; }
  .spec-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; margin-bottom: 4mm; }
  .spec { padding: 2.6mm 3.2mm; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); }
  .spec:nth-child(2n) { border-right: 0; }
  .spec:nth-last-child(-n+2) { border-bottom: 0; }
  .spec span { display: block; font-size: 6.2pt; text-transform: uppercase; color: var(--subtle); }
  .spec strong { display: block; margin-top: .6mm; font-family: var(--mono); font-size: 8pt; color: var(--ink); }
  .cta { display: grid; grid-template-columns: 1.4fr .8fr; gap: 4mm; padding: 4mm; border-radius: 10px; background: #0f172a; color: #cbd5e1; margin-bottom: 4mm; }
  .cta h2 { margin: 0 0 1.5mm; font-size: 13pt; color: #fff; }
  .cta p { margin: 0; font-size: 8pt; }
  .cta-meta { font-family: var(--mono); font-size: 7pt; line-height: 1.7; color: #93c5fd; }
  ${brandPrintCss()}
</style>
</head>
<body>
${printBand}
${toolbar}
<main class="sheet">
  <section class="page page-cover">
    <div class="cover-accent" aria-hidden="true"></div>
    ${brandPageHeadHtml({ subtitle: "Precifarm Agent · Android", docId: DOC.id, pageNo: 1, pageTotal: DOC.pages })}
    <p class="cover-eyebrow">Product sheet · ${DOC.pages} pages · ${escapeHtml(BRAND.promise)}</p>
    <h1 class="cover-title">Your car has a companion.<br />Your energy has a brain.</h1>
    <p class="cover-lead">Tell Precifarm where you are going. It plans the route, charging, cost and next steps — across your vehicle, home energy and the Precifarm network. Not a chatbot. Not a glorified map.</p>
    <div class="pills"><span>Mobility + energy</span><span>M-Pesa built in</span><span>Ask · Plan · Act</span><span>Android ${DOC.minAndroid}+</span></div>
    <figure class="hero">
      <img src="./ai-companion/hero.png" alt="Precifarm charging and energy ecosystem" />
      <figcaption>Same products we install — Spark through Corridor, Pod and Pulse. Precifarm Agent is the intelligent layer on top.</figcaption>
    </figure>
    <div class="shift">
      <div><span>Typical charging app</span>Find a hub, size a charger and pay with M-Pesa.</div>
      <div class="new"><span>Precifarm Agent</span>Tell us where you are going — we figure out how to get you there, where to charge, what it costs, and handle the details with your approval.</div>
    </div>
    <p class="cover-note">APK: precifarm.com/download · Package ${DOC.packageId} · Play Store and iOS not available yet.</p>
  </section>

  <section class="page">
    ${brandPageHeadHtml({ subtitle: "Control modes", docId: DOC.id, pageNo: 2, pageTotal: DOC.pages })}
    <h2 class="sec-title">Ask. Plan. Act. Auto.</h2>
    <p class="sec-lead">You always know what Precifarm Agent is doing. Auto mode only runs low-risk rules you define — never silent payments or vehicle control.</p>
    <div class="modes">${modes}</div>
    <h2 class="sec-title">Capabilities — labelled honestly</h2>
    <table>
      <thead><tr><th>Capability</th><th>Status</th><th>Summary</th></tr></thead>
      <tbody>${caps}</tbody>
    </table>
    <div class="cols-2">
      <div class="panel live"><h3>Live in the APK</h3><ul>${LIVE.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
      <div class="panel next"><h3>Rolling out</h3><ul>${NEXT.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul></div>
    </div>
  </section>

  <section class="page">
    ${brandPageHeadHtml({ subtitle: "Trust & data", docId: DOC.id, pageNo: 3, pageTotal: DOC.pages })}
    <h2 class="sec-title">Live stays live. Planned stays planned.</h2>
    <p class="sec-lead">Precifarm Agent never invents charger availability, pricing, battery state or M-Pesa transactions. When data is missing, it says so.</p>
    <table>
      <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
      <tbody>${dataRows}</tbody>
    </table>
    <h2 class="sec-title">Agent loop</h2>
    <div class="loop">
      ${["Observe", "Understand", "Plan", "Verify", "Propose", "Approve", "Act"]
        .map(
          (name, i) => `<article class="loop-step"><span>${String(i + 1).padStart(2, "0")}</span><strong>${name}</strong><p>${escapeHtml(
            [
              "Vehicle, journey, chargers, energy",
              "Intent and your saved rules",
              "Route, stops, cost",
              "Tools, permissions, freshness",
              "Clear recommendation",
              "You confirm pay or navigate",
              "Authorized APIs only",
            ][i],
          )}</p></article>`,
        )
        .join("")}
    </div>
    <table>
      <thead><tr><th>Permission tier</th><th>Examples</th></tr></thead>
      <tbody>
        <tr><td class="label">Read</td><td>SOC, charger status, energy data, location</td></tr>
        <tr><td class="label">Act</td><td>Schedule charge, navigate, request quote, book service</td></tr>
        <tr><td class="label">Pay</td><td>M-Pesa STK, purchase, financing application</td></tr>
      </tbody>
    </table>
  </section>

  <section class="page">
    ${brandPageHeadHtml({ subtitle: "Install & FAQ", docId: DOC.id, pageNo: 4, pageTotal: DOC.pages })}
    <h2 class="sec-title">Get Precifarm Agent on Android</h2>
    <p class="sec-lead">Download only from precifarm.com. Sideload the APK — not on Play Store yet.</p>
    <div class="spec-grid">
      <div class="spec"><span>Name</span><strong>Precifarm Agent</strong></div>
      <div class="spec"><span>Package</span><strong>${DOC.packageId}</strong></div>
      <div class="spec"><span>Version</span><strong>${DOC.appVersion}</strong></div>
      <div class="spec"><span>Minimum OS</span><strong>Android ${DOC.minAndroid}+</strong></div>
      <div class="spec"><span>File</span><strong>${DOC.apk}</strong></div>
      <div class="spec"><span>Web hub</span><strong>precifarm.com/hub</strong></div>
    </div>
    <div class="faqs">${faqs}</div>
    <div class="cta">
      <div>
        <h2>Start with Charging Hub.</h2>
        <p>The web hub works without the APK. Precifarm Agent adds planning, proactive advice and M-Pesa on your phone as features roll out.</p>
      </div>
      <div class="cta-meta">
        <div><strong>Agent</strong> precifarm.com/download</div>
        <div><strong>Hub</strong> precifarm.com/hub</div>
        <div><strong>Contact</strong> ${escapeHtml(BRAND.email)}</div>
        <div><strong>Phone</strong> ${escapeHtml(BRAND.phone)}</div>
      </div>
    </div>
    ${endFooter}
  </section>
</main>
</body>
</html>`;
}

function main() {
  mkdirSync(downloadsDir, { recursive: true });
  console.log(`Staged ${stageAssets()} hero image`);
  writeFileSync(htmlOut, buildHtml(), "utf8");
  console.log(`Wrote ${htmlOut}`);
  printHtmlToPdf(htmlOut, pdfOut);
  const bytes = readFileSync(pdfOut).length;
  console.log(`Wrote ${pdfOut} (${(bytes / 1024).toFixed(0)} KB)`);
}

main();
