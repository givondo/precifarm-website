/**
 * Generate PF-PRODUCT-ENG-001 — Precifarm product & service engineering reference.
 * Illustrated portfolio reference: every product and service with the engineering
 * numbers, design basis and approval gates needed to start a design.
 *
 * Usage: node scripts/generate-product-engineering-pdf.mjs
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  brandDocFooterHtml,
  brandPrintCss,
  brandPrintFooterHtml,
  brandToolbarHtml,
  escapeHtml,
  printHtmlToPdf,
} from "./lib/document-brand.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");
const downloadsDir = join(root, "public", "downloads");
const assetDir = join(downloadsDir, "product-engineering");
const htmlOut = join(downloadsDir, "precifarm-product-engineering-reference.html");
const pdfOut = join(downloadsDir, "precifarm-product-engineering-reference.pdf");

const DOC = {
  id: "PF-PRODUCT-ENG-001",
  version: "1.0",
  status: "Engineering Design Reference",
  date: "11 September 2026",
  pages: 12,
  companions: "PF-ENG-SOLAR-HUB-001 · PF-MODENERGY-002",
};

/** Staged into ./product-engineering/: [asset key, path under public/images] */
const IMAGE_FILES = [
  ["ecosystem-hero", "charging-ecosystem-hero-v21.png"],
  ["spark", "products/spark-v3.png"],
  ["pulse", "products/pulse-v9.png"],
  ["pod", "products/pod.png"],
  ["pod-garage", "products/pod-home-hero-v3-garage-4x3.png"],
  ["depot", "products/depot-v5.png"],
  ["corridor", "products/corridor-v5.png"],
  ["corridor-safety", "products/corridor-safety.png"],
  ["boda", "products/boda-v3.png"],
  ["boda-locker-family", "products/boda-hub-locker-family-v3.png"],
  ["boda-bay-module", "products/boda-hub-bay-module-v2.png"],
  ["boda-site-petrol", "products/boda-hub-site-petrol.png"],
  ["energy-module", "products/energy-module-256-v2.png"],
  ["financing", "products/financing.png"],
  ["p1-go", "modular-energy/render-p1-go-v5.png"],
  ["p2-home", "modular-energy/render-p2-home-v2.png"],
  ["mini-stack", "modular-energy/render-pod.png"],
  ["modular-family", "modular-energy/render-family-hero-v3.jpg"],
  ["megapack", "megapack-hero-v3.png"],
  ["megapack-ev-hub", "megapack-ev-hub-v2.png"],
  ["eng-architecture", "engineering/system-architecture.png"],
  ["eng-site-plan", "engineering/site-plan.png"],
  ["eng-route-hub", "engineering/route-hub.png"],
  ["eng-home-hybrid", "engineering/home-hybrid.png"],
  ["hub-premium", "charging-hub-premium-kenya.png"],
];

/** asset key -> staged filename, populated by stageImages() before buildHtml(). */
const ASSET = {};

/* ---------------------------------------------------------------- data --- */

const PORTFOLIO = [
  ["Spark charger", "Portable AC", "3.3 kW", "Type 2", "On sale", "KES 25,000"],
  ["Pulse charger", "Home wallbox", "7 kW AC", "Type 2", "On sale", "KES 79,000"],
  ["Pod energy storage", "Home charger + battery", "7 kW + 5–10 kWh", "Type 2", "On sale", "KES 295,000"],
  ["Depot station", "Fleet / campus AC", "22 kW AC", "Type 2", "On sale", "Quoted per site"],
  ["Corridor charging", "Highway DC", "120 kW+ DC", "Dual CCS2", "On sale", "KES 39/kWh"],
  ["Boda Hub", "Battery swap", "2.56 kWh packs", "Pack swap", "Partner sites live", "Fleet pricing"],
  ["Automated Boda Hub", "Self-service lockers", "8–24+ doors", "Pack swap", "In design & testing", "Not quoted"],
  ["Energy Module", "2.56 kWh building block", "2.56 kW", "Blind-mate", "Conceptual", "Not on sale"],
  ["P1 Go", "Portable backup", "~1 kWh", "UK 3-pin / USB", "Conceptual", "Not on sale"],
  ["P2 Home", "Home backup tower", "2.6–10.2 kWh", "Sub-board", "Conceptual", "Not on sale"],
  ["Mini Stack", "Outdoor SME backup", "5.1–15.4 kWh", "Sub-board", "Conceptual", "Not on sale"],
  ["MegaPack", "Project BESS", "5 MWh – GWh", "Project HV", "Design-stage", "Project-engineered"],
];

const SERVICES = [
  ["Charging Hub", "Public map of Precifarm DC, Boda swap and partner sites", "Live"],
  ["Precifarm Agent", "AI electrical & energy engineering workspace", "Early access · desktop coming soon"],
  ["Engineering package", "Design basis for home, depot, corridor and partner sites", "Published (PF-ENG-SOLAR-HUB-001)"],
  ["Training T1 / T2 / T3", "Site staff, technician and commissioning certification", "Delivered in Nairobi + field"],
  ["Partners & fleet", "Hub hosting, fleet electrification, dealer and installer network", "By contract"],
  ["Lipa Pole Pole", "M-Pesa instalment financing for Pulse and Pod only", "Live · from KES 3,300/month"],
  ["Charging-as-a-Service", "Precifarm finances, installs and operates; pay per kWh or monthly", "By contract"],
];

const HOME_PRODUCTS = [
  {
    image: "spark",
    name: "Spark charger",
    tag: "Portable 3.3 kW",
    text: "Boot-carried Type 2 lead for 13 A sockets. Top-up tool, not a daily home solution.",
  },
  {
    image: "pulse",
    name: "Pulse charger",
    tag: "Home 7 kW AC",
    text: "Wall-mounted Type 2 wallbox. Consumer unit to parking bay, typically installed in one day.",
  },
  {
    image: "pod",
    name: "Pod energy storage",
    tag: "7 kW + 5–10 kWh",
    text: "Charger plus LiFePO4 storage for weak-grid evenings. Solar-ready, essential-load backup.",
  },
];

