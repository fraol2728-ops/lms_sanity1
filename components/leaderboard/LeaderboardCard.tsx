"use client";

import { motion } from "framer-motion";
import { Crown, Medal, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: "points" | "rank" | "course";
  accent?: "cyan" | "violet" | "amber";
}

const iconMap = {
  points: Sparkles,
  rank: Crown,
  course: ShieldCheck,
};

const accentMap = {
  cyan: "from-cyan-500/20 via-cyan-400/10 to-transparent border-cyan-400/25 shadow-cyan-500/10",
  violet:
    "from-violet-500/20 via-fuchsia-500/10 to-transparent border-violet-400/25 shadow-violet-500/10",
  amber:
    "from-amber-500/20 via-orange-500/10 to-transparent border-amber-400/25 shadow-amber-500/10",
};

export function LeaderboardCard({
  title,
  value,
  description,
  icon,
  accent = "cyan",
}: LeaderboardCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-[#08111f]/90 p-5 shadow-2xl backdrop-blur-xl",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:content-['']",
        accentMap[accent],
      )}
    >
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">
            {title}
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          <p className="mt-2 text-sm text-zinc-400">{description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.2)]">
          {icon === "rank" ? (
            <Medal className="h-6 w-6" />
          ) : (
            <Icon className="h-6 w-6" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
