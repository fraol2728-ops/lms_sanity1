"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PathCardProps = {
  icon: string;
  title: string;
  description: string;
  coursesCount: number;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function PathCard({
  icon,
  title,
  description,
  coursesCount,
}: PathCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className="group flex h-full flex-col rounded-2xl border border-cyan-500/20 bg-slate-950/80 p-6 shadow-lg shadow-cyan-950/40 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-2xl">
        <span role="img" aria-label={`${title} icon`}>
          {icon}
        </span>
      </div>

      <div className="flex-1 space-y-3">
        <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-300">{description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-5">
        <p className="text-sm font-medium text-cyan-300">
          {coursesCount} Courses
        </p>
        <Button
          size="sm"
          className="bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-400/40 transition-colors hover:bg-cyan-500/30"
        >
          View Path <ArrowRight className="size-4" />
        </Button>
      </div>
    </motion.article>
  );
}
