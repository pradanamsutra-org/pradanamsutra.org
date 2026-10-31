import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LegalView } from '@/components/legal/LegalView';

export const metadata: Metadata = {
  title: 'Privacy Policy — Pradanam Sutra',
  description:
    'Learn how Pradanam Sutra protects donor personal information, handles payment security via Cashfree, and ensures strict consent for public disclosures.',
};

export default function PrivacyPage() {
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
              Privacy Policy & <em className="font-normal italic text-brand">Data Ethics.</em>
            </h1>
            <p className="prose-lux mt-4 max-w-xl">
              We never sell your data. Learn how we safeguard phone numbers, enforce opt-in anonymity,
              and process payments securely.
            </p>
          </div>
        </section>

        <LegalView initialTab="privacy" />
      </main>
      <SiteFooter />
    </>
  );
}

