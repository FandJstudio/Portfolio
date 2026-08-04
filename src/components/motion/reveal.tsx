"use client";

import {
  Fragment,
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/*
  Entrances are animated by the stylesheet. JavaScript only decides when.

  This split is the whole point of the file, and it was paid for. The earlier
  version drove every entrance through the animation library, which meant a
  visitor's browser had to run an animation frame loop before any of this text
  became readable. On a machine that throttles that loop - a laptop on battery,
  a browser in efficiency mode, a tab that was opened in the background - the
  loop stalls, the animation never advances, and content served at opacity 0
  simply never appears. Which is exactly what happened, twice, to a real
  visitor: the sections that were plain markup showed up and every animated one
  stayed blank.

  CSS animations do not run on that loop. They are handed to the compositor and
  play whether or not the main thread is keeping up. So the trigger stays in
  JavaScript, where it needs to know about the viewport, and the animation
  itself moves to the stylesheet, where it cannot be starved.

  IntersectionObserver is the trigger rather than a scroll handler for the same
  reason: it reports independently of frame timing.
*/

/**
 * Adds `data-shown` the first time the element reaches the viewport, which is
 * what the stylesheet waits for.
 *
 * Triggering happens on any intersection at all rather than on a fraction of
 * the element, with a small bottom inset so it fires just after the edge comes
 * in. Asking for a fraction looks tidier and quietly breaks: an element taller
 * than the window can never show 25% of itself, so it would wait forever.
 */
function useEnter<T extends HTMLElement>(reveal?: (el: T) => void) {
  const ref = useRef<T>(null);

  /* Written in an effect, not during render: mutating a ref while rendering is
     unsafe once React is allowed to render concurrently. */
  const revealRef = useRef(reveal);
  useEffect(() => {
    revealRef.current = reveal;
  }, [reveal]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      const custom = revealRef.current;
      if (custom) custom(el);
      else el.dataset.shown = "true";
    };

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        show();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** The delay is read by the stylesheet as `animation-delay`. */
function delayStyle(seconds: number): CSSProperties {
  return { "--enter-delay": `${seconds.toFixed(3)}s` } as CSSProperties;
}

type Character = "text" | "surface";

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
  const ref = useEnter<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={as}
      className={className}
      style={delayStyle(delay)}
    >
      {children}
    </div>
  );
}

/**
 * Spaces out the entrances of the items directly inside it.
 *
 * It hands each child a delay and nothing else. The children start themselves,
 * so a group that never notices the viewport can no longer hold its contents
 * hidden - the failure that emptied this page's qualifying section.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>(":scope > [data-reveal]");
    items.forEach((item, index) => {
      item.style.setProperty("--enter-delay", `${(index * stagger).toFixed(3)}s`);
    });
  }, [stagger, children]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
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
  const ref = useEnter<HTMLDivElement>();

  return (
    <div ref={ref} data-reveal={as} className={className}>
      {children}
    </div>
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
  const words = text.split(" ");

  /*
    The hero headline plays on load, so it needs no trigger at all and carries
    none: no observer, no attribute, no hidden state in the served markup. It is
    the largest text on the page and the first thing anyone reads, and it now
    depends on nothing beyond the stylesheet being applied.
  */
  const ref = useEnter<HTMLSpanElement>(
    immediate
      ? undefined
      : (el) => {
          for (const word of el.querySelectorAll<HTMLElement>("[data-reveal]")) {
            word.dataset.shown = "true";
          }
        },
  );

  return (
    <span ref={immediate ? undefined : ref} className={className}>
      {words.map((word, index) => (
        // The space is a text node between the spans, never inside one. An
        // inline-block is atomic, so a trailing space within it gives the line
        // breaker nothing to use and the whole headline runs off on one line.
        <Fragment key={`${word}-${index}`}>
          <span
            {...(immediate ? {} : { "data-reveal": "word" })}
            className={
              immediate
                ? "inline-block will-change-transform animate-word-in motion-reduce:animate-none"
                : "inline-block will-change-transform"
            }
            style={delayStyle(delay + index * stagger)}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/**
 * Moves its child against the scroll. `speed` is the fraction of the element's
 * own height it travels across the full pass through the viewport.
 *
 * The one effect here that is genuinely tied to scroll position and so stays
 * with the animation library. It only ever moves something that is already
 * visible, so a browser that starves it loses a touch of depth and nothing
 * that can be read.
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
