"use client";

import { ShieldCheck } from "lucide-react";
import { AchievementsList } from "@/components/achievements/AchievementsList";

export function Achievements() {
  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-[#060b14]/80 p-6 shadow-[0_0_32px_rgba(34,211,238,0.06)]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.18)]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Achievements</h3>
          <p className="text-sm text-zinc-400">
            Track your lesson milestones and unlock mission badges.
          </p>
        </div>
      </div>

      <AchievementsList />
    </section>
  );
}
