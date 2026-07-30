import { ArrowUp } from "@phosphor-icons/react/ssr";

import { LogoMark } from "@/components/site/logo-mark";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="hairline-top relative z-10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark alt="" className="h-5 w-auto" />
            <span className="text-sm font-semibold tracking-tight">Studio</span>
            <span className="sr-only">F&amp;J Studio</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}
          </p>
          <a
            href={`#${SECTION_IDS.top}`}
            aria-label={dict.footer.backToTop}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ArrowUp size={16} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
