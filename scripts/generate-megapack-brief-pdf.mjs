/**
 * Generate PF-MEGAPACK-001 project brief PDF.
 * Usage: node scripts/generate-megapack-brief-pdf.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { printHtmlToPdf } from "./lib/document-brand.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const htmlOut = join(root, "public", "downloads", "precifarm-megapack-project-brief.html");
const pdfOut = join(root, "public", "downloads", "precifarm-megapack-project-brief.pdf");

if (!existsSync(htmlOut)) {
  throw new Error(`Missing HTML: ${htmlOut}`);
}

printHtmlToPdf(htmlOut, pdfOut);
console.log(`Wrote ${pdfOut} (${(readFileSync(pdfOut).length / 1024).toFixed(0)} KB)`);
