"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { LanguageSwitcher } from "@/components/site/language-switcher";
import { LogoMark } from "@/components/site/logo-mark";
import { SECTION_IDS, type Dictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteNav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  /* State flips once at the threshold, not on every scroll frame. */
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 pl-5 transition-all duration-500 sm:h-16",
          scrolled ? "glass" : "border border-transparent",
        )}
      >
        <a
          href={`#${SECTION_IDS.top}`}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <LogoMark alt="" priority className="h-6 w-auto sm:h-7" />
          <span className="text-[0.95rem] font-semibold tracking-tight">
            Studio
          </span>
          <span className="sr-only">F&amp;J Studio</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <LanguageSwitcher
            current={lang}
            label={dict.nav.languageLabel}
            className="mr-2"
          />

          {dict.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}

          <a
            href={`#${SECTION_IDS.contact}`}
            className="ml-2 inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-medium whitespace-nowrap text-white transition-[transform,background-color] hover:bg-[color-mix(in_oklch,var(--brand),white_10%)] focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none active:translate-y-px"
          >
            {dict.nav.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/8 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-2 md:hidden"
          >
            <div className="px-2 pt-1 pb-2">
              <LanguageSwitcher
                current={lang}
                label={dict.nav.languageLabel}
                onNavigate={() => setOpen(false)}
                className="w-fit"
              />
            </div>

            {dict.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`#${SECTION_IDS.contact}`}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl bg-brand px-4 py-3 text-center text-base font-medium text-white"
            >
              {dict.nav.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
