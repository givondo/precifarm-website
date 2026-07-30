import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/types";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 overflow-x-auto sm:mb-6">
      <ol className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-forest-600 sm:gap-1.5 sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden className="text-forest-400">/</span>}
              {isLast ? (
                <span className="font-medium text-forest-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="text-link">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
