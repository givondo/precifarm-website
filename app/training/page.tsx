import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import TrainingView from "@/components/training/TrainingView";
import { absoluteUrl } from "@/lib/seo/config";
import { pageJsonLd, pageMetadata } from "@/lib/seo/pages/helpers";
import { itemListSchema } from "@/lib/seo/schema";
import { trainingTiers } from "@/lib/training";

export const metadata: Metadata = pageMetadata("/training");

export default function TrainingPage() {
  const jsonLd = [
    ...pageJsonLd("/training"),
    itemListSchema({
      name: "Precifarm EV charging training programmes",
      description: "T1, T2 and T3 certification for EV charging hub staff and field engineers in Kenya.",
      path: "/training",
      items: trainingTiers.map((tier) => ({
        name: `${tier.code} — ${tier.title}`,
        url: absoluteUrl(`/training#${tier.id}`),
      })),
    }),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <TrainingView />
    </>
  );
}
