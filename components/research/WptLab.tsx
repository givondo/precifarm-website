"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import StageLabel from "@/components/interior/StageLabel";
import styles from "@/components/research/wpt.module.css";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { coupling, linkEfficiency, simulate, wptModel as M, wptStateCopy } from "@/lib/wireless-wpt-model";

/**
 * Wireless charging research simulation: top view (alignment), side view (charging pads and air gap),
 * an efficiency curve and the power chain. Everything here is an illustrative model (lib/wireless-wpt-model.ts),
 * not Precifarm hardware or measured data. Drag the receiver pad or use the sliders.
 */

const S = 0.36; // drawing units per mm
const TOP = { w: 360, h: 260, cx: 180, cy: 130 };
const SIDE = { w: 360, h: 200, ground: 176, pad: 14 };
const SWEEP: [number, number][] = [
  [0, 0], [40, 0], [80, 0], [120, 0], [160, 0], [120, 0], [80, 40], [40, 80], [0, 120], [0, 80], [-60, 40], [-120, 0], [-60, 0], [0, 0],
];

const snap = (v: number) => Math.max(-M.RANGE_MM, Math.min(M.RANGE_MM, Math.round(v / 10) * 10));
const pct = (v: number, dp = 0) => `${(v * 100).toFixed(dp)}%`;

function Slider({ id, label, value, min, max, step, unit, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13px] text-white/80">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-[13px] text-white">
          {value > 0 && unit === "mm" && label !== "Air gap" ? "+" : ""}
          {value} {unit}
        </output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1.5 w-full accent-brand-400" />
    </div>
  );
}

