/**
 * Generate the PF-MODENERGY-002 v2.0 PDF:
 * "Precifarm Modular Energy Platform — Product + Engineering Architecture".
 *
 * Reads docs/product/modular-energy-architecture-v2.md, stages figures and renders
 * into public/downloads/modenergy/, builds a branded print HTML, then prints via Chrome/Edge.
 *
 * Usage: node scripts/generate-modular-energy-v2-pdf.mjs
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const docsProduct = join(root, "..", "docs", "product");
const sourceMd = join(docsProduct, "modular-energy-architecture-v2.md");
const downloadsDir = join(root, "public", "downloads");
const assetDir = join(downloadsDir, "modenergy");
const htmlOut = join(downloadsDir, "precifarm-modular-energy-platform-v2.html");
const pdfOut = join(downloadsDir, "precifarm-modular-energy-platform-v2.pdf");

const DOC = {
  id: "PF-MODENERGY-002",
  version: "2.0",
  status: "Product + Engineering Design Review",
  date: "30 August 2026",
  supersedes: "PF-MODENERGY-001 v1.0",
};

const browsers = [
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, "Microsoft", "Edge", "Application", "msedge.exe"),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

/* ------------------------------------------------------------------ assets */

/**
 * An SVG loaded through <img> is parsed as strict XML: a cp1252-encoded file or an
 * HTML-only entity makes it fail to render with no build error. Staging therefore
 * transcodes rather than blindly copying. See scripts/normalize-figure-svgs.mjs.
 */
function stageSvg(from, to) {
  const buf = readFileSync(from);
  let text = buf.toString("utf8");
  if (text.includes("\uFFFD")) {
    try {
      text = new TextDecoder("windows-1252").decode(buf);
    } catch {
      text = buf.toString("latin1");
    }
  }
  text = text.replace(/&nbsp;/g, "&#160;").replace(/^\uFEFF/, "");
  if (!text.startsWith("<?xml")) text = `<?xml version="1.0" encoding="UTF-8"?>\n${text}`;
  writeFileSync(to, text, "utf8");
}

function stageAssets() {
  mkdirSync(assetDir, { recursive: true });
  const figuresDir = join(docsProduct, "figures");
  const rendersDir = join(figuresDir, "renders");
  let count = 0;

  for (const dir of [figuresDir, rendersDir]) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!/\.(svg|png|jpg|jpeg)$/i.test(name)) continue;
      const from = join(dir, name);
      const to = join(assetDir, name);
      if (name.toLowerCase().endsWith(".svg")) stageSvg(from, to);
      else copyFileSync(from, to);
      count += 1;
    }
  }
  return count;
}

/* ---------------------------------------------------------------- markdown */

const CHIPS = {
  TARGET: "target",
  PROPOSED: "target",
  CALC: "calc",
  ASSUMPTION: "assume",
  BENCHMARK: "bench",
  FUTURE: "future",
  VALIDATE: "validate",
  CERT: "cert",
  CONCEPTUAL: "concept",
};

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function chipify(html) {
  return html
    .replace(/<strong>\[([A-Z]+)\]<\/strong>/g, (match, label) => {
      const cls = CHIPS[label];
      return cls ? `<span class="chip chip-${cls}">${label}</span>` : match;
    })
    .replace(/<strong>\[(ERN-\d+)\]<\/strong>/g, '<span class="chip chip-ern">$1</span>')
    .replace(/<strong>(ERN-\d+)<\/strong>/g, '<span class="chip chip-ern">$1</span>');
}

function inlineMarkdown(text) {
  const html = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*]+)\*(?=[\s.,;:)]|$)/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/→/g, '<span class="arrow">→</span>');
  return chipify(html);
}

function slug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Converts the source markdown to print HTML and collects navigation data.
 * Returns { html, toc, plates }.
 */
