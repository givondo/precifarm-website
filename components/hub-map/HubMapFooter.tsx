"use client";

import { availabilityConfig, LIVE_ROUTE_LABEL } from "@/lib/hub-locations";

type HubMapFooterProps = {
  liveOnly?: boolean;
};

export default function HubMapFooter({ liveOnly = false }: HubMapFooterProps) {
  return (
    <div className="hub-map-footer">
      {liveOnly ? (
        <div className="hub-map-footer-live">
          <span className="hub-map-footer-live-dot" aria-hidden />
          <span className="hub-map-footer-live-label">{LIVE_ROUTE_LABEL}</span>
          <span className="hub-map-footer-live-badge">Live</span>
        </div>
      ) : null}

      <div className="hub-map-footer-legend" aria-label="Availability">
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
