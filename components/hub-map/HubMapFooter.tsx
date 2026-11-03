"use client";

import { LIVE_ROUTE_LABEL, siteKindConfig } from "@/lib/hub-locations";

export default function HubMapFooter() {
  return (
    <div className="hub-map-footer">
      <div className="hub-map-footer-live">
        <span className="hub-map-footer-live-dot" aria-hidden />
        <span className="hub-map-footer-live-label">First Corridor route: {LIVE_ROUTE_LABEL}</span>
      </div>

      <div className="hub-map-footer-legend" aria-label="Map legend">
        <span className="hub-map-footer-legend-item">
          <span className="hub-map-footer-pin hub-map-footer-pin-dc" aria-hidden />
          {siteKindConfig.dc.label}
        </span>
        <span className="hub-map-footer-legend-item">
          <span className="hub-map-footer-pin hub-map-footer-pin-swap" aria-hidden />
          {siteKindConfig.swap.label}
        </span>
      </div>
    </div>
  );
}
