"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection } from "./animations";

interface ContinueLearningProps {
  continueCourse: {
    title: string;
    progressLabel: string;
    progressPercent: number;
    href: string;
  } | null;
}

export function ContinueLearning({ continueCourse }: ContinueLearningProps) {
  if (!continueCourse) {
    return null;
  }

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <motion.div
        className="rounded-3xl border border-cyan-400/20 bg-[#071227]/85 p-8 shadow-[0_0_45px_rgba(14,165,233,0.12)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          Continue Learning
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{continueCourse.title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{continueCourse.progressLabel}</p>

        <Progress
          value={continueCourse.progressPercent}
          className="mt-5 h-2 bg-zinc-800 [&>div]:bg-cyan-400"
        />

        <Link href={continueCourse.href} className="mt-6 inline-block">
          <Button className="bg-cyan-400 text-[#051120] hover:bg-cyan-300">
            Resume
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </AnimatedSection>
  );
}
