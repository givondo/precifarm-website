import { publicRoutes, siteConfig } from "@/lib/seo/config";
import type { PageSeoInput, SeoAuditIssue } from "@/lib/seo/types";

const MIN_DESCRIPTION = 50;
const MAX_DESCRIPTION = 160;
const MIN_TITLE = 10;
const MAX_TITLE = 60;

export function auditPageSeo(input: PageSeoInput): SeoAuditIssue[] {
  const issues: SeoAuditIssue[] = [];

  if (input.title.length < MIN_TITLE) {
    issues.push({
      code: "TITLE_TOO_SHORT",
      severity: "warning",
      message: `Title under ${MIN_TITLE} characters`,
      path: input.path,
    });
  }
  if (input.title.length > MAX_TITLE) {
    issues.push({
      code: "TITLE_TOO_LONG",
      severity: "warning",
      message: `Title exceeds ${MAX_TITLE} characters`,
      path: input.path,
    });
  }
  if (input.description.length < MIN_DESCRIPTION) {
    issues.push({
      code: "DESCRIPTION_TOO_SHORT",
      severity: "warning",
      message: `Description under ${MIN_DESCRIPTION} characters — may be thin for SERP`,
      path: input.path,
    });
  }
  if (input.description.length > MAX_DESCRIPTION) {
    issues.push({
      code: "DESCRIPTION_TOO_LONG",
      severity: "info",
      message: `Description exceeds ${MAX_DESCRIPTION} characters — may truncate in SERP`,
      path: input.path,
    });
  }
  if (!input.faqs?.length && input.path !== "/contact") {
    issues.push({
      code: "MISSING_FAQ",
      severity: "info",
      message: "No FAQ schema — add faqs for AISO / GEO coverage",
      path: input.path,
    });
  }
  if (!input.breadcrumbs?.length && input.path !== "/") {
    issues.push({
      code: "MISSING_BREADCRUMBS",
      severity: "info",
      message: "No breadcrumb schema",
      path: input.path,
    });
  }

  return issues;
}

export function auditSiteRoutes(): SeoAuditIssue[] {
  const issues: SeoAuditIssue[] = [];
  const paths = publicRoutes.map((r) => r.path);

  if (!siteConfig.url.startsWith("https://")) {
    issues.push({
      code: "SITE_URL_NOT_HTTPS",
      severity: "error",
      message: "NEXT_PUBLIC_SITE_URL should use HTTPS in production",
    });
  }

  if (paths.length < 5) {
    issues.push({
      code: "SMALL_SITEMAP",
      severity: "info",
      message: "Sitemap has few URLs — expand content for topical authority",
    });
  }

  return issues;
}

export function runSeoAudit(pages: PageSeoInput[]): {
  issues: SeoAuditIssue[];
  errorCount: number;
  warningCount: number;
} {
  const issues = [...auditSiteRoutes(), ...pages.flatMap(auditPageSeo)];
  return {
    issues,
    errorCount: issues.filter((i) => i.severity === "error").length,
    warningCount: issues.filter((i) => i.severity === "warning").length,
  };
}
