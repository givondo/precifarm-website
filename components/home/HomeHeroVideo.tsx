"use client";

import { useEffect, useState } from "react";
import { homeHero } from "@/lib/brand-messaging";

const MOBILE_MAX_WIDTH = 767;

export default function HomeHeroVideo() {
  const { src, srcMobile, posterSrc, title } = homeHero.video;
  const [activeSrc, setActiveSrc] = useState<string>(src);

  useEffect(() => {
    const pick = () => {
      const mobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
      setActiveSrc(mobile && srcMobile ? srcMobile : src);
    };
    pick();
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, [src, srcMobile]);

  return (
    <figure className="home-hero-visual relative aspect-video w-full min-h-[11rem] overflow-hidden sm:min-h-[14rem]">
      <video
        key={activeSrc}
        className="absolute inset-0 h-full w-full object-cover"
        src={activeSrc}
        poster={posterSrc}
        playsInline
        controls
        preload="none"
        aria-label={title}
      />
    </figure>
  );
}
