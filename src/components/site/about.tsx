import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TechStack } from "@/components/site/tech-stack";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

const team = [
  { name: "Fabian", initial: "F" },
  { name: "Jakub", initial: "J" },
];

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section
      id={SECTION_IDS.about}
      className="relative z-10 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl leading-[1.1] font-semibold tracking-tight text-balance-tight sm:text-4xl lg:text-5xl">
            {dict.about.headline}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
            {dict.about.body}
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.12}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {team.map((person) => (
            <RevealItem key={person.name}>
              <article className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1">
                <div className="absolute -top-24 -right-16 size-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_30%,transparent),transparent)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                {/*
                  Monogram stands in for a portrait.
                  TODO: replace with next/image portrait, 800x1000, same rounded frame.
                */}
                <div className="relative flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(150deg,color-mix(in_oklch,var(--brand)_35%,transparent),transparent)] text-2xl font-semibold tracking-tight">
                  {person.initial}
                </div>

                <h3 className="relative mt-8 text-2xl font-medium tracking-tight">
                  {person.name}
                </h3>
                <p className="relative mt-2 text-sm text-brand-bright">
                  {dict.about.role}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <TechStack dict={dict} />
      </div>
    </section>
  );
}
