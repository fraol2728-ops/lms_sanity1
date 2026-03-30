"use client";

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
  reducedMotionScale: _reducedMotionScale = false,
}: PathCardProps) {
  return (
    <article
      data-path-id={path.id}
      className={cn(
        "group relative h-[220px] w-[360px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11111c] transition-[transform,opacity,border-color,box-shadow] duration-300 ease-out will-change-transform",
        isActive
          ? "z-30 border-cyan-200 shadow-[0_0_0_1px_rgba(56,189,248,0.55),0_35px_90px_rgba(8,145,178,0.62)] [--card-scale:2]"
          : "shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
      )}
      style={{
        opacity: "var(--card-opacity,0.9)",
        transform: "translateZ(0) scale(var(--card-scale,0.98))",
      }}
    >
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 scale-[1.8] rounded-[40px] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.78),rgba(34,211,238,0.5)_34%,rgba(14,116,144,0.32)_58%,rgba(15,23,42,0)_82%)] blur-3xl"
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
            sizes="360px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-black" />
        )}
      </button>
    </article>
  );
}
