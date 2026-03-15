"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface CourseProgressCardProps {
  title: string;
  progress: number;
  href: string;
  index: number;
}

export function CourseProgressCard({
  title,
  progress,
  href,
  index,
}: CourseProgressCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="group rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_0_45px_rgba(8,145,178,0.16)]"
    >
      <h4 className="line-clamp-2 font-semibold text-white">{title}</h4>
      <div className="mt-4">
        <Progress
          value={progress}
          className="h-2 bg-zinc-800 [&>div]:bg-cyan-400"
        />
        <p className="mt-2 text-sm text-zinc-400">{progress}% complete</p>
      </div>
      <Link
        href={href}
        className="mt-4 inline-flex items-center text-sm text-cyan-300 transition group-hover:text-cyan-200"
      >
        Continue
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.article>
  );
}
