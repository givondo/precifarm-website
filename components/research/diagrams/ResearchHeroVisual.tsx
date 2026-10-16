import DiagramFrame from "@/components/research/diagrams/DiagramFrame";

export default function ResearchHeroVisual() {
  return (
    <DiagramFrame
      title="Three research programmes"
      caption="Wireless power, engineering software and site energy share one engineering method."
      className="mt-8 lg:mt-0"
    >
      <svg viewBox="0 0 720 360" className="h-auto w-full max-h-[320px]" role="img" aria-labelledby="rd-hero-title">
        <title id="rd-hero-title">Precifarm research areas: wireless charging pad, engineering software stack, and grid-connected charging site</title>
        <defs>
          <linearGradient id="rd-hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <pattern id="rd-hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#e5e5e5" strokeWidth="0.75" />
          </pattern>
          <marker id="rd-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#a3a3a3" />
          </marker>
        </defs>
        <rect width="720" height="360" fill="url(#rd-hero-sky)" />
        <rect width="720" height="360" fill="url(#rd-hero-grid)" opacity="0.5" />

        {/* Wireless */}
        <g>
          <rect x="24" y="40" width="200" height="280" rx="10" fill="#fff" stroke="#e5e5e5" />
          <text x="124" y="64" textAnchor="middle" className="research-diagram-label">
            Wireless WPT
          </text>
          <rect x="72" y="220" width="104" height="12" fill="#404040" rx="2" />
          <rect x="88" y="200" width="72" height="8" fill="#737373" rx="2" />
          <path d="M88 232 Q124 180 160 232" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
          <ellipse cx="124" cy="248" rx="48" ry="8" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="124" y="272" textAnchor="middle" className="research-diagram-caption">
            Ground pad · air gap
          </text>
        </g>

        {/* Agent */}
        <g>
          <rect x="260" y="40" width="200" height="280" rx="10" fill="#fff" stroke="#e5e5e5" />
          <text x="360" y="64" textAnchor="middle" className="research-diagram-label">
            Precifarm Agent
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="288" y={88 + i * 44} width="144" height="32" rx="6" fill={i === 2 ? "#eff6ff" : "#f5f5f5"} stroke={i === 2 ? "#2563eb" : "#d4d4d4"} />
              <text x="360" y={108 + i * 44} textAnchor="middle" className="research-diagram-caption">
                {["Interface", "Model", "Calculators", "Review"][i]}
              </text>
            </g>
          ))}
          <path d="M360 120 V280" stroke="#d4d4d4" strokeWidth="1" markerEnd="url(#rd-arrow)" />
        </g>

        {/* Energy hub */}
        <g>
          <rect x="496" y="40" width="200" height="280" rx="10" fill="#fff" stroke="#e5e5e5" />
          <text x="596" y="64" textAnchor="middle" className="research-diagram-label">
            Energy hub model
          </text>
          <polygon points="536,100 656,100 640,130 552,130" fill="#2563eb" opacity="0.85" />
          <rect x="572" y="150" width="48" height="64" fill="#fff" stroke="#171717" strokeWidth="1.5" rx="4" />
          <path d="M520 200 H560 M632 200 H672" stroke="#16a34a" strokeWidth="2" />
          <circle cx="520" cy="200" r="6" fill="#16a34a" />
          <text x="596" y="248" textAnchor="middle" className="research-diagram-caption">
            Grid · PV · storage · chargers
          </text>
          <rect x="544" y="260" width="104" height="36" fill="#f5f5f5" stroke="#e5e5e5" rx="4" />
          <text x="596" y="282" textAnchor="middle" className="research-diagram-caption">
            Site model
          </text>
        </g>

      </svg>
    </DiagramFrame>
  );
}
