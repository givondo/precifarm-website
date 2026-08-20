import type { AvailabilityStatus, HubOperator, HubSiteKind } from "@/lib/hub-locations";
import { availabilityConfig, siteKindConfig } from "@/lib/hub-locations";

export function createPinSvg(
  availability: AvailabilityStatus,
  operator: HubOperator,
  siteKind: HubSiteKind,
  selected: boolean,
): string {
  const availColor = availabilityConfig[availability].color;
  const accent = siteKind === "swap" ? siteKindConfig.swap.pinColor : availColor;
  const size = selected ? 36 : 28;
  const cx = size / 2;
  const cy = size / 2 - 4;

  const shape =
    siteKind === "swap"
      ? `<polygon points="${cx},${cy - 9} ${cx + 8},${cy} ${cx},${cy + 9} ${cx - 8},${cy}" fill="${accent}" stroke="white" stroke-width="2"/>`
      : operator === "partner"
        ? `<rect x="${cx - 8}" y="${cy - 8}" width="16" height="16" rx="2" fill="${accent}" stroke="white" stroke-width="2"/>`
        : `<circle cx="${cx}" cy="${cy}" r="9" fill="${accent}" stroke="white" stroke-width="2"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 ${size} ${size + 8}">
    <path d="M${cx} ${size + 4} C${cx} ${size + 4} ${cx - 12} ${size / 2 + 2} ${cx - 12} ${size / 2 - 6} a12 12 0 1 1 24 0 c0 8 -12 10 -12 10z" fill="${selected ? "#0a120e" : "#14261d"}" stroke="${accent}" stroke-width="${selected ? 2.5 : 1.5}" opacity="0.95"/>
    ${shape}
  </svg>`;
}

export function pinDataUrl(
  availability: AvailabilityStatus,
  operator: HubOperator,
  siteKind: HubSiteKind,
  selected: boolean,
): string {
  const svg = createPinSvg(availability, operator, siteKind, selected);
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
