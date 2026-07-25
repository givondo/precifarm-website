"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BookNowLink from "@/components/BookNowLink";
import Logo from "@/components/Logo";
import { contact } from "@/lib/contact";

const links = [
  { href: "/network", label: "Charge Map" },
  { href: "/charging", label: "Charging" },
  { href: "/download", label: "Download app" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
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

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => mounted && pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="page-container flex h-16 items-center gap-4 lg:gap-6">
        <Logo height={32} onClick={() => setOpen(false)} />

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-forest-50 hover:text-forest-900 ${
                isActive(l.href) ? "text-forest-900" : "text-forest-600/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-forest-600/80 transition-colors hover:bg-forest-50 hover:text-forest-900"
          >
            <PhoneIcon className="h-4 w-4 shrink-0 text-charge-600" />
            <span className="whitespace-nowrap">{contact.phone}</span>
          </a>
          <BookNowLink
            className="rounded-full bg-charge-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-charge-500"
          >
            Book Now
          </BookNowLink>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <BookNowLink
            className="rounded-full bg-charge-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-charge-500"
          >
            Book Now
          </BookNowLink>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-forest-900 hover:bg-forest-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-white px-5 py-4 sm:px-8 lg:hidden">
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-forest-500">
            Explore
          </p>
          <div className="mt-1 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-forest-900 hover:bg-forest-50"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-forest-500">
            Call us
          </p>
          <a
            href={contact.phoneHref}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-forest-900 hover:bg-forest-50"
          >
            <PhoneIcon className="h-4 w-4 shrink-0 text-charge-600" />
            {contact.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
