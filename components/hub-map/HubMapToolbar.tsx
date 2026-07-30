"use client";

import type { HubFilter } from "@/lib/hub-locations";

type HubMapToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  filter: HubFilter;
  onFilterChange: (filter: HubFilter) => void;
  onNearMe: () => void;
  nearMeLoading: boolean;
  nearMeActive: boolean;
  onOpenList: () => void;
  resultCount: number;
};

const filterOptions: { value: HubFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "precifarm", label: "Precifarm" },
  { value: "partners", label: "Partners" },
  { value: "available", label: "Available" },
];

export default function HubMapToolbar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  onNearMe,
  nearMeLoading,
  nearMeActive,
  onOpenList,
  resultCount,
}: HubMapToolbarProps) {
  return (
    <div className="hub-map-toolbar">
      <div className="hub-map-toolbar-search">
        <label className="hub-map-toolbar-input-wrap">
          <span className="sr-only">Search hubs</span>
          <svg className="hub-map-toolbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or route…"
            className="hub-map-toolbar-input"
          />
        </label>
      </div>

      <div className="hub-map-toolbar-filters" role="group" aria-label="Filter hubs">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFilterChange(opt.value)}
            className={`hub-map-toolbar-pill ${filter === opt.value ? "hub-map-toolbar-pill-active" : ""}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="hub-map-toolbar-actions">
        <button
          type="button"
          onClick={onOpenList}
          className="hub-map-toolbar-btn lg:hidden"
        >
          List ({resultCount})
        </button>
        <button
          type="button"
          onClick={onNearMe}
          disabled={nearMeLoading}
          className={`hub-map-toolbar-btn ${nearMeActive ? "hub-map-toolbar-btn-active" : ""}`}
        >
          {nearMeLoading ? "Locating…" : "Near me"}
        </button>
      </div>
    </div>
  );
}
