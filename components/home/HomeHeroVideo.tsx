"use client";

import { useState } from "react";
import SiteImage from "@/components/SiteImage";
import { homeHero } from "@/lib/brand-messaging";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="ml-0.5 h-7 w-7 fill-current">
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

export default function HomeHeroVideo() {
  const [playing, setPlaying] = useState(false);
  const { youtubeId, title, posterSrc } = homeHero.video;

  if (playing) {
    return (
      <figure className="home-hero-visual relative aspect-video w-full min-h-[12rem] sm:min-h-[14rem]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-[inherit] border-0"
        />
      </figure>
    );
  }

  return (
    <button
      type="button"
      className="home-hero-visual group relative block aspect-video w-full min-h-[12rem] cursor-pointer overflow-hidden text-left sm:min-h-[14rem]"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <SiteImage
        src={posterSrc}
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 44vw"
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/10 transition duration-300 group-hover:from-black/55"
        aria-hidden
      />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-charge-600 shadow-lg ring-1 ring-black/10 transition duration-300 group-hover:scale-105 group-hover:bg-white">
          <PlayIcon />
        </span>
        <span className="max-w-xs text-sm font-medium text-white drop-shadow-sm sm:text-base">Watch Precifarm in Kenya</span>
      </span>
    </button>
  );
}
