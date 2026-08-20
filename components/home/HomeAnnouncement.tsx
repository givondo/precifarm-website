import Link from "next/link";
import { announcementBar } from "@/lib/brand-messaging";

export default function HomeAnnouncement() {
  return (
    <div className="border-b border-border bg-forest-900">
      <div className="page-container flex flex-wrap items-center justify-between gap-2 py-2.5">
        <p className="text-xs font-medium tracking-wide text-white/85 sm:text-sm">{announcementBar.text}</p>
        <Link
          href={announcementBar.href}
          className="text-xs font-semibold text-charge-300 transition-colors hover:text-white"
        >
          {announcementBar.label} →
        </Link>
      </div>
    </div>
  );
}
