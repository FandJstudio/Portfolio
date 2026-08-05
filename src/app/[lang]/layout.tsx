import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { MotionGate } from "@/components/motion/motion-gate";
import { Analytics } from "@/components/site/analytics";
import { CookieBanner } from "@/components/site/cookie-banner";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/*
  Production address of the site. Feeds canonical, hreflang and link previews,
  so it has to match the domain visitors actually land on, including the www
  prefix that the apex redirects to. Change here if the domain ever changes.
*/
const siteUrl = "https://www.fjwebstudio.com";

/*
  Runs before the first paint and decides whether the page may hide anything.

  Motion serialises its `initial` styles into the HTML, so every revealed
  element ships as style="opacity:0". That is fine while the bundle runs, and a
  blank page when it does not: no script, no reveal, no content. The stylesheet
  therefore forces those elements visible unless this attribute says otherwise.

  - attribute absent (scripting off or the script blocked): content visible
  - "pending": a script is alive, hiding is allowed, so no flash of content
  - "ready": React mounted, Motion owns visibility from here
  - "off": the watchdog fired because React never mounted, which means the
    bundle failed after this script ran. Content is shown regardless.
*/
const MOTION_GUARD = `(function(){var r=document.documentElement;r.dataset.motion='pending';setTimeout(function(){if(r.dataset.motion!=='ready'){r.dataset.motion='off'}},4000)})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: "%s | F&J Studio" },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: lang === "pl" ? "pl_PL" : "en_US",
      url: `${siteUrl}/${lang}`,
      siteName: "F&J Studio",
      title: dict.meta.shareTitle,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      /* Tells Next the smooth scrolling is deliberate, so it suppresses it on route changes. */
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_GUARD }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <MotionGate />
        {children}
        {/* Both live in the layout so the policy page carries them too: the
            banner has to be reachable from every page, and the link that
            reopens it sits in a footer that appears on all of them. */}
        <Analytics />
        <CookieBanner dict={dict} lang={lang} />
      </body>
    </html>
  );
}
