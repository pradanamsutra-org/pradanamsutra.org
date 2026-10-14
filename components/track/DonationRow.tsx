import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { formatInr, formatDate } from '@/lib/utils';
import type { Donation, Restaurant } from '@/lib/types';

/**
 * One donation in a list of them. Shared by the signed-in account page and the
 * phone-verified history, so a donor sees the same card whichever way they got
 * to it. The whole row is the link to the full journey.
 */
export function DonationRow({ donation }: { donation: Donation }) {
  const restaurant = donation.restaurant as Restaurant;

  return (
    <Link
      href={`/track/${donation.donationId}`}
      className="group flex flex-col gap-4 rounded-[18px] border border-line bg-surface p-4 transition-colors duration-500 hover:border-brand/30 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
    >
      {donation.items[0]?.image && (
        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:size-[72px]">
          <Image
            src={donation.items[0].image}
            alt={donation.items[0].name}
            fill
            sizes="(max-width: 640px) 100vw, 72px"
            className="object-cover"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="numeral text-[13px] tracking-[0.03em] text-ink-mute">
            {donation.donationId}
          </span>
          <StatusBadge status={donation.status} short />
        </div>
        <p className="mt-1.5 font-display text-[1.1rem] font-medium tracking-[-0.015em] text-ink">
          {donation.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
        </p>
        <p className="mt-1 text-[12.5px] text-ink-mute">
          {restaurant?.name} · {formatDate(donation.createdAt)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-5 sm:justify-end">
        <div className="text-right">
          <p className="numeral text-[1.25rem] leading-none text-brand">
            {formatInr(donation.totalFoodValuePaise)}
          </p>
          <p className="mt-1 text-[11.5px] text-ink-mute">
            you paid {formatInr(donation.customerPaidPaise)}
          </p>
        </div>
        <ArrowRight
          size={16}
          className="shrink-0 text-ink-faint transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand"
        />
      </div>
    </Link>
  );
}

/** The four numbers that top a donation list. */
export interface DonationTotals {
  portions: number;
  customerPaidPaise: number;
  foodValuePaise: number;
  count: number;
  completed: number;
}
