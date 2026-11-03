// JSON-LD is inlined in a <script> tag and partly sourced from the CMS, so "</script>" in content must not close it.
import { test } from "node:test";
import assert from "node:assert/strict";

test("JSON-LD serialisation cannot close its script tag and still parses to the same data", async () => {
  const { serializeJsonLd } = await import("@/lib/seo/serialize-jsonld");
  const node = { "@type": "FAQPage", text: 'Costs? </script><script>alert(1)</script> & "quotes"' };
  const out = serializeJsonLd(node);
  assert.doesNotMatch(out, /<\/script/i);
  assert.doesNotMatch(out, /</);
  assert.deepEqual(JSON.parse(out), node);
});
