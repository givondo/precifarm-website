import Link from "next/link";
import Logo from "@/components/Logo";
import { contact } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <div className="page-container py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo height={32} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-forest-600/80">
              Precifarm is building the charging hubs and operating network that
              make electric travel between Kenyan cities dependable, affordable
              and easy to book. Our first route is Nairobi–Kisumu.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-forest-900">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-forest-600/80">
              <li><Link href="/network" className="hover:text-forest-900">Charge Map</Link></li>
              <li><Link href="/charging" className="hover:text-forest-900">Charging</Link></li>
              <li><Link href="/partners" className="hover:text-forest-900">Partners</Link></li>
              <li><Link href="/about" className="hover:text-forest-900">About</Link></li>
              <li><Link href="/download" className="hover:text-forest-900">Download app</Link></li>
              <li><Link href="/contact" className="hover:text-forest-900">Contact</Link></li>
              <li><a href="/#book" className="hover:text-forest-900">Book Now</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-forest-900">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-forest-600/80">
              <li>{contact.hq}</li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-forest-900">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="hover:text-forest-900">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest-900"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-forest-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Precifarm. All rights reserved.</p>
          <p>{contact.hubs.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
