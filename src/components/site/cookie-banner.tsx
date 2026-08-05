"use client";

import { useEffect, useState } from "react";

import { writeConsent, type Consent } from "@/lib/consent";
import { useConsent } from "@/lib/use-consent";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Dispatched by the footer link so a decided visitor can change their mind. */
export const OPEN_COOKIE_SETTINGS = "fj-open-cookie-settings";

/*
  Consent banner.

  Accept and decline are the same size, the same shape and sit side by side. The
  usual pattern - a solid accept button next to a grey scrap of text - is the
  thing regulators keep objecting to, and it is not worth the few extra opt-ins
  on a studio site.

  It renders nothing on the server and nothing until mounted, because the answer
  lives in localStorage and only the browser can read it. Deciding on the server
  would either flash the banner at people who already answered, or hide it from
  people who have not.
*/
export function CookieBanner({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  /* Still hydrating: the stored answer is not readable yet. Show nothing rather
     than guess, or people who already answered get the banner again every load. */
  if (consent === "unknown") return null;
  if (consent !== "undecided" && !reopened) return null;

  const decide = (value: Consent) => {
    writeConsent(value);
    setReopened(false);
  };

  return (
    <div
      role="dialog"
      aria-label={dict.cookies.label}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[100rem] flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-[62ch]">
          <p className="label text-brand-bright">{dict.cookies.title}</p>
          <p className="mt-3 text-note text-muted-foreground">
            {dict.cookies.body}{" "}
            <a
              href={`/${lang}/${dict.privacy.slug}`}
              className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-brand-bright"
            >
              {dict.footer.privacy}
            </a>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="h-12 border border-line px-7 text-note font-medium whitespace-nowrap transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.06]"
          >
            {dict.cookies.reject}
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="h-12 bg-brand px-7 text-note font-medium whitespace-nowrap text-white transition-colors duration-300 hover:bg-[color-mix(in_oklch,var(--brand),white_14%)]"
          >
            {dict.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
