"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CategoryCards } from "@/components/courses/CategoryCards";
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
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  lessonCount: number;
  durationLabel: string;
  thumbnailUrl?: string | null;
}

interface CategoryOption {
  id: string;
  title: string;
}

interface CoursesGridProps {
  courses: CatalogCourse[];
  categories: CategoryOption[];
}

export function CoursesGrid({ courses, categories }: CoursesGridProps) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CourseFilter>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const textMatch =
        !normalizedQuery ||
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.instructor.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery);

      const levelMatch =
        selectedFilter === "All" || course.difficulty === selectedFilter;

      const categoryMatch =
        selectedCategory === "All" || course.category === selectedCategory;

      return textMatch && levelMatch && categoryMatch;
    });
  }, [courses, query, selectedFilter, selectedCategory]);

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <CourseSearch value={query} onChange={setQuery} />
      </motion.div>

      <CategoryCards
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) =>
          setSelectedCategory((prev) => (prev === category ? "All" : category))
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
      >
        <CourseFilters selected={selectedFilter} onSelect={setSelectedFilter} />
      </motion.div>

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
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
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
