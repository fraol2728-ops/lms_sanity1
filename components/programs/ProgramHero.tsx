"use client";

import { motion } from "framer-motion";
import { BookOpen, Gauge, Timer } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProgramHeroProps {
  title: string;
  description: string | null;
  difficulty: string;
  moduleCount: number;
  durationLabel: string;
  startHref: string;
  continueHref: string;
}

export function ProgramHero({
  title,
  description,
  difficulty,
  moduleCount,
  durationLabel,
  startHref,
  continueHref,
}: ProgramHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B0F19] via-[#0f172a] to-[#07111f] p-8 sm:p-10"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/80">
          Cybersecurity Program
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {description}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Badge className="border border-cyan-300/30 bg-cyan-300/10 text-cyan-100">
            <Gauge className="mr-1.5 h-3.5 w-3.5" />
            {difficulty}
          </Badge>
          <Badge className="border border-blue-300/30 bg-blue-300/10 text-blue-100">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            {moduleCount} modules
          </Badge>
          <Badge className="border border-white/20 bg-white/5 text-slate-100">
            <Timer className="mr-1.5 h-3.5 w-3.5" />
            {durationLabel}
          </Badge>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            asChild
            className="rounded-xl bg-cyan-300 px-6 text-[#04111d] hover:bg-cyan-200"
          >
            <Link href={startHref}>Start Program</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href={continueHref}>Continue Learning</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
