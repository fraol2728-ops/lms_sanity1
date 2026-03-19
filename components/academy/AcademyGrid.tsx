"use client";

import { motion } from "framer-motion";
import type { AcademyCourse } from "@/lib/academy-data";
import { AcademyCard } from "./AcademyCard";

interface AcademyGridProps {
  courses: AcademyCourse[];
}

export function AcademyGrid({ courses }: AcademyGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.06,
          },
        },
      }}
      className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
    >
      {courses.map((course) => (
        <AcademyCard key={course.slug} course={course} />
      ))}
    </motion.div>
  );
}
