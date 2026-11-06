// Company and publication pages: article parsing, contact validation, FAQ topics, city fallbacks and honest status.
import { test } from "node:test";
import assert from "node:assert/strict";

test("article parser gives stable unique heading ids and a table of contents", async () => {
  const { parseMarkdownBlocks, tocFromBlocks, readingMinutes, sectionId } = await import("@/lib/publications");
  const blocks = parseMarkdownBlocks("## The short answer\nText **bold**.\n\n- one\n- two\n\n1. first\n2. second\n## The short answer\n### Detail");
  assert.deepEqual(
    blocks.map((b) => b.kind),
    ["h2", "p", "ul", "ol", "h2", "h3"],
  );
  const toc = tocFromBlocks(blocks);
  assert.deepEqual(toc.map((t) => t.id), ["the-short-answer", "the-short-answer-2"]);
  assert.equal(readingMinutes("word ".repeat(440)), 2);
  assert.equal(sectionId("3. Products vs research"), "products-vs-research");
});

test("every static guide figure follows a heading that exists in that guide", async () => {
  const { staticGuides } = await import("@/lib/seo/static-guides");
  const { guideExtras } = await import("@/lib/pages/guides");
  const { parseMarkdownBlocks } = await import("@/lib/publications");
  for (const g of staticGuides) {
    const extra = guideExtras[g.slug];
    assert.ok(extra, `${g.slug} has no topic`);
    if (!extra.figure) continue;
    const ids = parseMarkdownBlocks(g.bodyMd ?? "").flatMap((b) => ("id" in b ? [b.id] : []));
    assert.ok(ids.includes(extra.figure.after), `${g.slug}: no heading ${extra.figure.after}`);
  }
});

test("contact form validation accepts a normal enquiry and explains each problem", async () => {
  const { validateContact } = await import("@/lib/pages/contact");
  assert.deepEqual(validateContact({ name: "Test Visitor", email: "test@example.com", phone: "", message: "Automated test message. Please ignore." }), {});
  assert.deepEqual(validateContact({ name: "A N", email: "a@b.co", phone: "+254 712 345 678", message: "Need a charger" }), {});
  const bad = validateContact({ name: "", email: "nope", phone: "12", message: "hi" });
  assert.deepEqual(Object.keys(bad).sort(), ["email", "message", "name", "phone"]);
});

test("contact categories cover every enquiry topic exactly once", async () => {
  const { contactGroups } = await import("@/lib/pages/contact");
  const { contactInterests } = await import("@/lib/contact-interests");
  const keys = contactGroups.flatMap((g) => g.keys);
  assert.equal(new Set(keys).size, keys.length, "a topic appears in two groups");
  assert.deepEqual([...keys].sort(), Object.keys(contactInterests).sort());
});

test("every FAQ on /faq has a known topic and a unique id", async () => {
  const { faqIndexEntries, faqTopics } = await import("@/lib/pages/faq");
  const { faqIndexChargingFaqs } = await import("@/lib/charging-faqs");
  assert.equal(faqIndexEntries.length, faqIndexChargingFaqs.length);
  assert.equal(new Set(faqIndexEntries.map((f) => f.id)).size, faqIndexEntries.length);
  const topics = new Set(faqTopics.map((t) => t.id));
  for (const f of faqIndexEntries) assert.ok(f.topic && topics.has(f.topic as never), `${f.id} has topic ${f.topic}`);
});

test("every city on /locations has a static page, and none says a Precifarm site is open", async () => {
  const { fallbackLocations, staticCityPage } = await import("@/lib/locations-page");
  for (const loc of fallbackLocations()) {
    const page = staticCityPage(loc.slug);
    assert.ok(page, `/locations/${loc.slug} has no static page`);
    assert.equal(loc.href, `/locations/${loc.slug}`);
    assert.ok(page.description.length <= 165, `${loc.slug} description is ${page.description.length}`);
    const text = JSON.stringify(page);
    assert.doesNotMatch(text, /\blive\b|\bopen now\b/i, `${loc.slug} claims a live site`);
    for (const s of page.services) if (s.name !== "Pulse home charging") assert.notEqual(s.stage, "available", `${loc.slug}: ${s.name} marked available`);
  }
});

test("sustainability page separates targets from results", async () => {
  const { sustainabilityGoalsOrdered } = await import("@/lib/sustainability-page");
  assert.equal(sustainabilityGoalsOrdered.length, 6);
  for (const g of sustainabilityGoalsOrdered) assert.ok(g.target && g.by && g.today, `goal ${g.id} needs target, date and today`);
});

test("company and publication copy has no en or em dashes", async () => {
  const mods = await Promise.all([
    import("@/lib/about-page"),
    import("@/lib/careers"),
    import("@/lib/training"),
    import("@/lib/training-page"),
    import("@/lib/sustainability-page"),
    import("@/lib/locations-page"),
    import("@/lib/pages/contact"),
    import("@/lib/pages/guides"),
    import("@/lib/company-pages"),
    import("@/lib/legal/content"),
  ]);
  for (const m of mods) assert.doesNotMatch(JSON.stringify(m), /[–—]/);
});
