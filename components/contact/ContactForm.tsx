'use client';

import { useState } from 'react';
import { Send, Check, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/components/Toast';
import { cn } from '@/lib/utils';

interface FormState {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

const CATEGORIES = [
  { value: 'donation', label: 'Donation & Tracking Support' },
  { value: 'restaurant', label: 'Restaurant Partnership' },
  { value: 'ngo', label: 'NGO / Distribution Partner' },
  { value: 'general', label: 'General Inquiry / Feedback' },
];

export function ContactForm() {
  const { user } = useAuth();
  const { push } = useToast();

  const [form, setForm] = useState<FormState>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    category: 'donation',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = 'Please provide your name';
    if (!form.email.trim() || !form.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (form.phone && !/^(\+91)?[6-9]\d{9}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please share a message of at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      // Simulate quick processing and compose mailto fallback
      await new Promise((resolve) => setTimeout(resolve, 600));

      const subject = encodeURIComponent(
        `[Pradanam Sutra Contact] ${CATEGORIES.find((c) => c.value === form.category)?.label || 'Inquiry'}`
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nTopic: ${
          form.category
        }\n\nMessage:\n${form.message}`
      );

      // Attempt opening the user's mail client with the pre-filled inquiry
      window.location.href = `mailto:pradanamsutra.org@gmail.com?subject=${subject}&body=${body}`;

      setSubmitted(true);
      push('Your message draft is ready! We will get back to you shortly.', 'success');
    } catch {
      push('Something went wrong. Please reach us directly at pradanamsutra.org@gmail.com', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[22px] border border-line bg-surface p-8 text-center sm:p-10">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-wash text-brand">
          <Check size={22} strokeWidth={2.2} />
        </div>
        <h3 className="display-sm mt-5">Thank you for reaching out</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          We have received your message. Our team will review your inquiry and respond to{' '}
          <strong className="text-ink">{form.email}</strong> within 24 hours.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm((f) => ({ ...f, message: '' }));
            }}
            className="btn btn-secondary text-[13.5px]"
          >
            Send another message
          </button>
          <a
            href="https://wa.me/918130809374"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-[13.5px]"
          >
            Chat directly on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[22px] border border-line bg-surface p-7 sm:p-9"
    >
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-brand-wash text-brand">
          <Sparkles size={14} />
        </span>
        <h2 className="display-xs">Send us a direct message</h2>
      </div>
      <p className="mt-2 text-[13.5px] text-ink-mute">
        Fill out the details below and we will get back to you promptly.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="name" className="block text-[13px] font-medium text-ink">
            Your name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="e.g. Ramesh Kumar"
            className={cn(
              'mt-2 w-full rounded-xl border bg-paper/60 px-4 py-2.5 text-[14.5px] text-ink transition-colors focus:border-brand focus:bg-surface focus:outline-none',
              errors.name ? 'border-danger/60' : 'border-line'
            )}
          />
          {errors.name && <p className="mt-1 text-[12px] text-danger">{errors.name}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-ink">
              Email address <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="you@domain.com"
              className={cn(
                'mt-2 w-full rounded-xl border bg-paper/60 px-4 py-2.5 text-[14.5px] text-ink transition-colors focus:border-brand focus:bg-surface focus:outline-none',
                errors.email ? 'border-danger/60' : 'border-line'
              )}
            />
            {errors.email && <p className="mt-1 text-[12px] text-danger">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-[13px] font-medium text-ink">
              Mobile number <span className="text-ink-mute font-normal">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="+91 98765 43210"
              className={cn(
                'mt-2 w-full rounded-xl border bg-paper/60 px-4 py-2.5 text-[14.5px] text-ink transition-colors focus:border-brand focus:bg-surface focus:outline-none',
                errors.phone ? 'border-danger/60' : 'border-line'
              )}
            />
            {errors.phone && <p className="mt-1 text-[12px] text-danger">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-[13px] font-medium text-ink">
            Topic of inquiry
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-2 w-full rounded-xl border border-line bg-paper/60 px-4 py-2.5 text-[14.5px] text-ink transition-colors focus:border-brand focus:bg-surface focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-[13px] font-medium text-ink">
            Your message <span className="text-danger">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            placeholder="Tell us what you'd like to ask or discuss..."
            className={cn(
              'mt-2 w-full resize-none rounded-xl border bg-paper/60 px-4 py-3 text-[14.5px] text-ink transition-colors focus:border-brand focus:bg-surface focus:outline-none',
              errors.message ? 'border-danger/60' : 'border-line'
            )}
          />
          {errors.message && <p className="mt-1 text-[12px] text-danger">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary mt-3 w-full gap-2 text-[14.5px]"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Opening message...
            </>
          ) : (
            <>
              Send message
              <Send size={15} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

