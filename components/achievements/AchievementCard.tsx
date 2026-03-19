"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { AchievementDefinition } from "@/components/achievements/achievement-data";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  achievement: AchievementDefinition;
  unlocked: boolean;
  unlockedAt?: string;
  index?: number;
}

export function AchievementCard({
  achievement,
  unlocked,
  unlockedAt,
  index = 0,
}: AchievementCardProps) {
  const Icon = achievement.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-colors",
        unlocked
          ? "border-cyan-400/40 bg-[linear-gradient(145deg,rgba(8,19,35,0.96),rgba(9,30,52,0.88))] shadow-[0_0_32px_rgba(34,211,238,0.14)]"
          : "border-zinc-800 bg-zinc-950/70",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          unlocked &&
            "bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%)] group-hover:opacity-100",
        )}
      />
      <div className="relative flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
            unlocked
              ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.3)]"
              : "border-zinc-800 bg-zinc-900 text-zinc-500",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-white">
              {achievement.title}
            </h4>
            {unlocked ? (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                Unlocked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                <Lock className="h-3 w-3" /> Locked
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {achievement.description}
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            {unlocked && unlockedAt
              ? `Unlocked ${new Date(unlockedAt).toLocaleDateString()}`
              : "Complete more lessons to unlock this badge."}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
