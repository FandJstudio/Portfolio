/**
 * Portfolio template.
 *
 * The projects section renders an empty state while this array is empty and
 * switches to the grid as soon as the first entry lands here. Add a project by
 * dropping its image in /public/projects and pushing an object below.
 *
 * Example:
 *
 * {
 *   slug: "kancelaria-wisniewski",
 *   title: "Kancelaria Wiśniewski",
 *   summary: "Strona wizytówka z systemem umawiania konsultacji.",
 *   year: 2026,
 *   services: ["Projekt", "Kod", "Hosting"],
 *   stack: ["Next.js", "TypeScript", "Tailwind CSS"],
 *   image: { src: "/projects/kancelaria-wisniewski.jpg", alt: "Strona główna kancelarii" },
 *   href: "https://przyklad.pl",
 * }
 */

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  /** What the studio delivered, shown as chips on the card. */
  services: string[];
  stack: string[];
  image: {
    /** 16:10 crop works best in the grid. */
    src: string;
    alt: string;
  };
  /** Live site. Omit while the project is under wraps. */
  href?: string;
};

export const projects: Project[] = [];
