"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type HomeFilmButtonProps = { youtubeId: string; title: string };

/** "Watch the film" trigger; the YouTube iframe only loads once the visitor asks for it. */
export default function HomeFilmButton({ youtubeId, title }: HomeFilmButtonProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} type="button" className="hx-film-btn" onClick={() => setOpen(true)}>
        <span className="hx-film-btn-icon" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        </span>
        Watch the film
      </button>

      {open &&
        createPortal(
          <div className="hx-film-modal" role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(false)}>
            <button ref={closeRef} type="button" className="hx-film-close" onClick={() => setOpen(false)}>
              Close ✕
            </button>
            <div className="hx-film-frame" onClick={(event) => event.stopPropagation()}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
