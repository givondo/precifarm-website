"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import BookNowLink from "@/components/BookNowLink";
import {
  IconChevron,
  IconClose,
  IconGrid,
  IconMap,
  IconMenu,
  IconPhone,
  IconTicket,
  IconUsers,
} from "@/components/header/mobile-nav-icons";
import Logo from "@/components/Logo";
import { headerCta, siteNavGroups } from "@/lib/brand-messaging";
import { contact } from "@/lib/contact";

type NavLink = { href: string; label: string; description?: string };

type NavGroup = {
  label: string;
  icon: ReactNode;
  items: NavLink[];
};

const groupIcons: Record<(typeof siteNavGroups)[number]["title"], ReactNode> = {
  Charge: <IconMap />,
  Fleets: <IconUsers />,
  Company: <IconGrid />,
};

const navGroups: NavGroup[] = siteNavGroups.map((group) => ({
  label: group.title,
  icon: groupIcons[group.title],
  items: [...group.links],
}));

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

function DesktopMenuLink({
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
      {item.description && <span className="site-header-menu-desc">{item.description}</span>}
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
      if (!rootRef.current?.contains(event.target as Node)) closeNow();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeNow();
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
        if (!event.currentTarget.contains(event.relatedTarget as Node)) scheduleClose();
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
        <IconChevron open={open} />
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
            <DesktopMenuLink
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

function MobileNavLink({
  href,
  label,
  icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onNavigate: () => void;
}) {
  const className = `mobile-nav-link ${active ? "mobile-nav-link-active" : ""}`;
  const content = (
    <>
      {icon && <span className="mobile-nav-link-icon">{icon}</span>}
      <span>{label}</span>
    </>
  );

  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onNavigate}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function MobileNavPanel({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <nav id="site-header-mobile-panel" className="mobile-nav-panel" aria-label="Mobile menu">
      {navGroups.map((group) => (
        <details key={group.label} className="mobile-nav-details">
          <summary className="mobile-nav-summary">
            <span className="mobile-nav-summary-left">
              <span className="mobile-nav-link-icon">{group.icon}</span>
              {group.label}
            </span>
            <IconChevron className="mobile-nav-chevron" />
          </summary>
          <ul className="mobile-nav-sublist">
            {group.items.map((item) => (
              <li key={item.href}>
                <MobileNavLink
                  href={item.href}
                  label={item.label}
                  active={isNavItemActive(item.href, pathname)}
                  onNavigate={onClose}
                />
              </li>
            ))}
          </ul>
        </details>
      ))}

      <div className="mobile-nav-actions">
        <BookNowLink onClick={onClose} className="mobile-nav-book">
          <IconTicket className="h-4 w-4 shrink-0" />
          {headerCta.label}
        </BookNowLink>
        <a href={contact.phoneHref} className="mobile-nav-icon-btn" aria-label="Call us" onClick={onClose}>
          <IconPhone />
        </a>
      </div>
    </nav>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const ignoreOutsideRef = useRef(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((open) => {
      if (!open) ignoreOutsideRef.current = true;
      return !open;
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const enableOutside = window.setTimeout(() => {
      ignoreOutsideRef.current = false;
    }, 0);

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobile();
    }

    function handleClick(event: MouseEvent) {
      if (ignoreOutsideRef.current) return;
      const target = event.target as Node;
      if (menuButtonRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      closeMobile();
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick, true);
    return () => {
      window.clearTimeout(enableOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick, true);
    };
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mobileMenu =
    mobileOpen && mounted ? (
      <>
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
        <div
          ref={panelRef}
          className="mobile-nav-shell"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <MobileNavPanel pathname={pathname} onClose={closeMobile} />
        </div>
      </>
    ) : null;

  return (
    <>
      <header
        id="site-header"
        className={`site-header ${scrolled ? "site-header-scrolled" : ""} ${
          mobileOpen ? "site-header-menu-open" : ""
        }`}
      >
        <div className="page-container site-header-bar">
          <Logo size="header" className="site-header-logo" onClick={closeMobile} />

          <nav className="site-header-nav" aria-label="Main">
            {navGroups.map((group) => (
              <DesktopNavDropdown key={group.label} group={group} pathname={pathname} />
            ))}
          </nav>

          <div className="site-header-actions">
            <a href={contact.phoneHref} className="site-header-phone">
              <IconPhone className="h-4 w-4 shrink-0" />
              <span className="hidden xl:inline">{contact.phone}</span>
            </a>
            <BookNowLink className="site-header-cta">{headerCta.label}</BookNowLink>
          </div>

          <div className="site-header-mobile-actions">
            <button
              ref={menuButtonRef}
              type="button"
              className="site-header-menu-btn"
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="site-header-mobile-panel"
            >
              {mobileOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {mounted && mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
