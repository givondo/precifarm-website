// Public enquiry forms: per-address rate limit and a honeypot field that is never forwarded to the CMS.
import { test } from "node:test";
import assert from "node:assert/strict";

const req = (ip = "203.0.113.7") => new Request("https://precifarm.com/api/contact", { method: "POST", headers: { "x-forwarded-for": `${ip}, 10.0.0.1` } });

test("rate limiter allows the window's quota, then blocks, then recovers", async () => {
  const { createRateLimiter } = await import("@/lib/rate-limit");
  const limited = createRateLimiter({ requests: 3, windowMs: 1000 });
  assert.deepEqual([0, 1, 2].map(() => limited("a", 0)), [false, false, false]);
  assert.equal(limited("a", 10), true);
  assert.equal(limited("b", 10), false, "other addresses are counted separately");
  assert.equal(limited("a", 2000), false, "old hits expire");
});

test("clientIp takes the first X-Forwarded-For address", async () => {
  const { clientIp } = await import("@/lib/rate-limit");
  assert.equal(clientIp(req("198.51.100.4")), "198.51.100.4");
  assert.equal(clientIp(new Request("https://precifarm.com/")), "unknown");
});

test("a filled honeypot is treated as a bot; an empty one is stripped before forwarding", async () => {
  const { guardFormSubmission, HONEYPOT_FIELD } = await import("@/lib/form-guard");
  const never = () => false;
  assert.deepEqual(guardFormSubmission(req(), { name: "A", [HONEYPOT_FIELD]: "http://spam" }, never), { ok: false, kind: "bot" });
  const ok = guardFormSubmission(req(), { name: "Wanjiru", email: "w@example.com", [HONEYPOT_FIELD]: "" }, never);
  assert.equal(ok.ok, true);
  if (ok.ok) assert.deepEqual(ok.body, { name: "Wanjiru", email: "w@example.com" });
});

test("non-object bodies are rejected and rate limits apply before parsing", async () => {
  const { guardFormSubmission } = await import("@/lib/form-guard");
  assert.deepEqual(guardFormSubmission(req(), [1, 2], () => false), { ok: false, kind: "invalid" });
  assert.deepEqual(guardFormSubmission(req(), { name: "A" }, () => true), { ok: false, kind: "rate-limited" });
});

test("the honeypot input name matches the field the guard strips", async () => {
  const { readFileSync } = await import("node:fs");
  const { HONEYPOT_FIELD } = await import("@/lib/form-guard");
  const src = readFileSync(new URL("../components/forms/HoneypotField.tsx", import.meta.url), "utf8");
  assert.match(src, new RegExp(`name="${HONEYPOT_FIELD}"`));
  for (const form of ["ContactForm", "HomeSurveyForm"]) {
    const f = readFileSync(new URL(`../components/${form}.tsx`, import.meta.url), "utf8");
    assert.match(f, /<HoneypotField \/>/, `${form} renders the honeypot`);
    assert.match(f, new RegExp(`${HONEYPOT_FIELD}: String\\(data.get\\("${HONEYPOT_FIELD}"\\)`), `${form} sends the honeypot value`);
  }
});
