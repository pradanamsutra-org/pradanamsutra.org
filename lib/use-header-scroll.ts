'use client';

import { useEffect, useRef, useState } from 'react';

/** Expo-out: quick to leave, long to settle. Pair it with the CSS transitions. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export interface HeaderScroll {
  /** Past the top of the page: the bar should contract into its floating pill. */
  island: boolean;
  /** Reading downward past the hero: the bar should slide out of the way. */
  hidden: boolean;
}

/**
 * The shared behaviour behind every public header: hold still over the hero,
 * then follow the reading direction — out of the way going down, back on the
 * way up.
 *
 * A page marks its hero with id="top" and the header stays put until 80% of it
 * has passed; without one it falls back to 60% of the viewport. The 6px
 * threshold keeps a trackpad's jitter from flickering the bar.
 */
export function useHeaderScroll(): HeaderScroll {
  const [island, setIsland] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsland(y > 24);

      const hero = document.getElementById('top');
      const zone = hero ? hero.offsetHeight * 0.8 : window.innerHeight * 0.6;
      const delta = y - lastY.current;

      if (y <= zone) setHidden(false);
      else if (Math.abs(delta) > 6) setHidden(delta > 0);
      if (Math.abs(delta) > 6 || y <= zone) lastY.current = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { island, hidden };
}
