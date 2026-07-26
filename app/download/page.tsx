import type { Metadata } from "next";
import Link from "next/link";
import DownloadApkButton from "@/components/DownloadApkButton";
import JsonLd from "@/components/seo/JsonLd";
import PageCTA from "@/components/ui/PageCTA";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { appDownload, appFeatures, installSteps } from "@/lib/app-download";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/download");

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.6 9.48l1.84-3.18c.16-.27.07-.62-.2-.78a.57.57 0 0 0-.78.2l-1.87 3.24a9.05 9.05 0 0 0-7.22 0L7.4 5.72a.57.57 0 0 0-.78-.2.57.57 0 0 0-.2.78L8.4 9.48A8.9 8.9 0 0 0 4 16v1a1 1 0 0 0 1 1h1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h6v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h1a1 1 0 0 0 1-1v-1a8.9 8.9 0 0 0-4.4-6.52zM6 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm12 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );
}

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("/download")} />
      <PageHero
        eyebrow="Mobile app"
        title="Book Nairobi–Kisumu on your Android phone"
        description="Download the Precifarm app for seat selection, M-Pesa Express payment, cargo waybills and ticket lookup — powered by the same booking system as this website."
      >
        <div className="flex flex-wrap items-center gap-3">
          <DownloadApkButton
            href={appDownload.apkUrl}
            download={appDownload.fileName}
            className="inline-flex items-center gap-2 rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
          >
            <AndroidIcon className="h-5 w-5" />
            Download for Android
          </DownloadApkButton>
          <Link
            href="/#book"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-forest-900 transition-colors hover:bg-muted"
          >
            Book on the web
          </Link>
        </div>
        <p className="mt-4 text-sm text-forest-600/75">
          Version {appDownload.version} · Android {appDownload.minAndroid}+ ·{" "}
          <span className="font-mono text-xs">{appDownload.packageId}</span>
        </p>
      </PageHero>

      <section className="section-pad page-container">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need for the route"
          description="The app connects to our live ticketing CMS — same fares, seats and M-Pesa flow as the agent desk and website."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {appFeatures.map((f) => (
            <div key={f.title} className="card p-5">
              <h3 className="font-semibold text-forest-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600/80">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white section-pad">
        <div className="page-container">
          <SectionHeader
            eyebrow="Install"
            title="How to install the APK"
            description="Precifarm is not on the Play Store yet. Install directly from this page — safe when downloaded from precifarm.com."
          />
          <ol className="mt-8 max-w-2xl space-y-4">
            {installSteps.map((step, i) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed text-forest-600/85">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-charge-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: step.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                  }}
                />
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <DownloadApkButton
              href={appDownload.apkUrl}
              download={appDownload.fileName}
              className="inline-flex items-center gap-2 rounded-full bg-charge-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
            >
              <AndroidIcon className="h-5 w-5" />
              Download APK v{appDownload.version}
            </DownloadApkButton>
          </div>
        </div>
      </section>

      <PageCTA
        title="Prefer booking in the browser?"
        description="No install required — select seats and pay with M-Pesa Express on our website."
        primaryHref="/#book"
        primaryLabel="Book Now"
        secondaryHref="/contact"
        secondaryLabel="Contact us"
      />
    </>
  );
}
