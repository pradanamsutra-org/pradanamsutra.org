/**
 * The home page is server-rendered and waits on the restaurant and NGO lists,
 * so following the logo used to leave the previous screen frozen until the
 * whole page arrived. This paints at once and holds the hero's shape.
 *
 * It lives in a (home) route group on purpose: a loading file wraps a
 * segment's nested routes as well, and at app/ level this skeleton would also
 * appear over the dashboards and the tracking page, where it is the wrong
 * shape. The group scopes it to "/" alone and does not change the URL.
 */
export default function Loading() {
  return (
    <div className="grain min-h-dvh bg-paper pt-24 md:pt-28" aria-busy aria-label="Loading">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-brand-wash blur-3xl md:-right-24"
      />

      <div className="container-lux relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="animate-pulse">
            <div className="h-2.5 w-56 rounded-full bg-paper-deep" />
            <div className="mt-7 space-y-3">
              <div className="h-12 w-4/5 rounded-lg bg-paper-deep md:h-16" />
              <div className="h-12 w-3/5 rounded-lg bg-paper-deep md:h-16" />
            </div>
            <div className="mt-7 space-y-2.5">
              <div className="h-3 w-full max-w-lg rounded-full bg-paper-deep" />
              <div className="h-3 w-full max-w-lg rounded-full bg-paper-deep" />
              <div className="h-3 w-2/3 max-w-lg rounded-full bg-paper-deep" />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-full rounded-full bg-paper-deep sm:w-44" />
              <div className="h-12 w-full rounded-full bg-paper-deep sm:w-44" />
            </div>
          </div>

          <div className="h-[20rem] animate-pulse rounded-[24px] bg-paper-deep lg:h-[30rem] xl:h-[33rem]" />
        </div>
      </div>
    </div>
  );
}
