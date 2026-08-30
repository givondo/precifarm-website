import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { heroStats, homeHero } from "@/lib/brand-messaging";
import { productImages } from "@/lib/product-images";

export default function HomeHero() {
  return (
    <section id="charging" className="home-hero scroll-mt-20">
      <div className="page-container home-hero-container">
        <div className="home-hero-grid home-hero-grid-simple">
          <div className="home-hero-copy">
            <p className="text-sm text-forest-500">{homeHero.eyebrow}</p>
            <h1 className="home-hero-title mt-5">
              {homeHero.headline}
              <span className="home-hero-title-accent">{homeHero.headlineAccent}</span>
            </h1>
            <p className="home-hero-lead">{homeHero.whatWeDo}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link href={homeHero.primaryCta.href} className="btn-primary rounded-full px-6 py-3 text-sm">
                {homeHero.primaryCta.label}
              </Link>
              <Link href={homeHero.secondaryCta.href} className="link-touch text-sm font-medium">
                {homeHero.secondaryCta.label} ›
              </Link>
            </div>

            <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3 sm:gap-6">
              {heroStats.map((item) => (
                <div key={item.stat}>
                  <dt className="font-mono text-xl font-semibold tracking-tight text-forest-900 sm:text-2xl">
                    {item.stat}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-forest-500 sm:text-sm">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="home-hero-visual">
            <SiteImage
              src={productImages.chargingEcosystemHero.src}
              alt={productImages.chargingEcosystemHero.alt}
              width={1600}
              height={1200}
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="aspect-[4/3] h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
