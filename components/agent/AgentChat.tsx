"use client";

import Link from "next/link";
import { Fragment, type ReactNode, useCallback, useRef, useState } from "react";
import { agentPublic } from "@/lib/agent/public";
import { agentToolCatalogue, type EvidenceLabel, type ToolResult } from "@/lib/agent/tools/engineering";

type TraceEntry = { tool: string; args: Record<string, unknown>; result: ToolResult };

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  meta?: string;
  trace?: TraceEntry[];
};

const toolLabel = Object.fromEntries(agentToolCatalogue.map((t) => [t.name, t.label])) as Record<string, string>;

const evidenceStyle: Record<EvidenceLabel, string> = {
  calculated: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  estimated: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  assumed: "border-white/20 bg-white/5 text-white/70",
  "needs site check": "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export const agentStarterPrompts = [
  "Design home charging for a Nairobi family that drives 80 km a day. Single-phase supply, power cuts most weeks.",
  "Size cable and protection for a 7 kW wallbox 35 m from the meter board.",
  "A school wants solar to cover 40 kWh a day plus 4 hours of backup for a 3 kW critical load. Size PV, battery and inverter.",
  "Compare charging cost vs petrol for a 120 km daily commute at KES 25/kWh and KES 190/L, 8 L/100 km.",
] as const;

const welcome: UiMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Tell me what you're building: a home Pulse install, a depot, solar and storage, or a cable and protection check. I'll plan the work and run the engineering tools for every number.",
  meta: `${agentPublic.stackLabel} · ${agentPublic.modelLabel}`,
};

