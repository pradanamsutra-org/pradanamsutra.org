'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  ShieldCheck,
  RotateCcw,
  Truck,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/components/Logo';

export type LegalTab = 'terms' | 'privacy' | 'refunds' | 'fulfillment';

interface LegalViewProps {
  initialTab?: LegalTab;
}

const TABS: { id: LegalTab; label: string; href: string; icon: typeof FileText }[] = [
  { id: 'terms', label: 'Terms & Conditions', href: '/terms', icon: FileText },
  { id: 'privacy', label: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
  { id: 'refunds', label: 'Refunds & Cancellations', href: '/refunds', icon: RotateCcw },
  { id: 'fulfillment', label: 'Fulfillment & Delivery', href: '/terms?tab=fulfillment', icon: Truck },
];

export function LegalView({ initialTab = 'terms' }: LegalViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  const handleTabChange = (tab: LegalTab, href: string) => {
    setActiveTab(tab);
    window.history.pushState(null, '', href);
  };

  return (
    <div className="container-lux py-10 md:py-16">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id, tab.href)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-medium transition-all duration-300',
                isActive
                  ? 'bg-brand text-paper shadow-sm'
                  : 'bg-surface text-ink-soft hover:bg-brand-wash hover:text-brand'
              )}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Pane */}
      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Tab Content */}
        <div className="lg:col-span-8">
          {activeTab === 'terms' && <TermsContent />}
          {activeTab === 'privacy' && <PrivacyContent />}
          {activeTab === 'refunds' && <RefundsContent />}
          {activeTab === 'fulfillment' && <FulfillmentContent />}
        </div>

        {/* Right Column: Sticky Contact & Highlights Sidebar */}
        <div className="space-y-6 lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-[22px] border border-line bg-surface p-6 shadow-sm">
              <h3 className="text-[17px] font-medium text-ink font-display">Need Immediate Help?</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                If you have queries regarding a transaction, batch allocation, or grievance, our team
                is available directly.
              </p>

              <div className="mt-5 space-y-3.5 border-t border-line-soft pt-4 text-[13px]">
                <a
                  href="tel:+918130809374"
                  className="flex items-center gap-2.5 text-ink hover:text-brand transition-colors"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand">
                    <Phone size={14} />
                  </span>
                  <span>+91 8130809374</span>
                </a>
                <a
                  href="mailto:pradanamsutra.org@gmail.com"
                  className="flex items-center gap-2.5 text-ink hover:text-brand transition-colors break-all"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand">
                    <Mail size={14} />
                  </span>
                  <span>pradanamsutra.org@gmail.com</span>
                </a>
                <div className="flex items-center gap-2.5 text-ink-mute">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-paper text-ink-mute">
                    <Clock size={14} />
                  </span>
                  <span>Mon – Sat, 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              <Link href="/contact" className="btn btn-secondary mt-6 w-full text-[13px]">
                <span>Contact desk</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="rounded-[22px] border border-brand/20 bg-brand-wash p-6 text-[13px] text-ink-soft">
              <div className="flex items-center gap-2 font-medium text-brand">
                <ShieldCheck size={16} />
                <span>Our Transparency Promise</span>
              </div>
              <p className="mt-2 leading-relaxed text-ink-soft">
                100% of donor contributions go directly to food preparation costs. Donors receive an
                immutable tracking checkpoint at each phase: from cooking to NGO handover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 1. TERMS & CONDITIONS CONTENT                                             */
