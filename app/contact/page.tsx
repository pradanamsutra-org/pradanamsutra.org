import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle, Store, HeartHandshake, ShieldCheck } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ContactCards } from '@/components/contact/ContactCards';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Pradanam Sutra',
  description:
    'Get in touch with the Pradanam Sutra team. Reach us at +91 8130809374 or pradanamsutra.org@gmail.com for donor support, kitchen partnerships, and NGO coordination.',
};

const FAQ_ITEMS = [
  {
    icon: HelpCircle,
    title: 'Donors & Meal Tracking',
    description:
      'Have questions about your donation, need a duplicate receipt, or want to check the progress of a cooking batch? Enter your donation ID on our tracking page or reach out directly.',
    actionLabel: 'Track a donation',
    actionHref: '/track',
  },
  {
    icon: Store,
    title: 'Restaurants & Commercial Kitchens',
    description:
      'Interested in subsidizing meals and cooking a second service for your neighborhood? We provide tabletop QR stands, real-time batch aggregation, and verified NGO handovers.',
    actionLabel: 'Join as a kitchen',
    actionHref: '/join/restaurant',
  },
  {
    icon: HeartHandshake,
    title: 'NGOs & Distribution Shelters',
    description:
      'Looking for reliable, freshly prepared meals for your beneficiaries? We pair your organization with partner kitchens, and you hold the final count confirmation.',
    actionLabel: 'Partner as an NGO',
    actionHref: '/join/ngo',
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 md:pt-[74px]">
        {/* Hero Section */}
        <section className="grain relative overflow-hidden border-b border-line py-14 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-36 -top-32 size-[32rem] rounded-full bg-brand-wash blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 bottom-0 size-[24rem] rounded-full bg-paper-deep blur-2xl"
          />
          <div className="container-lux relative">
            <span className="rule-diamond w-20" />
            <p className="eyebrow mt-6">Get in touch</p>
            <h1 className="display-lg mt-5 max-w-2xl text-balance-lux">
              We are here to{' '}
              <em className="font-normal italic text-brand">help and listen.</em>
            </h1>
            <p className="prose-lux mt-6 max-w-xl">
              Whether you have a question about a meal you sponsored, want to introduce your restaurant
              to the platform, or coordinate batch deliveries for your NGO, our team is ready to assist.
            </p>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="container-lux py-12 md:py-16">
          <ContactCards />
        </section>

        {/* Interactive Form & Partner Guidance */}
        <section className="border-t border-line bg-paper-warm/40 py-14 md:py-20">
          <div className="container-lux">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: Context & Guidelines */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className="eyebrow">Dedicated Support</p>
                  <h2 className="display-md mt-4">
                    Assistance for every step of the journey.
                  </h2>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
                    Pradanam Sutra is built on absolute transparency. If anything doesn’t match what you
                    expected, we want to know immediately.
                  </p>

                  <div className="mt-8 space-y-6">
                    {FAQ_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand/30"
                        >
                          <div className="flex items-center gap-2.5 text-brand">
                            <Icon size={17} />
                            <h3 className="text-[15px] font-medium text-ink font-sans">
                              {item.title}
                            </h3>
                          </div>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                            {item.description}
                          </p>
                          <Link
                            href={item.actionHref}
                            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand transition-colors hover:text-brand-deep"
                          >
                            <span>{item.actionLabel}</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-brand/20 bg-brand-wash p-5 text-[13px] text-ink-soft">
                  <div className="flex items-center gap-2 font-medium text-brand">
                    <ShieldCheck size={16} />
                    <span>Direct Resolution Promise</span>
                  </div>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">
                    Every message sent through this form reaches our primary desk. We ensure prompt
                    resolution for any delivery dispute, payment inquiry, or technical difficulty.
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

