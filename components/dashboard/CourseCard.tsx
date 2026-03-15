"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  lessonCount: number;
  completedLessons: number;
  href: string;
  level?: string | null;
}

export function CourseCard({
  title,
  description,
  thumbnailUrl,
  lessonCount,
  completedLessons,
  href,
  level,
}: CourseCardProps) {
  const safeTotal = Math.max(lessonCount, 0);
  const safeCompleted = Math.min(Math.max(completedLessons, 0), safeTotal || 0);
  const progress =
    safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0;

  const metadata = level
    ? `${level} • ${safeTotal} Lessons`
    : `${safeTotal} Lessons`;

  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-sm transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/10"
      whileHover={{ y: -4 }}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-zinc-800">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-500">
            <BookOpen className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">
            {title}
          </h3>
          <p className="text-sm text-zinc-400">{metadata}</p>
          {description ? (
            <p className="line-clamp-2 text-sm text-zinc-500">{description}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <Link
          href={href}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 transition duration-300 hover:border-violet-300/50 hover:bg-violet-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]"
        >
          Continue Course
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
