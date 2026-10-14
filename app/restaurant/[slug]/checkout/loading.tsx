/**
 * Checkout waits on the same server fetch as the page before it. Without its
 * own boundary it would inherit the cover-shaped skeleton next door, which is
 * the wrong shape for a form.
 */
export default function Loading() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="container-lux py-20 md:py-28" aria-busy aria-label="Loading checkout">
        <div className="mx-auto max-w-2xl animate-pulse space-y-5">
          <div className="h-2.5 w-28 rounded-full bg-paper-deep" />
          <div className="h-9 w-2/3 rounded-lg bg-paper-deep" />
          <div className="h-44 rounded-[20px] bg-paper-deep" />
          <div className="h-12 rounded-full bg-paper-deep" />
        </div>
      </div>
    </div>
  );
}
