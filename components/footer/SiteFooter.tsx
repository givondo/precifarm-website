import Link from "next/link";
import FooterCta from "@/components/footer/FooterCta";
import Logo from "@/components/Logo";
import SocialIcon from "@/components/SocialIcon";
import { contact } from "@/lib/contact";
import { footerCopy, footerGroups, footerLegalLinks } from "@/lib/site-nav";
import { socialLinks } from "@/lib/social";

/**
 * The one site footer (all pages, including the homepage). Links come only from
 * lib/site-nav.ts; each appears once, with no separate mobile copy of the markup.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-forest-950 text-white">
      <div className="interior-container pt-10 sm:pt-14">
        <FooterCta />

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.4fr)] lg:gap-12">
          <div className="max-w-sm lg:max-w-none">
            <Logo size="footer" variant="onDark" />
            <p className="mt-5 text-sm leading-relaxed text-white/70">{footerCopy.description}</p>

            <ul className="mt-6 space-y-1 text-sm">
              <li>
                <a href={contact.phoneHref} className="inline-flex min-h-10 items-center text-white/85 hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex min-h-10 items-center text-white/85 hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex min-h-10 items-center text-white/65">{contact.hq}</li>
            </ul>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Precifarm on social media">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <SocialIcon platform={link.id} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
            {footerGroups.map((group) => (
              <div key={group.id} className="min-w-0">
                <h2 className="text-[11px] font-semibold uppercase tracking-widest text-white/55">{group.title}</h2>
                <ul className="mt-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-2 text-sm leading-snug text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>&copy; {year} Precifarm</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-1">
              {footerLegalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex min-h-10 items-center text-white/65 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p>{footerCopy.meta}</p>
        </div>
      </div>
    </footer>
  );
}
