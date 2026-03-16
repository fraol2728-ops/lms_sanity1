"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type LegacyTier = "free" | "ultra" | "pro" | null;

export interface CourseCardProps {
  href?: string;
  title?: string | null;
  instructor?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  thumbnailUrl?: string | null;
  lessonCount?: number | null;
  durationLabel?: string;
  // legacy compatibility
  description?: string | null;
  tier?: LegacyTier;
  thumbnail?: {
    asset?: { url?: string | null; [key: string]: unknown } | null;
  } | null;
  moduleCount?: number | null;
}

export function CourseCard({
  href,
  title,
  instructor,
  difficulty,
  thumbnailUrl,
  lessonCount,
  durationLabel,
  description,
  tier,
  thumbnail,
}: CourseCardProps) {
  const resolvedTitle = title ?? "Untitled Course";
  const resolvedInstructor = instructor ?? "Next Cyber Camp Instructor";
  const resolvedDifficulty =
    difficulty ?? (tier === "ultra" ? "Advanced" : "Beginner");
  const resolvedThumbnail = thumbnailUrl ?? thumbnail?.asset?.url ?? null;
  const resolvedLessonCount = lessonCount ?? 0;
  const resolvedDuration =
    durationLabel ??
    `${Math.max(1, Math.ceil(resolvedLessonCount / 4))} ${
      Math.max(1, Math.ceil(resolvedLessonCount / 4)) === 1 ? "Hour" : "Hours"
    }`;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href ?? "#"}
        className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/20 transition-all duration-300 hover:border-violet-500/40 hover:shadow-violet-500/20"
      >
        <div className="relative h-44 overflow-hidden">
          {resolvedThumbnail ? (
            <Image
              src={resolvedThumbnail}
              alt={resolvedTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-600/40 via-fuchsia-500/30 to-cyan-500/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
              {resolvedTitle}
            </h3>
            {description && (
              <p className="line-clamp-2 text-sm text-zinc-400">
                {description}
              </p>
            )}
            <p className="text-sm text-zinc-400">
              Instructor: {resolvedInstructor}
            </p>
            <Badge
              variant="secondary"
              className={cn(
                "border bg-zinc-800/80",
                resolvedDifficulty === "Beginner" &&
                  "border-emerald-500/40 text-emerald-200",
                resolvedDifficulty === "Intermediate" &&
                  "border-amber-500/40 text-amber-200",
                resolvedDifficulty === "Advanced" &&
                  "border-rose-500/40 text-rose-200",
              )}
            >
              {resolvedDifficulty}
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-2 text-sm text-zinc-400">
            <span>
              {resolvedLessonCount} Lessons • {resolvedDuration}
            </span>
            <span className="inline-flex items-center gap-1 text-violet-300">
              Start Learning <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
