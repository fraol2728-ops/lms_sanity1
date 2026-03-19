"use client";

import { motion } from "framer-motion";
import { Award, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeaderboardUser } from "./leaderboard-data";

interface LeaderboardListProps {
  users: LeaderboardUser[];
}

const podiumStyles: Record<number, string> = {
  1: "border-yellow-400/40 bg-yellow-400/10 shadow-[0_0_30px_rgba(250,204,21,0.18)]",
  2: "border-slate-300/35 bg-slate-300/10 shadow-[0_0_24px_rgba(226,232,240,0.16)]",
  3: "border-amber-700/40 bg-amber-700/10 shadow-[0_0_24px_rgba(180,83,9,0.22)]",
};

const podiumIcons: Record<number, typeof Sparkles> = {
  1: Award,
  2: Shield,
  3: Sparkles,
};

export function LeaderboardList({ users }: LeaderboardListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.08 },
        },
      }}
      className="overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#060c18]/85 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid grid-cols-[72px_minmax(0,1fr)_110px] items-center border-b border-cyan-400/10 px-4 py-3 text-xs uppercase tracking-[0.25em] text-zinc-500 sm:grid-cols-[84px_minmax(0,1fr)_160px] sm:px-6">
        <span>Rank</span>
        <span>Operator</span>
        <span className="text-right">Points</span>
      </div>

      <div className="divide-y divide-cyan-400/8">
        {users.map((user) => {
          const PodiumIcon = podiumIcons[user.rank] ?? Sparkles;
          const isTopThree = user.rank <= 3;

          return (
            <motion.div
              key={user.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ x: 4 }}
              className={cn(
                "grid grid-cols-[72px_minmax(0,1fr)_110px] items-center gap-3 px-4 py-4 transition sm:grid-cols-[84px_minmax(0,1fr)_160px] sm:px-6",
                user.isCurrentUser &&
                  "bg-cyan-400/10 ring-1 ring-inset ring-cyan-300/35",
                isTopThree && podiumStyles[user.rank],
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white">
                  #{user.rank}
                </div>
                {isTopThree && (
                  <div className="hidden rounded-2xl border border-white/10 bg-black/20 p-2 text-cyan-200 sm:flex">
                    <PodiumIcon className="h-4 w-4" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-base font-semibold text-white">
                    {user.name}
                  </p>
                  {user.isCurrentUser && (
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-200">
                      Current user
                    </span>
                  )}
                  {isTopThree && !user.isCurrentUser && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300">
                      Top {user.rank}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-400">
                  {user.rank === 1
                    ? "Mission leader with the highest score in the camp."
                    : user.isCurrentUser
                      ? "Your cyber training points sync from local progress on this device."
                      : "Completing labs, courses, and achievements keeps this operator competitive."}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-white">
                  {user.points.toLocaleString()}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  pts
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
