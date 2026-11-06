"use client";

import { useId, useRef } from "react";
import type { DiagramEdge, DiagramNode, DiagramNodeKind } from "@/lib/agent-workspace";
import styles from "@/components/agent/workspace.module.css";
import { routeOrthogonal, type Pt } from "@/lib/diagram-route";

/**
 * Hand-built single line diagram for the Agent workspace. Nodes carry values from the engineering kernel.
 * Landscape layout from sm up, a portrait layout on phones, and an expand dialog that shows the landscape
 * drawing at full size (scrolls sideways on a phone).
 */

type Layout = "land" | "port";

const BOX = { land: { w: 150, h: 70 }, port: { w: 160, h: 74 } } as const;
const PAD = 28;
/** Landscape x positions are authored compactly and spread out here so edge labels fit between boxes. */
const LAND_SX = 1.42;

const accent: Record<DiagramNodeKind, string> = {
  grid: "#9aa4b2",
  board: "#c9d1d9",
  protection: "#c9d1d9",
  charger: "#7EC09D",
  vehicle: "#7EC09D",
  load: "#9aa4b2",
  pv: "#e2b878",
  battery: "#7EC09D",
  inverter: "#c9d1d9",
  control: "#93c5fd",
};

const edgeStroke = { ac: "#c9d1d9", dc: "#e2b878", data: "#93c5fd" } as const;

const route = (a: Pt, b: Pt, layout: Layout) => routeOrthogonal(a, b, BOX[layout].w, BOX[layout].h);

function labelPoint(pts: Pt[]): { x: number; y: number; vertical: boolean } {
  const i = Math.floor((pts.length - 1) / 2);
  const [x1, y1] = pts[i];
  const [x2, y2] = pts[i + 1];
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2, vertical: Math.abs(x1 - x2) < 1 };
}

