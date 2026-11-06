"use client";

import Link from "next/link";
import { useState } from "react";
import { arcEnquiryHref, arcHostChecklist } from "@/lib/pages/arc-corridor";

/** What a host should have ready before the first call. Ticks stay on the page; nothing is sent. */
export default function ArcHostChecklist() {
  const [ready, setReady] = useState<Set<string>>(new Set());
  const count = ready.size;
  const total = arcHostChecklist.length;

  const toggle = (id: string) =>
    setReady((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-border sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-forest-950">What to have ready</h3>
          <p className="mt-1 text-sm text-forest-600">Tick what you already have. Missing items are fine: the survey fills the gaps.</p>
        </div>
        <p className="font-mono text-sm text-forest-700" aria-live="polite">
          {count} of {total} ready
        </p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eef0f2]" aria-hidden>
        <div className="h-full rounded-full bg-charge-600 transition-[width] duration-300" style={{ width: `${(count / total) * 100}%` }} />
      </div>

      <ul className="mt-5 divide-y divide-border">
        {arcHostChecklist.map((item) => {
          const on = ready.has(item.id);
          return (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-3 py-3.5">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(item.id)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-forest-300 accent-[#1f6f4a]"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-forest-900">{item.label}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-forest-600">{item.hint}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-5">
        <Link
          href={arcEnquiryHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-charge-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
        >
          Host an ARC Corridor site
        </Link>
        <p className="text-xs text-forest-500">Opens the contact form with ARC Corridor selected. The survey is free.</p>
      </div>
    </div>
  );
}
