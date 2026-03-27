"use client";

import { ProgramShowcase } from "@/components/program-showcase";
import type { ALL_COURSES_QUERYResult } from "@/sanity.types";

interface ProgramShowcaseListProps {
  courses: ALL_COURSES_QUERYResult;
}

export function ProgramShowcaseList({ courses }: ProgramShowcaseListProps) {
  const markedFeatured = courses.filter((course) => course.featured);
  const featuredPrograms = (
    markedFeatured.length > 0 ? markedFeatured : courses.slice(0, 3)
  ).slice(0, 4);

  return (
    <section id="programs" className="py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-6 pb-6 lg:px-12">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">
          Program Showcase
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Master cybersecurity with guided, hands-on tracks
        </h2>
      </div>

      {featuredPrograms.map((program, i) => (
        <ProgramShowcase
          key={program._id}
          program={program}
          reverse={i % 2 !== 0}
        />
      ))}
    </section>
  );
}
