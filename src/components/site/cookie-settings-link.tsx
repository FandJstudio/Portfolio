"use client";

import { OPEN_COOKIE_SETTINGS } from "@/components/site/cookie-banner";

/**
 * Reopens the consent banner.
 *
 * Consent that cannot be withdrawn as easily as it was given is not consent, so
 * this link is permanent and sits in the footer of every page. It is a button
 * rather than an anchor because it goes nowhere, and it is split into its own
 * client component so the footer itself can stay on the server.
 */
export function CookieSettingsLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      className={className}
    >
      {label}
    </button>
  );
}
