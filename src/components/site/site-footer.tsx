import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react/ssr";

import { CookieSettingsLink } from "@/components/site/cookie-settings-link";
import { LogoMark } from "@/components/site/logo-mark";
import { SECTION_IDS, type Dictionary, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

/*
  A closing plane rather than the single thin strip this used to be.

  The reference for it is the standard SaaS footer: description on the left,
  columns of links on the right. What is borrowed is the structure, not the
  styling. The columns are separated by the same hairline rules used everywhere
  else on the page, headings use the mono label, and nothing sits in a card, so
  it reads as the end of this site rather than a component from another one.

  Deliberately absent: the row of compliance badges in the reference. SOC 2,
  HIPAA and the rest are audited certifications. Drawing them for a studio that
  does not hold them would be a claim, not a decoration.
*/
export function SiteFooter({
  dict,
  lang,
  /* Anchors have to travel back to the home page from the policy page. */
  basePath = "",
}: {
  dict: Dictionary;
  lang: Locale;
  basePath?: string;
}) {
  const to = (hash: string) => `${basePath}${hash}`;
  const linkClass =
    "text-note text-muted-foreground underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline";

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.7fr))] lg:gap-10 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <LogoMark alt="" className="h-6 w-auto" />
              <span className="text-note font-semibold tracking-tight">
                Studio
              </span>
              <span className="sr-only">F&amp;J Studio</span>
            </div>

            <p className="mt-6 max-w-[46ch] text-note text-muted-foreground">
              {dict.footer.description}
            </p>

            <a
              href={to(`#${SECTION_IDS.contact}`)}
              className="group mt-8 inline-flex h-12 items-stretch border border-line transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.06]"
            >
              <span className="flex items-center px-6 text-note font-medium whitespace-nowrap">
                {dict.footer.writeToUs}
              </span>
              <span className="grid w-11 shrink-0 place-items-center border-l border-line">
                <ArrowUpRight
                  size={14}
                  weight="bold"
                  className="text-brand-bright transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </div>

          <nav aria-label={dict.footer.navHeading}>
            <p className="label text-brand-bright">{dict.footer.navHeading}</p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {dict.footer.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={to(link.href)} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label text-brand-bright">
              {dict.footer.contactHeading}
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className={`${linkClass} tabular`}
                >
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label text-brand-bright">
              {dict.footer.legalHeading}
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <a href={`/${lang}/${dict.privacy.slug}`} className={linkClass}>
                  {dict.footer.privacy}
                </a>
              </li>
              <li>
                <CookieSettingsLink
                  label={dict.footer.cookieSettings}
                  className={`${linkClass} cursor-pointer text-left`}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-muted-foreground">
            &copy; {new Date().getFullYear()} F&amp;J Studio.{" "}
            {dict.footer.rights}
          </p>

          <a
            href={to(`#${SECTION_IDS.top}`)}
            aria-label={dict.footer.backToTop}
            className="group inline-flex size-10 shrink-0 items-center justify-center border border-line text-muted-foreground transition-colors duration-300 hover:border-line-strong hover:text-foreground"
          >
            <ArrowUp
              size={14}
              weight="bold"
              className="transition-transform duration-300 ease-swift group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
