/**
 * Apply Precifarm v2 figure design system to all engineering SVGs.
 * Adds gradient background, dot grid, brand accent, card shadows, and chart polish.
 *
 * Usage: node scripts/enhance-figure-design.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const figuresDir = join(__dirname, "..", "..", "docs", "product", "figures");

const THEME_MARKER = "data-pf-theme=\"v2\"";

const THEME_DEFS = `
<linearGradient id="pf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#f8fafc"/>
  <stop offset="55%" stop-color="#ffffff"/>
  <stop offset="100%" stop-color="#f1f5f9"/>
</linearGradient>
<pattern id="pf-grid" width="28" height="28" patternUnits="userSpaceOnUse">
  <circle cx="1.5" cy="1.5" r="0.75" fill="#e2e8f0"/>
</pattern>
<linearGradient id="pf-blue" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#3b82f6"/>
  <stop offset="100%" stop-color="#1d4ed8"/>
</linearGradient>
<linearGradient id="pf-blue-soft" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#eff6ff"/>
  <stop offset="100%" stop-color="#dbeafe"/>
</linearGradient>
<filter id="pf-shadow" x="-8%" y="-8%" width="116%" height="120%">
  <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.07"/>
</filter>
<filter id="pf-shadow-sm" x="-6%" y="-6%" width="112%" height="114%">
  <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.06"/>
</filter>`;

const THEME_CSS = `
.pf-accent{fill:#2563eb}
.pf-frame{fill:none;stroke:#e2e8f0;stroke-width:1}
.bx,.dev{filter:url(#pf-shadow-sm)}
.bxb{filter:url(#pf-shadow);fill:#f8fbff}
`;

function parseSize(svg) {
  const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (vb) return { w: vb[1], h: vb[2] };
  const wh = svg.match(/width="(\d+)" height="(\d+)"/);
  return wh ? { w: wh[1], h: wh[2] } : { w: "1200", h: "720" };
}

function injectTheme(svg, w, h) {
  const bg = `<g id="pf-background" aria-hidden="true">
  <rect width="${w}" height="${h}" fill="url(#pf-bg)"/>
  <rect width="${w}" height="${h}" fill="url(#pf-grid)" opacity="0.45"/>
  <rect x="0" y="0" width="5" height="${h}" fill="#2563eb" rx="0"/>
</g>`;

  let next = svg;

  // Skip if already themed
  if (next.includes(THEME_MARKER)) return next;

  // Mark svg root
  next = next.replace(/<svg([^>]*)>/, `<svg$1 ${THEME_MARKER}>`);

  // Inject defs (merge into existing or create)
  if (/<defs>/.test(next)) {
    next = next.replace(/<defs>/, `<defs>${THEME_DEFS}`);
  } else {
    next = next.replace(/<svg([^>]*)>/, `<svg$1>\n<defs>${THEME_DEFS}</defs>`);
  }

  // Extend stylesheet
  if (/<\/style>/.test(next)) {
    next = next.replace(/<\/style>/, `${THEME_CSS}\n</style>`);
  }

  // Replace flat white background
  next = next.replace(
    /<rect width="(\d+)" height="(\d+)" fill="#fff"\s*\/>/,
    "",
  );

  // Remove duplicate header rules if present
  next = next.replace(/<line x1="40" y1="80" x2="1160" y2="80" stroke="#e5e5e5"[^/]*\/>/g, "");
  next = next.replace(/<line x1="40" y1="82" x2="1160" y2="82" stroke="#e5e5e5"[^/]*\/>/g, "");

  // Insert background layer after defs/style block
  const insertAt = next.search(/<\/defs>\s*(?:<style>[\s\S]*?<\/style>\s*)?/);
  const endMatch = next.match(/<\/defs>\s*(?:<style>[\s\S]*?<\/style>\s*)?/);
  if (endMatch) {
    const pos = insertAt + endMatch[0].length;
    next = next.slice(0, pos) + bg + next.slice(pos);
  }

  // Chart bar polish — round tops on blue bars
  next = next.replace(
    /<rect([^>]*fill="#1d4ed8")([^>]*)\/>/g,
    (m, a, b) => {
      if (/rx=/.test(m)) return m;
      return `<rect${a}${b} rx="3"/>`;
    },
  );
  next = next.replace(
    /<rect([^>]*fill="#2563eb")([^>]*)\/>/g,
    (m, a, b) => {
      if (/rx=/.test(m) || /height="[1-9]"/.test(m)) return m;
      return `<rect${a}${b} rx="3"/>`;
    },
  );

  // Progression / hero bands — gradient fill
  next = next.replace(
    /<rect([^>]*rx="17"[^>]*)fill="#eff6ff"([^>]*)>/g,
    '<rect$1fill="url(#pf-blue-soft)"$2>',
  );

  return next;
}

let changed = 0;
for (const name of readdirSync(figuresDir).filter((n) => n.endsWith(".svg"))) {
  const path = join(figuresDir, name);
  const original = readFileSync(path, "utf8");
  const { w, h } = parseSize(original);
  const next = injectTheme(original, w, h);
  if (next !== original) {
    writeFileSync(path, next, "utf8");
    changed += 1;
    console.log(`Themed ${name}`);
  }
}

console.log(changed ? `Enhanced ${changed} figure(s).` : "All figures already themed.");
