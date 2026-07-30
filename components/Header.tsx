"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import BookNowLink from "@/components/BookNowLink";
import Logo from "@/components/Logo";
import { contact } from "@/lib/contact";

type NavLink = { href: string; label: string; description?: string };

type NavGroup = {
  label: string;
  items: NavLink[];
};

const primaryLinks: NavLink[] = [
  { href: "/network", label: "Charge Map" },
  { href: "/charging", label: "Charging" },
];

const navGroups: NavGroup[] = [
  {
    label: "Partners",
    items: [
      { href: "/partners", label: "Partner with us", description: "Operators, fleets and site hosts" },
      { href: "/partners#hub-hosts", label: "Hub site hosts", description: "Retail, yards and route-side sites" },
      { href: "/partners#fleet-logistics", label: "Fleet & logistics", description: "Contracted charging for cargo" },
      { href: "/training", label: "Training", description: "T1, T2, T3 EV charging certification" },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/about", label: "About", description: "Mission and route-one proof" },
      { href: "/guides", label: "Guides", description: "Booking and travel how-tos" },
      { href: "/faq", label: "FAQ", description: "Common questions" },
      { href: "/locations", label: "Locations", description: "Cities and hub pages" },
      { href: "/download", label: "Download app", description: "Android passenger app" },
      { href: "/careers", label: "Careers", description: "Join the team" },
      { href: "/contact", label: "Contact", description: "Support and enquiries" },
      { href: "/sw", label: "Kiswahili", description: "Toleo la Kiswahili" },
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

function ChevronIcon({ className = "", open = false }: { className?: string; open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
        open ? "rotate-180" : ""
      } ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DROPDOWN_OPEN_DELAY_MS = 60;
const DROPDOWN_CLOSE_DELAY_MS = 160;

function useHoverIntent(onOpen: () => void, onClose: () => void) {
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) return;
    openTimer.current = setTimeout(() => {
      openTimer.current = null;
      onOpen();
    }, DROPDOWN_OPEN_DELAY_MS);
  }, [onOpen]);

  const scheduleClose = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) return;
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      onClose();
    }, DROPDOWN_CLOSE_DELAY_MS);
  }, [onClose]);

  const openNow = useCallback(() => {
    clearTimers();
    onOpen();
  }, [clearTimers, onOpen]);

  const closeNow = useCallback(() => {
    clearTimers();
    onClose();
  }, [clearTimers, onClose]);

  useEffect(() => clearTimers, [clearTimers]);

  return { scheduleOpen, scheduleClose, openNow, closeNow };
}

function navBasePath(href: string): string {
  const base = href.split("#")[0];
  return base || href;
}

function isNavItemActive(href: string, pathname: string): boolean {
  return pathname === navBasePath(href);
}

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => isNavItemActive(item.href, pathname));
}

function NavMenuLink({
  item,
  pathname,
  className,
  onNavigate,
}: {
  item: NavLink;
  pathname: string;
  className: string;
  onNavigate?: () => void;
}) {
  const label = (
    <>
      <span className="site-header-menu-label">{item.label}</span>
      {item.description && (
        <span className="site-header-menu-desc">{item.description}</span>
      )}
    </>
  );

  if (item.href.includes("#")) {
    return (
      <a href={item.href} role="menuitem" onClick={onNavigate} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={item.href} role="menuitem" onClick={onNavigate} className={className}>
      {label}
    </Link>
  );
}

function DesktopNavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = isNavItemActive(href, pathname);
  return (
    <Link
      href={href}
      className={`site-header-link ${active ? "site-header-link-active" : ""}`}
    >
      {label}
    </Link>
  );
}

function DesktopNavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const menuId = useId();
  const triggerId = `${menuId}-trigger`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { scheduleOpen, scheduleClose, openNow, closeNow } = useHoverIntent(
    () => setOpen(true),
    () => setOpen(false),
  );

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeNow();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeNow();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, closeNow]);

  const active = isGroupActive(group, pathname);

  return (
    <div
      ref={rootRef}
      className={`site-header-dropdown ${open ? "site-header-dropdown-open" : ""}`}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocusCapture={openNow}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        id={triggerId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? closeNow() : openNow())}
        className={`site-header-link site-header-dropdown-trigger ${
          active || open ? "site-header-link-active" : ""
        }`}
      >
        {group.label}
        <ChevronIcon open={open} />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className="site-header-dropdown-panel"
      >
        <div className="site-header-dropdown-menu">
          {group.items.map((item) => (
            <NavMenuLink
              key={`${group.label}-${item.href}`}
              item={item}
              pathname={pathname}
              onNavigate={closeNow}
              className={`site-header-dropdown-item ${
                isNavItemActive(item.href, pathname) ? "site-header-dropdown-item-active" : ""
              }`}
            />
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
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}
    >
      <div className="page-container site-header-bar">
        <Logo height={30} onClick={() => setMobileOpen(false)} />

        <nav className="site-header-nav" aria-label="Main">
          {primaryLinks.map((link) => (
            <DesktopNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
          {navGroups.map((group) => (
            <DesktopNavDropdown key={group.label} group={group} pathname={pathname} />
          ))}
        </nav>

        <div className="site-header-actions">
          <a href={contact.phoneHref} className="site-header-phone">
            <PhoneIcon className="h-4 w-4 shrink-0" />
            <span className="hidden xl:inline">{contact.phone}</span>
          </a>
          <BookNowLink className="site-header-cta">Book now</BookNowLink>
        </div>

        <div className="site-header-mobile-actions">
          <BookNowLink className="site-header-cta site-header-cta-compact">Book</BookNowLink>
          <button
            type="button"
            className="site-header-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
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
        <>
          <button
            type="button"
            className="site-header-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <nav className="site-header-mobile" aria-label="Mobile">
            <div className="site-header-mobile-primary">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`site-header-mobile-link ${
                    isNavItemActive(link.href, pathname) ? "site-header-mobile-link-active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/faq"
                onClick={() => setMobileOpen(false)}
                className={`site-header-mobile-link ${
                  pathname === "/faq" ? "site-header-mobile-link-active" : ""
                }`}
              >
                FAQ
              </Link>
            </div>

            {navGroups.map((group) => {
              const expanded = mobileExpanded === group.label;
              return (
                <div
                  key={group.label}
                  className={`site-header-mobile-group ${expanded ? "site-header-mobile-group-open" : ""}`}
                >
                  <button
                    type="button"
                    className="site-header-mobile-group-btn"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileExpanded((current) => (current === group.label ? null : group.label))
                    }
                  >
                    {group.label}
                    <ChevronIcon open={expanded} />
                  </button>
                  <div
                    className="site-header-mobile-group-items"
                    aria-hidden={!expanded}
                  >
                    <div className="site-header-mobile-group-items-inner">
                      {group.items.map((item) => (
                        <NavMenuLink
                          key={`${group.label}-${item.href}`}
                          item={item}
                          pathname={pathname}
                          onNavigate={() => setMobileOpen(false)}
                          className={`site-header-mobile-sub ${
                            isNavItemActive(item.href, pathname)
                              ? "site-header-mobile-sub-active"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="site-header-mobile-foot">
              <a
                href={contact.phoneHref}
                onClick={() => setMobileOpen(false)}
                className="site-header-mobile-phone"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {contact.phone}
              </a>
              <BookNowLink
                onClick={() => setMobileOpen(false)}
                className="site-header-cta site-header-cta-full"
              >
                Book your seat
              </BookNowLink>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
