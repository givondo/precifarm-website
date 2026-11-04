// Product status is a claim about maturity, so its styling must come from semantic status tokens
// defined once in app/globals.css, never from ad-hoc hue utilities that drift between components.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const RAW_HUE = /\b(?:bg|text|ring|border)-(?:green|amber|sky|blue|red|yellow|emerald|lime|teal)-\d{2,3}\b/;

test("every product status uses semantic status tokens, not raw hues", async () => {
  const { productStatusCopy } = await import("@/lib/product-status");
  for (const [kind, meta] of Object.entries(productStatusCopy)) {
    assert.doesNotMatch(meta.className, RAW_HUE, `${kind} uses a raw hue class`);
    assert.match(meta.className, /\bbg-status-[a-z]+-bg\b/, `${kind} has no status background token`);
    assert.match(meta.className, /\btext-status-[a-z]+\b/, `${kind} has no status text token`);
    assert.ok(meta.meaning.length > 10, `${kind} needs a plain-language meaning`);
  }
});

test("every status token a status class names is defined in the Tailwind theme", async () => {
  const { productStatusCopy } = await import("@/lib/product-status");
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const used = new Set(
    Object.values(productStatusCopy).flatMap((m) => m.className.match(/status-[a-z]+(?:-(?:bg|ring))?/g) ?? []),
  );
  for (const token of used) assert.ok(css.includes(`--color-${token}:`), `--color-${token} is not defined`);
});

test("display headings on dark panels use heading-inverted, since .heading-display overrides text-white", async () => {
  const { readdirSync, statSync } = await import("node:fs");
  const { join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  // fileURLToPath, not URL.pathname: on Windows .pathname gives "/C:/..." and join() makes "C:\\C:\\..."
  const root = fileURLToPath(new URL("..", import.meta.url));
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (p.endsWith(".tsx")) files.push(p);
    }
  };
  walk(join(root, "components"));
  walk(join(root, "app"));
  for (const file of files) {
    for (const cls of readFileSync(file, "utf8").match(/className="[^"]*"/g) ?? []) {
      if (/\bheading-display\b/.test(cls) && /\btext-white\b/.test(cls))
        assert.match(cls, /\bheading-inverted\b/, `${file.slice(root.length)}: ${cls}`);
    }
  }
});

test("every programme status is a known status kind", async () => {
  const { programmes } = await import("@/lib/programmes");
  const { productStatusCopy } = await import("@/lib/product-status");
  for (const p of programmes) assert.ok(p.status in productStatusCopy, `${p.code} has unknown status ${p.status}`);
});
