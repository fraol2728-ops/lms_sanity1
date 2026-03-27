"use client";

import { motion } from "framer-motion";
import { Layers3, ListChecks, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  title: string;
  thumbnailUrl: string | null;
  moduleCount: number;
  lessonCount: number;
  durationLabel: string;
  startHref: string;
  continueHref: string;
  progressPercent: number;
}

export function Sidebar({
  title,
  thumbnailUrl,
  moduleCount,
  lessonCount,
  durationLabel,
  startHref,
  continueHref,
  progressPercent,
}: SidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-24 space-y-6"
    >
      <div className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#0d1524] shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            width={800}
            height={450}
            className="h-auto w-full object-cover"
          />
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10" />
        )}
      </div>

      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
        <Button
          asChild
          className="w-full rounded-xl bg-cyan-300 text-[#04111d] hover:bg-cyan-200"
        >
          <Link href={startHref}>Start Course</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
        >
          <Link href={continueHref}>Continue Course</Link>
        </Button>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
        <h3 className="text-lg font-medium text-white">Course Info</h3>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <Layers3 className="h-4 w-4" /> Modules
            </span>
            <span>{moduleCount}</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <ListChecks className="h-4 w-4" /> Lessons
            </span>
            <span>{lessonCount}</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <Timer className="h-4 w-4" /> Duration
            </span>
            <span>{durationLabel}</span>
          </li>
        </ul>

        <div className="pt-2">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-cyan-200/85">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