/* ========================================================================= */
function TermsContent() {
  return (
    <article className="prose-lux space-y-8 text-[14.5px] leading-relaxed text-ink-soft">
      <div>
        <p className="eyebrow">Legal Agreement</p>
        <h2 className="display-sm mt-2 text-ink">Terms and Conditions</h2>
        <p className="mt-1 text-[13px] text-ink-mute">Last revised: October 31, 2026</p>
      </div>

      <p>
        Welcome to <strong>Pradanam Sutra</strong> (referred to herein as &ldquo;the Platform&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), accessible via pradanamsutra.org
        and affiliated subdomains. By sponsoring a meal, registering as an approved partner restaurant,
        or coordinating distribution as a certified non-governmental organisation (NGO), you agree to
        abide by these Terms and Conditions.
      </p>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">1. Purpose & The Pradanam Model</h3>
        <p>
          Pradanam Sutra provides a verified digital infrastructure connecting food donors, licensed
          commercial food kitchens, and charitable relief organisations. Contributions made on this
          platform are not commercial purchases for personal delivery; rather, they are voluntary
          sponsorships of prepared meals provided to underserved individuals.
        </p>
        <p>
          Under our <strong>Co-Funding Model</strong>, the donor pays a subsidized customer share (e.g.,
          50% of the menu value), while the participating partner restaurant commits the remaining share
          in subsidized kitchen overhead and food preparation.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">2. User Eligibility & Accuracy</h3>
        <p>
          Users must be at least 18 years of age or possess legal capacity under applicable laws to execute
          binding contracts. When providing donor information (including contact mobile number and name),
          you agree to provide accurate and truthful details for the purpose of receiving verifiable meal
          tracking codes and digital receipts.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">3. Kitchen & Restaurant Obligations</h3>
        <p>
          All partner restaurants registered on Pradanam Sutra must maintain a valid Food Safety and
          Standards Authority of India (FSSAI) license. Kitchens commit to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Preparing batch portions adhering to strict hygiene and packaging standards.</li>
          <li>Cooking dishes exactly matching the recipes and portions snapshotted at time of sponsorship.</li>
          <li>Fulfilling batches within agreed operating service windows once the minimum batch size is funded.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">4. NGO Distribution & Verification</h3>
        <p>
          Registered NGOs are independently verified charitable entities. An authorized NGO representative
          must inspect and perform a physical count of all food portions upon handover from the kitchen.
          The NGO’s recorded count constitutes the definitive audit record for batch fulfillment.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">5. Payments & Processing</h3>
        <p>
          Payments are securely processed through Reserve Bank of India (RBI) authorized payment
          aggregators (including Cashfree Payments). By initiating a payment, you authorize the aggregator
          to debit the designated amount from your payment method. Pradanam Sutra does not store banking
          passwords, UPI PINs, or raw credit/debit card information.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">6. Intellectual Property</h3>
        <p>
          All visual assets, trademarks, interface designs, codebases, and brand marks associated with
          Pradanam Sutra and DaanSetu are proprietary. Unauthorized duplication, reverse engineering,
          or republication is strictly prohibited.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">7. Governing Law & Dispute Resolution</h3>
        <p>
          These Terms are governed by and construed in accordance with the laws of the Republic of India.
          Any legal proceedings or disputes arising hereunder shall be subject to the exclusive jurisdiction
          of the courts located in New Delhi, India.
        </p>
      </section>
    </article>
  );
}

