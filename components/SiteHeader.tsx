'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth, homeForRole } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { useHeaderScroll, EASE_EXPO } from '@/lib/use-header-scroll';
import { DONATE_HREF } from '@/lib/config';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: DONATE_HREF, label: 'Dil Dosa Etc.' },
  { href: '/track', label: 'Track Donation' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const { island, hidden } = useHeaderScroll();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  const shaped = island || open;

  return (
    <motion.header
      // Never slide away with the menu open — it would take the menu with it.
      animate={{ y: hidden && !open ? '-130%' : 0 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4"
    >
      <div
        className={cn(
          'mx-auto transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
          // The radius eases to 2rem rather than to a 9999px pill, which snaps.
          shaped
            ? 'mt-3 max-w-[1120px] rounded-[2rem] ring-1 ring-ink/10 backdrop-blur-xl'
            : 'mt-0 max-w-[1600px] rounded-[0px] bg-transparent',
          island && !open && 'bg-paper/70 shadow-[0_12px_40px_-20px_rgba(10,20,40,0.35)]',
          open && 'bg-paper/95 shadow-[0_18px_50px_-20px_rgba(10,20,40,0.45)]'
        )}
      >
        {/*
          Below lg the masthead is centred: a three-column grid with an empty
          cell opposite the menu button, so the logo sits dead centre however
          wide the button is. From lg the row goes back to logo-left, links in
          the middle, call to action right.
        */}
        <nav
          className={cn(
            'relative grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:flex lg:justify-between',
            shaped ? 'py-2 pl-4 pr-2 sm:pl-5' : 'px-3 py-3.5 sm:px-6 lg:px-10 lg:py-5'
          )}
        >
          <span aria-hidden className="lg:hidden" />
          <Logo
            compact={island}
            stacked={!island}
            className="shrink-0 justify-self-center lg:justify-self-start"
          />

          {/* Absolutely centred, so the links hold the middle whatever the logo
              and the button on either side are doing. */}
          <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-10 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative text-[14.5px] font-medium tracking-[-0.015em] text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
            {user ? (
              <Link
                href={homeForRole(user.role)}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full bg-brand font-medium text-paper transition-all duration-500 hover:bg-brand-deep',
                  island ? 'px-5 py-2.5 text-[14px]' : 'px-6 py-3 text-[15px]'
                )}
              >
                {user.role === 'customer' ? 'My donations' : 'Dashboard'}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              /*
               * No sign-in here. Donating needs no account, and a donor reads
               * their own history through the mobile number they gave at
               * checkout (/track). Only partners sign in, and they reach it
               * from the footer rather than from a guest's first screen.
               */
              <Link
                href={DONATE_HREF}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full bg-brand font-medium text-paper transition-all duration-500 hover:bg-brand-deep',
                  island ? 'px-5 py-2.5 text-[14px]' : 'px-6 py-3 text-[15px]'
                )}
              >
                Donate a meal
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 shrink-0 items-center justify-center justify-self-end rounded-full text-ink transition-colors hover:bg-brand-wash hover:text-brand lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>

        {/*
          On a phone the menu grows out of the same pill instead of throwing a
          separate sheet over the page. The 0fr → 1fr row animates the height
          without anyone having to measure the panel.
        */}
        <div
          className={cn(
            'grid lg:hidden',
            'transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-4 pt-1">
              <nav className="flex flex-col">
                {LINKS.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ transitionDelay: open ? `${90 + i * 55}ms` : '0ms' }}
                    className={cn(
                      'border-b border-line-soft py-3.5 text-[15px] tracking-[-0.015em] text-ink',
                      'transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                      open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 flex flex-col gap-2.5">
                {user ? (
                  <Link href={homeForRole(user.role)} className="btn btn-primary w-full">
                    {user.role === 'customer' ? 'My donations' : 'Go to dashboard'}
                  </Link>
                ) : (
                  <Link href={DONATE_HREF} className="btn btn-primary w-full">
                    Donate a meal
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
