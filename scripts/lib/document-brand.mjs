/**
 * Shared Precifarm branding for downloadable HTML/PDF documents.
 * Used by all scripts/generate-*-pdf.mjs generators.
 * Keep in sync with lib/document-brand.ts and public/downloads/precifarm-document-brand.css
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const BRAND = {
  name: "Precifarm",
  legalName: "Precifarm",
  tagline: "Electric mobility infrastructure for Africa",
  promise: "From home charging to highway charging.",
  siteUrl: "https://precifarm.com",
  email: "sales@precifarm.com",
  phone: "+254 794 702 768",
  phoneHref: "tel:+254794702768",
  whatsapp: "https://wa.me/254794702768",
  hq: "Nairobi, Kenya",
  disclaimer:
    "For planning and briefing. Not a substitute for licensed design, Kenya Power studies or statutory approvals.",
  socials: [
    { label: "WhatsApp", href: "https://wa.me/254794702768" },
    { label: "X", href: "https://x.com/precifarm" },
    { label: "Instagram", href: "https://instagram.com/precifarm" },
    { label: "LinkedIn", href: "https://linkedin.com/company/precifarm" },
    { label: "Facebook", href: "https://facebook.com/precifarm" },
    { label: "TikTok", href: "https://tiktok.com/@precifarm" },
  ],
};

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function brandSocialsInline() {
  return BRAND.socials.map((s) => s.label).join(" · ");
}

export function brandSocialsHtml(compact = true) {
  const links = BRAND.socials
    .map((s) => `<a href="${escapeHtml(s.href)}">${escapeHtml(s.label)}</a>`)
    .join(compact ? " · " : "</span><span>");
  return compact ? links : `<span>${links}</span>`;
}

export function brandContactLine() {
  return `${BRAND.email} · ${BRAND.phone} · ${BRAND.hq} · ${BRAND.siteUrl.replace(/^https?:\/\//, "")}`;
}

/** Fixed footer band — repeats on every printed page via Chrome headless. */
export function brandPrintFooterHtml(doc) {
  const { id, version, date, shortTitle = BRAND.name } = doc;
  const year = new Date().getFullYear();
  return `<div class="pf-print-band" aria-hidden="true">
  <div class="pf-print-band-row pf-print-band-brand">
    <img src="./precifarm-logo-mark.svg" alt="" width="14" height="14" />
    <strong>${escapeHtml(BRAND.name)}</strong>
    <span class="pf-print-band-muted">${escapeHtml(BRAND.tagline)}</span>
  </div>
  <div class="pf-print-band-row pf-print-band-contact">
    ${escapeHtml(BRAND.email)} · ${escapeHtml(BRAND.phone)} · ${escapeHtml(BRAND.siteUrl.replace(/^https?:\/\//, ""))}
  </div>
  <div class="pf-print-band-row pf-print-band-social">${brandSocialsHtml(true)}</div>
  <div class="pf-print-band-row pf-print-band-doc">
    <span>${escapeHtml(id)} · v${escapeHtml(version)} · ${escapeHtml(date)}</span>
    <span>${escapeHtml(shortTitle)}</span>
    <span>© ${year} ${escapeHtml(BRAND.legalName)}</span>
  </div>
</div>`;
}

/** Screen toolbar for downloadable HTML. */
export function brandToolbarHtml({
  docId,
  version,
  status,
  pdfFile,
  backHref = "/",
  backLabel = "Back to site",
}) {
  return `<div class="toolbar no-print pf-doc-toolbar">
  <div class="pf-doc-toolbar-brand">
    <img src="./precifarm-logo-mark.svg" alt="" width="24" height="24" />
    <span class="pf-doc-toolbar-id">${escapeHtml(docId)} · v${escapeHtml(version)}${status ? ` · ${escapeHtml(status)}` : ""}</span>
  </div>
  <div class="pf-doc-toolbar-actions">
    <button type="button" class="primary" onclick="window.print()">Print</button>
    ${pdfFile ? `<a class="primary" href="./${escapeHtml(pdfFile)}" download>Download PDF</a>` : ""}
    <a href="${escapeHtml(backHref)}">${escapeHtml(backLabel)}</a>
  </div>
</div>`;
}

/** Document header block (first page / section). */
export function brandDocHeaderHtml({ docId, subtitle }) {
  return `<header class="pf-doc-header">
  <div class="pf-doc-brand">
    <img src="./precifarm-logo-mark.svg" alt="" width="40" height="40" class="pf-doc-mark" />
    <div class="pf-doc-brand-text">
      <p class="pf-doc-wordmark">${escapeHtml(BRAND.name)}</p>
      <p class="pf-doc-brand-tagline">${escapeHtml(subtitle || BRAND.tagline)}</p>
    </div>
  </div>
  <p class="pf-doc-header-id">${escapeHtml(docId)}</p>
</header>`;
}

