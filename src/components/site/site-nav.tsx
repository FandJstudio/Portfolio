"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { LogoMark } from "@/components/site/logo-mark";
import { SECTION_IDS, type Dictionary, type Locale } from "@/lib/i18n";

export function SiteNav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    /*
      No bar. The navigation is lifted out of the flow and laid straight over
      the hero, so the light ribbon runs behind the links and the page begins at
      the very top of the window with nothing boxing it in.

      Absolute rather than fixed: it still scrolls away with the document, so it
      never covers a section heading further down.
    */
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-5 sm:px-8">
        <a
          href={`#${SECTION_IDS.top}`}
          className="flex items-center gap-2.5 whitespace-nowrap"
        >
          <LogoMark alt="" priority className="h-[22px] w-auto" />
          <span className="text-note font-semibold tracking-tight">Studio</span>
          <span className="sr-only">F&amp;J Studio</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-7">
            {dict.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative label text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand transition-[width] duration-400 ease-swift group-hover:w-full" />
              </a>
            ))}
          </div>

          <LanguageSwitcher current={lang} label={dict.nav.languageLabel} />

          <a
            href={`#${SECTION_IDS.contact}`}
            className="inline-flex h-9 items-center bg-brand px-5 label text-white transition-colors duration-300 hover:bg-[color-mix(in_oklch,var(--brand),white_14%)]"
          >
            {dict.nav.cta}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          className="-mr-2 inline-flex size-10 items-center justify-center text-foreground transition-colors duration-300 hover:text-brand-bright md:hidden"
        >
          {open ? <X size={19} /> : <List size={19} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className="px-5 py-4 sm:px-8">
              {dict.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-subtitle text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-6 flex items-center justify-between gap-4">
                <LanguageSwitcher
                  current={lang}
                  label={dict.nav.languageLabel}
                  onNavigate={() => setOpen(false)}
                />
                <a
                  href={`#${SECTION_IDS.contact}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 flex-1 items-center justify-center bg-brand px-5 label text-white"
                >
                  {dict.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
