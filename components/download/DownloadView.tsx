import { BrowserArt, PhoneArt, TerminalArt } from "@/components/download/PlatformArt";
import PlatformCards from "@/components/download/PlatformCards";
import { CalloutNote, InteriorHero, InteriorSection, StepFlow } from "@/components/interior";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { appDownload } from "@/lib/app-download";
import { downloadPage, platformComparison } from "@/lib/download-page";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Precifarm Agent", href: appDownload.productHref },
  { name: "Platforms", href: appDownload.pageHref },
];

function HeroArt() {
  return (
    <div className="relative rounded-[1.75rem] bg-[linear-gradient(160deg,#f1f3f4,#e4e8ec)] p-6 ring-1 ring-border sm:p-8">
      <div className="grid grid-cols-[1fr_0.32fr] items-end gap-4 sm:gap-6">
        <BrowserArt className="w-full drop-shadow-[0_18px_30px_rgba(17,24,39,0.12)]" />
        <PhoneArt className="w-full drop-shadow-[0_18px_30px_rgba(17,24,39,0.12)]" />
      </div>
      <TerminalArt className="mx-auto -mt-2 w-3/5 drop-shadow-[0_18px_30px_rgba(17,24,39,0.18)] sm:-mt-4" />
      <p className="mt-4 text-center text-xs text-forest-500">Schematic of the three options. Every one uses hosted models.</p>
    </div>
  );
}

export default function DownloadView() {
  const page = downloadPage;

  return (
    <>
      <InteriorHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        lead={page.hero.lead}
        breadcrumbs={breadcrumbs}
        actions={[
          { href: appDownload.webChatHref, label: "Open the web workspace" },
          { href: `#${page.platforms.id}`, label: "Compare platforms", variant: "secondary" },
        ]}
        media={<HeroArt />}
      >
        <p className="text-xs text-forest-500">{page.hero.meta}</p>
      </InteriorHero>

      <InteriorSection id={page.platforms.id} tone="silver" eyebrow={page.platforms.eyebrow} title={page.platforms.title} lead={page.platforms.lead}>
        <PlatformCards />
      </InteriorSection>

      <InteriorSection id={page.compare.id} eyebrow={page.compare.eyebrow} title={page.compare.title}>
        {/* Phones: one stacked list per platform. Wider screens: a matrix. */}
        <div className="space-y-4 md:hidden">
          {platformComparison.columns.map((col, ci) => (
            <div key={col} className="overflow-hidden rounded-2xl ring-1 ring-border">
              <p className="bg-[#f6f7f8] px-4 py-2.5 text-sm font-semibold text-forest-900">{col}</p>
              <dl>
              {platformComparison.rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 border-t border-border px-4 py-2.5 text-sm">
                  <dt className="text-forest-600">{r.label}</dt>
                  <dd className="text-right font-medium text-forest-900">{r.values[ci]}</dd>
                </div>
              ))}
              </dl>
            </div>
          ))}
        </div>
        <div className="hidden overflow-hidden rounded-2xl ring-1 ring-border md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Precifarm Agent platforms compared</caption>
            <thead className="bg-[#f6f7f8]">
              <tr>
                <th scope="col" className="w-1/4 px-5 py-3 font-semibold text-forest-500">
                  <span className="sr-only">Feature</span>
                </th>
                {platformComparison.columns.map((c) => (
                  <th key={c} scope="col" className="px-5 py-3 font-semibold text-forest-900">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {platformComparison.rows.map((r) => (
                <tr key={r.label} className="border-t border-border">
                  <th scope="row" className="px-5 py-3 font-medium text-forest-600">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className="px-5 py-3 text-forest-900">
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 max-w-3xl">
          <CalloutNote title={page.data.title}>{page.data.text}</CalloutNote>
        </div>
      </InteriorSection>

      <InteriorSection id={page.setup.id} tone="graphite" eyebrow={page.setup.eyebrow} title={page.setup.title}>
        <StepFlow steps={page.setup.steps} tone="dark" />
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={page.setup.configHref}
            download="precifarm-agent.opencode.json"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-forest-950 hover:bg-brand-50"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
            </svg>
            Download precifarm-agent.opencode.json
          </a>
          <a href={page.setup.docsHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-white/85 hover:text-white">
            DeepSeek and OpenCode guide <span aria-hidden className="ml-1">↗</span>
          </a>
        </div>
      </InteriorSection>

      <InteriorSection id="faq" tone="silver" width="narrow" eyebrow={page.faq.eyebrow} title={page.faq.title}>
        <FaqAccordion items={[...page.faq.items]} />
      </InteriorSection>
    </>
  );
}
