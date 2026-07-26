import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo/config";

export async function GET() {
  return NextResponse.json({
    protocol: "precifarm-seo-agent/v1",
    mcpCompatible: true,
    server: {
      name: "precifarm-website",
      version: "1.0.0",
      description: "Precifarm public SEO and knowledge APIs",
    },
    tools: [
      {
        name: "get_page_knowledge",
        description: "Structured AISO payload for any public path",
        inputSchema: {
          type: "object",
          properties: {
            path: { type: "string", default: "/" },
            locale: { type: "string", enum: ["en-KE", "sw-KE"], default: "en-KE" },
          },
        },
        endpoint: `${siteConfig.url}/api/knowledge?path={path}&locale={locale}`,
      },
      {
        name: "search",
        description: "Search CMS content and entities",
        inputSchema: {
          type: "object",
          properties: {
            q: { type: "string" },
            mode: { type: "string", enum: ["keyword", "semantic"], default: "keyword" },
          },
          required: ["q"],
        },
        endpoint: `${siteConfig.url}/api/search?q={q}&mode={mode}`,
      },
      {
        name: "list_entities",
        description: "Knowledge graph entities",
        inputSchema: { type: "object", properties: { type: { type: "string" } } },
        endpoint: `${siteConfig.url}/api/entities`,
      },
      {
        name: "seo_health",
        description: "SEO audit across registered pages",
        inputSchema: { type: "object", properties: {} },
        endpoint: `${siteConfig.url}/api/seo/health`,
      },
      {
        name: "seo_report",
        description: "Weekly SEO report from CMS",
        inputSchema: { type: "object", properties: {} },
        endpoint: `${siteConfig.url}/api/seo/report`,
      },
    ],
    cmsAgentRpc: `${process.env.CMS_API_URL?.replace(/\/$/, "") ?? ""}/v1/seo/agent`,
    resources: [
      { uri: `${siteConfig.url}/llms.txt`, name: "LLM discovery" },
      { uri: `${siteConfig.url}/feed.xml`, name: "RSS feed" },
      { uri: `${siteConfig.url}/sitemap.xml`, name: "Sitemap" },
    ],
  });
}
