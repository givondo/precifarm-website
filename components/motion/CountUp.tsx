"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));
const format = (n: number) => n.toLocaleString("en-KE");

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * The server renders the final value; frames write straight to the DOM (no React re-renders).
 */
export default function CountUp({ value, prefix = "", suffix = "", durationMs = 1600, className }: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = format(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          el.textContent = format(Math.round(value * easeOutExpo(t)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = format(value);
    };
  }, [value, durationMs]);

  return (
    <span className={className}>
      {prefix}
      <span ref={numberRef} className="tabular-nums">
        {format(value)}
      </span>
      {suffix}
    </span>
  );
}
