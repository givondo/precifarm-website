import type { ArchEdge, ArchNode } from "@/lib/engineering-page";
import { pathOf, routeOrthogonal, type Pt } from "@/lib/diagram-route";

/** Light-theme system architecture: landscape from sm up, portrait on phones. Hand-built SVG, no library. */

const BOX = { land: { w: 140, h: 58 }, port: { w: 150, h: 60 } } as const;
const PAD = 24;
const LAND_SX = 1.08;

const fills: Record<ArchNode["kind"], { fill: string; stroke: string; bar: string }> = {
  grid: { fill: "#ffffff", stroke: "#c4cad1", bar: "#6b7280" },
  board: { fill: "#ffffff", stroke: "#c4cad1", bar: "#1f2937" },
  pv: { fill: "#fffaf0", stroke: "#e4cfa3", bar: "#c9a46a" },
  battery: { fill: "#f3faf6", stroke: "#aedac2", bar: "#1F6F4A" },
  charger: { fill: "#111827", stroke: "#111827", bar: "#7EC09D" },
  cabinet: { fill: "#111827", stroke: "#111827", bar: "#7EC09D" },
  vehicle: { fill: "#eef7f2", stroke: "#aedac2", bar: "#1F6F4A" },
  control: { fill: "#f2f6fd", stroke: "#bcd0f0", bar: "#3b6fb6" },
  load: { fill: "#f6f7f8", stroke: "#d1d5db", bar: "#9aa4b2" },
};

const strokeFor = { ac: "#1f2937", dc: "#c9a46a", data: "#3b6fb6" } as const;

function Drawing({ nodes, edges, layout, title, className }: { nodes: readonly ArchNode[]; edges: readonly ArchEdge[]; layout: "land" | "port"; title: string; className: string }) {
  const { w, h } = BOX[layout];
  const at = (n: ArchNode): Pt => (layout === "land" ? [n.land[0] * LAND_SX, n.land[1]] : n.port);
  const pos = Object.fromEntries(nodes.map((n) => [n.id, at(n)])) as Record<string, Pt>;
  const xs = nodes.map((n) => at(n)[0]);
  const ys = nodes.map((n) => at(n)[1]);
  const minX = Math.min(...xs) - w / 2 - PAD;
  const minY = Math.min(...ys) - h / 2 - PAD;
  const vw = Math.max(...xs) + w / 2 + PAD - minX;
  const vh = Math.max(...ys) + h / 2 + PAD - minY;
  const desc = [
    ...nodes.map((n) => `${n.title}${n.sub ? ` (${n.sub})` : ""}${n.optional ? ", optional" : ""}.`),
    ...edges.map((e) => `${nodes.find((n) => n.id === e.from)?.title} to ${nodes.find((n) => n.id === e.to)?.title}: ${e.kind === "data" ? "data" : `${e.kind.toUpperCase()} power`}.`),
  ].join(" ");

  return (
    <svg viewBox={`${minX} ${minY} ${vw} ${vh}`} className={`h-auto w-full ${className}`} role="img" aria-label={`${title}. ${desc}`}>
      {edges.map((e) => (
        <path
          key={`${e.from}-${e.to}`}
          d={pathOf(routeOrthogonal(pos[e.from], pos[e.to], w, h))}
          fill="none"
          stroke={strokeFor[e.kind]}
          strokeWidth={e.kind === "data" ? 1.4 : 2}
          strokeDasharray={e.kind === "data" ? "2 4" : undefined}
          strokeLinecap="round"
        />
      ))}
      {nodes.map((n) => {
        const [cx, cy] = at(n);
        const f = fills[n.kind];
        const dark = n.kind === "charger" || n.kind === "cabinet";
        return (
          <g key={n.id}>
            <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="10" fill={f.fill} stroke={f.stroke} strokeDasharray={n.optional ? "5 4" : undefined} />
            <rect x={cx - w / 2} y={cy - h / 2 + 12} width="3" height={h - 24} rx="1.5" fill={f.bar} />
            <text x={cx - w / 2 + 13} y={cy + (n.sub ? -3 : 4)} fontSize="12" fontWeight="600" fill={dark ? "#ffffff" : "#111827"}>
              {n.title}
            </text>
            {n.sub ? (
              <text x={cx - w / 2 + 13} y={cy + 13} fontSize="10" fill={dark ? "rgba(255,255,255,0.7)" : "#4b5563"}>
                {n.sub}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export default function ArchitectureDiagram({ nodes, edges, title }: { nodes: readonly ArchNode[]; edges: readonly ArchEdge[]; title: string }) {
  return (
    <>
      <Drawing nodes={nodes} edges={edges} layout="land" title={title} className="hidden sm:block" />
      <Drawing nodes={nodes} edges={edges} layout="port" title={title} className="sm:hidden" />
    </>
  );
}
