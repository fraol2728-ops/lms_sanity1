"use client";

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
    <article
      className={cn(
        "group w-[280px] shrink-0 snap-start overflow-hidden rounded-[16px] border border-white/10 bg-[#10101a] transition-transform duration-200 ease-out hover:scale-[1.03]",
        isSelected
          ? "border-cyan-400/70 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
          : "hover:border-cyan-300/40",
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(path.id)}
        className="flex w-full flex-col text-left"
        aria-label={`Open ${path.title} path details`}
      >
        <div
          className={cn(
            "relative h-36 w-full overflow-hidden border-b border-white/10",
            path.accent,
          )}
        >
          <div className="absolute inset-0 bg-black/35" />
          <span className="absolute bottom-3 right-3 text-4xl" aria-hidden>
            {path.icon}
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-mono text-lg font-semibold tracking-tight text-white">
              {path.title}
            </h3>
            <span className="rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-zinc-200">
              {path.difficulty}
            </span>
          </div>

          <p className="text-sm leading-6 text-zinc-300 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
            {path.description}
          </p>

          <span className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan-300 transition-colors group-hover:text-cyan-200">
            Explore path
            <ArrowRight className="size-4" />
          </span>
        </div>
      </button>
    </article>
  );
}
