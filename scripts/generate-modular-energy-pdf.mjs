/**
 * Generate PDF for Precifarm Modular Energy Storage documentation.
 * Combines product design + engineering design markdown into branded HTML, then prints via Chrome/Edge.
 *
 * Usage: node scripts/generate-modular-energy-pdf.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const ecosystemDocs = join(root, "..", "docs", "product");
const downloadsDir = join(root, "public", "downloads");
const htmlOut = join(downloadsDir, "precifarm-modular-energy-storage.html");
const pdfOut = join(downloadsDir, "precifarm-modular-energy-storage.pdf");

const SOURCES = [
  {
    part: "I",
    title: "Product Design",
    file: join(ecosystemDocs, "modular-energy-platform.md"),
  },
  {
    part: "II",
    title: "Engineering Design",
    file: join(ecosystemDocs, "modular-energy-engineering-design.md"),
  },
];

const browsers = [
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, "Microsoft", "Edge", "Application", "msedge.exe"),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let skipFirstH1 = true;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      const cls = lang === "text" || lang === "mermaid" ? "flow" : "flow";
      out.push(`<pre class="${cls}">${escapeHtml(buf.join("\n"))}</pre>`);
      continue;
    }

    if (/^\|.+\|$/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      if (rows.length >= 2 && /^\|[\s\-:|]+\|$/.test(rows[1])) {
        const header = rows[0]
          .split("|")
          .slice(1, -1)
          .map((c) => `<th>${inlineMarkdown(c.trim())}</th>`)
          .join("");
        const body = rows
          .slice(2)
          .map((row) => {
            const cells = row
              .split("|")
              .slice(1, -1)
              .map((c) => `<td>${inlineMarkdown(c.trim())}</td>`)
              .join("");
            return `<tr>${cells}</tr>`;
          })
          .join("");
        out.push(`<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`);
      }
      continue;
    }

    if (/^#{1,3} /.test(line)) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, "");
      if (level === 1 && skipFirstH1) {
        skipFirstH1 = false;
        i++;
        continue;
      }
      const tag = level === 1 ? "h2" : level === 2 ? "h3" : "h4";
      out.push(`<${tag}>${inlineMarkdown(text)}</${tag}>`);
      i++;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      out.push("<hr />");
      i++;
      continue;
    }

    if (/^> /.test(line)) {
      const buf = [];
      while (i < lines.length && /^> /.test(lines[i])) {
        buf.push(lines[i].replace(/^> /, ""));
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
        items.push(`<li>${inlineMarkdown(lines[i].replace(/^\d+\. /, ""))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      out.push(`<p class="footnote">${inlineMarkdown(line.replace(/^\*|\*$/g, ""))}</p>`);
      i++;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^#{1,3} /.test(lines[i]) && !/^```/.test(lines[i]) && !/^\|/.test(lines[i]) && !/^[-*] /.test(lines[i]) && !/^> /.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inlineMarkdown(para.join(" "))}</p>`);
  }

  return out.join("\n");
}

function buildHtml() {
  const parts = SOURCES.map((src) => {
    if (!existsSync(src.file)) {
      throw new Error(`Missing source: ${src.file}`);
    }
    const md = readFileSync(src.file, "utf8");
    return `
      <section class="part part-${src.part.toLowerCase()}">
        <p class="phase">Part ${src.part} · ${src.title}</p>
        ${markdownToHtml(md)}
      </section>`;
  });

  return `<!DOCTYPE html>
<html lang="en-KE">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Precifarm — Modular Energy Storage · Product &amp; Engineering Design</title>
  <meta name="description" content="Precifarm modular energy platform: P1 Go, P2 Home, Energy Module, Pod and Energy OS — product design and engineering design basis." />
  <link rel="stylesheet" href="./precifarm-document-brand.css" />
  <style>
    :root {
      --ink: var(--pf-ink, #0a0a0a);
      --muted: var(--pf-muted, #404040);
      --line: var(--pf-line, #e5e5e5);
      --bg: var(--pf-bg, #ffffff);
      --soft: var(--pf-soft, #f5f5f5);
      --blue: var(--pf-charge, #2563eb);
      --blue-soft: var(--pf-charge-soft, #eff6ff);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      background: var(--bg);
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      line-height: 1.55;
      font-size: 14px;
    }
    .sheet { max-width: 880px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
    .toolbar {
      position: sticky; top: 0; z-index: 10;
      display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; justify-content: space-between;
      padding: 0.85rem 1.25rem; background: rgba(255,255,255,0.96);
      border-bottom: 1px solid var(--line); backdrop-filter: blur(8px);
    }
    .toolbar a, .toolbar button {
      display: inline-flex; align-items: center; gap: 0.4rem;
      border-radius: 999px; padding: 0.55rem 1rem; font-size: 0.875rem; font-weight: 600;
      text-decoration: none; border: 1px solid var(--line); background: #fff; color: var(--ink); cursor: pointer;
    }
    .toolbar .primary { background: var(--blue); border-color: var(--blue); color: #fff; }
    h1 { font-size: clamp(1.6rem, 3vw, 2.1rem); line-height: 1.2; letter-spacing: -0.02em; margin: 0 0 0.5rem; }
    h2 { font-size: 1.2rem; margin: 2rem 0 0.65rem; padding-top: 0.5rem; border-top: 1px solid var(--line); }
    h3 { font-size: 1.05rem; margin: 1.35rem 0 0.45rem; }
    h4 { font-size: 0.98rem; margin: 1rem 0 0.35rem; }
    p, li { color: var(--muted); }
    .meta {
      display: grid; gap: 0.35rem; margin: 1rem 0 1.5rem; padding: 1rem;
      background: var(--soft); border-radius: 12px; font-size: 0.9rem;
    }
    .meta strong { color: var(--ink); }
    .callout {
      border-left: 4px solid var(--blue); background: var(--blue-soft);
      padding: 0.9rem 1rem; border-radius: 0 10px 10px 0; margin: 1rem 0; color: var(--ink);
    }
    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin: 0.75rem 0 1.25rem; }
    th, td { border: 1px solid var(--line); padding: 0.5rem 0.6rem; text-align: left; vertical-align: top; }
    th { background: var(--soft); color: var(--ink); }
    code { font-family: ui-monospace, Consolas, monospace; font-size: 0.86em; }
    .flow {
      background: #0a0a0a; color: #e5e5e5; padding: 0.85rem 1rem; border-radius: 12px;
      overflow-x: auto; font-family: ui-monospace, Consolas, monospace;
      font-size: 0.72rem; line-height: 1.4; white-space: pre; margin: 0.75rem 0 1rem;
    }
    .phase {
      display: inline-block; font-size: 0.75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.04em; color: var(--blue); margin-bottom: 0.25rem;
    }
    .part-ii { break-before: page; page-break-before: always; padding-top: 0.5rem; }
    .cover-tagline { font-size: 1.05rem; color: var(--ink); margin-top: 0; max-width: 42rem; }
    .footnote { font-size: 0.85rem; font-style: italic; color: var(--muted); }
    footer.doc-foot {
      margin-top: 2.5rem; padding-top: 1rem; border-top: 1px solid var(--line);
      font-size: 0.85rem; color: var(--muted);
    }
    @media print {
      .toolbar { display: none !important; }
      .sheet { padding: 0; max-width: none; }
      a { color: inherit; text-decoration: none; }
      .part-ii { break-before: page; }
      h2 { break-after: avoid; }
      table, .flow { break-inside: avoid; }
    }
    @page { size: A4; margin: 12mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  </style>
</head>
<body>
  <div class="toolbar no-print pf-doc-toolbar">
    <div class="pf-doc-toolbar-brand">
      <img src="./precifarm-logo-mark.svg" alt="" width="24" height="24" />
      <span class="mono">PF-MODENERGY-001 · v1.0</span>
    </div>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
      <button type="button" class="primary" onclick="window.print()">Print</button>
      <a class="primary" href="./precifarm-modular-energy-storage.pdf" download>Download PDF</a>
      <a href="./precifarm-modular-energy-storage.html" download>Download HTML</a>
      <a href="/charging">Back to charging</a>
    </div>
  </div>

  <main class="sheet">
    <header class="pf-doc-header">
      <div class="pf-doc-brand">
        <img src="./precifarm-logo-mark.svg" alt="" width="40" height="40" class="pf-doc-mark" />
        <div class="pf-doc-brand-text">
          <p class="pf-doc-wordmark">Precifarm</p>
          <p class="pf-doc-brand-tagline">Modular energy storage for Africa</p>
        </div>
      </div>
      <p class="pf-doc-header-id">PF-MODENERGY-001 · v1.0</p>
    </header>

    <p class="phase">Energy storage · Product &amp; engineering</p>
    <h1>Modular Energy Storage</h1>
    <p class="cover-tagline">One architecture from portable power to home energy — P1 Go, P2 Home, Energy Module, Pod and Energy OS. Tesla-grade experience integration. BYD-grade module repetition.</p>

    <div class="meta">
      <div><strong>Document ID:</strong> PF-MODENERGY-001</div>
      <div><strong>Version:</strong> 1.0 · 30 August 2026</div>
      <div><strong>Status:</strong> Product design foundation + engineering design basis (not issued-for-construction)</div>
      <div><strong>Contents:</strong> Part I Product Design · Part II Engineering Design (Tesla/BYD architecture motivation)</div>
    </div>

    <div class="callout">
      <strong>Design principle:</strong> Energy storage should be a positive experience — simple to use, easy to move, easy to expand, and ready to connect to solar, home and electric mobility.
      <br /><br />
      <strong>PLUG → CARRY → ROLL → STACK → INSTALL → DRIVE</strong>
    </div>

    ${parts.join("\n")}

    <footer class="doc-foot">
      Precifarm Modular Energy Storage — PF-MODENERGY-001 v1.0 · Generated from kenya-ebus-ecosystem/docs/product/
      · Not a product warranty or customer specification · precifarm.com
    </footer>
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
  if (!browser) {
    throw new Error("Chrome or Edge not found. Install one to generate the PDF.");
  }

  const fileUrl = pathToFileURL(htmlPath).href;
  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=120000",
      `--print-to-pdf=${pdfOut}`,
      fileUrl,
    ],
    { stdio: "inherit", windowsHide: true },
  );

  if (!existsSync(pdfOut) || readFileSync(pdfOut).length < 1000) {
    throw new Error("PDF generation failed or file is empty.");
  }
}

function main() {
  mkdirSync(downloadsDir, { recursive: true });
  const html = buildHtml();
  writeFileSync(htmlOut, html, "utf8");
  console.log(`Wrote ${htmlOut}`);

  generatePdf(htmlOut);
  console.log(`Wrote ${pdfOut} (${readFileSync(pdfOut).length} bytes)`);
}

main();
