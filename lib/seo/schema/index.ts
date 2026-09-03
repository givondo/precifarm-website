import { absoluteUrl, siteConfig } from "@/lib/seo/config";
import { socialProfileUrls } from "@/lib/social";
import type { BreadcrumbItem, FaqItem, JsonLd } from "@/lib/seo/types";

const SCHEMA_CONTEXT = "https://schema.org";

export function organizationSchema(): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/images/precifarm-logo.png"),
    description: siteConfig.defaultDescription,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    areaServed: {
      "@type": "Country",
      name: "Kenya",
    },
    knowsAbout: [
      "EV charging Kenya",
      "Home charging",
      "Highway charging",
      "Pulse charger",
      "Corridor charging",
      "M-Pesa EV charging",
      "Fleet charging",
    ],
    sameAs: socialProfileUrls,
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: siteConfig.language,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl(siteConfig.searchPath)}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: FaqItem[]): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: input.areaServed ?? "Kenya",
    serviceType: input.name,
  };
}

export function softwareApplicationSchema(): JsonLd {
  const app = siteConfig.androidApp;
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "SoftwareApplication",
    name: app.name,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android",
    identifier: app.packageName,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KES",
    },
    downloadUrl: absoluteUrl(app.downloadPath),
    installUrl: absoluteUrl("/download"),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: [
      {
        "@type": "ViewAction",
        target: absoluteUrl("/hub"),
        name: "Open Charging Hub",
      },
      {
        "@type": "ViewAction",
        target: absoluteUrl("/charging/home"),
        name: "Request home charging",
      },
      {
        "@type": "ViewAction",
        target: `${app.deepLinkScheme}://charging`,
        name: "Find chargers in the companion",
      },
    ],
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function localBusinessSchema(input: {
  name: string;
  description: string;
  path: string;
  addressLocality: string;
  addressRegion?: string;
}): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "LocalBusiness",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    address: {
      "@type": "PostalAddress",
      addressLocality: input.addressLocality,
      addressRegion: input.addressRegion ?? "Kenya",
      addressCountry: "KE",
    },
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  reviewerName?: string;
  reviewedTime?: string;
  sources?: { title: string; url: string }[];
}): JsonLd {
  const author = input.authorName
    ? { "@type": "Person", name: input.authorName }
    : { "@id": `${siteConfig.url}/#organization` };

  const schema: JsonLd = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.publishedTime,
    dateModified: input.modifiedTime ?? input.publishedTime,
    author,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  if (input.reviewerName && input.reviewedTime) {
    schema.reviewedBy = { "@type": "Person", name: input.reviewerName };
    schema.dateModified = input.reviewedTime;
  }

  if (input.sources?.length) {
    schema.citation = input.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.title,
      url: s.url,
    }));
  }

  return schema;
}

export function videoObjectSchema(input: {
  name: string;
  description: string;
  path: string;
  thumbnailUrl: string;
  uploadDate?: string;
  duration?: string;
  transcript?: string;
  contentUrl?: string;
}): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl.startsWith("http")
      ? input.thumbnailUrl
      : absoluteUrl(input.thumbnailUrl),
    uploadDate: input.uploadDate,
    duration: input.duration,
    transcript: input.transcript,
    contentUrl: input.contentUrl,
    url: absoluteUrl(input.path),
  };
}

export function imageObjectSchema(input: {
  src: string;
  alt: string;
  path: string;
  caption?: string;
  width?: number;
  height?: number;
}): JsonLd {
  const contentUrl = input.src.startsWith("http") ? input.src : absoluteUrl(input.src);
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ImageObject",
    contentUrl,
    url: absoluteUrl(input.path),
    description: input.alt,
    caption: input.caption,
    width: input.width,
    height: input.height,
  };
}

export function itemListSchema(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; url: string }[];
}): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ItemList",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

export function webPageSchema(input: {
  title: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  employmentType?: string;
  location: string;
  datePosted?: string;
}): JsonLd {
  const locality = input.location.split("·")[0]?.trim() || "Nairobi";

  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "JobPosting",
    title: input.title,
    description: input.description,
    datePosted: input.datePosted ?? new Date().toISOString().slice(0, 10),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteConfig.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressCountry: "KE",
      },
    },
    employmentType: input.employmentType ?? "FULL_TIME",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Kenya",
    },
    applicationContact: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      contactType: "HR",
    },
  };
}

/** Validate required @type and @context on a schema node */
export function validateSchema(node: JsonLd): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (node["@context"] !== SCHEMA_CONTEXT) {
    errors.push("Missing or invalid @context");
  }
  if (!node["@type"]) {
    errors.push("Missing @type");
  }
  return { valid: errors.length === 0, errors };
}

export function globalSchemas(): JsonLd[] {
  return [organizationSchema(), websiteSchema(), softwareApplicationSchema()];
}
