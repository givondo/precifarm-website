/**
 * Generate PF-MODENERGY-DESIGN-001 — 5-page industrial design overview PDF.
 * Renders + essential energy/sizing parameters; companion to PF-MODENERGY-002.
 *
 * Usage: node scripts/generate-modular-energy-design-pdf.mjs
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const docsProduct = join(root, "..", "docs", "product");
const rendersSrc = join(docsProduct, "figures", "renders");
const downloadsDir = join(root, "public", "downloads");
const assetDir = join(downloadsDir, "modenergy-design");
const htmlOut = join(downloadsDir, "precifarm-modular-energy-design.html");
const pdfOut = join(downloadsDir, "precifarm-modular-energy-design.pdf");

const DOC = {
  id: "PF-MODENERGY-DESIGN-001",
  version: "1.5",
  status: "Industrial Design Overview",
  date: "30 August 2026",
  companion: "PF-MODENERGY-002 v2.0",
  pages: 5,
};

const browsers = [
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, "Microsoft", "Edge", "Application", "msedge.exe"),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const PRODUCTS = [
  {
    file: "render-p1-go.png",
    name: "P1 Go",
    tag: "Portable backup",
    text: "Aluminum unibody · fold-flat top handle · glass display · Precifarm wordmark · magnetic I/O · wireless pad · Type 2 EV trickle lead",
  },
  {
    file: "render-energy-module.png",
    name: "Energy Module",
    tag: "2.56 kWh block",
    text: "Recessed side handles · blind-mate power and comms · glass status strip · one module repeated everywhere",
  },
  {
    file: "render-p2-home.png",
    name: "P2 Home",
    tag: "Home backup",
    text: "Power Core above · four module bays · retractable handle · rear castors · essential-load sub-board ready",
  },
  {
    file: "render-pod.png",
    name: "Precifarm Pod",
    tag: "SME / outdoor",
    text: "Power Unit · six-module rack · service door open · sun-shield canopy · plinth and cable entries",
  },
];

/** Precifarm EV charging hardware — aligned with website product range + PF-ENG-SOLAR-HUB-001 */
const CHARGING_HARDWARE = [
  {
    image: "spark.jpg",
    name: "Spark charger",
    power: "3.3 kW AC",
    tag: "Portable",
  },
  {
    image: "pulse.jpg",
    name: "Pulse charger",
    power: "7 kW AC",
    tag: "Home wallbox",
  },
  {
    image: "corridor.jpg",
    name: "Corridor DC",
    power: "120 kW+",
    tag: "Highway CCS2",
  },
  {
    image: "depot.jpg",
    name: "Depot station",
    power: "22 kW AC",
    tag: "Fleet yard",
  },
  {
    image: "boda.jpg",
    name: "Boda Hub",
    power: "Swap",
    tag: "<5 min",
  },
  {
    image: "pod.jpg",
    name: "Pod storage",
    power: "5–10 kWh",
    tag: "+ home charger",
  },
];

const PRECIFARM_CHARGERS = [
  ["Spark charger", "3.3 kW", "Type 2", "Portable top-up", "~180 min"],
  ["Pulse charger", "7 kW", "Type 2", "Home overnight", "~90 min"],
  ["Pod + charger", "7 kW + storage", "Type 2", "Weak-grid home", "5–10 kWh"],
  ["Depot station", "22 kW", "Type 2", "Fleet / campus", "~120 min"],
  ["Corridor DC", "120–320 kW", "CCS2", "Highway / hub", "~60 kWh / 30 min"],
  ["Boda Hub", "Swap", "Pack swap", "E-motorcycle", "<5 min"],
  ["Route hub", "120–320 kW", "CCS2 + BESS", "Reserved bus", "120 kWh / 30 min"],
];

const FAST_CHARGE_BENCHMARK = [
  ["Peak power (post / vehicle)", "500 kW", "1,000 kW", "120–320 kW"],
  ["Shared cabinet", "1.2 MW · 8 posts", "1,360 kW terminal", "Modular CCS2"],
  ["Previous generation", "250 kW (V3)", "Dual-gun GB/T boost", "120 kW town class"],
  ["DC voltage", "180–1,000 V", "1,000 V platform", "200–920 V CCS2"],
  ["Connector", "NACS / CCS2", "GB/T / MW gun", "CCS2 + Type 2"],
  ["Primary use", "Premium car network", "China flash charge", "Kenya bus + intercity"],
  ["In Kenya today", "No network", "No network", "Designed · route hubs"],
];

