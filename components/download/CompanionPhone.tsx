"use client";

import { useState } from "react";
import { chargingHubs, hubPhaseDisplay, hubSiteTypeLabel } from "@/lib/hub-locations";
import { sitePricing } from "@/lib/site-copy";

const PHONE_HUB_IDS = ["kisumu", "nakuru", "nairobi", "boda-westlands", "mombasa"] as const;

const tabs = [
  { id: "hub" as const, label: "Hub" },
  { id: "home" as const, label: "Home" },
  { id: "pay" as const, label: "Pay" },
];

type TabId = (typeof tabs)[number]["id"];

const phoneHubs = PHONE_HUB_IDS.map((id) => chargingHubs.find((h) => h.id === id)).filter(
  (h): h is NonNullable<typeof h> => Boolean(h),
);

const toneClass: Record<string, string> = {
  live: "bg-green-50 text-green-800 border-green-200",
  next: "bg-amber-50 text-amber-800 border-amber-200",
  planned: "bg-muted text-forest-500 border-border",
};

export default function CompanionPhone({ caption }: { caption: string }) {
  const [tab, setTab] = useState<TabId>("hub");

  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="relative rounded-[2.35rem] border-[10px] border-forest-950 bg-forest-950 shadow-[0_28px_60px_-24px_rgba(10,10,10,0.55)]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-forest-950" />
        <div className="overflow-hidden rounded-[1.75rem] bg-white">
          <div className="flex items-center justify-between px-4 pb-1 pt-7 text-[10px] font-medium text-forest-500">
            <span>Precifarm</span>
            <span>9:41</span>
          </div>

          <div className="min-h-[420px] px-3 pb-3">
            {tab === "hub" && <HubScreen />}
            {tab === "home" && <HomeScreen />}
            {tab === "pay" && <PayScreen />}
          </div>

          <nav className="grid grid-cols-3 border-t border-border bg-white" aria-label="Companion screens">
            {tabs.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`py-2.5 text-[11px] font-semibold ${
                    active ? "text-charge-700" : "text-forest-400"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-forest-500">{caption}</p>
    </div>
  );
}

function HubScreen() {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-charge-600">Charging Hub</p>
      <h3 className="mt-1 text-base font-semibold text-forest-900">Find a site</h3>
      <p className="mt-1 text-[11px] text-forest-500">Live and planned labelled honestly.</p>
      <ul className="mt-3 space-y-2">
        {phoneHubs.map((hub) => {
          const phase = hubPhaseDisplay(hub);
          return (
            <li key={hub.id} className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-forest-900">{hub.name}</p>
                  <p className="mt-0.5 text-[10px] text-forest-500">{hubSiteTypeLabel(hub)}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${toneClass[phase.tone]}`}
                >
                  {phase.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function HomeScreen() {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-charge-600">Home energy</p>
      <h3 className="mt-1 text-base font-semibold text-forest-900">Size your wall</h3>
      <p className="mt-1 text-[11px] text-forest-500">Survey before we quote.</p>
      <div className="mt-3 space-y-2">
        <article className="rounded-xl border border-border bg-muted/30 px-3 py-3">
          <p className="text-[13px] font-semibold text-forest-900">Pulse charger</p>
          <p className="mt-0.5 text-[11px] text-forest-500">7 kW home wallbox · ~90 min typical day</p>
          <p className="mt-2 font-mono text-xs font-semibold text-charge-700">From KES 79,000</p>
        </article>
        <article className="rounded-xl border border-border bg-muted/30 px-3 py-3">
          <p className="text-[13px] font-semibold text-forest-900">Pod energy storage</p>
          <p className="mt-0.5 text-[11px] text-forest-500">Charger + 5 or 10 kWh when Kenya Power dips</p>
          <p className="mt-2 font-mono text-xs font-semibold text-charge-700">From KES 295,000</p>
        </article>
        <p className="rounded-xl bg-forest-950 px-3 py-2.5 text-center text-[12px] font-semibold text-white">
          Request a survey
        </p>
      </div>
    </div>
  );
}

function PayScreen() {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-charge-600">M-Pesa</p>
      <h3 className="mt-1 text-base font-semibold text-forest-900">Price before PIN</h3>
      <p className="mt-1 text-[11px] text-forest-500">No bank account required.</p>
      <div className="mt-3 space-y-2">
        <article className="rounded-xl border border-border bg-muted/30 px-3 py-3">
          <p className="text-[11px] text-forest-500">Public DC session</p>
          <p className="mt-1 text-lg font-semibold text-forest-900">From {sitePricing.publicDcFrom}</p>
          <p className="mt-1 text-[11px] text-forest-500">Shown at the charger and in the companion.</p>
        </article>
        <article className="rounded-xl border border-border bg-muted/30 px-3 py-3">
          <p className="text-[11px] text-forest-500">Lipa Pole Pole</p>
          <p className="mt-1 text-lg font-semibold text-forest-900">From {sitePricing.lipaFrom}</p>
          <p className="mt-1 text-[11px] text-forest-500">Deposit, monthly and total before you confirm.</p>
        </article>
        <p className="rounded-xl bg-charge-600 px-3 py-2.5 text-center text-[12px] font-semibold text-white">
          Pay with M-Pesa
        </p>
      </div>
    </div>
  );
}
