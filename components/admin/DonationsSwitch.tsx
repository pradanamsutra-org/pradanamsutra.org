'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, PauseCircle, PlayCircle } from 'lucide-react';
import { get, patch, ApiError } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { cn } from '@/lib/utils';

interface Settings {
  donationsEnabled: boolean;
  donationsPausedNote?: string;
}

/**
 * The master tap for giving, platform-wide.
 *
 * Closing it leaves the site exactly where it is — menus readable, tracking
 * pages live, every dashboard working — and shuts only the two doors that take
 * money: starting a donation and opening a payment for one. Donations already
 * paid for carry on through their batches untouched.
 */
export function DonationsSwitch() {
  const { push } = useToast();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    void get<{ settings: Settings }>('/admin/settings')
      .then(({ settings: s }) => {
        setSettings(s);
        setNote(s.donationsPausedNote ?? '');
      })
      .catch(() => setSettings({ donationsEnabled: true }));
  }, []);

  useEffect(load, [load]);

  const apply = async (donationsEnabled: boolean) => {
    setSaving(true);
    try {
      const { settings: next } = await patch<{ settings: Settings }>('/admin/settings', {
        donationsEnabled,
        donationsPausedNote: note.trim(),
      });
      setSettings(next);
      push(
        donationsEnabled ? 'Donations are open again.' : 'Donations are now off.',
        donationsEnabled ? 'success' : 'info'
      );
    } catch (err) {
      push(err instanceof ApiError ? err.message : 'Could not change that.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div className="h-40 animate-pulse rounded-[16px] border border-line bg-surface" />;
  }

  const open = settings.donationsEnabled;

  return (
    <div
      className={cn(
        'rounded-[16px] border p-5 md:p-6',
        open ? 'border-line bg-surface' : 'border-amber/30 bg-amber-tint'
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10.5px] uppercase tracking-[0.12em] text-ink-mute">
            Donations
          </p>
          <p
            className={cn(
              'mt-2 flex items-center gap-2 font-display text-[1.35rem] leading-none',
              open ? 'text-brand' : 'text-amber'
            )}
          >
            {open ? <PlayCircle size={19} strokeWidth={1.8} /> : <PauseCircle size={19} strokeWidth={1.8} />}
            {open ? 'Open' : 'Off'}
          </p>
          <p className="mt-2.5 max-w-md text-[12.5px] leading-relaxed text-ink-soft">
            {open
              ? 'Guests can fund dishes as normal. Turning this off leaves the whole site up and only stops new donations and payments.'
              : 'The site is still live and browsable. No new donation can be started and no payment can be opened. Anything already paid for carries on through its batch.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void apply(!open)}
          disabled={saving}
          className={cn('btn shrink-0', open ? 'btn-outline' : 'btn-primary')}
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : null}
          {open ? 'Turn donations off' : 'Turn donations back on'}
        </button>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <label className="label-lux" htmlFor="paused-note">
          What guests are told while it is off
        </label>
        <input
          id="paused-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={240}
          placeholder="Donations are currently off."
          className="field"
        />
        <p className="mt-2 text-[11.5px] text-ink-mute">
          Shown on the donation menu and in the message a guest gets if they try to fund a dish.
          Saved when you use the button above; leave it blank for the default wording.
        </p>
      </div>
    </div>
  );
}
