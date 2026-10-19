import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normaliseHost, opsRoute } from "@/lib/agent/ops-host";
import { crossOrigin } from "@/lib/agent/guard";
import { agentRuntime } from "@/lib/agent/config";

describe("ops.precifarm.com routing", () => {
  it("serves the workspace at the root", () => {
    assert.deepEqual(opsRoute("/"), { kind: "rewrite", path: "/agent/chat" });
  });
  it("passes through the chat API, the workspace and legal pages", () => {
    for (const p of ["/api/agent/chat", "/agent/chat", "/legal/privacy", "/legal/terms"]) {
      assert.deepEqual(opsRoute(p), { kind: "next" }, p);
    }
  });
  it("sends /agent to the ops root", () => {
    assert.deepEqual(opsRoute("/agent"), { kind: "redirect", url: "https://ops.precifarm.com/" });
  });
  it("sends marketing pages to the main site, keeping the query", () => {
    assert.deepEqual(opsRoute("/charging/home", "?ref=ops"), { kind: "redirect", url: "https://precifarm.com/charging/home?ref=ops" });
    assert.deepEqual(opsRoute("/api/cms/contact"), { kind: "redirect", url: "https://precifarm.com/api/cms/contact" });
  });
  it("does not let look-alike paths through", () => {
    assert.equal(opsRoute("/api/agentx").kind, "redirect");
    assert.equal(opsRoute("/agent/chatroom").kind, "redirect");
  });
  it("normalises host headers", () => {
    assert.equal(normaliseHost("OPS.precifarm.com:443"), "ops.precifarm.com");
    assert.equal(normaliseHost("ops.precifarm.com, proxy.internal"), "ops.precifarm.com");
    assert.equal(normaliseHost(null), "");
  });
  it("accepts chat calls from the ops origin", () => {
    assert.ok(agentRuntime.allowedOrigins.includes("https://ops.precifarm.com"));
    assert.equal(crossOrigin("https://ops.precifarm.com", "ops.precifarm.com"), false);
    assert.equal(crossOrigin("https://ops.precifarm.com", "precifarm.com"), false);
    assert.equal(crossOrigin("https://evil.example", "ops.precifarm.com"), true);
  });
});
