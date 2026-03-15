"use client";

import { motion, type Variants } from "framer-motion";
import { PathCard } from "@/components/paths/PathCard";

const paths = [
  {
    icon: "🕸",
    title: "Web Pentester",
    description:
      "Learn to discover and exploit vulnerabilities in modern web applications.",
    coursesCount: 6,
  },
  {
    icon: "⚔",
    title: "Red Team Operator",
    description:
      "Master offensive security tactics to simulate real-world adversaries across enterprise systems.",
    coursesCount: 8,
  },
  {
    icon: "🎯",
    title: "Bug Bounty Hunter",
    description:
      "Build a repeatable process for finding impactful vulnerabilities and reporting them professionally.",
    coursesCount: 7,
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

export function PathsGrid() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.div variants={sectionVariants} className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Choose Your Career Track
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Start with a focused path and level up through hands-on labs, guided
          modules, and practical security workflows.
        </p>
      </motion.div>

      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {paths.map((path) => (
          <PathCard key={path.title} {...path} />
        ))}
      </motion.div>
    </motion.section>
  );
}
