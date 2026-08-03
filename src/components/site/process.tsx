import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

/**
 * Deliberately the odd one out.
 *
 * Every other section on this page is a stack of full width ruled rows. A
 * process is not a list of options to scan, it is a sequence with a direction,
 * so it runs across the page on a rail with the steps hanging off it. On
 * narrow screens the same rail turns vertical, which keeps the reading order
 * obvious without inventing a second layout.
 *
 * It also sits on a raised plane rather than the page background, so the block
 * reads as one object instead of five more rows.
 */
export function Process({ dict }: { dict: Dictionary }) {
  const { steps } = dict.process;

  return (
    <section
      id={SECTION_IDS.process}
      className="relative z-10 border-t border-line bg-surface/40 py-section-tight"
    >
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <Reveal>
          <h2 className="text-title">{dict.process.headline}</h2>
        </Reveal>

        <RevealGroup
          stagger={0.09}
          className="relative mt-12 grid grid-cols-1 gap-y-9 lg:grid-cols-5 lg:gap-x-7"
        >
          {/* The rail. Horizontal on desktop, vertical below it. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-4 left-[11px] w-px bg-line lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />

          {steps.map((step, index) => (
            <RevealItem key={step.title} as="text" className="relative">
              <div className="flex gap-5 lg:block">
                <span className="relative z-10 grid size-6 shrink-0 place-items-center border border-line bg-background label tabular text-brand-bright">
                  {index + 1}
                </span>

                <div className="lg:mt-6">
                  <h3 className="text-subtitle">{step.title}</h3>
                  <p className="mt-3 max-w-[42ch] text-note text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
