import type { Metadata } from "next";

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type SitemapEntry = {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: ChangeFrequency;
  priority?: number;
};

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type AisoContentBlock = {
  id: string;
  type:
    | "executive_summary"
    | "key_facts"
    | "faq"
    | "how_to"
    | "definitions"
    | "comparison"
    | "troubleshooting"
    | "best_practices"
    | "maintenance"
    | "references";
  title: string;
  content?: string;
  items?: string[] | FaqItem[];
};

export type EntityType =
  | "equipment"
  | "component"
  | "manufacturer"
  | "brand"
  | "model"
  | "location"
  | "service"
  | "procedure"
  | "symptom"
  | "solution"
  | "route"
  | "organization"
  | "article"
  | "faq";

export type KnowledgeEntity = {
  id: string;
  slug: string;
  type: EntityType;
  name: string;
  description: string;
  aliases?: string[];
  relatedIds?: string[];
  url?: string;
  metadata?: Record<string, string | number | boolean | string[]>;
};

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FaqItem[];
  aisoBlocks?: AisoContentBlock[];
};

export type SeoAuditIssue = {
  code: string;
  severity: "error" | "warning" | "info";
  message: string;
  path?: string;
};

export type JsonLd = Record<string, unknown>;

export type GeneratedPageSeo = {
  metadata: Metadata;
  jsonLd: JsonLd[];
};
