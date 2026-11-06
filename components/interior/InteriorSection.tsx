import type { ReactNode } from "react";

type Props = {
  id?: string;
  /** white: default; silver: soft grey band; graphite: dark band for technical content */
  tone?: "white" | "silver" | "graphite";
  eyebrow?: string;
  title?: string;
  lead?: string;
  align?: "left" | "center";
  /** narrow keeps a reading column (articles, policies) */
  width?: "wide" | "narrow";
  /** content beside the heading on wide screens (a link, a filter) */
  aside?: ReactNode;
  className?: string;
  children?: ReactNode;
};

const tones = {
  white: "bg-white",
  silver: "bg-[#f6f7f8]",
  graphite: "bg-forest-950 text-white",
} as const;

export default function InteriorSection({ id, tone = "white", eyebrow, title, lead, align = "left", width = "wide", aside, className = "", children }: Props) {
  const dark = tone === "graphite";
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={`scroll-mt-24 py-14 sm:py-20 ${tones[tone]} ${className}`}>
      <div className={width === "narrow" ? "interior-container max-w-3xl" : "interior-container"}>
        {title || eyebrow ? (
          <div className={`mb-8 flex flex-col gap-4 sm:mb-10 ${align === "center" ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"}`}>
            <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
              {eyebrow ? (
                <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-brand-300" : "text-charge-600"}`}>{eyebrow}</p>
              ) : null}
              {title ? (
                <h2 id={headingId} className={`heading-display mt-3 text-2xl leading-tight sm:text-3xl ${dark ? "heading-inverted" : ""}`}>
                  {title}
                </h2>
              ) : null}
              {lead ? <p className={`mt-3 text-[15px] leading-relaxed sm:text-base ${dark ? "text-white/70" : "text-forest-600"}`}>{lead}</p> : null}
            </div>
            {aside ? <div className="shrink-0">{aside}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
