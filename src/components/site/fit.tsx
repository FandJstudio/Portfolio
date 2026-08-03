import { Check, X } from "@phosphor-icons/react/ssr";

import { MaskReveal, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

/**
 * A qualifying section: it tells the visitor within a few seconds whether to
 * keep reading or leave. Saying plainly what the studio does not build is the
 * point of it, so the two answers sit side by side and get equal room rather
 * than the exclusions being buried in small print.
 *
 * The two columns are separated by a rule instead of being put in cards, and
 * the difference between them is carried by the accent alone: red ticks and
 * full contrast copy on the left, muted crosses and muted copy on the right.
 * No second colour enters the palette to say "no".
 */
export function Fit({ dict }: { dict: Dictionary }) {
  const { yes, no } = dict.fit;

  return (
    <section
      id={SECTION_IDS.fit}
      className="relative z-10 border-t border-line py-section-tight"
    >
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <h2 className="max-w-[18ch] text-display">
          <MaskReveal text={dict.fit.headline} />
        </h2>

        <div className="mt-rhythm grid grid-cols-1 lg:grid-cols-2">
          <div className="border-t border-line pt-8 lg:border-t-0 lg:border-r lg:pt-0 lg:pr-12 xl:pr-16">
            <p className="label text-brand-bright">{dict.fit.yesLabel}</p>

            <RevealGroup stagger={0.05} className="mt-7">
              {yes.map((item) => (
                <RevealItem key={item} as="text">
                  <div className="flex items-start gap-4 border-b border-line py-4">
                    <Check
                      size={16}
                      weight="bold"
                      aria-hidden
                      className="mt-1 shrink-0 text-brand-bright"
                    />
                    <span className="text-body">{item}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="mt-12 border-t border-line pt-8 lg:mt-0 lg:border-t-0 lg:pt-0 lg:pl-12 xl:pl-16">
            <p className="label text-muted-foreground">{dict.fit.noLabel}</p>

            <RevealGroup stagger={0.05} className="mt-7">
              {no.map((item) => (
                <RevealItem key={item} as="text">
                  <div className="flex items-start gap-4 border-b border-line py-4">
                    <X
                      size={16}
                      weight="bold"
                      aria-hidden
                      className="mt-1 shrink-0 text-muted-foreground"
                    />
                    <span className="text-body text-muted-foreground">
                      {item}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-[62ch] text-note text-muted-foreground">
            {dict.fit.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
