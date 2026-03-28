"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { CareerPath } from "./types";

interface PathDetailsProps {
  path: CareerPath;
}

export default function PathDetails({ path }: PathDetailsProps) {
  const recommendedPace = Math.max(2, Math.ceil(path.lessonCount / 6));

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-[#11111c] p-5 shadow-2xl shadow-black/40 sm:p-7"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">
            Selected Path
          </p>
          <h3 className="mt-1 font-mono text-2xl font-semibold text-white">
            {path.title}
          </h3>
        </div>
        <div className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 font-mono text-xs text-cyan-100">
          {path.phases.length} phases
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-2xl border border-cyan-500/20 bg-black/40">
        <div className="flex items-center gap-2 border-b border-cyan-500/20 px-4 py-2">
          <Terminal className="size-4 text-cyan-300" />
          <span className="font-mono text-xs text-zinc-300">
            /academy/{path.slug}.plan
          </span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-zinc-300">
          {`> phases: ${path.phases.length}
> level: Beginner -> Advanced
> pace: ${recommendedPace} lessons/week`}
        </pre>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {path.phases.map((phase, index) => (
          <AccordionItem
            key={phase.id}
            value={phase.id}
            className={cn(
              "rounded-2xl border border-white/10 bg-[#0d0d16] px-4",
              "data-[state=open]:border-cyan-400/40 data-[state=open]:bg-cyan-500/5",
            )}
          >
            <AccordionTrigger className="font-mono text-base hover:no-underline">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-400">
                  Phase {index + 1}
                </p>
                <p className="mt-1 text-white">{phase.title}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  {phase.lessonsCount} lessons
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                This phase contains {phase.lessonsCount} lessons designed to
                move you forward in {path.title}.
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}
