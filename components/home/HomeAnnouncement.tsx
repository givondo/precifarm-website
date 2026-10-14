import Link from "next/link";
import { announcementBar } from "@/lib/brand-messaging";

export default function HomeAnnouncement() {
  return (
    <div className="border-b border-border bg-forest-900">
      <div className="page-container flex flex-col items-start gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium leading-snug tracking-wide text-white/85 sm:text-sm">{announcementBar.textShort}</p>
        <Link
          href={announcementBar.href}
          className="link-touch text-xs font-semibold text-charge-300 transition-colors hover:text-white"
        >
          {announcementBar.label} →
        </Link>
      </div>
    </div>
  );
}
