import BookNowLink from "@/components/BookNowLink";
import HubImage from "@/components/HubImage";
import { bookingHighlights, nairobiKisumuRoute } from "@/lib/route";

const hubFeatures = ["Solar canopy", "DC fast charge", "Multi-bay hub"] as const;

const trustItems = ["Electric coaches", "M-Pesa checkout", "SMS tickets"] as const;

export default function HomeRouteShowcase() {
  return (
    <section className="home-showcase-section border-b border-border py-10 sm:py-12">
      <div className="page-container">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <div className="home-showcase-frame lg:sticky lg:top-24">
            <div className="home-showcase-image">
              <HubImage
                variant="showcasePremium"
                aspectClass="aspect-[5/4] sm:aspect-[16/10] lg:aspect-[4/5]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                <div className="flex flex-wrap gap-1.5">
                  {hubFeatures.map((item) => (
                    <span key={item} className="home-showcase-badge">
                      <span className="h-1 w-1 rounded-full bg-green-400" aria-hidden />
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-3 max-w-sm text-base font-semibold leading-snug text-white sm:text-lg">
                  Large-scale EV charging built for Kenya&apos;s intercity routes
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
                Book today
              </p>
              <span className="rounded-full border border-charge-200 bg-charge-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-charge-700">
                Route hub energy
              </span>
            </div>

            <h2 className="heading-display mt-3 text-2xl sm:text-3xl lg:text-[2rem] lg:leading-tight">
              Nairobi to Kisumu on
              <span className="block text-charge-600">scheduled electric coaches</span>
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-forest-600 sm:text-base">
              Reserved DC charging at Precifarm solar-canopy hubs keeps every departure on
              timetable — pick your seat, pay with M-Pesa and receive your SMS ticket instantly.
            </p>

            <div className="home-showcase-panel mt-5">
              <div className="home-showcase-stat-grid">
                <div className="home-showcase-stat">
                  <p className="home-showcase-stat-label">Duration</p>
                  <p className="home-showcase-stat-value">{nairobiKisumuRoute.duration}</p>
                </div>
                <div className="home-showcase-stat">
                  <p className="home-showcase-stat-label">Distance</p>
                  <p className="home-showcase-stat-value">{nairobiKisumuRoute.distance}</p>
                </div>
                <div className="home-showcase-stat">
                  <p className="home-showcase-stat-label">From</p>
                  <p className="home-showcase-stat-value text-charge-600">
                    KSh {nairobiKisumuRoute.fare.toLocaleString()}
                  </p>
                </div>
                <div className="home-showcase-stat">
                  <p className="home-showcase-stat-label">Coach</p>
                  <p className="home-showcase-stat-value">{nairobiKisumuRoute.vehicle}</p>
                </div>
              </div>

              <div className="home-showcase-panel-divider" aria-hidden />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">
                  Daily departures
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {nairobiKisumuRoute.departures.map((time) => (
                    <span key={time} className="home-showcase-time">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              <div className="home-showcase-panel-divider" aria-hidden />

              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {trustItems.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-xs text-forest-600">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-charge-500" aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {bookingHighlights.slice(0, 4).map((item) => (
                <li key={item.title} className="home-showcase-highlight">
                  <span className="home-showcase-highlight-icon" aria-hidden>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
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
                    <span className="text-forest-600"> — {item.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <BookNowLink className="btn-primary mt-6 inline-flex w-full justify-center rounded-full px-8 py-3 text-sm shadow-md sm:w-auto sm:justify-start">
              Choose departure →
            </BookNowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
