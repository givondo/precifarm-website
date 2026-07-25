"use client";

import {
  availabilityConfig,
  googleDirectionsUrl,
  type ChargingHub,
  formatDistance,
} from "@/lib/hub-locations";

type HubDetailPanelProps = {
  hub: ChargingHub & { distanceKm?: number };
  onClose: () => void;
};

export default function HubDetailPanel({ hub, onClose }: HubDetailPanelProps) {
  const avail = availabilityConfig[hub.availability];
  const isPartner = hub.operator === "partner";

  return (
    <div className="pointer-events-auto flex max-h-[min(420px,50vh)] flex-col overflow-hidden rounded-2xl border border-border bg-white/95 shadow-xl backdrop-blur-md sm:max-h-none">
      <div className="flex items-start justify-between gap-3 border-b border-border p-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${avail.bgClass}`}
            >
              {avail.label}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                isPartner
                  ? "border-forest-200 bg-forest-50 text-forest-600"
                  : "border-charge-500/30 bg-charge-500/10 text-charge-600"
              }`}
            >
              {isPartner ? "Partner" : "Precifarm"}
            </span>
          </div>
          <h3 className="mt-2 truncate text-lg font-semibold text-forest-900">
            {hub.name}
          </h3>
          {isPartner && hub.partnerName && (
            <p className="text-xs text-forest-500">Operated with {hub.partnerName}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-forest-400 transition hover:bg-forest-50 hover:text-forest-700"
          aria-label="Close hub details"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto p-4 text-sm">
        <p className="text-forest-600/85">{hub.role}</p>

        <dl className="grid grid-cols-2 gap-3">
          {hub.distanceKm != null && (
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-forest-400">
                Distance
              </dt>
              <dd className="mt-0.5 font-medium text-forest-900">
                {formatDistance(hub.distanceKm)}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-forest-400">
              Chargers
            </dt>
            <dd className="mt-0.5 font-medium text-forest-900">
              {hub.freeBays} free / {hub.totalChargers} total
            </dd>
          </div>
          {hub.route && (
            <div className="col-span-2">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-forest-400">
                Route served
              </dt>
              <dd className="mt-0.5 font-mono text-xs text-charge-600">{hub.route}</dd>
            </div>
          )}
        </dl>

        <p className="text-[10px] leading-relaxed text-forest-400">
          Availability is illustrative for this live demo — not real-time bay telemetry.
        </p>
      </div>

      <div className="border-t border-border p-4">
        <a
          href={googleDirectionsUrl(hub.lat, hub.lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-charge-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-charge-500"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Get directions
        </a>
      </div>
    </div>
  );
}
