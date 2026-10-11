import Link from "next/link";
import { Fragment } from "react";
import SiteImage from "@/components/SiteImage";
import HomeFilmButton from "@/components/home/HomeFilmButton";
import { announcementBar, homeHero } from "@/lib/brand-messaging";
import { homePageImages } from "@/lib/home-page-images";

function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      {index > 0 && " "}
      <span className="hx-word">
        <span style={{ animationDelay: `${(offset + index) * 70 + 150}ms` }}>{word}</span>
      </span>
    </Fragment>
  ));
}

export default function HomeHero() {
  const headlineWords = homeHero.headline.split(" ").length;

  return (
    <section id="charging" className="hx-hero" aria-labelledby="home-hero-title">
      <div className="hx-hero-media">
        <SiteImage
          src={homePageImages.hero.src}
          alt={homePageImages.hero.alt}
          fill
          priority
          sizes="100vw"
          className="hx-hero-img object-cover"
        />
      </div>
      <div className="hx-hero-shade" aria-hidden />

      <div className="hx-container hx-hero-content">
        <Link href={announcementBar.href} className="hx-chip hx-rise" style={{ animationDelay: "60ms" }}>
          <span className="hx-chip-dot" aria-hidden />
          {announcementBar.textShort}
          <span aria-hidden>→</span>
        </Link>

        <p className="hx-eyebrow hx-rise mt-8" style={{ animationDelay: "120ms" }}>
          {homeHero.eyebrow}
        </p>
        <h1 id="home-hero-title" className="hx-display mt-4">
          <SplitWords text={homeHero.headline} />
          <span className="hx-display-accent block">
            <SplitWords text={homeHero.headlineAccent} offset={headlineWords} />
          </span>
        </h1>
        <p className="hx-lead hx-rise mt-6 max-w-xl" style={{ animationDelay: "750ms" }}>
          {homeHero.whatWeDo}
        </p>

        <div className="hx-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "880ms" }}>
          <Link href={homeHero.primaryCta.href} className="hx-btn hx-btn-solid">
            <span>{homeHero.primaryCta.label}</span>
          </Link>
          <Link href={homeHero.secondaryCta.href} className="hx-btn">
            <span>{homeHero.secondaryCta.label}</span>
          </Link>
          <HomeFilmButton youtubeId={homeHero.video.youtubeId} title={homeHero.video.title} />
        </div>
      </div>

      <a href="#home-panels" className="hx-scroll-cue" aria-label="Scroll to products">
        <span className="hx-scroll-cue-line" aria-hidden />
      </a>
    </section>
  );
}
