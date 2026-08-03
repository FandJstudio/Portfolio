import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import { MaskReveal, Parallax, Reveal } from "@/components/motion/reveal";
import { projects, type Project } from "@/data/projects";
import { SECTION_IDS, type Dictionary } from "@/lib/i18n";

export function Projects({ dict }: { dict: Dictionary }) {
  return (
    <section
      id={SECTION_IDS.work}
      className="relative z-10 border-t border-line py-section"
    >
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8">
        <Reveal>
          <p className="label text-brand-bright">{dict.work.headline}</p>
        </Reveal>

        {projects.length === 0 ? <EmptyState dict={dict} /> : <ProjectGrid />}
      </div>
    </section>
  );
}

/** Shown while `projects` is empty, replaced automatically by the grid. */
function EmptyState({ dict }: { dict: Dictionary }) {
  return (
    <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <h2 className="max-w-[16ch] text-display lg:col-span-7">
        <MaskReveal text={dict.work.emptyHeadline} />
      </h2>

      <Reveal delay={0.12} className="lg:col-span-5 lg:pt-3">
        <p className="max-w-[48ch] text-lead text-muted-foreground">
          {dict.work.emptyBody}
        </p>
        <a
          href={`#${SECTION_IDS.contact}`}
          className="group mt-10 inline-flex h-14 items-stretch border border-line bg-white/[0.03] transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.06]"
        >
          <span className="flex items-center px-7 text-note font-medium whitespace-nowrap">
            {dict.work.cta}
          </span>
          <span className="grid w-12 shrink-0 place-items-center border-l border-line">
            <ArrowUpRight
              size={15}
              weight="bold"
              className="text-brand-bright transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </a>
      </Reveal>
    </div>
  );
}

/**
 * Renders as soon as the first entry lands in src/data/projects.ts.
 * The first project runs full width as the featured case, the rest pair up.
 */
function ProjectGrid() {
  const [featured, ...rest] = projects;

  return (
    <div className="mt-rhythm">
      <ProjectTile project={featured} featured />

      {rest.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {rest.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectTile({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const Wrapper: React.ElementType = project.href ? "a" : "div";

  return (
    <Reveal as="surface">
      <Wrapper
        {...(project.href
          ? { href: project.href, target: "_blank", rel: "noreferrer" }
          : {})}
        className="group block"
      >
        {/*
          The image is oversized inside a clipped frame and drifts against the
          scroll, so the crop keeps changing as the tile passes. Hover pushes it
          further in. Both are transform only, so neither costs a layout pass.
        */}
        <div
          className={`relative overflow-hidden border border-line bg-surface ${
            featured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"
          }`}
        >
          <Parallax speed={0.08} className="absolute inset-0 -top-[8%] h-[116%]">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes={featured ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
              className="object-cover transition-transform duration-700 ease-swift group-hover:scale-[1.04]"
            />
          </Parallax>

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0_0_0/55%),transparent_45%)]"
          />

          <span className="absolute right-0 bottom-0 grid size-14 place-items-center bg-brand text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <ArrowUpRight size={18} weight="bold" />
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h3 className={featured ? "text-display" : "text-title"}>
            {project.title}
          </h3>
          <time className="label text-muted-foreground">{project.year}</time>
        </div>

        <p className="mt-4 max-w-[58ch] text-note text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
          {project.services.map((service) => (
            <li key={service} className="label text-muted-foreground">
              {service}
            </li>
          ))}
        </ul>
      </Wrapper>
    </Reveal>
  );
}
