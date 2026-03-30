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
        "group relative h-[180px] w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11111c] transition-[transform,filter,opacity,border-color,box-shadow] duration-300 ease-out will-change-transform",
        isActive
          ? "z-20 border-cyan-200/80 shadow-[0_0_0_1px_rgba(56,189,248,0.2),0_20px_60px_rgba(8,145,178,0.24)]"
          : "shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
      )}
      style={{
        filter: "blur(var(--card-blur,0px))",
        opacity: "var(--card-opacity,0.85)",
        transform: "translateZ(0) scale(var(--card-scale,0.98))",
      }}
    >
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 scale-[1.14] rounded-[28px] bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.45),rgba(56,189,248,0.18)_35%,rgba(15,23,42,0)_72%)] blur-xl"
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
    </article>
  );
}
