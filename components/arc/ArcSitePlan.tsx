import type { ArcLayout } from "@/lib/pages/arc-corridor";

/**
 * Top-down bay layout for a proposed ARC station, drawn from the R03 render counts.
 * Fixed 600-unit canvas, so a small tier reads small next to a large one. Not to scale.
 */
const BAY_W = 50;
const ISLAND_W = 24;
const GROUP_W = BAY_W * 2 + ISLAND_W;
const VB_W = 600;
const VB_H = 330;
const YARD_Y = 18;
const YARD_H = 58;
const BAY_Y = 112;
const BAY_H = 104;
const AISLE_Y = BAY_Y + BAY_H;

export default function ArcSitePlan({ layout, name }: { layout: ArcLayout; name: string }) {
  const groups = layout.dispensers;
  const rowW = groups * GROUP_W;
  const x0 = (VB_W - rowW) / 2;
  const canopyPad = 18;
  const cabinets = Math.min(3, Math.max(2, Math.ceil(groups / 1.5)));
  const yardW = Math.max(12 + cabinets * 34 + 150, rowW * 0.7);
  const yardX = x0 + rowW - yardW;
  const uid = name.replace(/\W/g, "");

  let bayNo = 0;
  const bays: { x: number; n: number }[] = [];
  const islands: number[] = [];
  for (let g = 0; g < groups; g++) {
    const gx = x0 + g * GROUP_W;
    bays.push({ x: gx, n: ++bayNo });
    islands.push(gx + BAY_W);
    bays.push({ x: gx + BAY_W + ISLAND_W, n: ++bayNo });
  }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label={`${name} site plan, not to scale: ${groups} dispenser ${groups === 1 ? "island" : "islands"} with ${layout.bays} bays under one canopy, an equipment yard behind and a drive aisle in front.`}
      className="h-auto w-full"
    >
      <defs>
        <pattern id={`hatch-${uid}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#cfd4d9" strokeWidth="2" />
        </pattern>
        <marker id={`arrow-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#6b7280" />
        </marker>
      </defs>

      {/* forecourt */}
      <rect x="8" y="8" width={VB_W - 16} height={VB_H - 16} rx="14" fill="#f6f7f8" stroke="#e5e7eb" />

      {/* equipment yard */}
      <rect x={yardX} y={YARD_Y} width={yardW} height={YARD_H} rx="6" fill={`url(#hatch-${uid})`} stroke="#9ca3af" strokeDasharray="4 3" />
      {Array.from({ length: cabinets }).map((_, i) => (
        <rect key={i} x={yardX + 12 + i * 34} y={YARD_Y + 12} width="26" height={YARD_H - 24} rx="3" fill="#ffffff" stroke="#6b7280" />
      ))}
      <text x={yardX + 12 + cabinets * 34 + 4} y={YARD_Y + 26} fontSize="12" fontWeight="600" fill="#1f2937">
        Equipment yard
      </text>
      <text x={yardX + 12 + cabinets * 34 + 4} y={YARD_Y + 42} fontSize="11" fill="#4b5563">
        Switchgear, OEM cabinet
      </text>

      {/* canopy */}
      <rect
        x={x0 - canopyPad}
        y={BAY_Y - 16}
        width={rowW + canopyPad * 2}
        height={BAY_H + 10}
        rx="22"
        fill="none"
        stroke="#9ca3af"
        strokeDasharray="7 5"
      />

      {/* cable routes from the yard to each island */}
      {islands.map((ix) => (
        <path
          key={`duct-${ix}`}
          d={`M ${yardX + 25} ${YARD_Y + YARD_H} L ${yardX + 25} ${BAY_Y - 26} L ${ix + ISLAND_W / 2} ${BAY_Y - 26} L ${ix + ISLAND_W / 2} ${BAY_Y + 18}`}
          fill="none"
          stroke="#1f6f4a"
          strokeWidth="1.6"
          strokeDasharray="3 3"
          opacity="0.75"
        />
      ))}

      {/* bays */}
      {bays.map((b) => (
        <g key={b.n}>
          <rect x={b.x + 2} y={BAY_Y} width={BAY_W - 4} height={BAY_H - 4} fill="#e9ecef" />
          <line x1={b.x + 2} y1={BAY_Y} x2={b.x + 2} y2={BAY_Y + BAY_H - 4} stroke="#ffffff" strokeWidth="2.5" />
          <line x1={b.x + BAY_W - 2} y1={BAY_Y} x2={b.x + BAY_W - 2} y2={BAY_Y + BAY_H - 4} stroke="#ffffff" strokeWidth="2.5" />
          <text x={b.x + BAY_W / 2} y={BAY_Y + BAY_H - 18} textAnchor="middle" fontSize="14" fontWeight="600" fill="#374151" fontFamily="ui-monospace, monospace">
            {String(b.n).padStart(2, "0")}
          </text>
        </g>
      ))}

      {/* islands with dispensers */}
      {islands.map((ix) => (
        <g key={`island-${ix}`}>
          <rect x={ix + 2} y={BAY_Y + 4} width={ISLAND_W - 4} height={BAY_H - 16} rx="5" fill="#ffffff" stroke="#9ca3af" />
          <rect x={ix + 6} y={BAY_Y + 18} width={ISLAND_W - 12} height="16" rx="2" fill="#111827" />
          <rect x={ix + 6} y={BAY_Y + 18} width={ISLAND_W - 12} height="3" fill="#7ec09d" />
          {/* two cables, one to each side */}
          <path d={`M ${ix + 6} ${BAY_Y + 28} q -10 8 -16 22`} fill="none" stroke="#111827" strokeWidth="1.6" />
          <path d={`M ${ix + ISLAND_W - 6} ${BAY_Y + 28} q 10 8 16 22`} fill="none" stroke="#111827" strokeWidth="1.6" />
          {/* bollards */}
          <circle cx={ix + 7} cy={BAY_Y + BAY_H - 20} r="2.6" fill="#9ca3af" />
          <circle cx={ix + ISLAND_W - 7} cy={BAY_Y + BAY_H - 20} r="2.6" fill="#9ca3af" />
        </g>
      ))}

      {/* drive aisle */}
      <line x1="40" y1={AISLE_Y + 48} x2={VB_W - 60} y2={AISLE_Y + 48} stroke="#9ca3af" strokeWidth="1.5" markerEnd={`url(#arrow-${uid})`} strokeDasharray="10 6" />
      <text x="40" y={AISLE_Y + 36} fontSize="12" fill="#4b5563">
        Drive aisle
      </text>

      {/* pylon sign */}
      <rect x="14" y={BAY_Y + 10} width="12" height="40" rx="2" fill="#111827" />
      <rect x="16" y={BAY_Y + 16} width="8" height="3" fill="#7ec09d" />
      <text x="20" y={BAY_Y + 66} textAnchor="middle" fontSize="11" fill="#4b5563">
        Sign
      </text>
    </svg>
  );
}