/** Closing footer block at end of document body. */
export function brandDocFooterHtml(doc, { livePagePath, extraDisclaimer } = {}) {
  const { id, version, date, title } = doc;
  const year = new Date().getFullYear();
  const liveUrl = livePagePath ? `${BRAND.siteUrl}${livePagePath}` : BRAND.siteUrl;

  return `<footer class="doc-foot pf-doc-footer">
  <div class="pf-doc-footer-brand">
    <img src="./precifarm-logo-mark.svg" alt="" width="28" height="28" class="pf-doc-mark pf-doc-mark-sm" />
    <div>
      <p class="pf-doc-wordmark pf-doc-wordmark-sm">${escapeHtml(BRAND.name)}</p>
      <p class="pf-doc-brand-tagline">${escapeHtml(BRAND.tagline)}</p>
    </div>
  </div>
  ${title ? `<p class="pf-doc-footer-title"><strong>${escapeHtml(title)}</strong></p>` : ""}
  <p class="pf-doc-footer-meta">© ${year} ${escapeHtml(BRAND.legalName)} · ${escapeHtml(id)} v${escapeHtml(version)} · ${escapeHtml(date)}</p>
  <p class="pf-doc-footer-contact">${escapeHtml(BRAND.email)} · ${escapeHtml(BRAND.phone)} · ${escapeHtml(BRAND.hq)} · <a href="${escapeHtml(BRAND.siteUrl)}">${escapeHtml(BRAND.siteUrl.replace(/^https?:\/\//, ""))}</a></p>
  <p class="pf-doc-footer-social">${brandSocialsHtml(true)}</p>
  <p class="pf-doc-footer-disclaimer">${escapeHtml(extraDisclaimer || BRAND.disclaimer)}</p>
  <p class="pf-doc-footer-link"><a href="${escapeHtml(liveUrl)}">${escapeHtml(liveUrl.replace(/^https?:\/\//, ""))}</a></p>
</footer>`;
}

/** Per-page header for multi-page product sheets. */
export function brandPageHeadHtml({ subtitle, docId, pageNo, pageTotal }) {
  const pageLine =
    pageNo && pageTotal ? `${docId} · Page ${pageNo} of ${pageTotal}` : docId;
  return `<header class="page-head pf-page-head">
  <div class="brand pf-page-brand">
    <img src="./precifarm-logo-mark.svg" alt="" />
    <div>
      <span class="brand-word">${escapeHtml(BRAND.name.toUpperCase())}</span>
      <span class="brand-sub">${escapeHtml(subtitle)}</span>
    </div>
  </div>
  <div class="doc-id">${escapeHtml(pageLine)}</div>
</header>`;
}

/** CSS additions for print footers — inject before </style> or link shared CSS. */
export function brandPrintCss() {
  return `
.pf-doc-toolbar-id { font-family: ui-monospace, Consolas, monospace; font-size: .78rem; color: var(--pf-subtle, #737373); letter-spacing: .04em; }
.pf-doc-toolbar-actions { display: flex; gap: .5rem; flex-wrap: wrap; }
.pf-print-band { display: none; }
.pf-doc-footer-title { margin: .5rem 0 0; font-size: .88rem; color: var(--pf-ink, #0a0a0a); }
.pf-doc-footer-social a { color: var(--pf-charge, #2563eb); text-decoration: none; }
@media print {
  @page { size: A4; margin: 12mm 12mm 22mm; }
  body { padding-bottom: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .pf-print-band {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2mm 12mm 3mm;
    border-top: 1px solid var(--pf-line, #e5e5e5);
    background: #fff;
    font-size: 6pt;
    line-height: 1.35;
    color: var(--pf-muted, #404040);
    z-index: 9999;
  }
  .pf-print-band-row { display: flex; flex-wrap: wrap; align-items: center; gap: .35rem  .6rem; margin: 0 0 .6mm; }
  .pf-print-band-row:last-child { margin-bottom: 0; justify-content: space-between; }
  .pf-print-band-brand strong { color: var(--pf-ink, #0a0a0a); font-size: 6.5pt; }
  .pf-print-band-brand img { vertical-align: middle; margin-right: 1mm; }
  .pf-print-band-muted { color: var(--pf-subtle, #737373); }
  .pf-print-band-contact, .pf-print-band-social { color: var(--pf-subtle, #737373); font-size: 5.8pt; }
  .pf-print-band-social a { color: var(--pf-muted, #404040); text-decoration: none; }
  .pf-print-band-doc { font-family: ui-monospace, Consolas, monospace; font-size: 5.8pt; color: var(--pf-subtle, #737373); }
  .toolbar, .no-print { display: none !important; }
  .pf-doc-footer a, .pf-print-band a { color: inherit; }
}`;
}

export function findBrowser() {
  const browsers = [
    process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    process.env.PROGRAMFILES && `${process.env.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe`,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);

  for (const candidate of browsers) {
    if (candidate && existsSync(candidate)) return candidate;
  }
  return null;
}

export function printHtmlToPdf(htmlPath, pdfPath, { virtualTimeBudget = 120000 } = {}) {
  const browser = findBrowser();
  if (!browser) throw new Error("Chrome or Edge not found. Install one to generate PDFs.");

  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      `--virtual-time-budget=${virtualTimeBudget}`,
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: "inherit", windowsHide: true },
  );
}
