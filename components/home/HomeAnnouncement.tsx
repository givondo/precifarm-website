import Link from "next/link";
import { announcementBar } from "@/lib/brand-messaging";

export default function HomeAnnouncement() {
  return (
    <div className="home-announcement border-b border-border bg-forest-900">
      <div className="page-container flex items-center justify-between gap-1.5 py-1 sm:gap-2 sm:py-2.5">
        <p className="home-announcement-text min-w-0 flex-1 truncate text-[9px] font-medium leading-none tracking-wide text-white/75 sm:hidden">
          {announcementBar.textMobile}
        </p>
        <p className="hidden min-w-0 flex-1 text-xs font-medium leading-snug tracking-wide text-white/85 sm:block sm:text-sm">
          {announcementBar.textShort}
        </p>
        <Link
          href={announcementBar.href}
          aria-label={announcementBar.label}
          className="home-announcement-link link-touch shrink-0 text-[9px] font-semibold text-charge-300 transition-colors hover:text-white sm:text-xs"
        >
          <span className="sm:hidden" aria-hidden="true">
            →
          </span>
          <span className="hidden sm:inline">{announcementBar.label} →</span>
        </Link>
      </div>
    </div>
  );
}
