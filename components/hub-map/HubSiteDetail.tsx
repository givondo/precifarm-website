"use client";

import {
  availabilityConfig,
  googleDirectionsUrl,
  hubCapacityLabel,
  hubSiteTypeLabel,
  siteKindConfig,
  type ChargingHub,
  formatDistance,
} from "@/lib/hub-locations";

type HubSiteDetailProps = {
  hub: ChargingHub & { distanceKm?: number };
  directionsClassName?: string;
};

export function HubSiteDetail({ hub, directionsClassName = "btn-primary hub-map-sidebar-directions" }: HubSiteDetailProps) {
  const avail = availabilityConfig[hub.availability];
  const kind = siteKindConfig[hub.siteKind];

  return (
    <>
      <div className="hub-map-sidebar-detail-head">
        <span
          className="hub-map-sidebar-badge"
          style={{
            // Pin colours (e.g. #22c55e) are too light for text on a pale tint; the colour cue stays in border and fill.
            color: "var(--color-forest-700)",
            borderColor: `${avail.color}80`,
            backgroundColor: `${avail.color}1f`,
          }}
        >
          {avail.label}
        </span>
        <span
          className="hub-map-sidebar-kind"
          style={{
            color: kind.pinColor,
            borderColor: `${kind.pinColor}40`,
            backgroundColor: `${kind.pinColor}12`,
          }}
        >
          {kind.shortLabel}
        </span>
        <span className="hub-map-sidebar-operator">{hubSiteTypeLabel(hub)}</span>
      </div>
      <h3 className="hub-map-sidebar-detail-title">{hub.name}</h3>
      <p className="hub-map-sidebar-detail-body">
        {hub.role}. {hubCapacityLabel(hub)}
        {hub.siteKind === "swap" && hub.swapTime ? ` · Swap ${hub.swapTime}` : ""}
        {hub.route ? ` · ${hub.route}` : ""}
        {hub.distanceKm != null ? ` · ${formatDistance(hub.distanceKm)} away` : ""}.
      </p>
      <a
        href={googleDirectionsUrl(hub.lat, hub.lng)}
        target="_blank"
        rel="noopener noreferrer"
        className={directionsClassName}
      >
        Get directions
      </a>
    </>
  );
}
