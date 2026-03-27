"use client";

import { motion } from "framer-motion";
import { CourseCard } from "@/components/courses";
import type { ALL_COURSES_QUERYResult } from "@/sanity.types";

type RoadmapCourse = ALL_COURSES_QUERYResult[number];

interface RoadmapRowProps {
  title: string;
  courses: RoadmapCourse[];
}

export function RoadmapRow({ title, courses }: RoadmapRowProps) {
  if (!courses.length) {
    return null;
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>

      <div className="relative">
        <div className="glass-scroll flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {courses.map((course) => (
            <div
              key={course._id}
              className="min-w-[280px] max-w-[320px] shrink-0 rounded-2xl transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
            >
              <CourseCard
                href={course.slug?.current ? `/courses/${course.slug.current}` : "#"}
                title={course.title}
                description={course.description}
                tier={course.tier}
                thumbnail={course.thumbnail}
                lessonCount={course.lessonCount}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent" />
      </div>
    </motion.div>
  );
}
