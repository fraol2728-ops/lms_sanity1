"use client";

import { motion } from "framer-motion";
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
  const activeScale = reducedMotionScale ? 1.03 : 1.06;
  const inactiveScale = 1;

  return (
    <motion.article
      data-path-id={path.id}
      animate={{
        scale: isActive ? activeScale : inactiveScale,
        opacity: isActive ? 1 : 0.72,
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={cn(
        "group relative h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11111c]",
        isActive
          ? "z-20 border-cyan-200/80 shadow-[0_0_0_1px_rgba(56,189,248,0.2),0_20px_60px_rgba(8,145,178,0.24)]"
          : "shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
      )}
    >
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 scale-[1.18] rounded-[28px] bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.5),rgba(56,189,248,0.2)_35%,rgba(15,23,42,0)_72%)] blur-2xl"
          aria-hidden="true"
        />
      ) : null}
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
            sizes="280px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-black" />
        )}
      </button>
    </motion.article>
  );
}
