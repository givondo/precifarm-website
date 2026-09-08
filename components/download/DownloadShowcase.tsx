"use client";

import Link from "next/link";
import { useState } from "react";
import CopilotPhone from "@/components/download/CopilotPhone";
import SiteImage from "@/components/SiteImage";
import { downloadPage } from "@/lib/download-page";

const page = downloadPage;

export default function DownloadShowcase() {
  const [activeId, setActiveId] = useState<string>(page.valueCards[0]?.id ?? "hub");
  const active = page.valueCards.find((card) => card.id === activeId) ?? page.valueCards[0];

  return (
    <section className="section-pad border-b border-border bg-white">
      <div className="page-container max-w-6xl">
        <div className="home-section-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-charge-600">Why Precifarm Agent</p>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">Three jobs. One Android app.</h2>
          <p className="mt-3 text-base text-forest-600">
            Public charging, home energy surveys and M-Pesa — not three separate tools from three vendors.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {page.valueCards.map((card) => {
            const on = card.id === activeId;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveId(card.id)}
                className={`group flex flex-col overflow-hidden rounded-[1.75rem] border text-left transition-all ${
                  on
                    ? "border-charge-300 bg-charge-50/40 shadow-lg shadow-charge-600/10 ring-2 ring-charge-500/20"
                    : "border-border bg-white hover:border-charge-200 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden surface-well">
                  <SiteImage
                    src={card.image.src}
                    alt={card.image.alt}
                    width={800}
                    height={600}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={`h-full w-full object-contain p-4 transition-transform duration-300 ${
                      on ? "scale-[1.03]" : "group-hover:scale-[1.02]"
                    }`}
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      on ? "bg-charge-600 text-white" : "border border-border bg-white/95 text-forest-600"
                    }`}
                  >
                    {card.eyebrow}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-forest-900">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-600">{card.headline}</p>
                </div>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:gap-14">
            <article className="rounded-[1.75rem] border border-border bg-gradient-to-br from-muted/50 to-white p-6 sm:p-8">
              <span className="inline-flex rounded-full border border-charge-200 bg-charge-50 px-3 py-1 text-xs font-semibold text-charge-700">
                {active.label}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">{active.headline}</h3>
              <p className="mt-3 text-base leading-relaxed text-forest-600">{active.text}</p>
              <ul className="mt-5 space-y-2">
                {active.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-forest-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-500" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href={active.href}
                className="link-touch mt-6 inline-flex text-sm font-semibold text-charge-700 hover:text-charge-600"
              >
                {active.linkLabel} ›
              </Link>
            </article>

            <CopilotPhone
              scenarios={page.valueCards}
              activeId={activeId}
              onActiveChange={setActiveId}
              variant="light"
              caption="Tap Hub, Home or M-Pesa — illustrative in-app screens."
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
