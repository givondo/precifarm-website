/**
 * Front and side elevation of the Pulse wallbox, drawn to scale (1 unit = 1 mm) from the
 * register size, PUL-13: 384 x 264 x 118 mm. The holster and cable are indicative.
 */
export default function WallboxDrawing({ height, width, depth }: { height: number; width: number; depth: number }) {
  const top = 46;
  const fx = 74; // front x
  const sx = fx + width + 120; // side x
  const bottom = top + height;
  const vbW = sx + depth + 50;
  const vbH = bottom + 92;
  const ink = "#374151";
  const dim = "#1f6f4a";

  return (
    <figure className="rounded-2xl bg-[#f6f7f8] p-4 ring-1 ring-border sm:p-6">
      <svg viewBox={`0 0 ${vbW} ${vbH}`} role="img" aria-labelledby="wallbox-drawing-title" className="h-auto w-full">
        <title id="wallbox-drawing-title">{`Pulse wallbox front and side elevations, ${height} mm high, ${width} mm wide and ${depth} mm deep`}</title>
        <defs>
          <marker id="wb-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 8 4 0 8z" fill={dim} />
          </marker>
          <pattern id="wb-wall" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#d1d5db" strokeWidth="2" />
          </pattern>
        </defs>

        {/* Front elevation */}
        <text x={fx} y={24} fontSize="15" fontWeight="600" fill={ink} letterSpacing="1.5">
          FRONT
        </text>
        <rect x={fx} y={top} width={width} height={height} rx={30} fill="#fff" stroke={ink} strokeWidth="2" />
        <rect x={fx + width / 2 - 30} y={top + 50} width={60} height={176} rx={12} fill="#4b5563" />
        <line x1={fx + width / 2} y1={top + 92} x2={fx + width / 2} y2={top + 196} stroke="#7ec09d" strokeWidth="3" strokeLinecap="round" />
        <text x={fx + width / 2} y={top + height - 64} textAnchor="middle" fontSize="17" fontWeight="600" fill={dim}>
          Precifarm
        </text>
        {/* cable gland and tethered lead */}
        <rect x={fx + width / 2 - 14} y={bottom} width={28} height={14} rx={3} fill={ink} />
        <path d={`M${fx + width / 2} ${bottom + 14} C ${fx + width / 2} ${bottom + 60}, ${fx + width + 40} ${bottom + 40}, ${fx + width + 52} ${top + 250}`} fill="none" stroke="#111827" strokeWidth="9" strokeLinecap="round" />
        {/* holster */}
        <rect x={fx + width + 30} y={top + 150} width={50} height={110} rx={12} fill="#fff" stroke={ink} strokeWidth="2" />
        <text x={fx + width + 55} y={top + 136} textAnchor="middle" fontSize="13" fill={ink}>
          Holster
        </text>

        {/* width dimension */}
        <line x1={fx} y1={bottom + 34} x2={fx} y2={bottom + 62} stroke={dim} strokeWidth="1" />
        <line x1={fx + width} y1={bottom + 34} x2={fx + width} y2={bottom + 62} stroke={dim} strokeWidth="1" />
        <line x1={fx + 2} y1={bottom + 54} x2={fx + width - 2} y2={bottom + 54} stroke={dim} strokeWidth="1.5" markerStart="url(#wb-arrow)" markerEnd="url(#wb-arrow)" />
        <rect x={fx + width / 2 - 26} y={bottom + 43} width={52} height={22} fill="#f6f7f8" />
        <text x={fx + width / 2} y={bottom + 60} textAnchor="middle" fontSize="16" fontWeight="600" fill={dim}>
          {width}
        </text>

        {/* height dimension */}
        <line x1={fx - 40} y1={top} x2={fx - 6} y2={top} stroke={dim} strokeWidth="1" />
        <line x1={fx - 40} y1={bottom} x2={fx - 6} y2={bottom} stroke={dim} strokeWidth="1" />
        <line x1={fx - 30} y1={top + 2} x2={fx - 30} y2={bottom - 2} stroke={dim} strokeWidth="1.5" markerStart="url(#wb-arrow)" markerEnd="url(#wb-arrow)" />
        <rect x={fx - 42} y={top + height / 2 - 26} width={24} height={52} fill="#f6f7f8" />
        <text x={fx - 24} y={top + height / 2} textAnchor="middle" fontSize="16" fontWeight="600" fill={dim} transform={`rotate(-90 ${fx - 24} ${top + height / 2})`}>
          {height}
        </text>

        {/* Side elevation with wall */}
        <text x={sx} y={24} fontSize="15" fontWeight="600" fill={ink} letterSpacing="1.5">
          SIDE
        </text>
        <rect x={sx - 22} y={top - 20} width={22} height={height + 40} fill="url(#wb-wall)" />
        <line x1={sx} y1={top - 20} x2={sx} y2={bottom + 20} stroke={ink} strokeWidth="2" />
        <path d={`M${sx} ${top} H${sx + depth - 24} Q${sx + depth} ${top} ${sx + depth} ${top + 24} V${bottom - 24} Q${sx + depth} ${bottom} ${sx + depth - 24} ${bottom} H${sx}`} fill="#fff" stroke={ink} strokeWidth="2" />
        <rect x={sx + 6} y={top} width={30} height={height} fill="#e5e7eb" />
        <rect x={sx + depth / 2 - 10} y={bottom} width={20} height={14} rx={3} fill={ink} />

        {/* depth dimension */}
        <line x1={sx} y1={bottom + 34} x2={sx} y2={bottom + 62} stroke={dim} strokeWidth="1" />
        <line x1={sx + depth} y1={bottom + 34} x2={sx + depth} y2={bottom + 62} stroke={dim} strokeWidth="1" />
        <line x1={sx + 2} y1={bottom + 54} x2={sx + depth - 2} y2={bottom + 54} stroke={dim} strokeWidth="1.5" markerStart="url(#wb-arrow)" markerEnd="url(#wb-arrow)" />
        <rect x={sx + depth / 2 - 24} y={bottom + 43} width={48} height={22} fill="#f6f7f8" />
        <text x={sx + depth / 2} y={bottom + 60} textAnchor="middle" fontSize="16" fontWeight="600" fill={dim}>
          {depth}
        </text>
      </svg>
      <figcaption className="mt-3 text-xs leading-relaxed text-forest-500">
        Front and side elevations to scale, in millimetres, from the register size (PUL-13, design value checked against design files). Holster and cable are indicative.
      </figcaption>
    </figure>
  );
}
