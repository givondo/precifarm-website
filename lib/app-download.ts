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
    title: "Charging Hub",
    text: "See Precifarm, EVChaja, ChargeNet and partner sites across Kenya — filter by fast DC, Boda swap and navigate in maps.",
  },
  {
    title: "The charging range",
    text: "Spark charger, Pulse charger, Pod energy storage, Boda Hub, Depot charging station and Corridor charging — specs and M-Pesa in one place.",
  },
  {
    title: "Home installation quotes",
    text: "Request a Pulse charger or Pod energy storage survey — certified installation, green halo status and three-year aftersale care on M-Pesa.",
  },
  {
    title: "Lipa Pole Pole on any phone",
    text: "Pay deposit and monthly instalments via M-Pesa, USSD or SMS — no bank account required.",
  },
] as const;

export const installSteps = [
  "Tap **Download for Android** below.",
  "When prompted, allow downloads from your browser.",
  "Open the downloaded file. If Android blocks the install, go to Settings → Security and allow installs from your browser.",
  "Tap Install, then open Precifarm to use the Charging Hub or explore the product range.",
] as const;
