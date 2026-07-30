import Image from "next/image";
import { ArrowUpRight, FolderOpen } from "@phosphor-icons/react/ssr";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { projects } from "@/data/projects";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section
      id={SECTION_IDS.work}
      className="relative z-10 px-4 py-24 sm:px-6 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl leading-[1.1] font-semibold tracking-tight text-balance-tight sm:text-4xl lg:text-5xl">
            {dict.work.headline}
          </h2>
        </Reveal>

        {projects.length === 0 ? <EmptyState dict={dict} /> : <ProjectGrid />}
      </div>
    </section>
  );
}

/** Shown while `projects` is empty. Replaced automatically by the grid. */
function EmptyState({ dict }: { dict: Dictionary }) {
  return (
    <Reveal delay={0.08}>
      <div className="glass relative mt-10 overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--brand)_22%,transparent),transparent)] blur-2xl" />

        <div className="relative mx-auto flex max-w-[46ch] flex-col items-center">
          <FolderOpen size={30} weight="light" className="text-brand-bright" />
          <p className="mt-6 text-xl font-medium tracking-tight sm:text-2xl">
            {dict.work.emptyHeadline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {dict.work.emptyBody}
          </p>
          <a
            href={`#${SECTION_IDS.contact}`}
            className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[0.95rem] font-medium whitespace-nowrap text-white transition-colors hover:bg-[color-mix(in_oklch,var(--brand),white_10%)] focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none active:translate-y-px"
          >
            {dict.work.cta}
            <ArrowUpRight
              size={18}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/** Renders as soon as the first entry lands in src/data/projects.ts. */
function ProjectGrid() {
  return (
    <RevealGroup
      stagger={0.1}
      className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      {projects.map((project, index) => {
        const Wrapper: React.ElementType = project.href ? "a" : "div";

        return (
          <RevealItem
            key={project.slug}
            className={index % 3 === 0 ? "md:col-span-2" : undefined}
          >
            <Wrapper
              {...(project.href
                ? { href: project.href, target: "_blank", rel: "noreferrer" }
                : {})}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-surface/60 transition-colors duration-500 hover:border-white/16"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-medium tracking-tight">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Wrapper>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
