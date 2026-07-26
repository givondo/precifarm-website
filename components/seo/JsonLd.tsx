import type { JsonLd } from "@/lib/seo/types";

type JsonLdProps = {
  data: JsonLd | JsonLd[];
};

/** Renders validated JSON-LD script tags for search engines and AI crawlers */
export default function JsonLd({ data }: JsonLdProps) {
  const graphs = Array.isArray(data) ? data : [data];

  return (
    <>
      {graphs.map((node, index) => (
        <script
          key={`jsonld-${index}-${String(node["@type"] ?? index)}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
