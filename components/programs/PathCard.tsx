"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CareerPath } from "./types";

interface PathCardProps {
  path: CareerPath;
  isSelected: boolean;
  onSelect: (id: string) => void;
  styleState: {
    scale: number;
    opacity: number;
    blur: number;
  };
}

export function PathCard({
  path,
  isSelected,
  onSelect,
  styleState,
}: PathCardProps) {
  return (
    <motion.article
      animate={{
        scale: styleState.scale,
        opacity: styleState.opacity,
        filter: `blur(${styleState.blur}px)`,
      }}
      whileHover={{ scale: Math.max(styleState.scale, 0.92), y: -4 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "group relative min-w-[280px] snap-center overflow-hidden rounded-2xl border bg-[#10101a] text-left shadow-xl transition-all sm:min-w-[340px] md:[filter:blur(1px)]",
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

      <div className="relative aspect-[16/9] border-b border-white/10 bg-zinc-900/70">
        {path.thumbnailUrl ? (
          <Image
            src={path.thumbnailUrl}
            alt={path.title}
            fill
            sizes="(max-width: 768px) 80vw, 340px"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Thumbnail pending
          </div>
        )}
      </div>

      <div className="relative z-20 space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-200">
            {path.difficulty}
          </span>
          <span className="text-xs text-zinc-400">
            {path.phases.length} phases
          </span>
        </div>

        <div>
          <h3 className="font-mono text-xl font-semibold tracking-tight text-white">
            {path.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-300">
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
