"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CareerPath } from "./types";

interface PathCardProps {
  path: CareerPath;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function PathCard({ path, isSelected, onSelect }: PathCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative min-w-[300px] snap-start overflow-hidden rounded-2xl border bg-[#10101a] p-6 text-left shadow-xl transition-all sm:min-w-[380px]",
        isSelected
          ? "border-cyan-400/70 shadow-cyan-500/25"
          : "border-white/10 shadow-black/40 hover:border-cyan-300/50 hover:shadow-cyan-500/20",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(path.id)}
        className="absolute inset-0 z-10"
        aria-label={`Open ${path.title} path details`}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
          path.accent,
        )}
      />

      <div className="relative z-20 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{path.icon}</span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-200">
            {path.difficulty}
          </span>
        </div>

        <div>
          <h3 className="font-mono text-xl font-semibold tracking-tight text-white">
            {path.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            {path.description}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-sm font-medium text-cyan-300 transition-colors group-hover:text-cyan-200">
          Start Path
          <ArrowRight className="size-4" />
        </div>
      </div>
    </motion.article>
  );
}