const HOME_SPECS = [
  ["Rated power", "3.3 kW", "7 kW", "7 kW"],
  ["Connector", "Type 2", "Type 2", "Type 2"],
  ["Supply", "13 A socket", "230 V / 50 Hz dedicated", "230 V / 50 Hz dedicated"],
  ["Storage", "None", "None", "5 or 10 kWh LiFePO4"],
  ["Typical day (~10 kWh)", "~180 min", "~90 min", "~90 min"],
  ["From (KES)", "25,000", "79,000", "295,000"],
  ["Lipa Pole Pole", "No", "Yes", "Yes"],
  ["Aftersale care", "Warranty", "3 years", "3 years"],
];

const HOME_INSTALL = [
  ["Supply check", "Confirm main fuse, consumer-unit spare ways and incoming cable rating before quoting."],
  ["Dedicated circuit", "Pulse and Pod run on their own protected radial — no spurs off socket circuits."],
  ["Protection", "RCD Type A plus DC fault detection, or RCD Type B where the unit does not provide detection."],
  ["Earthing", "Verify earthing arrangement and electrode resistance; PME export requires assessment."],
  ["Cable route", "Size for load and length; check voltage drop at the far end of the run, not the origin."],
  ["Backup scope", "Pod backs essential circuits on a sub-board — not air conditioning, cooking or water heating."],
  ["Commissioning", "Load test, M-Pesa test session, remote monitoring registration, customer handover."],
];

const HOME_PACKAGES = [
  ["Charge", "120,000", "7–11 kW AC wallbox, install", "No solar or battery"],
  ["Solar + Charge", "450,000", "4–5 kWp solar + 7–11 kW charger", "Battery optional"],
  ["Home Energy", "650,000", "~5 kWp + 5–10 kWh battery + 7–11 kW charger", "Essential backup circuits"],
];

const FLEET_SPECS = [
  ["Rated power", "22 kW AC", "120 kW+ DC"],
  ["Connector", "Type 2", "Dual CCS2"],
  ["Typical session", "40+ kWh in ~120 min", "~60 kWh in 30 min"],
  ["Design class", "11–22 kW where dwell > 2 h", "120–180 kW town · 240–320 kW highway"],
  ["Form factor", "Pedestal", "T-canopy, overhead cables"],
  ["Payment", "M-Pesa · account billing", "M-Pesa from KES 39/kWh"],
  ["Typical host", "Fleet yard, campus, partner retail", "Fuel retail, highway stop, transport terminus"],
];

const SITE_GATES = [
  ["Proven demand", "Enough EV sessions and corridor traffic to justify capital before deployment."],
  ["Power and tariff", "Feeder study, interconnection and tariff clarity resolved before irreversible spend."],
  ["Site and dwell", "Safe parking, shade and amenities — somewhere worth stopping, not just a plug."],
  ["Durable control", "Long-term site rights at fuel retailers, malls, yards or transport termini."],
  ["Approvals", "Regulatory and safety sign-off in place before public operation begins."],
];

const BODA_CONFIGS = [
  ["Compact", "8", "~20 kWh", "Shops, neighbourhood stages"],
  ["Standard", "12", "~30 kWh", "Petrol stations, urban hubs"],
  ["Locker bank", "24+", "Two or more cabinets", "Fleet yards, busy corridors"],
];

const MODULE_PARAMS = [
  ["Nominal energy", "2.56 kWh"],
  ["Configuration", "16s LiFePO4 · 51.2 V · 50 Ah"],
  ["Operating voltage", "44.8 – 58.4 V"],
  ["Max discharge", "50 A (1.0 C) → 2.56 kW"],
  ["Max charge", "30 A (0.6 C) → ~1.5 kW"],
  ["Peak discharge", "100 A / 10 s [VALIDATE]"],
  ["Usable AC (backup)", "2.17 kWh per module"],
  ["Daily cycling AC", "1.68 kWh per module"],
  ["Operating temperature", "−5 °C to +50 °C, derated above 40 °C"],
  ["Cycle life target", "≥ 4,000 cycles to 80 % SOH at 25 °C, 0.5 C"],
  ["Enclosure", "IP20 indoor · IP55 outdoor rack [CERT]"],
  ["Communications", "CAN 2.0B 500 kbit/s, RS-485 fallback"],
  ["Mass target", "≤ 30 kg"],
];

const MODULAR_PRODUCTS = [
  {
    image: "p1-go",
    name: "P1 Go",
    tag: "Portable · conceptual",
    text: "~1 kWh carry unit. Foldable 100–200 W panel on XT60, UK 3-pin sockets, USB-C and USB-A. Type 2 trickle only — not daily EV charging.",
  },
  {
    image: "p2-home",
    name: "P2 Home",
    tag: "1–4 modules · conceptual",
    text: "Floor-standing tower beside the consumer board. 2.6 / 5.1 / 7.7 / 10.2 kWh nameplate tiers, 2.4 or 4.8 kW inverter, essential-load sub-board.",
  },
  {
    image: "mini-stack",
    name: "Mini Stack",
    tag: "2–6 modules · conceptual",
    text: "Outdoor SME backup on a plinth with wall shade and service door. Fridge, till and lighting continuity. IP rating not certified yet.",
  },
];

const STACK_TIERS = [
  ["1", "2.56", "2.17", "~4.3 h at 500 W"],
  ["2", "5.12", "4.34", "~4.3 h at 1 kW"],
  ["3", "7.68", "6.51", "~3.3 h at 2 kW"],
  ["4", "10.24", "8.68", "~4.3 h at 2 kW"],
];

const MEGAPACK_SCALES = [
  ["Energy Block", "Sub-MWh", "Single skid or container", "Site backup, peak shaving"],
  ["MegaPack", "~5 – 100 MWh", "Container array", "Industrial, EV hub, C&I"],
  ["Energy Hub", "~25 – 500 MWh", "Multi-array site", "Grid support, large campus"],
  ["Energy Park", "500 MWh – GWh", "Utility plant", "Utility firming, market services"],
];

