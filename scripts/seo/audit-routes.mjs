#!/usr/bin/env node
/**
 * Fetch sitemap.xml and HEAD each URL — outputs CSV for docs/seo/02-route-inventory.csv
 * Usage: node scripts/seo/audit-routes.mjs [baseUrl]
 */
const base = (process.argv[2] ?? process.env.SITE_URL ?? "https://precifarm.com").replace(
  /\/$/,
  "",
);

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function parseLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function headMeta(url) {
  const res = await fetch(url, { redirect: "manual" });
  const status = res.status;
  const location = res.headers.get("location") ?? "";
  let title = "";
  let description = "";
  let canonical = "";
  if (status >= 200 && status < 400 && !location) {
    const html = await fetch(url).then((r) => r.text());
    const t = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    title = t ? t[1].trim().replace(/"/g, '""') : "";
    const d = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
    description = d ? d[1].trim().replace(/"/g, '""') : "";
    const c = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
    canonical = c ? c[1] : url;
  }
  return { status, location, title, description, canonical };
}

const sitemapUrl = `${base}/sitemap.xml`;
console.error(`Reading ${sitemapUrl}...`);
const xml = await fetchText(sitemapUrl);
const urls = parseLocs(xml);

console.log(
  "url,http_status,redirect_to,title,meta_description,canonical,indexability,notes",
);

for (const url of urls) {
  try {
    const { status, location, title, description, canonical } = await headMeta(url);
    const indexability =
      status === 200 && !location ? "indexable" : location ? "redirect" : "error";
    const notes = location ? `redirects to ${location}` : title ? "" : "missing title";
    console.log(
      `"${url}",${status},"${location}","${title}","${description}","${canonical}",${indexability},"${notes}"`,
    );
  } catch (e) {
    console.log(`"${url}",0,"","","","",error,"${String(e.message).replace(/"/g, "'")}"`);
  }
}
