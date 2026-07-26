import { NextResponse } from "next/server";
import { runSeoAudit } from "@/lib/seo/audit/checks";
import { pageSeoRegistry } from "@/lib/seo/pages/registry";

export async function GET() {
  const audit = runSeoAudit(pageSeoRegistry);

  return NextResponse.json({
    status: audit.errorCount === 0 ? "ok" : "issues_found",
    errorCount: audit.errorCount,
    warningCount: audit.warningCount,
    issueCount: audit.issues.length,
    issues: audit.issues,
    checkedAt: new Date().toISOString(),
  });
}
