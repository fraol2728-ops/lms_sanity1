"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProgramShowcaseData {
  _id: string;
  title: string | null;
  description: string | null;
  slug?: { current?: string | null } | null;
  tier?: "free" | "pro" | "ultra" | null;
  category?: string | null;
  level?: string | null;
  thumbnail?: {
    asset?: {
      url?: string | null;
    } | null;
  } | null;
  image?: string | null;
}

interface ProgramShowcaseProps {
  program: ProgramShowcaseData;
  reverse?: boolean;
}

const tierToLevel: Record<NonNullable<ProgramShowcaseData["tier"]>, string> = {
  free: "Beginner",
  pro: "Intermediate",
  ultra: "Advanced",
};

export function ProgramShowcase({
  program,
  reverse = false,
}: ProgramShowcaseProps) {
  const title = program.title ?? "Untitled Program";
  const description =
    program.description ??
    "Hands-on cybersecurity training built for practical growth.";
  const level =
    program.level ?? (program.tier ? tierToLevel[program.tier] : "All Levels");
  const category = program.category ?? "Cybersecurity";
  const imageUrl = program.image ?? program.thumbnail?.asset?.url;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="border-b border-border py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 lg:px-12">
        <div className={cn("space-y-6", reverse && "md:order-2")}>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="secondary"
              className="border border-border bg-muted/50 px-3 py-1"
            >
              {level}
            </Badge>
            <Badge
              variant="secondary"
              className="border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-200"
            >
              {category}
            </Badge>
          </div>
          <Button asChild size="lg" className="group">
            <Link
              href={
                program.slug?.current ? `/courses/${program.slug.current}` : "#"
              }
            >
              Start Program
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Button>
        </div>

        <div className={cn("relative", reverse && "md:order-1")}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/70 bg-muted/20 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20" />
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
