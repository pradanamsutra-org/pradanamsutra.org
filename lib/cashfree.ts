'use client';

export interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  redirectTarget?: '_modal' | '_self' | '_blank' | HTMLElement;
}

export interface CashfreeInstance {
  checkout: (options: CashfreeCheckoutOptions) => Promise<{
    error?: { message?: string; code?: string };
    redirect?: boolean;
    paymentDetails?: unknown;
  }>;
}

declare global {
  interface Window {
    Cashfree?: (config: { mode: 'sandbox' | 'production' }) => CashfreeInstance;
  }
}

let scriptPromise: Promise<boolean> | null = null;

export function loadCashfree(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Cashfree) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return scriptPromise;
}

