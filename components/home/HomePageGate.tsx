"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BASE_DURATION_S = 8;
const FINISH_DURATION_S = 1.5;
const EXIT_MS = 600;

type Phase = "loading" | "exiting" | "done";

type Tween = {
  from: number;
  to: number;
  startMs: number;
  durationS: number;
};

function finishDurationFromProgress(current: number): number {
  return FINISH_DURATION_S * (1 - current / 100);
}

export default function HomePageGate({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tweenRef = useRef<Tween | null>(null);
  const finishScheduledRef = useRef(false);

  const cancelTween = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    tweenRef.current = null;
  }, []);

  const tick = useCallback(() => {
    const tween = tweenRef.current;
    if (!tween) return;

    const elapsedS = (performance.now() - tween.startMs) / 1000;
    const t = Math.min(1, elapsedS / tween.durationS);
    const value = tween.from + (tween.to - tween.from) * t;

    progressRef.current = value;
    setProgress(value);

    if (t < 1) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    progressRef.current = tween.to;
    setProgress(tween.to);
    rafRef.current = null;
    tweenRef.current = null;

    if (tween.to >= 100) {
      setPhase("exiting");
    }
  }, []);

  const animateTo = useCallback(
    (target: number, durationS: number) => {
      cancelTween();
      tweenRef.current = {
        from: progressRef.current,
        to: target,
        startMs: performance.now(),
        durationS: Math.max(durationS, 0.12),
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [cancelTween, tick],
  );

  const rushToComplete = useCallback(() => {
    if (progressRef.current >= 100 || finishScheduledRef.current) return;
    finishScheduledRef.current = true;
    animateTo(100, finishDurationFromProgress(progressRef.current));
  }, [animateTo]);

  const handleSkip = useCallback(() => {
    finishScheduledRef.current = true;
    animateTo(100, FINISH_DURATION_S);
  }, [animateTo]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setPhase("done");
      return;
    }

    animateTo(100, BASE_DURATION_S);

    const onLoad = () => rushToComplete();
    if (document.readyState === "complete") {
      queueMicrotask(() => rushToComplete());
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelTween();
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [animateTo, cancelTween, rushToComplete]);

  useEffect(() => {
    if (phase !== "exiting") return;
    document.body.style.overflow = "";
    const timer = window.setTimeout(() => setPhase("done"), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") {
    return <>{children}</>;
  }

  const displayPercent = Math.min(100, Math.floor(progress));
  const lineWidth = Math.min(100, progress);
  const contentHidden = phase === "loading";
  const exiting = phase === "exiting";

  return (
    <>
      <div
        className={contentHidden ? "pointer-events-none opacity-0" : "opacity-100 transition-opacity duration-500"}
        aria-hidden={contentHidden}
      >
        {children}
      </div>

      <div
        className={`home-loader fixed inset-0 z-[200] flex flex-col bg-white ${exiting ? "home-loader--exit" : ""}`}
        role="status"
        aria-live="polite"
        aria-busy={!exiting}
        aria-label={`Loading ${displayPercent} percent`}
      >
        <div className="page-container flex flex-1 flex-col justify-center">
          <p
            id="home-loader-percent"
            className="font-display text-[clamp(3.5rem,16vw,7rem)] font-semibold leading-none tracking-tighter text-forest-950 tabular-nums"
          >
            {displayPercent}
            <span className="ml-1 text-[clamp(1.25rem,4vw,2rem)] font-medium text-forest-400">%</span>
          </p>

          <div className="mt-10 h-px w-full bg-forest-200">
            <div className="h-full bg-forest-900" style={{ width: `${lineWidth}%` }} />
          </div>
        </div>

        <div className="page-container flex justify-end pb-8 sm:pb-10">
          <button type="button" onClick={handleSkip} className="link-touch text-sm font-medium text-forest-600">
            Skip →
          </button>
        </div>
      </div>
    </>
  );
}
