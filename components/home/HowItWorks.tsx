import { Reveal } from '@/components/Reveal';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    n: '01',
    title: 'Scan the code',
    body: 'Dil Dosa Etc. has a Pradanam Sutra code on its tables and counter. One scan opens their donation menu — no app, no sign-up.',
  },
  {
    n: '02',
    title: 'Pick a dish at half price',
    body: 'Not an abstract amount. A real dish from that kitchen, listed at half its menu price.',
  },
  {
    n: '03',
    title: 'The kitchen matches you',
    body: 'Dil Dosa Etc. commits the other half. Your ₹50 and their ₹50 become a ₹100 plate of food.',
  },
  {
    n: '04',
    title: 'Follow it out the door',
    body: 'Four checkpoints, each stamped by whoever is responsible. The last one belongs to the NGO, and only they can set it.',
  },
];

/**
 * Where each card parks on a phone. Every step halts 14px lower than the one
 * before, so the cards it has already covered stay visible as a stack of
 * slivers — the numeral of each is what shows. Written out as whole class
 * names because Tailwind reads these as literals.
 */
const STACK_TOP = ['top-[5.5rem]', 'top-[6.375rem]', 'top-[7.25rem]', 'top-[8.125rem]'];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="container-lux">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="display-lg mt-5 text-balance-lux">
            Four steps for you.
            <br />
            <em className="font-normal italic text-ink-mute">Four checkpoints for the food.</em>
          </h2>
        </Reveal>

        {/*
          On a phone the four steps are read one at a time, so they are dealt
          like cards: each sticks under the header while the next slides up
          over it. From sm up there is room to set them side by side, and the
          original hairline grid returns — sticky and the grid never coexist.
        */}
        <ol
          className={cn(
            'mt-16 pb-[12vh]',
            'sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-[22px] sm:border sm:border-line sm:bg-line sm:pb-0',
            'lg:grid-cols-4'
          )}
        >
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className={cn(
                // The margin is what buys the scroll distance between cards:
                // without it they would pile up in a single flick.
                'sticky mb-[13vh] last:mb-0 sm:static sm:mb-0',
                STACK_TOP[i]
              )}
            >
              <Reveal
                delay={i * 90}
                className={cn(
                  'group flex h-full flex-col p-7 transition-colors duration-500 md:p-8',
                  // A card on a phone — opaque, or the one underneath shows
                  // through — and a plain cell of the grid from sm up.
                  'min-h-[17.5rem] rounded-[18px] border border-line bg-surface',
                  'shadow-[0_-10px_30px_-18px_rgba(20,32,26,0.35)]',
                  'sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-paper sm:shadow-none sm:hover:bg-surface'
                )}
              >
                <span className="numeral text-[2.4rem] leading-none text-line transition-colors duration-500 group-hover:text-brand/25">
                  {step.n}
                </span>
                <h3 className="display-sm mt-6">{step.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
