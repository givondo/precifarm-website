import type { AvailabilityStatus, HubOperator } from "@/lib/hub-locations";
import { availabilityConfig } from "@/lib/hub-locations";

export function createPinSvg(
  availability: AvailabilityStatus,
  operator: HubOperator,
  selected: boolean,
): string {
  const color = availabilityConfig[availability].color;
  const size = selected ? 36 : 28;
  const r = operator === "precifarm" ? 10 : 8;
  const shape =
    operator === "partner"
      ? `<rect x="${size / 2 - r}" y="${size / 2 - r - 4}" width="${r * 2}" height="${r * 2}" rx="2" fill="${color}" stroke="white" stroke-width="2"/>`
      : `<circle cx="${size / 2}" cy="${size / 2 - 4}" r="${r}" fill="${color}" stroke="white" stroke-width="2"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 ${size} ${size + 8}">
    <path d="M${size / 2} ${size + 4} C${size / 2} ${size + 4} ${size / 2 - 12} ${size / 2 + 2} ${size / 2 - 12} ${size / 2 - 6} a12 12 0 1 1 24 0 c0 8 -12 10 -12 10z" fill="${selected ? "#0a120e" : "#14261d"}" stroke="${color}" stroke-width="${selected ? 2.5 : 1.5}" opacity="0.95"/>
    ${shape}
  </svg>`;
}

export function pinDataUrl(
  availability: AvailabilityStatus,
  operator: HubOperator,
  selected: boolean,
): string {
  const svg = createPinSvg(availability, operator, selected);
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
