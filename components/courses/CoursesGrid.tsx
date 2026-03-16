"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import {
  type CourseFilter,
  CourseFilters,
} from "@/components/courses/CourseFilters";
import { CourseSearch } from "@/components/courses/CourseSearch";

export interface CatalogCourse {
  id: string;
  title: string;
  slug: string;
  instructor: string;
  difficulty: "Beginner" | "Advanced";
  category: "Web Security" | "Linux" | "Network Security" | "Bug Bounty";
  lessonCount: number;
  durationLabel: string;
  thumbnailUrl?: string | null;
}

interface CoursesGridProps {
  courses: CatalogCourse[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CourseFilter>("All");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const textMatch =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.instructor.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery);

      const categoryMatch =
        selectedFilter === "All" ||
        course.category === selectedFilter ||
        course.difficulty === selectedFilter;

      return textMatch && categoryMatch;
    });
  }, [courses, query, selectedFilter]);

  return (
    <section className="space-y-6">
      <CourseSearch value={query} onChange={setQuery} />
      <CourseFilters selected={selectedFilter} onSelect={setSelectedFilter} />

      <motion.div
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CourseCard
              href={`/courses/${course.slug}`}
              title={course.title}
              instructor={course.instructor}
              difficulty={course.difficulty}
              lessonCount={course.lessonCount}
              durationLabel={course.durationLabel}
              thumbnailUrl={course.thumbnailUrl}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredCourses.length === 0 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center text-zinc-400">
          No courses match your search or selected filter.
        </div>
      )}
    </section>
  );
}
