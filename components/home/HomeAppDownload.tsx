import Link from "next/link";
import DownloadApkButton from "@/components/DownloadApkButton";
import PrecifarmLogoMark from "@/components/PrecifarmLogoMark";
import { appDownload } from "@/lib/app-download";
import { homeAppDownload } from "@/lib/home-app-download";

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.6 9.48l1.84-3.18c.16-.27.07-.62-.2-.78a.57.57 0 0 0-.78.2l-1.87 3.24a9.05 9.05 0 0 0-7.22 0L7.4 5.72a.57.57 0 0 0-.78-.2.57.57 0 0 0-.2.78L8.4 9.48A8.9 8.9 0 0 0 4 16v1a1 1 0 0 0 1 1h1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h6v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h1a1 1 0 0 0 1-1v-1a8.9 8.9 0 0 0-4.4-6.52zM6 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm12 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.365 1.43c0 1.14-.413 2.219-1.233 3.043-.82.825-2.043 1.442-3.132 1.357-.138-1.098.454-2.248 1.233-3.043.82-.825 2.087-1.457 3.132-1.357zm2.658 17.23c-.735 1.053-1.602 2.233-2.766 2.247-1.164.014-1.537-.687-2.868-.687-1.331 0-1.746.67-2.886.701-1.164.031-2.052-1.052-2.787-2.105-1.506-2.156-2.652-6.098-1.108-8.756.771-1.335 2.151-2.18 3.655-2.202 1.14-.023 2.217.764 2.868.764.651 0 2.077-.944 3.501-.805.596.025 2.271.24 3.345 1.806-2.766 1.501-2.321 5.424.846 6.837z" />
    </svg>
  );
}

export default function HomeAppDownload() {
  const {
    eyebrow,
    title,
    description,
    features,
    primaryLabel,
    iosLabel,
    iosUnavailableNote,
    phoneTagline,
    phonePill,
    secondaryLabel,
    secondaryHref,
  } = homeAppDownload;

  return (
    <section id="download-app" className="border-y border-border bg-charge-50/40 section-pad">
      <div className="page-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div>
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              {eyebrow}
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-forest-600">{description}</p>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-charge-600"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-semibold text-forest-900">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-forest-600">{feature.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DownloadApkButton
                href={appDownload.apkUrl}
                download={appDownload.fileName}
                className="inline-flex items-center gap-2 rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-charge-500"
              >
                <AndroidIcon className="h-5 w-5" />
                {primaryLabel}
              </DownloadApkButton>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title={`${iosLabel} — ${iosUnavailableNote}`}
                className="home-app-store-btn home-app-store-btn-unavailable"
              >
                <AppleIcon className="h-5 w-5" />
                <span>{iosLabel}</span>
                <span className="home-app-store-badge">{iosUnavailableNote}</span>
              </button>
              <Link
                href={secondaryHref}
                className="inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
              >
                {secondaryLabel}
              </Link>
            </div>

            <p className="mt-4 text-sm text-forest-500">
              Version {appDownload.version} · Android {appDownload.minAndroid}+ · iOS app{" "}
              {iosUnavailableNote.toLowerCase()}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[17rem] lg:mx-0 lg:max-w-none">
            <div className="home-app-phone">
              <div className="home-app-phone-screen">
                <div className="home-app-phone-notch" aria-hidden />
                <div className="home-app-phone-content">
                  <PrecifarmLogoMark className="home-app-phone-icon" size={80} />
                  <p className="home-app-phone-brand">
                    <span className="text-forest-900">Preci</span>
                    <span className="text-charge-600">farm</span>
                  </p>
                  <p className="home-app-phone-tagline">{phoneTagline}</p>
                  <div className="home-app-phone-pill">{phonePill}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
