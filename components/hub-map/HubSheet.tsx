"use client";

import {
  availabilityConfig,
  googleDirectionsUrl,
  type ChargingHub,
  formatDistance,
} from "@/lib/hub-locations";

type HubSheetProps = {
  hub: ChargingHub & { distanceKm?: number };
  onClose: () => void;
};

export default function HubSheet({ hub, onClose }: HubSheetProps) {
  const avail = availabilityConfig[hub.availability];

  return (
    <div className="hub-sheet" role="dialog" aria-label={`${hub.name} details`}>
      <div className="hub-sheet-handle" aria-hidden />
      <div className="hub-sheet-head">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="hub-map-sidebar-badge"
              style={{
                color: avail.color,
                borderColor: `${avail.color}40`,
                backgroundColor: `${avail.color}12`,
              }}
            >
              {avail.label}
            </span>
            <span className="hub-sheet-eyebrow">
              {hub.operator === "partner" ? "Partner" : "Precifarm"}
            </span>
          </div>
          <h3 className="hub-sheet-title">{hub.name}</h3>
        </div>
        <button type="button" onClick={onClose} className="hub-sheet-close" aria-label="Close">
          ×
        </button>
      </div>
      <p className="hub-sheet-body">
        {hub.role}. {hub.freeBays} of {hub.totalChargers} bays free
        {hub.route ? ` · ${hub.route}` : ""}
        {hub.distanceKm != null ? ` · ${formatDistance(hub.distanceKm)} away` : ""}.
      </p>
      <a
        href={googleDirectionsUrl(hub.lat, hub.lng)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary hub-sheet-cta"
      >
        Get directions
      </a>
    </div>
  );
}
