import type { DoorState } from "@/lib/boda-hub-page";

/**
 * Front elevation of the Automated Boda Hub cabinet, drawn after the Rev D renders:
 * twenty numbered doors in five rows of four (01 to 04 at the bottom, 17 to 20 at the top),
 * a side totem with the rider screen, a canopy and the swap pad. Not to scale.
 */

const COL_W = 60;
const ROW_H = 56;
const GRID_X = 52;
const GRID_Y = 70;

const statusColour: Record<"charged" | "charging" | "empty", string> = {
  charged: "#4a9e73",
  charging: "#e0a03a",
  empty: "#9ca3af",
};

export function doorNumber(row: number, col: number) {
  return (4 - row) * 4 + col + 1;
}

function Door({ n, x, y, state, highlight }: { n: number; x: number; y: number; state: DoorState; highlight: boolean }) {
  const w = COL_W - 4;
  const h = ROW_H - 4;
  const open = state.startsWith("open");
  const label = String(n).padStart(2, "0");
  const bar = open ? null : statusColour[state as "charged" | "charging" | "empty"];
  const pack = state === "open-charged" ? "#4a9e73" : state === "open-depleted" ? "#c2410c" : null;
  return (
    <g>
      {open ? (
        <>
          <rect x={x} y={y} width={w} height={h} rx="2" fill="#1f2937" />
          <rect x={x + 6} y={y + h - 12} width={w - 12} height="5" rx="1" fill="#d1d5db" />
          {pack ? <rect x={x + 16} y={y + 14} width={w - 32} height={h - 26} rx="3" fill="#111827" stroke={pack} strokeWidth="2" /> : null}
          {pack ? <rect x={x + 18} y={y + h - 22} width={w - 36} height="5" rx="1" fill={pack} /> : null}
          <polygon points={`${x},${y} ${x - 7},${y + 5} ${x - 7},${y + h - 5} ${x},${y + h}`} fill="#e5e7eb" stroke="#9ca3af" strokeWidth="0.8" />
        </>
      ) : (
        <>
          <rect x={x} y={y} width={w} height={h} rx="2" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.8" />
          <rect x={x + w - 28} y={y + 8} width="22" height="3" rx="1.5" fill={bar ?? "#9ca3af"} className="motion-safe:transition-[fill] motion-safe:duration-500" />
        </>
      )}
      <text x={x + 5} y={y + 13} fontSize="10" fontWeight="600" fill={open ? "#e5e7eb" : "#374151"} fontFamily="ui-monospace, monospace">
        {label}
      </text>
      {highlight ? <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="4" fill="none" stroke="#7ec09d" strokeWidth="3" /> : null}
    </g>
  );
}

