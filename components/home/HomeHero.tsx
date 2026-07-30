import dynamic from "next/dynamic";
import HubImage from "@/components/HubImage";
import { homeHero } from "@/lib/home-hero";
import { nairobiKisumuRoute } from "@/lib/route";

const BookingPortalLazy = dynamic(() => import("@/components/BookingPortal"), {
  loading: () => (
    <div className="home-hero-portal-skeleton card-elevated flex min-h-[28rem] items-center justify-center p-8">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-charge-600 border-t-transparent" />
        <p className="mt-4 text-sm text-forest-500">Loading booking…</p>
      </div>
    </div>
  ),
});

const uspIcons = [
  (
    <path
      key="bolt"
      d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  (
    <path
      key="phone"
      d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  (
    <>
      <path key="hub-a" d="M4 14h16" strokeLinecap="round" />
      <path key="hub-b" d="M8 10V6a4 4 0 0 1 8 0v4" strokeLinecap="round" />
      <path key="hub-c" d="M6 14v4h12v-4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
] as const;

export default function HomeHero() {
  return (
    <section id="book" className="home-hero scroll-mt-20">
      <div className="home-hero-glow" aria-hidden />
      <div className="page-container home-hero-container">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <h1 className="home-hero-title">
              {homeHero.headline}
              <span className="home-hero-title-accent">{homeHero.headlineAccent}</span>
            </h1>

            <p className="home-hero-lead">{homeHero.whatWeDo}</p>

            <ul className="home-hero-usp">
              {homeHero.usp.map((item, index) => (
                <li key={item.title} className="home-hero-usp-item">
                  <span className="home-hero-usp-icon" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      {uspIcons[index]}
                    </svg>
                  </span>
                  <span>
                    <span className="home-hero-usp-title">{item.title}</span>
                    <span className="home-hero-usp-text">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="home-hero-visual">
              <HubImage
                variant="intercityCharger"
                aspectClass="aspect-[16/9] sm:aspect-[21/9]"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="home-hero-visual-caption">
                <span>Intercity route hub · Kenya</span>
              </div>
            </div>

            <div className="home-hero-departures">
              <div className="home-hero-departures-head">
                <p className="home-hero-departures-title">Today&apos;s departures</p>
                <p className="home-hero-departures-meta">
                  {nairobiKisumuRoute.duration} · from KSh{" "}
                  {nairobiKisumuRoute.fare.toLocaleString()}
                </p>
              </div>
              <div className="home-hero-departure-times">
                {nairobiKisumuRoute.departures.map((time) => (
                  <span key={time} className="home-hero-departure-chip">
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="home-hero-book">
            <div className="home-hero-portal-wrap">
              <p className="home-hero-portal-label">Book your seat</p>
              <BookingPortalLazy />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
