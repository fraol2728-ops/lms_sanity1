"use client";

import { Target } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection, staggerContainer } from "./animations";

const trainingPaths = [
  {
    title: "Web Pentester",
    description: "Master web app exploitation, recon techniques, and vulnerability chaining.",
    courseCount: 8,
  },
  {
    title: "Red Team Operator",
    description: "Develop offensive operations skills for enterprise simulations and adversary emulation.",
    courseCount: 10,
  },
  {
    title: "Bug Bounty Hunter",
    description: "Learn a repeatable process for finding and reporting impactful bugs.",
    courseCount: 6,
  },
];

export function TrainingPaths() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Training Paths</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Pick a specialty and grow with a focused roadmap
        </h2>
      </div>

      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {trainingPaths.map((path, index) => (
          <motion.article
            key={path.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            className="rounded-2xl border border-cyan-400/20 bg-[#081127]/80 p-6 shadow-[0_0_30px_rgba(14,165,233,0.08)]"
          >
            <Target className="h-8 w-8 text-cyan-300" />
            <h3 className="mt-5 text-2xl font-semibold text-white">{path.title}</h3>
            <p className="mt-3 text-sm text-zinc-300">{path.description}</p>
            <p className="mt-5 text-sm font-medium text-cyan-200">
              {path.courseCount} courses
            </p>
            <Link href="/dashboard" className="mt-6 inline-block">
              <Button className="bg-cyan-400 text-[#041018] hover:bg-cyan-300">
                Start Path
              </Button>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
