import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LegalView } from '@/components/legal/LegalView';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Pradanam Sutra',
  description:
    'Read the terms and conditions governing sponsorships, commercial restaurant partnerships, and NGO distribution on the Pradanam Sutra platform.',
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 md:pt-[74px]">
        <section className="grain relative overflow-hidden border-b border-line py-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-36 -top-32 size-[32rem] rounded-full bg-brand-wash blur-3xl"
          />
          <div className="container-lux relative">
            <span className="rule-diamond w-20" />
            <p className="eyebrow mt-6">Compliance & Policies</p>
            <h1 className="display-lg mt-4 max-w-2xl text-balance-lux">
              Platform Policies & <em className="font-normal italic text-brand">Legal Terms.</em>
            </h1>
            <p className="prose-lux mt-4 max-w-xl">
              Complete clarity on donor rights, our co-funding commitments with restaurants, verified NGO
              distribution, and refund procedures.
            </p>
          </div>
        </section>

        <LegalView initialTab="terms" />
      </main>
      <SiteFooter />
    </>
  );
}

