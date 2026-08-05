import { ArrowLeft } from "@phosphor-icons/react/ssr";

import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { AmbientBackground } from "@/components/site/ambient-background";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * The privacy policy, rendered from the dictionary so both languages stay in
 * step and neither can silently fall behind the other.
 *
 * The navigation is transparent and absolutely positioned, which works because
 * the hero sits underneath it on the home page. There is no hero here, so the
 * article carries the top padding that keeps it clear of the links, and the
 * navigation's anchors are pointed back at the home page rather than at
 * fragments this page does not contain.
 */
export function PrivacyPolicy({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <SiteNav dict={dict} lang={lang} basePath={`/${lang}`} />

      <main className="flex-1">
        <article className="relative z-10 mx-auto max-w-[100rem] px-5 pt-30 pb-section-tight sm:px-8 lg:pt-32">
          <div className="max-w-[74ch]">
            <h1 className="text-display">{dict.privacy.title}</h1>
            <p className="mt-5 label text-muted-foreground">
              {dict.privacy.updated}
            </p>
            <p className="mt-9 text-lead text-muted-foreground">
              {dict.privacy.intro}
            </p>

            {dict.privacy.sections.map((section, index) => (
              <section key={section.heading} className="mt-14">
                <div className="flex items-baseline gap-5 border-t border-line pt-7">
                  <span className="label tabular text-brand-bright">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-subtitle">{section.heading}</h2>
                </div>

                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-note text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <a
              href={`/${lang}`}
              className="group mt-16 inline-flex h-12 items-center gap-3 border border-line px-7 text-note font-medium transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.06]"
            >
              <ArrowLeft
                size={15}
                weight="bold"
                aria-hidden
                className="text-brand-bright transition-transform duration-300 ease-swift group-hover:-translate-x-0.5"
              />
              {dict.privacy.back}
            </a>
          </div>
        </article>
      </main>

      <SiteFooter dict={dict} lang={lang} basePath={`/${lang}`} />
    </>
  );
}
