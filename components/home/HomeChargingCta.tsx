import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { chargingOfferings } from "@/lib/charging";
import { homeChargingHighlight } from "@/lib/home-charging";

export default function HomeChargingCta() {
  const { home } = chargingOfferings;

  return (
    <section className="home-charging-cta border-t border-border bg-white">
      <div className="page-container home-charging-container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="home-charging-image">
            <SiteImage
              src={home.image}
              alt={home.imageAlt}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
            />
          </div>

          <div className="home-charging-inner">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {homeChargingHighlight.eyebrow}
            </p>
            <h2 className="home-charging-title">{homeChargingHighlight.title}</h2>
            <div className="home-charging-body">
              {homeChargingHighlight.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="home-charging-actions">
              <Link href={homeChargingHighlight.primaryHref} className="home-charging-btn-primary">
                {homeChargingHighlight.primaryLabel}
              </Link>
              <Link href={homeChargingHighlight.secondaryHref} className="home-charging-btn-secondary">
                {homeChargingHighlight.secondaryLabel}
              </Link>
              <Link href={homeChargingHighlight.tertiaryHref} className="home-charging-btn-tertiary">
                {homeChargingHighlight.tertiaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
