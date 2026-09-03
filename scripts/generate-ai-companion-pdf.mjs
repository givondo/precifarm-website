/**
 * Generate PF-AI-COMPANION-001 — 4-page product sheet for the Precifarm AI companion.
 * Copy is grounded in the live /download page, Charging Hub, home charging and FAQs.
 * Kenya market context from public operator apps and OCA M-Pesa charging notes.
 *
 * Usage: node scripts/generate-ai-companion-pdf.mjs
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const downloadsDir = join(root, "public", "downloads");
const assetDir = join(downloadsDir, "ai-companion");
const htmlOut = join(downloadsDir, "precifarm-ai-companion.html");
const pdfOut = join(downloadsDir, "precifarm-ai-companion.pdf");

const DOC = {
  id: "PF-AI-COMPANION-001",
  version: "1.0",
  status: "Product sheet",
  date: "31 August 2026",
  pages: 4,
  liveUrl: "https://precifarm.com/download",
  hubUrl: "https://precifarm.com/hub",
  apk: "precifarm.apk",
  packageId: "com.precifarm.mobile",
  appVersion: "1.0.0",
  minAndroid: "8.0",
};

const browsers = [
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, "Microsoft", "Edge", "Application", "msedge.exe"),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const PRODUCT_IMAGES = [
  ["spark.png", "products/spark-v2.png"],
  ["pulse.png", "products/pulse-v7.png"],
  ["pod.png", "products/pod.png"],
  ["boda.png", "products/boda-v2.png"],
  ["depot.png", "products/depot-v4.png"],
  ["corridor.png", "products/corridor-v4.png"],
  ["financing.png", "products/financing.png"],
  ["pod-garage.png", "products/pod-home-hero-v2-garage-4x3.png"],
];

const PRODUCTS = [
  { file: "spark.png", name: "Spark charger", spec: "3.3 kW · Type 2", role: "Portable lead in the boot", session: "~180 min for a typical day" },
  { file: "pulse.png", name: "Pulse charger", spec: "7 kW · Type 2", role: "Home wallbox", session: "~90 min for a typical day" },
  { file: "pod.png", name: "Pod energy storage", spec: "7 kW + 5 / 10 kWh", role: "Home charger + backup", session: "Charge when Kenya Power dips" },
  { file: "boda.png", name: "Boda Hub", spec: "Pack swap", role: "E-motorcycle", session: "Back on the road in <5 min" },
  { file: "depot.png", name: "Depot station", spec: "22 kW AC", role: "Fleet yard", session: "40+ kWh in ~120 min" },
  { file: "corridor.png", name: "Corridor charging", spec: "120 kW+ DC · CCS2", role: "Highway T-canopy", session: "~60 kWh in 30 min" },
];

const JOBS = [
  {
    step: "01",
    title: "Find a hub",
    text: "Open Charging Hub. Filter Corridor DC, Boda Hub swap or partner sites. Live and planned labels stay honest. Get directions before you leave.",
  },
  {
    step: "02",
    title: "Size home energy",
    text: "See whether Pulse charger or Pod energy storage fits your wall, feeder and parking. Request a survey — we confirm the site before we quote.",
  },
  {
    step: "03",
    title: "Pay with M-Pesa",
    text: "Pay a session or Lipa Pole Pole instalments on any phone. Deposit, monthly and total are shown before you confirm — no bank account required.",
  },
];

const FEATURES = [
  {
    title: "Charging Hub",
    text: "Precifarm, EVChaja, ChargeNet and partner sites — filter by fast DC or Boda swap, then navigate in maps.",
  },
  {
    title: "Home + storage",
    text: "Request a Pulse charger or Pod energy storage survey. Certified installation and three-year aftersale care on M-Pesa.",
  },
  {
    title: "Vehicle-aware",
    text: "Select your car or e-boda so recommendations follow battery size, connector and how far you actually drive.",
  },
  {
    title: "Lipa Pole Pole",
    text: "Pay deposit and monthly instalments via M-Pesa, USSD or SMS. Totals shown before you confirm.",
  },
];

const SITE_TYPES = [
  ["Corridor DC", "120 kW+", "T-canopy highway DC with overhead cables — about 60 kWh in 30 minutes. Dual CCS2 where listed. From KES 39/kWh on M-Pesa."],
  ["Boda Hub swap", "<5 min", "Fresh battery for Roam Air and compatible e-bodas in Nairobi, Kisumu and Nakuru — swap or kerbside charge."],
  ["Partner chargers", "Retail & malls", "Shell, Total, Naivas, malls and campuses — DC stops along the routes you already drive."],
];

const DRIVER_NEEDS = [
  ["Find a public charger", "Operator map", "Charging Hub: Precifarm + EVChaja + ChargeNet + partners"],
  ["Pay without a bank card", "M-Pesa / mobile money", "M-Pesa, USSD and SMS — price shown first"],
  ["Size a home wallbox", "Usually a separate sales form", "Pulse charger and Pod energy storage survey in-app"],
  ["Spread the hardware cost", "Rarely in the same app", "Lipa Pole Pole from KES 3,300/month on M-Pesa"],
  ["E-boda battery swap", "Some operator apps", "Boda Hub listed on the same map"],
  ["Honest live vs planned", "Mixed", "Live sites labelled live; planned stay planned"],
];

const LIVE = [
  "Charging Hub map with live and planned labels",
  "Home Pulse charger and Pod energy storage survey requests",
  "M-Pesa session pay and Lipa Pole Pole instalments",
];

const DESIGNED = [
  "Fleet dashboard for vehicles, chargers and kWh — not live yet",
  "iOS companion — not available yet",
  "Play Store listing — install the APK from precifarm.com for now",
];

const INSTALL = [
  ["1", "Download", "Open precifarm.com/download and tap Get the AI companion."],
  ["2", "Allow", "When prompted, allow downloads from your browser."],
  ["3", "Open the file", "If Android blocks the install, go to Settings → Security and allow installs from your browser."],
  ["4", "Install", "Tap Install, then open the Precifarm AI companion."],
];

const FAQS = [
  [
    "What is the Precifarm AI companion?",
    "It is Precifarm's Android companion for charging in Kenya. Use it to find a hub, size Pulse charger or Pod energy storage, and pay with M-Pesa. It is not a live chatbot.",
  ],
  [
    "Is it on the Google Play Store?",
    "Not yet. Install the APK from precifarm.com/download. Allow installs from your browser if Android asks. iOS is not available yet.",
  ],
  [
    "How do I pay in the companion?",
    "Charging sessions and Lipa Pole Pole instalments use M-Pesa. Session price, deposit, monthly and total are shown before you confirm. USSD and SMS work on phones without a bank account.",
  ],
  [
    "Can I use Charging Hub without installing?",
    "Yes. Open Charging Hub on precifarm.com/hub in your browser for the site list. Filters, directions and session pay live in the companion.",
  ],
];

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stageAssets() {
  mkdirSync(assetDir, { recursive: true });
  let count = 0;

  const heroSrc = join(root, "public", "images", "charging-ecosystem-hero-v18.png");
  if (!existsSync(heroSrc)) throw new Error(`Missing hero: ${heroSrc}`);
  copyFileSync(heroSrc, join(assetDir, "hero.png"));
  count += 1;

  for (const [fileName, relPath] of PRODUCT_IMAGES) {
    const from = join(root, "public", "images", relPath);
    if (!existsSync(from)) throw new Error(`Missing image: ${from}`);
    copyFileSync(from, join(assetDir, fileName));
    count += 1;
  }

  return count;
}

function pageHead(subtitle, pageNo) {
  return `
    <header class="page-head">
      <div class="brand">
        <img src="./precifarm-logo-mark.svg" alt="" />
        <div>
          <span class="brand-word">PRECIFARM</span>
          <span class="brand-sub">${escapeHtml(subtitle)}</span>
        </div>
      </div>
      <div class="doc-id">${DOC.id} · Page ${pageNo} of ${DOC.pages}</div>
    </header>`;
}

function buildHtml() {
  const jobs = JOBS.map(
    (job) => `
      <article class="job">
        <p class="job-step">${job.step}</p>
        <h3>${escapeHtml(job.title)}</h3>
        <p>${escapeHtml(job.text)}</p>
      </article>`,
  ).join("");

  const features = FEATURES.map(
    (f) => `
      <article class="feat">
        <h3>${escapeHtml(f.title)}</h3>
        <p>${escapeHtml(f.text)}</p>
      </article>`,
  ).join("");

  const siteTypes = SITE_TYPES.map(
    ([name, stat, detail]) => `
      <article class="site">
        <p class="site-stat">${escapeHtml(stat)}</p>
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(detail)}</p>
      </article>`,
  ).join("");

  const needRows = DRIVER_NEEDS
    .map(
      (row) =>
        `<tr><td class="label">${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td><td class="hl">${escapeHtml(row[2])}</td></tr>`,
    )
    .join("");

  const productThumbs = PRODUCTS.map(
    (p) => `
      <figure class="thumb">
        <div class="thumb-img"><img src="./ai-companion/${p.file}" alt="${escapeHtml(p.name)}" /></div>
        <figcaption>
          <strong>${escapeHtml(p.name)}</strong>
          <span>${escapeHtml(p.spec)}</span>
        </figcaption>
      </figure>`,
  ).join("");

  const productRows = PRODUCTS.map(
    (p) =>
      `<tr><td class="label">${escapeHtml(p.name)}</td><td class="num">${escapeHtml(p.spec)}</td><td>${escapeHtml(p.role)}</td><td>${escapeHtml(p.session)}</td></tr>`,
  ).join("");

  const liveItems = LIVE.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const designedItems = DESIGNED.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  const installItems = INSTALL.map(
    ([n, title, text]) => `
      <article class="install">
        <span>${n}</span>
        <div>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(text)}</p>
        </div>
      </article>`,
  ).join("");

  const faqItems = FAQS.map(
    ([q, a]) => `
      <article class="faq">
        <h3>${escapeHtml(q)}</h3>
        <p>${escapeHtml(a)}</p>
      </article>`,
  ).join("");

  return `<!DOCTYPE html>
<html lang="en-KE">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Precifarm AI companion — product sheet (${DOC.id} v${DOC.version})</title>
<meta name="description" content="Precifarm AI companion for Android: find a Charging Hub, size Pulse charger or Pod energy storage, and pay with M-Pesa. Not a live chatbot." />
<link rel="stylesheet" href="./precifarm-document-brand.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --ink: #0a0a0a;
    --muted: #404040;
    --subtle: #737373;
    --line: #e5e5e5;
    --soft: #f5f5f7;
    --blue: #2563eb;
    --blue-soft: #eff6ff;
    --font: "Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif;
    --mono: "IBM Plex Mono", ui-monospace, Consolas, monospace;
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    color: var(--muted);
    background: #fff;
    font-family: var(--font);
    font-size: 8.6pt;
    line-height: 1.45;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .toolbar {
    position: sticky; top: 0; z-index: 20;
    display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; justify-content: space-between;
    padding: .7rem 1rem; background: rgba(255,255,255,.96);
    border-bottom: 1px solid var(--line);
  }
  .toolbar .id { font-family: var(--mono); font-size: .78rem; color: var(--subtle); }
  .toolbar a, .toolbar button {
    display: inline-flex; align-items: center; border-radius: 999px;
    padding: .5rem .95rem; font-size: .82rem; font-weight: 600; text-decoration: none;
    border: 1px solid var(--line); background: #fff; color: var(--ink); cursor: pointer;
  }
  .toolbar .primary { background: var(--blue); border-color: var(--blue); color: #fff; }
  .sheet { max-width: 210mm; margin: 0 auto; }
  .page {
    position: relative;
    min-height: 277mm;
    padding: 10mm 14mm 16mm;
    break-after: page;
    page-break-after: always;
  }
  .page:last-child { break-after: auto; page-break-after: auto; }
  .page-head {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 5mm; padding-bottom: 3mm; border-bottom: 2px solid var(--ink);
  }
  .brand { display: flex; align-items: center; gap: 2.5mm; }
  .brand img { width: 8mm; height: 8mm; }
  .brand-word { display: block; font-size: 7pt; font-weight: 700; letter-spacing: .14em; color: var(--ink); }
  .brand-sub { display: block; font-size: 6.5pt; color: var(--subtle); }
  .doc-id { font-family: var(--mono); font-size: 6.5pt; color: var(--subtle); text-align: right; line-height: 1.5; }

  .cover-accent {
    position: absolute; top: 0; left: 0; width: 5mm; height: 100%;
    background: linear-gradient(180deg, var(--blue) 0%, var(--blue-soft) 100%);
  }
  .cover-eyebrow {
    margin: 0 0 2mm; font-family: var(--mono); font-size: 6.8pt;
    letter-spacing: .12em; text-transform: uppercase; color: var(--blue);
  }
  .cover-title {
    margin: 0 0 3mm; font-size: 26pt; font-weight: 700; line-height: 1.08;
    letter-spacing: -.03em; color: var(--ink);
  }
  .cover-lead { margin: 0 0 4mm; max-width: 155mm; font-size: 10pt; color: var(--muted); }
  .pills { display: flex; flex-wrap: wrap; gap: 2mm; margin-bottom: 5mm; }
  .pills span {
    font-family: var(--mono); font-size: 6.4pt; letter-spacing: .06em; text-transform: uppercase;
    color: var(--blue); border: 1px solid #bfdbfe; background: var(--blue-soft);
    border-radius: 999px; padding: 1.2mm 3mm; font-weight: 600;
  }
  .hero { margin: 0 0 4.5mm; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); background: var(--soft); }
  .hero img { display: block; width: 100%; height: 48mm; object-fit: cover; object-position: center; }
  .hero figcaption { padding: 2mm 3mm; font-size: 6.5pt; color: var(--subtle); border-top: 1px solid var(--line); background: #fff; }

  .jobs { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm; margin-bottom: 4mm; }
  .job { margin: 0; padding: 3.5mm; border: 1px solid var(--line); border-radius: 10px; background: #fff; }
  .job-step { margin: 0 0 1.5mm; font-family: var(--mono); font-size: 7pt; font-weight: 600; letter-spacing: .12em; color: var(--blue); }
  .job h3 { margin: 0 0 1.5mm; font-size: 10pt; color: var(--ink); }
  .job p { margin: 0; font-size: 7.6pt; color: var(--muted); }

  .meta-row {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3mm;
    padding: 3.5mm; border-radius: 10px; background: var(--soft); border: 1px solid var(--line);
  }
  .meta-row span { display: block; font-size: 6.4pt; letter-spacing: .08em; text-transform: uppercase; color: var(--subtle); margin-bottom: 1mm; }
  .meta-row strong { display: block; font-size: 8.4pt; color: var(--ink); font-weight: 600; }

  .cover-note { margin: 3.5mm 0 0; font-size: 7pt; color: var(--subtle); }

  .sec-title { margin: 0 0 2mm; font-size: 14pt; font-weight: 700; letter-spacing: -.02em; color: var(--ink); }
  .sec-lead { margin: 0 0 4mm; font-size: 8.6pt; max-width: 170mm; }
  .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-bottom: 4.5mm; }
  .panel { padding: 3.5mm; border: 1px solid var(--line); border-radius: 10px; background: #fff; }
  .panel h3 { margin: 0 0 2mm; font-size: 9pt; color: var(--ink); }
  .panel p { margin: 0 0 2mm; }
  .panel p:last-child { margin-bottom: 0; }
  .panel.blue { background: var(--blue-soft); border-color: #bfdbfe; }

  .steps { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; margin-bottom: 4.5mm; }
  .step { display: flex; gap: 2.5mm; padding: 3mm; border: 1px solid var(--line); border-radius: 10px; }
  .step span {
    flex: 0 0 7mm; height: 7mm; border-radius: 999px; background: #0f172a; color: #fff;
    font-family: var(--mono); font-size: 6.5pt; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
  }
  .step strong { display: block; font-size: 8.4pt; color: var(--ink); margin-bottom: .8mm; }
  .step p { margin: 0; font-size: 7.5pt; }

  .feats { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; margin-bottom: 3mm; }
  .feat { padding: 2.8mm; border: 1px solid var(--line); border-radius: 10px; background: var(--soft); }
  .feat h3 { margin: 0 0 1.4mm; font-size: 9pt; color: var(--ink); }
  .feat p { margin: 0; font-size: 7.6pt; }

  .sites { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2.5mm; }
  .site { padding: 3.2mm; border: 1px solid var(--line); border-radius: 10px; }
  .site-stat { margin: 0 0 1mm; font-family: var(--mono); font-size: 11pt; font-weight: 600; color: var(--blue); }
  .site h3 { margin: 0 0 1.4mm; font-size: 9pt; color: var(--ink); }
  .site p { margin: 0; font-size: 7.4pt; }

  table { width: 100%; border-collapse: collapse; font-size: 7.2pt; margin: 0 0 4mm; }
  th, td { border: 1px solid var(--line); padding: 2.1mm 2.4mm; text-align: left; vertical-align: top; }
  th { background: var(--soft); color: var(--ink); font-weight: 600; font-size: 6.6pt; letter-spacing: .04em; text-transform: uppercase; }
  td.label { color: var(--ink); font-weight: 600; }
  td.hl { background: var(--blue-soft); color: var(--ink); }
  td.num { font-family: var(--mono); font-size: 6.8pt; white-space: nowrap; }
  caption, .table-caption { caption-side: top; text-align: left; font-size: 6.6pt; letter-spacing: .08em; text-transform: uppercase; color: var(--subtle); margin: 0 0 1.5mm; font-weight: 600; }

  .thumbs { display: grid; grid-template-columns: repeat(6, 1fr); gap: 2mm; margin-bottom: 4mm; }
  .thumb { margin: 0; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #fff; }
  .thumb-img { background: var(--soft); padding: 1.5mm; }
  .thumb-img img { display: block; width: 100%; height: 22mm; object-fit: contain; }
  .thumb figcaption { padding: 1.5mm 2mm 2mm; text-align: center; }
  .thumb strong { display: block; font-size: 6.2pt; color: var(--ink); line-height: 1.2; }
  .thumb span { display: block; font-size: 5.6pt; color: var(--subtle); margin-top: .5mm; }

  .split { display: grid; grid-template-columns: 1.15fr .85fr; gap: 4mm; margin-bottom: 4mm; }
  .status { padding: 3.5mm; border-radius: 10px; border: 1px solid var(--line); }
  .status.live { background: #f0fdf4; border-color: #bbf7d0; }
  .status.design { background: #fff; border-style: dashed; }
  .status h3 { margin: 0 0 2mm; font-size: 8pt; letter-spacing: .08em; text-transform: uppercase; }
  .status.live h3 { color: #166534; }
  .status.design h3 { color: var(--subtle); }
  .status ul { margin: 0; padding-left: 4mm; }
  .status li { margin: 0 0 1.4mm; font-size: 7.6pt; }
  .status li:last-child { margin-bottom: 0; }

  .price-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2.5mm; margin-bottom: 4mm; }
  .price { padding: 3mm; border: 1px solid var(--line); border-radius: 10px; background: var(--soft); }
  .price span { display: block; font-size: 6.2pt; letter-spacing: .06em; text-transform: uppercase; color: var(--subtle); margin-bottom: 1mm; }
  .price strong { display: block; font-size: 10pt; color: var(--ink); }
  .price em { display: block; font-style: normal; font-size: 6.6pt; color: var(--muted); margin-top: .8mm; }

  .home-fig { margin: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
  .home-fig img { display: block; width: 100%; height: 42mm; object-fit: cover; object-position: center; }
  .home-fig figcaption { padding: 2mm 3mm; font-size: 6.5pt; color: var(--subtle); }

  .installs { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; margin-bottom: 4mm; }
  .install { display: flex; gap: 2.5mm; padding: 3mm; border: 1px solid var(--line); border-radius: 10px; }
  .install span {
    flex: 0 0 7mm; height: 7mm; border-radius: 999px; background: var(--blue); color: #fff;
    font-weight: 700; font-size: 7.5pt; display: flex; align-items: center; justify-content: center;
  }
  .install strong { display: block; font-size: 8.4pt; color: var(--ink); margin-bottom: .6mm; }
  .install p { margin: 0; font-size: 7.5pt; }

  .spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 4mm; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
  .spec { padding: 2.6mm 3.2mm; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); }
  .spec:nth-child(2n) { border-right: 0; }
  .spec:nth-last-child(-n+2) { border-bottom: 0; }
  .spec span { display: block; font-size: 6.2pt; letter-spacing: .06em; text-transform: uppercase; color: var(--subtle); }
  .spec strong { display: block; margin-top: .6mm; font-size: 8.2pt; color: var(--ink); font-family: var(--mono); font-weight: 600; }

  .faqs { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; margin-bottom: 4mm; }
  .faq { padding: 3.2mm; border: 1px solid var(--line); border-radius: 10px; }
  .faq h3 { margin: 0 0 1.4mm; font-size: 8.2pt; color: var(--ink); }
  .faq p { margin: 0; font-size: 7.4pt; }

  .cta {
    display: grid; grid-template-columns: 1.4fr .8fr; gap: 4mm;
    padding: 4mm; border-radius: 10px; background: #0f172a; color: #e2e8f0;
  }
  .cta h2 { margin: 0 0 1.5mm; font-size: 13pt; color: #fff; }
  .cta p { margin: 0; font-size: 8pt; color: #cbd5e1; }
  .cta-meta { font-family: var(--mono); font-size: 7.2pt; color: #93c5fd; line-height: 1.7; }
  .cta-meta strong { color: #fff; }

  .print-footer { display: none; }
  @page { size: A4; margin: 0; }
  @media print {
    .toolbar { display: none !important; }
    .sheet { max-width: none; }
    .page { min-height: 297mm; padding: 12mm 14mm 14mm; }
    .print-footer {
      display: flex; position: fixed; bottom: 8mm; left: 14mm; right: 14mm;
      justify-content: space-between; font-family: var(--mono); font-size: 6.5pt; color: var(--subtle);
      border-top: 1px solid var(--line); padding-top: 2mm;
    }
    .job, .feat, .site, .thumb, .status, .faq, .hero, .home-fig, table { break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="print-footer" aria-hidden="true">
    <span>${DOC.id} · v${DOC.version}</span>
    <span>Precifarm AI companion · Product sheet</span>
    <span>${DOC.date}</span>
  </div>

  <div class="toolbar">
    <div style="display:flex;align-items:center;gap:.6rem">
      <img src="./precifarm-logo-mark.svg" alt="" width="22" height="22" />
      <span class="id">${DOC.id} · v${DOC.version} · ${DOC.status}</span>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button type="button" class="primary" onclick="window.print()">Print</button>
      <a class="primary" href="./precifarm-ai-companion.pdf" download>Download PDF</a>
      <a href="/download">Back to AI companion</a>
    </div>
  </div>

  <main class="sheet">
    <section class="page page-cover">
      <div class="cover-accent" aria-hidden="true"></div>
      ${pageHead("AI companion · Kenya", 1)}

      <p class="cover-eyebrow">Product sheet · Android companion · ${DOC.pages} pages</p>
      <h1 class="cover-title">Your charging<br />companion for Kenya.</h1>
      <p class="cover-lead">
        Find a live hub, size Pulse charger or Pod energy storage, and pay with M-Pesa —
        built around how you drive and park. Android only. Not a live chatbot.
      </p>
      <div class="pills">
        <span>Find a hub</span>
        <span>Size home energy</span>
        <span>Pay with M-Pesa</span>
        <span>Android ${DOC.minAndroid}+</span>
      </div>

      <figure class="hero">
        <img src="./ai-companion/hero.png" alt="Precifarm charging family — Pulse, Spark, Pod, Corridor, Depot and Boda Hub" />
        <figcaption>Same products we install. Same M-Pesa flows. The companion is the phone layer on top of Precifarm charging in Kenya.</figcaption>
      </figure>

      <div class="jobs">${jobs}</div>

      <div class="meta-row">
        <div><span>Platform</span><strong>Android ${DOC.minAndroid}+ · APK from precifarm.com</strong></div>
        <div><span>Payments</span><strong>M-Pesa sessions and Lipa Pole Pole</strong></div>
        <div><span>Map</span><strong>Charging Hub — Corridor, Boda Hub, partners</strong></div>
      </div>
      <p class="cover-note">
        Direct APK from precifarm.com. Not on the Play Store yet. iOS is not available.
        Live page: ${DOC.liveUrl}
      </p>
    </section>

    <section class="page">
      ${pageHead("Kenya charging context", 2)}
      <h2 class="sec-title">Built for how Kenya actually charges.</h2>
      <p class="sec-lead">
        Public EV charging in Kenya is a mix of mall plugs, fuel-retailer partners, operator apps and Kenya Power sites —
        not one national network. Apps that work here find a station, start a session and take M-Pesa, because most drivers
        do not pay a charger with a bank card.
      </p>

      <div class="cols-2">
        <div class="panel">
          <h3>What Kenya charging apps already do</h3>
          <p>Operator apps such as EVChaja, Kencharge and Kabisa-style networks typically let a driver locate stations, filter by connector or power, start or monitor a session, and pay with mobile money.</p>
          <p>The Open Charge Alliance (2025) treats M-Pesa as the mobile-first payment for Kenyan EV charging — send and receive money on the phone, no bank account required. USSD still matters on feature phones.</p>
        </div>
        <div class="panel blue">
          <h3>What Precifarm adds</h3>
          <p>Most kilometres in Kenya still start at home. A map-only app leaves the driveway, the wallbox and Lipa Pole Pole to a separate sales call.</p>
          <p>The Precifarm AI companion puts public Charging Hub, Pulse / Pod home surveys and M-Pesa pay on one Android account — the same products we install, with live and planned sites labelled honestly.</p>
        </div>
      </div>

      <p class="table-caption">What Kenyan EV drivers need — typical operator app vs Precifarm companion</p>
      <table>
        <thead>
          <tr>
            <th>Job</th>
            <th>Typical Kenya charging app</th>
            <th>Precifarm AI companion</th>
          </tr>
        </thead>
        <tbody>${needRows}</tbody>
      </table>

      <div class="feats">${features}</div>
      <div class="sites">${siteTypes}</div>
    </section>

    <section class="page">
      ${pageHead("Products and honesty", 3)}
      <h2 class="sec-title">The same products we install.</h2>
      <p class="sec-lead">Spark through Corridor — specs, fit and M-Pesa in the companion and on the website. A typical Nairobi day is about 60 km / 10 kWh.</p>

      <div class="thumbs">${productThumbs}</div>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Power / energy</th>
            <th>Role</th>
            <th>Typical session</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>

      <div class="price-row">
        <div class="price"><span>Pulse charger</span><strong>From KES 79,000</strong><em>Lipa Pole Pole on M-Pesa</em></div>
        <div class="price"><span>Instalments</span><strong>From KES 3,300/mo</strong><em>Pulse and Pod energy storage</em></div>
        <div class="price"><span>Public DC</span><strong>From KES 39/kWh</strong><em>Depot and Corridor on M-Pesa</em></div>
        <div class="price"><span>Home day vs diesel</span><strong>KES 140 vs ~1,000</strong><em>~60 km Nairobi driving day</em></div>
      </div>

      <div class="split">
        <div>
          <h2 class="sec-title">Honest about what you can do today.</h2>
          <p class="sec-lead">Canon for Precifarm copy: live stays live. Planned stays planned. The companion is not a chatbot.</p>
          <div class="cols-2" style="grid-template-columns:1fr 1fr;margin-bottom:0">
            <div class="status live">
              <h3>Live</h3>
              <ul>${liveItems}</ul>
            </div>
            <div class="status design">
              <h3>In design</h3>
              <ul>${designedItems}</ul>
            </div>
          </div>
        </div>
        <figure class="home-fig">
          <img src="./ai-companion/pod-garage.png" alt="Precifarm Pod and Pulse in a Kenyan home garage" />
          <figcaption>Size Pulse charger or Pod energy storage to your wall, feeder and parking — survey before quote.</figcaption>
        </figure>
      </div>
    </section>

    <section class="page">
      ${pageHead("Install and FAQ", 4)}
      <h2 class="sec-title">Install the APK from precifarm.com.</h2>
      <p class="sec-lead">The Precifarm AI companion is not on the Play Store yet. Download is safe when it comes from precifarm.com. Package ${DOC.packageId} · v${DOC.appVersion}.</p>

      <div class="installs">${installItems}</div>

      <div class="spec-grid">
        <div class="spec"><span>Name</span><strong>Precifarm AI companion</strong></div>
        <div class="spec"><span>Package</span><strong>${DOC.packageId}</strong></div>
        <div class="spec"><span>Version</span><strong>${DOC.appVersion}</strong></div>
        <div class="spec"><span>Minimum OS</span><strong>Android ${DOC.minAndroid}+</strong></div>
        <div class="spec"><span>File</span><strong>${DOC.apk}</strong></div>
        <div class="spec"><span>iOS / Play Store</span><strong>Not available yet</strong></div>
        <div class="spec"><span>Payments</span><strong>M-Pesa · USSD · SMS</strong></div>
        <div class="spec"><span>Web fallback</span><strong>precifarm.com/hub</strong></div>
      </div>

      <h2 class="sec-title">Before you install.</h2>
      <div class="faqs">${faqItems}</div>

      <div class="cta">
        <div>
          <h2>Get the AI companion.</h2>
          <p>Need charging without the install? Charging Hub and home surveys work in the browser. The companion adds filters, directions and M-Pesa on your phone.</p>
        </div>
        <div class="cta-meta">
          <div><strong>APK</strong> ${DOC.liveUrl}</div>
          <div><strong>Hub</strong> ${DOC.hubUrl}</div>
          <div><strong>Sales</strong> sales@precifarm.com</div>
          <div><strong>Phone</strong> +254 794 702 768 · Nairobi</div>
        </div>
      </div>
      <p class="cover-note">
        © 2026 Precifarm · ${DOC.id} v${DOC.version} · ${DOC.date}.
        For driver and partner briefing. Not a substitute for a site survey, Kenya Power studies or statutory approvals.
        Partner-network listings (EVChaja, ChargeNet and others) follow published Charging Hub copy — they are not a claim that every public plug in Kenya is Precifarm-operated.
      </p>
    </section>
  </main>
</body>
</html>`;
}

function findBrowser() {
  for (const candidate of browsers) {
    if (candidate && existsSync(candidate)) return candidate;
  }
  return null;
}

function generatePdf(htmlPath) {
  const browser = findBrowser();
  if (!browser) throw new Error("Chrome or Edge not found. Install one to generate the PDF.");

  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=60000",
      `--print-to-pdf=${pdfOut}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "inherit", windowsHide: true },
  );

  if (!existsSync(pdfOut) || readFileSync(pdfOut).length < 5000) {
    throw new Error("PDF generation failed or file is empty.");
  }
}

function main() {
  mkdirSync(downloadsDir, { recursive: true });
  const staged = stageAssets();
  console.log(`Staged ${staged} images into ${assetDir}`);

  writeFileSync(htmlOut, buildHtml(), "utf8");
  console.log(`Wrote ${htmlOut}`);

  generatePdf(htmlOut);
  const bytes = readFileSync(pdfOut).length;
  console.log(`Wrote ${pdfOut} (${(bytes / 1024).toFixed(0)} KB)`);
}

main();
