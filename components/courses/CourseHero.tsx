import { ArrowLeft, Clock3, Layers, PlayCircle, Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TIER_STYLES } from "@/lib/constants";
import type { COURSE_WITH_MODULES_QUERYResult } from "@/sanity.types";

type Course = NonNullable<COURSE_WITH_MODULES_QUERYResult>;

type CourseHeroProps = Pick<
  Course,
  "title" | "description" | "tier" | "moduleCount" | "lessonCount"
> & {
  startHref: string;
  continueHref: string;
};

export function CourseHero({
  title,
  description,
  tier,
  moduleCount,
  lessonCount,
  startHref,
  continueHref,
}: CourseHeroProps) {
  const displayTier = tier ?? "free";
  const styles = TIER_STYLES[displayTier];
  const estimatedMinutes = (lessonCount ?? 0) * 12;

  return (
    <section className="mb-10 rounded-2xl border border-cyan-500/20 bg-[#07101d]/85 p-7 shadow-[0_0_55px_rgba(14,116,144,0.15)]">
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-cyan-300"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`${styles.text} ${styles.border} bg-transparent`}>
            <Shield className="mr-1 h-3 w-3" />
            {displayTier.toUpperCase()} LEVEL
          </Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-300">
            <Layers className="mr-1 h-3 w-3" />
            {moduleCount ?? 0} Modules
          </Badge>
          <Badge variant="outline" className="border-zinc-700 text-zinc-300">
            <Clock3 className="mr-1 h-3 w-3" />
            {estimatedMinutes} min
          </Badge>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title ?? "Untitled Course"}
        </h1>
        <p className="max-w-3xl text-zinc-400">
          {description ?? "No description available."}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            asChild
            className="bg-cyan-500 text-[#061018] hover:bg-cyan-400"
          >
            <Link href={startHref}>Start Course</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-cyan-500/40 bg-transparent text-cyan-200 hover:bg-cyan-500/10"
          >
            <Link href={continueHref}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Course
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
