"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import StageLabel from "@/components/interior/StageLabel";
import SiteImage from "@/components/SiteImage";
import ArcSitePlan from "@/components/arc/ArcSitePlan";
import { arcTierNote, arcTiers, type ArcTierId } from "@/lib/pages/arc-corridor";

/** Tabbed explorer of the proposed ARC station configurations: R03 render, what it shows, and a bay plan. */
export default function ArcTierExplorer() {
  const baseId = useId();
  const [tierId, setTierId] = useState<ArcTierId>("arc-120");
  const [variantByTier, setVariantByTier] = useState<Record<string, string>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tierIndex = arcTiers.findIndex((t) => t.id === tierId);
  const tier = arcTiers[tierIndex];
  const variant = tier.variants.find((v) => v.id === variantByTier[tier.id]) ?? tier.variants[0];

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = arcTiers.length - 1;
    let next = -1;
    if (e.key === "ArrowRight") next = tierIndex === last ? 0 : tierIndex + 1;
    if (e.key === "ArrowLeft") next = tierIndex === 0 ? last : tierIndex - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setTierId(arcTiers[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="ARC station configurations" className="grid grid-cols-3 gap-1 rounded-full bg-[#eef0f2] p-1 sm:inline-grid sm:min-w-[28rem]">
        {arcTiers.map((t, i) => {
          const active = t.id === tierId;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTierId(t.id)}
              onKeyDown={onTabKey}
              className={`min-h-11 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 ${
                active ? "bg-white text-forest-950 shadow-sm" : "text-forest-600 hover:text-forest-900"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tier.id}`} className="mt-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
          <figure className="min-w-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-forest-900">
              <SiteImage
                key={variant.image.src}
                src={variant.image.src}
                alt={variant.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover"
              />
              <StageLabel kind="proposed" tone="dark" className="absolute left-3 top-3 backdrop-blur" />
            </div>
            <figcaption className="mt-2.5 text-xs leading-relaxed text-forest-500">
              {variant.label}: design render R03 at dusk. A proposed station configuration, not an installed site.
            </figcaption>
          </figure>

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-forest-950">{variant.label}</h3>
              {tier.variants.length > 1 ? (
                <div role="group" aria-label={`${tier.name} variant`} className="inline-flex rounded-full ring-1 ring-border">
                  {tier.variants.map((v) => {
                    const on = v.id === variant.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setVariantByTier((s) => ({ ...s, [tier.id]: v.id }))}
                        className={`min-h-10 rounded-full px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 ${
                          on ? "bg-forest-950 text-white" : "text-forest-600 hover:text-forest-900"
                        }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-forest-600">{tier.summary}</p>

            <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border">
              {[
                { label: "Dispenser islands", value: String(variant.layout.dispensers) },
                { label: "Marked bays", value: String(variant.layout.bays) },
                { label: "Pylon sign", value: variant.signConnectors },
              ].map((f) => (
                <div key={f.label} className="bg-white px-3 py-3">
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-forest-500">{f.label}</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-forest-950">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-forest-500">As drawn in the render. Final counts are set per site.</p>

            <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-forest-500">Typical host</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-forest-700">{tier.host}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-3 ring-1 ring-border sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-3">
            <p className="text-sm font-semibold text-forest-900">{variant.label} site plan</p>
            <p className="text-xs text-forest-500">Plan view, not to scale</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <ArcSitePlan layout={variant.layout} name={variant.label} />
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 px-1 text-xs text-forest-600">
            <li className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-3 w-2 rounded-sm bg-forest-950" />
              ARC dispenser, two cables
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-3 w-4 rounded-sm bg-[#e9ecef] ring-1 ring-[#d1d5db]" />
              Bay
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="inline-block w-5 border-t-2 border-dashed border-charge-600" />
              Cable route from the equipment yard
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="inline-block w-5 border-t-2 border-dashed border-forest-300" />
              Canopy outline
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-forest-500">{arcTierNote}</p>
    </div>
  );
}
