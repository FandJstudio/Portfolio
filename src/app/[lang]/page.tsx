import { notFound } from "next/navigation";

import { About } from "@/components/site/about";
import { AmbientBackground } from "@/components/site/ambient-background";
import { Contact } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { Projects } from "@/components/site/projects";
import { Services } from "@/components/site/services";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <AmbientBackground />
      <SiteNav dict={dict} lang={lang} />
      <main className="flex-1">
        <Hero dict={dict} />
        <About dict={dict} />
        <Services dict={dict} />
        <Projects dict={dict} />
        <Contact dict={dict} lang={lang} />
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}
