"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock3, Lock, LockOpen } from "lucide-react";
import { useState } from "react";

type LessonItem = {
  id: string;
  title: string;
  slug: string;
};

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string | null;
    lessons: LessonItem[];
  };
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const unlocked = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1423]/85 backdrop-blur transition hover:scale-[1.01] hover:border-cyan-300/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
            Module {index + 1}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            {module.title}
          </h3>
          {module.description ? (
            <p className="mt-2 text-sm text-slate-300">{module.description}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />~
              {Math.max(1, module.lessons.length * 15)} min
            </span>
            <span className="inline-flex items-center gap-1">
              {unlocked ? (
                <LockOpen className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <Lock className="h-3.5 w-3.5 text-amber-300" />
              )}
              {unlocked ? "Unlocked" : "Locked"}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-5 py-4">
              <ul className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lesson.id}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-200"
                  >
                    <span className="mr-2 text-cyan-200">
                      {lessonIndex + 1}.
                    </span>
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
