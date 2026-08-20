/**
 * Generate PDF for the solar charger engineering package.
 * Builds a print folder with local image files (more reliable than giant base64),
 * then prints with Chrome/Edge headless.
 *
 * Usage: node scripts/generate-engineering-pdf.mjs
 */
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const downloadsDir = join(root, "public", "downloads");
const htmlSrc = join(downloadsDir, "precifarm-solar-charger-stations-engineering.html");
const pdfOut = join(downloadsDir, "precifarm-solar-charger-stations-engineering.pdf");
const buildDir = join(downloadsDir, ".pdf-build");
const assetsDir = join(buildDir, "assets");

/** Brand assets copied alongside the print HTML for PDF generation. */
const BRAND_ASSETS = [
  "precifarm-document-brand.css",
  "precifarm-logo-mark.svg",
];

/** All figures that must appear in the PDF (web path → public file). */
const IMAGE_MAP = {
  "/images/engineering/route-hub.png": "engineering/route-hub.png",
  "/images/engineering/system-architecture.png": "engineering/system-architecture.png",
  "/images/engineering/site-plan.png": "engineering/site-plan.png",
  "/images/engineering/home-hybrid.png": "engineering/home-hybrid.png",
  "/images/charging-route-hub.png": "charging-route-hub.png",
  "/images/charging-hub-premium-kenya.png": "charging-hub-premium-kenya.png",
  "/images/charging-private-house-hybrid.png": "charging-private-house-hybrid.png",
  "/images/charging-private-site.png": "charging-private-site.png",
  "/images/charging-home.png": "charging-home.png",
  "/images/yutong-u18.png": "yutong-u18.png",
  "/images/yutong-u12.png": "yutong-u12.png",
  "/images/precifarm-bus.jpg": "precifarm-bus.jpg",
};

const browsers = [
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, "Microsoft", "Edge", "Application", "msedge.exe"),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function findBrowser() {
  for (const candidate of browsers) {
    if (candidate && existsSync(candidate)) return candidate;
  }
  return null;
}

function prepareBuild() {
  rmSync(buildDir, { recursive: true, force: true });
  mkdirSync(assetsDir, { recursive: true });

  for (const asset of BRAND_ASSETS) {
    const src = join(downloadsDir, asset);
    if (!existsSync(src)) {
      throw new Error(`Missing brand asset: ${src}`);
    }
    cpSync(src, join(buildDir, asset));
  }

  let html = readFileSync(htmlSrc, "utf8");

  for (const [webPath, relPublic] of Object.entries(IMAGE_MAP)) {
    const srcFile = join(root, "public", "images", relPublic);
    if (!existsSync(srcFile)) {
      throw new Error(`Missing image: ${srcFile}`);
    }
    const fileName = relPublic.replace(/\//g, "-");
    const dest = join(assetsDir, fileName);
    cpSync(srcFile, dest);
    html = html.split(webPath).join(`./assets/${fileName}`);
  }

  html = html.replace(
    '<div class="toolbar no-print">',
    '<div class="toolbar no-print" style="display:none">',
  );

  html = html.replace(
    "</style>",
    `
    @page { size: A4; margin: 12mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    figure { break-inside: avoid; page-break-inside: avoid; margin: 1.1rem 0 1.4rem; }
    figure img { max-height: 210mm; width: 100%; object-fit: contain; background: #fafafa; }
    h2.photo-annex { break-before: page; page-break-before: always; }
    </style>`,
  );

  const outHtml = join(buildDir, "index.html");
  writeFileSync(outHtml, html, "utf8");
  return outHtml;
}

function generatePdf() {
  if (!existsSync(htmlSrc)) {
    throw new Error(`Missing HTML source: ${htmlSrc}`);
  }

  const browser = findBrowser();
  if (!browser) {
    throw new Error("Chrome or Edge not found. Install one to generate the PDF.");
  }

  const printHtml = prepareBuild();
  const fileUrl = pathToFileURL(printHtml).href;

  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=60000",
      `--print-to-pdf=${pdfOut}`,
      fileUrl,
    ],
    { stdio: "inherit", windowsHide: true },
  );

  if (!existsSync(pdfOut) || readFileSync(pdfOut).length < 1000) {
    throw new Error("PDF generation failed or file is empty.");
  }

  console.log(`Wrote ${pdfOut} (${readFileSync(pdfOut).length} bytes)`);
  console.log(`Embedded ${Object.keys(IMAGE_MAP).length} images`);
}

generatePdf();
