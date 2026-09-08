"use client";

import { useState } from "react";
import { chargingHubs, hubPhaseDisplay, hubSiteTypeLabel } from "@/lib/hub-locations";
import { sitePricing } from "@/lib/site-copy";
import type { downloadPage, CopilotScreen } from "@/lib/download-page";

type Scenario = (typeof downloadPage.valueCards)[number];

const PHONE_HUB_IDS = ["nairobi", "nakuru", "boda-westlands", "kisumu", "mombasa"] as const;

const phoneHubs = PHONE_HUB_IDS.map((id) => chargingHubs.find((h) => h.id === id)).filter(
  (h): h is NonNullable<typeof h> => Boolean(h),
);

const phaseTone: Record<string, string> = {
  live: "bg-green-50 text-green-800 border-green-200",
  next: "bg-amber-50 text-amber-800 border-amber-200",
  planned: "bg-muted text-forest-500 border-border",
};

type Props = {
  scenarios: readonly Scenario[];
  activeId?: string;
  onActiveChange?: (id: string) => void;
  variant?: "light" | "dark";
  caption?: string;
  showTabs?: boolean;
};

export default function CopilotPhone({
  scenarios,
  activeId: controlledId,
  onActiveChange,
  variant = "dark",
  caption,
  showTabs = true,
}: Props) {
  const [internalId, setInternalId] = useState<string>(scenarios[0]?.id ?? "hub");
  const activeId = controlledId ?? internalId;
  const setActiveId = onActiveChange ?? setInternalId;
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const screen: CopilotScreen = active?.screen ?? "hub";
  const isLight = variant === "light";

  return (
    <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[340px]">
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-8 rounded-full blur-3xl ${
          isLight ? "bg-charge-400/15" : "bg-charge-500/20"
        }`}
      />
      <div className="relative">
        {showTabs ? (
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {scenarios.map((scenario) => {
              const on = scenario.id === activeId;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveId(scenario.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    on
                      ? isLight
                        ? "bg-charge-600 text-white shadow-md"
                        : "bg-white text-forest-900 shadow-md ring-1 ring-white/80"
                      : isLight
                        ? "border border-border bg-white text-forest-600 hover:border-charge-200 hover:text-charge-700"
                        : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {scenario.label}
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="relative rounded-[2.5rem] border-[11px] border-forest-950 bg-forest-950 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.55)]">
          <div className="absolute left-1/2 top-2.5 z-10 h-5 w-[5.5rem] -translate-x-1/2 rounded-full bg-forest-950" />
          <div className="overflow-hidden rounded-[1.85rem] bg-[#eef1ef]">
            <div className="flex items-center justify-between bg-white/95 px-4 pb-1 pt-8 text-[10px] font-medium text-forest-500 backdrop-blur">
              <span className="font-semibold text-forest-800">Precifarm Agent</span>
              <span className="rounded-full bg-charge-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-charge-700">
                {active?.label}
              </span>
            </div>

            <div className="min-h-[420px] px-3 pb-2 pt-2">
              {screen === "hub" && <HubScreen />}
              {screen === "home" && <HomeScreen />}
              {screen === "pay" && <PayScreen />}
            </div>

            <div className="border-t border-border/80 bg-white px-3 py-2.5">
              <div className="flex items-center gap-2 rounded-full border border-charge-200/80 bg-charge-50/50 px-3 py-2 shadow-inner">
                <span aria-hidden className="text-sm text-charge-600">
                  ⚡
                </span>
                <span className="text-[11px] text-forest-600">Hub · Home · M-Pesa</span>
              </div>
            </div>
          </div>
        </div>

        {active && !isLight ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm">
            <p className="text-sm font-medium text-white">{active.headline}</p>
          </div>
        ) : null}
      </div>
      {caption ? (
        <p className={`mt-4 text-center text-xs leading-relaxed ${isLight ? "text-forest-500" : "text-white/50"}`}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function HubScreen() {
  return (
    <div className="space-y-2.5">
      <div className="overflow-hidden rounded-xl border border-charge-100 bg-gradient-to-br from-charge-50 to-white px-3 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-charge-600">Charging Hub</p>
        <h3 className="mt-0.5 text-[16px] font-semibold text-forest-900">Find a site</h3>
        <div className="mt-2 flex gap-1">
          {["DC", "Boda", "All"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                i === 0 ? "bg-charge-600 text-white" : "bg-white text-forest-500 ring-1 ring-border"
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <ul className="space-y-2">
        {phoneHubs.map((hub) => {
          const phase = hubPhaseDisplay(hub);
          return (
            <li key={hub.id} className="rounded-xl border border-border bg-white px-3 py-2.5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-forest-900">{hub.name}</p>
                  <p className="mt-0.5 text-[10px] text-forest-500">{hubSiteTypeLabel(hub)}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase ${phaseTone[phase.tone]}`}
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
    <div className="space-y-2.5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-charge-600">Home energy</p>
        <h3 className="mt-0.5 text-[16px] font-semibold text-forest-900">Size your install</h3>
        <p className="mt-0.5 text-[11px] text-forest-500">Survey before we quote</p>
      </div>
      <article className="rounded-2xl border border-border bg-white p-3.5 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[13px] font-semibold text-forest-900">Pulse charger</p>
            <p className="mt-0.5 text-[11px] text-forest-500">7 kW wallbox · ~90 min typical day</p>
          </div>
          <span className="rounded-full bg-charge-50 px-2 py-0.5 text-[9px] font-semibold text-charge-700">Live</span>
        </div>
        <p className="mt-2 font-mono text-xs font-semibold text-charge-700">From KES 79,000</p>
      </article>
      <article className="rounded-2xl border border-border bg-white p-3.5 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[13px] font-semibold text-forest-900">Pod energy storage</p>
            <p className="mt-0.5 text-[11px] text-forest-500">Charger + 5 or 10 kWh backup</p>
          </div>
          <span className="rounded-full bg-charge-50 px-2 py-0.5 text-[9px] font-semibold text-charge-700">Live</span>
        </div>
        <p className="mt-2 font-mono text-xs font-semibold text-charge-700">From KES 295,000</p>
      </article>
      <p className="rounded-xl bg-forest-950 py-2.5 text-center text-[11px] font-semibold text-white">
        Request a home survey
      </p>
    </div>
  );
}

function PayScreen() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-green-700">M-Pesa</p>
      </div>
      <article className="rounded-2xl border border-border bg-white p-3.5 shadow-sm">
        <p className="text-[11px] text-forest-500">Public DC session</p>
        <p className="mt-1 text-lg font-semibold text-forest-900">{sitePricing.publicDcFrom}</p>
        <p className="mt-1 text-[10px] text-forest-500">Shown at the charger and in Precifarm Agent</p>
      </article>
      <article className="rounded-2xl border border-border bg-white p-3.5 shadow-sm">
        <p className="text-[11px] text-forest-500">Lipa Pole Pole</p>
        <p className="mt-1 text-lg font-semibold text-forest-900">{sitePricing.lipaFrom}</p>
        <p className="mt-1 text-[10px] text-forest-500">Deposit, monthly and total before PIN</p>
      </article>
      <p className="rounded-xl bg-charge-600 py-2.5 text-center text-[11px] font-semibold text-white">
        Pay with M-Pesa
      </p>
    </div>
  );
}
