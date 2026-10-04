import Link from "next/link";
import HomeHeroVideo from "@/components/home/HomeHeroVideo";
import { heroStats, homeHero } from "@/lib/brand-messaging";

export default function HomeHero() {
  return (
    <section id="charging" className="home-hero scroll-mt-20">
      <div className="page-container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 max-w-xl lg:order-1 lg:py-2">
            <p className="text-eyebrow">{homeHero.eyebrow}</p>
            <h1 className="heading-display mt-4 text-[2rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
              {homeHero.headline}
              <span className="block text-forest-700">{homeHero.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-forest-600 sm:text-lg">{homeHero.whatWeDo}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link href={homeHero.primaryCta.href} className="btn-primary">
                {homeHero.primaryCta.label}
              </Link>
              <Link href={homeHero.secondaryCta.href} className="link-touch text-sm font-medium">
                {homeHero.secondaryCta.label} ›
              </Link>
            </div>

            <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2 sm:gap-6">
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

          <div className="order-1 w-full lg:order-2">
            <HomeHeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
