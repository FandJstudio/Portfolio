"use client";

import { useEffect } from "react";

/**
 * Confirms that React actually mounted.
 *
 * The inline script in the document head puts the page into "pending", which
 * permits Motion's serialised `opacity: 0` to hide content. This flips it to
 * "ready" once hydration has really happened. If the bundle never executes, the
 * flag stays "pending" until the watchdog turns it "off" and the stylesheet
 * reveals everything.
 *
 * Written as a bare effect with no state so it cannot itself be the thing that
 * fails: an empty render, one attribute write, nothing else.
 */
export function MotionGate() {
  useEffect(() => {
    document.documentElement.dataset.motion = "ready";
  }, []);

  return null;
}
