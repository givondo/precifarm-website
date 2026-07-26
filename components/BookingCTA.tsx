import dynamic from "next/dynamic";
import BookingPortal from "@/components/BookingPortal";
import { bookingHighlights, nairobiKisumuRoute } from "@/lib/route";

const BookingPortalLazy = dynamic(() => import("@/components/BookingPortal"), {
  loading: () => (
    <div className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-border bg-white p-8">
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
  hero = false,
}: {
  className?: string;
  hero?: boolean;
}) {
  if (!hero) {
    return (
      <section
        id="book"
        className={`scroll-mt-20 border-t border-border ${className}`}
      >
        <div className="page-container section-pad">
          <div className={bookingGrid}>
            <BookingCopy />
            <BookingPortal />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="book"
      className={`scroll-mt-20 bg-white ${className}`}
    >
      <div className="page-container py-8 sm:py-10 lg:py-12">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:gap-10">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">
                {nairobiKisumuRoute.label}
              </p>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-forest-600">
                {nairobiKisumuRoute.status}
              </span>
            </div>

            <h1 className="mt-3 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-forest-900 sm:text-4xl">
              Electric transport infrastructure
              <span className="block text-charge-600">for Kenya.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-forest-600">
              Precifarm is building the charging hubs and operating network that
              make electric travel between Kenyan cities dependable, affordable
              and easy to book. Nairobi–Kisumu is where we are proving it first.
            </p>
            <p className="mt-4 text-sm tabular-nums text-forest-600">
              <span className="font-semibold text-forest-900">
                {nairobiKisumuRoute.duration}
              </span>
              {" · "}
              <span className="font-semibold text-forest-900">
                {nairobiKisumuRoute.distance}
              </span>
              {" · "}
              <span className="font-semibold text-forest-900">
                KSh {nairobiKisumuRoute.fare.toLocaleString()}
              </span>
              {" per seat"}
            </p>

            <p className="mt-6 text-sm text-forest-500">
              Departures daily · {nairobiKisumuRoute.departures.join(", ")} · National ID
              required at boarding
            </p>
          </div>

          <div className="relative z-0 w-full lg:sticky lg:top-24 lg:justify-self-end">
            <BookingPortalLazy />
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingCopy() {
  return (
    <div className="max-w-xl">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-charge-600">
          {nairobiKisumuRoute.label}
        </p>
        <span className="rounded-full bg-charge-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-charge-600">
          {nairobiKisumuRoute.status}
        </span>
      </div>

      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
        Book your seat on the Yutong U18
      </h2>
      <p className="mt-4 text-base leading-relaxed text-forest-600/85">
        Scheduled city-to-city service between Nairobi and Kisumu — with reserved
        hub charging, a clear fare and a booking flow built for M-Pesa. Choose
        your departure, pay on your phone and receive your ticket by SMS.
      </p>

      <p className="mt-5 text-sm text-forest-600">
        <span className="font-semibold text-forest-900">{nairobiKisumuRoute.duration}</span>
        {" "}journey ·{" "}
        <span className="font-semibold text-forest-900">{nairobiKisumuRoute.distance}</span>
        {" "}· From{" "}
        <span className="font-semibold text-forest-900">
          KSh {nairobiKisumuRoute.fare.toLocaleString()}
        </span>{" "}
        per seat
      </p>

      <ul className="mt-6 space-y-3">
        {bookingHighlights.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-forest-700"
          >
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-4 w-4 shrink-0 text-charge-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M20 6 9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