const MEGAPACK_EXAMPLES = [
  ["EV charging hub", "1 MW grid · 1 MW solar · 5 MWh BESS", "1–2 MW chargers", "Illustrative"],
  ["Industrial site", "2 MW / 8 MWh (~4 h)", "Peak shaving, continuity", "Illustrative"],
  ["Utility plant", "50 MW / 200 MWh (~4 h)", "Firming and market services", "Illustrative"],
];

const KENYA_BASIS = [
  ["Grid", "230 V · 50 Hz · Type G"],
  ["Design solar (Nairobi)", "4.7 PSH · ~3.5 kWh/kWp/day"],
  ["PV performance ratio", "0.75 planning"],
  ["Canopy PV yield band", "4.5 – 5.5 kWh/kWp/day"],
  ["Grid cost (all-in)", "KES 20 – 28 / kWh"],
  ["E-mobility tariff", "~KES 8 off-peak · 16 peak, before levies"],
  ["Domestic net-metering cap", "10 kW"],
  ["Average monthly outage", "~8.4 h reported"],
  ["Typical Nairobi day", "~60 km ≈ ~10 kWh"],
  ["EV consumption default", "0.18 kWh/km"],
];

const FORMULAS = [
  ["Daily EV energy", "E_day = distance × consumption", "80 km × 0.18 = 14.4 kWh"],
  ["Charge time", "t = E_day ÷ P_charger", "14.4 ÷ 7 = 2.1 h"],
  ["Minimum charger power", "P_min = E_day ÷ window", "18 ÷ 10 = 1.8 kW"],
  ["Usable storage", "E_use = nameplate × SOC window × conversion", "2.56 × 0.90 × 0.94 = 2.17 kWh"],
  ["Backup duration", "t = E_use ÷ load", "8.68 ÷ 2 = 4.3 h"],
  ["PV daily yield", "E_pv = kWp × PSH × PR", "50 × 4.7 × 0.75 ≈ 176 kWh/day"],
  ["Peak site power", "P = E_session ÷ session time", "120 kWh ÷ 0.5 h = 240 kW"],
  ["BESS gap", "E_gap = (P_demand − P_import) × time", "(253 − 180) × 0.5 ≈ 37 kWh"],
];

const WORKED_CORRIDOR = [
  ["Session target", "120 kWh in 30 minutes"],
  ["Power at vehicle", "240 kW"],
  ["Site demand with losses", "~253 kW"],
  ["Grid import limit", "180 kW"],
  ["Shortfall energy", "~37 kWh per session"],
  ["BESS sizing with reserve", "80 – 100 kWh usable"],
  ["Canopy PV", "40 – 80 kWp → 180 – 440 kWh/day"],
  ["PV share of 1,500 kWh/day hub", "12 – 30 %"],
];

const ELECTRICAL_CHECKS = [
  ["Load schedule", "List every circuit with power and duty before sizing anything."],
  ["Peak demand", "Apply diversity to household loads; charger load is not diversified."],
  ["Supply capacity", "Compare peak demand against main fuse and Kenya Power connection."],
  ["Cable sizing", "Size on current-carrying capacity, then verify voltage drop over the run."],
  ["Protection", "Overcurrent plus RCD Type A with DC detection, or Type B where required."],
  ["Distribution board", "Confirm spare ways, busbar rating and labelling before install day."],
  ["Earthing", "Verify arrangement and electrode resistance; assess PME export."],
  ["Load management", "Where supply is tight, limit charger current rather than upgrading blindly."],
];

const APPROVALS = [
  ["Kenya Power", "Load application, connection study, metering", "Before irreversible spend"],
  ["EPRA", "Electrical installation compliance", "Design and install"],
  ["NEMA", "Environmental screening where applicable", "Site development"],
  ["County fire", "Fire safety approval for public sites", "Before public operation"],
  ["Precifarm CSMS", "OCPP registration and M-Pesa test session", "Commissioning"],
];

const EVIDENCE_LABELS = [
  ["actual", "Measured or delivered — verifiable today."],
  ["contracted", "Committed in a signed agreement."],
  ["pipeline", "In progress, not yet committed."],
  ["target", "Design intent, not yet proven."],
  ["planning assumption", "Used for sizing; confirm on site."],
  ["illustrative", "Example figure to explain a concept."],
];

const AGENT_TOOLS = [
  ["EV energy", "calculateEvEnergy()"],
  ["Charging", "calculateChargingTime()"],
  ["Load", "calculatePeakLoad()"],
  ["Solar", "sizePvSystem()"],
  ["Battery", "sizeBattery()"],
  ["Inverter", "sizeInverter()"],
  ["Cables", "calculateVoltageDrop()"],
  ["Protection", "sizeProtection()"],
  ["Costs", "calculateEnergyCost()"],
];

const TRAINING = [
  ["T1", "1 day", "Hub staff, drivers, site hosts", "24 months"],
  ["T2", "3 days", "Field technicians", "Annual refresher"],
  ["T3", "5 days", "Commissioning engineers", "Annual refresher + authorisation"],
];

const OPERATING_COST = [
  ["Home charging day (~60 km)", "~KES 140", "Illustrative"],
  ["Diesel equivalent day", "~KES 1,000", "Illustrative"],
  ["Public DC session", "From KES 39/kWh", "Actual tariff floor"],
  ["Boda swap", "Under 5 minutes", "Actual at live sites"],
];

