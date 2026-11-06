"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Wireless EV charging research simulation for the homepage. Schematic only: the coupling
 * curve is illustrative, not measured, and the card says so. Drawn at 5 mm per SVG unit.
 *
 * Motion: when the card scrolls into view the car drives into the bay, the pads align,
 * then energy ripples between them at a rate and strength set by the power level.
 * "Play misalignment demo" sweeps the car across the pad and back to centre.
 */

const MAX_MM = 250;
const WINDOW_MM = 100;
const MM_PER_UNIT = 5;
const DEMO = [0, 50, 100, 150, 200, 150, 100, 50, 0, -50, -100, -150, -100, -50, 0];

/** Illustrative relative coupling, 100% when centred. Not bench data. */
function relativeCoupling(offsetMm: number) {
  return Math.exp(-((offsetMm / 160) ** 2));
}

type Phase = "waiting" | "parking" | "aligning" | "ready";

export default function WirelessSimulation() {
  const [offset, setOffset] = useState(0);
  const [phaseState, setPhase] = useState<Phase>("waiting");
  const [demo, setDemo] = useState(false);
  const reduced = usePrefersReducedMotion();
  const sliderId = useId();
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const demoTimer = useRef<number | null>(null);

  // Drive in, align, then charge.
  useEffect(() => {
    if (!inView || reduced) return;
    // Each step only moves forward, so a visitor who grabs the slider early is not overridden.
    const advance = (from: Phase[], to: Phase) => () => setPhase((p) => (from.includes(p) ? to : p));
    const t0 = window.setTimeout(advance(["waiting"], "parking"), 50);
    const t1 = window.setTimeout(advance(["parking"], "aligning"), 1350);
    const t2 = window.setTimeout(advance(["aligning"], "ready"), 2050);
    return () => [t0, t1, t2].forEach((t) => window.clearTimeout(t));
  }, [inView, reduced]);

  const phase: Phase = reduced && inView ? "ready" : phaseState;

  const stopDemo = useCallback(() => {
    if (demoTimer.current !== null) window.clearInterval(demoTimer.current);
    demoTimer.current = null;
    setDemo(false);
  }, []);

  const playDemo = useCallback(() => {
    stopDemo();
    setPhase("ready");
    if (reduced) {
      setOffset(150);
      return;
    }
    setDemo(true);
    let i = 0;
    setOffset(DEMO[0]);
    demoTimer.current = window.setInterval(() => {
      i += 1;
      if (i >= DEMO.length) {
        stopDemo();
        return;
      }
      setOffset(DEMO[i]);
    }, 650);
  }, [reduced, stopDemo]);

  useEffect(() => stopDemo, [stopDemo]);

  const ready = phase === "ready";
  const inWindow = Math.abs(offset) <= WINDOW_MM;
  const coupling = Math.round(relativeCoupling(offset) * 100);
  const power = ready && inWindow ? coupling : 0;
  const shift = offset / MM_PER_UNIT;
  const carY = phase === "waiting" ? -260 : 0;

  const status =
    phase === "waiting" || phase === "parking"
      ? "Car arriving. Charging starts once it is parked over the pad."
      : phase === "aligning"
        ? "Parked. Checking alignment and clearing the pad for foreign objects."
        : offset === 0
          ? "Centred over the pad. Full power transfer."
          : inWindow
            ? "Inside the alignment window. Coupling drops, so the system trims power."
            : "Outside the alignment window. Transfer stops until the car is repositioned.";

  // Faster, stronger ripples at higher power.
  const speed = `${(2.6 - (power / 100) * 1.4).toFixed(2)}s`;

  return (
    <div ref={ref} className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Top view</p>
        <p className="rounded-full border border-amber-300/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-200">
          Research simulation
        </p>
      </div>

      <svg viewBox="0 0 400 230" className="h-auto w-full" role="img" aria-labelledby={`${sliderId}-t`}>
        <title id={`${sliderId}-t`}>
          {`Car receiver pad ${Math.abs(offset)} mm ${offset < 0 ? "left of" : offset > 0 ? "right of" : "centred on"} the ground pad. ${status}`}
        </title>
        <rect width="400" height="230" fill="#20262f" />
        <line x1="12" y1="0" x2="12" y2="230" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
        <line x1="388" y1="0" x2="388" y2="230" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />

        {/* alignment window */}
        <rect
          x={200 - 60 - WINDOW_MM / MM_PER_UNIT}
          y="55"
          width={120 + (2 * WINDOW_MM) / MM_PER_UNIT}
          height="120"
          rx="10"
          fill={ready && !inWindow ? "rgba(253,224,71,0.06)" : "none"}
          stroke={ready && !inWindow ? "rgba(253,224,71,0.6)" : "rgba(126,192,157,0.45)"}
          strokeDasharray="5 4"
          style={{ transition: "stroke 300ms, fill 300ms" }}
        />

        {/* ground pad, 600 mm */}
        <g>
          <rect x="140" y="55" width="120" height="120" rx="10" fill="#2b3440" stroke="rgba(255,255,255,0.4)" />
          {[44, 32, 20].map((r) => (
            <rect
              key={r}
              x={200 - r}
              y={115 - r}
              width={r * 2}
              height={r * 2}
              rx={r / 3}
              fill="none"
              stroke={power > 0 ? "#e2b878" : "#c9a46a"}
              strokeOpacity={power > 0 ? 0.6 + (power / 100) * 0.4 : 0.55}
              style={{ transition: "stroke-opacity 400ms" }}
            />
          ))}
          {/* energy ripples from the ground pad */}
          {power > 0 &&
            (reduced
              ? [18, 30, 42].map((r) => (
                  <circle key={r} cx="200" cy="115" r={r} fill="none" stroke="#7EC09D" strokeOpacity={(power / 100) * 0.6} strokeWidth="2" />
                ))
              : [0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    cx="200"
                    cy="115"
                    r="34"
                    fill="none"
                    stroke="#7EC09D"
                    strokeWidth={1 + (power / 100) * 1.5}
                    className="wpt-ripple"
                    style={{ ["--wpt-speed" as string]: speed, animationDelay: `calc(${speed} * ${i / 3})`, opacity: power / 100 }}
                  />
                )))}
        </g>

        {/* car body and receiver pad, moved by the offset and by the drive-in */}
        <g
          style={{
            transform: `translate(${shift}px, ${carY}px)`,
            transition: reduced ? "none" : phase === "parking" ? "transform 1300ms cubic-bezier(0.22, 1, 0.36, 1)" : "transform 450ms ease-out",
          }}
        >
          <rect x="30" y="-40" width="340" height="320" rx="60" fill="rgba(147,197,253,0.08)" stroke="rgba(255,255,255,0.25)" />
          <rect x="22" y="20" width="14" height="44" rx="5" fill="rgba(255,255,255,0.35)" />
          <rect x="364" y="20" width="14" height="44" rx="5" fill="rgba(255,255,255,0.35)" />
          <rect
            x="160"
            y="75"
            width="80"
            height="80"
            rx="8"
            fill={power > 0 ? "rgba(126,192,157,0.12)" : "none"}
            stroke={ready && !inWindow ? "#fde047" : "#7EC09D"}
            strokeWidth="2"
            strokeDasharray="6 4"
            className={phase === "aligning" && !reduced ? "animate-pulse" : undefined}
            style={{ transition: "fill 300ms, stroke 300ms" }}
          />
          <text x="200" y="119" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.7)">
            receiver
          </text>
        </g>

        <g fontSize="10" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.65)">
          <text x="200" y="196" textAnchor="middle">ground pad</text>
          <text x="200" y="214" textAnchor="middle" fill="rgba(126,192,157,0.85)">{`alignment window ±${WINDOW_MM} mm`}</text>
        </g>
      </svg>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={sliderId} className="text-sm text-white/85">
            Park off-centre
          </label>
          <span className="font-mono text-sm text-white">
            {offset > 0 ? "+" : ""}
            {offset} mm
          </span>
        </div>
        <input
          id={sliderId}
          type="range"
          min={-MAX_MM}
          max={MAX_MM}
          step={10}
          value={offset}
          onChange={(e) => {
            stopDemo();
            setPhase("ready");
            setOffset(Number(e.target.value));
          }}
          className="mt-2 w-full accent-brand-400"
        />
        <button
          type="button"
          onClick={demo ? stopDemo : playDemo}
          className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/20 px-3.5 text-xs font-semibold text-white/85 transition-colors hover:border-white/40 hover:text-white"
        >
          <span aria-hidden>{demo ? "■" : "▶"}</span>
          {demo ? "Stop demo" : "Play misalignment demo"}
        </button>

        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <dt className="text-[11px] text-white/60">Relative coupling</dt>
            <dd className="mt-0.5 font-mono text-base font-semibold text-white">{ready ? `${coupling}%` : "-"}</dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/60">Power transfer</dt>
            <dd className={`mt-0.5 font-mono text-base font-semibold ${power > 0 ? "text-brand-300" : "text-amber-200"}`}>
              {!ready ? "Standby" : power > 0 ? `${power}%` : "Stopped"}
            </dd>
          </div>
        </dl>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
          <div
            className="h-full rounded-full bg-brand-300"
            style={{ width: `${power}%`, transition: reduced ? "none" : "width 450ms ease-out" }}
          />
        </div>
        <p className="mt-3 min-h-[2.5rem] text-xs leading-relaxed text-white/70" aria-live="polite">
          {status}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-white/55">
          Illustrative model from Precifarm R&amp;D, not operational hardware or measured data.
        </p>
      </div>
    </div>
  );
}
