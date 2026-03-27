"use client";

import { motion } from "framer-motion";
import { CourseCard } from "@/components/courses";
import type { FEATURED_COURSES_QUERYResult } from "@/sanity.types";
import { AnimatedSection, fadeUp, staggerContainer } from "./animations";

interface PopularCoursesProps {
  courses: FEATURED_COURSES_QUERYResult;
}

export function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <AnimatedSection id="courses" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Popular Courses</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Trending courses from Next XyberSec
        </h2>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {courses?.map((course) => (
          <motion.div key={course._id} variants={fadeUp}>
            <CourseCard
              title={course.title}
              description={course.description}
              tier={course.tier}
              thumbnail={course.thumbnail}
              moduleCount={course.moduleCount}
              lessonCount={course.lessonCount}
              href={course.slug?.current ? `/courses/${course.slug.current}` : "#"}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
