import { siteConfig } from "@/lib/seo/config";

/** Android App Links — replace SHA256 with production signing cert fingerprint. */
export async function GET() {
  const raw = process.env.ANDROID_APP_SHA256?.trim();
  const fingerprint =
    raw && raw.length > 0
      ? raw
      : "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99";

  const body = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: siteConfig.androidApp.packageName,
        sha256_cert_fingerprints: [fingerprint],
      },
    },
  ];

  return Response.json(body, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
