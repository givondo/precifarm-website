"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initWebsiteSession, initClientErrorHandlers, trackPageView } from "@/lib/analytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initWebsiteSession();
    initClientErrorHandlers();
  }, []);

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  return children;
}
