"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Play } from "lucide-react";
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
    <aside className="w-full lg:w-80">
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        className="overflow-hidden rounded-xl border border-cyan-500/25 bg-[#07101d]/90 shadow-[0_10px_40px_rgba(8,145,178,0.15)] backdrop-blur-sm"
      >
        <div className="border-b border-cyan-500/20 p-4">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-xs uppercase tracking-[0.18em] text-cyan-300"
          >
            ← Back to Course
          </Link>
          <h3 className="mt-2 line-clamp-2 font-semibold text-white">
            {courseTitle ?? "Course"}
          </h3>
        </div>

        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-2">
          <Accordion
            type="multiple"
            defaultValue={currentModuleId ? [currentModuleId] : []}
            className="space-y-2"
          >
            {modules.map((module, moduleIndex) => (
              <AccordionItem
                key={module._id}
                value={module._id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-1"
              >
                <AccordionTrigger className="px-3 py-2 text-left text-sm hover:no-underline">
                  <span>
                    Module {moduleIndex + 1} — {module.title ?? "Untitled"}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-1 pb-2">
                  {module.lessons?.map((lesson) => {
                    const active = lesson._id === currentLessonId;
                    const done = completedLessonIds.includes(lesson._id);

                    return (
                      <Link
                        key={lesson._id}
                        href={`/lessons/${lesson.slug?.current}`}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition",
                          active
                            ? "bg-cyan-500/20 text-cyan-200"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                        )}
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        ) : active ? (
                          <Play className="h-4 w-4 shrink-0 text-cyan-400" />
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
            ))}
          </Accordion>
        </div>
      </motion.div>
    </aside>
  );
}
