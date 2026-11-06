"use client";

/** "Live" strip for the homepage demos: status, an optional readout, and the pause control
 *  that WCAG 2.2.2 requires for anything that updates on its own. */
export default function LiveBar({
  running,
  label,
  readout,
  onToggle,
  progressKey,
  holdMs,
}: {
  running: boolean;
  label: string;
  readout?: string;
  onToggle: () => void;
  /** change to restart the progress line */
  progressKey?: string | number;
  holdMs?: number;
}) {
  return (
    <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
      <p className="flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70">
        <span aria-hidden className="relative flex h-2 w-2 shrink-0">
          {running ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300/70" /> : null}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${running ? "bg-brand-300" : "bg-white/40"}`} />
        </span>
        <span className="truncate">{running ? label : "Paused"}</span>
        {readout ? <span className="hidden truncate text-white/50 sm:inline">· {readout}</span> : null}
      </p>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={!running}
        className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-3 text-[11px] font-semibold text-white/85 transition-colors hover:border-white/40 hover:text-white"
      >
        <span aria-hidden>{running ? "❚❚" : "▶"}</span>
        {running ? "Pause" : "Play"}
      </button>
      {running && holdMs ? (
        <span
          key={progressKey}
          aria-hidden
          className="live-progress absolute bottom-[-1px] left-0 h-px bg-brand-300"
          style={{ animationDuration: `${holdMs}ms` }}
        />
      ) : null}
    </div>
  );
}
