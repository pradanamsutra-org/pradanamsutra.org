'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Stepper({
  value,
  onChange,
  size = 'md',
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  size?: 'sm' | 'md';
  label: string;
}) {
  const pad = size === 'sm' ? 'h-9' : 'h-11';
  const btn = size === 'sm' ? 'size-9' : 'size-11';

  if (value === 0) {
    return (
      <button
        onClick={() => onChange(1)}
        aria-label={`Add ${label}`}
        className={cn(
          'btn btn-outline shrink-0 border-brand/30 px-5 text-brand hover:bg-brand hover:text-paper',
          pad
        )}
      >
        <Plus size={15} strokeWidth={2} />
        Add
      </button>
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center overflow-hidden rounded-full border border-brand/30 bg-brand-wash',
        pad
      )}
    >
      <button
        onClick={() => onChange(value - 1)}
        aria-label={`Remove one ${label}`}
        className={cn(
          'flex items-center justify-center text-brand transition-colors hover:bg-brand hover:text-paper',
          btn
        )}
      >
        <Minus size={14} strokeWidth={2.2} />
      </button>
      <span
        aria-live="polite"
        className="numeral min-w-8 text-center text-[15px] font-medium text-brand"
      >
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        aria-label={`Add one more ${label}`}
        className={cn(
          'flex items-center justify-center text-brand transition-colors hover:bg-brand hover:text-paper',
          btn
        )}
      >
        <Plus size={14} strokeWidth={2.2} />
      </button>
    </div>
  );
}
