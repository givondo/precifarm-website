#!/usr/bin/env node
/**
 * Fetch /api/seo/health and exit non-zero on errors.
 * Usage: node scripts/seo/validate-health.mjs [baseUrl]
 */
const base = (process.argv[2] ?? process.env.SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

const res = await fetch(`${base}/api/seo/health`);
if (!res.ok) {
  console.error(`HTTP ${res.status} from ${base}/api/seo/health`);
  process.exit(1);
}

const data = await res.json();
console.log(JSON.stringify(data, null, 2));

if (data.errorCount > 0) {
  process.exit(1);
}

process.exit(0);