const EV_ENERGY_INTEGRATION = [
  ["A · AC from solar surplus", "3.7 kW", "Pod / P2 + Pulse", "Type 2 · near-term"],
  ["P1 emergency trickle", "1.0 kW max", "P1 Go + lead", "Not daily EV use"],
  ["C · Home + EV load", "6.3 kW peak", "8-module Pod", "2.6 kW home + 3.7 kW EV"],
  ["40 km driving / day", "7.2 kWh", "0.18 kWh/km", "~2 h @ 3.7 kW"],
  ["B · EV visibility", "—", "Energy OS", "FUTURE"],
  ["C/D · V2H / V2G", "Bidirectional", "Pod + approved EV", "FUTURE"],
];

const CHARGING_IMAGE_FILES = [
  ["spark.jpg", "products/spark.png"],
  ["pulse.jpg", "products/pulse-v7.png"],
  ["corridor.jpg", "products/corridor.png"],
  ["depot.jpg", "products/depot.png"],
  ["boda.jpg", "products/boda-v2.png"],
  ["pod.jpg", "products/pod.png"],
];

/** Essential parameters sourced from PF-MODENERGY-002 §02, §04–§07, §16, §17 */
const MODULE_PARAMS = [
  ["Nominal energy", "2.56 kWh"],
  ["Voltage / capacity", "51.2 V · 50 Ah"],
  ["Chemistry", "LiFePO₄ (LFP)"],
  ["Usable AC (backup)", "2.17 kWh / module"],
  ["Daily cycling AC", "1.68 kWh / module"],
  ["Max discharge", "50 A · 1.0 C"],
  ["Max charge", "30 A · 0.6 C"],
  ["Round-trip AC→AC", "90 %"],
  ["Backup reserve (default)", "20 % SOC"],
];

const PRODUCT_SKUS = [
  ["P1 Go", "~1.0 kWh", "1.0 kW", "Portable · lights, router, fan"],
  ["P2-2.4", "2.56 → 10.24 kWh", "2.4 kW", "Home backup · 1–4 modules"],
  ["P2-4.8", "5.12 → 10.24 kWh", "4.8 kW", "Home + pump · 2–4 modules"],
  ["Pod home", "5.12 → 10.24 kWh", "4.5–8 kW", "Installed · solar + backup"],
  ["Pod SME", "20.48 → 51.2 kWh", "15–30 kW", "Retail · cold chain"],
];

const SCENARIOS = [
  ["A", "Essential backup", "1.40", "0.21", "1", "P1 Go / P2-2.4", "0.6"],
  ["B", "Urban home", "3.77", "2.61", "3", "P2-4.8", "1.6"],
  ["C", "Home + EV", "11.0", "6.31", "8", "Pod", "4.1"],
];

const ESSENTIAL_LOADS = [
  ["LED lighting (8 × 9 W)", "72", "360"],
  ["Wi-Fi router", "10", "240"],
  ["Phone charging (2×)", "20", "60"],
  ["Television 32″", "50", "200"],
  ["Fan", "45", "180"],
  ["Security / gate standby", "15", "360"],
  ["Daily total (Scenario A)", "—", "1,400"],
];

const BACKUP_HOURS = [
  ["500 W", "4.3 h", "8.7 h", "17.3 h"],
  ["1 kW", "2.2 h", "4.3 h", "8.7 h"],
  ["2 kW", "1.1 h", "2.2 h", "4.3 h"],
];

const KENYA_BASIS = [
  ["Grid", "230 V · 50 Hz · Type G"],
  ["Design solar (Nairobi)", "4.7 PSH · 3.5 kWh/kWp/day yield"],
  ["Grid cost (all-in)", "KSh 20–28 / kWh"],
  ["Domestic net-metering cap", "10 kW"],
  ["Avg. monthly outage", "~8.4 h (reported)"],
  ["PV performance ratio", "0.75 planning · clean panels matter"],
];

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {object} opts
 * @param {string} [opts.caption]
 * @param {{ main: string, unit?: string, align?: "left"|"right", hl?: boolean }[]} opts.columns
 * @param {string[][]} opts.rows
 * @param {number} [opts.highlightCol] — 0-based index to tint (e.g. Precifarm column)
 * @param {number[]} [opts.numericCols] — 0-based column indices rendered monospace + right-aligned
 * @param {boolean} [opts.rowLabels] — first column is a row label (benchmark-style)
 */
