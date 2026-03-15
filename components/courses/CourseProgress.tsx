"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  progress: number;
}

export function CourseProgress({ progress }: CourseProgressProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className="mb-8 rounded-xl border border-cyan-500/20 bg-[#081220] p-5"
    >
      <div className="mb-3 flex items-center justify-between text-sm">
        <p className="text-zinc-300">Course Progress</p>
        <p className="font-semibold text-cyan-300">{progress}%</p>
      </div>
      <Progress
        value={progress}
        className="h-2 bg-zinc-800 [&>div]:bg-cyan-400"
      />
    </motion.section>
  );
}
