"use client";

import { motion } from "framer-motion";
import { Crosshair, Trophy } from "lucide-react";

interface UserRankProps {
  rank: number;
  totalUsers: number;
  points: number;
}

export function UserRank({ rank, totalUsers, points }: UserRankProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="rounded-3xl border border-cyan-400/25 bg-[#091322]/90 p-6 shadow-[0_0_45px_rgba(34,211,238,0.12)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
            Current operator
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            You are ranked #{rank}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            Stay on mission. Complete lessons, finish courses, and unlock
            achievements to climb above {totalUsers - rank} more learners.
          </p>
        </div>

        <div className="grid gap-3 sm:min-w-64">
          <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-3">
            <Trophy className="h-5 w-5 text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Points
              </p>
              <p className="text-lg font-semibold text-white">
                {points.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-violet-400/15 bg-violet-400/5 px-4 py-3">
            <Crosshair className="h-5 w-5 text-violet-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Leaderboard field
              </p>
              <p className="text-lg font-semibold text-white">
                {totalUsers} operators
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
