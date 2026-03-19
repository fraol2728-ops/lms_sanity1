"use client";

import { Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeroCourse = {
  _id: string;
  title: string | null;
  description: string | null;
  slug: {
    current?: string;
  } | null;
};

type HeroProps = {
  courses: HeroCourse[];
};

export function Hero({ courses }: HeroProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const keywordRecommendations = useMemo(() => {
    const words = courses.flatMap((course) => {
      const searchSource = `${course.title ?? ""} ${course.description ?? ""}`;
      return searchSource
        .toLowerCase()
        .split(/[^a-z0-9+#]+/)
        .filter((word) => word.length > 4);
    });

    const uniqueKeywords = [...new Set(words)];
    return uniqueKeywords.slice(0, 8);
  }, [courses]);

  const autoCompleteOptions = useMemo(() => {
    return courses
      .map((course) => course.title)
      .filter((title): title is string => Boolean(title));
  }, [courses]);

  const handleSearch = (keyword?: string) => {
    const query = (keyword ?? searchTerm).trim().toLowerCase();
    if (!query) {
      return;
    }

    const exactCourse = courses.find((course) => {
      const title = course.title?.toLowerCase() ?? "";
      return title.includes(query) && course.slug?.current;
    });

    if (exactCourse?.slug?.current) {
      router.push(`/courses/${exactCourse.slug.current}`);
      return;
    }

    router.push(`/courses?search=${encodeURIComponent(query)}`);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-cyan-400/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.22),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.26),transparent_45%),linear-gradient(to_bottom,#040711,#050816)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 text-center lg:px-12 lg:pb-32">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
          <ShieldCheck className="h-4 w-4" />
          Next Cyber Camp
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          Master Offensive Through Real-World Training
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
          Learn ethical hacking, penetration testing, and cyber defense with
          structured courses.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/dashboard">
            <Button className="h-11 w-full bg-cyan-400 px-8 font-semibold text-[#041018] hover:bg-cyan-300 sm:w-auto">
              Start Learning
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              variant="outline"
              className="h-11 w-full border-cyan-400/40 bg-[#081127]/70 px-8 text-cyan-100 hover:bg-cyan-400/10 sm:w-auto"
            >
              Explore Courses
            </Button>
          </Link>
        </div>

        <div className="mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-cyan-400/30 bg-[#081127]/80 p-4 shadow-[0_0_35px_rgba(34,211,238,0.12)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200/70" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                list="hero-course-suggestions"
                placeholder="Search courses (e.g. penetration testing, SOC analyst, ethical hacking)"
                className="h-12 border-cyan-400/30 bg-[#050a18] pl-12 text-base text-cyan-50 placeholder:text-cyan-100/60"
              />
              <datalist id="hero-course-suggestions">
                {autoCompleteOptions.map((title) => (
                  <option key={title} value={title} />
                ))}
              </datalist>
            </div>

            <Button
              onClick={() => handleSearch()}
              className="h-12 bg-cyan-400 px-8 font-semibold text-[#041018] hover:bg-cyan-300"
            >
              Search Courses
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
              Recommended:
            </span>
            {keywordRecommendations.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => {
                  setSearchTerm(keyword);
                  handleSearch(keyword);
                }}
                className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-sm text-cyan-100 transition hover:bg-cyan-400/25"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
