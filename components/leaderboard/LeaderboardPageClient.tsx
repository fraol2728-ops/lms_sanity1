"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Shield, Swords, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LeaderboardCard } from "@/components/leaderboard/LeaderboardCard";
import { LeaderboardList } from "@/components/leaderboard/LeaderboardList";
import {
  leaderboardEventName,
  pointsRules,
} from "@/components/leaderboard/leaderboard-data";
import { buildLeaderboard } from "@/components/leaderboard/leaderboard-storage";
import { UserRank } from "@/components/leaderboard/UserRank";

export function LeaderboardPageClient() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState(() => buildLeaderboard());

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const syncLeaderboard = () => {
      setData(
        buildLeaderboard({
          id: user?.id,
          name: user?.firstName ?? user?.username ?? user?.fullName ?? "You",
        }),
      );
    };

    syncLeaderboard();
    window.addEventListener("storage", syncLeaderboard);
    window.addEventListener(leaderboardEventName, syncLeaderboard);

    return () => {
      window.removeEventListener("storage", syncLeaderboard);
      window.removeEventListener(leaderboardEventName, syncLeaderboard);
    };
  }, [isLoaded, user]);

  const currentUser = useMemo(
    () => data.users.find((entry) => entry.isCurrentUser) ?? data.users[0],
    [data.users],
  );

  return (
    <main className="min-h-screen bg-[#05080f] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_32%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.08),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#07101d]/80 p-6 shadow-[0_0_80px_rgba(34,211,238,0.1)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200">
                <Shield className="h-3.5 w-3.5" />
                Cyber leaderboard
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Rank operators by cyber skill points.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg">
                Track lesson completions, course finishes, and achievements with
                a frontend-only point system powered by localStorage.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-zinc-200 shadow-[0_0_50px_rgba(168,85,247,0.12)] sm:grid-cols-3 sm:text-right">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  Lesson
                </p>
                <p className="mt-1 font-semibold text-cyan-200">
                  +{pointsRules.lesson} pts
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  Course
                </p>
                <p className="mt-1 font-semibold text-violet-200">
                  +{pointsRules.course} pts
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  Achievement
                </p>
                <p className="mt-1 font-semibold text-amber-200">
                  +{pointsRules.achievement} pts
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <LeaderboardCard
            title="Total points"
            value={currentUser.points.toLocaleString()}
            description="Your score is calculated from lesson, course, and achievement completions stored in this browser."
            icon="points"
            accent="cyan"
          />
          <LeaderboardCard
            title="Rank position"
            value={`#${currentUser.rank}`}
            description="Move higher by completing more missions and certifications."
            icon="rank"
            accent="violet"
          />
          <LeaderboardCard
            title="Point sources"
            value="3"
            description="Lessons, full courses, and achievements all feed your standing."
            icon="course"
            accent="amber"
          />
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <UserRank
              rank={currentUser.rank}
              totalUsers={data.users.length}
              points={currentUser.points}
            />
            <LeaderboardList users={data.users} />
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="h-fit rounded-3xl border border-cyan-400/15 bg-[#07101c]/85 p-6 shadow-[0_0_60px_rgba(8,145,178,0.12)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 text-cyan-200">
              <Trophy className="h-5 w-5" />
              <h2 className="text-lg font-semibold text-white">
                How scoring works
              </h2>
            </div>
            <div className="mt-5 space-y-4 text-sm text-zinc-300">
              <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
                <p className="font-medium text-white">Frontend-only storage</p>
                <p className="mt-1 text-zinc-400">
                  All point totals are simulated in localStorage, so no backend
                  changes are required.
                </p>
              </div>
              <div className="rounded-2xl border border-violet-400/10 bg-violet-400/5 p-4">
                <p className="font-medium text-white">Current user highlight</p>
                <p className="mt-1 text-zinc-400">
                  Your row gets a cyan glow so you can find your rank instantly
                  on mobile and desktop.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-4">
                <p className="font-medium text-white">Animated competition</p>
                <p className="mt-1 text-zinc-400">
                  Framer Motion adds fade-in sequencing, hover lift, and
                  rank-focused transitions for a cyber UI feel.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/15 bg-[#0b1728] px-4 py-3 text-sm text-zinc-300">
              <Swords className="h-4 w-4 text-cyan-300" />
              Keep training to overtake the podium.
            </div>
          </motion.aside>
        </section>
      </div>
    </main>
  );
}
