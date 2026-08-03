"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const CHARACTER = {
  text: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } },
  },
  surface: {
    hidden: { opacity: 0, y: 26, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  },
} satisfies Record<string, Variants>;

type Character = keyof typeof CHARACTER;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "text",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Character;
}) {
  const reduce = useReducedMotion();
  const variant = CHARACTER[as];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : variant.hidden}
      whileInView={{
        ...variant.visible,
        transition: { ...variant.visible.transition, delay },
      }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.04 },
  }),
};

export function RevealGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      custom={stagger}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  as = "surface",
}: {
  children: ReactNode;
  className?: string;
  as?: Character;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={CHARACTER[as]}>
      {children}
    </motion.div>
  );
}

/*
  Words rise into place one after another, left to right.

  An earlier version clipped each word behind its own overflow-hidden box, which
  is the crisper Montreal-studio version of this effect. It had to go: the clip
  box is only as tall as the line-height, so descenders needed padding, the
  padding needed a negative margin to claw the space back, and at the 0.88
  leading this display type uses that negative margin collapsed the line boxes
  into each other. Three lines of headline rendered on top of one another.

  Translating without clipping cannot break wrapping, and at this size and speed
  the missing hard edge is not what anyone notices.
*/
export function MaskReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Play on mount instead of waiting for the viewport. Hero copy wants this. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  const animation = immediate
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.35 },
      };

  return (
    <motion.span
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...animation}
    >
      {words.map((word, index) => (
        // The space is a text node between the spans, never inside one. An
        // inline-block is atomic, so a trailing space within it gives the line
        // breaker nothing to use and the whole headline runs off on one line.
        <Fragment key={`${word}-${index}`}>
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "0.38em", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.9, ease: EASE },
              },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

/**
 * Moves its child against the scroll. `speed` is the fraction of the element's
 * own height it travels across the full pass through the viewport.
 */
export function Parallax({
  children,
  className,
  speed = 0.12,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`${speed * 100}%`, `${-speed * 100}%`],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="size-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
