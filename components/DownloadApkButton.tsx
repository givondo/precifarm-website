"use client";

import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  download: string;
  className?: string;
  children: React.ReactNode;
};

export default function DownloadApkButton({ href, download, className, children }: Props) {
  return (
    <a
      href={href}
      download={download}
      className={className}
      onClick={() => trackEvent("website_app_download_clicked", { href })}
    >
      {children}
    </a>
  );
}
