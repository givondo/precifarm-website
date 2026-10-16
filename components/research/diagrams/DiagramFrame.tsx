import type { ReactNode } from "react";

type Props = {
  title: string;
  caption: string;
  badge?: string;
  children: ReactNode;
  className?: string;
};

export default function DiagramFrame({ title, caption, badge, children, className = "" }: Props) {
  return (
    <figure className={`research-diagram-frame overflow-hidden rounded-xl border border-border bg-white ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <figcaption className="text-xs font-semibold uppercase tracking-wider text-forest-500">{title}</figcaption>
        {badge ? (
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-forest-600">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="research-diagram-canvas bg-gradient-to-b from-charge-50/40 to-white p-3 sm:p-4">{children}</div>
      <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-forest-500">{caption}</p>
    </figure>
  );
}
