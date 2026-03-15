"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ContinueLearningProps {
  title: string;
  lessonTitle: string;
  progress: number;
  resumeHref: string;
}

export function ContinueLearning({
  title,
  lessonTitle,
  progress,
  resumeHref,
}: ContinueLearningProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-cyan-500/20 bg-[#07121f]/80 p-6 shadow-[0_0_50px_rgba(6,182,212,0.08)]"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
        Continue Learning
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-1 text-zinc-400">{lessonTitle}</p>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mt-5"
      >
        <Progress
          value={progress}
          className="h-2 bg-zinc-800 [&>div]:bg-cyan-400"
        />
      </motion.div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-cyan-300">Progress {progress}%</span>
        <Button
          asChild
          className="bg-cyan-500 text-[#061018] hover:bg-cyan-400"
        >
          <Link href={resumeHref}>
            <PlayCircle className="mr-2 h-4 w-4" />
            Resume Lesson
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
