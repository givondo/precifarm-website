"use client";

import { useEffect, useState } from "react";
import StageLabel from "@/components/interior/StageLabel";
import BodaCabinetSvg from "@/components/boda-hub/BodaCabinetSvg";
import { baseDoors, RELEASE_DOOR, RETURN_DOOR, swapSteps, type DoorState, type InHand } from "@/lib/boda-hub-page";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const STEP_MS = 3600;

const inHandCopy: Record<InHand, { label: string; colour: string }> = {
  depleted: { label: "Empty pack in hand", colour: "bg-[#c2410c]" },
  charged: { label: "Charged pack in hand", colour: "bg-brand-400" },
  none: { label: "Hands free", colour: "bg-forest-300" },
};

/** Step-through demonstration of a swap at the Automated Boda Hub cabinet. A drawing, not live data. */
export default function SwapDemo() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();
  const step = swapSteps[i];
  const last = swapSteps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      if (i >= last) setPlaying(false);
      else setI(i + 1);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, i, last]);

  const doors: Record<number, DoorState> = { ...baseDoors, ...step.doors } as Record<number, DoorState>;
  const highlight = Object.keys(step.doors)
    .map(Number)
    .filter((n) => String(step.doors[n]).startsWith("open") || (step.id === "return" && n === RETURN_DOOR) || (step.id === "close" && n === RELEASE_DOOR));
  const screenState = step.id === "ride" ? "done" : i === 0 ? "idle" : "active";
  const hand = inHandCopy[step.inHand];

  const go = (n: number) => {
    setPlaying(false);
    setI(Math.max(0, Math.min(last, n)));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
      <div className="min-w-0">
        <div className="relative rounded-[1.5rem] bg-[linear-gradient(180deg,#eef2f6_0%,#f6f7f8_70%)] p-4 ring-1 ring-border sm:p-6">
          <StageLabel kind="illustrative" className="absolute left-4 top-4 z-10" />
          <div className="mx-auto max-w-[26rem] pt-6">
            <BodaCabinetSvg
              doors={doors}
              highlight={highlight}
              screen={screenState}
              title={`Boda Hub cabinet, step ${i + 1} of ${swapSteps.length}: ${step.title}.`}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-forest-600">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className={`inline-block h-3 w-5 rounded-sm ${hand.colour}`} />
              {hand.label}
            </span>
            {step.phone ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-medium text-forest-800 ring-1 ring-border">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                  <rect x="4" y="1.5" width="8" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                Phone: {step.phone}
              </span>
            ) : null}
          </div>
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-forest-600">
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-1 w-4 rounded-full bg-[#4a9e73]" /> Charged
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-1 w-4 rounded-full bg-[#e0a03a]" /> Charging
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-1 w-4 rounded-full bg-[#9ca3af]" /> Empty
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="inline-block h-3 w-3 rounded-sm ring-2 ring-brand-300" /> Door in use
          </li>
        </ul>
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-forest-500">
            Step {i + 1} of {swapSteps.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(i - 1)}
              disabled={i === 0}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full ring-1 ring-border text-forest-800 hover:bg-[#f1f3f4] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
              aria-label="Previous step"
            >
              <span aria-hidden>‹</span>
            </button>
            {!reduced ? (
              <button
                type="button"
                onClick={() => {
                  if (i >= last) setI(0);
                  setPlaying((p) => !p);
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold ring-1 ring-border text-forest-800 hover:bg-[#f1f3f4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
              >
                {playing ? "Pause" : i >= last ? "Replay" : "Play"}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => go(i + 1)}
              disabled={i === last}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-forest-950 text-white hover:bg-forest-800 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600"
              aria-label="Next step"
            >
              <span aria-hidden>›</span>
            </button>
          </div>
        </div>

        <div aria-live="polite" className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-border">
          <h3 className="text-xl font-semibold tracking-tight text-forest-950">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-forest-700">{step.rider}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_9.5rem]">
            <div className="border-l-2 border-charge-600 pl-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">The cabinet</p>
              <p className="mt-1 text-sm leading-relaxed text-forest-700">{step.check}</p>
              {step.ref ? <p className="mt-1 font-mono text-[11px] text-forest-500">Register {step.ref}</p> : null}
            </div>
            <div role="group" aria-label="Cabinet screen" className="rounded-xl bg-forest-950 px-3 py-3 font-mono text-[12px] leading-snug text-white">
              <p className="mb-1 text-[10px] uppercase tracking-widest text-brand-300">Screen</p>
              {step.screen.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
        </div>

        <ol className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {swapSteps.map((s, n) => {
            const on = n === i;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => go(n)}
                  aria-current={on ? "step" : undefined}
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charge-600 ${
                    on ? "bg-forest-950 text-white" : n < i ? "text-forest-700 hover:bg-[#f1f3f4]" : "text-forest-600 hover:bg-[#f1f3f4]"
                  }`}
                >
                  <span className={`font-mono text-xs ${on ? "text-brand-300" : "text-forest-500"}`}>{String(n + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
