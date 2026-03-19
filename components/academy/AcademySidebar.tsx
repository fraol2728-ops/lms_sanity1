"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AcademyCourseDetailData } from "./types";

interface AcademySidebarProps {
  course: AcademyCourseDetailData;
  activeLessonSlug?: string;
}

export function AcademySidebar({
  course,
  activeLessonSlug,
}: AcademySidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-4 lg:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen((prev) => !prev)}
          className="w-full justify-between border-cyan-400/20 bg-[#07111f]/90 text-slate-100 hover:bg-cyan-400/10 hover:text-cyan-100"
        >
          <span className="inline-flex items-center gap-2">
            <Menu className="h-4 w-4" /> Academy navigation
          </span>
          {open ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, x: -16, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: -16, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <SidebarPanel course={course} activeLessonSlug={activeLessonSlug} />
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <aside className="sticky top-24 hidden lg:block self-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SidebarPanel course={course} activeLessonSlug={activeLessonSlug} />
        </motion.div>
      </aside>
    </>
  );
}

function SidebarPanel({
  course,
  activeLessonSlug,
}: {
  course: AcademyCourseDetailData;
  activeLessonSlug?: string;
}) {
  return (
    <div className="rounded-3xl border border-cyan-400/15 bg-[#07111f]/90 p-5 shadow-[0_16px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="space-y-4 border-b border-white/8 pb-5">
        <Badge className="border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
          On-site academy
        </Badge>
        <div>
          <h2 className="text-lg font-semibold text-white">{course.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {course.location ?? "Location announced soon"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <StatPill label="Duration" value={course.duration ?? "TBA"} />
          <StatPill label="Level" value={course.level ?? "All levels"} />
          <StatPill
            label="Lessons"
            value={String(course.lessons.length)}
            className="col-span-2"
          />
        </div>
      </div>

      <div className="mt-5 space-y-1.5">
        {course.lessons.map((lesson, index) => {
          const isActive = lesson.slug === activeLessonSlug;

          return (
            <Link
              key={lesson.slug}
              href={`/academy/${course.slug}/${lesson.slug}`}
              className={cn(
                "flex items-center justify-between rounded-2xl border px-3 py-2 text-sm transition-all duration-200",
                isActive
                  ? "border-cyan-300/50 bg-cyan-400/12 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                  : "border-white/8 bg-white/[0.03] text-slate-300 hover:border-cyan-400/25 hover:bg-cyan-400/8 hover:text-cyan-100",
              )}
            >
              <span className="mr-3 line-clamp-2">{`${index + 1}. ${lesson.title}`}</span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StatPill({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/8 bg-white/[0.04] p-3",
        className,
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
