import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { TrackLookup } from '@/components/track/TrackLookup';

export const metadata: Metadata = {
  title: 'Track a donation',
  description:
    'Follow a meal through every checkpoint — by donation ID, or by the mobile number you donated with.',
};

export default function TrackLookupPage() {
  return (
    <>
      <SiteHeader />
      <main className="grain relative min-h-[80dvh] overflow-hidden pt-16 md:pt-[74px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-wash blur-3xl"
        />
        <div className="container-narrow relative py-16 text-center md:py-24">
          <span className="rule-diamond mx-auto w-20" />
          <p className="eyebrow mt-7">Transparency, on demand</p>
          <h1 className="display-lg mt-5 text-balance-lux">
            Where is your <em className="font-normal italic text-brand">meal?</em>
          </h1>

          {/* The blurb belongs to whichever lookup is chosen, so it lives in there. */}
          <TrackLookup />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
