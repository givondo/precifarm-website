/** Precifarm Android app — download metadata for the website. */

export const appDownload = {
  /** Semantic version — keep in sync with mobile app.json */
  version: "1.0.0",
  packageId: "com.precifarm.mobile",
  minAndroid: "8.0",
  /** Static path under public/ or external URL via env */
  apkUrl: process.env.NEXT_PUBLIC_APP_APK_URL?.trim() || "/downloads/precifarm.apk",
  /** Versioned archive (optional direct link) */
  apkVersionedUrl: `/downloads/precifarm-1.0.0.apk`,
  playStoreUrl: null as string | null,
  fileName: "precifarm.apk",
  ios: {
    available: false,
    appStoreUrl: null as string | null,
    minIos: "15.0",
  },
} as const;

/** Full /download page features — EV charging first */
export const appFeatures = [
  {
    title: "Charge Map",
    text: "See Precifarm hub locations, live Nairobi–Kisumu route coverage and planned expansion sites across Kenya.",
  },
  {
    title: "Route hub charging",
    text: "DC fast charging with solar and storage at intercity hubs — reserved windows so buses leave on schedule.",
  },
  {
    title: "Personal home charging",
    text: "Manage your private house charger — monitor sessions, schedules and top-ups on your own property, on your meter.",
  },
  {
    title: "Book Nairobi–Kisumu",
    text: "Pick your date, departure time and seats — same live timetable and M-Pesa checkout as the website.",
  },
] as const;

export const installSteps = [
  "Tap **Download for Android** below.",
  "When prompted, allow downloads from your browser.",
  "Open the downloaded file. If Android blocks the install, go to Settings → Security and allow installs from your browser.",
  "Tap Install, then open Precifarm and book your trip or open the Charge Map.",
] as const;
