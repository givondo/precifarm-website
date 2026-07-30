"use client";

import {
  availabilityConfig,
  googleDirectionsUrl,
  type ChargingHub,
  formatDistance,
} from "@/lib/hub-locations";

type HubSidebarProps = {
  hubs: (ChargingHub & { distanceKm?: number })[];
  selectedHubId: string | null;
  onSelectHub: (id: string) => void;
};

export default function HubSidebar({ hubs, selectedHubId, onSelectHub }: HubSidebarProps) {
  const selectedHub = hubs.find((h) => h.id === selectedHubId) ?? null;

  return (
    <aside className="hub-map-sidebar">
      {selectedHub ? (
        <div className="hub-map-sidebar-detail">
          {(() => {
            const avail = availabilityConfig[selectedHub.availability];
            return (
              <>
                <div className="hub-map-sidebar-detail-head">
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
                  <span className="hub-map-sidebar-operator">
                    {selectedHub.operator === "partner" ? "Partner site" : "Precifarm hub"}
                  </span>
                </div>
                <h3 className="hub-map-sidebar-detail-title">{selectedHub.name}</h3>
                <p className="hub-map-sidebar-detail-body">
                  {selectedHub.role}. {selectedHub.freeBays} of {selectedHub.totalChargers} bays free
                  {selectedHub.route ? ` · ${selectedHub.route}` : ""}
                  {selectedHub.distanceKm != null ? ` · ${formatDistance(selectedHub.distanceKm)} away` : ""}.
                </p>
                <a
                  href={googleDirectionsUrl(selectedHub.lat, selectedHub.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary hub-map-sidebar-directions"
                >
                  Get directions
                </a>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="hub-map-sidebar-empty">
          <p className="hub-map-sidebar-empty-title">Select a hub</p>
          <p className="hub-map-sidebar-empty-body">
            Choose a site from the list or tap a pin on the map.
          </p>
        </div>
      )}

      <div className="hub-map-sidebar-list-wrap">
        <p className="hub-map-sidebar-list-label">
          {hubs.length} {hubs.length === 1 ? "site" : "sites"}
        </p>
        <ul className="hub-map-sidebar-list">
          {hubs.length === 0 ? (
            <li className="hub-map-sidebar-no-results">No hubs match your search.</li>
          ) : (
            hubs.map((hub) => {
              const avail = availabilityConfig[hub.availability];
              const selected = hub.id === selectedHubId;

              return (
                <li key={hub.id}>
                  <button
                    type="button"
                    onClick={() => onSelectHub(hub.id)}
                    className={`hub-map-sidebar-item ${selected ? "hub-map-sidebar-item-active" : ""}`}
                  >
                    <span
                      className="hub-map-sidebar-dot"
                      style={{ backgroundColor: avail.color }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 text-left">
                      <span className="hub-map-sidebar-name">{hub.name}</span>
                      <span className="hub-map-sidebar-meta">
                        {avail.label} · {hub.freeBays}/{hub.totalChargers} bays
                        {hub.distanceKm != null && ` · ${formatDistance(hub.distanceKm)}`}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </aside>
  );
}
