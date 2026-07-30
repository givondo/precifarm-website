"use client";

import { availabilityConfig, type ChargingHub, formatDistance } from "@/lib/hub-locations";

type HubListDrawerProps = {
  hubs: (ChargingHub & { distanceKm?: number })[];
  selectedHubId: string | null;
  onSelectHub: (id: string) => void;
  onClose: () => void;
};

export default function HubListDrawer({
  hubs,
  selectedHubId,
  onSelectHub,
  onClose,
}: HubListDrawerProps) {
  return (
    <>
      <button type="button" className="hub-drawer-backdrop" onClick={onClose} aria-label="Close list" />
      <aside className="hub-drawer">
        <div className="hub-drawer-head">
          <h3 className="hub-drawer-title">All hubs</h3>
          <button type="button" onClick={onClose} className="hub-drawer-close" aria-label="Close">
            ×
          </button>
        </div>
        <ul className="hub-drawer-list">
          {hubs.map((hub) => {
            const avail = availabilityConfig[hub.availability];
            const selected = hub.id === selectedHubId;

            return (
              <li key={hub.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectHub(hub.id);
                    onClose();
                  }}
                  className={`hub-drawer-item ${selected ? "hub-drawer-item-active" : ""}`}
                >
                  <span
                    className="hub-drawer-dot"
                    style={{ backgroundColor: avail.color }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 text-left">
                    <span className="hub-drawer-name">{hub.name}</span>
                    <span className="hub-drawer-meta">
                      {hub.freeBays} free · {hub.operator === "partner" ? "Partner" : "Precifarm"}
                      {hub.distanceKm != null && ` · ${formatDistance(hub.distanceKm)}`}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
