import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import CountUp from "@/components/motion/CountUp";
import { homePanels } from "@/lib/brand-messaging";
import { homePageImages } from "@/lib/home-page-images";

type Panel = (typeof homePanels)[number];

function PanelStats({ stats }: { stats: Panel["stats"] }) {
  if (stats.length === 0) return null;
  return (
    <dl className="hx-panel-stats" data-reveal-stagger="110">
      {stats.map((stat) => (
        <div key={stat.label} data-reveal>
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <CountUp
              value={stat.value}
              prefix={"prefix" in stat ? stat.prefix : ""}
              suffix={"suffix" in stat ? stat.suffix : ""}
              className="hx-stat-value"
            />
            <span className="hx-stat-label" aria-hidden>
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function HomePanel({ panel, index }: { panel: Panel; index: number }) {
  const image = homePageImages[panel.imageKey];
  const contain = panel.fit === "contain";

  return (
    <section
      id={`panel-${panel.id}`}
      className={`hx-panel ${contain ? "hx-panel-contain" : ""}`}
      aria-labelledby={`panel-${panel.id}-title`}
    >
      <div className="hx-panel-media">
        <SiteImage
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className={`hx-panel-img ${contain ? "object-contain" : "object-cover"}`}
        />
      </div>
      <div className="hx-panel-shade" aria-hidden />

      <div className="hx-container hx-panel-content">
        <div className="max-w-xl">
          <p className="hx-eyebrow flex flex-wrap items-center gap-3" data-reveal>
            <span className="hx-panel-index">{String(index + 1).padStart(2, "0")}</span>
            {panel.eyebrow}
            {"status" in panel && <span className="hx-status">{panel.status}</span>}
          </p>
          <h2 id={`panel-${panel.id}-title`} className="hx-title mt-4" data-reveal>
            {panel.title}
          </h2>
          <p className="hx-lead mt-5" data-reveal>
            {panel.text}
          </p>
          <PanelStats stats={panel.stats} />
          <div className="mt-9 flex flex-wrap gap-3" data-reveal>
            <Link href={panel.primary.href} className="hx-btn">
              <span>{panel.primary.label}</span>
            </Link>
            <Link href={panel.secondary.href} className="hx-link">
              {panel.secondary.label} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePanels() {
  return (
    <div id="home-panels">
      {homePanels.map((panel, index) => (
        <HomePanel key={panel.id} panel={panel} index={index} />
      ))}
    </div>
  );
}
