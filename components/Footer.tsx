import Link from "next/link";
import Logo from "@/components/Logo";
import { contact } from "@/lib/contact";
import { LIVE_ROUTE_LABEL } from "@/lib/hub-locations";

const footerGroups = [
  {
    title: "Network",
    links: [
      { href: "/network", label: "Charge Map" },
      { href: "/charging", label: "Charging" },
      { href: "/charging/private-house", label: "Private house charging" },
      { href: "/locations", label: "Locations" },
    ],
  },
  {
    title: "Partners",
    links: [
      { href: "/partners", label: "Partner with us" },
      { href: "/training", label: "Training" },
      { href: "/partners#hub-hosts", label: "Hub site hosts" },
      { href: "/partners#fleet-logistics", label: "Fleet & logistics" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/guides", label: "Guides" },
      { href: "/faq", label: "FAQ" },
      { href: "/careers", label: "Careers" },
      { href: "/download", label: "Download app" },
      { href: "/contact", label: "Contact" },
      { href: "/sw", label: "Kiswahili" },
    ],
  },
] as const;

function FooterLinkList({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <ul className="site-footer-links">
      {links.map((link) => (
        <li key={link.href}>
          {link.href.includes("#") ? (
            <a href={link.href}>{link.label}</a>
          ) : (
            <Link href={link.href}>{link.label}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterNavGroup({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <>
      <details className="site-footer-mobile-group sm:hidden">
        <summary className="site-footer-mobile-summary">{title}</summary>
        <FooterLinkList links={links} />
      </details>

      <nav className="site-footer-segment hidden sm:block" aria-label={title}>
        <h3 className="site-footer-heading">{title}</h3>
        <FooterLinkList links={links} />
      </nav>
    </>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto">
      <div className="page-container site-footer-container">
        <div className="site-footer-grid">
          <div className="site-footer-segment site-footer-brand">
            <div className="site-footer-logo hidden sm:inline-flex">
              <Logo height={30} />
            </div>
            <p className="site-footer-tagline">
              Fast EV charging and scheduled electric coaches across Kenya.
            </p>
            <p className="site-footer-live">
              <span className="site-footer-live-dot" aria-hidden />
              Live · {LIVE_ROUTE_LABEL}
            </p>
          </div>

          {footerGroups.map((group) => (
            <FooterNavGroup key={group.title} title={group.title} links={group.links} />
          ))}

          <div className="site-footer-segment site-footer-contact">
            <h3 className="site-footer-heading hidden sm:block">Contact</h3>
            <details className="site-footer-mobile-group sm:hidden">
              <summary className="site-footer-mobile-summary">Contact</summary>
              <ul className="site-footer-links">
                <li>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </li>
                <li>
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </li>
                <li>
                  <span className="site-footer-contact-location">{contact.hq}</span>
                </li>
              </ul>
            </details>
            <ul className="site-footer-links hidden sm:block">
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <span className="site-footer-contact-location">{contact.hq}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>&copy; {year} Precifarm. All rights reserved.</p>
          <p className="site-footer-bottom-meta">Built for Kenya&apos;s intercity electric routes</p>
        </div>
      </div>
    </footer>
  );
}
