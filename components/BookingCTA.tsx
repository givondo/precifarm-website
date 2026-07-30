import dynamic from "next/dynamic";
import { bookingHighlights, nairobiKisumuRoute } from "@/lib/route";

const BookingPortalLazy = dynamic(() => import("@/components/BookingPortal"), {
  loading: () => (
    <div className="card-elevated flex min-h-[28rem] items-center justify-center p-8">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-charge-600 border-t-transparent" />
        <p className="mt-4 text-sm text-forest-500">Loading booking…</p>
      </div>
    </div>
  ),
});

const bookingGrid =
  "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start lg:gap-10";

export default function BookingCTA({
  className = "bg-white",
}: {
  className?: string;
}) {
  return (
    <section
      id="book"
      className={`scroll-mt-20 border-t border-border section-muted ${className}`}
    >
      <div className="page-container section-pad">
        <div className={bookingGrid}>
          <BookingCopy />
          <BookingPortalLazy />
        </div>
      </div>
    </section>
  );
}

function BookingCopy() {
  return (
    <div className="max-w-xl">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-forest-500">
          {nairobiKisumuRoute.label}
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-green-800">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
          {nairobiKisumuRoute.status}
        </span>
      </div>

      <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
        Book your seat on the Yutong U18
      </h2>
      <p className="mt-4 text-base leading-relaxed text-forest-600">
        Scheduled city-to-city service between Nairobi and Kisumu — with reserved
        hub charging, a clear fare and a booking flow built for M-Pesa. Choose
        your departure, pay on your phone and receive your ticket by SMS.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="stat-pill">
          <strong>{nairobiKisumuRoute.duration}</strong>
        </span>
        <span className="stat-pill">
          from <strong>KSh {nairobiKisumuRoute.fare.toLocaleString()}</strong>
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {bookingHighlights.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-3 text-sm leading-relaxed text-forest-700"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-charge-600/10 text-charge-600">
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden
              >
                <path
                  d="M20 6 9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <span className="font-semibold text-forest-900">{item.title}</span>
              {" — "}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
