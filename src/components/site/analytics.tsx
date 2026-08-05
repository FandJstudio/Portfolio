"use client";

import Script from "next/script";
import { useEffect } from "react";

import { ANALYTICS_ENABLED, GA_MEASUREMENT_ID } from "@/lib/site";
import { useConsent } from "@/lib/use-consent";

/*
  Google Analytics, mounted only once the visitor has accepted.

  Returning null is the whole privacy story: until consent exists, these script
  tags are not in the document, so nothing is fetched from Google and no cookie
  is written. Withdrawing consent unmounts them again and the stored cookies are
  cleared in lib/consent.

  The tag exists only in a production build, so running the site locally never
  reports into the studio's real statistics. The id itself lives in lib/site.
*/

const GA_ID = ANALYTICS_ENABLED ? GA_MEASUREMENT_ID : null;

export function Analytics() {
  const consent = useConsent();

  /*
    Unmounting the tags is not enough to stop collection.

    next/script injects into the document and leaves what it injected there, so
    withdrawing consent removes these components from the React tree while the
    already executed gtag stays loaded and willing to keep sending. Deleting the
    cookies without this would look like a working opt out and not be one until
    the next page load.

    `ga-disable-<id>` is Google's own kill switch and takes effect immediately.
    The consent update is belt and braces for anything that reads it instead.
  */
  useEffect(() => {
    if (!GA_ID) return;

    const scope = window as unknown as Record<string, unknown> & {
      gtag?: (...args: unknown[]) => void;
    };
    const off = consent !== "granted";

    scope[`ga-disable-${GA_ID}`] = off;
    if (off) {
      scope.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  }, [consent]);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          /*
            Analytics is the only thing that was asked for and the only thing
            granted. Advertising storage stays denied even now, so the tag cannot
            quietly widen its own permissions later.
          */
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
