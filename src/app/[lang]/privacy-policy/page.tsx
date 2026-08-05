import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrivacyPolicy } from "@/components/site/privacy-policy";
import { getDictionary } from "@/lib/i18n";

/* English counterpart of /pl/polityka-prywatnosci. See that file for why the
   two languages get separate folders rather than one shared slug. */

const LANG = "en";

export function generateMetadata(): Metadata {
  const dict = getDictionary(LANG);

  return {
    title: dict.privacy.title,
    alternates: {
      canonical: `/${LANG}/${dict.privacy.slug}`,
      languages: {
        pl: `/pl/${getDictionary("pl").privacy.slug}`,
        en: `/en/${getDictionary("en").privacy.slug}`,
      },
    },
  };
}

export default async function Page({
  params,
}: PageProps<"/[lang]/privacy-policy">) {
  const { lang } = await params;
  if (lang !== LANG) notFound();

  return <PrivacyPolicy dict={getDictionary(LANG)} lang={LANG} />;
}
