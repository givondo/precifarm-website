/**
 * List published FAQs and guides from the CMS API.
 * Usage: node scripts/verify-cms-content.mjs
 * Requires CMS_API_URL in .env.local or environment.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env.local");

function loadEnv() {
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

const base = (process.env.CMS_API_URL ?? "").replace(/\/$/, "");
if (!base) {
  console.error("CMS_API_URL is not set.");
  process.exit(1);
}

const url = `${base}/v1/seo/content?status=published`;
const res = await fetch(url, { cache: "no-store" });
if (!res.ok) {
  console.error(`CMS request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const data = await res.json();
const items = data.items ?? [];

const faqs = items.filter((i) => i.contentType === "faq");
const guides = items.filter((i) =>
  ["guide", "howto", "article"].includes(i.contentType),
);

console.log(`CMS: ${base}`);
console.log(`Published: ${items.length} total · ${faqs.length} FAQ(s) · ${guides.length} guide(s)\n`);

if (faqs.length) {
  console.log("FAQs:");
  for (const item of faqs) {
    const faqBlock = item.aisoBlocks?.find((b) => b.type === "faq");
    const count = faqBlock?.items?.length ?? 0;
    console.log(`  • ${item.slug} — ${item.title} (${count} questions)`);
  }
  console.log();
}

if (guides.length) {
  console.log("Guides:");
  for (const item of guides) {
    console.log(`  • ${item.slug} — ${item.title} [${item.contentType}]`);
  }
  console.log();
}

if (!faqs.length && !guides.length) {
  console.log("No published FAQs or guides. Run npm run db:seed-seo in the CMS repo.");
  process.exit(1);
}

console.log("Website routes:");
for (const item of faqs) console.log(`  /faq/${item.slug}`);
for (const item of guides) console.log(`  /guides/${item.slug}`);