/* ------------------------------------------------------------- helpers --- */

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
    .map((row) => {
      const isTotal = row[0]?.toLowerCase().includes("total");
      const cells = row
        .map((cell, j) => {
          const cls = [rowLabels && j === 0 ? "label" : "", numSet.has(j) ? "num" : "", highlightCol === j ? "hl" : ""]
            .filter(Boolean)
            .join(" ");
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

function productCard(item) {
  return `
    <figure class="card">
      <div class="card-img"><img src="./product-engineering/${ASSET[item.image]}" alt="${escapeHtml(item.name)}" /></div>
      <figcaption>
        <span class="card-name">${escapeHtml(item.name)}</span>
        <span class="card-tag">${escapeHtml(item.tag)}</span>
        <p class="card-text">${escapeHtml(item.text)}</p>
      </figcaption>
    </figure>`;
}

function plate(key, alt, caption, cls = "") {
  return `
    <figure class="plate ${cls}">
      <img src="./product-engineering/${ASSET[key]}" alt="${escapeHtml(alt)}" />
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>`;
}

function checklist(rows, caption) {
  return `
    <div class="check-shell">
      <div class="table-caption">${escapeHtml(caption)}</div>
      <ul class="check-list">
        ${rows
          .map(
            ([title, text]) =>
              `<li><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></li>`,
          )
          .join("")}
      </ul>
    </div>`;
}

/* --------------------------------------------------------------- pages --- */

function coverPage() {
  return `
    <section class="page page-cover">
      <div class="cover-accent" aria-hidden="true"></div>
      <header class="page-head">
        <div class="brand">
          <img src="./precifarm-logo-mark.svg" alt="" />
          <div>
            <span class="brand-word">PRECIFARM</span>
            <span class="brand-sub">Products &amp; services</span>
          </div>
        </div>
        <div class="doc-id">${DOC.id}<br />v${DOC.version}<br />${DOC.date}</div>
      </header>

      <p class="cover-eyebrow">Engineering Design Reference · ${DOC.pages} pages</p>
      <h1 class="cover-title">Every product.<br />Every number you need to start a design.</h1>
      <p class="cover-lead">
        The full Precifarm range — home charging, fleet and highway charging, battery swap, modular energy
        and project storage — with ratings, sizing rules, installation requirements and approval gates in one place.
      </p>
      <div class="cover-pills">
        <span>SPARK</span><span>PULSE</span><span>POD</span><span>DEPOT</span><span>CORRIDOR</span>
        <span>BODA HUB</span><span>MODULAR ENERGY</span><span>MEGAPACK</span>
      </div>

      <figure class="hero">
        <img src="./product-engineering/${ASSET["ecosystem-hero"]}" alt="Precifarm charging and energy product family" />
        <figcaption>The Precifarm range — portable Spark through highway Corridor DC, plus home storage and battery swap.</figcaption>
      </figure>

      <div class="cover-foot">
        <div><span>Document</span><strong>${DOC.id}</strong></div>
        <div><span>Status</span><strong>${DOC.status}</strong></div>
        <div><span>Companions</span><strong>${DOC.companions}</strong></div>
      </div>
      <p class="cover-note">
        Sizing figures are planning assumptions for early design. Every installation still needs a site survey,
        Kenya Power confirmation and licensed professional sign-off. Modular energy products are conceptual and not on sale.
      </p>
    </section>`;
}

function portfolioPage() {
  return `
    <section class="page">
      ${pageHead("Portfolio at a glance", 2)}

      <h2 class="sec-title">What Precifarm sells, and what is still concept</h2>
      <p class="sec-lead sec-lead-tight">
        Status is part of the specification. On-sale products can be quoted and installed today.
        Conceptual products show design intent and must never be offered for sale.
      </p>

      ${dataTable({
        caption: "Hardware portfolio",
        columns: [
          { main: "Product" },
          { main: "Role" },
          { main: "Rating", align: "right" },
          { main: "Interface", align: "right" },
          { main: "Status" },
          { main: "From", align: "right" },
        ],
        rows: PORTFOLIO,
        numericCols: [2, 3, 5],
      })}

      ${dataTable({
        caption: "Services and platform",
        columns: [{ main: "Service" }, { main: "What it does" }, { main: "Status" }],
        rows: SERVICES,
      })}

      ${dataTable({
        caption: "Evidence labels used across Precifarm documents",
        columns: [{ main: "Label" }, { main: "Meaning" }],
        rows: EVIDENCE_LABELS,
        rowLabels: true,
      })}

      <div class="callout callout-amber">
        <strong>Naming rules that must hold</strong>
        Lipa Pole Pole is M-Pesa financing for Pulse and Pod — it is not a charger.
        Pod energy storage (home) is not Mini Stack (outdoor modular energy).
        MegaPack is project-engineered, not a catalogue item. Automated Boda Hub lockers are still in design and testing.
      </div>
    </section>`;
}

function homeProductPage() {
  return `
    <section class="page">
      ${pageHead("Home charging", 3)}

      <h2 class="sec-title">Home charging — Spark, Pulse, Pod</h2>
      <p class="sec-lead sec-lead-tight">
        Most Kenyan driving is a ~60 km day, about 10 kWh. That single number decides which product fits,
        and how long the vehicle needs to be plugged in.
      </p>

      <div class="grid-3">
        ${HOME_PRODUCTS.map(productCard).join("")}
      </div>

      ${dataTable({
        caption: "Home product specifications",
        columns: [
          { main: "Parameter" },
          { main: "Spark", align: "right" },
          { main: "Pulse", align: "right" },
          { main: "Pod", align: "right" },
        ],
        rows: HOME_SPECS,
        rowLabels: true,
        numericCols: [1, 2, 3],
      })}

      ${dataTable({
        caption: "Home energy packages — indicative, confirmed after survey",
        columns: [
          { main: "Package" },
          { main: "From (KES)", align: "right" },
          { main: "Contents" },
          { main: "Notes" },
        ],
        rows: HOME_PACKAGES,
        numericCols: [1],
      })}

      <div class="callout callout-blue">
        <strong>Choosing between them</strong>
        Spark covers a top-up where no wallbox exists. Pulse is the default for a home with a stable supply.
        Pod is for weak-grid sites where the customer also wants essential-load backup. Solar is added to Pod, not to Spark.
      </div>
    </section>`;
}

function homeInstallPage() {
  return `
    <section class="page">
      ${pageHead("Home installation basis", 4)}

      <h2 class="sec-title">What has to be true before install day</h2>
      <p class="sec-lead sec-lead-tight">
        A home charger is a new continuous load on an existing installation. The survey exists to prove the supply,
        the board and the earthing can carry it.
      </p>

      <div class="split-2">
        <div>
          ${checklist(HOME_INSTALL, "Home survey and installation checklist")}
        </div>
        <div>
          ${plate("eng-home-hybrid", "Private house hybrid charging with solar and storage", "Home hybrid — grid, rooftop solar, storage and wallbox on one essential-load board.")}
          ${plate("pod-garage", "Pod energy storage installed in a Kenyan home garage", "Pod in a garage install — charger, storage and essential circuits in the same utility corner.")}
        </div>
      </div>

      ${dataTable({
        caption: "Running cost reference",
        columns: [{ main: "Item" }, { main: "Figure", align: "right" }, { main: "Evidence" }],
        rows: OPERATING_COST,
        rowLabels: true,
        numericCols: [1],
      })}

      <div class="callout callout-blue">
        <strong>Financing</strong>
        Lipa Pole Pole covers Pulse and Pod from KES 3,300 per month on M-Pesa. Deposit, monthly amount and total
        are shown before the customer commits. It does not apply to public charging sessions or Spark.
      </div>
    </section>`;
}

function fleetPage() {
  return `
    <section class="page">
      ${pageHead("Fleet and public charging", 5)}

      <h2 class="sec-title">Depot AC and Corridor DC</h2>
      <p class="sec-lead sec-lead-tight">
        Depot suits vehicles that park for hours. Corridor suits vehicles that stop for minutes.
        Dwell time, not vehicle type, decides which one a site needs.
      </p>

      <div class="grid-2">
        ${plate("depot", "Precifarm Depot 22 kW AC charging pedestal", "Depot — 22 kW AC pedestal for fleet yards, campuses and partner retail.")}
        ${plate("corridor", "Precifarm Corridor DC fast charger under a T-canopy", "Corridor — 120 kW+ DC under a T-canopy with dual CCS2 on overhead cables.")}
      </div>

      ${dataTable({
        caption: "Depot and Corridor specifications",
        columns: [{ main: "Parameter" }, { main: "Depot station", align: "right" }, { main: "Corridor charging", align: "right" }],
        rows: FLEET_SPECS,
        rowLabels: true,
        numericCols: [1, 2],
      })}

      ${dataTable({
        caption: "Five gates before Precifarm builds a hub",
        columns: [{ main: "Gate" }, { main: "Test" }],
        rows: SITE_GATES,
        rowLabels: true,
      })}

      <div class="callout callout-blue">
        <strong>Public AC rule of thumb</strong>
        Where dwell exceeds two hours, 11–22 kW Type 2 delivers more useful energy per shilling of capital than DC.
        Reserve DC for genuine turnaround stops.
      </div>
    </section>`;
}

function corridorEngineeringPage() {
  return `
    <section class="page">
      ${pageHead("Corridor site engineering", 6)}

      <h2 class="sec-title">Sizing a corridor site</h2>
      <p class="sec-lead sec-lead-tight">
        Grid import is usually the binding constraint, not the charger. Storage closes the gap between what the
        vehicle wants in 30 minutes and what the feeder can supply.
      </p>

      <div class="split-2">
        <div>
          ${dataTable({
            caption: "Worked example — 120 kWh in 30 minutes",
            columns: [{ main: "Step" }, { main: "Value", align: "right" }],
            rows: WORKED_CORRIDOR,
            rowLabels: true,
            numericCols: [1],
          })}
        </div>
        <div>
          ${plate("eng-route-hub", "Route hub with solar canopy, DC chargers and battery storage", "Route hub — solar canopy, DC posts and BESS behind one connection point.")}
          ${plate("corridor-safety", "Corridor charging safety and site marking", "Bay marking, lighting and safe cable management are part of the design, not an extra.")}
        </div>
      </div>

      ${plate("eng-architecture", "Precifarm charging system architecture", "System architecture — grid, PV, storage, CCS2 dispensers and the charging management system.", "plate-wide")}

      <div class="callout callout-amber">
        <strong>Storage does not replace a connection study</strong>
        BESS smooths peaks. It does not remove the need for a Kenya Power load application, and it does not
        licence export or public supply. Confirm both before committing capital.
      </div>
    </section>`;
}

function bodaPage() {
  return `
    <section class="page">
      ${pageHead("Boda Hub battery swap", 7)}

      <h2 class="sec-title">Swap in under five minutes</h2>
      <p class="sec-lead sec-lead-tight">
        Riders earn by the trip, so charging time is lost income. Swap moves the charging off the rider and
        onto the cabinet. Phase 1 runs on one validated 2.56 kWh Energy Module.
      </p>

      <div class="grid-3">
        ${plate("boda", "Precifarm twelve-bay Boda Hub battery swap cabinet", "Twelve-bay swap cabinet — the standard urban configuration.")}
        ${plate("boda-bay-module", "Boda Hub single bay module detail", "Bay module — one door, one pack, blind-mate power and comms.")}
        ${plate("boda-site-petrol", "Boda Hub lockers at a Kenyan petrol station", "Sited where riders already stop — petrol stations, stages and shops.")}
      </div>

      ${dataTable({
        caption: "Automated Boda Hub configurations",
        columns: [
          { main: "Configuration" },
          { main: "Doors", align: "right" },
          { main: "Stored energy", align: "right" },
          { main: "Typical site" },
        ],
        rows: BODA_CONFIGS,
        rowLabels: true,
        numericCols: [1, 2],
      })}

      ${plate("boda-locker-family", "Precifarm Boda Hub locker family", "Locker family — compact, standard and bank configurations share one bay module.", "plate-wide")}

      <div class="callout callout-amber">
        <strong>Status and limits</strong>
        Self-service lockers are in design and testing. Live Boda sites on Charging Hub may still be partner or staff
        operated. Weather rating is under test. Other battery packs are only supported after approval gates.
        Tariffs and payback come from pilots, not projections.
      </div>
    </section>`;
}

function modularPage() {
  return `
    <section class="page">
      ${pageHead("Modular energy — conceptual", 8)}

      <h2 class="sec-title">One module. Three scales.</h2>
      <p class="sec-lead sec-lead-tight">
        The modular energy platform is a design programme, not a product line. Targets below are engineering intent
        for review — nothing here is certified or for sale.
      </p>

      <div class="grid-3">
        ${MODULAR_PRODUCTS.map(productCard).join("")}
      </div>

      <div class="split-2">
        <div>
          ${dataTable({
            caption: "Energy Module — engineering targets",
            columns: [{ main: "Parameter" }, { main: "Target", align: "right" }],
            rows: MODULE_PARAMS,
            rowLabels: true,
            numericCols: [1],
          })}
        </div>
        <div>
          ${plate("energy-module", "Precifarm 2.56 kWh Energy Module", "The 2.56 kWh Energy Module — the repeated unit of capacity across the platform.")}
          ${dataTable({
            caption: "P2 Home stack tiers",
            columns: [
              { main: "Modules", align: "right" },
              { main: "Nameplate", unit: "kWh", align: "right" },
              { main: "Usable AC", unit: "kWh", align: "right" },
              { main: "Backup example" },
            ],
            rows: STACK_TIERS,
            numericCols: [0, 1, 2],
          })}
        </div>
      </div>

      <div class="callout callout-amber">
        <strong>Do not quote nameplate</strong>
        Usable AC energy is what the customer experiences: nameplate × SOC window × conversion.
        Quote expected usable kWh and state the reserve. Modular energy is conceptual — not on sale.
      </div>
    </section>`;
}

function megapackPage() {
  return `
    <section class="page">
      ${pageHead("MegaPack project storage", 9)}

      <h2 class="sec-title">Project-engineered storage, not a catalogue item</h2>
      <p class="sec-lead sec-lead-tight">
        Precifarm designs, integrates and develops MegaPack projects. Precifarm does not manufacture cells,
        power conversion or containers. Every figure below is scoped per site.
      </p>

      <div class="grid-2">
        ${plate("megapack", "Precifarm MegaPack utility-scale battery storage", "MegaPack — container-scale storage for industrial, hub and grid-connected sites.")}
        ${plate("megapack-ev-hub", "MegaPack supporting an EV charging hub", "Storage behind an EV hub — solar, grid and BESS feeding high-power chargers.")}
      </div>

      ${dataTable({
        caption: "Scale stages",
        columns: [{ main: "Stage" }, { main: "Energy", align: "right" }, { main: "Form" }, { main: "Typical use" }],
        rows: MEGAPACK_SCALES,
        rowLabels: true,
        numericCols: [1],
      })}

      ${dataTable({
        caption: "Illustrative project shapes",
        columns: [{ main: "Case" }, { main: "Sizing", align: "right" }, { main: "Role" }, { main: "Evidence" }],
        rows: MEGAPACK_EXAMPLES,
        rowLabels: true,
        numericCols: [1],
      })}

      <div class="callout callout-amber">
        <strong>Licensing</strong>
        Export and public EV charging may require licences. Storage does not replace grid interconnection studies.
        Chemistry is LFP where appropriate, confirmed per project.
      </div>
    </section>`;
}

function designBasisPage() {
  return `
    <section class="page">
      ${pageHead("Design basis and calculations", 10)}

      <h2 class="sec-title">The numbers every Precifarm design starts from</h2>
      <p class="sec-lead sec-lead-tight">
        Use these for first-pass sizing. Confirm supply, tariff and irradiance on site before quoting.
      </p>

      <div class="split-2">
        <div>
          ${dataTable({
            caption: "Kenya design basis",
            columns: [{ main: "Parameter" }, { main: "Value", align: "right" }],
            rows: KENYA_BASIS,
            rowLabels: true,
            numericCols: [1],
          })}
        </div>
        <div>
          ${dataTable({
            caption: "Precifarm Agent calculation tools",
            columns: [{ main: "Domain" }, { main: "Tool", align: "right" }],
            rows: AGENT_TOOLS,
            rowLabels: true,
            numericCols: [1],
          })}
        </div>
      </div>

      ${dataTable({
        caption: "Core sizing formulas",
        columns: [{ main: "Quantity" }, { main: "Formula" }, { main: "Worked value", align: "right" }],
        rows: FORMULAS,
        rowLabels: true,
        numericCols: [2],
      })}

      <div class="callout callout-blue">
        <strong>Order of work</strong>
        Establish the daily energy first, then the available charging window, then the minimum power.
        Only after that pick a product. Sizing the charger before the window is the most common error.
      </div>
    </section>`;
}

function electricalPage() {
  return `
    <section class="page">
      ${pageHead("Electrical and site engineering", 11)}

      <h2 class="sec-title">From load schedule to commissioning</h2>
      <p class="sec-lead sec-lead-tight">
        The same sequence applies to a single wallbox and a highway hub. Only the magnitudes change.
      </p>

      <div class="split-2">
        <div>
          ${checklist(ELECTRICAL_CHECKS, "Electrical design checklist")}
        </div>
        <div>
          ${plate("eng-site-plan", "Two-bay charging site plan", "Site plan — bays, clearances, cable routes and equipment positions agreed before civils.")}
          ${plate("hub-premium", "Precifarm charging hub in Kenya", "Hub context — lighting, shade and amenity decide whether drivers actually stop.")}
        </div>
      </div>

      ${dataTable({
        caption: "Kenya approval and hold points",
        columns: [{ main: "Authority" }, { main: "Scope" }, { main: "When" }],
        rows: APPROVALS,
        rowLabels: true,
      })}

      <div class="callout callout-amber">
        <strong>Hold points are not paperwork</strong>
        Each one can change the design. Clear the Kenya Power load application and tariff position before
        ordering equipment, not after.
      </div>
    </section>`;
}

function servicesPage() {
  return `
    <section class="page">
      ${pageHead("Services and support", 12)}

      <h2 class="sec-title">What surrounds the hardware</h2>
      <p class="sec-lead sec-lead-tight">
        Charging Hub gets drivers to a working bay. Training keeps sites safe. The Agent speeds up the engineering.
        Financing decides whether the customer can proceed at all.
      </p>

      ${dataTable({
        caption: "Training tiers",
        columns: [{ main: "Tier" }, { main: "Duration", align: "right" }, { main: "Audience" }, { main: "Validity" }],
        rows: TRAINING,
        rowLabels: true,
        numericCols: [1],
      })}

      <div class="split-2">
        <div>
          ${plate("financing", "Lipa Pole Pole M-Pesa instalment financing", "Lipa Pole Pole — M-Pesa instalments for Pulse and Pod. Financing, not a charger.")}
        </div>
        <div>
          ${plate("modular-family", "Precifarm modular energy product family", "Modular energy family — conceptual renders showing design intent only.")}
        </div>
      </div>

      <div class="callout callout-blue">
        <strong>Training delivery</strong>
        Cohorts of 6 to 16, Nairobi classroom plus field modules on the Nairobi–Kisumu corridor.
        Certificates issue within five business days. T1 is valid 24 months; T2 and T3 need annual refreshers.
      </div>

      <footer class="page-foot">
        <strong>Precifarm Products &amp; Services — Engineering Design Reference</strong><br />
        ${DOC.id} · v${DOC.version} · ${DOC.date} · Companions: ${DOC.companions}<br />
        Planning basis only. Every installation requires a site survey, Kenya Power confirmation and licensed sign-off.
        Conceptual products are not offered for sale.
      </footer>
    </section>`;
}

/* ----------------------------------------------------------------- html --- */

function buildHtml() {
  return `<!DOCTYPE html>
<html lang="en-KE">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Precifarm Products &amp; Services — Engineering Design Reference (${DOC.id} v${DOC.version})</title>
<meta name="description" content="Illustrated engineering reference for every Precifarm product and service: Spark, Pulse, Pod, Depot, Corridor, Boda Hub, modular energy and MegaPack, with ratings, sizing rules and Kenya approval gates." />
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
    --amber: #b45309;
    --amber-soft: #fffbeb;
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
    margin: 0 0 3mm; font-size: 24pt; font-weight: 700; line-height: 1.1;
    letter-spacing: -.03em; color: var(--ink);
  }
  .cover-lead { margin: 0 0 5mm; max-width: 140mm; font-size: 9.5pt; color: var(--muted); }
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
  .hero img { display: block; width: 100%; height: 104mm; object-fit: cover; object-position: center 45%; }
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

  .sec-title { margin: 0 0 1mm; font-size: 13.5pt; font-weight: 700; letter-spacing: -.02em; color: var(--ink); }
  .sec-lead { margin: 0 0 5mm; font-size: 8.5pt; color: var(--subtle); max-width: 160mm; }
  .sec-lead-tight { margin-bottom: 3.5mm; font-size: 7.6pt; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; margin-bottom: 3.5mm; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-bottom: 3.5mm; }
  .split-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; margin-bottom: 3.5mm; align-items: start; }

  .card {
    margin: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
    background: #fff; box-shadow: 0 6px 20px rgba(15,23,42,.06);
  }
  .card-img { background: var(--soft); padding: 2mm; }
  .card-img img { display: block; width: 100%; height: 36mm; object-fit: contain; object-position: center; }
  .card figcaption { padding: 2.5mm 3mm 3.5mm; }
  .card-name { display: block; font-size: 9pt; font-weight: 700; color: var(--ink); }
  .card-tag {
    display: inline-block; margin: 1mm 0 1.5mm; padding: .8mm 2.5mm; border-radius: 999px;
    font-size: 5.8pt; font-weight: 600; letter-spacing: .04em;
    background: var(--blue-soft); color: var(--blue);
  }
  .card-text { margin: 0; font-size: 6.8pt; line-height: 1.45; color: var(--subtle); }

  .plate {
    margin: 0 0 3mm; border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
    background: #fff; box-shadow: 0 6px 20px rgba(15,23,42,.06);
  }
  .plate img { display: block; width: 100%; height: 46mm; object-fit: cover; object-position: center; background: var(--soft); }
  .plate figcaption {
    padding: 2mm 3mm; font-size: 6.5pt; color: var(--subtle);
    border-top: 1px solid var(--line); background: #fff;
  }
  .plate-wide img { height: 52mm; }

  .check-shell {
    border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; background: #fff;
    box-shadow: 0 1px 4px rgba(15,23,42,.05); margin-bottom: 3.5mm;
  }
  .check-list { margin: 0; padding: 2mm 3mm 2.5mm; list-style: none; }
  .check-list li {
    position: relative; padding: 1.4mm 0 1.4mm 4mm; font-size: 7pt; line-height: 1.45;
    border-bottom: 1px solid #eef2f7;
  }
  .check-list li:last-child { border-bottom: none; }
  .check-list li::before {
    content: ""; position: absolute; left: 0; top: 2.6mm; width: 1.4mm; height: 1.4mm;
    border-radius: 50%; background: var(--blue);
  }
  .check-list strong { display: block; color: var(--ink); font-size: 7.2pt; }
  .check-list span { color: var(--subtle); }

  .table-shell {
    margin-bottom: 3.5mm; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;
    background: #fff; box-shadow: 0 1px 4px rgba(15,23,42,.05);
  }
  .table-caption {
    padding: 2mm 3mm; font-size: 7.2pt; font-weight: 700; color: var(--ink);
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 1px solid #cbd5e1;
  }
  .data-table { width: 100%; border-collapse: collapse; table-layout: auto; font-size: 7pt; line-height: 1.45; }
  .data-table thead th {
    background: #1d4ed8; color: #fff; font-weight: 600; font-size: 6.4pt;
    letter-spacing: .05em; text-transform: uppercase; padding: 2.2mm 2.6mm;
    text-align: left; vertical-align: bottom; border-right: 1px solid rgba(255,255,255,.12);
  }
  .data-table thead th:last-child { border-right: none; }
  .data-table thead th.num { text-align: right; }
  .data-table thead th.hl { background: #1e40af; }
  .data-table .th-main { display: block; line-height: 1.25; }
  .data-table .th-unit {
    display: block; margin-top: .4mm; font-size: 5.8pt; font-weight: 500;
    letter-spacing: .02em; text-transform: none; opacity: .82;
  }
  .data-table tbody td {
    padding: 1.9mm 2.6mm; border-bottom: 1px solid #e2e8f0; vertical-align: top; color: var(--muted);
  }
  .data-table tbody tr:nth-child(even) td { background: #f8fafc; }
  .data-table tbody tr:last-child td { border-bottom: none; }
  .data-table tbody td.label { font-weight: 600; color: var(--ink); background: #f1f5f9 !important; width: 22%; }
  .split-2 .data-table tbody td.label { width: 46%; }
  .data-table tbody td.num {
    font-family: var(--mono); font-size: 6.8pt; font-weight: 500; text-align: right;
    white-space: nowrap; color: #334155;
  }
  .data-table tbody td.hl { background: #dbeafe !important; color: #1e3a8a; font-weight: 700; }
  .data-table tbody tr.row-total td {
    font-weight: 700; color: var(--ink); background: #e2e8f0 !important; border-top: 2px solid #94a3b8;
  }

  .callout { margin-top: 2mm; padding: 3mm 3.5mm; border-radius: 8px; font-size: 6.8pt; line-height: 1.5; color: var(--muted); }
  .callout strong { display: block; color: var(--ink); margin-bottom: .8mm; }
  .callout-blue { background: var(--blue-soft); border: 1px solid #bfdbfe; border-left: 3px solid var(--blue); }
  .callout-amber { background: var(--amber-soft); border: 1px solid #fde68a; border-left: 3px solid var(--amber); }

  .page-foot {
    margin-top: 4mm; padding-top: 3mm; border-top: 1px solid var(--line);
    font-size: 6.5pt; color: var(--subtle); line-height: 1.5;
  }

  @page { size: A4; margin: 0; }
  @media print {
    .toolbar { display: none !important; }
    .sheet { max-width: none; }
    .page { min-height: 297mm; padding: 12mm 14mm 20mm; }
    .card, .plate, .hero, .table-shell, .check-shell, .callout { break-inside: avoid; }
    .data-table { font-size: 6.8pt; }
    .data-table tbody td.num { font-size: 6.6pt; }
  }
  ${brandPrintCss()}
</style>
</head>
<body>
  ${brandPrintFooterHtml({ id: DOC.id, version: DOC.version, date: DOC.date, shortTitle: "Products & Services" })}
  ${brandToolbarHtml({
    docId: DOC.id,
    version: DOC.version,
    status: DOC.status,
    pdfFile: "precifarm-product-engineering-reference.pdf",
    backHref: "/charging",
    backLabel: "Back to site",
  })}

  <main class="sheet">
    ${coverPage()}
    ${portfolioPage()}
    ${homeProductPage()}
    ${homeInstallPage()}
    ${fleetPage()}
    ${corridorEngineeringPage()}
    ${bodaPage()}
    ${modularPage()}
    ${megapackPage()}
    ${designBasisPage()}
    ${electricalPage()}
    ${servicesPage()}
    ${brandDocFooterHtml(
      { id: DOC.id, version: DOC.version, date: DOC.date, title: "Products & Services — Engineering Design Reference" },
      {
        livePagePath: "/charging/engineering",
        extraDisclaimer:
          "Planning basis for early design. Not a substitute for a site survey, Kenya Power studies, statutory approvals or licensed professional sign-off. Conceptual products are not offered for sale.",
      },
    )}
  </main>
</body>
</html>`;
}

/* ---------------------------------------------------------------- build --- */

const MAX_WIDTH = 1400;
const JPEG_QUALITY = 82;

/**
 * Downscale and re-encode every staged image to JPEG in one PowerShell pass.
 * Source PNGs embed losslessly and push the PDF past 30 MB; JPEG keeps it shareable.
 */
function compressAll(jobs) {
  const psPath = join(assetDir, "_compress.ps1");
  const lines = [
    "Add-Type -AssemblyName System.Drawing",
    "$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }",
    "$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)",
    `$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, ${JPEG_QUALITY})`,
  ];

  for (const { from, to } of jobs) {
    const src = from.replace(/'/g, "''");
    const dest = to.replace(/'/g, "''");
    lines.push(
      `$img = [System.Drawing.Image]::FromFile('${src}')`,
      `$ratio = [Math]::Min(1, ${MAX_WIDTH} / $img.Width)`,
      "$w = [int]($img.Width * $ratio); $h = [int]($img.Height * $ratio)",
      "$bmp = New-Object System.Drawing.Bitmap $w, $h",
      "$g = [System.Drawing.Graphics]::FromImage($bmp)",
      "$g.Clear([System.Drawing.Color]::White)",
      "$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic",
      "$g.DrawImage($img, 0, 0, $w, $h)",
      `$bmp.Save('${dest}', $enc, $ep)`,
      "$g.Dispose(); $bmp.Dispose(); $img.Dispose()",
    );
  }

  writeFileSync(psPath, lines.join("\n"), "utf8");
  execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", psPath], {
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 180000,
  });
  rmSync(psPath, { force: true });
}

/** Stages every source image beside the HTML and records its filename in ASSET. */
function stageImages() {
  mkdirSync(assetDir, { recursive: true });

  const jobs = IMAGE_FILES.map(([key, relPath]) => {
    const from = join(imagesDir, relPath);
    if (!existsSync(from)) throw new Error(`Missing image: ${from}`);
    return { key, from, to: join(assetDir, `${key}.jpg`) };
  });

  try {
    compressAll(jobs);
    for (const { key, to } of jobs) {
      if (!existsSync(to)) throw new Error(`Compression skipped ${key}`);
      ASSET[key] = `${key}.jpg`;
    }
    return `${jobs.length} images compressed`;
  } catch (error) {
    console.warn(`Image compression unavailable (${error.message}); copying originals.`);
    for (const [key, relPath] of IMAGE_FILES) {
      const outName = `${key}${extname(relPath)}`;
      copyFileSync(join(imagesDir, relPath), join(assetDir, outName));
      ASSET[key] = outName;
    }
    return `${IMAGE_FILES.length} images copied`;
  }
}

function main() {
  mkdirSync(downloadsDir, { recursive: true });
  console.log(`Staged: ${stageImages()} into ${assetDir}`);

  writeFileSync(htmlOut, buildHtml(), "utf8");
  console.log(`Wrote ${htmlOut}`);

  printHtmlToPdf(htmlOut, pdfOut);
  if (!existsSync(pdfOut) || readFileSync(pdfOut).length < 5000) {
    throw new Error("PDF generation failed or file is empty.");
  }
  const bytes = readFileSync(pdfOut).length;
  console.log(`Wrote ${pdfOut} (${(bytes / 1024).toFixed(0)} KB)`);
}

main();
