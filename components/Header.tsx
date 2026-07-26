"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BookNowLink from "@/components/BookNowLink";
import Logo from "@/components/Logo";
import { contact } from "@/lib/contact";

type NavLink = { href: string; label: string; description?: string };

type NavGroup = {
  label: string;
  items: NavLink[];
};

const navGroups: NavGroup[] = [
  {
    label: "Network",
    items: [
      { href: "/network", label: "Charge Map", description: "Hub locations and route coverage" },
      { href: "/charging", label: "Charging services", description: "Hubs, home and private-site charging" },
    ],
  },
  {
    label: "Partners",
    items: [
      { href: "/partners", label: "Partner with us", description: "Operators, fleets and site hosts" },
      { href: "/charging", label: "Fleet & hub charging", description: "Energy services for partner operators" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/guides", label: "Guides", description: "How-to articles for booking and travel" },
      { href: "/faq", label: "FAQ", description: "Common questions about Precifarm" },
      { href: "/locations", label: "Locations", description: "Cities and EV charging hubs" },
      { href: "/about", label: "About", description: "Mission, team and route-one proof" },
      { href: "/download", label: "Download app", description: "Passenger app for Android" },
      { href: "/contact", label: "Contact", description: "General support and enquiries" },
    ],
  },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={className}
      aria-hidden
    >
      <path
        d="M5.5 4h3l1.5 5.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2L20 16.5V19.5a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => pathname === item.href);
}

function DesktopNavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const active = isGroupActive(group, pathname);
  const menuId = `nav-${group.label.toLowerCase()}`;

  return (
    <div className="group relative">
      <button
        type="button"
        id={`${menuId}-trigger`}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors group-hover:bg-muted group-hover:text-forest-900 group-focus-within:bg-muted group-focus-within:text-forest-900 ${
          active ? "text-forest-900" : "text-forest-600"
        }`}
      >
        {group.label}
        <ChevronIcon className="nav-chevron group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-labelledby={`${menuId}-trigger`}
        className="absolute left-0 top-full z-[200] hidden pt-1 group-hover:block group-focus-within:block"
      >
        <div className="min-w-[15rem] rounded-xl border border-border bg-white py-1.5 shadow-lg shadow-black/10">
          {group.items.map((item) => (
            <Link
              key={`${group.label}-${item.href}`}
              href={item.href}
              role="menuitem"
              className={`block px-4 py-2.5 transition-colors hover:bg-muted ${
                pathname === item.href ? "bg-muted" : ""
              }`}
            >
              <span className="block text-sm font-medium text-forest-900">{item.label}</span>
              {item.description && (
                <span className="mt-0.5 block text-xs leading-snug text-forest-500">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      id="site-header"
      className="sticky top-0 z-[100] overflow-visible border-b border-border bg-white/95 backdrop-blur-md"
    >
      <div className="page-container flex h-16 items-center gap-3 overflow-visible lg:gap-4">
        <Logo height={32} onClick={() => setMobileOpen(false)} />

        <nav
          className="relative z-[110] hidden flex-1 items-center justify-center gap-1 overflow-visible lg:flex"
          aria-label="Main"
        >
          {navGroups.map((group) => (
            <DesktopNavDropdown key={group.label} group={group} pathname={pathname} />
          ))}
        </nav>

        <div className="relative z-[110] hidden items-center gap-2 lg:flex">
          <Link
            href="/sw"
            className="rounded-lg px-2 py-2 text-xs font-semibold uppercase tracking-wide text-forest-500 transition-colors hover:bg-muted hover:text-forest-900"
            hrefLang="sw-KE"
          >
            Kiswahili
          </Link>
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-forest-600 transition-colors hover:bg-muted hover:text-forest-900"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            <span className="hidden whitespace-nowrap xl:inline">{contact.phone}</span>
          </a>
          <BookNowLink className="btn-primary rounded-full px-5 py-2.5 text-sm whitespace-nowrap">
            Book Now
          </BookNowLink>
        </div>

        <div className="relative z-[110] ml-auto flex items-center gap-2 lg:hidden">
          <BookNowLink className="btn-primary rounded-full px-4 py-2 text-sm">
            Book
          </BookNowLink>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-forest-900 transition-colors hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border bg-white px-5 py-4 sm:px-8 lg:hidden"
          aria-label="Mobile"
        >
          {navGroups.map((group) => {
            const expanded = mobileExpanded === group.label;
            return (
              <div key={group.label} className="border-b border-border py-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-forest-900"
                  aria-expanded={expanded}
                  onClick={() =>
                    setMobileExpanded((current) => (current === group.label ? null : group.label))
                  }
                >
                  {group.label}
                  <ChevronIcon className={expanded ? "rotate-180" : ""} />
                </button>
                {expanded && (
                  <div className="pb-2 pl-2">
                    {group.items.map((item) => (
                      <Link
                        key={`${group.label}-${item.href}`}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          pathname === item.href
                            ? "bg-muted font-medium text-forest-900"
                            : "text-forest-600 hover:bg-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a
            href={contact.phoneHref}
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-forest-900 hover:bg-muted"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            {contact.phone}
          </a>

          <BookNowLink
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4 block w-full text-center"
          >
            Book a seat
          </BookNowLink>
        </nav>
      )}
    </header>
  );
}
