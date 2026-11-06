"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { BrowserArt, PhoneArt, TerminalArt } from "@/components/download/PlatformArt";
import StageLabel from "@/components/interior/StageLabel";
import { trackEvent } from "@/lib/analytics";
import { platformOptions, type PlatformOption } from "@/lib/download-page";

const art = { web: BrowserArt, android: PhoneArt, desktop: TerminalArt } as const;

/** Guess the visitor's platform so the matching card can say "your device". Never hides an option. */
function detect(): PlatformOption["id"] | null {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "web";
  if (/Windows|Macintosh|Linux|CrOS/i.test(ua)) return "desktop";
  return null;
}

const subscribe = () => () => {};

export default function PlatformCards() {
  const mine = useSyncExternalStore(subscribe, detect, () => null);

  return (
    <ul className="grid gap-4 lg:grid-cols-3 lg:gap-5">
      {platformOptions.map((p) => {
        const Art = art[p.id];
        const isMine = mine === p.id;
        return (
          <li
            key={p.id}
            id={p.id}
            className={`flex scroll-mt-28 flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 transition-shadow ${
              isMine ? "ring-2 ring-charge-600 shadow-[0_18px_50px_-30px_rgba(31,111,74,0.6)]" : "ring-border"
            }`}
          >
            <div className="relative flex items-center justify-center bg-[linear-gradient(180deg,#f6f7f8,#eef0f2)] px-6 py-6">
              <Art className="h-28 w-auto sm:h-32" />
              {isMine ? (
                <span className="absolute right-3 top-3 rounded-full bg-charge-600 px-2.5 py-1 text-[11px] font-semibold text-white">Your device</span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-forest-900">{p.name}</h3>
                <StageLabel kind={p.status === "available" ? "available" : "development"} label={p.statusLabel} />
              </div>
              <p className="mt-1 text-[13px] text-forest-500">{p.devices}</p>
              <p className="mt-3 text-sm leading-relaxed text-forest-600">{p.summary}</p>

              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">You get</dt>
                  {p.gets.map((g) => (
                    <dd key={g} className="mt-1.5 flex gap-2 leading-snug text-forest-700">
                      <svg aria-hidden viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-charge-600" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m3.5 8.5 3 3 6-7" />
                      </svg>
                      {g}
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">You need</dt>
                  {p.needs.map((g) => (
                    <dd key={g} className="mt-1.5 flex gap-2 leading-snug text-forest-700">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-forest-300" />
                      {g}
                    </dd>
                  ))}
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
                {p.primary.kind === "file" ? (
                  <a
                    href={p.primary.href}
                    download="precifarm-agent.opencode.json"
                    onClick={() => trackEvent("website_app_download_clicked", { href: p.primary.href })}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
                  >
                    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
                    </svg>
                    {p.primary.label}
                  </a>
                ) : (
                  <Link
                    href={p.primary.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-charge-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
                  >
                    {p.primary.label}
                  </Link>
                )}
                {p.secondary ? (
                  <Link href={p.secondary.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-charge-600 hover:text-charge-700">
                    {p.secondary.label}
                    <span aria-hidden className="ml-1">
                      ›
                    </span>
                  </Link>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
