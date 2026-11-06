"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

export type FaqEntry = { id: string; question: string; answer: string; topic?: string };

/**
 * Accessible accordion: each question is a button with aria-expanded controlling its answer.
 * Answers stay in the HTML when closed (hidden attribute) so they are indexable and findable.
 * Several answers may be open at once; a URL hash matching an id opens that answer.
 */
export default function FaqList({
  items,
  highlight,
  topicLabel,
  defaultOpen = [],
}: {
  items: readonly FaqEntry[];
  highlight?: string;
  topicLabel?: (topic: string) => string | undefined;
  defaultOpen?: readonly string[];
}) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set(defaultOpen));
  const base = useId();

  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && items.some((i) => i.id === id)) setOpen((prev) => new Set(prev).add(id));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const btn = `${base}-${item.id}-q`;
        const panel = `${base}-${item.id}-a`;
        const topic = item.topic && topicLabel ? topicLabel(item.topic) : undefined;
        return (
          <li key={item.id} id={item.id} className="scroll-mt-32">
            <h3 className="m-0">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(item.id)}
                className="flex min-h-14 w-full items-start justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
              >
                <span className="min-w-0">
                  {topic ? <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-forest-500">{topic}</span> : null}
                  <span className="block text-base font-semibold leading-snug text-forest-950 sm:text-[1.0625rem]">
                    <Highlighted text={item.question} term={highlight} />
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm transition-transform ${
                    isOpen ? "rotate-45 border-forest-950 bg-forest-950 text-white" : "border-forest-200 text-forest-600"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} hidden={!isOpen} className="pb-5 pr-10">
              <p className="max-w-3xl text-[15px] leading-relaxed text-forest-700">
                <Highlighted text={item.answer} term={highlight} />
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Highlighted({ text, term }: { text: string; term?: string }): ReactNode {
  const t = term?.trim();
  if (!t || t.length < 2) return text;
  const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "ig"));
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded bg-brand-100 px-0.5 text-forest-950">
        {p}
      </mark>
    ) : (
      p
    ),
  );
}
