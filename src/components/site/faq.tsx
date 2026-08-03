import { Fragment } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  Clock,
  CurrencyCircleDollar,
  DeviceMobile,
  Globe,
  Handshake,
  Lifebuoy,
  MagnifyingGlass,
  PencilSimple,
  TrendUp,
} from "@phosphor-icons/react/ssr";

import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

/**
 * One glyph per question, matched by position. Kept out of the dictionary
 * because an icon is not something that gets translated.
 */
const icons: Icon[] = [
  CurrencyCircleDollar,
  Clock,
  Handshake,
  Lifebuoy,
  Globe,
  PencilSimple,
  DeviceMobile,
  MagnifyingGlass,
  TrendUp,
];

/**
 * Renders `**bold**` runs inside an answer. A full markdown parser would be
 * absurd for the two emphasised timeframes this page actually has.
 */
function withEmphasis(text: string) {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-medium text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section
      id={SECTION_IDS.faq}
      className="relative z-10 border-t border-line py-section-tight"
    >
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/*
            The heading holds still while the questions scroll past it. With
            nine entries the reader is inside this section for a long time, and
            a sticky column keeps the way out visible the whole way down.
          */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-10">
              <Reveal>
                <p className="label text-brand-bright">FAQ</p>
                <h2 className="mt-6 max-w-[14ch] text-title">
                  {dict.faq.headline}
                </h2>
                <p className="mt-5 max-w-[34ch] text-note text-muted-foreground">
                  {dict.faq.supportText}{" "}
                  <a
                    href={`#${SECTION_IDS.contact}`}
                    className="font-medium text-brand-bright underline-offset-4 transition-colors duration-300 hover:underline"
                  >
                    {dict.nav.cta}
                  </a>
                </p>
              </Reveal>
            </div>
          </div>

          {/*
            Radix rather than native details: it measures the panel and exposes
            the height as a custom property, which is the only way to animate a
            disclosure open without hardcoding a height. Only one answer is open
            at a time, and `collapsible` lets the reader close it again.
          */}
          <div className="lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-2.5">
              {dict.faq.items.map((item, index) => {
                const Glyph = icons[index] ?? CurrencyCircleDollar;

                return (
                  <Reveal key={item.q} as="text">
                    <AccordionItem
                      value={`faq-${index}`}
                      className="group/item border border-line bg-surface/60 px-5 transition-colors duration-500 hover:border-line-strong sm:px-6"
                    >
                      <AccordionTrigger className="py-5">
                        <span className="flex items-center gap-3.5">
                          <Glyph
                            size={18}
                            weight="light"
                            aria-hidden
                            className="shrink-0 text-brand-bright"
                          />
                          <span className="text-body">{item.q}</span>
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="pb-5">
                        <p className="max-w-[68ch] text-note text-muted-foreground sm:pl-[calc(18px+0.875rem)]">
                          {withEmphasis(item.a)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Reveal>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
