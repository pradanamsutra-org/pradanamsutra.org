import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const BRAND_NAME = 'Pradanam Sutra';

/**
 * The emblem: two figures forming a heart above an infinity of giving and
 * receiving hands. It is a wide mark (roughly 7:4), so size it by height and
 * let the width follow — a square class would squash it.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/pradanam-mark.png"
      alt=""
      width={1158}
      height={661}
      priority
      className={cn('h-7 w-auto object-contain', className)}
    />
  );
}

/** Clicking the mark or the wordmark goes home, as a masthead should. */
export function Logo({
  className,
  href = '/',
  compact = false,
}: {
  className?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-2 text-ink', className)}
    >
      <LogoMark className="h-7 w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
      {/* Set tight: the emblem beside it is already wide, so a widely tracked
          wordmark pushed the whole block past half a phone's header. Enough
          letter-spacing is kept to hold uppercase apart, and no more. */}
      {!compact && (
        <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.02em] text-brand sm:text-[14.5px] sm:tracking-[0.05em]">
          {BRAND_NAME}
        </span>
      )}
    </Link>
  );
}
