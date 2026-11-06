"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ActionLink } from "@/components/interior/Actions";
import StageLabel from "@/components/interior/StageLabel";
import SiteImage from "@/components/SiteImage";
import type { ChargingSegment, ChargingSegmentId } from "@/lib/charging";

const icons: Record<ChargingSegmentId, React.ReactNode> = {
  home: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z" />,
  fleet: <path d="M3 8h11v9H3zM14 11h4l3 3v3h-7M6.5 19.5a1.5 1.5 0 1 0 0-.01M17.5 19.5a1.5 1.5 0 1 0 0-.01" />,
  highway: <path d="M9 3 5 21M15 3l4 18M12 5v2.5M12 10.5v3M12 16.5v3" />,
  swap: <path d="M7 7h11l-3-3M17 17H6l3 3M5 7v3M19 14v3" />,
};

/**
 * Product discovery for /charging. A tab per place the vehicle charges; every panel is in the
 * server HTML (inactive ones carry `hidden`), so the content stays crawlable and works without JS.
 */
export default function ChargingExplorer({ segments }: { segments: readonly ChargingSegment[] }) {
  const [active, setActive] = useState<ChargingSegmentId>(segments[0].id);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = segments.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? i === last ? 0 : i + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? i === 0 ? last : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(segments[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
      <div role="tablist" aria-label="Where you charge" aria-orientation="vertical" className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:content-start lg:gap-1">
        {segments.map((s, i) => {
          const selected = s.id === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`charge-tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`charge-panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(s.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group relative flex min-h-16 items-start gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 lg:px-4 lg:py-4 ${
                selected ? "bg-forest-950 text-white shadow-lg shadow-black/10" : "bg-white text-forest-900 ring-1 ring-border hover:ring-forest-300 lg:bg-transparent lg:ring-0 lg:hover:bg-white"
              }`}
            >
              <svg viewBox="0 0 24 24" aria-hidden className={`mt-0.5 hidden h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.6] sm:block ${selected ? "text-brand-300" : "text-forest-400"}`} strokeLinecap="round" strokeLinejoin="round">
                {icons[s.id]}
              </svg>
              <span className="min-w-0">
                <span className={`block text-[11px] font-semibold uppercase tracking-widest ${selected ? "text-brand-300" : "text-charge-600"}`}>{s.where}</span>
                <span className="mt-0.5 block text-[15px] font-semibold leading-snug">{s.product}</span>
                <span className={`mt-1 hidden text-xs leading-snug lg:block ${selected ? "text-white/65" : "text-forest-500"}`}>{s.parked}</span>
              </span>
            </button>
          );
        })}
      </div>

      {segments.map((s) => (
        <div
          key={s.id}
          id={`charge-panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`charge-tab-${s.id}`}
          hidden={s.id !== active}
          className="min-w-0 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:starting:opacity-0"
        >
          <article className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-border">
            <div className="relative aspect-[4/3] w-full bg-forest-900 sm:aspect-[16/9]">
              <SiteImage src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" style={s.image.position ? { objectPosition: s.image.position } : undefined} />
              <StageLabel kind="illustrative" label="Render" tone="dark" className="absolute right-3 top-3 backdrop-blur" />
            </div>
            <div className="grid gap-8 p-5 sm:p-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] xl:gap-10">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">{s.product}</p>
                  <StageLabel kind={s.stage} />
                </div>
                <h3 className="heading-display mt-3 text-2xl leading-tight sm:text-[1.75rem]">{s.headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-forest-600">{s.body}</p>
                <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-forest-500">{s.time.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-forest-900">{s.time.value}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-forest-500">{s.price.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-forest-900">{s.price.value}</dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <ActionLink action={{ href: s.primary.href, label: s.primary.label, variant: "primary" }} />
                  <ActionLink action={{ href: s.secondary.href, label: s.secondary.label, variant: "link" }} />
                </div>
              </div>
              <dl className="min-w-0 divide-y divide-border self-start rounded-2xl bg-[#f6f7f8] px-4 sm:px-5">
                {s.facts.map((f) => (
                  <div key={f.label} className="py-3.5">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-forest-500">{f.label}</dt>
                    <dd className="mt-1 text-sm leading-snug text-forest-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
