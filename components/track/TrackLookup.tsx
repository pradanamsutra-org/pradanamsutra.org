'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { get, post, ApiError } from '@/lib/api';
import { cn, formatInr, formatNumber } from '@/lib/utils';
import { DONATE_HREF } from '@/lib/config';
import type { Donation } from '@/lib/types';
import { DonationRow, type DonationTotals } from './DonationRow';

type Mode = 'id' | 'phone';

const MODES: { value: Mode; label: string; blurb: string }[] = [
  {
    value: 'id',
    label: 'One donation',
    blurb: 'Enter the donation ID from your receipt. No account, no password — the ID is the key.',
  },
  {
    value: 'phone',
    label: 'All my donations',
    blurb:
      'Every donation you have made on one mobile number. We text a code first, so nobody else can read yours.',
  },
];

export function TrackLookup() {
  const [mode, setMode] = useState<Mode>('id');

  return (
    <>
      <p className="prose-lux mx-auto mt-6 max-w-md">
        {MODES.find((m) => m.value === mode)!.blurb}
      </p>

      {/* Two ways in, and the second is the reason there is no donor login. */}
      <div
        role="tablist"
        aria-label="How to look up a donation"
        className="mx-auto mt-9 inline-flex rounded-full border border-line bg-paper-deep p-1"
      >
        {MODES.map((m) => (
          <button
            key={m.value}
            role="tab"
            type="button"
            aria-selected={mode === m.value}
            onClick={() => setMode(m.value)}
            className={cn(
              'rounded-full px-5 py-2 text-[13.5px] font-medium transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
              mode === m.value
                ? 'bg-surface text-ink shadow-[0_2px_10px_-6px_rgba(20,32,26,0.4)]'
                : 'text-ink-mute hover:text-ink-soft'
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'id' ? <ByDonationId /> : <ByMobileNumber />}
    </>
  );
}

/* ------------------------------------------------------------ one donation */

function ByDonationId() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = value.trim().toUpperCase();
    if (!id) return setError('Enter the donation ID from your receipt.');

    setLoading(true);
    setError('');
    try {
      await get(`/donations/${encodeURIComponent(id)}/track`);
      router.push(`/track/${encodeURIComponent(id)}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'We could not reach the server. Try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-8 max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          placeholder="DS-7K2P-9QXM"
          aria-label="Donation ID"
          spellCheck={false}
          autoCapitalize="characters"
          className={cn(
            'field numeral flex-1 text-center text-[1.05rem] tracking-[0.06em] sm:text-left',
            error && 'border-danger'
          )}
        />
        <button type="submit" disabled={loading} className="btn btn-primary group shrink-0">
          {loading ? <Loader2 size={15} className="animate-spin" /> : null}
          Track
          {!loading && (
            <ArrowRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
      {error && <p className="mt-3 text-[13px] text-danger">{error}</p>}
    </form>
  );
}

/* ------------------------------------------------- every donation on a number */

interface History {
  donations: Donation[];
  totals: DonationTotals;
}

/** Ten bare digits, however the number was typed — the API normalises the same way. */
function tenDigits(value: string): string {
  return value.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
}

function ByMobileNumber() {
  const [step, setStep] = useState<'phone' | 'code' | 'done'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  /** Only ever set by a demo build, where no SMS is sent. */
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [history, setHistory] = useState<History | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!/^[6-9]\d{9}$/.test(tenDigits(phone))) {
      return setError('Enter the 10-digit mobile number you donated with.');
    }

    setLoading(true);
    setError('');
    try {
      const data = await post<{ demoCode?: string }>('/donations/history/otp', { phone });
      setDemoCode(data.demoCode ?? null);
      setCode('');
      setStep('code');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'We could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) return setError('The code is six digits.');

    setLoading(true);
    setError('');
    try {
      setHistory(await post<History>('/donations/history', { phone, code: code.trim() }));
      setStep('done');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'We could not reach the server. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const startOver = () => {
    setStep('phone');
    setCode('');
    setDemoCode(null);
    setHistory(null);
    setError('');
  };

  if (step === 'done' && history) {
    return <HistoryResult history={history} phone={tenDigits(phone)} onReset={startOver} />;
  }

  if (step === 'code') {
    return (
      <form onSubmit={verify} className="mx-auto mt-8 max-w-md">
        <p className="text-[13px] text-ink-soft">
          We sent a six-digit code to{' '}
          <span className="numeral text-ink">{tenDigits(phone)}</span>. It is good for five minutes.
        </p>

        {demoCode && (
          <p className="mt-4 rounded-xl border border-dashed border-accent/40 bg-accent-tint px-4 py-3 text-[12.5px] text-accent">
            Demo build — no SMS is sent. Your code is{' '}
            <span className="numeral text-[15px] tracking-[0.18em]">{demoCode}</span>
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            placeholder="······"
            aria-label="Six-digit code"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            className={cn(
              'field numeral flex-1 text-center text-[1.25rem] tracking-[0.5em]',
              error && 'border-danger'
            )}
          />
          <button type="submit" disabled={loading} className="btn btn-primary group shrink-0">
            {loading ? <Loader2 size={15} className="animate-spin" /> : null}
            See my donations
          </button>
        </div>

        {error && <p className="mt-3 text-[13px] text-danger">{error}</p>}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px]">
          <button
            type="button"
            onClick={() => void sendCode()}
            disabled={loading}
            className="text-brand underline underline-offset-2 disabled:opacity-50"
          >
            Send a new code
          </button>
          <button type="button" onClick={startOver} className="text-ink-mute hover:text-ink-soft">
            Use a different number
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={sendCode} className="mx-auto mt-8 max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError('');
          }}
          placeholder="98765 43210"
          aria-label="Mobile number"
          inputMode="tel"
          autoComplete="tel"
          className={cn(
            'field numeral flex-1 text-center text-[1.05rem] tracking-[0.04em] sm:text-left',
            error && 'border-danger'
          )}
        />
        <button type="submit" disabled={loading} className="btn btn-primary group shrink-0">
          {loading ? <Loader2 size={15} className="animate-spin" /> : null}
          Send code
          {!loading && (
            <ArrowRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
      {error && <p className="mt-3 text-[13px] text-danger">{error}</p>}
      <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-ink-mute">
        <ShieldCheck size={13} strokeWidth={1.7} />
        Use the number you gave at checkout. The code proves it is yours.
      </p>
    </form>
  );
}

function HistoryResult({
  history,
  phone,
  onReset,
}: {
  history: History;
  phone: string;
  onReset: () => void;
}) {
  const { donations, totals } = history;

  if (donations.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-md">
        <UtensilsCrossed size={24} className="mx-auto text-ink-faint" strokeWidth={1.4} />
        <h2 className="display-sm mt-6">No donations on that number</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
          Nothing has been funded under <span className="numeral text-ink">{phone}</span> yet. If you
          donated with a different number, try that one.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={DONATE_HREF} className="btn btn-primary">
            See the menu
          </Link>
          <button type="button" onClick={onReset} className="btn btn-outline">
            Try another number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 text-left">
      <div className="rounded-[20px] border border-line bg-surface p-6 md:p-7">
        <p className="text-[12.5px] text-ink-mute">
          <span className="numeral text-ink">{phone}</span> ·{' '}
          {formatNumber(totals.count)} {totals.count === 1 ? 'donation' : 'donations'}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-5 border-t border-line pt-5 sm:grid-cols-4">
          {[
            ['You paid', formatInr(totals.customerPaidPaise)],
            ['Kitchens matched', formatInr(totals.foodValuePaise - totals.customerPaidPaise)],
            ['Portions sent', formatNumber(totals.portions)],
            ['Confirmed served', formatNumber(totals.completed)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">{label}</dt>
              <dd className="numeral mt-2 text-[1.5rem] leading-none text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-5 space-y-3">
        {donations.map((d) => (
          <li key={d._id}>
            <DonationRow donation={d} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[12.5px] text-ink-mute underline underline-offset-2 hover:text-ink-soft"
      >
        Look up a different number
      </button>
    </div>
  );
}
