import type { PartnerJourney } from "@/lib/partners";

/** Line icons for the partner journeys. 24 px grid, currentColor. */
export default function JourneyIcon({ kind, className = "h-6 w-6" }: { kind: PartnerJourney["icon"]; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      {kind === "fleet" ? (
        <>
          <path d="M3 15V9.5a1 1 0 0 1 1-1h9.5l3.5 3.5h2a1 1 0 0 1 1 1V15" />
          <circle cx="7" cy="16" r="1.8" />
          <circle cx="16.5" cy="16" r="1.8" />
          <path d="M9 16h5.7M3 16h2.2M18.3 16H21" />
          <path d="M8 5.5 6.5 8h2L7 10.5" />
        </>
      ) : kind === "site" ? (
        <>
          <path d="M3 8h18M5 8V5h14v3" />
          <path d="M7 8v12M17 8v12" />
          <rect x="9.5" y="11" width="5" height="8" rx="1" />
          <path d="M12.5 13l-1 2h1.5l-1 2" />
          <path d="M3 20h18" />
        </>
      ) : kind === "property" ? (
        <>
          <path d="M4 20V7l7-3v16M11 9l9 3v8" />
          <path d="M7 9v.01M7 12v.01M7 15v.01M14.5 14v.01M17 15v.01" />
          <path d="M2.5 20h19" />
        </>
      ) : kind === "installer" ? (
        <>
          <path d="M14.5 6.5a3.5 3.5 0 0 0-4.6 4.6L4 17l3 3 5.9-5.9a3.5 3.5 0 0 0 4.6-4.6l-2.2 2.2-2.4-.6-.6-2.4z" />
        </>
      ) : (
        <>
          <path d="M12 3v18M5 7h14M3 12h18M5 17h14" />
          <circle cx="12" cy="7" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="12" cy="17" r="1.6" />
        </>
      )}
    </svg>
  );
}
