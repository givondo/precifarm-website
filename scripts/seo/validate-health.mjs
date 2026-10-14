#!/usr/bin/env node
/** Run SEO registry audit against a running site. Usage: node scripts/seo/validate-health.mjs [baseUrl] */
const base = (process.argv[2] ?? process.env.SEO_HEALTH_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
const url = `${base}/api/seo/health`;
const res = await fetch(url);
if (!res.ok) {
  console.error(`Failed ${url}: ${res.status}`);
  process.exit(1);
}
const report = await res.json();
console.log(JSON.stringify({ status: report.status, errorCount: report.errorCount, warningCount: report.warningCount, issueCount: report.issueCount }, null, 2));
if (report.errorCount > 0) {
  for (const i of report.issues.filter((x) => x.severity === "error")) {
    console.error(`${i.path}: ${i.message}`);
  }
  process.exit(1);
}
process.exit(0);
