"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import { MaskReveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ dict }: { dict: Dictionary }) {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.top}
      className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col justify-between overflow-hidden px-5 pt-14 pb-14 sm:px-8 lg:pt-16 lg:pb-16"
    >
      {/*
        The ribbon is centred in its own canvas, so the canvas covers only the
        upper two thirds of the hero. That drops the band of light at roughly a
        third of the way down and turns it into the horizon the type stands on,
        rather than a glow running straight through the headline. The mask
        fades it out before the copy starts so nothing competes for contrast.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[68%] [mask-image:linear-gradient(to_bottom,black_45%,transparent_96%)]"
      >
        <motion.div
          data-reveal
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="size-full"
        >
          <WebGLShader
            xScale={0.9}
            yScale={0.42}
            distortion={0.06}
            speed={0.42}
          />
        </motion.div>
      </div>

      <motion.p
        data-reveal
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="relative label text-muted-foreground"
      >
        {dict.footer.tagline}
      </motion.p>

      <div className="relative max-w-[76rem] pt-20">
        <h1 className="text-poster">
          <MaskReveal text={dict.hero.headline} immediate delay={0.15} />
        </h1>

        <motion.div
          data-reveal
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="mt-11 flex flex-col gap-9 border-t border-line pt-9 xl:flex-row xl:items-start xl:justify-between xl:gap-14"
        >
          <p className="max-w-[44ch] text-lead text-muted-foreground">
            {dict.hero.subtext}
          </p>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="inline-flex">
              <a
                href={`#${SECTION_IDS.contact}`}
                className="group inline-flex h-14 w-full items-stretch bg-brand text-white transition-colors duration-300 hover:bg-[color-mix(in_oklch,var(--brand),white_14%)] sm:w-auto"
              >
                <span className="flex flex-1 items-center justify-center px-7 text-note font-medium whitespace-nowrap">
                  {dict.hero.primaryCta}
                </span>
                <span className="grid w-12 shrink-0 place-items-center border-l border-white/25">
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Magnetic>

            <a
              href={`#${SECTION_IDS.services}`}
              className="group inline-flex h-14 items-stretch border border-line bg-background/70 backdrop-blur-sm transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.06]"
            >
              <span className="flex flex-1 items-center justify-center px-7 text-note font-medium whitespace-nowrap">
                {dict.hero.secondaryCta}
              </span>
              <span className="grid w-12 shrink-0 place-items-center border-l border-line">
                <ArrowDown
                  size={15}
                  weight="bold"
                  className="text-brand-bright transition-transform duration-300 ease-swift group-hover:translate-y-0.5"
                />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
