"use client";

import { useSyncExternalStore } from "react";

import { CONSENT_EVENT, readConsent } from "@/lib/consent";

/*
  Reads the stored decision as an external store rather than copying it into
  state inside an effect.

  The distinction that matters is between "not answered" and "not known yet".
  The answer lives in localStorage, which the server cannot see, so the first
  render on both sides reports `unknown` and shows nothing. Treating that as
  "not answered" would flash the banner at every visitor who already decided,
  once per page load, which is precisely the behaviour that makes these things
  hated.
*/

export type ConsentState = "unknown" | "undecided" | "granted" | "denied";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(
    subscribe,
    () => readConsent() ?? "undecided",
    () => "unknown" as const,
  );
}
