"use client";

import { homeHero } from "@/lib/brand-messaging";

export default function HomeHeroVideo() {
  const { src, title } = homeHero.video;

  return (
    <figure className="home-hero-visual relative aspect-video w-full min-h-[12rem] overflow-hidden sm:min-h-[14rem]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        playsInline
        controls
        preload="none"
        aria-label={title}
      />
    </figure>
  );
}
