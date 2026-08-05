/*
  The visitor's decision about analytics, and nothing else.

  Two deliberate choices here.

  The decision is kept in localStorage rather than in a cookie. Storing "this
  person refused cookies" in a cookie is the joke that writes itself, and while
  a strictly necessary cookie would be lawful, localStorage avoids sending the
  value to the server on every single request for no reason.

  Nothing is loaded before consent. Google's own Consent Mode would have the tag
  load with storage denied and still send cookieless pings, which is a defensible
  reading of the rules and not the cautious one. Here the Google script is simply
  absent from the page until someone clicks accept: no cookies, no requests, no
  argument to have.
*/

const KEY = "fj-consent-analytics";

/** Fired on the window whenever the decision changes, so listeners can react. */
export const CONSENT_EVENT = "fj-consent-change";

export type Consent = "granted" | "denied";

/** `null` means the visitor has not answered yet, which is not the same as "no". */
export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    /* Private browsing modes can throw on access. Treat as undecided. */
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* If it cannot be stored, the banner simply asks again next visit. */
  }

  if (value === "denied") clearAnalyticsCookies();
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/**
 * Removes the cookies Google Analytics already set.
 *
 * Withdrawing consent has to actually withdraw something. Without this, someone
 * who accepts and later changes their mind keeps `_ga` on their machine for two
 * years, which makes the reject button decorative.
 */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => !!name && name.startsWith("_ga"));

  /* The cookie was set on the registrable domain, so expire it on both that and
     the exact host, or the browser keeps the copy that does not match. */
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

/**
 * Reports an event to Analytics, and does nothing at all if the visitor has not
 * accepted. Callers do not need to know which of the two is happening.
 */
export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  gtag?.("event", name, params ?? {});
}