/* ========================================================================= */
/* 2. PRIVACY POLICY CONTENT                                                 */
/* ========================================================================= */
function PrivacyContent() {
  return (
    <article className="prose-lux space-y-8 text-[14.5px] leading-relaxed text-ink-soft">
      <div>
        <p className="eyebrow">Data & Trust</p>
        <h2 className="display-sm mt-2 text-ink">Privacy Policy</h2>
        <p className="mt-1 text-[13px] text-ink-mute">Last revised: October 31, 2026</p>
      </div>

      <p>
        At <strong>Pradanam Sutra</strong>, we regard transparency and personal privacy as twin pillars
        of donor trust. This Privacy Policy details the limited information we collect, how it is safeguarded,
        and your rights regarding your data.
      </p>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">1. Information We Collect</h3>
        <p>We collect only the minimum data required to process sponsorships and ensure transparency:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Donor Information:</strong> Name, 10-digit mobile number, optional email address, and
            any voluntary donor message left with your sponsorship.
          </li>
          <li>
            <strong>Payment Metadata:</strong> Order reference IDs, transaction status, timestamp, and amount
            communicated by our authorized payment gateway (Cashfree).
          </li>
          <li>
            <strong>Partner Details:</strong> For restaurants and NGOs, we collect authorized representative
            names, verified business phone numbers, physical addresses, and statutory registration/FSSAI certificates.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">2. Consent & Public Visibility</h3>
        <p>
          We strictly adhere to an <strong>opt-in privacy principle</strong>:
        </p>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-[13.5px]">
            Providing your name and message at checkout <em>never</em> automatically publishes it. Your name and
            message only appear on public tracking timelines or boards if you explicitly tick the consent boxes
            during checkout. Otherwise, the donation is designated as &ldquo;Anonymous Donor&rdquo;.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">3. How Your Information Is Used</h3>
        <p>Your data is used strictly for:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Generating immutable meal tracking codes accessible at <code>/track/[id]</code>.</li>
          <li>Sending one-time authentication codes (OTP) enabling you to view your consolidated donation history.</li>
          <li>Processing batch fulfillment updates and official digital donation receipts.</li>
          <li>Preventing fraudulent or unauthorized automated transactions.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">4. Security of Financial Data</h3>
        <p>
          We do not store or process debit/credit card numbers, CVVs, net banking credentials, or UPI PINs
          on our servers. All financial transactions take place within certified, PCI-DSS compliant secure
          environments provided by Cashfree Payments.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">5. No Commercial Sale of Data</h3>
        <p>
          We will never sell, rent, or trade your personal telephone number or email address to commercial
          third parties, marketing agencies, or advertisers.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">6. Your Data Rights & Deletion</h3>
        <p>
          You have the right to request a copy of your personal data or ask for the deletion of your donor
          profile and contact logs. To initiate a request, email our Grievance Desk at{' '}
          <a href="mailto:pradanamsutra.org@gmail.com" className="text-brand font-medium underline">
            pradanamsutra.org@gmail.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}

/* ========================================================================= */
/* 3. REFUNDS & CANCELLATIONS CONTENT                                        */
/* ========================================================================= */
function RefundsContent() {
  return (
    <article className="prose-lux space-y-8 text-[14.5px] leading-relaxed text-ink-soft">
      <div>
        <p className="eyebrow">Fairness & Assurance</p>
        <h2 className="display-sm mt-2 text-ink">Refund and Cancellation Policy</h2>
        <p className="mt-1 text-[13px] text-ink-mute">Last revised: October 31, 2026</p>
      </div>

      <p>
        Pradanam Sutra is committed to fair, transparent, and ethical stewardship of every rupee donated.
        Because our system allocates funds towards freshly prepared meals, this policy explains how
        cancellations, failed transactions, and refunds are handled.
      </p>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">1. Nature of Voluntary Contributions</h3>
        <p>
          Donations made through Pradanam Sutra are voluntary sponsorships of food. Once a transaction is
          successfully completed, the corresponding meal portions are immediately locked and credited into
          a live kitchen batch for NGO dispatch. Consequently, once a donation is allocated to a cooking batch,
          voluntary cancellations are generally not permitted.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">2. Failed Transactions & Auto-Refunds</h3>
        <div className="rounded-xl border border-line bg-surface p-4 space-y-2">
          <div className="flex items-center gap-2 text-brand font-medium">
            <CheckCircle2 size={16} />
            <span>Automatic Gateway Reconciliation</span>
          </div>
          <p className="text-[13.5px]">
            If your bank account or card was debited but the transaction timed out, failed at the gateway, or
            did not generate a confirmed donation ID, the payment gateway (Cashfree) will automatically reverse
            the full amount to your original source account within <strong>5 to 7 working business days</strong>.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">3. Unfulfilled Batches or Kitchen Disruptions</h3>
        <p>
          In the rare event that an unforeseen operational failure occurs (such as an approved restaurant
          ceasing operations before a funded batch is prepared):
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Re-allocation:</strong> With the donor’s agreement, the portions will be reassigned to an
            equivalent partner kitchen for immediate cooking and delivery to the same NGO.
          </li>
          <li>
            <strong>Full Refund:</strong> If re-allocation is not acceptable or possible, Pradanam Sutra will
            issue a 100% refund of the guest’s contribution back to the original payment source.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">4. Duplicate Charges</h3>
        <p>
          If you accidentally funded a donation twice due to a network lag or browser refresh, please notify
          our support desk within <strong>24 hours</strong> of the transaction with your payment receipts. We
          will verify the duplicate payment and process a prompt refund for the duplicate transaction.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">5. How to Request Assistance</h3>
        <p>
          For any payment dispute, reconciliation query, or refund status check, please reach out with your
          registered mobile number and transaction reference:
        </p>
        <div className="flex flex-col gap-2 rounded-xl border border-line-soft bg-paper/60 p-4 text-[13.5px] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-ink">Pradanam Sutra Grievance Desk</p>
            <p className="text-ink-mute">Email: pradanamsutra.org@gmail.com | Phone: +91 8130809374</p>
          </div>
          <a href="mailto:pradanamsutra.org@gmail.com" className="btn btn-primary text-[12.5px] shrink-0">
            Email Support
          </a>
        </div>
      </section>
    </article>
  );
}

/* ========================================================================= */
/* 4. FULFILLMENT & DISTRIBUTION CONTENT                                     */
/* ========================================================================= */
function FulfillmentContent() {
  return (
    <article className="prose-lux space-y-8 text-[14.5px] leading-relaxed text-ink-soft">
      <div>
        <p className="eyebrow">Supply Chain & Verification</p>
        <h2 className="display-sm mt-2 text-ink">Meal Fulfillment and Distribution Policy</h2>
        <p className="mt-1 text-[13px] text-ink-mute">Last revised: October 31, 2026</p>
      </div>

      <p>
        Unlike conventional e-commerce platforms that ship tangible consumer goods to a customer&rsquo;s home,
        <strong> Pradanam Sutra</strong> operates a transparent civic supply chain delivering freshly cooked
        hot meals directly to beneficiaries through verified non-profit partners.
      </p>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">1. Step-by-Step Delivery Pipeline</h3>
        <p>Every plate sponsored through the platform advances through verifiable checkpoints:</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-wash text-[12px] font-bold text-brand">
              1
            </span>
            <div>
              <p className="font-medium text-ink text-[14px]">Payment Captured & Portions Allocated</p>
              <p className="text-[13px] text-ink-soft">
                Your payment confirms instantly. The funded dish portions enter the restaurant&rsquo;s live batch pool.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-wash text-[12px] font-bold text-brand">
              2
            </span>
            <div>
              <p className="font-medium text-ink text-[14px]">Batch Threshold Reached & Kitchen Notified</p>
              <p className="text-[13px] text-ink-soft">
                Once enough portions are funded to make a full kitchen run feasible, the batch closes and cooking
                is scheduled.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-wash text-[12px] font-bold text-brand">
              3
            </span>
            <div>
              <p className="font-medium text-ink text-[14px]">Fresh Preparation & Dispatch</p>
              <p className="text-[13px] text-ink-soft">
                The commercial kitchen prepares the meals adhering to FSSAI hygiene guidelines and marks them
                dispatched.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-wash text-[12px] font-bold text-brand">
              4
            </span>
            <div>
              <p className="font-medium text-ink text-[14px]">Physical Count & NGO Delivery Confirmation</p>
              <p className="text-[13px] text-ink-soft">
                The partner NGO receives the hot meals, conducts a physical portion count, and digitally signs off.
                Only then is the batch marked delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">2. Timeline of Delivery</h3>
        <p>
          Batches are cooked fresh and dispatched based on restaurant capacity and NGO feeding schedules, typically
          within <strong>24 to 72 hours</strong> of full batch funding. Food is never cooked ahead or stored frozen.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="text-[17px] font-semibold text-ink font-sans">3. Real-Time Donor Tracking</h3>
        <p>
          Donors can monitor their meal through every checkpoint at{' '}
          <Link href="/track" className="text-brand font-medium underline">
            pradanamsutra.org/track
          </Link>{' '}
          using their unique Donation ID or verified phone number.
        </p>
      </section>
    </article>
  );
}

