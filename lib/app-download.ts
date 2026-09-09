/** Precifarm Agent — desktop download metadata. */

export const appBrand = {
  shortName: "Agent",
  fullName: "Precifarm Agent",
} as const;

export const appDownload = {
  version: "1.0.0",
  platform: "desktop" as const,
  available: false,
  pageHref: "/download",
  productHref: "/agent",
  requestAccessHref: "/contact?interest=agent-desktop",
  platforms: [
    { id: "windows", label: "Windows", status: "coming_soon" as const },
    { id: "macos", label: "macOS", status: "coming_soon" as const },
  ],
} as const;
