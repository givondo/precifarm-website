import Link from "next/link";
import FaqAccordion from "@/components/seo/FaqAccordion";
import { homeFaqSection } from "@/lib/brand-messaging";
import { getHomepageFaqs } from "@/lib/seo/cms-content";

export default async function HomeFaqSection() {
  const faqs = await getHomepageFaqs(4);

  return (
    <section className="home-section bg-muted/50">
      <div className="page-container max-w-2xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
          {homeFaqSection.title}
        </h2>
        {faqs.length > 0 ? (
          <div className="home-section-grid">
            <FaqAccordion items={faqs} variant="plain" />
          </div>
        ) : null}
        <p className="mt-8 text-center text-sm">
          <Link href="/faq" className="font-medium">
            {homeFaqSection.cta} ›
          </Link>
        </p>
      </div>
    </section>
  );
}
