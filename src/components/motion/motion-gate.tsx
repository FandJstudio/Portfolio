"use client";

import { useEffect } from "react";

/**
 * Keeps the page from staying invisible when the animation layer misbehaves.
 *
 * Two independent failures can hide content, and each needs its own answer.
 *
 * 1. The bundle never executes. The inline script in the document head puts the
 *    page into "pending", which permits Motion's serialised `opacity: 0` to
 *    hide content, and its watchdog turns the flag "off" if nothing claims it.
 *    The stylesheet then reveals every `[data-reveal]`. Flipping the flag to
 *    "ready" below is what tells that watchdog to stand down.
 *
 * 2. React mounts but an element never animates. This is the case the first
 *    fix missed, and it is the one a visitor actually hit: the hero headline
 *    stayed blank while the rest of the hero came up normally. Once the flag
 *    reads "ready" the stylesheet has stepped aside, so nothing recovers it.
 *    The sweep below closes that hole. It looks only at elements already
 *    inside the viewport, since anything below the fold is supposed to still
 *    be hidden, and only long after every entrance has had its turn.
 *
 * Deliberately stateless and render-free, so this component cannot itself be
 * the thing that fails.
 */

/* Longest entrance is ~0.9s plus a staggered delay. 4s is well clear of it. */
const SWEEP_DELAY_MS = 4000;

export function MotionGate() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = "ready";

    const sweep = window.setTimeout(() => {
      for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        if (getComputedStyle(el).opacity !== "0") continue;

        const box = el.getBoundingClientRect();
        const onScreen = box.top < window.innerHeight && box.bottom > 0;
        if (!onScreen) continue;

        el.style.opacity = "1";
        el.style.transform = "none";
      }
    }, SWEEP_DELAY_MS);

    return () => window.clearTimeout(sweep);
  }, []);

  return null;
}
