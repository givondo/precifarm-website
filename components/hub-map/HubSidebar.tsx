"use client";

import {
  availabilityConfig,
  hubCapacityLabel,
  siteKindConfig,
  type ChargingHub,
  formatDistance,
} from "@/lib/hub-locations";
import { HubSiteDetail } from "./HubSiteDetail";

type HubSidebarProps = {
  hubs: (ChargingHub & { distanceKm?: number })[];
  selectedHubId: string | null;
  onSelectHub: (id: string) => void;
};

function groupHubs(hubs: HubSidebarProps["hubs"]) {
  const swap = hubs.filter((h) => h.siteKind === "swap");
  const dc = hubs.filter((h) => h.siteKind === "dc");
  return [
    { key: "dc", label: "DC charging", hubs: dc },
    { key: "swap", label: "Boda swap", hubs: swap },
  ].filter((g) => g.hubs.length > 0);
}

export default function HubSidebar({ hubs, selectedHubId, onSelectHub }: HubSidebarProps) {
  const selectedHub = hubs.find((h) => h.id === selectedHubId) ?? null;
  const groups = groupHubs(hubs);
  const showGroups = groups.length > 1;

  return (
    <aside className="hub-map-sidebar">
      {selectedHub ? (
        <div className="hub-map-sidebar-detail">
          <HubSiteDetail hub={selectedHub} />
        </div>
      ) : (
        <div className="hub-map-sidebar-empty">
          <p className="hub-map-sidebar-empty-title">Select a site</p>
          <p className="hub-map-sidebar-empty-body">
            Pick a DC charger or Boda Hub swap station from the list, or tap a pin on the map.
          </p>
        </div>
      )}

      <div className="hub-map-sidebar-list-wrap">
        <p className="hub-map-sidebar-list-label">
          {hubs.length} {hubs.length === 1 ? "site" : "sites"}
        </p>
        {hubs.length === 0 ? (
          <p className="hub-map-sidebar-no-results">No sites match your search.</p>
        ) : showGroups ? (
          groups.map((group) => (
            <div key={group.key} className="hub-map-sidebar-group">
              <p className="hub-map-sidebar-group-label">{group.label}</p>
              <ul className="hub-map-sidebar-list">
                {group.hubs.map((hub) => (
                  <HubSidebarItem
                    key={hub.id}
                    hub={hub}
                    selected={hub.id === selectedHubId}
                    onSelect={onSelectHub}
                  />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="hub-map-sidebar-list">
            {hubs.map((hub) => (
              <HubSidebarItem
                key={hub.id}
                hub={hub}
                selected={hub.id === selectedHubId}
                onSelect={onSelectHub}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function HubSidebarItem({
  hub,
  selected,
  onSelect,
}: {
  hub: ChargingHub & { distanceKm?: number };
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const avail = availabilityConfig[hub.availability];
  const kind = siteKindConfig[hub.siteKind];

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(hub.id)}
        className={`hub-map-sidebar-item ${selected ? "hub-map-sidebar-item-active" : ""}`}
      >
        <span
          className="hub-map-sidebar-dot"
          style={{ backgroundColor: hub.siteKind === "swap" ? kind.pinColor : avail.color }}
          aria-hidden
        />
        <span className="min-w-0 flex-1 text-left">
          <span className="hub-map-sidebar-name">{hub.name}</span>
          <span className="hub-map-sidebar-meta">
            {kind.shortLabel} · {avail.label} · {hubCapacityLabel(hub)}
            {hub.distanceKm != null && ` · ${formatDistance(hub.distanceKm)}`}
          </span>
        </span>
      </button>
    </li>
  );
}