/* ---------------- Minimal, safe markdown (no HTML injection) ---------------- */

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-semibold text-white">{p.slice(2, -2)}</strong>;
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i} className="rounded bg-white/10 px-1 font-mono text-[12px]">{p.slice(1, -1)}</code>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    out.push(
      <Tag key={`l${out.length}`} className={`my-2 space-y-1 pl-5 ${list.ordered ? "list-decimal" : "list-disc"}`}>
        {list.items.map((it, i) => (
          <li key={i}>{inline(it)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const ordered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || ordered) {
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) {
        flush();
        list = { ordered: isOrdered, items: [] };
      }
      list.items.push((bullet ?? ordered)![1]);
      continue;
    }
    flush();
    if (!line.trim()) continue;
    const heading = /^#{1,4}\s+(.*)$/.exec(line);
    if (heading) {
      out.push(
        <p key={`h${out.length}`} className="mt-3 font-semibold text-white first:mt-0">
          {inline(heading[1])}
        </p>,
      );
    } else {
      out.push(
        <p key={`p${out.length}`} className="mt-2 first:mt-0">
          {inline(line)}
        </p>,
      );
    }
  }
  flush();
  return <div className="break-words">{out}</div>;
}

/* ---------------- Calculation trace ---------------- */

function Trace({ trace }: { trace: TraceEntry[] }) {
  if (!trace.length) return null;
  return (
    <details className="group mt-3 rounded-lg border border-white/10 bg-black/20" open={trace.length <= 6}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white/55">
        <span>
          Calculation trace · {trace.length} tool {trace.length === 1 ? "call" : "calls"}
        </span>
        <span className="transition-transform group-open:rotate-90" aria-hidden>
          ›
        </span>
      </summary>
      <ol className="space-y-2 border-t border-white/10 p-3">
        {trace.map((t, i) => (
          <li key={i} className="rounded-md border border-white/[0.07] bg-white/[0.03] p-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-white/85">{toolLabel[t.tool] ?? t.tool}</span>
              <span className="font-mono text-[10px] text-white/35">{t.tool}()</span>
              <span className={`ml-auto rounded border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${evidenceStyle[t.result.label]}`}>
                {t.result.label}
              </span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-snug text-white/80">{t.result.summary}</p>
            {t.result.notes?.length ? (
              <ul className="mt-1.5 space-y-0.5">
                {t.result.notes.map((n) => (
                  <li key={n} className="text-[11px] leading-snug text-white/45">
                    · {n}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </details>
  );
}

/* ---------------- Workspace ---------------- */

export default function AgentChat({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<UiMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  const send = useCallback(
    async (preset?: string) => {
      const text = (preset ?? input).trim();
      if (!text || loading) return;

      setError(null);
      setInput("");
      const userMsg: UiMessage = { id: `u-${Date.now()}`, role: "user", content: text };
      const next = [...messages, userMsg];
      setMessages(next);
      setLoading(true);
      scrollToBottom();

      try {
        const apiMessages = next.filter((m) => m.id !== "welcome").map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        const data = (await res.json().catch(() => ({}))) as {
          reply?: string;
          error?: string;
          model?: string;
          backend?: string;
          trace?: TraceEntry[];
        };

        if (!res.ok) {
          throw new Error(data.error ?? `Request failed (${res.status})`);
        }

        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: data.reply || "No reply. Try rephrasing the brief.",
            meta: data.model ? `${data.backend ?? "deepseek"} · ${data.model}` : undefined,
            trace: data.trace ?? [],
          },
        ]);
        scrollToBottom();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, scrollToBottom],
  );

  const reset = () => {
    setMessages([welcome]);
    setError(null);
    setInput("");
  };

  const copy = async (msg: UiMessage) => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopied(msg.id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const started = messages.length > 1;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-[#0c0f12] shadow-lg ${
        compact ? "h-[620px]" : "min-h-[70vh]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-charge-500" aria-hidden />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">Precifarm Agent</p>
          <span
            className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/60"
            title="Ask and Plan only: the Agent takes no actions, payments or bookings."
          >
            Plan mode · no actions
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden font-mono text-[10px] text-white/45 sm:block">{agentPublic.modelLabel}</p>
          {started ? (
            <button type="button" onClick={reset} className="font-mono text-[10px] uppercase tracking-wider text-white/55 hover:text-white">
              New design
            </button>
          ) : null}
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[94%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto whitespace-pre-wrap bg-charge-600/90 text-white"
                : "mr-auto border border-white/10 bg-white/[0.06] text-white/90"
            }`}
          >
            {msg.role === "assistant" ? <Markdown text={msg.content} /> : msg.content}
            {msg.trace ? <Trace trace={msg.trace} /> : null}
            {msg.role === "assistant" && msg.id !== "welcome" ? (
              <div className="mt-2 flex items-center justify-between gap-3">
                {msg.meta ? <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{msg.meta}</p> : <span />}
                <button
                  type="button"
                  onClick={() => void copy(msg)}
                  className="font-mono text-[10px] uppercase tracking-wider text-white/45 hover:text-white"
                >
                  {copied === msg.id ? "Copied" : "Copy"}
                </button>
              </div>
            ) : msg.meta ? (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/40">{msg.meta}</p>
            ) : null}
          </div>
        ))}

        {!started ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {agentStarterPrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => void send(p)}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-[13px] leading-snug text-white/75 transition hover:border-charge-500/60 hover:bg-white/[0.06] hover:text-white"
              >
                {p}
              </button>
            ))}
          </div>
        ) : null}

        {loading ? (
          <p className="flex items-center gap-2 font-mono text-xs text-white/55">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-charge-500" aria-hidden />
            Planning and running engineering tools…
          </p>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="border-t border-red-500/20 bg-red-950/40 px-4 py-2 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <div className="border-t border-white/10 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor={compact ? "agent-input-embed" : "agent-input"} className="sr-only">
            Describe what you are building
          </label>
          <textarea
            id={compact ? "agent-input-embed" : "agent-input"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            rows={2}
            maxLength={6000}
            placeholder="e.g. Size a 7 kW Pulse install for 80 km/day in Nairobi with unreliable grid…"
            className="min-h-[52px] flex-1 resize-y rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-charge-500 focus:outline-none"
          />
          <button type="button" onClick={() => void send()} disabled={loading || !input.trim()} className="btn-primary shrink-0 disabled:opacity-50">
            Send
          </button>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-white/40">
          Every number comes from an engineering tool and carries an evidence label. Not a substitute for a site survey or a
          qualified professional.{" "}
          {compact ? (
            <Link href={agentPublic.chatPath} className="underline underline-offset-2 hover:text-white/70">
              Open full workspace
            </Link>
          ) : (
            <Link href="/download" className="underline underline-offset-2 hover:text-white/70">
              Local OpenCode setup
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}
