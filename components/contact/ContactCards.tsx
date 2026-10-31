'use client';

import { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, Copy, Check, MapPin, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/components/Toast';

export function ContactCards() {
  const { push } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      push(`${label} copied to clipboard`, 'success');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      push(`Could not copy ${label}`, 'error');
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Phone Card */}
      <div className="flex flex-col justify-between rounded-[22px] border border-line bg-surface p-7 transition-all duration-300 hover:shadow-[0_12px_36px_-16px_rgba(20,32,26,0.12)]">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-brand-wash text-brand">
              <Phone size={19} strokeWidth={1.8} />
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard('+918130809374', 'Phone number', 'phone')}
              className="flex items-center gap-1 rounded-full border border-line bg-paper/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
              title="Copy phone number"
            >
              {copiedKey === 'phone' ? (
                <>
                  <Check size={12} className="text-brand" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="eyebrow mt-6">Direct Calling</p>
          <h3 className="mt-2 text-[20px] font-medium tracking-tight text-ink font-display">
            +91 8130809374
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
            Reach our coordination team for urgent batch queries, payment verification, or guidance.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-line-soft pt-5">
          <a
            href="tel:+918130809374"
            className="btn btn-secondary w-full justify-between text-[13px]"
          >
            <span>Call directly</span>
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://wa.me/918130809374"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-between text-[13px]"
          >
            <span className="flex items-center gap-1.5">
              <MessageCircle size={14} />
              WhatsApp us
            </span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Email Card */}
      <div className="flex flex-col justify-between rounded-[22px] border border-line bg-surface p-7 transition-all duration-300 hover:shadow-[0_12px_36px_-16px_rgba(20,32,26,0.12)]">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-brand-wash text-brand">
              <Mail size={19} strokeWidth={1.8} />
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard('pradanamsutra.org@gmail.com', 'Email address', 'email')}
              className="flex items-center gap-1 rounded-full border border-line bg-paper/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
              title="Copy email address"
            >
              {copiedKey === 'email' ? (
                <>
                  <Check size={12} className="text-brand" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="eyebrow mt-6">Email Support</p>
          <h3 className="mt-2 text-[18px] font-medium tracking-tight text-ink break-all font-display">
            pradanamsutra.org@gmail.com
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
            For partnership proposals, NGO verification documents, audit queries, and official inquiries.
          </p>
        </div>

        <div className="mt-6 border-t border-line-soft pt-5">
          <a
            href="mailto:pradanamsutra.org@gmail.com"
            className="btn btn-secondary w-full justify-between text-[13px]"
          >
            <span>Draft email</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Hours & Location Card */}
      <div className="flex flex-col justify-between rounded-[22px] border border-line bg-surface p-7 transition-all duration-300 hover:shadow-[0_12px_36px_-16px_rgba(20,32,26,0.12)]">
        <div>
          <span className="flex size-11 items-center justify-center rounded-full border border-brand/20 bg-brand-wash text-brand">
            <Clock size={19} strokeWidth={1.8} />
          </span>
          <p className="eyebrow mt-6">Working Hours</p>
          <h3 className="mt-2 text-[20px] font-medium tracking-tight text-ink font-display">
            Mon – Sat: 9 AM – 7 PM
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
            Live kitchen dispatch confirmations operate daily in sync with restaurant service hours.
          </p>
        </div>

        <div className="mt-6 border-t border-line-soft pt-5 text-[13px] text-ink-soft">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-brand" />
            <span>New Delhi, India</span>
          </div>
          <p className="mt-1 text-[12px] text-ink-mute">
            Pradanam Sutra / DaanSetu Initiative
          </p>
        </div>
      </div>
    </div>
  );
}

