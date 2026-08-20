"use client";

import { availabilityConfig, LIVE_ROUTE_LABEL, siteKindConfig } from "@/lib/hub-locations";

export default function HubMapFooter() {
  return (
    <div className="hub-map-footer">
      <div className="hub-map-footer-live">
        <span className="hub-map-footer-live-dot" aria-hidden />
        <span className="hub-map-footer-live-label">{LIVE_ROUTE_LABEL}</span>
        <span className="hub-map-footer-live-badge">Live DC</span>
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
        {(Object.keys(availabilityConfig) as Array<keyof typeof availabilityConfig>).map((key) => (
          <span key={key} className="hub-map-footer-legend-item">
            <span
              className="hub-map-footer-legend-dot"
              style={{ backgroundColor: availabilityConfig[key].color }}
            />
            {availabilityConfig[key].label}
          </span>
        ))}
      </div>
    </div>
  );
}
