import type { ReactNode } from "react";
import Actions, { type Action } from "@/components/interior/Actions";
import StageLabel, { type StageKind } from "@/components/interior/StageLabel";
import SiteImage from "@/components/SiteImage";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/seo/types";

export type HeroMedia = {
  src: string;
  alt: string;
  /** cover fills the frame (scenes); contain sits a product on the silver studio backdrop */
  fit?: "cover" | "contain";
  /** label on the image when it is a render, simulation or proposed configuration */
  stage?: StageKind;
};

type Fact = { value: string; label: string };

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: readonly Action[];
  /** an image, or any node (a diagram, a demo) for the right-hand column */
  media?: HeroMedia | ReactNode;
  facts?: readonly Fact[];
  stage?: StageKind;
  tone?: "light" | "graphite";
  children?: ReactNode;
};

const factCols: Record<number, string> = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

function isMedia(m: unknown): m is HeroMedia {
  return !!m && typeof m === "object" && "src" in (m as object) && "alt" in (m as object);
}

/**
 * Interior page hero. Split layout when there is media, a reading column when not.
 * Light: silver-white with a faint green wash. Graphite: dark surface for software and research.
 */
export default function InteriorHero({ eyebrow, title, lead, breadcrumbs, actions, media, facts, stage, tone = "light", children }: Props) {
  const dark = tone === "graphite";
  return (
    <section
      className={`relative overflow-hidden border-b ${
        dark
          ? "border-white/10 bg-forest-950 text-white"
          : "border-border bg-[linear-gradient(180deg,#f6f7f8_0%,#ffffff_100%)]"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${
          dark
            ? "bg-[radial-gradient(ellipse_60%_70%_at_100%_0%,rgba(31,111,74,0.28),transparent)]"
            : "bg-[radial-gradient(ellipse_55%_60%_at_0%_0%,rgba(31,111,74,0.07),transparent)]"
        }`}
      />
      <div className="interior-container relative py-8 sm:py-12 lg:py-16">
        {breadcrumbs && breadcrumbs.length > 1 ? <Breadcrumbs items={breadcrumbs} inverted={dark} /> : null}
        <div className={`grid gap-10 ${media ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14" : ""}`}>
          <div className={media ? "min-w-0" : "max-w-3xl"}>
            <div className="flex flex-wrap items-center gap-3">
              <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-brand-300" : "text-charge-600"}`}>{eyebrow}</p>
              {stage ? <StageLabel kind={stage} tone={dark ? "dark" : "light"} /> : null}
            </div>
            <h1
              className={`heading-display mt-4 text-[1.875rem] leading-[1.08] sm:text-4xl lg:text-[2.75rem] ${dark ? "heading-inverted" : ""}`}
            >
              {title}
            </h1>
            {lead ? (
              <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-[1.0625rem] ${dark ? "text-white/72" : "text-forest-600"}`}>{lead}</p>
            ) : null}
            {actions?.length ? <Actions actions={actions} tone={dark ? "dark" : "light"} className="mt-7" /> : null}
            {children ? <div className="mt-7">{children}</div> : null}
          </div>

          {media ? (
            <div className="min-w-0">
              {isMedia(media) ? (
                <figure
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] ${
                    media.fit === "cover" ? "bg-forest-900" : dark ? "bg-white/[0.04] ring-1 ring-white/10" : "bg-[#eef0f2]"
                  }`}
                >
                  <SiteImage
                    src={media.src}
                    alt={media.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={media.fit === "cover" ? "object-cover" : "object-contain p-8 sm:p-10"}
                  />
                  {media.stage ? <StageLabel kind={media.stage} tone="dark" className="absolute left-4 top-4 backdrop-blur" /> : null}
                </figure>
              ) : (
                media
              )}
            </div>
          ) : null}
        </div>

        {facts?.length ? (
          <dl
            className={`mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl ${factCols[Math.min(facts.length, 4)]} ${
              dark ? "bg-white/10 ring-1 ring-white/10" : "bg-border ring-1 ring-border"
            }`}
          >
            {facts.map((f) => (
              <div key={f.label} className={`px-4 py-4 sm:px-5 ${dark ? "bg-forest-950" : "bg-white"}`}>
                <dt className={`text-[11px] font-medium uppercase tracking-wider ${dark ? "text-white/60" : "text-forest-500"}`}>{f.label}</dt>
                <dd className={`mt-1 font-display text-lg font-semibold tracking-tight sm:text-xl ${dark ? "text-white" : "text-forest-900"}`}>{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
