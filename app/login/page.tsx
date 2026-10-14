import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title={
        <>
          Sign in to <em className="font-normal italic text-brand">Pradanam Sutra.</em>
        </>
      }
      subtitle="For partner kitchens, NGOs and admins — you land in the right place automatically."
    >
      <Suspense fallback={<div className="h-72" />}>
        <LoginForm />
      </Suspense>
      <p className="mt-7 text-[13px] text-ink-soft">
        Donating? You never need an account — scan the code at a partner restaurant, and read
        your donations back any time on{' '}
        <Link href="/track" className="text-brand underline underline-offset-2">
          the tracking page
        </Link>
        .
      </p>
      <p className="mt-2 text-[13px] text-ink-soft">
        Run a kitchen or an NGO?{' '}
        <Link href="/join" className="text-brand underline underline-offset-2">
          Apply to join
        </Link>
        .
      </p>
    </AuthShell>
  );
}
