import Link from "next/link";
import type { Metadata } from "next";
import { createPageSeo } from "@/lib/seo/metadata";
import { cmsListSeoContent } from "@/lib/seo/cms-client";

export const revalidate = 3600;

const seo = createPageSeo({
  title: "Guides",
  description:
    "Precifarm guides for booking Nairobi–Kisumu electric coach travel, EV charging hubs and partner services in Kenya.",
  path: "/guides",
});

export const metadata: Metadata = seo.metadata;

export default async function GuidesIndexPage() {
  const items = await cmsListSeoContent({ status: "published" });
  const guides = items.filter((item) =>
    ["guide", "howto", "article"].includes(item.contentType),
  );

  return (
    <div className="bg-white section-pad">
      <div className="page-container max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-forest-500">Guides</p>
        <h1 className="mt-3 text-3xl font-semibold text-forest-900">How-to guides</h1>
        <p className="mt-4 text-forest-600">
          Step-by-step guides for booking, charging and operating on the Precifarm network.
        </p>

        <ul className="mt-10 space-y-4">
          {guides.length === 0 && (
            <li className="text-sm text-forest-500">Guides will appear here once published from the CMS.</li>
          )}
          {guides.map((item) => (
            <li key={item.slug} className="border-b border-border pb-4">
              <Link href={`/guides/${item.slug}`} className="text-lg font-semibold text-charge-600 hover:underline">
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
