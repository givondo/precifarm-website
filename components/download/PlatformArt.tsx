/** Line drawings of the three ways into Precifarm Agent. Schematic, not screenshots. */

export function BrowserArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden fill="none">
      <rect x="4" y="6" width="112" height="68" rx="7" fill="#fff" stroke="#c4cad1" />
      <path d="M4 18h112" stroke="#e1e5e9" />
      <circle cx="12" cy="12" r="1.8" fill="#c4cad1" />
      <circle cx="18" cy="12" r="1.8" fill="#c4cad1" />
      <rect x="28" y="9" width="60" height="6" rx="3" fill="#f1f3f4" />
      <rect x="10" y="24" width="34" height="44" rx="3" fill="#111827" />
      <rect x="14" y="29" width="18" height="2" rx="1" fill="#7EC09D" />
      {[35, 41, 47, 53].map((y) => (
        <rect key={y} x="14" y={y} width="24" height="2" rx="1" fill="rgba(255,255,255,0.35)" />
      ))}
      <rect x="50" y="24" width="60" height="20" rx="3" fill="#f6f7f8" stroke="#e1e5e9" />
      <path d="M55 38h8v-6h10v6h10v-8h10v8h10" stroke="#1F6F4A" strokeWidth="1.4" />
      <rect x="50" y="48" width="60" height="20" rx="3" fill="#f6f7f8" stroke="#e1e5e9" />
      {[53, 58, 63].map((y) => (
        <rect key={y} x="55" y={y} width={y === 58 ? 36 : 46} height="2" rx="1" fill="#c4cad1" />
      ))}
    </svg>
  );
}

export function PhoneArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="36 0 48 80" className={className} aria-hidden fill="none">
      <rect x="42" y="3" width="36" height="74" rx="7" fill="#fff" stroke="#c4cad1" />
      <rect x="46" y="10" width="28" height="58" rx="2" fill="#111827" />
      <rect x="55" y="6" width="10" height="1.6" rx="0.8" fill="#c4cad1" />
      <rect x="49" y="14" width="14" height="2" rx="1" fill="#7EC09D" />
      <rect x="49" y="20" width="22" height="9" rx="2" fill="rgba(255,255,255,0.12)" />
      <rect x="49" y="32" width="22" height="13" rx="2" fill="rgba(126,192,157,0.18)" stroke="rgba(126,192,157,0.5)" strokeWidth="0.6" />
      {[49, 53, 57].map((y) => (
        <rect key={y} x="49" y={y} width={y === 53 ? 14 : 20} height="2" rx="1" fill="rgba(255,255,255,0.35)" />
      ))}
      <rect x="49" y="62" width="22" height="3.5" rx="1.75" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

export function TerminalArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden fill="none">
      <rect x="4" y="6" width="112" height="68" rx="7" fill="#111827" stroke="#111827" />
      <circle cx="12" cy="13" r="1.8" fill="rgba(255,255,255,0.3)" />
      <circle cx="18" cy="13" r="1.8" fill="rgba(255,255,255,0.3)" />
      <text x="12" y="30" fontSize="7" fontFamily="ui-monospace, monospace" fill="#7EC09D">
        $ opencode
      </text>
      <text x="12" y="41" fontSize="6" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.6)">
        /connect deepseek
      </text>
      <text x="12" y="51" fontSize="5" fontFamily="ui-monospace, monospace" fill="rgba(255,255,255,0.6)">
        + precifarm-agent config
      </text>
      <rect x="12" y="58" width="5" height="7" fill="#7EC09D" />
    </svg>
  );
}
