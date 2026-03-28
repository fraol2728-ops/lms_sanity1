"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, FolderLock, Play } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";

type Course = NonNullable<LESSON_BY_ID_QUERYResult>["courses"][number];
type Module = NonNullable<Course["modules"]>[number];

interface LessonSidebarProps {
  courseSlug: string;
  courseTitle: string | null;
  modules: Module[] | null;
  currentLessonId: string;
  completedLessonIds?: string[];
}

export function LessonSidebar({
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
  completedLessonIds = [],
}: LessonSidebarProps) {
  if (!modules?.length) return null;

  const currentModuleId = modules.find((module) =>
    module.lessons?.some((lesson) => lesson._id === currentLessonId),
  )?._id;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#040912]"
    >
      <div className="border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/15 to-transparent p-4">
        <Link
          href={`/courses/${courseSlug}`}
          className="text-xs uppercase tracking-[0.18em] text-cyan-300 transition hover:text-cyan-100"
        >
          ← Back to Course
        </Link>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold text-white">
          {courseTitle ?? "Course"}
        </h3>
      </div>

      <div className="h-[calc(100%-5.5rem)] overflow-y-auto p-3">
        <Accordion
          type="multiple"
          defaultValue={currentModuleId ? [currentModuleId] : []}
          className="space-y-2"
        >
          {modules.map((module, moduleIndex) => {
            const lessonCount = module.lessons?.length ?? 0;
            const completedCount = (module.lessons ?? []).filter((lesson) =>
              completedLessonIds.includes(lesson._id),
            ).length;

            return (
              <AccordionItem
                key={module._id}
                value={module._id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0a1220]"
              >
                <AccordionTrigger className="px-3 py-2.5 hover:no-underline">
                  <div className="w-full text-left">
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/80">
                      Module {moduleIndex + 1}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-zinc-100">
                      {module.title ?? "Untitled Module"}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      {completedCount}/{lessonCount} completed
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-1 px-2 pb-2">
                  {module.lessons?.map((lesson, index) => {
                    const active = lesson._id === currentLessonId;
                    const done = completedLessonIds.includes(lesson._id);

                    return (
                      <Link
                        key={lesson._id}
                        href={`/lessons/${lesson.slug?.current}`}
                        className={cn(
                          "group flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-all",
                          active
                            ? "border border-cyan-400/35 bg-cyan-500/15 text-cyan-100"
                            : "border border-transparent text-zinc-400 hover:border-cyan-500/20 hover:bg-[#0f1c31] hover:text-zinc-100",
                        )}
                      >
                        <span className="text-[10px] text-zinc-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        ) : active ? (
                          <Play className="h-4 w-4 shrink-0 text-cyan-300" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-zinc-600" />
                        )}
                        <span className="truncate">
                          {lesson.title ?? "Untitled Lesson"}
                        </span>
                      </Link>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="border-t border-white/10 px-4 py-3 text-xs text-zinc-400">
        <span className="inline-flex items-center gap-1">
          <FolderLock className="h-3.5 w-3.5 text-cyan-300" />
          Cyber Academy Track
        </span>
      </div>
    </motion.aside>
  );
}
