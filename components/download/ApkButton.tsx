"use client";

import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  download: string;
  className?: string;
  children: React.ReactNode;
};

export default function ApkButton({ href, download, className, children }: Props) {
  return (
    <a
      href={href}
      download={download}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
      }
      onClick={() => trackEvent("website_app_download_clicked", { href })}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M17.6 9.48l1.84-3.18c.16-.27.07-.62-.2-.78a.57.57 0 0 0-.78.2l-1.87 3.24a9.05 9.05 0 0 0-7.22 0L7.4 5.72a.57.57 0 0 0-.78-.2.57.57 0 0 0-.2.78L8.4 9.48A8.9 8.9 0 0 0 4 16v1a1 1 0 0 0 1 1h1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h6v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h1a1 1 0 0 0 1-1v-1a8.9 8.9 0 0 0-4.4-6.52zM6 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm12 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
      {children}
    </a>
  );
}
