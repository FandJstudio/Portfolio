"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PL from "country-flag-icons/react/3x2/PL";
import US from "country-flag-icons/react/3x2/US";

import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const flags = { pl: PL, en: US } as const;
const names = { pl: "Polski", en: "English" } as const;

type Props = {
  current: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export function LanguageSwitcher({
  current,
  label,
  className,
  onNavigate,
}: Props) {
  const pathname = usePathname();

  /* Swap only the locale segment so the switch survives future subpages. */
  const hrefFor = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5",
        className,
      )}
    >
      {locales.map((locale) => {
        const Flag = flags[locale];
        const active = locale === current;

        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            title={names[locale]}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none",
              active
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Flag
              aria-hidden
              className={cn(
                "h-3 w-[18px] shrink-0 rounded-[2px] object-cover transition-opacity",
                active ? "opacity-100" : "opacity-60",
              )}
            />
            <span className="sr-only">{names[locale]}</span>
            <span aria-hidden>{locale}</span>
          </Link>
        );
      })}
    </div>
  );
}
