"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import FaqList, { type FaqEntry } from "@/components/faq/FaqList";

type Topic = { id: string; label: string };

function normalise(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

/**
 * Search and topic filters over the FAQ list. Everything is rendered on the server first, so the
 * full list works without JavaScript; filtering only hides what does not match.
 */
export default function FaqExplorer({ items, topics }: { items: readonly FaqEntry[]; topics: readonly Topic[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>("all");
  const deferred = useDeferredValue(query);
  const searchId = useId();
  const statusId = useId();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const i of items) if (i.topic) c[i.topic] = (c[i.topic] ?? 0) + 1;
    return c;
  }, [items]);

  const results = useMemo(() => {
    const words = normalise(deferred).split(/\s+/).filter((w) => w.length > 1);
    return items.filter((i) => {
      if (topic !== "all" && i.topic !== topic) return false;
      if (!words.length) return true;
      const hay = normalise(`${i.question} ${i.answer}`);
      return words.every((w) => hay.includes(w));
    });
  }, [items, deferred, topic]);

  const label = (id: string) => topics.find((t) => t.id === id)?.label;
  const activeTopic = topic === "all" ? null : label(topic);

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
      <div className="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:self-start">
        <label htmlFor={searchId} className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
          Search the FAQ
        </label>
        <div className="relative mt-2">
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-400">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Price, Lipa Pole Pole, plug…"
            autoComplete="off"
            aria-describedby={statusId}
            className="h-12 w-full rounded-xl border border-forest-200 bg-white pl-10 pr-3 text-[15px] text-forest-950 placeholder:text-forest-400 focus:border-charge-600 focus:outline-none focus:ring-2 focus:ring-charge-600/20"
          />
        </div>

        <fieldset className="mt-6">
          <legend className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Topics</legend>
          <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
            {[{ id: "all", label: "All questions" }, ...topics].map((t) => {
              const on = topic === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTopic(t.id)}
                  className={`flex min-h-10 shrink-0 items-center justify-between gap-3 rounded-full border px-3.5 text-sm transition-colors lg:rounded-lg lg:border-0 lg:px-3 ${
                    on
                      ? "border-forest-950 bg-forest-950 font-medium text-white lg:bg-forest-950"
                      : "border-forest-200 bg-white text-forest-700 hover:border-forest-300 lg:bg-transparent lg:hover:bg-[#f1f3f4]"
                  }`}
                >
                  <span className="whitespace-nowrap">{t.label}</span>
                  <span className={`font-mono text-[11px] ${on ? "text-white/70" : "text-forest-400"}`}>{counts[t.id] ?? 0}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="min-w-0">
        <p id={statusId} role="status" aria-live="polite" className="mb-4 text-sm text-forest-600">
          {results.length === items.length && !deferred.trim()
            ? `${items.length} questions`
            : `${results.length} of ${items.length} questions${activeTopic ? ` in ${activeTopic}` : ""}${deferred.trim() ? ` matching “${deferred.trim()}”` : ""}`}
        </p>
        {results.length ? (
          <FaqList key={`${topic}`} items={results} highlight={deferred} topicLabel={topic === "all" ? label : undefined} />
        ) : (
          <div className="rounded-2xl border border-dashed border-forest-200 px-5 py-8 text-center">
            <p className="font-semibold text-forest-900">No answer matches that yet.</p>
            <p className="mt-2 text-sm text-forest-600">Try a shorter word, clear the topic, or ask us directly.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTopic("all");
                }}
                className="inline-flex min-h-11 items-center rounded-full border border-forest-200 px-5 text-sm font-semibold text-forest-900 hover:border-forest-300"
              >
                Clear search
              </button>
              <Link href="/contact?interest=general" className="inline-flex min-h-11 items-center rounded-full bg-charge-600 px-5 text-sm font-semibold text-white hover:bg-charge-500">
                Ask Precifarm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
