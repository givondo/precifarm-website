"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole site.
 *
 * Server components opt in with `data-reveal` (optionally `="fade" | "left" | "right" | "scale"`).
 * Children of a `data-reveal-stagger` parent get incremental delays.
 * Elements already on screen at mount stay visible (no flash); only content below
 * the fold is hidden and revealed as it scrolls in. Reduced motion skips all of it.
 */
export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
      const step = Number(parent.dataset.revealStagger) || 90;
      parent.querySelectorAll<HTMLElement>(":scope > [data-reveal]").forEach((child, index) => {
        child.style.setProperty("--reveal-delay", `${index * step}ms`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const fold = window.innerHeight * 0.92;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      el.classList.add("reveal-pending");
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      document.querySelectorAll(".reveal-pending").forEach((el) => el.classList.remove("reveal-pending"));
    };
  }, [pathname]);

  return null;
}
