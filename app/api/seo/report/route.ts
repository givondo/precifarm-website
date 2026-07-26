import { NextResponse } from "next/server";
import { cmsSeoReport } from "@/lib/seo/cms-client";

export async function GET() {
  const data = await cmsSeoReport();
  if (!data?.report) {
    return NextResponse.json(
      { error: "SEO report unavailable. Configure CMS_API_URL and ensure CMS is running." },
      { status: 503 },
    );
  }

  return NextResponse.json({ report: data.report });
}