export default function WptLab() {
  const uid = useId();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [gap, setGap] = useState<number>(M.GAP_DEFAULT_MM);
  const [q, setQ] = useState<number>(M.Q_DEFAULT);
  const [fo, setFo] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const timer = useRef<number | null>(null);

  const sim = simulate({ x, y, gap, q, foreignObject: fo });

  const stopSweep = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
    setSweeping(false);
  }, []);

  const sweep = () => {
    stopSweep();
    setFo(false);
    if (reduced) {
      setX(120);
      setY(0);
      return;
    }
    setSweeping(true);
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      if (i >= SWEEP.length) return stopSweep();
      setX(SWEEP[i][0]);
      setY(SWEEP[i][1]);
    }, 600);
  };

  useEffect(() => stopSweep, [stopSweep]);

  const toMm = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return null;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return [snap((pt.x - TOP.cx) / S), snap((pt.y - TOP.cy) / S)] as const;
  };

  const onDown = (e: React.PointerEvent<SVGGElement>) => {
    stopSweep();
    dragging.current = true;
    svgRef.current?.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    const mm = toMm(e);
    if (mm) {
      setX(mm[0]);
      setY(mm[1]);
    }
  };
  const onUp = (e: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = false;
    if (svgRef.current?.hasPointerCapture(e.pointerId)) svgRef.current.releasePointerCapture(e.pointerId);
  };

  // Top view geometry
  const gp = M.GROUND_PAD_MM * S;
  const rp = M.RECEIVER_PAD_MM * S;
  const win = M.WINDOW_MM * S;
  const rx = TOP.cx + x * S;
  const ry = TOP.cy + y * S;
  const live = sim.transferring;
  const warn = sim.state === "outside" || sim.state === "foreign-object";

  // Side view geometry
  const gapU = gap * S;
  const groundTop = SIDE.ground - SIDE.pad;
  const recvBottom = groundTop - gapU;
  const sx = TOP.cx + x * S;

  // Efficiency curve across lateral offset at the current longitudinal offset
  const chart = { w: 320, h: 120, l: 34, r: 8, t: 10, b: 22 };
  const cw = chart.w - chart.l - chart.r;
  const ch = chart.h - chart.t - chart.b;
  const cxOf = (mm: number) => chart.l + ((mm + M.RANGE_MM) / (2 * M.RANGE_MM)) * cw;
  const cyOf = (eta: number) => chart.t + (1 - eta) * ch;
  const curve = Array.from({ length: 51 }, (_, i) => -M.RANGE_MM + (i * 2 * M.RANGE_MM) / 50)
    .map((mm, i) => `${i ? "L" : "M"}${cxOf(mm).toFixed(1)} ${cyOf(linkEfficiency(coupling(mm, y, gap), q)).toFixed(1)}`)
    .join(" ");

  const chain = [
    { label: "Grid supply", value: "not modelled" },
    { label: "Power factor stage", value: "not modelled" },
    { label: "High-frequency inverter", value: "not modelled" },
    { label: "Coils and air gap", value: pct(sim.efficiency, 1), modelled: true },
    { label: "Rectifier", value: "not modelled" },
    { label: "Battery", value: "not modelled" },
  ];

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c0f12] text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">Wireless charging lab</p>
        <StageLabel kind="simulation" tone="dark" />
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Drawings */}
        <div className="space-y-px bg-white/10">
          <figure className="bg-[#0c0f12] p-4 sm:p-5">
            <figcaption className="mb-2 flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-widest text-white/60">
              <span>Top view · alignment</span>
              <span className="normal-case tracking-normal text-white/50">drag the green pad</span>
            </figcaption>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${TOP.w} ${TOP.h}`}
              className="h-auto w-full select-none"
              role="img"
              aria-labelledby={`${uid}-top`}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <title id={`${uid}-top`}>{`Receiver pad ${x} mm sideways and ${y} mm along the bay from the ground pad centre. ${wptStateCopy[sim.state]}`}</title>
              <rect width={TOP.w} height={TOP.h} fill="#1a2028" />
              {/* bay markings */}
              <line x1="14" y1="0" x2="14" y2={TOP.h} stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
              <line x1={TOP.w - 14} y1="0" x2={TOP.w - 14} y2={TOP.h} stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
              {/* ground pad */}
              <rect x={TOP.cx - gp / 2} y={TOP.cy - gp / 2} width={gp} height={gp} rx="12" fill="#262f3a" stroke="rgba(255,255,255,0.4)" />
              {[0.42, 0.32, 0.22].map((f) => (
                <rect key={f} x={TOP.cx - gp * f} y={TOP.cy - gp * f} width={gp * f * 2} height={gp * f * 2} rx={gp * f * 0.3} fill="none" stroke="#c9a46a" strokeOpacity={live ? 0.55 + sim.power * 0.45 : 0.45} strokeWidth="1.6" />
              ))}
              {/* alignment window: where the receiver centre may sit */}
              <rect x={TOP.cx - win} y={TOP.cy - win} width={win * 2} height={win * 2} rx="6" fill="none" stroke={warn && sim.state === "outside" ? "#fde047" : "rgba(126,192,157,0.7)"} strokeDasharray="5 4" />
              <line x1={TOP.cx - 6} y1={TOP.cy} x2={TOP.cx + 6} y2={TOP.cy} stroke="rgba(255,255,255,0.5)" />
              <line x1={TOP.cx} y1={TOP.cy - 6} x2={TOP.cx} y2={TOP.cy + 6} stroke="rgba(255,255,255,0.5)" />
              {/* foreign object */}
              {fo ? (
                <g>
                  <circle cx={TOP.cx + 46} cy={TOP.cy - 30} r="9" fill="#b9a27a" stroke="#fde047" strokeWidth="2" />
                  <circle cx={TOP.cx + 46} cy={TOP.cy - 30} r="16" fill="none" stroke="#fb7185" strokeDasharray="3 3" />
                </g>
              ) : null}
              {/* energy ripples */}
              {live
                ? reduced
                  ? [20, 34].map((r) => <circle key={r} cx={(TOP.cx + rx) / 2} cy={(TOP.cy + ry) / 2} r={r} fill="none" stroke="#7EC09D" strokeOpacity={sim.power * 0.6} />)
                  : [0, 1, 2].map((i) => (
                      <circle key={i} cx={(TOP.cx + rx) / 2} cy={(TOP.cy + ry) / 2} r="30" fill="none" stroke="#7EC09D" strokeWidth={1 + sim.power * 1.5} className="wpt-ripple" style={{ ["--wpt-speed" as string]: `${(2.4 - sim.power * 1.2).toFixed(2)}s`, animationDelay: `${i * 0.6}s`, opacity: sim.power }} />
                    ))
                : null}
              {/* car and receiver */}
              <g
                onPointerDown={onDown}
                className="cursor-grab active:cursor-grabbing"
                style={{ touchAction: "none", transform: `translate(${x * S}px, ${y * S}px)`, transition: sweeping && !reduced ? "transform 550ms ease-in-out" : "none" }}
              >
                <rect x={TOP.cx - 300} y={TOP.cy - 230} width="600" height="460" rx="90" fill="rgba(147,197,253,0.06)" stroke="rgba(255,255,255,0.22)" />
                <rect x={TOP.cx - rp / 2} y={TOP.cy - rp / 2} width={rp} height={rp} rx="10" fill={live ? "rgba(126,192,157,0.14)" : "rgba(255,255,255,0.04)"} stroke={warn ? "#fde047" : "#7EC09D"} strokeWidth="2" strokeDasharray="7 4" />
                <circle cx={TOP.cx} cy={TOP.cy} r="4" fill={warn ? "#fde047" : "#7EC09D"} />
              </g>
              <text x={TOP.cx} y={TOP.h - 8} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="rgba(126,192,157,0.9)">
                {`alignment window ±${M.WINDOW_MM} mm`}
              </text>
            </svg>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/60">
              <li className="inline-flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-sm border border-dashed border-brand-300" /> Receiver pad under the car</li>
              <li className="inline-flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-sm border border-[#c9a46a]" /> Ground pad coil</li>
              <li className="inline-flex items-center gap-1.5"><span aria-hidden className="h-2.5 w-2.5 rounded-sm border border-dashed border-brand-300/70" /> Where the receiver centre may sit</li>
            </ul>
          </figure>

          <figure className="bg-[#0c0f12] p-4 sm:p-5">
            <figcaption className="mb-2 font-mono text-[10.5px] uppercase tracking-widest text-white/60">Side view · charging pads</figcaption>
            <svg viewBox={`0 0 ${SIDE.w} ${SIDE.h}`} className="h-auto w-full" role="img" aria-labelledby={`${uid}-side`}>
              <title id={`${uid}-side`}>{`Cross-section: ground pad in the floor, receiver pad under the car, ${gap} mm air gap, receiver ${x} mm to the side.`}</title>
              <rect width={SIDE.w} height={SIDE.h} fill="#1a2028" />
              {/* ground and slab */}
              <rect x="0" y={SIDE.ground} width={SIDE.w} height={SIDE.h - SIDE.ground} fill="#2a313b" />
              {/* car floor */}
              <rect x={sx - 175} y={recvBottom - SIDE.pad - 10} width="350" height="10" rx="3" fill="rgba(147,197,253,0.14)" stroke="rgba(255,255,255,0.2)" />
              {/* field lines */}
              {[-0.34, -0.17, 0.17, 0.34].map((f) => {
                const x0 = TOP.cx + f * gp;
                const x1 = sx + f * rp;
                const mid = (groundTop + recvBottom) / 2;
                return (
                  <path
                    key={f}
                    d={`M${x0} ${groundTop} C${x0} ${mid}, ${x1} ${mid}, ${x1} ${recvBottom}`}
                    fill="none"
                    stroke="#7EC09D"
                    strokeWidth="1.6"
                    strokeOpacity={live ? 0.25 + sim.power * 0.75 : 0.12}
                    className={live && !reduced ? styles.field : undefined}
                  />
                );
              })}
              {/* ground pad layers: shield, ferrite, coil */}
              <g>
                <rect x={TOP.cx - gp / 2} y={groundTop} width={gp} height={SIDE.pad} rx="3" fill="#3a4350" stroke="rgba(255,255,255,0.35)" />
                <rect x={TOP.cx - gp / 2 + 6} y={SIDE.ground - 4} width={gp - 12} height="2.5" fill="#aab4bf" />
                <rect x={TOP.cx - gp / 2 + 10} y={SIDE.ground - 8} width={gp - 20} height="3" fill="#15181d" />
                {Array.from({ length: 12 }, (_, i) => (
                  <circle key={i} cx={TOP.cx - gp * 0.4 + (i * gp * 0.8) / 11} cy={groundTop + 4} r="2.2" fill="#c9a46a" />
                ))}
              </g>
              {fo ? <ellipse cx={TOP.cx + 46} cy={groundTop - 2} rx="9" ry="2.5" fill="#b9a27a" stroke="#fde047" /> : null}
              {/* receiver pad layers: coil, ferrite, shield */}
              <g>
                <rect x={sx - rp / 2} y={recvBottom - SIDE.pad} width={rp} height={SIDE.pad} rx="3" fill="#3a4350" stroke={warn ? "#fde047" : "rgba(126,192,157,0.8)"} />
                <rect x={sx - rp / 2 + 6} y={recvBottom - SIDE.pad + 1.5} width={rp - 12} height="2.5" fill="#aab4bf" />
                <rect x={sx - rp / 2 + 10} y={recvBottom - SIDE.pad + 5} width={rp - 20} height="3" fill="#15181d" />
                {Array.from({ length: 10 }, (_, i) => (
                  <circle key={i} cx={sx - rp * 0.4 + (i * rp * 0.8) / 9} cy={recvBottom - 4} r="2.2" fill="#c9a46a" />
                ))}
              </g>
              {/* gap dimension */}
              <g fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(255,255,255,0.75)">
                <line x1="26" y1={recvBottom} x2="26" y2={groundTop} stroke="rgba(255,255,255,0.5)" />
                <line x1="20" y1={recvBottom} x2="32" y2={recvBottom} stroke="rgba(255,255,255,0.5)" />
                <line x1="20" y1={groundTop} x2="32" y2={groundTop} stroke="rgba(255,255,255,0.5)" />
                <text x="36" y={(recvBottom + groundTop) / 2 + 3}>{`gap ${gap} mm`}</text>
                <text x={SIDE.w - 10} y={SIDE.ground + 15} textAnchor="end" fill="rgba(255,255,255,0.55)">
                  coil · ferrite · shield
                </text>
              </g>
            </svg>
          </figure>
        </div>

        {/* Controls and outputs */}
        <div className="bg-[#0c0f12] p-4 sm:p-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
            <div className="bg-[#10151c] px-3.5 py-3">
              <dt className="text-[11px] text-white/60">Coupling k</dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-white">{sim.k.toFixed(3)}</dd>
            </div>
            <div className="bg-[#10151c] px-3.5 py-3">
              <dt className="text-[11px] text-white/60">Relative to centred</dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-white">{pct(sim.relative)}</dd>
            </div>
            <div className="bg-[#10151c] px-3.5 py-3">
              <dt className="text-[11px] text-white/60">Coil-to-coil efficiency, upper bound</dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-brand-300">{pct(sim.efficiency, 1)}</dd>
            </div>
            <div className="bg-[#10151c] px-3.5 py-3">
              <dt className="text-[11px] text-white/60">Simulated power</dt>
              <dd className={`mt-1 font-mono text-lg font-semibold ${live ? "text-white" : "text-amber-200"}`}>{live ? pct(sim.power) : "Stopped"}</dd>
            </div>
          </dl>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
            <div className="h-full rounded-full bg-brand-300" style={{ width: `${sim.power * 100}%`, transition: reduced ? "none" : "width 400ms ease-out" }} />
          </div>
          <p className={`mt-3 min-h-[2.75rem] text-[13px] leading-snug ${warn ? "text-amber-100" : "text-white/75"}`} aria-live="polite">
            {wptStateCopy[sim.state]}
          </p>

          <div className="mt-4 space-y-4">
            <Slider id={`${uid}-x`} label="Sideways offset" value={x} min={-M.RANGE_MM} max={M.RANGE_MM} step={10} unit="mm" onChange={(v) => { stopSweep(); setX(v); }} />
            <Slider id={`${uid}-y`} label="Along the bay" value={y} min={-M.RANGE_MM} max={M.RANGE_MM} step={10} unit="mm" onChange={(v) => { stopSweep(); setY(v); }} />
            <Slider id={`${uid}-g`} label="Air gap" value={gap} min={M.GAP_MIN_MM} max={M.GAP_MAX_MM} step={10} unit="mm" onChange={setGap} />
            <Slider id={`${uid}-q`} label="Coil quality factor Q" value={q} min={M.Q_MIN} max={M.Q_MAX} step={10} unit="" onChange={setQ} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={sweeping ? stopSweep : sweep} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/85 hover:border-white/45 hover:text-white">
              <span aria-hidden>{sweeping ? "■" : "▶"}</span>
              {sweeping ? "Stop" : "Sweep misalignment"}
            </button>
            <button
              type="button"
              aria-pressed={fo}
              onClick={() => { stopSweep(); setFo((v) => !v); }}
              className={`inline-flex min-h-10 items-center rounded-full border px-4 text-xs font-semibold ${fo ? "border-rose-300/60 bg-rose-400/10 text-rose-100" : "border-white/20 text-white/85 hover:border-white/45"}`}
            >
              {fo ? "Remove the coin" : "Drop a coin on the pad"}
            </button>
            <button
              type="button"
              onClick={() => { stopSweep(); setX(0); setY(0); setGap(M.GAP_DEFAULT_MM); setQ(M.Q_DEFAULT); setFo(false); }}
              className="inline-flex min-h-10 items-center rounded-full px-3 text-xs font-semibold text-white/65 hover:text-white"
            >
              Reset
            </button>
          </div>

          <figure className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <figcaption className="mb-1 text-[11px] text-white/60">Efficiency upper bound across sideways offset, at this gap and Q</figcaption>
            <svg viewBox={`0 0 ${chart.w} ${chart.h}`} className="h-auto w-full" role="img" aria-label={`Curve: efficiency upper bound ${pct(sim.efficiencyCentre, 1)} when centred, falling with sideways offset.`}>
              <rect x={cxOf(-M.WINDOW_MM)} y={chart.t} width={cxOf(M.WINDOW_MM) - cxOf(-M.WINDOW_MM)} height={ch} fill="rgba(126,192,157,0.08)" />
              {[0, 0.5, 1].map((v) => (
                <g key={v}>
                  <line x1={chart.l} x2={chart.w - chart.r} y1={cyOf(v)} y2={cyOf(v)} stroke="rgba(255,255,255,0.1)" />
                  <text x={chart.l - 5} y={cyOf(v) + 3} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.55)">{`${v * 100}%`}</text>
                </g>
              ))}
              {[-M.RANGE_MM, 0, M.RANGE_MM].map((mm) => (
                <text key={mm} x={cxOf(mm)} y={chart.h - 6} textAnchor={mm < 0 ? "start" : mm > 0 ? "end" : "middle"} fontSize="9" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.55)">{`${mm} mm`}</text>
              ))}
              <path d={curve} fill="none" stroke="#7EC09D" strokeWidth="2" />
              <circle cx={cxOf(x)} cy={cyOf(sim.efficiency)} r="4.5" fill={warn ? "#fde047" : "#ffffff"} stroke="#0c0f12" strokeWidth="1.5" />
            </svg>
          </figure>
        </div>
      </div>

      {/* Power chain */}
      <div className="border-t border-white/10 px-4 py-5 sm:px-6">
        <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/60">Power chain · grid to battery</p>
        <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {chain.map((c, i) => (
            <li key={c.label} className={`rounded-xl border px-3 py-2.5 ${c.modelled ? "border-brand-400/40 bg-brand-400/[0.08]" : "border-white/10 bg-white/[0.02]"}`}>
              <p className="font-mono text-[10px] text-white/50">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-0.5 text-[13px] font-semibold leading-tight text-white">{c.label}</p>
              <p className={`mt-1 font-mono text-[12px] ${c.modelled ? "text-brand-300" : "text-white/45"}`}>{c.value}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[12px] leading-relaxed text-white/60">
          Illustrative model, not Precifarm hardware or measured data. Coupling: k = {M.K_REF} × e<sup>−(g − {M.G_REF_MM} mm)/{M.GAP_DECAY_MM} mm</sup> × e<sup>−(x² + y²)/2σ²</sup>, σ = {M.SIGMA_MM} mm.
          Efficiency: the textbook upper bound for two resonant coils with equal Q, η = U² / (1 + √(1 + U²))² with U = kQ. Precifarm&apos;s measured system efficiency: not yet measured.
        </p>
      </div>
    </div>
  );
}
