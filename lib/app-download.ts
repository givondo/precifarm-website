/** Precifarm AI companion — download metadata for the website. APK filename stays precifarm.apk. */

export const appBrand = {
  shortName: "AI companion",
  fullName: "Precifarm AI companion",
} as const;

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
