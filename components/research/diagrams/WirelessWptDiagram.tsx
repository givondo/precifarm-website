import DiagramFrame from "@/components/research/diagrams/DiagramFrame";

export default function WirelessWptDiagram() {
  return (
    <DiagramFrame
      title="Wireless power path"
      badge="Reference architecture"
      caption="Foreign-object and living-object detection, alignment, thermal and metering supervise the power path."
    >
      <svg viewBox="0 0 640 420" className="h-auto w-full" role="img" aria-label="Wireless power transfer from grid to vehicle battery">
        <defs>
          <marker id="wpt-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#2563eb" />
          </marker>
        </defs>
        <rect width="640" height="420" fill="#fafafa" />

        {/* Grid to electronics stack */}
        {[
          { y: 36, label: "AC grid", w: 100 },
          { y: 88, label: "Protection", w: 100 },
          { y: 140, label: "AC/DC", w: 100 },
          { y: 192, label: "HF inverter", w: 100 },
          { y: 244, label: "Primary comp.", w: 100 },
        ].map((block) => (
          <g key={block.label}>
            <rect x="40" y={block.y} width={block.w} height="36" rx="4" fill="#fff" stroke="#d4d4d4" />
            <text x="90" y={block.y + 22} textAnchor="middle" className="research-diagram-caption">
              {block.label}
            </text>
            <line x1="90" y1={block.y + 36} x2="90" y2={block.y + 52} stroke="#2563eb" strokeWidth="2" markerEnd="url(#wpt-arr)" />
          </g>
        ))}

        {/* Ground coil */}
        <ellipse cx="200" cy="320" rx="72" ry="16" fill="none" stroke="#2563eb" strokeWidth="3" />
        <text x="200" y="352" textAnchor="middle" className="research-diagram-label">
          Transmitter coil
        </text>

        {/* Air gap */}
        <rect x="120" y="268" width="160" height="40" fill="none" stroke="#737373" strokeDasharray="6 4" />
        <text x="200" y="292" textAnchor="middle" className="research-diagram-caption">
          Air gap · coupling
        </text>

        {/* Vehicle */}
        <rect x="320" y="200" width="200" height="60" fill="#fff" stroke="#171717" strokeWidth="2" rx="8" />
        <ellipse cx="360" cy="268" rx="22" ry="22" fill="#404040" />
        <ellipse cx="480" cy="268" rx="22" ry="22" fill="#404040" />
        <ellipse cx="420" cy="248" rx="40" ry="10" fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x="420" y="228" textAnchor="middle" className="research-diagram-label">
          Receiver coil
        </text>

        {/* Vehicle side chain */}
        {[
          { y: 280, label: "Secondary comp." },
          { y: 320, label: "Rectify / regulate" },
          { y: 360, label: "EV interface → pack" },
        ].map((block) => (
          <g key={block.label}>
            <rect x="520" y={block.y} width="100" height="32" rx="4" fill="#fff" stroke="#d4d4d4" />
            <text x="570" y={block.y + 20} textAnchor="middle" className="research-diagram-caption">
              {block.label}
            </text>
            {block.y < 360 ? (
              <line x1="570" y1={block.y + 32} x2="570" y2={block.y + 48} stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#wpt-arr)" />
            ) : null}
          </g>
        ))}

        <path d="M272 320 C300 300 340 300 368 320" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3 2" />
      </svg>
    </DiagramFrame>
  );
}
