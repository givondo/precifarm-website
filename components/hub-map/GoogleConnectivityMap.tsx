"use client";

import { useCallback, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  KENYA_CENTER,
  DEFAULT_ZOOM,
  phaseRouteColors,
  routePhases,
  type ChargingHub,
} from "@/lib/hub-locations";
import { pinDataUrl } from "./pin-icons";

type GoogleConnectivityMapProps = {
  hubs: ChargingHub[];
  selectedHubId: string | null;
  onSelectHub: (id: string) => void;
  userLocation: { lat: number; lng: number } | null;
  nearMeActive: boolean;
  apiKey: string;
};

export default function GoogleConnectivityMap({
  hubs,
  selectedHubId,
  onSelectHub,
  userLocation,
  nearMeActive,
  apiKey,
}: GoogleConnectivityMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    id: "precifarm-hub-map",
  });

  const selectedHub = hubs.find((h) => h.id === selectedHubId) ?? null;

  const center = useMemo(() => {
    if (nearMeActive && userLocation) {
      return userLocation;
    }
    if (selectedHub) {
      return { lat: selectedHub.lat, lng: selectedHub.lng };
    }
    return KENYA_CENTER;
  }, [nearMeActive, userLocation, selectedHub]);

  const zoom = nearMeActive && userLocation ? 9 : selectedHub ? 8 : DEFAULT_ZOOM;

  const hubIcons = useMemo(() => {
    if (!isLoaded || typeof google === "undefined") return new Map<string, google.maps.Icon>();
    const icons = new Map<string, google.maps.Icon>();
    for (const hub of hubs) {
      const selected = hub.id === selectedHubId;
      icons.set(hub.id, {
        url: pinDataUrl(hub.availability, hub.operator, selected),
        scaledSize: new google.maps.Size(selected ? 36 : 28, selected ? 44 : 36),
        anchor: new google.maps.Point(selected ? 18 : 14, selected ? 44 : 36),
      });
    }
    return icons;
  }, [hubs, selectedHubId, isLoaded]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      if (nearMeActive && userLocation) {
        map.panTo(userLocation);
        map.setZoom(9);
      }
    },
    [nearMeActive, userLocation],
  );

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center bg-muted text-sm text-forest-500">
        Loading map…
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="h-full w-full"
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
        gestureHandling: "greedy",
      }}
    >
      {routePhases.map((route) => (
        <Polyline
          key={route.id}
          path={route.path}
          options={{
            strokeColor: phaseRouteColors[route.phase],
            strokeWeight: route.phase === "live" ? 4 : route.phase === "next" ? 3 : 2,
            strokeOpacity: route.phase === "live" ? 0.9 : route.phase === "next" ? 0.65 : 0.35,
            icons:
              route.phase === "planned"
                ? [
                    {
                      icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 3 },
                      offset: "0",
                      repeat: "16px",
                    },
                  ]
                : undefined,
          }}
        />
      ))}

      {hubs.map((hub) => (
        <Marker
          key={hub.id}
          position={{ lat: hub.lat, lng: hub.lng }}
          icon={hubIcons.get(hub.id)}
          onClick={() => onSelectHub(hub.id)}
        />
      ))}

      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#3b82f6",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          }}
        />
      )}
    </GoogleMap>
  );
}
