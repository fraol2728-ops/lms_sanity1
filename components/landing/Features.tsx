"use client";

import { Binary, BookOpenCheck, ChartNoAxesColumn, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "./animations";

const features = [
  {
    title: "Hands-on Courses",
    description: "Build practical skills with labs and guided attack-defense scenarios.",
    icon: Binary,
  },
  {
    title: "Structured Learning Paths",
    description: "Follow intentional roadmaps from fundamentals to advanced practice.",
    icon: BookOpenCheck,
  },
  {
    title: "Track Your Progress",
    description: "Stay accountable with completion tracking and learning milestones.",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Expert-Level Content",
    description: "Study curated material inspired by real security operations.",
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Features</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Learn faster with the right training infrastructure
        </h2>
      </div>

      <motion.div
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={fadeUp}
            className="group rounded-2xl border border-cyan-400/15 bg-[#081127]/70 p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.14)]"
          >
            <feature.icon className="h-8 w-8 text-cyan-300 transition group-hover:text-cyan-200" />
            <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