function Drawing({
  nodes,
  edges,
  layout,
  live,
  title,
  className = "",
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  layout: Layout;
  live: boolean;
  title: string;
  className?: string;
}) {
  const id = useId();
  const { w, h } = BOX[layout];
  const at = (n: DiagramNode): Pt => (layout === "land" ? [n.land[0] * LAND_SX, n.land[1]] : n.port);
  const pos = Object.fromEntries(nodes.map((n) => [n.id, at(n)])) as Record<string, Pt>;
  const xs = nodes.map((n) => at(n)[0]);
  const ys = nodes.map((n) => at(n)[1]);
  const minX = Math.min(...xs) - w / 2 - PAD;
  const minY = Math.min(...ys) - h / 2 - PAD;
  const vw = Math.max(...xs) + w / 2 + PAD - minX;
  const vh = Math.max(...ys) + h / 2 + PAD - minY;
  const desc = [
    ...nodes.map((n) => `${n.title}: ${n.lines.join(", ")}${n.check ? " (needs a check)" : ""}.`),
    ...edges.map((e) => {
      const a = nodes.find((n) => n.id === e.from)?.title;
      const b = nodes.find((n) => n.id === e.to)?.title;
      return `${a} to ${b}, ${e.kind === "data" ? "data link" : `${e.kind.toUpperCase()} power`}${e.label ? `, ${e.label}` : ""}.`;
    }),
  ].join(" ");

  return (
    <svg viewBox={`${minX} ${minY} ${vw} ${vh}`} className={`h-auto w-full ${className}`} role="img" aria-labelledby={`${id}-t ${id}-d`}>
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <defs>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.045)" />
        </pattern>
      </defs>
      <rect x={minX} y={minY} width={vw} height={vh} fill={`url(#${id}-grid)`} />

      {edges.map((e) => {
        const pts = route(pos[e.from], pos[e.to], layout);
        const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
        const lp = labelPoint(pts);
        const power = e.kind !== "data";
        return (
          <g key={`${e.from}-${e.to}`}>
            <path d={d} fill="none" stroke={edgeStroke[e.kind]} strokeOpacity={live ? 0.9 : 0.35} strokeWidth={power ? 2.2 : 1.6} strokeDasharray={power ? undefined : "2 5"} strokeLinecap="round" />
            {live && power ? <path d={d} fill="none" stroke="#7EC09D" strokeWidth="2.2" className={styles.flow} /> : null}
            {e.label ? (
              <g transform={`translate(${lp.x} ${lp.y})`}>
                <rect x={lp.vertical ? 6 : -e.label.length * 3.1 - 6} y={lp.vertical ? -9 : -20} width={e.label.length * 6.2 + 12} height="18" rx="4" fill="#0c0f12" stroke="rgba(255,255,255,0.12)" />
                <text x={lp.vertical ? 12 + e.label.length * 3.1 : 0} y={lp.vertical ? 4 : -7} textAnchor="middle" fontSize="10.5" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.78)">
                  {e.label}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}

      {nodes.map((n) => {
        const [cx, cy] = at(n);
        const x = cx - w / 2;
        const y = cy - h / 2;
        return (
          <g key={n.id}>
            <rect x={x} y={y} width={w} height={h} rx="10" fill="#151b24" stroke={n.check ? "rgba(253,224,71,0.65)" : "rgba(255,255,255,0.16)"} />
            <rect x={x} y={y + 12} width="3" height={h - 24} rx="1.5" fill={accent[n.kind]} />
            <text x={x + 14} y={y + 22} fontSize="12.5" fontWeight="600" fill="#ffffff" fontFamily="var(--font-sans), system-ui, sans-serif">
              {n.title}
            </text>
            {n.lines.slice(0, 2).map((line, i) => (
              <text key={line} x={x + 14} y={y + 41 + i * 15} fontSize="10.5" fill="rgba(255,255,255,0.72)" fontFamily="ui-monospace, monospace">
                {line}
              </text>
            ))}
            {n.check ? <circle cx={x + w - 12} cy={y + 12} r="4" fill="#fde047" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

export default function SystemDiagram({ nodes, edges, live, title, caption }: { nodes: DiagramNode[]; edges: DiagramEdge[]; live: boolean; title: string; caption: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1319]">
        <Drawing nodes={nodes} edges={edges} layout="land" live={live} title={title} className="hidden sm:block" />
        <Drawing nodes={nodes} edges={edges} layout="port" live={live} title={title} className="sm:hidden" />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/60" aria-label="Line key">
          <li className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-0.5 w-5 rounded bg-[#c9d1d9]" /> AC power
          </li>
          {edges.some((e) => e.kind === "dc") ? (
            <li className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-0.5 w-5 rounded bg-[#e2b878]" /> DC power
            </li>
          ) : null}
          {edges.some((e) => e.kind === "data") ? (
            <li className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-0.5 w-5 border-t-2 border-dotted border-[#93c5fd]" /> Data
            </li>
          ) : null}
          <li className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[#fde047]" /> Needs a check
          </li>
        </ul>
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white"
        >
          <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />
          </svg>
          Expand diagram
        </button>
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed text-white/55">{caption}</figcaption>

      <dialog ref={dialog} className={styles.dialog} aria-labelledby={headingId} onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <p id={headingId} className="text-sm font-semibold text-white">
            {title}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="inline-flex min-h-10 items-center rounded-full border border-white/20 px-4 text-xs font-semibold text-white/85 hover:border-white/45"
          >
            Close
          </button>
        </div>
        <div className="overflow-auto p-3 sm:p-5">
          <div className="min-w-[720px]">
            <Drawing nodes={nodes} edges={edges} layout="land" live={live} title={title} />
          </div>
        </div>
        <p className="border-t border-white/10 px-4 py-3 text-xs text-white/60 sm:px-5">{caption} On a phone, scroll sideways to follow the drawing.</p>
      </dialog>
    </figure>
  );
}
