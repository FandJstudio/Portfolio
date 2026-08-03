import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  CloudArrowUp,
  Code,
  DeviceMobile,
  MagnifyingGlass,
  PenNib,
  PlugsConnected,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";

import { MaskReveal, Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

type ServiceKey = keyof Dictionary["services"]["items"];

/* Order is the running order on the page, and the numbers follow from it. */
const rows: { key: ServiceKey; icon: Icon }[] = [
  { key: "design", icon: PenNib },
  { key: "code", icon: Code },
  { key: "speed", icon: DeviceMobile },
  { key: "hosting", icon: CloudArrowUp },
  { key: "updates", icon: ArrowsClockwise },
  { key: "security", icon: ShieldCheck },
  { key: "seo", icon: MagnifyingGlass },
  { key: "integrations", icon: PlugsConnected },
];

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id={SECTION_IDS.services} className="relative z-10 py-section-tight">
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <Reveal>
          <p className="label text-brand-bright">{dict.nav.links[0].label}</p>
        </Reveal>
        <h2 className="mt-7 max-w-[16ch] text-display">
          <MaskReveal text={dict.services.headline} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[62ch] text-lead text-muted-foreground">
            {dict.services.body}
          </p>
        </Reveal>
      </div>

      {/*
        Loud numbered blocks rather than a quiet list. Each row is a hit target
        the full width of the page, the count gives the set a rhythm to read
        down, and the red wash rising on hover tells you which one you are on
        without moving anything.
      */}
      <div className="mt-rhythm">
        {rows.map(({ key, icon: Glyph }, index) => {
          const copy = dict.services.items[key];

          return (
            <Reveal key={key} as="text">
              <article className="group relative overflow-hidden border-t border-line last:border-b">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[color-mix(in_oklch,var(--brand)_11%,transparent)] transition-transform duration-600 ease-swift group-hover:scale-y-100"
                />

                <div className="relative mx-auto grid max-w-[100rem] grid-cols-1 gap-4 px-5 py-7 sm:px-8 lg:grid-cols-12 lg:items-baseline lg:gap-10 lg:py-9">
                  <span className="label tabular text-muted-foreground transition-colors duration-500 group-hover:text-brand-bright lg:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="flex items-center gap-4 text-subtitle lg:col-span-6 lg:text-title">
                    <Glyph
                      size={20}
                      weight="light"
                      className="shrink-0 text-brand-bright lg:hidden"
                    />
                    {copy.title}
                  </h3>

                  <p className="max-w-[52ch] text-body text-muted-foreground lg:col-span-5">
                    {copy.body}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
