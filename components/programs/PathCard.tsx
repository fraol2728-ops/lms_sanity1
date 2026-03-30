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
          ? "z-20 border-cyan-200/90 shadow-[0_0_0_1px_rgba(56,189,248,0.38),0_25px_70px_rgba(8,145,178,0.38)] [--card-scale:1.045]"
          : "shadow-[0_10px_25px_rgba(0,0,0,0.35)]",
      )}
      style={{
        opacity: "var(--card-opacity,0.9)",
        transform: "translateZ(0) scale(var(--card-scale,0.98))",
      }}
    >
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 scale-[1.2] rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.58),rgba(34,211,238,0.34)_34%,rgba(14,116,144,0.2)_55%,rgba(15,23,42,0)_76%)] blur-2xl"
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
