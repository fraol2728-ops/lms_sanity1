"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  List,
  Play,
  Sparkles,
} from "lucide-react";
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
  const [openModules, setOpenModules] = useState<string[]>([]);

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

  useEffect(() => {
    setOpenModules((modules ?? []).map((module) => module._id));
  }, [modules]);

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

  const toggleModule = (moduleId: string) => {
    setOpenModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  };

  return (
    <aside className="flex h-full min-h-0 w-full flex-col lg:h-[calc(100vh-8rem)] lg:w-80">
      <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-[0_20px_45px_rgba(8,15,32,0.35)] backdrop-blur-xl lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
            Course Lessons
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            {completedIds.length}/{totalLessons} completed
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="border-cyan-400/40 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 hover:text-white"
        >
          <List className="mr-1 h-4 w-4" />
          {mobileOpen ? "Hide" : "Show"}
          <ChevronDown
            className={cn(
              "ml-1 h-4 w-4 transition-transform duration-300",
              mobileOpen && "rotate-180",
            )}
          />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-[0_30px_70px_rgba(8,15,32,0.45)] backdrop-blur-xl",
          !mobileOpen && "hidden lg:flex",
        )}
      >
        <div className="border-b border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-violet-400/10 p-5">
          <Link
            href={`/courses/${courseSlug}`}
            className="text-xs uppercase tracking-[0.22em] text-cyan-300 transition hover:text-cyan-100"
          >
            ← Back to Course
          </Link>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="line-clamp-2 text-lg font-semibold text-white">
                {courseTitle ?? "Course"}
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                {completedIds.length} of {totalLessons} lessons completed
              </p>
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 shadow-inner shadow-cyan-300/10">
              <Sparkles className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="glass-scroll min-h-0 flex-1 space-y-3 overflow-y-auto p-3 pr-2 scroll-smooth">
          {modules.map((module, moduleIndex) => {
            const isOpen = openModules.includes(module._id);
            const moduleLessons = module.lessons ?? [];
            const completedCount = moduleLessons.filter((lesson) =>
              completedIds.includes(lesson._id),
            ).length;

            return (
              <div
                key={module._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#08111f]/70 shadow-[0_18px_45px_rgba(3,7,18,0.32)] transition-colors duration-300 hover:border-cyan-400/30"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(module._id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition duration-300 hover:bg-white/[0.03]"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                      Module {moduleIndex + 1}
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-white">
                      {module.title ?? "Untitled Module"}
                    </p>
                    <p className="mt-2 text-xs text-zinc-400">
                      {completedCount}/{moduleLessons.length} completed
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition duration-300",
                      isOpen &&
                        "rotate-180 border-cyan-300/30 bg-cyan-400/10 text-cyan-100",
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 border-t border-white/10 px-3 pb-3 pt-2">
                        {moduleLessons.map((lesson, lessonIndex) => {
                          const active = lesson._id === currentLessonId;
                          const done = completedIds.includes(lesson._id);

                          return (
                            <Link
                              key={lesson._id}
                              href={`/lessons/${lesson.slug?.current}`}
                              className={cn(
                                "group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-all duration-300",
                                active
                                  ? "border-cyan-300/30 bg-cyan-400/12 text-cyan-50 shadow-[0_10px_30px_rgba(34,211,238,0.16)]"
                                  : "border-transparent bg-white/[0.03] text-zinc-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white hover:translate-x-1",
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors duration-300",
                                  active
                                    ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-100"
                                    : "border-white/10 bg-white/[0.04] text-zinc-400 group-hover:text-zinc-200",
                                )}
                              >
                                {done ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                ) : active ? (
                                  <Play className="h-4 w-4 text-cyan-300" />
                                ) : (
                                  <Circle className="h-4 w-4" />
                                )}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium">
                                  {lessonIndex + 1}.{" "}
                                  {lesson.title ?? "Untitled Lesson"}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </aside>
  );
}
