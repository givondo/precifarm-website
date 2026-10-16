import DiagramFrame from "@/components/research/diagrams/DiagramFrame";

export default function HubEnergyResearchDiagram() {
  return (
    <DiagramFrame
      title="Site energy flow"
      badge="Site model"
      caption="Grid, solar and storage share one connection with the chargers, sized to inverter and connection limits."
    >
      <svg viewBox="0 0 640 400" className="h-auto w-full" role="img" aria-label="AC coupled grid, solar, storage and EV chargers">
        <rect width="640" height="400" fill="#f8fafc" />
        <polygon points="280,48 420,48 400,88 300,88" fill="#2563eb" opacity="0.9" />
        <text x="360" y="40" textAnchor="middle" className="research-diagram-label">
          Solar PV
        </text>
        <rect x="330" y="100" width="60" height="36" rx="4" fill="#fff" stroke="#d4d4d4" />
        <text x="360" y="122" textAnchor="middle" className="research-diagram-caption">
          PV inverter
        </text>

        <rect x="280" y="160" width="160" height="48" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="2" />
        <text x="360" y="190" textAnchor="middle" className="research-diagram-label">
          AC bus / distribution
        </text>

        <circle cx="120" cy="184" r="10" fill="#16a34a" />
        <text x="120" y="160" textAnchor="middle" className="research-diagram-label">
          Grid
        </text>
        <path d="M130 184 H280" stroke="#16a34a" strokeWidth="3" fill="none" />

        <rect x="480" y="148" width="100" height="72" fill="#fff" stroke="#171717" strokeWidth="2" rx="6" />
        <text x="530" y="178" textAnchor="middle" className="research-diagram-caption">
          EV chargers
        </text>
        <path d="M440 184 H480" stroke="#2563eb" strokeWidth="3" fill="none" />

        <rect x="300" y="260" width="120" height="64" fill="#fff" stroke="#16a34a" strokeWidth="2" rx="6" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="312" y1={272 + i * 12} x2="408" y2={272 + i * 12} stroke="#bbf7d0" strokeWidth="3" />
        ))}
        <text x="360" y="340" textAnchor="middle" className="research-diagram-label">
          Battery · PCS
        </text>
        <path d="M360 208 V260" stroke="#16a34a" strokeWidth="2" strokeDasharray="5 3" />

        <path d="M360 88 V160" stroke="#2563eb" strokeWidth="2" />
      </svg>
    </DiagramFrame>
  );
}
