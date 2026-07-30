import Link from "next/link";
import BookNowLink from "@/components/BookNowLink";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { getHomepageFaqs } from "@/lib/seo/cms-content";

const quickLinks = [
  { href: "/faq", label: "All FAQ" },
  { href: "/guides/book-nairobi-kisumu-coach", label: "Booking guide" },
  { href: "/network", label: "Charge map" },
] as const;

export default async function HomeFaqSection() {
  const faqs = await getHomepageFaqs(5);

  return (
    <section className="home-faq border-t border-border bg-white section-pad">
      <div className="page-container">
        <div className="home-faq-layout">
          <div className="home-faq-intro">
            <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-charge-600">
              FAQ
            </p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              Answers before you travel
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-600 sm:text-base">
              Booking, M-Pesa payment and what to expect on Nairobi–Kisumu.
            </p>
            <div className="home-faq-actions">
              <BookNowLink className="btn-primary rounded-full px-6 py-2.5 text-sm">
                Book now
              </BookNowLink>
              <div className="home-faq-quick-links">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="home-faq-quick-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {faqs.length > 0 ? (
            <FaqAccordion items={faqs} className="shadow-sm" />
          ) : (
            <p className="text-sm text-forest-500">FAQ content will appear here once published.</p>
          )}
        </div>
      </div>
    </section>
  );
}
