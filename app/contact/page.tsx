import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { InteriorHero } from "@/components/interior";
import JsonLd from "@/components/seo/JsonLd";
import { contactPage } from "@/lib/company-pages";
import { contact } from "@/lib/contact";
import { interestFromQuery } from "@/lib/contact-interests";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";

export const metadata: Metadata = pageMetadata("/contact");

const channels = [
  { label: "Phone", value: contact.phone, href: contact.phoneHref, note: "Monday to Saturday, business hours (EAT)" },
  { label: "WhatsApp", value: "Message us on WhatsApp", href: contact.whatsapp, note: "Quickest for a short question", external: true },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, note: "Best for drawings, photos and detail" },
] as const;

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const { interest } = await searchParams;
  const defaultInterest = interestFromQuery(interest);

  return (
    <>
      <JsonLd data={pageJsonLd("/contact")} />
      <InteriorHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        lead={contactPage.description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        actions={[
          { href: contact.phoneHref, label: `Call ${contact.phone}`, variant: "secondary" },
          { href: contact.whatsapp, label: "WhatsApp", variant: "link", external: true },
        ]}
      />

      <section aria-label="Contact form and direct lines" className="bg-[#f6f7f8]">
        <div className="interior-container grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
          <div className="min-w-0">
            <ContactForm defaultInterest={defaultInterest} />
          </div>

          <aside aria-labelledby="direct-title" className="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:self-start">
            <h2 id="direct-title" className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
              Direct lines
            </h2>
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl bg-white ring-1 ring-border">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...("external" in c && c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-16 items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[#fbfbfc]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-widest text-forest-500">{c.label}</span>
                      <span className="mt-1 block break-words font-semibold text-forest-950 group-hover:text-charge-700">{c.value}</span>
                      <span className="mt-0.5 block text-xs text-forest-500">{c.note}</span>
                    </span>
                    <span aria-hidden className="text-forest-300 group-hover:text-charge-600">
                      ›
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-4 rounded-2xl bg-white p-5 text-sm ring-1 ring-border">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Response time</dt>
                <dd className="mt-1 text-forest-800">Within one business day.</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Headquarters</dt>
                <dd className="mt-1 text-forest-800">{contact.hq}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">Teams in</dt>
                <dd className="mt-1 text-forest-800">{contact.hubs.slice(1).join(", ")}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
