import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

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

  return (
    <html
      lang={lang}
      /* Tells Next the smooth scrolling is deliberate, so it suppresses it on route changes. */
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
