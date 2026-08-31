import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
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
      { source: "/ev-charging/home", destination: "/charging/private-house", permanent: true },
      { source: "/ev-charging/private-house", destination: "/charging/private-house", permanent: true },
      { source: "/ev-charging/fleet", destination: "/partners", permanent: true },
      { source: "/ev-charging/dc-fast-charging", destination: "/charging", permanent: true },
      { source: "/ev-charging/m-pesa", destination: "/charging/private-house", permanent: true },
      { source: "/book", destination: "/charging", permanent: true },
      { source: "/book/:path*", destination: "/charging", permanent: true },
      { source: "/charging/home", destination: "/charging/private-house", permanent: true },
      { source: "/faq/precifarm-booking-faq", destination: "/faq", permanent: true },
      { source: "/sw/faq/precifarm-booking-faq", destination: "/faq", permanent: true },
    ];
  },
  async headers() {
    return [
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
