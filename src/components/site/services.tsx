import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  CloudArrowUp,
  Code,
  DeviceMobile,
  PenNib,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ServiceKey = keyof Dictionary["services"]["items"];

type ServiceLayout = {
  key: ServiceKey;
  icon: Icon;
  /** Column span on large screens. The grid is 6 wide. */
  span: string;
  /** Surface treatment, kept within the one accent. */
  surface?: string;
};

const layout: ServiceLayout[] = [
  {
    key: "design",
    icon: PenNib,
    span: "lg:col-span-4",
    surface:
      "bg-[radial-gradient(120%_120%_at_100%_0%,color-mix(in_oklch,var(--brand)_28%,transparent),transparent_60%)]",
  },
  { key: "code", icon: Code, span: "lg:col-span-2" },
  { key: "speed", icon: DeviceMobile, span: "lg:col-span-2" },
  {
    key: "hosting",
    icon: CloudArrowUp,
    span: "lg:col-span-4",
    surface:
      "bg-[radial-gradient(circle_at_1px_1px,oklch(1_0_0/_9%)_1px,transparent_0)] [background-size:22px_22px]",
  },
  { key: "updates", icon: ArrowsClockwise, span: "lg:col-span-3" },
  {
    key: "security",
    icon: ShieldCheck,
    span: "lg:col-span-3",
    surface: "bg-[linear-gradient(200deg,oklch(1_0_0/_6%),transparent_55%)]",
  },
];

export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section
      id={SECTION_IDS.services}
      className="relative z-10 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl leading-[1.1] font-semibold tracking-tight text-balance-tight sm:text-4xl lg:text-5xl">
            {dict.services.headline}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
            {dict.services.body}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {layout.map(({ key, icon: Glyph, span, surface }) => {
            const copy = dict.services.items[key];

            return (
              <RevealItem key={key} className={cn(span)}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border border-white/8 bg-surface/60 p-7 transition-colors duration-500 hover:border-white/16",
                    surface,
                  )}
                >
                  <Glyph
                    size={22}
                    weight="light"
                    className="text-brand-bright transition-transform duration-500 group-hover:scale-110"
                  />
                  <h3 className="mt-6 text-lg font-medium tracking-tight">
                    {copy.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {copy.body}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
