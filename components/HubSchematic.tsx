/** Route hub schematic — four integrated layers (SVG, no external asset). */
export default function HubSchematic({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`hub-schematic aspect-[4/3] w-full ${className}`}
      aria-label="Schematic diagram of a Precifarm route charging hub showing solar canopy, grid and battery storage, DC fast charger and passenger dwell area"
    >
      <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-hidden>
        <defs>
          <linearGradient id="hub-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
          <linearGradient id="hub-solar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <pattern id="hub-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#e5e5e5" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="640" height="480" fill="url(#hub-sky)" />
        <rect width="640" height="480" fill="url(#hub-grid)" opacity="0.45" />

        <rect x="0" y="360" width="640" height="120" fill="#f5f5f5" />
        <line x1="0" y1="360" x2="640" y2="360" stroke="#d4d4d4" strokeWidth="2" />

        <polygon points="80,120 560,120 520,200 120,200" fill="url(#hub-solar)" opacity="0.92" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={i}
            x1={120 + i * 55}
            y1="120"
            x2={120 + i * 55}
            y2="200"
            stroke="#1e40af"
            strokeWidth="1"
            opacity="0.35"
          />
        ))}
        <text x="320" y="108" textAnchor="middle" className="hub-schematic-label">
          Solar canopy
        </text>

        <rect x="308" y="200" width="24" height="160" fill="#525252" rx="2" />

        <rect x="420" y="240" width="100" height="100" fill="#fff" stroke="#2563eb" strokeWidth="2" rx="4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="430"
            y1={252 + i * 16}
            x2="510"
            y2={252 + i * 16}
            stroke="#93c5fd"
            strokeWidth="2"
          />
        ))}
        <text x="470" y="232" textAnchor="middle" className="hub-schematic-label">
          LiFePO₄ storage
        </text>

        <path d="M60 280 H180 V320 H120 V360" fill="none" stroke="#16a34a" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="60" cy="280" r="8" fill="#16a34a" />
        <text x="60" y="268" textAnchor="middle" className="hub-schematic-label">
          Grid
        </text>

        <rect x="248" y="268" width="36" height="72" fill="#fff" stroke="#171717" strokeWidth="2" rx="3" />
        <rect x="254" y="276" width="24" height="14" fill="#2563eb" rx="2" />
        <path d="M266 340 C266 360 290 360 290 340" fill="none" stroke="#171717" strokeWidth="3" />

        <rect x="140" y="300" width="200" height="56" fill="#fff" stroke="#171717" strokeWidth="2" rx="8" />
        <rect x="140" y="328" width="200" height="28" fill="#16a34a" opacity="0.25" />
        <circle cx="168" cy="356" r="10" fill="#404040" />
        <circle cx="312" cy="356" r="10" fill="#404040" />
        <path d="M266 340 L266 310" stroke="#171717" strokeWidth="3" />
        <text x="240" y="292" textAnchor="middle" className="hub-schematic-label">
          EV · CCS2
        </text>

        <rect x="480" y="300" width="120" height="56" fill="#fff" stroke="#d4d4d4" strokeWidth="1.5" rx="6" strokeDasharray="4 3" />
        <text x="540" y="324" textAnchor="middle" className="hub-schematic-caption">
          Passenger
        </text>
        <text x="540" y="342" textAnchor="middle" className="hub-schematic-caption">
          dwell
        </text>

        {[
          { x: 100, y: 400, label: "1 · Energy", sub: "Grid + solar + storage" },
          { x: 260, y: 400, label: "2 · Charging", sub: "DC fast · reserved windows" },
          { x: 420, y: 400, label: "3 · Dwell", sub: "Shade · safe circulation" },
          { x: 560, y: 400, label: "4 · Ops", sub: "OCPP · 24/7 monitoring" },
        ].map((item) => (
          <g key={item.label}>
            <rect x={item.x - 58} y={item.y - 28} width="116" height="52" fill="#fff" stroke="#e5e5e5" rx="6" />
            <text x={item.x} y={item.y - 8} textAnchor="middle" className="hub-schematic-callout">
              {item.label}
            </text>
            <text x={item.x} y={item.y + 10} textAnchor="middle" className="hub-schematic-caption">
              {item.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="sr-only">
        Schematic of a Precifarm route hub: solar canopy, grid and battery storage, DC fast
        charging for intercity buses, passenger dwell space and remote operations monitoring.
      </figcaption>
    </figure>
  );
}
