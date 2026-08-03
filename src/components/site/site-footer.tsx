import { ArrowUp } from "@phosphor-icons/react/ssr";

import { LogoMark } from "@/components/site/logo-mark";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <LogoMark alt="" className="h-5 w-auto" />
          <span className="text-note font-semibold tracking-tight">Studio</span>
          <span className="sr-only">F&amp;J Studio</span>
          <span aria-hidden className="h-4 w-px bg-line" />
          <span className="label text-muted-foreground">
            {dict.footer.tagline}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="label text-muted-foreground underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="label text-muted-foreground tabular">
            &copy; {new Date().getFullYear()}
          </p>
          <a
            href={`#${SECTION_IDS.top}`}
            aria-label={dict.footer.backToTop}
            className="group inline-flex size-10 items-center justify-center border border-line text-muted-foreground transition-colors duration-300 hover:border-line-strong hover:text-foreground"
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