function markdownToHtml(md) {
  // The source front matter (title, metadata table, disclaimer) is reproduced by the
  // generated cover, so the body starts at the first reader-facing section.
  const body = md.replace(/\r\n/g, "\n");
  const bodyStart = body.indexOf("## HOW TO READ THIS DOCUMENT");
  const lines = (bodyStart > 0 ? body.slice(bodyStart) : body).split("\n");
  const out = [];
  const toc = [];
  const plates = [];
  let i = 0;
  let sectionOpen = false;

  const closeSection = () => {
    if (sectionOpen) {
      out.push("</section>");
      sectionOpen = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Title block and metadata table of the source file are replaced by the cover.
    if (/^# /.test(line)) {
      i++;
      continue;
    }

    // Images: figures (SVG) and renders (PNG).
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (img) {
      const alt = img[1];
      const file = basename(img[2]);
      const isRender = /^render-/i.test(file);
      const label = alt.match(/^(Figure|Render)\s+(\d+)/i);
      const ref = label ? `${label[1]} ${label[2]}` : "";
      if (ref) plates.push({ ref, alt, isRender });
      const captionText = alt.replace(/^(Figure|Render)\s+\d+\s*[—-]\s*/i, "").trim();
      let skipNextCaption = false;
      if (i + 1 < lines.length && /^\*[^*].*\*$/.test(lines[i + 1].trim())) {
        const next = lines[i + 1].trim().replace(/^\*|\*$/g, "");
        if (ref && new RegExp(`^${ref.replace(/\s+/g, "\\s+")}\\b`, "i").test(next)) skipNextCaption = true;
      }
      const captionHtml =
        skipNextCaption || !captionText
          ? ""
          : `<figcaption><span class="fig-ref">${ref}</span> ${inlineMarkdown(captionText)}</figcaption>`;
      out.push(
        `<figure class="plate ${isRender ? "plate-render" : "plate-figure"}" id="${slug(ref || file)}">` +
          (ref ? `<span class="plate-badge">${ref}</span>` : "") +
          `<img src="./modenergy/${file}" alt="${escapeHtml(alt)}" />` +
          captionHtml +
          `</figure>`,
      );
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      const body = buf.join("\n");
      const isFlow = /[─│┌└├┼→↓⇅┐┘]/.test(body);
      const isTagline =
        !isFlow &&
        body.split("\n").length <= 4 &&
        /ONE ENERGY PLATFORM|PLUG →|TESLA EXPERIENCE|PRECIFARM|→/.test(body);
      if (isTagline) {
        const primary = /ONE ENERGY PLATFORM/.test(body);
        const lines = body.split("\n").filter(Boolean);
        out.push(
          `<div class="tagline-band${primary ? " tagline-primary" : ""}">` +
            lines.map((ln, idx) => `<div class="tagline-line${idx ? " tagline-sub" : ""}">${escapeHtml(ln.trim())}</div>`).join("") +
            `</div>`,
        );
      } else {
        out.push(`<pre class="${isFlow ? "flow" : "calc"}">${escapeHtml(body)}</pre>`);
      }
      continue;
    }

    if (/^\|.+\|$/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      if (rows.length >= 2 && /^\|[\s\-:|]+\|$/.test(rows[1])) {
        const cells = (row) => row.split("|").slice(1, -1);
        const headerCells = cells(rows[0]);
        const isMetaTable = headerCells.every((c) => c.trim() === "");
        const header = headerCells.map((c) => `<th>${inlineMarkdown(c.trim())}</th>`).join("");
        const body = rows
          .slice(2)
          .map((row) => `<tr>${cells(row).map((c) => `<td>${inlineMarkdown(c.trim())}</td>`).join("")}</tr>`)
          .join("");
        out.push(
          `<table class="${isMetaTable ? "kv" : "grid"}">` +
            (isMetaTable ? "" : `<thead><tr>${header}</tr></thead>`) +
            `<tbody>${body}</tbody></table>`,
        );
      }
      continue;
    }

    if (/^#{2,4} /.test(line)) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, "");
      const id = slug(text);
      if (level === 2) {
        closeSection();
        const numbered = text.match(/^(\d+)\s*[—-]\s*(.+)$/);
        toc.push({ id, text, number: numbered ? numbered[1] : null, title: numbered ? numbered[2] : text });
        sectionOpen = true;
        const sectionClass = numbered ? "doc-section" : "doc-front";
        const execClass = /executive summary/i.test(text) ? " exec-section" : "";
        out.push(`<section class="${sectionClass}${execClass}" id="${id}">`);
        out.push(
          numbered
            ? `<h2 class="sec"><span class="sec-num">${numbered[1]}</span><span class="sec-title">${inlineMarkdown(numbered[2])}</span></h2>`
            : `<h2 class="sec sec-plain"><span class="sec-title">${inlineMarkdown(text)}</span></h2>`,
        );
      } else {
        out.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      }
      i++;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      i++;
      continue;
    }

    if (/^> /.test(line)) {
      const buf = [];
      while (i < lines.length && /^> /.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<div class="callout">${inlineMarkdown(buf.join(" "))}</div>`);
      continue;
    }

    if (/^[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(`<li>${inlineMarkdown(lines[i].replace(/^[-*] /, ""))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(`<li>${inlineMarkdown(lines[i].replace(/^\d+\.\s*/, ""))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    // Caption lines: a single italic paragraph, used beneath plates.
    if (/^\*[^*].*\*$/.test(line.trim())) {
      out.push(`<p class="caption">${inlineMarkdown(line.trim().replace(/^\*|\*$/g, ""))}</p>`);
      i++;
      continue;
    }

    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,4} /.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^\|/.test(lines[i]) &&
      !/^[-*] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !/^> /.test(lines[i]) &&
      !/^!\[/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i++;
    }
    if (para.length) out.push(`<p>${inlineMarkdown(para.join(" "))}</p>`);
  }

  closeSection();
  return { html: out.join("\n"), toc, plates };
}

/* -------------------------------------------------------------------- html */

function buildCover() {
  return `
  <section class="cover">
    <div class="cover-accent" aria-hidden="true"></div>
    <header class="cover-head">
      <div class="cover-brand">
        <img src="./precifarm-logo-mark.svg" alt="" width="36" height="36" />
        <div>
          <span class="cover-word">PRECIFARM</span>
          <span class="cover-sub">Modular Energy Platform</span>
        </div>
      </div>
      <span class="cover-doc">${DOC.id}<br />v${DOC.version}</span>
    </header>

    <div class="cover-body">
      <p class="cover-eyebrow">Product + Engineering Architecture</p>
      <h1 class="cover-title">One platform.<br />Many scales.</h1>
      <p class="cover-lead">Energy Module · Power Core · Energy OS · Kenya-first design basis</p>
      <div class="cover-pills">
        <span>P1 GO</span><span>P2 HOME</span><span>POD</span><span>ENERGY OS</span>
      </div>
    </div>

    <figure class="cover-plate">
      <img src="./modenergy/render-family-hero.png" alt="Precifarm product family: P1 Go, Energy Module, P2 Home and Pod" />
      <figcaption>P1 GO · ENERGY MODULE · P2 HOME · PRECIFARM POD — conceptual industrial design</figcaption>
    </figure>

    <div class="cover-meta">
      <div><span>Document</span><strong>${DOC.id}</strong></div>
      <div><span>Version</span><strong>${DOC.version}</strong></div>
      <div><span>Status</span><strong>${DOC.status}</strong></div>
      <div><span>Date</span><strong>${DOC.date}</strong></div>
      <div><span>Supersedes</span><strong>${DOC.supersedes}</strong></div>
      <div><span>Classification</span><strong>Internal / partner disclosure</strong></div>
    </div>

    <p class="cover-disclaimer">
      Engineering targets and conceptual designs shown in this document are subject to prototype validation, supplier
      qualification, third-party testing, certification and applicable Kenyan statutory requirements. This document is
      not an issued-for-construction drawing, certified product specification, warranty or installation manual.
    </p>
  </section>`;
}

function buildToc(toc, plates) {
  const numbered = toc.filter((t) => t.number);
  const front = toc.filter((t) => !t.number);
  const half = Math.ceil(numbered.length / 2);
  const byRef = (a, b) => Number(a.ref.replace(/\D/g, "")) - Number(b.ref.replace(/\D/g, ""));
  const figures = plates.filter((p) => !p.isRender).sort(byRef);
  const renders = plates.filter((p) => p.isRender).sort(byRef);
  const figThird = Math.ceil(figures.length / 3);

  const column = (items) =>
    `<ol class="toc-list">${items
      .map(
        (t) =>
          `<li><a href="#${t.id}"><span class="toc-num">${t.number}</span><span class="toc-title">${escapeHtml(t.title)}</span></a></li>`,
      )
      .join("")}</ol>`;

  const plateList = (items) =>
    `<ul class="plate-index">${items
      .map((p) => `<li><span class="pi-ref">${p.ref}</span><span class="pi-alt">${escapeHtml(p.alt.replace(/^(Figure|Render)\s+\d+\s*[—-]\s*/i, ""))}</span></li>`)
      .join("")}</ul>`;

  return `
  <section class="toc toc-sections">
    <h2 class="sec sec-plain"><span class="sec-title">Contents</span></h2>
    <div class="toc-front">${front
      .map((t) => `<a href="#${t.id}">${escapeHtml(t.text)}</a>`)
      .join('<span class="dot">·</span>')}</div>
    <div class="toc-cols">${column(numbered.slice(0, half))}${column(numbered.slice(half))}</div>
  </section>

  <section class="toc toc-plates">
    <h2 class="sec sec-plain"><span class="sec-title">List of Figures and Renders</span></h2>
    <div class="plate-cols plate-cols-figures">
      <div>
        <h3 class="idx-head">Figures 1–8</h3>
        ${plateList(figures.slice(0, figThird))}
      </div>
      <div>
        <h3 class="idx-head">Figures 9–16</h3>
        ${plateList(figures.slice(figThird, figThird * 2))}
      </div>
      <div>
        <h3 class="idx-head">Figures 17–24</h3>
        ${plateList(figures.slice(figThird * 2))}
      </div>
    </div>
    <div class="plate-cols plate-cols-renders">
      <div>
        <h3 class="idx-head">Renders 1–4</h3>
        ${plateList(renders.slice(0, 4))}
      </div>
      <div>
        <h3 class="idx-head">Renders 5–8</h3>
        ${plateList(renders.slice(4))}
        <div class="idx-note">
          Renders communicate design and installation intent. They are not manufacturing models and carry no
          dimensional authority.
        </div>
      </div>
    </div>
  </section>`;
}

function buildHtml() {
  const md = readFileSync(sourceMd, "utf8");
  const { html, toc, plates } = markdownToHtml(md);

  return `<!DOCTYPE html>
<html lang="en-KE">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Precifarm Modular Energy Platform — Product + Engineering Architecture (${DOC.id} v${DOC.version})</title>
<meta name="description" content="Precifarm modular energy platform: P1 Go, P2 Home, Energy Module, Pod and Energy OS. Product and engineering architecture, sizing math, Kenya design basis, safety, thermal, manufacturing, prototype roadmap." />
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
    --soft: #f7f7f7;
    --blue: #2563eb;
    --blue-soft: #eff6ff;
    --blue-deep: #1d4ed8;
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
    font-size: 9.5pt;
    line-height: 1.52;
    font-variant-numeric: tabular-nums;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .sheet { max-width: 210mm; margin: 0 auto; padding: 0 14mm 22mm; }

  /* --- screen toolbar (never printed) --- */
  .toolbar {
    position: sticky; top: 0; z-index: 20;
    display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; justify-content: space-between;
    padding: .7rem 1rem; background: rgba(255,255,255,.96);
    border-bottom: 1px solid var(--line); backdrop-filter: blur(8px);
  }
  .toolbar .id { font-family: ui-monospace, Consolas, monospace; font-size: .78rem; color: var(--subtle); letter-spacing: .04em; }
  .toolbar a, .toolbar button {
    display: inline-flex; align-items: center; gap: .35rem; border-radius: 999px;
    padding: .5rem .95rem; font-size: .82rem; font-weight: 600; text-decoration: none;
    border: 1px solid var(--line); background: #fff; color: var(--ink); cursor: pointer;
  }
  .toolbar .primary { background: var(--blue); border-color: var(--blue); color: #fff; }

  /* --- cover --- */
  .cover {
    break-after: page; min-height: 255mm; max-height: 255mm; display: flex; flex-direction: column;
    padding-top: 0; overflow: hidden; position: relative;
  }
  .cover-accent {
    position: absolute; top: 0; left: 0; right: 0; height: 4mm;
    background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
  }
  .cover-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8mm 0 4mm; border-bottom: 2px solid var(--ink); margin-top: 2mm;
  }
  .cover-brand { display: flex; align-items: center; gap: .75rem; }
  .cover-word { display: block; font-size: 12pt; font-weight: 700; letter-spacing: .18em; color: var(--ink); }
  .cover-sub { display: block; font-size: 8pt; font-weight: 500; letter-spacing: .06em; color: var(--subtle); margin-top: .5mm; }
  .cover-doc { font-family: var(--mono); font-size: 8pt; color: var(--subtle); letter-spacing: .06em; text-align: right; line-height: 1.4; }
  .cover-body { padding: 8mm 0 4mm; }
  .cover-eyebrow { margin: 0 0 2.5mm; font-size: 8.2pt; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--blue); }
  .cover-title { margin: 0; font-family: var(--font); font-size: 30pt; line-height: 1.04; letter-spacing: -.03em; font-weight: 700; color: var(--ink); }
  .cover-lead { margin: 4mm 0 0; font-size: 10pt; line-height: 1.45; color: var(--muted); max-width: 130mm; }
  .cover-pills { display: flex; flex-wrap: wrap; gap: 2mm; margin-top: 3.5mm; }
  .cover-pills span {
    padding: 1.2mm 3.5mm; border-radius: 999px; font-size: 7.2pt; font-weight: 700;
    letter-spacing: .08em; color: var(--blue-deep); background: var(--blue-soft); border: 1px solid #bfdbfe;
  }
  .cover-plate { margin: 0 0 5mm; }
  .cover-plate img {
    width: 100%; height: 78mm; object-fit: cover; object-position: center 52%;
    display: block; border: 1px solid var(--line); border-radius: 8px;
    box-shadow: 0 12px 32px rgba(15,23,42,.1);
  }
  .cover-plate figcaption {
    margin-top: 2.5mm; font-size: 7.2pt; letter-spacing: .08em; color: var(--subtle); text-transform: uppercase;
  }
  .cover-meta {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line);
    border-left: 1px solid var(--line);
  }
  .cover-meta > div {
    padding: 2.8mm 3.5mm; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
  }
  .cover-meta span { display: block; font-size: 6.8pt; letter-spacing: .14em; text-transform: uppercase; color: var(--subtle); }
  .cover-meta strong { display: block; margin-top: .8mm; font-size: 8.6pt; line-height: 1.3; color: var(--ink); }
  .cover-disclaimer {
    margin: 3mm 0 0; padding: 3mm 4mm; background: var(--soft); border-left: 3px solid var(--ink);
    font-size: 7.2pt; line-height: 1.45; color: var(--muted);
  }

  /* --- contents --- */
  .toc { break-after: page; }
  .toc-plates .plate-cols { margin-top: 2mm; }
  .toc-plates .plate-cols-figures { grid-template-columns: 1fr 1fr 1fr; gap: 0 6mm; }
  .toc-plates .plate-cols-renders { margin-top: 4mm; grid-template-columns: 1fr 1fr; gap: 0 8mm; align-items: start; }
  .toc-plates .plate-index { font-size: 7pt; line-height: 1.28; }
  .toc-plates .plate-index li { padding: .75mm 0; }
  .toc-plates .idx-head { font-size: 7.2pt; margin-bottom: 1.5mm; }
  .toc-plates .idx-note { margin-top: 2.5mm; padding: 2.5mm 3mm; font-size: 7pt; }
  .toc-front { margin: 0 0 6mm; font-size: 8.6pt; color: var(--subtle); }
  .toc-front a { color: var(--ink); font-weight: 600; text-decoration: none; }
  .toc-front .dot { padding: 0 .5rem; color: var(--line); }
  .toc-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 10mm; }
  .toc-list { list-style: none; margin: 0; padding: 0; }
  .toc-list li { border-bottom: 1px solid var(--line); }
  .toc-list a {
    display: flex; gap: 4mm; align-items: baseline; padding: 2.1mm 0;
    text-decoration: none; color: var(--ink); font-size: 9pt;
  }
  .toc-num { font-family: var(--mono); font-size: 8pt; color: var(--blue); min-width: 7mm; }
  .plate-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 10mm; margin-top: 9mm; }
  .idx-head {
    margin: 0 0 3mm; padding-bottom: 1.5mm; border-bottom: 1px solid var(--ink);
    font-size: 8pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--ink);
  }
  .plate-index { list-style: none; margin: 0; padding: 0; font-size: 7.6pt; line-height: 1.35; }
  .plate-index li { display: flex; gap: 3mm; padding: 1.1mm 0; border-bottom: 1px solid #f0f0f0; }
  .pi-ref { min-width: 16mm; font-family: var(--mono); font-size: 7.4pt; color: var(--blue); }
  .pi-alt { color: var(--muted); }
  .idx-note {
    margin-top: 4mm; padding: 3mm 3.5mm; background: var(--blue-soft); border-radius: 3px;
    font-size: 7.6pt; color: var(--blue-deep);
  }

  /* --- sections --- */
  .doc-section { break-before: page; }
  .doc-front { break-before: page; }
  .doc-front:first-of-type { break-before: auto; }
  .exec-section .plate-render { max-height: 105mm; }
  .exec-section .plate-render img { max-height: 100mm; object-fit: cover; object-position: center 40%; }
  h2.sec {
    display: flex; align-items: baseline; gap: 5mm; margin: 0 0 6mm; padding: 3mm 0 3mm 4mm;
    border-bottom: 2px solid var(--ink); border-left: 4px solid var(--blue); break-after: avoid;
  }
  h2.sec .sec-num {
    font-family: var(--mono); font-size: 14pt; font-weight: 600; color: var(--blue);
  }
  h2.sec .sec-title {
    font-family: var(--font); font-size: 16pt; font-weight: 700; letter-spacing: -.015em; color: var(--ink);
  }
  h2.sec-plain { border-left-color: var(--ink); }
  h2.sec-plain .sec-title { font-size: 15pt; }
  h3 {
    margin: 5.5mm 0 2mm; padding-left: 3mm; border-left: 2px solid #bfdbfe;
    font-size: 10.4pt; font-weight: 700; color: var(--ink); break-after: avoid;
  }
  h4 { margin: 4mm 0 1.5mm; font-size: 9.6pt; font-weight: 700; color: var(--ink); break-after: avoid; }
  p { margin: 0 0 2.6mm; }
  strong { color: var(--ink); }
  ul, ol { margin: 0 0 3mm; padding-left: 6mm; }
  li { margin-bottom: 1.2mm; }
  code {
    font-family: var(--mono); font-size: .88em;
    background: var(--soft); padding: .05em .3em; border-radius: 2px; color: var(--ink);
  }
  .arrow { color: var(--blue); font-weight: 600; }

  /* --- labels --- */
  .chip {
    display: inline-block; padding: .08em .45em; border-radius: 3px; font-size: 7pt; font-weight: 700;
    letter-spacing: .06em; vertical-align: baseline; white-space: nowrap;
  }
  .chip-target  { background: var(--blue-soft); color: var(--blue-deep); }
  .chip-calc    { background: #ecfdf5; color: #065f46; }
  .chip-assume  { background: #fffbeb; color: #b45309; }
  .chip-bench   { background: #f5f5f5; color: #525252; }
  .chip-future  { background: #f5f3ff; color: #5b21b6; }
  .chip-validate{ background: #fff7ed; color: #9a3412; }
  .chip-cert    { background: #fef2f2; color: #991b1b; }
  .chip-concept { background: #f8fafc; color: #334155; border: 1px solid #e2e8f0; }
  .chip-ern     { background: #fff; color: #991b1b; border: 1px solid #fca5a5; }

  /* --- tables --- */
  table { width: 100%; border-collapse: collapse; margin: 0 0 4mm; font-size: 8.2pt; }
  table.grid { break-inside: auto; }
  table.grid thead { display: table-header-group; }
  table.grid tbody tr { break-inside: avoid; }
  table.grid th, table.grid td { border: 1px solid var(--line); padding: 1.6mm 2mm; text-align: left; vertical-align: top; }
  table.grid th {
    background: var(--ink); color: #fff; font-weight: 700; font-size: 7.4pt;
    letter-spacing: .06em; text-transform: uppercase;
  }
  table.grid tbody tr:nth-child(even) { background: #fbfbfb; }
  table.kv { font-size: 8.6pt; }
  table.kv td { border: none; border-bottom: 1px solid var(--line); padding: 1.6mm 2mm; }
  table.kv td:first-child { width: 34mm; color: var(--subtle); }

  /* --- code / calculations --- */
  pre {
    margin: 0 0 4mm; padding: 3mm 4mm; overflow-x: auto; break-inside: avoid;
    font-family: ui-monospace, Consolas, "Courier New", monospace; white-space: pre;
  }
  pre.calc {
    background: linear-gradient(180deg, #fbfcfd 0%, #fff 100%);
    border: 1px solid var(--line); border-left: 3px solid var(--blue);
    border-radius: 0 6px 6px 0; color: var(--ink); font-size: 7.8pt; line-height: 1.5;
  }
  pre.flow {
    background: linear-gradient(180deg, #171717 0%, #0a0a0a 100%);
    color: #e5e5e5; border-radius: 6px; font-size: 7.3pt; line-height: 1.45;
    box-shadow: 0 4px 12px rgba(0,0,0,.08);
  }

  /* --- taglines --- */
  .tagline-band {
    margin: 0 0 4mm; padding: 3.5mm 4.5mm; border-radius: 6px;
    background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);
    border: 1px solid #bfdbfe; break-inside: avoid;
  }
  .tagline-primary { background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); border-color: #1e40af; }
  .tagline-primary .tagline-line { color: #fff; }
  .tagline-line { font-size: 8.6pt; font-weight: 700; letter-spacing: .1em; color: var(--blue-deep); line-height: 1.55; }
  .tagline-sub { font-size: 7.6pt; font-weight: 600; letter-spacing: .08em; color: var(--muted); margin-top: 1mm; }
  .tagline-primary .tagline-sub { color: rgba(255,255,255,.88); font-weight: 500; }

  /* --- callouts and captions --- */
  .callout {
    margin: 0 0 4mm; padding: 3.5mm 4.5mm; background: var(--blue-soft);
    border-left: 3px solid var(--blue); border-radius: 0 6px 6px 0; color: var(--ink);
    font-size: 9.2pt; break-inside: avoid;
  }
  .plate { margin: 4mm 0 2mm; break-inside: avoid; position: relative; }
  .plate-badge {
    position: absolute; top: 3mm; left: 3mm; z-index: 2;
    padding: 1mm 2.5mm; border-radius: 4px; font-family: var(--mono); font-size: 6.8pt; font-weight: 600;
    letter-spacing: .04em; color: #fff; background: rgba(15,23,42,.72); backdrop-filter: blur(4px);
  }
  .plate img { width: 100%; display: block; }
  .plate figcaption {
    margin: 1.8mm 0 4mm; padding: 2mm 3mm; border-left: 2px solid var(--blue);
    font-size: 7.7pt; line-height: 1.45; color: var(--subtle); background: #fafafa; border-radius: 0 4px 4px 0;
  }
  .plate figcaption .fig-ref {
    font-family: var(--mono); font-size: 7pt; font-weight: 600;
    color: var(--blue); margin-right: 1.5mm;
  }
  .plate-render img { border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 10px 28px rgba(15,23,42,.09); }
  .plate-figure img { border: 1px solid var(--line); border-radius: 8px; background: #fff; box-shadow: 0 6px 20px rgba(15,23,42,.06); }
  .caption {
    margin: -1mm 0 5mm; padding: 2mm 3mm; border-left: 2px solid var(--blue);
    font-size: 7.7pt; line-height: 1.5; color: var(--subtle); background: #fafafa; border-radius: 0 4px 4px 0;
  }
  .caption strong { color: var(--muted); }

  /* --- closing --- */
  .doc-foot {
    break-before: page; margin-top: 0; padding: 8mm 5mm; border-top: 2px solid var(--ink);
    font-size: 8pt; color: var(--subtle); background: var(--soft); border-radius: 6px;
  }
  .doc-foot strong { color: var(--ink); }

  .print-footer {
    display: none;
  }
  @page { size: A4; margin: 14mm 0 20mm; }
  @media print {
    .toolbar { display: none !important; }
    .sheet { max-width: none; padding: 0 14mm 16mm; }
    a { color: inherit; text-decoration: none; }
    .plate, .callout, .tagline-band { break-inside: avoid; }
    table.grid tbody tr { break-inside: avoid; }
    h2, h3, h4 { break-after: avoid; }
    .print-footer {
      display: flex; position: fixed; bottom: 6mm; left: 14mm; right: 14mm;
      justify-content: space-between; align-items: center;
      padding-top: 2mm; border-top: 1px solid var(--line);
      font-family: var(--mono); font-size: 6.8pt; color: var(--subtle); letter-spacing: .04em;
    }
  }
</style>
</head>
<body>
  <div class="print-footer" aria-hidden="true">
    <span>${DOC.id} · v${DOC.version}</span>
    <span>Precifarm Modular Energy Platform</span>
    <span>${DOC.date}</span>
  </div>
  <div class="toolbar">
    <div style="display:flex;align-items:center;gap:.6rem">
      <img src="./precifarm-logo-mark.svg" alt="" width="22" height="22" />
      <span class="id">${DOC.id} · v${DOC.version} · ${DOC.status}</span>
    </div>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <button type="button" class="primary" onclick="window.print()">Print</button>
      <a class="primary" href="./precifarm-modular-energy-platform-v2.pdf" download>Download PDF</a>
      <a href="/charging">Back to charging</a>
    </div>
  </div>

  <main class="sheet">
    ${buildCover()}
    ${buildToc(toc, plates)}
    ${html}
    <footer class="doc-foot">
      <strong>Precifarm Modular Energy Platform — Product + Engineering Architecture</strong><br />
      ${DOC.id} · v${DOC.version} · ${DOC.date} · Supersedes ${DOC.supersedes}<br /><br />
      Every engineering claim in this document is either carried forward from PF-MODENERGY-001 v1.0, derived and shown
      as a calculation, declared as an assumption, or cited to an external source in §30. No Precifarm product holds
      any certification at the date of issue, and no product may be sold as a certified energy-storage system before
      the P4 gate defined in §24.
    </footer>
  </main>
</body>
</html>`;
}

/* ------------------------------------------------------------------- print */

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
      "--virtual-time-budget=180000",
      `--print-to-pdf=${pdfOut}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "inherit", windowsHide: true },
  );

  if (!existsSync(pdfOut) || readFileSync(pdfOut).length < 10000) {
    throw new Error("PDF generation failed or file is empty.");
  }
}

function main() {
  if (!existsSync(sourceMd)) throw new Error(`Missing source: ${sourceMd}`);
  mkdirSync(downloadsDir, { recursive: true });

  const staged = stageAssets();
  console.log(`Staged ${staged} figure/render assets into ${assetDir}`);

  writeFileSync(htmlOut, buildHtml(), "utf8");
  console.log(`Wrote ${htmlOut}`);

  generatePdf(htmlOut);
  const bytes = readFileSync(pdfOut).length;
  console.log(`Wrote ${pdfOut} (${(bytes / 1024 / 1024).toFixed(2)} MB)`);
}

main();
