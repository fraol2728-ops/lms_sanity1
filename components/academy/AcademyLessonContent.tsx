"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, FileText, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type {
  AcademyCourse,
  AcademyLesson,
  AcademyModule,
} from "@/lib/academy-data";

interface AcademyLessonContentProps {
  course: AcademyCourse;
  module: AcademyModule;
  lesson: AcademyLesson;
}

export function AcademyLessonContent({
  course,
  module,
  lesson,
}: AcademyLessonContentProps) {
  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="rounded-[2rem] border border-cyan-400/15 bg-[#07111f]/85 p-6 shadow-[0_20px_90px_rgba(0,0,0,0.35)] sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
            {course.title}
          </Badge>
          <Badge
            variant="outline"
            className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100"
          >
            {module.title}
          </Badge>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Physical lesson experience
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-300">
            {lesson.description}
          </p>
        </div>
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-2">
        <InfoPanel
          icon={FileText}
          title="Notes & content"
          items={lesson.notes}
          accent="cyan"
        />
        <InfoPanel
          icon={Link2}
          title="Resources"
          items={lesson.resources}
          accent="fuchsia"
        />
        <InfoPanel
          icon={CheckCircle2}
          title="Tasks"
          items={lesson.tasks}
          accent="emerald"
        />
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          className="rounded-[1.75rem] border border-white/10 bg-[#0a1628] p-6"
        >
          <div className="flex items-center gap-3 text-cyan-100">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Instructor guidance</h2>
          </div>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              This academy lesson is designed for physical delivery, so learners
              should expect live coaching, team discussion, and structured room
              exercises rather than video playback.
            </p>
            <p>
              Encourage students to annotate observations, compare approaches
              with their cohort, and bring notes into the next module for
              continuity.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function InfoPanel({
  icon: Icon,
  title,
  items,
  accent,
}: {
  icon: typeof FileText;
  title: string;
  items: string[];
  accent: "cyan" | "fuchsia" | "emerald";
}) {
  const accentClasses = {
    cyan: "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-100",
    fuchsia: "border-fuchsia-400/15 bg-fuchsia-400/[0.05] text-fuchsia-100",
    emerald: "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-100",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-[1.75rem] border border-white/10 bg-[#0a1628] p-6"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${accentClasses[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
