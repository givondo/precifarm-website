"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  filterHubs,
  liveRouteHubs,
  liveRoutePhases,
  LIVE_ROUTE_CENTER,
  LIVE_ROUTE_ZOOM,
  sortHubsByDistance,
  type HubFilter,
} from "@/lib/hub-locations";
import HubListDrawer from "./hub-map/HubListDrawer";
import HubMapFooter from "./hub-map/HubMapFooter";
import HubMapToolbar from "./hub-map/HubMapToolbar";
import HubSheet from "./hub-map/HubSheet";
import HubSidebar from "./hub-map/HubSidebar";

const LeafletConnectivityMap = dynamic(
  () => import("./hub-map/LeafletConnectivityMap"),
  {
    ssr: false,
    loading: () => <div className="hub-map-loading">Loading map…</div>,
  },
);

const GoogleConnectivityMap = dynamic(
  () => import("./hub-map/GoogleConnectivityMap"),
  { ssr: false, loading: () => <div className="hub-map-loading">Loading map…</div> },
);

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const useGoogleMaps = Boolean(googleMapsApiKey);

const DEFAULT_HUB_ID = "kisumu";

function matchQuery(hub: { name: string; role: string; partnerName?: string }, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return (
    hub.name.toLowerCase().includes(needle) ||
    hub.role.toLowerCase().includes(needle) ||
    (hub.partnerName?.toLowerCase().includes(needle) ?? false)
  );
}

export default function HubConnectivityMap() {
  const [filter, setFilter] = useState<HubFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedHubId, setSelectedHubId] = useState<string | null>(DEFAULT_HUB_ID);
  const [listOpen, setListOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearMeActive, setNearMeActive] = useState(false);
  const [nearMeLoading, setNearMeLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const filteredHubs = useMemo(() => {
    const byFilter = filterHubs(liveRouteHubs, filter);
    return byFilter.filter((h) => matchQuery(h, query));
  }, [filter, query]);

  const hubsWithDistance = useMemo(() => {
    if (!userLocation) return filteredHubs.map((h) => ({ ...h, distanceKm: undefined }));
    return sortHubsByDistance(filteredHubs, userLocation.lat, userLocation.lng);
  }, [filteredHubs, userLocation]);

  const selectedHub =
    hubsWithDistance.find((h) => h.id === selectedHubId) ?? null;

  useEffect(() => {
    if (selectedHubId && !filteredHubs.some((h) => h.id === selectedHubId)) {
      setSelectedHubId(filteredHubs[0]?.id ?? null);
    }
  }, [filteredHubs, selectedHubId]);

  const handleNearMe = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported in this browser.");
      return;
    }
    setNearMeLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setNearMeActive(true);
        setNearMeLoading(false);
        const sorted = sortHubsByDistance(filteredHubs, pos.coords.latitude, pos.coords.longitude);
        if (sorted[0]) setSelectedHubId(sorted[0].id);
      },
      () => {
        setGeoError("Could not access your location. Check browser permissions.");
        setNearMeLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [filteredHubs]);

  const handleSelectHub = useCallback((id: string) => {
    setSelectedHubId(id);
  }, []);

  const mapProps = {
    hubs: filteredHubs,
    routes: liveRoutePhases,
    mapCenter: LIVE_ROUTE_CENTER,
    mapZoom: LIVE_ROUTE_ZOOM,
    selectedHubId,
    onSelectHub: handleSelectHub,
    userLocation,
    nearMeActive,
  };

  return (
    <div className="hub-map-v2">

      <HubMapToolbar
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
        onNearMe={handleNearMe}
        nearMeLoading={nearMeLoading}
        nearMeActive={nearMeActive}
        onOpenList={() => setListOpen(true)}
        resultCount={filteredHubs.length}
      />

      <div className="hub-map-v2-layout">
        <div className="hub-map-v2-stage">
          {useGoogleMaps ? (
            <GoogleConnectivityMap apiKey={googleMapsApiKey!} {...mapProps} />
          ) : (
            <LeafletConnectivityMap {...mapProps} />
          )}

          {selectedHub && (
            <div className="lg:hidden">
              <HubSheet hub={selectedHub} onClose={() => setSelectedHubId(null)} />
            </div>
          )}

          {listOpen && (
            <HubListDrawer
              hubs={hubsWithDistance}
              selectedHubId={selectedHubId}
              onSelectHub={handleSelectHub}
              onClose={() => setListOpen(false)}
            />
          )}
        </div>

        <div className="hidden lg:block">
          <HubSidebar
            hubs={hubsWithDistance}
            selectedHubId={selectedHubId}
            onSelectHub={handleSelectHub}
          />
        </div>
      </div>

      <HubMapFooter liveOnly />

      {geoError && <p className="hub-map-error">{geoError}</p>}
    </div>
  );
}
