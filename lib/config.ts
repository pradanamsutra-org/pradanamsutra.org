/**
 * MVP runs a single partner kitchen, so the public CTAs point straight at it
 * rather than through a listing page. Swap this for a listing when a second
 * restaurant is onboarded.
 */
export const FEATURED_RESTAURANT_SLUG = 'dil-dosa';
export const DONATE_HREF = `/restaurant/${FEATURED_RESTAURANT_SLUG}`;

/**
 * Where this site lives. It was written out by hand in five places — the
 * printed QR card, the footer, the auth card, the tracking link and the
 * metadata base — which is how a restaurant's table card went on advertising
 * the old domain after the platform had been renamed. One place now, so the
 * next move only has to be made once.
 *
 * NEXT_PUBLIC_SITE_URL overrides it for a preview deployment.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pradanamsutra.org')
  .replace(/\/$/, '');

/** The same address as a person would write it: no scheme, no www. */
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '').replace(/^www\./, '');
