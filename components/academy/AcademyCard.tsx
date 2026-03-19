"use client";

import { motion } from "framer-motion";
import { Clock3, MapPin, Signal, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AcademyCourse } from "@/lib/academy-data";

interface AcademyCardProps {
  course: AcademyCourse;
}

export function AcademyCard({ course }: AcademyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="h-full"
    >
      <Link href={`/academy/${course.slug}`} className="block h-full">
        <Card className="group h-full overflow-hidden border-cyan-400/15 bg-[#07111f]/85 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-cyan-300/35 hover:shadow-[0_24px_100px_rgba(34,211,238,0.16)]">
          <CardHeader className="relative space-y-4">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
                Physical course
              </Badge>
              <Badge
                variant="outline"
                className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100"
              >
                {course.level}
              </Badge>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200">
                {course.title}
              </CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-300">
                {course.description}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="mb-2 flex items-center gap-2 text-cyan-200">
                <Clock3 className="h-4 w-4" /> Duration
              </div>
              <p>{course.duration}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="mb-2 flex items-center gap-2 text-cyan-200">
                <Signal className="h-4 w-4" /> Level
              </div>
              <p>{course.level}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4 sm:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-cyan-200">
                <MapPin className="h-4 w-4" /> Location
              </div>
              <p>{course.location}</p>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-white/8 pt-6 text-sm text-slate-300">
            <span>{course.cohort}</span>
            <span className="inline-flex items-center gap-2 text-cyan-200 transition-transform duration-300 group-hover:translate-x-1">
              Explore academy <Sparkles className="h-4 w-4" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
