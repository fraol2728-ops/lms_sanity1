"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CareerPath } from "./types";

interface PathCardProps {
  path: CareerPath;
  isActive: boolean;
  onSelect: (id: string) => void;
  reducedMotionScale?: boolean;
}

export function PathCard({
  path,
  isActive,
  onSelect,
  reducedMotionScale = false,
}: PathCardProps) {
  const activeScale = reducedMotionScale ? 1.02 : 1.05;
  const inactiveScale = reducedMotionScale ? 0.96 : 0.92;

  return (
    <motion.article
      data-path-id={path.id}
      animate={{
        scale: isActive ? activeScale : inactiveScale,
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "group relative h-[160px] w-[250px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11111c]",
        isActive
          ? "border-cyan-300/70 shadow-[0_0_0_1px_rgba(34,211,238,0.24),0_0_30px_rgba(56,189,248,0.18)]"
          : "shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(path.id)}
        className="relative h-full w-full text-left"
        aria-label={`Center ${path.title} path card`}
      >
        {path.thumbnailUrl ? (
          <Image
            src={path.thumbnailUrl}
            alt={path.title}
            fill
            className="object-cover"
            sizes="250px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2.5">
          <p className="line-clamp-1 font-mono text-sm font-medium text-white">
            {path.title}
          </p>
          <span className="rounded-full border border-white/20 bg-black/35 p-1 text-zinc-100">
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </button>
    </motion.article>
  );
}
