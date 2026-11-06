import type { NavLink } from "@/lib/site-nav";

/** Sticky section index for long interior pages; scrolls sideways on phones. */
export default function InPageNav({ links, label = "On this page" }: { links: readonly NavLink[]; label?: string }) {
  return (
    <nav aria-label={label} className="sticky top-[var(--site-header-height)] z-20 border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <ul className="interior-container flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {links.map((l) => (
          <li key={l.href} className="shrink-0">
            <a href={l.href} className="inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium text-forest-600 transition-colors hover:bg-[#f1f3f4] hover:text-forest-900">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
