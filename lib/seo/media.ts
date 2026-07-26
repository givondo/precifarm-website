import { absoluteUrl } from "@/lib/seo/config";
import type { JsonLd } from "@/lib/seo/types";

export type ImageSeoInput = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/** Build accessible img props with required alt text for SEO. */
export function buildImageSeo(input: ImageSeoInput) {
  const src = input.src.startsWith("http") ? input.src : absoluteUrl(input.src);
  return {
    src,
    alt: input.alt.trim() || "Precifarm electric transport in Kenya",
    width: input.width,
    height: input.height,
    loading: "lazy" as const,
    decoding: "async" as const,
    ...(input.caption ? { "aria-describedby": undefined } : {}),
  };
}

export function imageObjectSchema(input: ImageSeoInput & { path: string }): JsonLd {
  const contentUrl = input.src.startsWith("http") ? input.src : absoluteUrl(input.src);
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl,
    url: absoluteUrl(input.path),
    description: input.alt,
    caption: input.caption,
    width: input.width,
    height: input.height,
  };
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
    "@context": "https://schema.org",
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
