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
 { source: "/learn", destination: "/guides", permanent: true },
 { source: "/learn/:path*", destination: "/guides/:path*", permanent: true },
 { source: "/electric-vehicles/kenya", destination: "/evs", permanent: true },
 { source: "/ev-charging", destination: "/charging", permanent: true },
 { source: "/ev-charging/kenya", destination: "/charging", permanent: true },
 { source: "/ev-charging/nairobi", destination: "/locations", permanent: true },
 { source: "/ev-charging/home", destination: "/charging/home", permanent: true },
 { source: "/ev-charging/private-house", destination: "/charging/home", permanent: true },
 { source: "/ev-charging/fleet", destination: "/partners", permanent: true },
 { source: "/ev-charging/dc-fast-charging", destination: "/charging", permanent: true },
 { source: "/ev-charging/m-pesa", destination: "/charging/home", permanent: true },
 { source: "/book", destination: "/charging", permanent: true },
 { source: "/book/:path*", destination: "/charging", permanent: true },
 { source: "/charging/private-house", destination: "/charging/home", permanent: true },
 { source: "/network", destination: "/hub", permanent: true },
 { source: "/faq/precifarm-booking-faq", destination: "/faq", permanent: true },
 { source: "/sw/faq/precifarm-booking-faq", destination: "/faq", permanent: true },
 // Retired passenger-booking content as Precifarm does not operate vehicles.
 // Direct /learn redirect avoids a /learn → /guides → /guides chain.
 { source: "/guides/book-nairobi-kisumu-coach", destination: "/guides", permanent: true },
 { source: "/learn/book-nairobi-kisumu-coach", destination: "/guides", permanent: true },
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
 ];
 },
 async headers() {
 return [
 {
 source: "/:path*",
 headers: securityHeaders,
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
