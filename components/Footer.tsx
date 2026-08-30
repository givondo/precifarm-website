import Link from "next/link";
import Logo from "@/components/Logo";
import SocialIcon from "@/components/SocialIcon";
import { footerNavGroups, footerSection } from "@/lib/brand-messaging";
import { contact } from "@/lib/contact";
import { socialLinks } from "@/lib/social";

type FooterLink = { href: string; label: string };

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.href.includes("#")) {
    return <a href={link.href}>{link.label}</a>;
  }

  return <Link href={link.href}>{link.label}</Link>;
}

function FooterLinkList({ links }: { links: readonly FooterLink[] }) {
  return (
    <ul className="site-footer-links">
      {links.map((link) => (
        <li key={link.href}>
          <FooterLinkItem link={link} />
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
  links: readonly FooterLink[];
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

function FooterSocialLinks() {
  return (
    <div className="site-footer-social">
      <p className="site-footer-social-label">{footerSection.socialLabel}</p>
      <nav aria-label="Social media" className="site-footer-social-nav">
        <ul className="site-footer-social-list">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social-link"
                aria-label={link.label}
                title={link.label}
              >
                <SocialIcon platform={link.id} className="site-footer-social-icon" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function FooterContactLinks() {
  return (
    <ul className="site-footer-links">
      <li>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      <li>
        <a href={contact.phoneHref}>{contact.phone}</a>
      </li>
      <li>
        <span className="site-footer-contact-location">{contact.hq}</span>
      </li>
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer mt-auto">
      <div className="page-container site-footer-container">
        <div className="site-footer-grid">
          <div className="site-footer-segment site-footer-brand">
            <div className="site-footer-brand-stack">
              <div className="site-footer-logo">
                <Logo size="footer" variant="onDark" />
              </div>
              <p className="site-footer-tagline">{footerSection.tagline}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/55">{footerSection.productLine}</p>
              <FooterSocialLinks />
            </div>
          </div>

          {footerNavGroups.map((group) => (
            <FooterNavGroup key={group.title} title={group.title} links={group.links} />
          ))}

          <div className="site-footer-segment site-footer-contact">
            <h3 className="site-footer-heading hidden sm:block">Contact</h3>
            <details className="site-footer-mobile-group sm:hidden">
              <summary className="site-footer-mobile-summary">Contact</summary>
              <FooterContactLinks />
            </details>
            <div className="hidden sm:block">
              <FooterContactLinks />
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-bottom-start">
            <p>&copy; {year} Precifarm</p>
          </div>
          <p className="site-footer-bottom-meta">{footerSection.meta}</p>
        </div>
      </div>
    </footer>
  );
}
