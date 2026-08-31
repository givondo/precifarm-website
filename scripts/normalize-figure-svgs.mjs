/**
 * Normalise figure SVGs to valid, encoding-proof XML.
 *
 * Two problems are fixed here:
 *
 * 1. Encoding. These files can be written as cp1252, which makes the XML parser reject
 *    them ("Encoding error") when they are loaded through <img> — silently, with no build
 *    error. Affected files are re-decoded and rewritten as UTF-8 with an XML declaration.
 *
 * 2. Character loss. cp1252 cannot represent the typographic and mathematical characters
 *    used in the figure labels, so they arrive truncated to a single byte: an em dash
 *    becomes U+0014, a right arrow becomes U+2019, "less than or equal" becomes the
 *    letter "d". The REPAIRS table maps those artefacts back, and every remaining
 *    non-ASCII character in text content is then written as a numeric character
 *    reference so the files stay pure ASCII and cannot be corrupted again.
 *
 * Usage: node scripts/normalize-figure-svgs.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const figuresDir = join(__dirname, "..", "..", "docs", "product", "figures");

const XML_ENTITY_FIXES = [
  [/&nbsp;/g, "&#160;"],
  [/&ndash;/g, "&#8211;"],
  [/&mdash;/g, "&#8212;"],
  [/&times;/g, "&#215;"],
  [/&deg;/g, "&#176;"],
  [/&middot;/g, "&#183;"],
];

/** Applied to text content only, so SVG path data ("d=", "H") is never touched. */
const REPAIRS = [
  [/\u0014/g, "&#8212;"], // em dash
  [/\u2019/g, "&#8594;"], // right arrow
  [/\u0012/g, "&#8722;"], // minus sign
  [/\u201e/g, "&#8324;"], // subscript four
  [/\u00a9/g, "&#937;"], // ohm
  [/(^|[\s(])d(?=\s?[\d~])/g, "$1&#8804;"], // less than or equal
  [/(^|[\s(])e(?=\s?[\d~])/g, "$1&#8805;"], // greater than or equal
];

/** U+0013 is ambiguous: an en dash inside a range, or a tick closing a statement. */
function repairAmbiguousDash(text) {
  return text.replace(/\u0013/g, (match, offset) =>
    text.slice(offset + 1).trim() === "" ? "&#10003;" : "&#8211;",
  );
}

function repairTextContent(svg) {
  let repairs = 0;
  const next = svg.replace(/>([^<>]*)</g, (whole, content) => {
    if (!content.trim()) return whole;
    let text = repairAmbiguousDash(content);
    for (const [pattern, replacement] of REPAIRS) text = text.replace(pattern, replacement);
    // Anything still non-ASCII becomes a numeric character reference.
    text = text.replace(/[^\x00-\x7F]/g, (ch) => `&#${ch.codePointAt(0)};`);
    if (text !== content) repairs += 1;
    return `>${text}<`;
  });
  return { text: next, repairs };
}

function decode(buf) {
  const utf8 = buf.toString("utf8");
  if (!utf8.includes("\uFFFD")) return { text: utf8, reencoded: false };
  try {
    return { text: new TextDecoder("windows-1252").decode(buf), reencoded: true };
  } catch {
    return { text: buf.toString("latin1"), reencoded: true };
  }
}

let changed = 0;
for (const name of readdirSync(figuresDir).filter((n) => n.endsWith(".svg"))) {
  const path = join(figuresDir, name);
  const { text, reencoded } = decode(readFileSync(path));

  let next = text;
  let entityFixes = 0;
  for (const [pattern, replacement] of XML_ENTITY_FIXES) {
    next = next.replace(pattern, () => {
      entityFixes += 1;
      return replacement;
    });
  }

  const repaired = repairTextContent(next);
  next = repaired.text;

  const hasDeclaration = next.startsWith("<?xml");
  if (!hasDeclaration) next = `<?xml version="1.0" encoding="UTF-8"?>\n${next.replace(/^\uFEFF/, "")}`;

  if (reencoded || entityFixes || repaired.repairs || !hasDeclaration) {
    writeFileSync(path, next, "utf8");
    changed += 1;
    console.log(
      `${name}: ${[
        reencoded && "re-encoded to UTF-8",
        entityFixes && `${entityFixes} entity fix(es)`,
        repaired.repairs && `${repaired.repairs} text node(s) repaired`,
        !hasDeclaration && "added XML declaration",
      ]
        .filter(Boolean)
        .join(", ")}`,
    );
  }
}

console.log(changed ? `Normalised ${changed} file(s).` : "All figure SVGs already valid UTF-8 XML.");
