/** Clean, minimal Google Maps styling for hub connectivity */
export const googleHubMapStyles = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#737373" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dbeafe" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#525252" }] },
] as google.maps.MapTypeStyle[];

export const cartoTileUrl =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

export const cartoAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
