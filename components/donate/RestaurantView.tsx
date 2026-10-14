'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  ShieldCheck,
  Quote,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { SiteFooter } from '@/components/SiteFooter';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { SignatureDishCard, CompactDishCard } from './DishCard';
import { saveCart, cartTotals, type CartLine } from '@/lib/cart';
import { useHeaderScroll, EASE_EXPO } from '@/lib/use-header-scroll';
import { formatInr, formatNumber, displayDomain, cn } from '@/lib/utils';
import type { MenuItem, Restaurant, Ngo } from '@/lib/types';

interface RecentDonation {
  totalPortions: number;
  totalFoodValuePaise: number;
  createdAt: string;
  donorSnapshot: { name: string; isAnonymous: boolean; message?: string };
}

interface Props {
  restaurant: Restaurant;
  items: MenuItem[];
  partners: Ngo[];
  activeBatches: {
    batchId: string;
    menuItem: string;
    targetQuantity: number;
    collectedQuantity: number;
  }[];
  recentDonations: RecentDonation[];
}

/** The translucent pill used over the cover artwork, wherever it sits. */
const COVER_CHIP =
  'inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-paper/12 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-paper backdrop-blur-sm';

export function RestaurantView({ restaurant, items, partners, activeBatches, recentDonations }: Props) {
  const router = useRouter();
  const { island: headerIsland, hidden: headerHidden } = useHeaderScroll();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const visible = category === 'All' ? items : items.filter((i) => i.category === category);
  const signature = visible.filter((i) => i.isSignature);
  const rest = visible.filter((i) => !i.isSignature);

  const lines: CartLine[] = useMemo(
    () =>
      items
        .filter((i) => (quantities[i._id] ?? 0) > 0)
        .map((item) => ({ item, quantity: quantities[item._id] })),
    [items, quantities]
  );

  const totals = cartTotals(lines);
  const setQty = (id: string, n: number) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, n) }));

  const proceed = () => {
    saveCart(restaurant, lines);
    router.push(`/restaurant/${restaurant.slug}/checkout`);
  };

  const ngo = partners[0];

  /**
   * A short donor list would leave a visible gap mid-loop, so it is repeated
   * until the strip is wider than any viewport. Only the first pass is real:
   * every repeat is hidden from assistive technology and the heading states the
   * true count, so a looping strip cannot read as more donations than happened.
   */
  const realDonations = useMemo(() => recentDonations.slice(0, 6), [recentDonations]);
  const marqueeCards = useMemo(() => {
    if (realDonations.length === 0) return [];
    const copies = Math.ceil(8 / realDonations.length);
    return Array.from({ length: copies }, () => realDonations).flat();
  }, [realDonations]);

  return (
    <>
      {/*
        The same behaviour as the main site header — contracts into a pill past
        the top, and slides away as you read down the page — but kept to the two
        things this screen needs: the mark, and a way to track a donation.
      */}
      <motion.header
        animate={{ y: headerHidden ? '-130%' : 0 }}
        transition={{ duration: 0.5, ease: EASE_EXPO }}
        className="fixed inset-x-0 top-0 z-40 px-3 sm:px-4"
      >
        <div
          className={cn(
            'mx-auto transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
            headerIsland
              ? 'mt-3 max-w-[1120px] rounded-[2rem] bg-paper/70 shadow-[0_12px_40px_-20px_rgba(10,20,40,0.35)] ring-1 ring-ink/10 backdrop-blur-xl'
              : 'mt-0 max-w-[1600px] rounded-[0px] bg-paper/80 backdrop-blur-xl'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
              headerIsland ? 'py-2 pl-4 pr-4 sm:pl-5' : 'px-3 py-3.5 sm:px-6 lg:px-10'
            )}
          >
            <Logo compact={headerIsland} />
            <Link
              href="/track"
              className="text-[13.5px] tracking-[-0.022em] text-ink-soft transition-colors hover:text-brand"
            >
              Track Donation
            </Link>
          </div>
        </div>
      </motion.header>

      <main className={cn('pt-14 md:pt-16', lines.length > 0 && 'pb-36')}>
        {/* ------------------------------------------------------- cover */}
        {/* Held inside the container and rounded, rather than bled to the
            window edge: at desktop widths a full-bleed band crops a landscape
            photo down to a letterbox strip and slides its top under the
            translucent header. */}
        <section id="top" className="container-lux pt-3 md:pt-5">
          <div className="relative h-[46vw] max-h-[23rem] min-h-[13.5rem] w-full overflow-hidden rounded-[20px] md:rounded-[24px]">
            <Image
              src={
                restaurant.coverImage ??
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85'
              }
              alt={restaurant.name}
              fill
              priority
              sizes="(max-width: 1536px) 100vw, 1536px"
              /* Centred: the cover is a square graphic and the wide crop keeps
                 only a middle band of it, so anything off-centre is lost. */
              className="object-cover object-center"
            />
            {/* Scrim weighted to the bottom, where the name and address sit —
                the top of the photo stays readable. */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/20 via-45% to-transparent" />

            {/*
              On a phone the bottom of the cover has room for the name and the
              address and nothing else, so the live pill rides the top-left
              corner alone and the partner chip is dropped — the header already
              says whose platform this is. From sm up both rejoin the name.
            */}
            {restaurant.isAcceptingDonations && (
              <span className={cn(COVER_CHIP, 'absolute left-5 top-5 sm:hidden')}>
                <span className="live-dot" />
                Accepting donations
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="hidden flex-wrap items-center gap-2 sm:flex">
                <span className={COVER_CHIP}>Pradanam Sutra partner</span>
                {restaurant.isAcceptingDonations && (
                  <span className={COVER_CHIP}>
                    <span className="live-dot" />
                    Accepting donations
                  </span>
                )}
              </div>

              <h1 className="display-lg text-paper sm:mt-3.5">{restaurant.name}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-[13px] text-paper/75">
                <MapPin size={13} strokeWidth={1.6} />
                {restaurant.address.line1}
                {restaurant.address.line2 ? `, ${restaurant.address.line2}` : ''} ·{' '}
                {restaurant.address.city}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------- where the food goes */}
        <section className="container-lux py-10 md:py-12">
          {/* The card is a fixed 23rem; the text column takes the rest but
              holds its own readable measure, so a wide window adds margin
              rather than a stranded gap between the two. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
            <div className="max-w-2xl">
              <p className="eyebrow">Where the food goes</p>
              <h2 className="display-md mt-3 text-balance-lux">
                Cooked here. Served <em className="font-normal italic text-brand">there.</em>
              </h2>

              {restaurant.description && (
                <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">
                  {restaurant.description}
                </p>
              )}

              {restaurant.cuisine.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {restaurant.cuisine.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11.5px] text-ink-soft"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <ol className="mt-8 grid gap-4 border-t border-line pt-7 sm:grid-cols-3">
                {[
                  ['You pay half', 'Pick a dish at half its menu price.'],
                  [`${restaurant.name} pays the rest`, 'The kitchen matches you, plate for plate.'],
                  [
                    ngo ? `${ngo.name.split(' - ')[0]} confirms` : 'The NGO confirms',
                    'Counted on arrival, and shown on your tracking page.',
                  ],
                ].map(([title, body], i) => (
                  <li key={title}>
                    <span className="numeral text-[13px] text-ink-faint">0{i + 1}</span>
                    <p className="mt-1.5 text-[13.5px] font-medium text-ink">{title}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-ink-mute">{body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="card-lux h-fit p-6">
              {ngo ? (
                <>
                  <div className="flex items-center gap-4">
                    {ngo.logoImage && (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-line">
                        <Image src={ngo.logoImage} alt="" fill sizes="56px" className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.15rem] font-medium leading-snug tracking-[-0.015em]">
                        {ngo.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-mute">
                        <MapPin size={11} strokeWidth={1.6} />
                        {ngo.address.line1}, {ngo.address.city}
                      </p>
                    </div>
                  </div>

                  {ngo.mission && (
                    <p className="mt-4 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">
                      {ngo.mission}
                    </p>
                  )}

                  {ngo.beneficiaryFocus.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {ngo.beneficiaryFocus.slice(0, 2).map((focus) => (
                        <span
                          key={focus}
                          className="rounded-full bg-brand-wash px-2.5 py-1 text-[11px] text-brand"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
                    <div>
                      <p className="text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">
                        Total donations
                      </p>
                      <CountUp
                        value={restaurant.stats.totalFoodValuePaise}
                        format={(n) => formatInr(n)}
                        className="numeral mt-1.5 block text-[1.65rem] leading-none text-ink tabular-nums"
                      />
                    </div>
                    <div>
                      <p className="text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">
                        Total portions
                      </p>
                      <CountUp
                        value={restaurant.stats.totalPortions}
                        className="numeral mt-1.5 block text-[1.65rem] leading-none text-brand tabular-nums"
                      />
                    </div>
                  </div>

                  <p className="mt-5 flex items-start gap-2.5 text-[12px] leading-relaxed text-ink-mute">
                    <ShieldCheck
                      size={20}
                      className="mt-px shrink-0 text-brand"
                      strokeWidth={1.5}
                    />
                    Meals are dispatched in batches when fully funded, and verified by {ngo.name}.
                  </p>

                  {ngo.website && (
                    <a
                      href={ngo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-[11px] text-ink-mute underline decoration-line underline-offset-2 transition-colors hover:text-brand hover:decoration-brand/40"
                    >
                      {displayDomain(ngo.website)}
                      <ExternalLink size={10} strokeWidth={1.8} />
                    </a>
                  )}
                </>
              ) : (
                <p className="text-[13px] text-ink-soft">
                  This kitchen is being matched with a verified NGO partner.
                </p>
              )}
            </aside>
          </div>
        </section>

        {/* --------------------------------------------------------- menu */}
        <section id="menu" className="bg-paper-deep py-12 md:py-16">
          <div className="container-lux">
            <div className="max-w-xl">
              <p className="eyebrow">The donation menu</p>
              <h2 className="display-md mt-4">Pick a dish to send out</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
                Dispatched to {ngo?.name ?? 'our NGO partner'} once the current batch reaches its target.
              </p>
            </div>

            {activeBatches.length > 0 && (
              <div className="mt-8">
                <p className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-ink-mute">
                  Active Batches Funding Now
                </p>

                {/*
                  auto-fit lays the cards across the row and only wraps when
                  they no longer fit: two batches sit side by side, four fill a
                  wide row, and a single one keeps a sane width instead of
                  stretching the full container.
                */}
                <div className="mt-3.5 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(15rem,22rem))]">
                {activeBatches.map(b => {
                  const item = items.find(i => i._id === b.menuItem);
                  if (!item) return null;
                  const progress = Math.min(100, Math.round((b.collectedQuantity / b.targetQuantity) * 100));
                  return (
                    <div
                      key={b.batchId}
                      className="group relative flex flex-col gap-3 overflow-hidden rounded-[18px] border border-line/60 bg-gradient-to-b from-surface to-paper p-5 transition-all duration-300 hover:border-brand/30 hover:shadow-[0_6px_22px_-8px_rgba(23,63,124,0.22)]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-line/40 bg-paper-deep">
                            {item.image && (
                              <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-display text-[15px] font-medium leading-none text-ink group-hover:text-brand transition-colors">
                              {item.name}
                            </h4>
                            <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-ink-mute">
                              Batch <span className="font-mono text-[11px] font-medium tracking-wide text-ink-soft bg-line-soft px-1.5 py-0.5 rounded">{b.batchId}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="numeral text-[18px] font-semibold leading-none text-brand">
                            {progress}%
                          </p>
                          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                            Funded
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-2">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
                          <div
                            className="h-full rounded-full bg-brand transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[12px] font-medium text-ink-mute">
                        <span className="flex items-center gap-2">
                          <span className="relative flex size-2 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-20"></span>
                            <span className="relative inline-flex size-1.5 rounded-full bg-brand"></span>
                          </span>
                          <span className="text-ink">{b.collectedQuantity}</span> funded
                        </span>
                        <span><span className="text-ink">{b.targetQuantity}</span> target</span>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            )}

            {categories.length > 2 && (
              <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      'shrink-0 rounded-full border px-4 py-2 text-[13px] transition-all duration-300',
                      category === c
                        ? 'border-brand bg-brand text-paper'
                        : 'border-line bg-surface text-ink-soft hover:border-brand/40 hover:text-brand'
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {signature.length > 0 && (
              <div className="mt-9 grid gap-5 md:grid-cols-2 md:gap-6">
                {signature.map((item, i) => (
                  <Reveal key={item._id} delay={i * 70}>
                    <SignatureDishCard
                      item={item}
                      quantity={quantities[item._id] ?? 0}
                      onChange={(n) => setQty(item._id, n)}
                      restaurantName={restaurant.name}
                      activeBatch={activeBatches.find(b => b.menuItem === item._id)}
                    />
                  </Reveal>
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
                {rest.map((item, i) => (
                  <Reveal key={item._id} delay={i * 45}>
                    <CompactDishCard
                      item={item}
                      quantity={quantities[item._id] ?? 0}
                      onChange={(n) => setQty(item._id, n)}
                      restaurantName={restaurant.name}
                      activeBatch={activeBatches.find(b => b.menuItem === item._id)}
                    />
                  </Reveal>
                ))}
              </div>
            )}

            {visible.length === 0 && (
              <p className="mt-12 text-center text-[14px] text-ink-mute">
                Nothing on the menu in this category right now.
              </p>
            )}
          </div>
        </section>

        {/* --------------------------------------------------- donor wall */}
        {recentDonations.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container-lux">
              <Reveal className="max-w-lg">
                <p className="eyebrow">Recently, at this counter</p>
                <h2 className="display-md mt-4">
                  People who ate here, and paid it{' '}
                  <em className="font-normal italic text-brand">forward.</em>
                </h2>
                <p className="mt-3 text-[13px] text-ink-soft">
                  The {realDonations.length} most recent{' '}
                  {realDonations.length === 1 ? 'donation' : 'donations'}, on a loop. Names and
                  notes appear only where the donor asked for them to.
                </p>
              </Reveal>
            </div>

            {/* full-bleed so the cards run off both edges of the page */}
            <div
              className="marquee mt-10"
              style={{ ['--marquee-duration' as string]: `${marqueeCards.length * 7}s` }}
            >
              <div className="marquee-track gap-4 px-4">
                {[...marqueeCards, ...marqueeCards].map((d, i) => (
                  <figure
                    key={i}
                    // Only the first pass is announced; the rest are decoration.
                    aria-hidden={i >= realDonations.length}
                    className="card-lux flex w-[19rem] shrink-0 flex-col p-5 sm:w-[21rem]"
                  >
                    <Quote size={16} className="text-line" strokeWidth={1.6} />
                    <blockquote className="mt-3 flex-1 font-display text-[1.02rem] italic leading-relaxed text-ink">
                      {d.donorSnapshot.message ||
                        `Sent out ${d.totalPortions} ${d.totalPortions === 1 ? 'portion' : 'portions'} from this kitchen.`}
                    </blockquote>
                    <figcaption className="mt-5 flex items-center justify-between border-t border-line-soft pt-4 text-[12px]">
                      <span className="text-ink-soft">{d.donorSnapshot.name}</span>
                      <span className="numeral text-brand">
                        {formatInr(d.totalFoodValuePaise)} of food
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ---------------------------------------------------- sticky cart */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          lines.length > 0
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-full opacity-0'
        )}
      >
        <div className="border-t border-line bg-paper/94 backdrop-blur-xl">
          <div className="container-lux py-3.5 pb-safe">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.11em] text-ink-mute">
                  {totals.portions} {totals.portions === 1 ? 'portion' : 'portions'}
                </p>
                <p className="numeral mt-1 text-[1.45rem] leading-none text-ink">
                  {formatInr(totals.customerPaise)}
                  <span className="ml-2 font-sans text-[11.5px] tracking-normal text-ink-mute">
                    you pay
                  </span>
                </p>
                <p className="mt-1.5 text-[11.5px] text-ink-mute">
                  {restaurant.name} adds{' '}
                  <span className="numeral text-ink">{formatInr(totals.restaurantPaise)}</span>
                </p>
              </div>
              <button onClick={proceed} className="btn btn-primary group shrink-0 px-7">
                Continue
                <ArrowRight
                  size={15}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
