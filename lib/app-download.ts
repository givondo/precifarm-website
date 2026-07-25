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
} as const;

export const appFeatures = [
  {
    title: "Book Nairobi–Kisumu",
    text: "Pick your date, departure time and seats — same live timetable as the website.",
  },
  {
    title: "M-Pesa Express STK",
    text: "Pay with M-Pesa on your phone. Payment is processed securely through our CMS.",
  },
  {
    title: "Cargo waybills",
    text: "Send parcels on the ET01 cargo van, including optional last-mile delivery.",
  },
  {
    title: "Ticket & waybill lookup",
    text: "Find bookings by reference or phone number after you travel.",
  },
] as const;

export const installSteps = [
  "Tap **Download for Android** below.",
  "When prompted, allow downloads from your browser.",
  "Open the downloaded file. If Android blocks the install, go to Settings → Security and allow installs from your browser.",
  "Tap Install, then open Precifarm and book your trip.",
] as const;
