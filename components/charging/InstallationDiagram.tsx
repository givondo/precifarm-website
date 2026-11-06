"use client";

import { useId, useMemo, useState } from "react";
import { runEngineeringTool } from "@/lib/agent/tools/engineering";

const SIZES = [6, 10, 16] as const;
const GREEN = "#1f6f4a";
const INK = "#111827";
const MUTED = "#6b7280";
const LINE = "#9ca3af";

export type InstallLegendItem = { title: string; text: string };

type Props = {
  /** Charging current from the register (PUL-03) */
  currentA: number;
  legend: readonly InstallLegendItem[];
  cableNote: string;
};

function Marker({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden>
      <circle cx={x} cy={y} r={13} fill={INK} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
        {n}
      </text>
    </g>
  );
}

function Meter({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={96} height={124} rx={10} fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x={x + 14} y={y + 18} width={68} height={28} rx={4} fill="#f3f4f6" stroke={LINE} />
      <text x={x + 48} y={y + 37} textAnchor="middle" fontSize="13" fontFamily="monospace" fill={INK}>
        kWh
      </text>
      <circle cx={x + 48} cy={y + 82} r={16} fill="none" stroke={LINE} strokeWidth="2" />
      <line x1={x + 48} y1={y + 82} x2={x + 58} y2={y + 74} stroke={INK} strokeWidth="2" />
    </g>
  );
}

function ConsumerUnit({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={176} height={150} rx={10} fill="#fff" stroke={INK} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={x + 14 + i * 22} y={y + 22} width={16} height={46} rx={3} fill="#e5e7eb" stroke={LINE} />
      ))}
      <rect x={x + 104} y={y + 18} width={58} height={54} rx={6} fill="#eef7f2" stroke={GREEN} strokeWidth="2" />
      <text x={x + 133} y={y + 41} textAnchor="middle" fontSize="12" fontWeight="700" fill={GREEN}>
        MCB
      </text>
      <text x={x + 133} y={y + 59} textAnchor="middle" fontSize="11" fill={GREEN}>
        new way
      </text>
      <rect x={x + 14} y={y + 86} width={148} height={46} rx={6} fill="#eef7f2" stroke={GREEN} strokeWidth="2" />
      <text x={x + 88} y={y + 106} textAnchor="middle" fontSize="12" fontWeight="700" fill={GREEN}>
        RCD, Type A
      </text>
      <text x={x + 88} y={y + 123} textAnchor="middle" fontSize="11" fill={GREEN}>
        upstream of the charger
      </text>
    </g>
  );
}

function Wallbox({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={78} height={112} rx={14} fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x={x + 29} y={y + 16} width={20} height={52} rx={5} fill="#4b5563" />
      <line x1={x + 39} y1={y + 28} x2={x + 39} y2={y + 58} stroke="#7ec09d" strokeWidth="2.5" strokeLinecap="round" />
      <text x={x + 39} y={y + 92} textAnchor="middle" fontSize="10" fontWeight="700" fill={GREEN}>
        RDC-DD
      </text>
    </g>
  );
}

function Car({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path
        d={`M${x} ${y + 52} q0 -14 14 -16 l22 -4 l26 -24 q8 -7 20 -7 h54 q12 0 20 8 l22 23 l20 4 q14 3 14 16 v18 h-192z`}
        fill="#fff"
        stroke={INK}
        strokeWidth="2"
      />
      <circle cx={x + 42} cy={y + 72} r={15} fill="#fff" stroke={INK} strokeWidth="2" />
      <circle cx={x + 152} cy={y + 72} r={15} fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x={x + 168} y={y + 36} width={10} height={8} rx={2} fill={GREEN} />
    </g>
  );
}

function Earth({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={INK} strokeWidth="2">
      <line x1={x} y1={y} x2={x} y2={y + 26} />
      <line x1={x - 16} y1={y + 26} x2={x + 16} y2={y + 26} />
      <line x1={x - 10} y1={y + 33} x2={x + 10} y2={y + 33} />
      <line x1={x - 4} y1={y + 40} x2={x + 4} y2={y + 40} />
    </g>
  );
}

