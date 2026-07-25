import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/lib/contact";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Precifarm to book Nairobi–Kisumu travel, partner on fleet charging, or discuss hosting a hub site. HQ in Nairobi with teams across Kenya.",
};

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Best for detailed questions — we reply within one business day",
  },
  {
    label: "Phone",
    value: contact.phone,
    href: contact.phoneHref,
    note: "Monday to Saturday, business hours EAT",
  },
  {
    label: "WhatsApp",
    value: "Message us on WhatsApp",
    href: contact.whatsapp,
    note: "Fastest way to reach us for a quick question",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the Precifarm team"
        description="Whether you want to book Nairobi–Kisumu, host a charging hub, operate on the route or explore fleet charging, we are here to help. Choose the channel that suits you and we will respond within one business day."
      >
        <a
          href="/#book"
          className="inline-flex rounded-full bg-charge-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-charge-500"
        >
          Book Now
        </a>
      </PageHero>

      <section className="section-pad page-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-forest-900">Reach us directly</h2>
              <div className="mt-6 space-y-4">
                {channels.map((c) => (
                  <div key={c.label} className="card p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-charge-600">
                      {c.label}
                    </h3>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="mt-1 block font-medium text-forest-900 hover:text-charge-600"
                    >
                      {c.value}
                    </a>
                    <p className="mt-1 text-xs leading-relaxed text-forest-500">
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold text-forest-900">
                Regional presence
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600/80">
                Our headquarters is in {contact.hq}, with resident teams in{" "}
                {contact.hubs.slice(1).join(", ")}.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
