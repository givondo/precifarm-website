/**
 * Regenerate all Precifarm downloadable PDFs.
 * Usage: node scripts/generate-all-pdfs.mjs
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const scripts = [
  "generate-ai-companion-pdf.mjs",
  "generate-engineering-pdf.mjs",
  "generate-modular-energy-pdf.mjs",
  "generate-modular-energy-v2-pdf.mjs",
  "generate-modular-energy-design-pdf.mjs",
  "generate-megapack-brief-pdf.mjs",
  "generate-product-engineering-pdf.mjs",
];

for (const script of scripts) {
  console.log(`\n=== ${script} ===`);
  const result = spawnSync(process.execPath, [join(__dirname, script)], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\nAll PDFs generated.");
