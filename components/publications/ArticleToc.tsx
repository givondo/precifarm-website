"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/publications";

/**
 * Table of contents built from the article's headings. On phones it is a collapsed
 * disclosure above the text; from lg up it sits in a sticky side column and marks the
 * section being read.
 */
export default function ArticleToc({ items, label = "In this guide", variant }: { items: readonly TocItem[]; label?: string; variant: "inline" | "rail" }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (variant !== "rail") return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items, variant]);

  if (items.length < 2) return null;

  const list = (
    <ol className="space-y-0.5">
      {items.map((item, i) => {
        const isActive = variant === "rail" && active === item.id;
        return (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`flex min-h-10 items-baseline gap-3 rounded-lg border-l-2 py-2 pl-3 pr-2 text-sm leading-snug transition-colors ${
                isActive
                  ? "border-charge-600 bg-charge-50/60 font-medium text-forest-950"
                  : "border-transparent text-forest-600 hover:border-forest-200 hover:text-forest-950"
              }`}
            >
              <span className="font-mono text-[11px] text-forest-400">{String(i + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "inline") {
    return (
      <details className="group rounded-2xl border border-border bg-[#f6f7f8] lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold text-forest-900 [&::-webkit-details-marker]:hidden">
          {label}
          <span aria-hidden className="text-forest-400 transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <nav aria-label={label} className="border-t border-border px-2 py-2">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label={label} className="hidden lg:block">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-forest-500">{label}</p>
      {list}
    </nav>
  );
}
