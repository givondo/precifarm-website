"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  DEFAULT_ZOOM,
  KENYA_CENTER,
  phaseRouteColors,
  type ChargingHub,
  type RoutePhase,
} from "@/lib/hub-locations";
import { cartoAttribution, cartoTileUrl } from "@/lib/hub-map-config";
import { pinDataUrl } from "./pin-icons";

type LeafletConnectivityMapProps = {
  hubs: ChargingHub[];
  routes: RoutePhase[];
  mapCenter?: { lat: number; lng: number };
  mapZoom?: number;
  selectedHubId: string | null;
  onSelectHub: (id: string) => void;
  userLocation: { lat: number; lng: number } | null;
  nearMeActive: boolean;
  /** changes when the map container is shown again (mobile map/list toggle), so Leaflet re-measures */
  visibleKey?: string | number;
  /** changes when the filtered set changes, so the map fits the visible sites */
  fitKey?: string;
  reducedMotion?: boolean;
};

function MapController({
  hubs,
  userLocation,
  nearMeActive,
  selectedHub,
  visibleKey,
  fitKey,
  reducedMotion,
}: {
  hubs: ChargingHub[];
  userLocation: { lat: number; lng: number } | null;
  nearMeActive: boolean;
  selectedHub: ChargingHub | null;
  visibleKey?: string | number;
  fitKey?: string;
  reducedMotion?: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (nearMeActive && userLocation) {
      if (reducedMotion) map.setView([userLocation.lat, userLocation.lng], 9);
      else map.flyTo([userLocation.lat, userLocation.lng], 9, { duration: 1.2 });
    }
  }, [map, userLocation, nearMeActive, reducedMotion]);

  useEffect(() => {
    if (selectedHub) {
      map.panTo([selectedHub.lat, selectedHub.lng], { animate: !reducedMotion });
    }
  }, [map, selectedHub, reducedMotion]);

  useEffect(() => {
    if (visibleKey === undefined) return;
    const t = window.setTimeout(() => map.invalidateSize(), 50);
    return () => window.clearTimeout(t);
  }, [map, visibleKey]);

  useEffect(() => {
    if (fitKey === undefined || hubs.length === 0) return;
    if (hubs.length === 1) {
      map.setView([hubs[0].lat, hubs[0].lng], 11, { animate: !reducedMotion });
      return;
    }
    const bounds = L.latLngBounds(hubs.map((h) => [h.lat, h.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12, animate: !reducedMotion });
    // fit only when the filtered set changes, not on every hub array identity change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, fitKey, visibleKey]);

  return null;
}

function UserLocationMarker({ location }: { location: { lat: number; lng: number } }) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#347a52;border:3px solid white;box-shadow:0 0 0 4px rgba(52,122,82,0.35)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      }),
    [],
  );

  return <Marker position={[location.lat, location.lng]} icon={icon} title="Your location" alt="Your location" keyboard={false} />;
}

export default function LeafletConnectivityMap({
  hubs,
  routes,
  mapCenter = KENYA_CENTER,
  mapZoom = DEFAULT_ZOOM,
  selectedHubId,
  onSelectHub,
  userLocation,
  nearMeActive,
  visibleKey,
  fitKey,
  reducedMotion,
}: LeafletConnectivityMapProps) {
  const selectedHub = hubs.find((h) => h.id === selectedHubId) ?? null;

  const hubIcons = useMemo(() => {
    const icons = new Map<string, L.Icon>();
    for (const hub of hubs) {
      const selected = hub.id === selectedHubId;
      icons.set(
        hub.id,
        L.icon({
          iconUrl: pinDataUrl(hub.availability, hub.operator, hub.siteKind, selected),
          iconSize: [selected ? 36 : 28, selected ? 44 : 36],
          iconAnchor: [selected ? 18 : 14, selected ? 44 : 36],
          popupAnchor: [0, -36],
        }),
      );
    }
    return icons;
  }, [hubs, selectedHubId]);

  return (
    <MapContainer
      center={[mapCenter.lat, mapCenter.lng]}
      zoom={mapZoom}
      className="h-full w-full"
      scrollWheelZoom
      zoomControl={false}
    >
      <ZoomControl position="bottomleft" />
      <TileLayer attribution={cartoAttribution} url={cartoTileUrl} />

      {routes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.path.map((p) => [p.lat, p.lng] as [number, number])}
          pathOptions={{
            color: phaseRouteColors[route.phase],
            weight: route.phase === "live" ? 4 : route.phase === "next" ? 3 : 2,
            opacity: route.phase === "live" ? 0.9 : route.phase === "next" ? 0.7 : 0.35,
            dashArray: route.phase === "live" ? undefined : "8 6",
          }}
        />
      ))}

      {hubs.map((hub) => (
        <Marker
          key={hub.id}
          position={[hub.lat, hub.lng]}
          icon={hubIcons.get(hub.id)!}
          title={hub.name}
          alt={hub.name}
          zIndexOffset={hub.id === selectedHubId ? 1000 : 0}
          eventHandlers={{
            click: () => onSelectHub(hub.id),
          }}
        />
      ))}

      {userLocation && <UserLocationMarker location={userLocation} />}

      <MapController
        hubs={hubs}
        userLocation={userLocation}
        nearMeActive={nearMeActive}
        selectedHub={selectedHub}
        visibleKey={visibleKey}
        fitKey={fitKey}
        reducedMotion={reducedMotion}
      />
    </MapContainer>
  );
}
