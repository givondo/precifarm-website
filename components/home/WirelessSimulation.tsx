"use client";

import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Wireless EV charging research simulation for the homepage. Schematic only: the coupling
 * curve is illustrative, not measured, and the card says so. Drawn at 5 mm per SVG unit.
 */

const MAX_MM = 250;
const WINDOW_MM = 100;
const MM_PER_UNIT = 5;

/** Illustrative relative coupling, 100% when centred. Not bench data. */
function relativeCoupling(offsetMm: number) {
  return Math.exp(-((offsetMm / 160) ** 2));
}

export default function WirelessSimulation() {
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();
  const sliderId = useId();

  const inWindow = Math.abs(offset) <= WINDOW_MM;
  const coupling = Math.round(relativeCoupling(offset) * 100);
  const power = inWindow ? coupling : 0;
  const shift = offset / MM_PER_UNIT;

  const status = offset === 0
    ? "Centred over the pad. Full power transfer."
    : inWindow
      ? "Inside the alignment window. Coupling drops, so the system trims power."
      : "Outside the alignment window. Transfer stops until the car is repositioned.";

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/20">
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
          fill="none"
          stroke="rgba(126,192,157,0.45)"
          strokeDasharray="5 4"
        />

        {/* ground pad, 600 mm */}
        <g>
          <rect x="140" y="55" width="120" height="120" rx="10" fill="#2b3440" stroke="rgba(255,255,255,0.4)" />
          {[44, 32, 20].map((r) => (
            <rect key={r} x={200 - r} y={115 - r} width={r * 2} height={r * 2} rx={r / 3} fill="none" stroke="#c9a46a" strokeOpacity="0.8" />
          ))}
        </g>

        {/* car body and receiver pad, moved by the offset */}
        <g style={{ transform: `translateX(${shift}px)`, transition: reduced ? "none" : "transform 250ms ease-out" }}>
          <rect x="30" y="-40" width="340" height="320" rx="60" fill="rgba(147,197,253,0.08)" stroke="rgba(255,255,255,0.25)" />
          <rect x="22" y="20" width="14" height="44" rx="5" fill="rgba(255,255,255,0.35)" />
          <rect x="364" y="20" width="14" height="44" rx="5" fill="rgba(255,255,255,0.35)" />
          <rect x="160" y="75" width="80" height="80" rx="8" fill="none" stroke="#7EC09D" strokeWidth="2" strokeDasharray="6 4" />
          {power > 0 &&
            [0, 1, 2].map((i) => (
              <circle
                key={i}
                cx="200"
                cy="115"
                r={12 + i * 10}
                fill="none"
                stroke="#7EC09D"
                strokeOpacity={(power / 100) * (0.8 - i * 0.2)}
                strokeWidth="2"
                className={reduced ? undefined : "animate-pulse"}
              />
            ))}
        </g>

        <g fontSize="10" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.65)">
          <text x="200" y="196" textAnchor="middle">ground pad</text>
          <text x="200" y="214" textAnchor="middle" fill="rgba(126,192,157,0.85)">{`alignment window ±${WINDOW_MM} mm`}</text>
        </g>
      </svg>

      <div className="border-t border-white/10 px-4 py-4">
        <label htmlFor={sliderId} className="flex items-baseline justify-between text-sm text-white/85">
          <span>Park off-centre</span>
          <span className="font-mono text-white">{offset > 0 ? "+" : ""}{offset} mm</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={-MAX_MM}
          max={MAX_MM}
          step={10}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="mt-2 w-full accent-brand-400"
        />
        <dl className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <dt className="text-[11px] text-white/60">Relative coupling</dt>
            <dd className="mt-0.5 font-mono text-base font-semibold text-white">{coupling}%</dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/60">Power transfer</dt>
            <dd className={`mt-0.5 font-mono text-base font-semibold ${power > 0 ? "text-brand-300" : "text-amber-200"}`}>
              {power > 0 ? `${power}%` : "Stopped"}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-white/70" aria-live="polite">
          {status}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-white/55">
          Illustrative model from Precifarm R&amp;D, not operational hardware or measured data.
        </p>
      </div>
    </div>
  );
}
