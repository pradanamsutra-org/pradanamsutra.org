import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LegalView } from '@/components/legal/LegalView';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Pradanam Sutra',
  description:
    'Information on refunds, automated gateway reconciliation, duplicate charge resolution, and batch cancellation handling on Pradanam Sutra.',
};

export default function RefundsPage() {
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
              Refunds & <em className="font-normal italic text-brand">Cancellations.</em>
            </h1>
            <p className="prose-lux mt-4 max-w-xl">
              Transparent terms explaining how payments, failed transactions, automated reversals, and
              unfulfilled batches are resolved.
            </p>
          </div>
        </section>

        <LegalView initialTab="refunds" />
      </main>
      <SiteFooter />
    </>
  );
}

