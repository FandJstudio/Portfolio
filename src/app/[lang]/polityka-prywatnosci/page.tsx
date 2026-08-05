import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrivacyPolicy } from "@/components/site/privacy-policy";
import { getDictionary } from "@/lib/i18n";

/*
  The Polish address for the policy. English has its own folder under
  /en/privacy-policy rather than sharing one slug, because a Polish company's
  legal page reading "/pl/privacy-policy" looks like an oversight, and search
  engines index the words in the path.

  Each folder answers for one language only and 404s for the other, so there is
  exactly one correct address per language and no duplicate content.
*/

const LANG = "pl";

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
}: PageProps<"/[lang]/polityka-prywatnosci">) {
  const { lang } = await params;
  if (lang !== LANG) notFound();

  return <PrivacyPolicy dict={getDictionary(LANG)} lang={LANG} />;
}
