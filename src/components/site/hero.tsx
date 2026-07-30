"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Magnetic } from "@/components/motion/magnetic";
import { LogoMark } from "@/components/site/logo-mark";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Scroll-linked, not scroll-listened: the hero recedes as the page moves on. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.2]);

  return (
    <section
      ref={ref}
      id={SECTION_IDS.top}
      className="relative z-10 flex min-h-[100dvh] items-center px-4 pt-24 pb-16 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ opacity: copyOpacity }} className="lg:col-span-8">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-balance-tight text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl xl:text-6xl"
          >
            {dict.hero.headline}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {dict.hero.subtext}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic className="inline-flex">
              <a
                href={`#${SECTION_IDS.contact}`}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-7 text-[0.95rem] font-medium whitespace-nowrap text-white shadow-[0_18px_50px_-20px_var(--brand)] transition-colors hover:bg-[color-mix(in_oklch,var(--brand),white_10%)] focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none active:translate-y-px sm:w-auto"
              >
                {dict.hero.primaryCta}
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>

            <a
              href={`#${SECTION_IDS.services}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-[0.95rem] font-medium whitespace-nowrap text-foreground transition-colors hover:border-white/25 hover:bg-white/5 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none active:translate-y-px"
            >
              {dict.hero.secondaryCta}
              <ArrowDown size={16} weight="bold" />
            </a>
          </motion.div>
        </motion.div>

        {/*
          Studio wordmark panel.
          TODO: swap for real studio photography or a showreel still (1200x1400)
          once assets exist, keeping the same glass frame.
        */}
        <motion.div
          style={{ y: markY }}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="relative lg:col-span-4"
        >
          <div className="glass relative aspect-[16/10] w-full overflow-hidden rounded-3xl lg:aspect-[4/5]">
            <div className="absolute -top-1/3 left-1/2 size-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_45%,transparent),transparent)] blur-2xl" />
            <div className="relative flex h-full flex-col justify-end p-7 sm:p-9">
              {/* self-start keeps the flex column from stretching the mark sideways. */}
              <LogoMark
                alt="F&J Studio"
                priority
                className="h-16 w-auto self-start sm:h-20"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                {dict.hero.caption}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
