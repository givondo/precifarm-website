import type { NextConfig } from "next";

/**
 * Applied to every route. CSP is deliberately absent as Next.js inlines styles and
 * JSON-LD, so it needs a nonce-based policy rolled out Report-Only first.
 */
const securityHeaders = [
 { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
 { key: "X-Content-Type-Options", value: "nosniff" },
 { key: "X-Frame-Options", value: "SAMEORIGIN" },
 { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
 { key: "Permissions-Policy", value: "camera=(), microphone=(), payment=()" },
];

const nextConfig: NextConfig = {
 output: "standalone",
 poweredByHeader: false,
 images: {
 formats: ["image/avif", "image/webp"],
 localPatterns: [
 {
 pathname: "/images/**",
 },
 ],
 remotePatterns: [
 {
 protocol: "https",
 hostname: "upload.wikimedia.org",
 pathname: "/wikipedia/commons/**",
 },
 ],
 },
 async redirects() {
 return [
 // Keep legacy /learn paths on FAQ; live guide pages live under /guides.
 { source: "/learn", destination: "/faq", permanent: true },
 { source: "/learn/:path*", destination: "/faq", permanent: true },
 { source: "/electric-vehicles/kenya", destination: "/evs", permanent: true },
 { source: "/ev-charging", destination: "/charging", permanent: true },
 { source: "/ev-charging/kenya", destination: "/charging", permanent: true },
 { source: "/ev-charging/nairobi", destination: "/charging", permanent: true },
 { source: "/ev-charging/home", destination: "/charging/home", permanent: true },
 { source: "/ev-charging/private-house", destination: "/charging/home", permanent: true },
 { source: "/ev-charging/fleet", destination: "/partners", permanent: true },
 { source: "/ev-charging/dc-fast-charging", destination: "/charging", permanent: true },
 { source: "/ev-charging/m-pesa", destination: "/charging/home", permanent: true },
 { source: "/book", destination: "/charging", permanent: true },
 { source: "/book/:path*", destination: "/charging", permanent: true },
 { source: "/charging/private-house", destination: "/charging/home", permanent: true },
 { source: "/network", destination: "/charging", permanent: true },
 { source: "/faq/precifarm-booking-faq", destination: "/faq", permanent: true },
 { source: "/sw/faq/precifarm-booking-faq", destination: "/faq", permanent: true },
 // Retired passenger-booking content as Precifarm does not operate vehicles.
 // Direct /learn redirect avoids a /learn → /guides → /guides chain.
 { source: "/guides/book-nairobi-kisumu-coach", destination: "/faq", permanent: true },
 { source: "/learn/book-nairobi-kisumu-coach", destination: "/faq", permanent: true },
 {
 source: "/charging/modular-energy/megapack-grid",
 destination: "/charging/modular-energy/megapack",
 permanent: true,
 },
 {
 source: "/charging/modular-energy/pod",
 destination: "/charging/modular-energy/mini-stack",
 permanent: true,
 },
 { source: "/charging/modular-energy/pod-stack",
 destination: "/charging/modular-energy/mini-stack",
 permanent: true,
 },
 { source: "/ai", destination: "/agent", permanent: true },
 { source: "/ai-agent", destination: "/agent", permanent: true },
 { source: "/precifarm-agent", destination: "/agent", permanent: true },
 // Legacy marketing site / WordPress (GSC 5xx & 404 cleanup)
 { source: "/financing", destination: "/charging/home", permanent: true },
 { source: "/terms", destination: "/legal/terms", permanent: true },
 { source: "/privacy", destination: "/legal/privacy", permanent: true },
 { source: "/cities/:slug", destination: "/locations/:slug", permanent: true },
 { source: "/products/commercial", destination: "/partners", permanent: true },
 { source: "/products/solar-irrigation", destination: "/charging/modular-energy", permanent: true },
 { source: "/products/:path*", destination: "/charging", permanent: true },
 { source: "/blog", destination: "/guides", permanent: true },
 { source: "/blog/:path*", destination: "/guides", permanent: true },
 // Swahili stubs → English routes (only /sw and /sw/faq/:slug exist today)
 { source: "/sw/training", destination: "/training", permanent: true },
 { source: "/sw/download", destination: "/download", permanent: true },
 { source: "/sw/faq", destination: "/faq", permanent: true },
 { source: "/sw/charging/:path*", destination: "/charging/:path*", permanent: true },
 ];
 },
 async headers() {
 return [
 {
 source: "/:path*",
 headers: securityHeaders,
 },
 {
 source: "/opengraph-image",
 headers: [
 { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
 ],
 },
 {
 source: "/manifest.webmanifest",
 headers: [
 { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
 ],
 },
 {
 source: "/downloads/:file*.apk",
 headers: [
 {
 key: "Content-Type",
 value: "application/vnd.android.package-archive",
 },
 {
 key: "Content-Disposition",
 value: 'attachment; filename="precifarm.apk"',
 },
 {
 key: "Cache-Control",
 value: "public, max-age=3600",
 },
 ],
 },
 ];
 },
};

export default nextConfig;
