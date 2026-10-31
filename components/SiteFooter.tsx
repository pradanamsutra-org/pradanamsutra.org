import Link from 'next/link';
import { LogoMark, BRAND_NAME } from './Logo';
import { SITE_DOMAIN } from '@/lib/config';

/**
 * Deliberately short. The donation menu is reached by scanning a restaurant's
 * code — not from here — so the footer stays correct as more kitchens are
 * onboarded. Signing in lives down here rather than in the header: only
 * kitchens, NGOs and admins have accounts, and a guest never needs one.
 */
const PLATFORM_LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#transparency', label: 'Transparency promise' },
  { href: '/track', label: 'Track a donation' },
  { href: '/join', label: 'Partner with us' },
  { href: '/contact', label: 'Contact us' },
  { href: '/login', label: 'Partner sign in' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/refunds', label: 'Refunds & Cancellations' },
  { href: '/terms?tab=fulfillment', label: 'Fulfillment & Delivery' },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-paper/70">
      <div className="container-lux py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-paper">
              <LogoMark className="h-7 w-auto" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-paper">
                {BRAND_NAME}
              </span>
            </div>
            <p className="mt-5 text-[13.5px] leading-relaxed text-paper/55">
              A bridge between a kitchen that can cook one more meal and a person who needs it —
              with every step on the record.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16 md:text-right">
            <nav>
              <p className="eyebrow text-paper/40">Platform</p>
              <ul className="mt-5 space-y-3">
                {PLATFORM_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-paper/65 transition-colors duration-300 hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <p className="eyebrow text-paper/40">Policies</p>
              <ul className="mt-5 space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-paper/65 transition-colors duration-300 hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/12 pt-7 text-[12px] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Pradanam Sutra · {SITE_DOMAIN}</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand-mid" />
            100% of every donation reaches the kitchen.
          </p>
        </div>
      </div>
    </footer>
  );
}
