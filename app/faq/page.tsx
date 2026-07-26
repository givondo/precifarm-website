import Link from "next/link";
import type { Metadata } from "next";
import { createPageSeo } from "@/lib/seo/metadata";
import { cmsListSeoContent } from "@/lib/seo/cms-client";

export const revalidate = 3600;

export const metadata: Metadata = createPageSeo({
  title: "FAQ",
  description:
    "Frequently asked questions about Precifarm booking, Nairobi–Kisumu electric coaches, M-Pesa tickets and charging hubs.",
  path: "/faq",
}).metadata;

export default async function FaqIndexPage() {
  const items = await cmsListSeoContent({ status: "published" });
  const faqs = items.filter((item) => item.contentType === "faq");

  return (
    <div className="bg-white section-pad">
      <div className="page-container max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">FAQ</p>
        <h1 className="mt-3 text-3xl font-semibold text-forest-900">Frequently asked questions</h1>

        <ul className="mt-10 space-y-4">
          {faqs.length === 0 && (
            <li className="text-sm text-forest-500">FAQs will appear here once published from the CMS.</li>
          )}
          {faqs.map((item) => (
            <li key={item.slug} className="border-b border-border pb-4">
              <Link href={`/faq/${item.slug}`} className="text-lg font-semibold text-charge-600 hover:underline">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-forest-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
