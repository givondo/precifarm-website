import type { Metadata } from "next";
import { contact } from "@/lib/contact";
import { absoluteUrl, siteConfig } from "@/lib/seo/config";
import { bookingHowToBlock } from "@/lib/seo/aiso/blocks";
import { hreflangAlternates } from "@/lib/seo/i18n";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/seo/schema";
import type { GeneratedPageSeo, PageSeoInput } from "@/lib/seo/types";

const DEFAULT_OG_IMAGE = "/opengraph-image";
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

function buildTitle(title: string): string {
  if (title.includes("Precifarm")) return title;
  return `${title} | ${siteConfig.name}`;
}

export function createPageSeo(input: PageSeoInput): GeneratedPageSeo {
  const canonical = absoluteUrl(input.path);
  const ogImage = absoluteUrl(input.ogImage ?? DEFAULT_OG_IMAGE);
  const title = buildTitle(input.title);

  const metadata: Metadata = {
    title: input.title,
    description: input.description,
    keywords: input.keywords ?? [...siteConfig.defaultKeywords],
    alternates: {
      canonical,
      languages: hreflangAlternates(input.path),
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: input.ogType ?? "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description: input.description,
      images: [{ url: ogImage, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: siteConfig.name }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [ogImage],
      ...(siteConfig.social.twitter ? { site: siteConfig.social.twitter } : {}),
    },
  };

  const jsonLd = [
    webPageSchema({ title, description: input.description, path: input.path }),
  ];

  if (input.breadcrumbs && input.breadcrumbs.length > 0) {
    jsonLd.push(breadcrumbSchema(input.breadcrumbs));
  }

  if (input.faqs && input.faqs.length > 0) {
    jsonLd.push(faqSchema(input.faqs));
  }

  if (input.path === "/") {
    jsonLd.push(
      serviceSchema({
        name: "Nairobi–Kisumu Electric Coach Booking",
        description: input.description,
        path: "/#book",
        areaServed: "Kenya",
      }),
      howToSchema({
        name: bookingHowToBlock.title,
        description: "Book a Nairobi–Kisumu electric coach seat on Precifarm with M-Pesa.",
        steps: (bookingHowToBlock.items ?? [])
          .filter((step): step is string => typeof step === "string")
          .map((step, index) => ({
            name: `Step ${index + 1}`,
            text: step,
          })),
      }),
    );
  }

  if (input.ogType === "article" && input.publishedTime) {
    jsonLd.push(
      articleSchema({
        title,
        description: input.description,
        path: input.path,
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime,
      }),
    );
  }

  return { metadata, jsonLd };
}

export function rootLayoutMetadata(): Metadata {
  return createPageSeo({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.defaultDescription,
    path: "/",
  }).metadata;
}
