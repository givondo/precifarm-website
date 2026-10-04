import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { homeChargingHighlight } from "@/lib/home-charging";

export default function HomeChargingCta() {
  return (
    <section className="home-section border-b border-border bg-white">
      <div className="page-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-muted/20 p-4 sm:p-6">
            <SiteImage
              src={homeChargingHighlight.image}
              alt={homeChargingHighlight.imageAlt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-contain"
            />
          </div>

          <div>
            <p className="text-eyebrow">{homeChargingHighlight.eyebrow}</p>
            <h2 className="heading-display mt-3 text-2xl text-forest-900 sm:text-3xl">
              {homeChargingHighlight.title}
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-forest-600 sm:text-base">
              {homeChargingHighlight.paragraphs.map((paragraph) => (
                <li key={paragraph} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-charge-500" aria-hidden />
                  <span>{paragraph}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link href={homeChargingHighlight.primaryHref} className="btn-primary">
                {homeChargingHighlight.primaryLabel}
              </Link>
              <Link href={homeChargingHighlight.secondaryHref} className="link-touch text-sm font-semibold">
                {homeChargingHighlight.secondaryLabel} ›
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
