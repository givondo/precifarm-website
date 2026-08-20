import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Book",
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Web booking entry + Android App Link fallback. */
export default async function BookPage({ searchParams }: Props) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  qs.set("ref", "web");
  qs.set("utm_source", "precifarm");
  qs.set("utm_medium", "deeplink");

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") qs.set(key, value);
  }

  redirect(`/charging?${qs.toString()}`);
}
