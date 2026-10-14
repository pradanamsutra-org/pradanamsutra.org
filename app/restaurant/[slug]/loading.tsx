import { Logo } from '@/components/Logo';

/**
 * The QR landing page is rendered on the server and waits on the kitchen's
 * menu, so a click used to leave the previous screen sitting there with
 * nothing happening. This boundary paints the moment the link is followed and
 * holds the real page's shape — header, cover, then the dish grid — so the
 * wait reads as loading rather than as a dead tap.
 */
export default function Loading() {
  return (
    <div className="min-h-dvh bg-paper">
      <header className="fixed inset-x-0 top-0 z-40 px-3 sm:px-4">
        <div className="mx-auto max-w-[1600px] bg-paper/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-3 py-3.5 sm:px-6 lg:px-10">
            <Logo />
            <span className="text-[13.5px] tracking-[-0.022em] text-ink-soft">Track Donation</span>
          </div>
        </div>
      </header>

      <main className="pt-14 md:pt-16" aria-busy aria-label="Loading the kitchen">
        <section className="container-lux pt-3 md:pt-5">
          {/* Same box as the real cover, so nothing jumps when it arrives. */}
          <div className="h-[46vw] max-h-[23rem] min-h-[13.5rem] w-full animate-pulse rounded-[20px] bg-paper-deep md:rounded-[24px]" />
        </section>

        <section className="container-lux py-10 md:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
            <div className="max-w-2xl animate-pulse space-y-4">
              <div className="h-2.5 w-36 rounded-full bg-paper-deep" />
              <div className="h-9 w-3/4 rounded-lg bg-paper-deep" />
              <div className="space-y-2.5 pt-2">
                <div className="h-3 w-full rounded-full bg-paper-deep" />
                <div className="h-3 w-full rounded-full bg-paper-deep" />
                <div className="h-3 w-2/3 rounded-full bg-paper-deep" />
              </div>
            </div>
            <div className="h-56 animate-pulse rounded-[20px] bg-paper-deep" />
          </div>
        </section>

        <section className="container-lux pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-[18px] border border-line">
                <div className="h-40 bg-paper-deep" />
                <div className="space-y-2.5 p-5">
                  <div className="h-4 w-2/3 rounded-full bg-paper-deep" />
                  <div className="h-3 w-1/3 rounded-full bg-paper-deep" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