function dataTable({ caption, columns, rows, highlightCol = null, numericCols = [], rowLabels = false }) {
  const numSet = new Set(numericCols);
  const head = columns
    .map((col, j) => {
      const align = col.align === "right" || numSet.has(j) ? "num" : "";
      const hl = col.hl ? " hl" : "";
      const unit = col.unit ? `<span class="th-unit">${escapeHtml(col.unit)}</span>` : "";
      return `<th class="${align}${hl}"><span class="th-main">${escapeHtml(col.main)}</span>${unit}</th>`;
    })
    .join("");

  const body = rows
    .map((row, i) => {
      const isTotal = row[0]?.toLowerCase().includes("total");
      const cells = row
        .map((cell, j) => {
          const isNum = numSet.has(j);
          const isHl = highlightCol === j;
          const isLabel = rowLabels && j === 0;
          const cls = [isLabel ? "label" : "", isNum ? "num" : "", isHl ? "hl" : ""].filter(Boolean).join(" ");
          return `<td class="${cls}">${escapeHtml(cell)}</td>`;
        })
        .join("");
      return `<tr class="${isTotal ? "row-total" : ""}">${cells}</tr>`;
    })
    .join("");

  return `
    <div class="table-shell">
      ${caption ? `<div class="table-caption">${escapeHtml(caption)}</div>` : ""}
      <table class="data-table">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
}

function buildParametersPage() {
  return `
    <section class="page page-params">
      <header class="page-head">
        <div class="brand">
          <img src="./precifarm-logo-mark.svg" alt="" />
          <div>
            <span class="brand-word">PRECIFARM</span>
            <span class="brand-sub">Energy & sizing parameters</span>
          </div>
        </div>
        <div class="doc-id">${DOC.id} · Page 3 of ${DOC.pages}</div>
      </header>

      <h2 class="sec-title">Essential parameters</h2>
      <p class="sec-lead sec-lead-tight">
        Engineering targets from PF-MODENERGY-002. Usable AC = 90&nbsp;% SOC window × 94&nbsp;% conversion.
        Not certified product specifications.
      </p>

      <div class="param-cols">
        <div class="param-block">
          ${dataTable({
            caption: "Energy Module — building block",
            columns: [
              { main: "Parameter" },
              { main: "Value", align: "right" },
            ],
            rows: MODULE_PARAMS,
            numericCols: [1],
          })}
        </div>
        <div class="param-block">
          ${dataTable({
            caption: "Kenya design basis",
            columns: [
              { main: "Parameter" },
              { main: "Value", align: "right" },
            ],
            rows: KENYA_BASIS,
            numericCols: [1],
          })}
        </div>
      </div>

      ${dataTable({
        caption: "Product lineup — energy vs power scale separately",
        columns: [
          { main: "Product" },
          { main: "Energy", align: "right" },
          { main: "Power", align: "right" },
          { main: "Typical use" },
        ],
        rows: PRODUCT_SKUS,
        numericCols: [1, 2],
      })}

      ${dataTable({
        caption: "Nairobi sizing scenarios",
        columns: [
          { main: "ID", align: "right" },
          { main: "Profile" },
          { main: "Daily load", unit: "kWh/d", align: "right" },
          { main: "Peak", unit: "kW", align: "right" },
          { main: "Modules", align: "right" },
          { main: "Product" },
          { main: "Solar", unit: "kWp", align: "right" },
        ],
        rows: SCENARIOS,
        numericCols: [2, 3, 4, 6],
      })}

      <div class="param-cols">
        <div class="param-block">
          ${dataTable({
            caption: "Scenario A — essential loads",
            columns: [
              { main: "Load" },
              { main: "Power", unit: "W", align: "right" },
              { main: "Energy", unit: "Wh/d", align: "right" },
            ],
            rows: ESSENTIAL_LOADS,
            numericCols: [1, 2],
          })}
        </div>
        <div class="param-block">
          ${dataTable({
            caption: "Backup duration — usable AC energy",
            columns: [
              { main: "Load", align: "right" },
              { main: "1 module", unit: "hours", align: "right" },
              { main: "2 modules", unit: "hours", align: "right" },
              { main: "4 modules", unit: "hours", align: "right" },
            ],
            rows: BACKUP_HOURS,
            numericCols: [0, 1, 2, 3],
          })}
        </div>
      </div>

      <div class="callout callout-blue">
        <strong>Key sizing rules</strong>
        P1 Go ≈ 77&nbsp;% of one essential night · P2-2.4 (1 module) ≈ 2 nights · Scenario B needs 3 modules with reserve.
        Quote <em>expected usable</em> kWh, not nameplate. Full math: PF-MODENERGY-002 §16.
      </div>
    </section>`;
}

function chargingThumb(item) {
  return `
    <figure class="ev-thumb">
      <div class="ev-thumb-img"><img src="./modenergy-design/${item.image}" alt="${item.name}" /></div>
      <figcaption>
        <strong>${item.name}</strong>
        <span>${item.power} · ${item.tag}</span>
      </figcaption>
    </figure>`;
}

function buildEvChargingPage() {
  return `
    <section class="page page-ev">
      <header class="page-head">
        <div class="brand">
          <img src="./precifarm-logo-mark.svg" alt="" />
          <div>
            <span class="brand-word">PRECIFARM</span>
            <span class="brand-sub">EV charging portfolio</span>
          </div>
        </div>
        <div class="doc-id">${DOC.id} · Page 5 of ${DOC.pages}</div>
      </header>

      <h2 class="sec-title">EV charging we design & operate</h2>
      <p class="sec-lead sec-lead-tight">
        From portable Spark charger and Pulse home wallbox through Depot fleet AC to Corridor DC on intercity routes —
        CCS2 / Type 2 for Kenya. Unified industrial design: aluminum, glass UI, Precifarm wordmark on every product.
      </p>

      <figure class="ev-hero">
        <img src="./modenergy-design/charging-ecosystem-hero.jpg" alt="Precifarm charging ecosystem" />
        <figcaption>Spark · Pulse · Pod · Boda Hub · Depot · Corridor — one visual language from boot to highway.</figcaption>
      </figure>

      <div class="ev-strip">
        ${CHARGING_HARDWARE.map(chargingThumb).join("")}
      </div>

      ${dataTable({
        caption: "Precifarm EV charging hardware",
        columns: [
          { main: "Product" },
          { main: "Power", align: "right" },
          { main: "Connector", align: "right" },
          { main: "Role" },
          { main: "Typical session", align: "right" },
        ],
        rows: PRECIFARM_CHARGERS,
        numericCols: [1, 4],
      })}

      ${dataTable({
        caption: "Fast DC benchmark — Tesla vs BYD vs Precifarm [BENCHMARK]",
        columns: [
          { main: "Dimension" },
          { main: "Tesla Supercharger", align: "right" },
          { main: "BYD Megawatt Flash", align: "right" },
          { main: "Precifarm Corridor", align: "right", hl: true },
        ],
        rows: FAST_CHARGE_BENCHMARK,
        highlightCol: 3,
        rowLabels: true,
        numericCols: [1, 2, 3],
      })}

      ${dataTable({
        caption: "Modular energy × EV integration (PF-MODENERGY-002 §15)",
        columns: [
          { main: "Case" },
          { main: "Power / energy", align: "right" },
          { main: "Hardware", align: "right" },
          { main: "Status" },
        ],
        rows: EV_ENERGY_INTEGRATION,
        numericCols: [1],
      })}

      <div class="callout callout-blue">
        <strong>Benchmark read (Aug 2026)</strong>
        Tesla V4 reaches 500 kW per post; BYD targets 1 MW at 1,000 V in China. Standard CCS2 remains ~500 A class.
        Precifarm targets <strong>120–320 kW CCS2</strong> corridor hubs with solar/BESS, reserved bus windows and M-Pesa —
        right-sized for Kenya, not the megawatt race. Sources: §18–§19 · Tesla Supercharger for Business · BYD Super e-Platform.
      </div>

      <footer class="page-foot">
        <strong>Precifarm Modular Energy + EV Charging — Design Overview</strong><br />
        ${DOC.id} · v${DOC.version} · ${DOC.date} · Engineering package: precifarm-solar-charger-stations-engineering.pdf<br />
        Corridor DC and route hubs are designed, not universally commissioned. No megawatt or V2G claims without hardware and regulatory basis.
      </footer>
    </section>`;
}

const CONTEXTS = [
  {
    file: "render-kenya-home.png",
    name: "Urban home",
    text: "P2 beside consumer DB — tiled utility corner, spare module storage, living-space acceptable finish",
  },
  {
    file: "render-kenya-sme.png",
    name: "SME retail",
    text: "Wall-shaded Pod for cold storage continuity — plinth mount, filtered louvres, rooftop PV",
  },
  {
    file: "render-solar-ev.png",
    name: "Solar + EV",
    text: "Carport charging from customer solar surplus — Phase A home energy loop, Nairobi suburban context",
  },
];

function compressRender(src, dest, maxWidth = 1400) {
  if (process.platform !== "win32") {
    copyFileSync(src, dest);
    return;
  }

  const ps = `
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('${src.replace(/\\/g, "\\\\").replace(/'/g, "''")}')
$ratio = [Math]::Min(1, ${maxWidth} / $img.Width)
$w = [int]($img.Width * $ratio)
$h = [int]($img.Height * $ratio)
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $w, $h)
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 88)
$bmp.Save('${dest.replace(/\\/g, "\\\\").replace(/'/g, "''")}', $enc, $ep)
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
`;

  execFileSync("powershell", ["-NoProfile", "-Command", ps], { stdio: "pipe" });
}

function stageRenders() {
  mkdirSync(assetDir, { recursive: true });
  if (!existsSync(rendersSrc)) throw new Error(`Missing renders: ${rendersSrc}`);

  const needed = new Set([
    "render-family-hero.png",
    ...PRODUCTS.map((p) => p.file),
    ...CONTEXTS.map((c) => c.file),
  ]);

  let count = 0;
  for (const name of readdirSync(rendersSrc)) {
    if (!needed.has(name)) continue;
    const from = join(rendersSrc, name);
    const jpgName = name.replace(/\.png$/i, ".jpg");
    const to = join(assetDir, jpgName);
    compressRender(from, to);
    count += 1;
  }

  if (count < needed.size) {
    const missing = [...needed].filter((n) => !existsSync(join(assetDir, n.replace(/\.png$/i, ".jpg"))));
    throw new Error(`Missing render files: ${missing.join(", ")}`);
  }
  return count;
}

function stageChargingAssets() {
  const productsDir = join(root, "public", "images", "products");
  let count = 0;
  for (const [jpgName, relPath] of CHARGING_IMAGE_FILES) {
    const from = join(root, "public", "images", relPath);
    if (!existsSync(from)) throw new Error(`Missing charging product image: ${from}`);
    compressRender(from, join(assetDir, jpgName));
    count += 1;
  }
  const heroSrc = join(root, "public", "images", "charging-ecosystem-hero-v18.png");
  if (!existsSync(heroSrc)) throw new Error(`Missing charging ecosystem hero: ${heroSrc}`);
  compressRender(heroSrc, join(assetDir, "charging-ecosystem-hero.jpg"));
  count += 1;
  return count;
}

function productCard(item) {
  const file = item.file.replace(/\.png$/i, ".jpg");
  return `
    <figure class="card">
      <div class="card-img"><img src="./modenergy-design/${file}" alt="${item.name}" /></div>
      <figcaption>
        <span class="card-name">${item.name}</span>
        <span class="card-tag">${item.tag}</span>
        <p class="card-text">${item.text}</p>
      </figcaption>
    </figure>`;
}

function contextCard(item) {
  const file = item.file.replace(/\.png$/i, ".jpg");
  return `
    <figure class="ctx">
      <div class="ctx-img"><img src="./modenergy-design/${file}" alt="${item.name}" /></div>
      <figcaption>
        <strong>${item.name}</strong>
        <p>${item.text}</p>
      </figcaption>
    </figure>`;
}

function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en-KE">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Precifarm Modular Energy — Industrial Design Overview (${DOC.id} v${DOC.version})</title>
<meta name="description" content="Three-page industrial design overview for Precifarm P1 Go, Energy Module, P2 Home and Pod — conceptual renders and Kenya installation context." />
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
    font-size: 8.5pt;
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
    margin-bottom: 6mm; padding-bottom: 3mm; border-bottom: 2px solid var(--ink);
  }
  .brand { display: flex; align-items: center; gap: 2.5mm; }
  .brand img { width: 8mm; height: 8mm; }
  .brand-word { display: block; font-size: 7pt; font-weight: 700; letter-spacing: .14em; color: var(--ink); }
  .brand-sub { display: block; font-size: 6.5pt; color: var(--subtle); }
  .doc-id { font-family: var(--mono); font-size: 6.5pt; color: var(--subtle); text-align: right; line-height: 1.5; }

  .page-cover { padding-top: 8mm; }
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
  .cover-lead { margin: 0 0 5mm; max-width: 130mm; font-size: 10pt; color: var(--muted); }
  .cover-pills { display: flex; flex-wrap: wrap; gap: 2mm; margin-bottom: 6mm; }
  .cover-pills span {
    padding: 1.5mm 4mm; border-radius: 999px; font-size: 6.5pt; font-weight: 600;
    letter-spacing: .06em; background: var(--blue-soft); color: var(--blue);
  }
  .hero {
    margin: 0; border-radius: 10px; overflow: hidden;
    border: 1px solid var(--line); box-shadow: 0 12px 36px rgba(15,23,42,.1);
    background: var(--soft);
  }
  .hero img { display: block; width: 100%; height: 118mm; object-fit: cover; object-position: center 42%; }
  .hero figcaption {
    padding: 3mm 4mm; font-size: 7pt; color: var(--subtle);
    border-top: 1px solid var(--line); background: #fff;
  }
  .cover-foot {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm;
    margin-top: 5mm; padding: 4mm; border-radius: 8px; background: var(--soft);
    font-size: 7pt;
  }
  .cover-foot span { display: block; color: var(--subtle); font-size: 6pt; text-transform: uppercase; letter-spacing: .08em; }
  .cover-foot strong { color: var(--ink); font-size: 7.5pt; }
  .cover-note {
    margin: 4mm 0 0; padding: 3mm 4mm; border-left: 2px solid var(--blue);
    font-size: 6.8pt; color: var(--subtle); background: #fafafa; border-radius: 0 6px 6px 0;
  }

  .sec-title {
    margin: 0 0 1mm; font-size: 14pt; font-weight: 700; letter-spacing: -.02em; color: var(--ink);
  }
  .sec-lead { margin: 0 0 5mm; font-size: 8.5pt; color: var(--subtle); max-width: 150mm; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
  .card {
    margin: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
    background: #fff; box-shadow: 0 8px 24px rgba(15,23,42,.06);
  }
  .card-img { background: var(--soft); }
  .card-img img { display: block; width: 100%; height: 52mm; object-fit: cover; object-position: center; }
  .card figcaption { padding: 3mm 3.5mm 4mm; }
  .card-name { display: block; font-size: 9.5pt; font-weight: 700; color: var(--ink); }
  .card-tag {
    display: inline-block; margin: 1mm 0 2mm; padding: .8mm 2.5mm; border-radius: 999px;
    font-size: 6pt; font-weight: 600; letter-spacing: .04em;
    background: var(--blue-soft); color: var(--blue);
  }
  .card-text { margin: 0; font-size: 7pt; line-height: 1.45; color: var(--subtle); }

  .ctx-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; margin-bottom: 5mm; }
  .ctx {
    margin: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #fff;
    box-shadow: 0 8px 24px rgba(15,23,42,.06);
  }
  .ctx-img { background: var(--soft); }
  .ctx-img img { display: block; width: 100%; height: 58mm; object-fit: cover; object-position: center; }
  .ctx figcaption { padding: 3mm; }
  .ctx strong { display: block; font-size: 8.5pt; color: var(--ink); margin-bottom: 1mm; }
  .ctx p { margin: 0; font-size: 6.8pt; line-height: 1.42; color: var(--subtle); }

  .lang-box {
    padding: 4mm 5mm; border-radius: 10px; background: var(--soft); border: 1px solid var(--line);
  }
  .lang-box h3 { margin: 0 0 2mm; font-size: 9pt; color: var(--ink); }
  .lang-list { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5mm 6mm; }
  .lang-list li { font-size: 7pt; color: var(--muted); padding-left: 3mm; position: relative; }
  .lang-list li::before {
    content: ""; position: absolute; left: 0; top: .55em; width: 1.2mm; height: 1.2mm;
    border-radius: 50%; background: var(--blue);
  }
  .page-foot {
    margin-top: 4mm; padding-top: 3mm; border-top: 1px solid var(--line);
    font-size: 6.5pt; color: var(--subtle); line-height: 1.5;
  }

  .sec-lead-tight { margin-bottom: 3mm; font-size: 7.5pt; }
  .param-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; margin-bottom: 3.5mm; }
  .param-block { min-width: 0; }

  .table-shell {
    margin-bottom: 3.5mm;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(15, 23, 42, .05);
  }
  .table-caption {
    padding: 2mm 3mm;
    font-size: 7.2pt;
    font-weight: 700;
    letter-spacing: .01em;
    color: var(--ink);
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 1px solid #cbd5e1;
  }
  .data-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
    font-size: 7pt;
    line-height: 1.45;
  }
  .data-table thead th {
    background: #1d4ed8;
    color: #fff;
    font-weight: 600;
    font-size: 6.4pt;
    letter-spacing: .05em;
    text-transform: uppercase;
    padding: 2.2mm 2.8mm;
    text-align: left;
    vertical-align: bottom;
    border-right: 1px solid rgba(255,255,255,.12);
  }
  .data-table thead th:last-child { border-right: none; }
  .data-table thead th.num { text-align: right; }
  .data-table thead th.hl { background: #1e40af; }
  .data-table .th-main { display: block; line-height: 1.25; }
  .data-table .th-unit {
    display: block;
    margin-top: .4mm;
    font-size: 5.8pt;
    font-weight: 500;
    letter-spacing: .02em;
    text-transform: none;
    opacity: .82;
  }
  .data-table tbody td {
    padding: 2mm 2.8mm;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
    color: var(--muted);
  }
  .data-table tbody tr:nth-child(even) td { background: #f8fafc; }
  .data-table tbody tr:last-child td { border-bottom: none; }
  .data-table tbody td.label {
    font-weight: 600;
    color: var(--ink);
    background: #f1f5f9 !important;
    width: 24%;
  }
  .data-table tbody td.num {
    font-family: var(--mono);
    font-size: 6.9pt;
    font-weight: 500;
    text-align: right;
    white-space: nowrap;
    color: #334155;
  }
  .data-table tbody td.hl {
    background: #dbeafe !important;
    color: #1e3a8a;
    font-weight: 700;
  }
  .data-table tbody tr.row-total td {
    font-weight: 700;
    color: var(--ink);
    background: #e2e8f0 !important;
    border-top: 2px solid #94a3b8;
  }
  .callout {
    margin-top: 2mm;
    padding: 3mm 3.5mm;
    border-radius: 8px;
    font-size: 6.8pt;
    line-height: 1.5;
    color: var(--muted);
  }
  .callout strong { color: var(--ink); }
  .callout-blue {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-left: 3px solid var(--blue);
  }

  .ev-hero {
    margin: 0 0 3mm; border-radius: 10px; overflow: hidden;
    border: 1px solid var(--line); background: var(--soft);
    box-shadow: 0 8px 24px rgba(15,23,42,.06);
  }
  .ev-hero img { display: block; width: 100%; height: 38mm; object-fit: cover; object-position: center; }
  .ev-hero figcaption {
    padding: 2mm 3mm; font-size: 6.5pt; color: var(--subtle);
    border-top: 1px solid var(--line); background: #fff;
  }

  .ev-strip {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 2mm; margin-bottom: 3mm;
  }
  .ev-thumb {
    margin: 0; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: #fff;
  }
  .ev-thumb-img { background: var(--soft); padding: 1.5mm; }
  .ev-thumb-img img { display: block; width: 100%; height: 22mm; object-fit: contain; object-position: center; }
  .ev-thumb figcaption { padding: 1.5mm 2mm 2mm; text-align: center; }
  .ev-thumb strong { display: block; font-size: 6pt; color: var(--ink); line-height: 1.2; }
  .ev-thumb span { display: block; font-size: 5.5pt; color: var(--subtle); margin-top: .5mm; }

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
    .card, .ctx, .hero, .lang-box, .table-shell, .ev-thumb { break-inside: avoid; }
    .data-table { font-size: 6.8pt; }
    .data-table tbody td.num { font-size: 6.6pt; }
  }
</style>
</head>
<body>
  <div class="print-footer" aria-hidden="true">
    <span>${DOC.id} · v${DOC.version}</span>
    <span>Industrial Design Overview · ${DOC.companion}</span>
    <span>${DOC.date}</span>
  </div>

  <div class="toolbar">
    <div style="display:flex;align-items:center;gap:.6rem">
      <img src="./precifarm-logo-mark.svg" alt="" width="22" height="22" />
      <span class="id">${DOC.id} · v${DOC.version} · ${DOC.status}</span>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button type="button" class="primary" onclick="window.print()">Print</button>
      <a class="primary" href="./precifarm-modular-energy-design.pdf" download>Download PDF</a>
      <a href="/charging/modular-energy">Back to modular energy</a>
    </div>
  </div>

  <main class="sheet">
    <section class="page page-cover">
      <div class="cover-accent" aria-hidden="true"></div>
      <header class="page-head">
        <div class="brand">
          <img src="./precifarm-logo-mark.svg" alt="" />
          <div>
            <span class="brand-word">PRECIFARM</span>
            <span class="brand-sub">Modular Energy Platform</span>
          </div>
        </div>
        <div class="doc-id">${DOC.id}<br />v${DOC.version}<br />${DOC.date}</div>
      </header>

      <p class="cover-eyebrow">Industrial Design Overview · ${DOC.pages} pages</p>
      <h1 class="cover-title">One module.<br />Three scales.</h1>
      <p class="cover-lead">
        Conceptual industrial design for P1 Go, Energy Module, P2 Home and Pod —
        unified aluminum-and-glass language for Kenya homes and SMEs.
      </p>
      <div class="cover-pills">
        <span>P1 GO</span><span>P2 HOME</span><span>POD</span><span>ENERGY OS</span><span>EV CHARGING</span>
      </div>

      <figure class="hero">
        <img src="./modenergy-design/render-family-hero.jpg" alt="Precifarm modular energy product family" />
        <figcaption>Render 1 — Product family. Seamless aluminum, glass UI strips, one repeated Energy Module. CONCEPTUAL.</figcaption>
      </figure>

      <div class="cover-foot">
        <div><span>Document</span><strong>${DOC.id}</strong></div>
        <div><span>Status</span><strong>${DOC.status}</strong></div>
        <div><span>Companion</span><strong>${DOC.companion}</strong></div>
      </div>
      <p class="cover-note">
        All renders are conceptual industrial-design visualisations. They communicate design and installation intent only —
        not manufacturing models, dimensioned drawings or certified product specifications.
      </p>
    </section>

    <section class="page page-products">
      <header class="page-head">
        <div class="brand">
          <img src="./precifarm-logo-mark.svg" alt="" />
          <div>
            <span class="brand-word">PRECIFARM</span>
            <span class="brand-sub">Product renders</span>
          </div>
        </div>
        <div class="doc-id">${DOC.id} · Page 2 of ${DOC.pages}</div>
      </header>

      <h2 class="sec-title">Product family</h2>
      <p class="sec-lead">
        One standardised Energy Module is the unit of capacity. Power Core (or Pod Power Unit) is the unit of power.
        The same module slides from portability to home backup to SME outdoor storage.
      </p>

      <div class="grid-2">
        ${PRODUCTS.map(productCard).join("")}
      </div>
    </section>

    ${buildParametersPage()}

    <section class="page page-context">
      <header class="page-head">
        <div class="brand">
          <img src="./precifarm-logo-mark.svg" alt="" />
          <div>
            <span class="brand-word">PRECIFARM</span>
            <span class="brand-sub">Kenya installation context</span>
          </div>
        </div>
        <div class="doc-id">${DOC.id} · Page 4 of ${DOC.pages}</div>
      </header>

      <h2 class="sec-title">Designed for real sites</h2>
      <p class="sec-lead">
        Installation context is part of the design brief — utility corners, SME refrigeration continuity,
        and solar-to-EV loops on Nairobi suburban homes.
      </p>

      <div class="ctx-row">
        ${CONTEXTS.map(contextCard).join("")}
      </div>

      <div class="lang-box">
        <h3>Design language</h3>
        <ul class="lang-list">
          <li>Seamless brushed aluminum and matte white enclosures</li>
          <li>Glass UI strips — energy remaining, health, expansion</li>
          <li>Fold-flat top handle and tilt stand (P1 Go)</li>
          <li>Blind-mate module connectors — field service without rack tools</li>
          <li>Living-space acceptable finish for urban utility rooms</li>
          <li>Wall-shaded Pod placement with plinth and filtered airflow</li>
        </ul>
      </div>
    </section>

    ${buildEvChargingPage()}
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
  const staged = stageRenders();
  const charging = stageChargingAssets();
  console.log(`Staged ${staged} renders + ${charging} charging images into ${assetDir}`);

  writeFileSync(htmlOut, buildHtml(), "utf8");
  console.log(`Wrote ${htmlOut}`);

  generatePdf(htmlOut);
  const bytes = readFileSync(pdfOut).length;
  console.log(`Wrote ${pdfOut} (${(bytes / 1024).toFixed(0)} KB)`);
}

main();
