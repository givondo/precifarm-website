/**
 * Build a one-figure-per-page contact sheet of the staged figures, for visual QA.
 * Usage: node scripts/figure-contact-sheet.mjs
 */
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const downloads = join(__dirname, "..", "public", "downloads");
const files = readdirSync(join(downloads, "modenergy"))
  .filter((n) => n.endsWith(".svg"))
  .sort();

const pages = files
  .map(
    (f) => `<div class="p"><div class="h">${f}</div><img src="./modenergy/${f}" /></div>`,
  )
  .join("\n");

writeFileSync(
  join(downloads, "_contact.html"),
  `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{margin:0;font:12px "Segoe UI",sans-serif}
    .p{break-after:page;padding:6mm}
    .h{font-weight:700;font-size:11pt;padding-bottom:3mm}
    img{width:100%;border:1px solid #ddd;display:block}
    @page{size:A4 landscape;margin:8mm}
  </style></head><body>${pages}</body></html>`,
  "utf8",
);

console.log(`Contact sheet built with ${files.length} figures.`);
