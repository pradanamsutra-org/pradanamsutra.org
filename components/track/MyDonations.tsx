'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, UtensilsCrossed } from 'lucide-react';
import { get } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { LoadError } from '@/components/dashboard/LoadError';
import { formatInr, formatNumber } from '@/lib/utils';
import type { Donation } from '@/lib/types';
import { DONATE_HREF } from '@/lib/config';
import { DonationRow, type DonationTotals } from './DonationRow';

interface Data {
  donations: Donation[];
  totals: DonationTotals;
}

export function MyDonations() {
  const { user } = useAuth();
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<unknown>(null);

  const load = useCallback(() => {
    setError(null);
    void get<Data>('/donations/mine').then(setData).catch(setError);
  }, []);

  useEffect(load, [load]);

  if (error) {
    return (
      <section className="container-lux py-16">
        <LoadError error={error} onRetry={load} what="your donations" />
      </section>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center">
        <Loader2 className="size-5 animate-spin text-ink-mute" />
      </div>
    );
  }

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-line py-12 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-24 size-[30rem] rounded-full bg-brand-wash blur-3xl"
        />
        <div className="container-lux relative">
          <p className="eyebrow">Your record</p>
          <h1 className="display-lg mt-5 max-w-2xl text-balance-lux">
            {user?.name?.split(' ')[0]}, you have sent out{' '}
            <em className="font-normal italic text-brand">
              {formatInr(data.totals.foodValuePaise)} of food.
            </em>
          </h1>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {[
              ['You paid', formatInr(data.totals.customerPaidPaise)],
              ['Kitchens matched', formatInr(data.totals.foodValuePaise - data.totals.customerPaidPaise)],
              ['Portions sent', formatNumber(data.totals.portions)],
              ['Confirmed served', formatNumber(data.totals.completed)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">{label}</dt>
                <dd className="numeral mt-2 text-[1.8rem] leading-none text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-lux py-12 md:py-16">
        {data.donations.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <UtensilsCrossed size={24} className="mx-auto text-ink-faint" strokeWidth={1.4} />
            <h2 className="display-sm mt-6">No donations yet</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
              When you fund a dish it will appear here, with its full journey attached.
            </p>
            <Link href={DONATE_HREF} className="btn btn-primary mt-8">
              See the menu
            </Link>
          </div>
        ) : (
          <>
            <h2 className="display-sm">Every donation, in order</h2>
            <ul className="mt-8 space-y-3">
              {data.donations.map((d) => (
                <li key={d._id}>
                  <DonationRow donation={d} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
