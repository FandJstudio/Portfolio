import { notFound } from "next/navigation";

import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { AmbientBackground } from "@/components/site/ambient-background";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";
import { Fit } from "@/components/site/fit";
import { Hero } from "@/components/site/hero";
import { Process } from "@/components/site/process";
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
      <SmoothScroll />
      <AmbientBackground />
      <SiteNav dict={dict} lang={lang} />
      <main className="flex-1">
        <Hero dict={dict} />
        <Fit dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <Projects dict={dict} />
        <Faq dict={dict} />
        <Contact dict={dict} lang={lang} />
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}
