"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type RoadmapCourse = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  moduleCount: number;
  difficulty: string;
  categoryTitle: string | null;
};

interface RoadmapSectionProps {
  courses: RoadmapCourse[];
}

const orderedTracks = [
  "Red Team",
  "Blue Team",
  "Web Security",
  "Reverse Engineering",
  "Foundations",
];

function classifyTrack(course: RoadmapCourse): string {
  const text = `${course.categoryTitle ?? ""} ${course.title}`.toLowerCase();

  if (/red|offensive|pentest|ethical hack/.test(text)) return "Red Team";
  if (/blue|soc|defen|incident|monitor/.test(text)) return "Blue Team";
  if (/web|api|owasp/.test(text)) return "Web Security";
  if (/reverse|malware|binary/.test(text)) return "Reverse Engineering";

  return "Foundations";
}

export function RoadmapSection({ courses }: RoadmapSectionProps) {
  const grouped = courses.reduce<Record<string, RoadmapCourse[]>>(
    (acc, course) => {
      const track = classifyTrack(course);
      if (!acc[track]) acc[track] = [];
      acc[track].push(course);
      return acc;
    },
    {},
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-white/10 bg-[#0b1220]/80 p-6 backdrop-blur"
    >
      <h2 className="text-2xl font-semibold text-white">Continue Your Path</h2>
      <p className="mt-2 text-sm text-slate-300">
        Move horizontally through specialized tracks and keep momentum.
      </p>

      <div className="relative mt-6 space-y-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0b1220] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0b1220] to-transparent" />

        {orderedTracks.map((track) => {
          const items = grouped[track] ?? [];
          if (!items.length) return null;

          return (
            <div key={track} className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">
                {track}
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2 pr-6 scrollbar-thin scrollbar-thumb-white/10">
                {items.map((course) => (
                  <Link
                    key={course.id}
                    href={`/programs/${course.slug}`}
                    className="group min-w-[260px] rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:scale-[1.02] hover:border-cyan-300/40 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                  >
                    <p className="text-xs text-slate-400">
                      {course.difficulty}
                    </p>
                    <h4 className="mt-1 text-lg font-medium text-white group-hover:text-cyan-100">
                      {course.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                      {course.description ??
                        "Hands-on labs and guided modules."}
                    </p>
                    <p className="mt-3 text-xs text-cyan-200/90">
                      {course.moduleCount} modules
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
