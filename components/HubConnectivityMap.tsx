"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import {
  chargingHubs,
  filterHubs,
  routePhases,
  sortHubsByDistance,
  type HubFilter,
} from "@/lib/hub-locations";
import HubDetailPanel from "./hub-map/HubDetailPanel";
import HubMapControls from "./hub-map/HubMapControls";

const LeafletConnectivityMap = dynamic(
  () => import("./hub-map/LeafletConnectivityMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-muted text-sm text-forest-500">
        Loading map…
      </div>
    ),
  },
);

const GoogleConnectivityMap = dynamic(
  () => import("./hub-map/GoogleConnectivityMap"),
  { ssr: false },
);

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const useGoogleMaps = Boolean(googleMapsApiKey);

export default function HubConnectivityMap() {
  const [filter, setFilter] = useState<HubFilter>("all");
  const [selectedHubId, setSelectedHubId] = useState<string | null>("nairobi");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearMeActive, setNearMeActive] = useState(false);
  const [nearMeLoading, setNearMeLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const filteredHubs = useMemo(
    () => filterHubs(chargingHubs, filter),
    [filter],
  );

  const hubsWithDistance = useMemo(() => {
    if (!userLocation) return filteredHubs.map((h) => ({ ...h, distanceKm: undefined }));
    return sortHubsByDistance(filteredHubs, userLocation.lat, userLocation.lng);
  }, [filteredHubs, userLocation]);

  const selectedHub =
    hubsWithDistance.find((h) => h.id === selectedHubId) ??
    hubsWithDistance[0] ??
    null;

  const handleNearMe = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported in this browser.");
      return;
    }
    setNearMeLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setNearMeActive(true);
        setNearMeLoading(false);
      },
      () => {
        setGeoError("Could not access your location. Check browser permissions.");
        setNearMeLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const handleSelectHub = useCallback((id: string) => {
    setSelectedHubId(id);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[min(70vh,560px)] min-h-[420px] overflow-hidden rounded-2xl border border-border shadow-lg">
        {useGoogleMaps ? (
          <GoogleConnectivityMap
            apiKey={googleMapsApiKey!}
            hubs={filteredHubs}
            selectedHubId={selectedHubId}
            onSelectHub={handleSelectHub}
            userLocation={userLocation}
            nearMeActive={nearMeActive}
          />
        ) : (
          <LeafletConnectivityMap
            hubs={filteredHubs}
            selectedHubId={selectedHubId}
            onSelectHub={handleSelectHub}
            userLocation={userLocation}
            nearMeActive={nearMeActive}
          />
        )}

        <HubMapControls
          activeFilter={filter}
          onFilterChange={setFilter}
          onNearMe={handleNearMe}
          nearMeLoading={nearMeLoading}
          nearMeActive={nearMeActive}
          hubCount={filteredHubs.length}
        />

        {selectedHub && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-[1000] sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-20 sm:w-72 lg:w-80">
            <HubDetailPanel
              hub={selectedHub}
              onClose={() => setSelectedHubId(null)}
            />
          </div>
        )}
      </div>

      {geoError && (
        <p className="mt-3 text-center text-xs text-red-600">{geoError}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-forest-600/80">
        {routePhases.map((route) => (
          <span key={route.id} className="flex items-center gap-2">
            <span
              className="h-1 w-6 rounded-full"
              style={{
                backgroundColor:
                  route.phase === "planned"
                    ? "#94a3b8"
                    : route.phase === "live"
                      ? "#2563eb"
                      : "#fbbf24",
                opacity: route.phase === "planned" ? 0.7 : 1,
              }}
            />
            {route.label}
          </span>
        ))}
        <span className="text-forest-400">
          · {useGoogleMaps ? "Google Maps" : "OpenStreetMap"} · demo availability
        </span>
      </div>
    </div>
  );
}