export default function InstallationDiagram({ currentA, legend, cableNote }: Props) {
  const [length, setLength] = useState(12);
  const sliderId = useId();

  const results = useMemo(
    () =>
      SIZES.map((csa) => {
        const r = runEngineeringTool("calculateVoltageDrop", { currentA, lengthM: length, system: "single-phase", csaMm2: csa });
        return { csa, dropV: Number(r.data.dropV), dropPct: Number(r.data.dropPct), pass: Boolean(r.data.pass), summary: r.summary };
      }),
    [currentA, length],
  );

  const routeLabel = `${length} m dedicated circuit`;

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-border">
      <div className="border-b border-border bg-[#f6f7f8] px-3 py-5 sm:px-6 sm:py-8">
        {/* Wide layout */}
        <svg viewBox="0 0 1000 400" role="img" aria-labelledby={`${sliderId}-h`} className="hidden h-auto w-full md:block">
          <title id={`${sliderId}-h`}>{`Pulse installation: Kenya Power meter, consumer unit with a new MCB and Type A RCD, ${routeLabel} to the Pulse wallbox, tethered Type 2 cable to the car, earth electrode at the consumer unit`}</title>
          <text x={52} y={78} fontSize="14" fontWeight="600" fill={INK}>Kenya Power meter</text>
          <Meter x={52} y={92} />
          <line x1={148} y1={154} x2={232} y2={154} stroke={INK} strokeWidth="3" />
          <text x={190} y={142} textAnchor="middle" fontSize="12" fill={MUTED}>supply</text>
          <text x={232} y={64} fontSize="14" fontWeight="600" fill={INK}>Consumer unit</text>
          <ConsumerUnit x={232} y={78} />
          <line x1={320} y1={228} x2={320} y2={300} stroke={INK} strokeWidth="2" />
          <Earth x={320} y={300} />
          <text x={344} y={330} fontSize="12" fill={MUTED}>Earthing checked at survey</text>
          <line x1={408} y1={190} x2={690} y2={190} stroke={GREEN} strokeWidth="4" strokeDasharray="12 8" />
          <text x={549} y={176} textAnchor="middle" fontSize="15" fontWeight="700" fill={GREEN}>{routeLabel}</text>
          <text x={549} y={214} textAnchor="middle" fontSize="12" fill={MUTED}>wall or underground route to the parking spot</text>
          <text x={690} y={116} fontSize="14" fontWeight="600" fill={INK}>Pulse charger</text>
          <Wallbox x={690} y={130} />
          <path d="M729 242 C 729 330, 780 340, 840 262" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <text x={720} y={358} fontSize="12" fill={MUTED}>Type 2 tethered cable</text>
          <Car x={762} y={214} />
          <text x={822} y={190} fontSize="14" fontWeight="600" fill={INK}>Your car</text>
          <Marker x={36} y={92} n={1} />
          <Marker x={232} y={78} n={2} />
          <Marker x={549} y={244} n={3} />
          <Marker x={690} y={130} n={4} />
          <Marker x={304} y={326} n={5} />
          <Marker x={976} y={250} n={6} />
        </svg>

        {/* Phone layout */}
        <svg viewBox="0 0 360 860" role="img" aria-labelledby={`${sliderId}-v`} className="mx-auto block h-auto w-full max-w-sm md:hidden">
          <title id={`${sliderId}-v`}>{`Pulse installation: Kenya Power meter, consumer unit with a new MCB and Type A RCD, ${routeLabel} to the Pulse wallbox, tethered Type 2 cable to the car`}</title>
          <text x={150} y={36} fontSize="15" fontWeight="600" fill={INK}>Kenya Power meter</text>
          <Meter x={40} y={20} />
          <Marker x={30} y={20} n={1} />
          <line x1={88} y1={144} x2={88} y2={196} stroke={INK} strokeWidth="3" />
          <text x={100} y={176} fontSize="13" fill={MUTED}>supply</text>
          <ConsumerUnit x={40} y={196} />
          <Marker x={30} y={196} n={2} />
          <text x={230} y={226} fontSize="15" fontWeight="600" fill={INK}>Consumer</text>
          <text x={230} y={244} fontSize="15" fontWeight="600" fill={INK}>unit</text>
          <line x1={216} y1={300} x2={290} y2={300} stroke={INK} strokeWidth="2" />
          <Earth x={290} y={300} />
          <Marker x={316} y={300} n={5} />
          <text x={228} y={366} fontSize="12" fill={MUTED}>Earthing checked</text>
          <text x={228} y={382} fontSize="12" fill={MUTED}>at survey</text>
          <line x1={128} y1={346} x2={128} y2={560} stroke={GREEN} strokeWidth="4" strokeDasharray="12 8" />
          <text x={146} y={448} fontSize="16" fontWeight="700" fill={GREEN}>{routeLabel}</text>
          <text x={146} y={470} fontSize="12" fill={MUTED}>wall or underground route</text>
          <Marker x={128} y={510} n={3} />
          <Wallbox x={89} y={560} />
          <Marker x={80} y={560} n={4} />
          <text x={186} y={610} fontSize="15" fontWeight="600" fill={INK}>Pulse charger</text>
          <path d="M128 672 C 128 730, 200 720, 232 760" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <text x={186} y={700} fontSize="12" fill={MUTED}>Type 2 tethered cable</text>
          <Car x={100} y={756} />
          <Marker x={316} y={790} n={6} />
          <text x={20} y={850} fontSize="15" fontWeight="600" fill={INK}>Your car</text>
        </svg>
      </div>

      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <ol className="grid gap-4 sm:grid-cols-2">
          {legend.map((item, i) => (
            <li key={item.title} className="flex gap-3">
              <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-950 font-mono text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-forest-900">{item.title}</span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-forest-600">{item.text}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="min-w-0 rounded-2xl bg-[#f6f7f8] p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor={sliderId} className="text-sm font-semibold text-forest-900">
              Consumer unit to parking spot
            </label>
            <output htmlFor={sliderId} className="font-mono text-sm font-semibold text-forest-900">
              {length} m
            </output>
          </div>
          <input
            id={sliderId}
            type="range"
            min={3}
            max={40}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-3 h-11 w-full cursor-pointer accent-[#1f6f4a]"
          />
          <table className="mt-2 w-full text-left text-sm">
            <caption className="sr-only">Voltage drop at {currentA} A for {length} m of copper cable</caption>
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-forest-500">
                <th scope="col" className="py-2 font-medium">Copper cable</th>
                <th scope="col" className="py-2 font-medium">Drop</th>
                <th scope="col" className="py-2 text-right font-medium">Against 5%</th>
              </tr>
            </thead>
            <tbody aria-live="polite">
              {results.map((r) => (
                <tr key={r.csa} className="border-t border-border">
                  <th scope="row" className="py-2.5 font-medium text-forest-900">{r.csa} mm²</th>
                  <td className="py-2.5 font-mono text-forest-800">
                    {r.dropV.toFixed(1)} V ({r.dropPct.toFixed(1)}%)
                  </td>
                  <td className={`py-2.5 text-right text-xs font-semibold ${r.pass ? "text-status-available" : "text-danger"}`}>{r.pass ? "Within" : "Over"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs leading-relaxed text-forest-600">
            {cableNote}
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-forest-500">Planning check, calculated · needs site check</p>
        </div>
      </div>
    </div>
  );
}
