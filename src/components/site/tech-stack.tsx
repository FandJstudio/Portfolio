import type { IconType } from "react-icons";
import {
  SiCss,
  SiFramer,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { Dictionary } from "@/lib/i18n";

const stack: { name: string; icon: IconType }[] = [
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "shadcn/ui", icon: SiShadcnui },
  { name: "Motion", icon: SiFramer },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
];

export function TechStack({ dict }: { dict: Dictionary }) {
  return (
    <div className="mt-20">
      <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
        {dict.about.stackHeadline}
      </h3>
      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
        {dict.about.stackBody}
      </p>

      <RevealGroup
        stagger={0.04}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      >
        {stack.map(({ name, icon: Glyph }) => (
          <RevealItem key={name}>
            <div className="group flex h-full items-center gap-3 rounded-2xl border border-white/8 bg-surface/50 px-4 py-3.5 transition-all duration-400 hover:-translate-y-0.5 hover:border-[color-mix(in_oklch,var(--brand)_45%,transparent)] hover:bg-surface">
              <Glyph
                aria-hidden
                className="size-5 shrink-0 text-muted-foreground transition-colors duration-400 group-hover:text-brand-bright"
              />
              <span className="text-sm font-medium tracking-tight">{name}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
