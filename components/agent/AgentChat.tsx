"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { agentPublic } from "@/lib/agent/public";

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  meta?: string;
};

export default function AgentChat() {
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Tell me what you’re building — home Pulse install, depot, solar + storage, or a sizing check. I’ll plan the work and run the engineering calculators.",
      meta: `${agentPublic.stackLabel} · ${agentPublic.modelLabel}`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");
    const userMsg: UiMessage = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    scrollToBottom();

    try {
      const apiMessages = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = (await res.json()) as {
        reply?: string;
        error?: string;
        model?: string;
        backend?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? `Request failed (${res.status})`);
      }

      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.reply ?? "",
          meta: data.model ? `${data.backend ?? "deepseek"} · ${data.model}` : undefined,
        },
      ]);
      scrollToBottom();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, scrollToBottom]);

  return (
    <div className="flex min-h-[70vh] flex-col rounded-2xl border border-border bg-[#0c0f12] shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-charge-500" aria-hidden />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
            Precifarm Agent
          </p>
        </div>
        <p className="font-mono text-[10px] text-white/45">{agentPublic.modelLabel}</p>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[92%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto bg-charge-600/90 text-white"
                : "mr-auto border border-white/10 bg-white/[0.06] text-white/90"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
            {msg.meta ? (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/40">{msg.meta}</p>
            ) : null}
          </div>
        ))}
        {loading ? (
          <p className="font-mono text-xs text-white/50">Running calculators…</p>
        ) : null}
      </div>

      {error ? (
        <p className="border-t border-red-500/20 bg-red-950/40 px-4 py-2 text-sm text-red-200">{error}</p>
      ) : null}

      <div className="border-t border-white/10 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            rows={2}
            placeholder="e.g. Size a 7 kW Pulse install for 80 km/day in Nairobi with unreliable grid…"
            className="min-h-[52px] flex-1 resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-charge-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={loading || !input.trim()}
            className="btn-primary shrink-0 disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-white/40">
          Server-side {agentPublic.modelLabel}. For local OpenCode,{" "}
          <Link href="/download" className="underline underline-offset-2 hover:text-white/70">
            download the setup
          </Link>
          . Not a substitute for a licensed site survey.
        </p>
      </div>
    </div>
  );
}
