"use client";

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

          </span>
          <span className="text-xs text-zinc-400">
            {path.phases.length} phases
          </span>
        </div>


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
