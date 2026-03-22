"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Circle, List, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getCompletedLessonIds,
  progressEventName,
} from "@/components/lesson/progress-storage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LESSON_BY_ID_QUERYResult } from "@/sanity.types";

type Course = NonNullable<LESSON_BY_ID_QUERYResult>["courses"][number];
type Module = NonNullable<Course["modules"]>[number];

interface LessonSidebarProps {
  courseId: string;
  courseSlug: string;
  courseTitle: string | null;
  modules: Module[] | null;
  currentLessonId: string;
}

export function LessonSidebar({
  courseId,
  courseSlug,
  courseTitle,
  modules,
  currentLessonId,
}: LessonSidebarProps) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncProgress = async () => {
      const completedLessons = await getCompletedLessonIds(courseId);
      if (isMounted) {
        setCompletedIds(completedLessons);
      }
    };

    const handleProgressUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ courseId: string }>;
      if (customEvent.detail?.courseId === courseId) {
        void syncProgress();
      }
    };

    void syncProgress();
    window.addEventListener(progressEventName, handleProgressUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener(progressEventName, handleProgressUpdate);
    };
  }, [courseId]);

  const totalLessons = useMemo(
    () =>
      (modules ?? []).reduce(
        (count, module) => count + (module.lessons?.length ?? 0),
        0,
      ),
    [modules],
  );

  if (!modules?.length) {
    return null;
  }

  return (
    <aside className="w-full lg:w-80 lg:h-[calc(100dvh-9rem)] lg:overflow-hidden">
      <div className="mb-3 flex items-center justify-between rounded-xl border border-cyan-500/30 bg-[#061222]/85 p-3 lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
            Course Lessons
          </p>
          <p className="text-sm text-zinc-300">
            {completedIds.length}/{totalLessons} completed
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20"
        >
          <List className="mr-1 h-4 w-4" />
          {mobileOpen ? "Hide" : "Show"}
          <ChevronDown
            className={cn(
              "ml-1 h-4 w-4 transition-transform",
              mobileOpen && "rotate-180",
            )}
          />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#061222]/90 shadow-[0_10px_40px_rgba(34,211,238,0.15)]",
          "lg:flex lg:h-full lg:flex-col",
          !mobileOpen && "hidden lg:block",
        )}
      >
        <div className="border-b border-cyan-500/25 p-4">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-xs uppercase tracking-[0.18em] text-cyan-300 transition hover:text-cyan-200"
          >
            ← Back to Course
          </Link>
          <h3 className="mt-2 line-clamp-2 font-semibold text-white">
            {courseTitle ?? "Course"}
          </h3>
          <p className="mt-2 text-xs text-zinc-400">
            {completedIds.length} of {totalLessons} lessons completed
          </p>
        </div>

        <div className="space-y-3 overflow-y-auto p-3 lg:min-h-0 lg:flex-1 lg:overflow-y-hidden lg:pr-2 lg:hover:overflow-y-auto">
          {modules.map((module, moduleIndex) => (
            <div
              key={module._id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2"
            >
              <p className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300/80">
                Module {moduleIndex + 1}
              </p>
              <p className="px-2 pb-2 text-sm font-medium text-zinc-100">
                {module.title ?? "Untitled Module"}
              </p>

              <div className="space-y-1">
                {module.lessons?.map((lesson, lessonIndex) => {
                  const active = lesson._id === currentLessonId;
                  const done = completedIds.includes(lesson._id);

                  return (
                    <Link
                      key={lesson._id}
                      href={`/lessons/${lesson.slug?.current}`}
                      className={cn(
                        "group flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition",
                        active
                          ? "bg-cyan-500/20 text-cyan-100"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : active ? (
                        <Play className="h-4 w-4 shrink-0 text-cyan-400" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-zinc-600 group-hover:text-zinc-400" />
                      )}
                      <span className="truncate">
                        {lessonIndex + 1}. {lesson.title ?? "Untitled Lesson"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