export default function BodaCabinetSvg({
  doors,
  highlight = [],
  screen = "idle",
  annotate = false,
  title,
}: {
  doors: Record<number, DoorState>;
  highlight?: readonly number[];
  screen?: "idle" | "active" | "done";
  annotate?: boolean;
  title: string;
}) {
  const screenColour = screen === "done" ? "#4a9e73" : screen === "active" ? "#7ec09d" : "#374151";
  return (
    <svg viewBox="0 0 420 440" role="img" aria-label={title} className="h-auto w-full">
      {/* pad and swap zone */}
      <rect x="8" y="372" width="404" height="56" rx="6" fill="#e5e7eb" />
      <rect x="70" y="386" width="200" height="30" fill="none" stroke="#ffffff" strokeWidth="3" />
      <rect x="128" y="394" width="84" height="14" rx="2" fill="#1f2937" />
      <text x="170" y="404.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" letterSpacing="1">
        SWAP ZONE
      </text>

      {/* bollards */}
      {[16, 392].map((bx) => (
        <g key={bx}>
          <rect x={bx} y="286" width="12" height="104" rx="6" fill="#e0b23a" />
          <rect x={bx} y="286" width="12" height="8" rx="4" fill="#c99a22" />
        </g>
      ))}

      {/* cabinet body */}
      <rect x="40" y="34" width="262" height="340" rx="4" fill="#111827" />
      <line x1="42" y1="66" x2="42" y2="350" stroke="#4a9e73" strokeWidth="1.5" opacity="0.8" />
      <line x1="300" y1="66" x2="300" y2="350" stroke="#4a9e73" strokeWidth="1.5" opacity="0.8" />
      <text x="171" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff" letterSpacing="2">
        PRECIFARM
        <tspan fill="#7ec09d" dx="6" fontSize="7.5">
          BODA HUB
        </tspan>
      </text>

      {/* doors */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 4 }).map((__, c) => {
          const n = doorNumber(r, c);
          return (
            <Door
              key={n}
              n={n}
              x={GRID_X + c * COL_W + (c >= 2 ? 4 : 0)}
              y={GRID_Y + r * ROW_H}
              state={doors[n] ?? "charged"}
              highlight={highlight.includes(n)}
            />
          );
        }),
      )}

      {/* plinth */}
      <rect x="48" y="352" width="246" height="18" fill="#0b0f17" />
      {[70, 90, 110, 130].map((vx) => (
        <line key={vx} x1={vx} y1="356" x2={vx} y2="366" stroke="#374151" strokeWidth="2" />
      ))}

      {/* totem */}
      <rect x="306" y="40" width="58" height="334" rx="4" fill="#111827" />
      <rect x="313" y="78" width="44" height="56" rx="3" fill="#0b1220" stroke={screenColour} strokeWidth="1.5" className="motion-safe:transition-[stroke] motion-safe:duration-300" />
      <rect x="318" y="86" width="26" height="3" rx="1" fill="#e5e7eb" opacity="0.85" />
      <rect x="318" y="94" width="34" height="2.5" rx="1" fill="#9ca3af" opacity="0.7" />
      <rect x="318" y="100" width="30" height="2.5" rx="1" fill="#9ca3af" opacity="0.7" />
      <rect x="318" y="118" width="34" height="8" rx="1.5" fill={screenColour} className="motion-safe:transition-[fill] motion-safe:duration-300" />
      <circle cx="335" cy="162" r="10" fill="none" stroke={screenColour} strokeWidth="2.5" className="motion-safe:transition-[stroke] motion-safe:duration-300" />
      <rect x="323" y="190" width="24" height="24" fill="#ffffff" />
      <path d="M326 193h7v7h-7z M337 193h7v7h-7z M326 204h7v7h-7z M337 206h3v3h-3z M341 204h3v7h-3z" fill="#111827" />

      {/* canopy */}
      <path d="M20 16 Q20 10 26 10 H392 Q404 10 404 20 L398 34 H22 Z" fill="#1f2937" />
      <line x1="40" y1="30" x2="388" y2="30" stroke="#fef3c7" strokeWidth="2" opacity="0.9" />
      <line x1="24" y1="12" x2="398" y2="12" stroke="#4a9e73" strokeWidth="1.5" opacity="0.8" />

      {annotate ? (
        <g>
          <rect x="48" y="66" width="250" height="60" rx="4" fill="none" stroke="#e0a03a" strokeWidth="2" strokeDasharray="5 4" />
          <rect x="48" y="122" width="250" height="228" rx="4" fill="none" stroke="#4a9e73" strokeWidth="2" strokeDasharray="5 4" />
          {[
            { cx: 30, cy: 96, t: "A" },
            { cx: 30, cy: 236, t: "B" },
            { cx: 386, cy: 106, t: "C" },
            { cx: 300, cy: 404, t: "D" },
          ].map((m) => (
            <g key={m.t}>
              <circle cx={m.cx} cy={m.cy} r="11" fill="#111827" stroke="#ffffff" strokeWidth="2" />
              <text x={m.cx} y={m.cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
                {m.t}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}
