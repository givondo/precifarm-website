import type { ReactNode } from "react";
import { arcControlLayer, arcElectricalChain, arcStorageNote } from "@/lib/pages/arc-corridor";

/**
 * Single-line architecture for an ARC Corridor site: grid to vehicle, with metering,
 * optional storage and the session and payment layer. Hand-built SVG for a graphite band.
 * Wide screens get one horizontal drawing; phones get a vertical power chain with the
 * control layer and storage set out below it.
 */

const C = {
  power: "#7ec09d",
  node: "rgba(255,255,255,0.04)",
  stroke: "rgba(255,255,255,0.2)",
  text: "#ffffff",
  sub: "rgba(255,255,255,0.66)",
  data: "rgba(255,255,255,0.5)",
};

type IconKind = "grid" | "switchgear" | "cabinet" | "dispensers" | "vehicles";

function Icon({ kind, x, y, s = 1 }: { kind: IconKind; x: number; y: number; s?: number }) {
  const common = { fill: "none", stroke: C.power, strokeWidth: 1.6 / s, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const g = (children: ReactNode) => <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
  switch (kind) {
    case "grid":
      return g(
        <g {...common}>
          <path d="M10 30 L15 2 L20 30 M12 18 L18 18 M11 24 L19 24 M6 8 L24 8 M8 13 L22 13" />
        </g>,
      );
    case "switchgear":
      return g(
        <g {...common}>
          <circle cx="11" cy="15" r="8" />
          <circle cx="19" cy="15" r="8" />
        </g>,
      );
    case "cabinet":
      return g(
        <g {...common}>
          <rect x="4" y="2" width="22" height="28" rx="2" />
          <path d="M11 6 V26 M15 6 V26 M19 6 V26" />
        </g>,
      );
    case "dispensers":
      return g(
        <g {...common}>
          <rect x="9" y="2" width="12" height="28" rx="2" />
          <rect x="11.5" y="7" width="7" height="6" rx="1" />
          <path d="M9 16 C3 18 3 26 7 30 M21 16 C27 18 27 26 23 30" />
        </g>,
      );
    case "vehicles":
      return g(
        <g {...common}>
          <path d="M2 22 L4 15 L9 10 L21 10 L26 15 L28 22 Z" />
          <circle cx="8.5" cy="23" r="3" />
          <circle cx="21.5" cy="23" r="3" />
        </g>,
      );
  }
}

const lines: Record<IconKind, { title: string[]; sub: string[]; pill?: string }> = {
  grid: { title: ["Grid connection"], sub: ["Kenya Power supply,", "sized per site"] },
  switchgear: { title: ["Transformer and", "switchgear"], sub: ["Protection and", "isolation"] },
  cabinet: { title: ["Certified OEM", "power cabinet"], sub: ["120 to 180 kW", "at the first site"], pill: "CERTIFIED OEM" },
  dispensers: { title: ["ARC dispensers"], sub: ["Two CCS2 cables", "per dispenser"], pill: "PROPOSED DESIGN" },
  vehicles: { title: ["Vehicles"], sub: ["Draw what the", "battery accepts"] },
};

const order: IconKind[] = ["grid", "switchgear", "cabinet", "dispensers", "vehicles"];

function Wide() {
  const W = 150;
  const GAP = 60;
  const X0 = 20;
  const Y = 130;
  const H = 170;
  const LINE_Y = Y + 85;
  const xs = order.map((_, i) => X0 + i * (W + GAP));
  const segLabels = ["AC", "AC", "DC", "DC"];

  return (
    <svg viewBox="0 0 1040 420" className="hidden h-auto w-full lg:block" role="img" aria-labelledby="arc-elec-title">
      <title id="arc-elec-title">
        ARC Corridor electrical architecture: Kenya Power grid connection and utility meter, transformer and switchgear, certified OEM power cabinet, ARC
        dispensers and vehicles, with optional storage on the AC side and a charge-point management and M-Pesa layer linked to the cabinet and dispensers.
      </title>

      {/* control layer */}
      <rect x={xs[2]} y="16" width={xs[4] + W - xs[2]} height="62" rx="12" fill="rgba(126,192,157,0.08)" stroke={C.power} strokeOpacity="0.45" />
      <text x={xs[2] + 18} y="42" fill={C.text} fontSize="14" fontWeight="600">
        {arcControlLayer.title}
      </text>
      <text x={xs[2] + 18} y="62" fill={C.sub} fontSize="12">
        Sessions, price per kWh shown first, M-Pesa payment, fault and uptime reports
      </text>
      {[2, 3].map((i) => (
        <line key={i} x1={xs[i] + W / 2} y1="78" x2={xs[i] + W / 2} y2={Y} stroke={C.data} strokeDasharray="4 4" strokeWidth="1.4" />
      ))}
      <line x1={xs[4] + W / 2} y1="78" x2={xs[4] + W / 2} y2={Y} stroke={C.data} strokeDasharray="4 4" strokeWidth="1.4" />
      <text x={xs[4] + W / 2 + 8} y={Y - 14} fill={C.sub} fontSize="11">
        Driver&apos;s phone
      </text>

      {/* power segments */}
      {segLabels.map((lab, i) => {
        const x1 = xs[i] + W;
        const x2 = xs[i + 1];
        return (
          <g key={i}>
            <line x1={x1} y1={LINE_Y} x2={x2} y2={LINE_Y} stroke={C.power} strokeWidth="3" />
            <text x={(x1 + x2) / 2} y={LINE_Y - 12} textAnchor="middle" fill={C.power} fontSize="12" fontWeight="600" fontFamily="ui-monospace, monospace">
              {lab}
            </text>
          </g>
        );
      })}

      {/* utility meter on the first segment */}
      <circle cx={(xs[0] + W + xs[1]) / 2} cy={LINE_Y + 26} r="13" fill="#111827" stroke={C.power} strokeWidth="1.4" />
      <text x={(xs[0] + W + xs[1]) / 2} y={LINE_Y + 30} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="600">
        kWh
      </text>
      <line x1={(xs[0] + W + xs[1]) / 2} y1={LINE_Y} x2={(xs[0] + W + xs[1]) / 2} y2={LINE_Y + 13} stroke={C.power} strokeWidth="1.4" />
      <text x={(xs[0] + W + xs[1]) / 2} y={LINE_Y + 56} textAnchor="middle" fill={C.sub} fontSize="11">
        Utility meter
      </text>

      {/* optional storage */}
      {(() => {
        const cx = (xs[1] + W + xs[2]) / 2;
        return (
          <g>
            <line x1={cx} y1={LINE_Y} x2={cx} y2="336" stroke={C.data} strokeDasharray="4 4" strokeWidth="1.4" />
            <rect x={cx - 95} y="336" width="190" height="60" rx="10" fill="none" stroke={C.stroke} strokeDasharray="6 4" />
            <text x={cx} y="361" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600">
              Battery storage, optional
            </text>
            <text x={cx} y="381" textAnchor="middle" fill={C.sub} fontSize="11">
              None at the first site
            </text>
          </g>
        );
      })()}

      {/* nodes */}
      {order.map((k, i) => {
        const x = xs[i];
        const l = lines[k];
        return (
          <g key={k}>
            <rect x={x} y={Y} width={W} height={H} rx="14" fill={C.node} stroke={C.stroke} />
            <Icon kind={k} x={x + 16} y={Y + 14} />
            {l.title.map((t, ti) => (
              <text key={t} x={x + 16} y={Y + 70 + ti * 17} fill={C.text} fontSize="14" fontWeight="600">
                {t}
              </text>
            ))}
            {l.sub.map((t, si) => (
              <text key={t} x={x + 16} y={Y + 112 + si * 16} fill={C.sub} fontSize="12">
                {t}
              </text>
            ))}
            {l.pill ? (
              <g>
                <rect x={x + 16} y={Y + H - 26} width={l.pill.length * 6.4 + 16} height="18" rx="9" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" />
                <text x={x + 24} y={Y + H - 13} fill={C.text} fontSize="9.5" fontWeight="600" letterSpacing="0.6">
                  {l.pill}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function Tall() {
  const X = 16;
  const W = 328;
  const H = 96;
  const GAP = 44;
  const ys = order.map((_, i) => 8 + i * (H + GAP));
  const segLabels = ["AC, utility meter at the supply", "AC, optional storage joins here", "DC", "DC"];
  const total = ys[4] + H + 8;

  return (
    <svg viewBox={`0 0 360 ${total}`} className="mx-auto h-auto w-full max-w-md lg:hidden" role="img" aria-labelledby="arc-elec-title-m">
      <title id="arc-elec-title-m">
        ARC Corridor power chain: grid connection, transformer and switchgear, certified OEM power cabinet, ARC dispensers, vehicles.
      </title>
      {segLabels.map((lab, i) => {
        const y1 = ys[i] + H;
        const y2 = ys[i + 1];
        return (
          <g key={i}>
            <line x1={X + 32} y1={y1} x2={X + 32} y2={y2} stroke={C.power} strokeWidth="3" />
            <text x={X + 50} y={(y1 + y2) / 2 + 4} fill={C.power} fontSize="12" fontWeight="600">
              {lab}
            </text>
          </g>
        );
      })}
      {order.map((k, i) => {
        const y = ys[i];
        const l = lines[k];
        return (
          <g key={k}>
            <rect x={X} y={y} width={W} height={H} rx="14" fill={C.node} stroke={C.stroke} />
            <Icon kind={k} x={X + 16} y={y + 16} s={1.05} />
            <text x={X + 64} y={y + 30} fill={C.text} fontSize="15" fontWeight="600">
              {l.title.join(" ")}
            </text>
            <text x={X + 64} y={y + 52} fill={C.sub} fontSize="13">
              {l.sub.join(" ")}
            </text>
            {l.pill ? (
              <g>
                <rect x={X + 64} y={y + 64} width={l.pill.length * 6.6 + 16} height="20" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" />
                <text x={X + 72} y={y + 78} fill={C.text} fontSize="10" fontWeight="600" letterSpacing="0.6">
                  {l.pill}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export default function ArcElectricalDiagram() {
  return (
    <div>
      <div className="rounded-[1.5rem] bg-white/[0.02] p-3 ring-1 ring-white/10 sm:p-6">
        <Wide />
        <Tall />
        <div className="mx-auto mt-4 grid max-w-md gap-3 lg:hidden">
          <div className="rounded-xl border border-dashed border-brand-300/50 bg-brand-300/[0.06] p-4">
            <p className="text-sm font-semibold text-white">{arcControlLayer.title}</p>
            <p className="mt-1 text-xs text-white/60">Linked to the power cabinet, every dispenser and the driver&apos;s phone.</p>
          </div>
          <div className="rounded-xl border border-dashed border-white/25 p-4">
            <p className="text-sm font-semibold text-white">Battery storage, optional</p>
            <p className="mt-1 text-xs text-white/60">None at the first site.</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 px-1 text-xs text-white/60">
          <li className="flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 border-t-[3px] border-brand-300" />
            Power
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 border-t-2 border-dashed border-white/50" />
            Data, or optional equipment
          </li>
        </ul>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/55">Who is responsible</p>
          <ul className="mt-2 divide-y divide-white/10 border-y border-white/10">
            {arcElectricalChain.map((n) => (
              <li key={n.id} className="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,1fr)] sm:gap-4">
                <p className="font-semibold text-white">{n.title}</p>
                <p className="text-white/70">{n.detail}</p>
                <p className="text-white/55 sm:text-white/70">{n.owner}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-white/70">
          <div>
            <p className="font-semibold text-white">{arcControlLayer.title}</p>
            <ul className="mt-2 space-y-1.5">
              {arcControlLayer.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-300" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p>{arcStorageNote}</p>
        </div>
      </div>
    </div>
  );
}
