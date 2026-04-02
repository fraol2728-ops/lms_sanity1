"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CareerPath } from "./types";

interface PathCardProps {
  path: CareerPath;
  isActive: boolean;
  onSelect: () => void;
}

export function PathCard({ path, isActive, onSelect }: PathCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Center ${path.title} path card`}
      className={cn(
        "group relative h-[220px] w-[360px] shrink-0 overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out",
        isActive
          ? "scale-100 border-cyan-200/80 opacity-100 shadow-[0_0_0_1px_rgba(56,189,248,0.55),0_35px_90px_rgba(8,145,178,0.62)]"
          : "scale-[0.94] border-white/10 opacity-55 hover:opacity-80",
      )}
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
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent transition-opacity",
          isActive ? "opacity-100" : "opacity-70",
        )}
      />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="line-clamp-2 text-lg font-semibold text-white">
          {path.title}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-200/90">
          {path.phases.length} phases
        </p>
      </div>
    </button>
  );
}
