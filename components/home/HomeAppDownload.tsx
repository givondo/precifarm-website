import Link from "next/link";
import DownloadApkButton from "@/components/DownloadApkButton";
import { appDownload } from "@/lib/app-download";
import { homeAppDownload } from "@/lib/home-app-download";

export default function HomeAppDownload() {
  const { eyebrow, title, description, features, primaryLabel, secondaryHref, secondaryLabel } = homeAppDownload;

  return (
    <section id="download-app" className="home-section bg-white">
      <div className="page-container">
        <div className="home-section-header">
          <p className="text-xs font-semibold uppercase tracking-widest text-forest-500">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-forest-500">{description}</p>
        </div>

        <div className="home-section-grid mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-border bg-muted/20 px-5 py-4 text-left">
              <h3 className="text-sm font-semibold text-forest-900">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-forest-500">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <DownloadApkButton
            href={appDownload.apkUrl}
            download={appDownload.fileName}
            className="inline-flex rounded-full bg-forest-900 px-6 py-3 text-sm font-semibold text-white"
          >
            {primaryLabel}
          </DownloadApkButton>
          <Link href={secondaryHref} className="link-touch text-sm font-medium">
            {secondaryLabel} ›
          </Link>
        </div>
      </div>
    </section>
  );
}
