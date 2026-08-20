"use client";

import type { ChargingHub } from "@/lib/hub-locations";
import { HubSiteDetail } from "./HubSiteDetail";

type HubSheetProps = {
  hub: ChargingHub & { distanceKm?: number };
  onClose: () => void;
};

export default function HubSheet({ hub, onClose }: HubSheetProps) {
  return (
    <div className="hub-sheet" role="dialog" aria-label={`${hub.name} details`}>
      <div className="hub-sheet-handle" aria-hidden />
      <button type="button" onClick={onClose} className="hub-sheet-close-float" aria-label="Close">
        ×
      </button>
      <HubSiteDetail hub={hub} directionsClassName="btn-primary hub-sheet-cta" />
    </div>
  );
}
