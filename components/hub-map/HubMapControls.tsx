"use client";

import { availabilityConfig, type HubFilter } from "@/lib/hub-locations";

const filters: { id: HubFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "precifarm", label: "Precifarm" },
  { id: "partners", label: "Partners" },
  { id: "available", label: "Available now" },
];

type HubMapControlsProps = {
  activeFilter: HubFilter;
  onFilterChange: (filter: HubFilter) => void;
  onNearMe: () => void;
  nearMeLoading: boolean;
  nearMeActive: boolean;
  hubCount: number;
};

export default function HubMapControls({
  activeFilter,
  onFilterChange,
  onNearMe,
  nearMeLoading,
  nearMeActive,
  hubCount,
}: HubMapControlsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex flex-col gap-3 p-3 sm:p-4">
      <div className="pointer-events-auto flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange(f.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              activeFilter === f.id
                ? "border-charge-500/50 bg-charge-600 text-white shadow-sm"
                : "border-border bg-white/95 text-forest-700 shadow-sm backdrop-blur-md hover:border-forest-300 hover:text-forest-900"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onNearMe}
          disabled={nearMeLoading}
          className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
            nearMeActive
              ? "border-charge-500/50 bg-charge-600 text-white"
              : "border-border bg-white/95 text-forest-700 shadow-sm backdrop-blur-md hover:border-forest-300 hover:text-forest-900"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z" />
          </svg>
          {nearMeLoading ? "Locating…" : "Near me"}
        </button>
      </div>

      <div className="pointer-events-auto flex flex-wrap items-center gap-4 self-start rounded-full border border-border bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-md">
        {(Object.keys(availabilityConfig) as Array<keyof typeof availabilityConfig>).map(
          (status) => (
            <div key={status} className="flex items-center gap-1.5 text-[10px] text-forest-600">
              <span
                className="h-2.5 w-2.5 rounded-full ring-2 ring-forest-200"
                style={{ backgroundColor: availabilityConfig[status].color }}
              />
              {availabilityConfig[status].label}
            </div>
          ),
        )}
        <span className="text-[10px] text-forest-400">· {hubCount} hubs shown</span>
      </div>
    </div>
  );
}
