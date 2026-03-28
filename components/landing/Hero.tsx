"use client";

import { motion, type Variants } from "framer-motion";
import { Rocket, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const searchReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Hero({ courses }: HeroProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const autoCompleteOptions = courses
    .map((course) => course.title)
    .filter((title): title is string => Boolean(title));

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-cyan-400/10 px-6 text-center lg:px-12"
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

      <motion.div
        className="pointer-events-none absolute right-16 top-30 hidden lg:block"
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Rocket className="h-20 w-20 text-cyan-300/90" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-16 left-12 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 3.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <Rocket className="h-8 w-8 text-cyan-300/75" />
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-7 py-16 sm:gap-8"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUpSoft}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100"
        >
          <ShieldCheck className="h-4 w-4" />
          XyberSec-Academy
        </motion.div>

        <motion.h1
          variants={fadeUpSoft}
          className="text-balance text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Offensive <span className="font-bold">Security</span> Through Real-World Training
        </motion.h1>

        <motion.p
          variants={fadeIn}
          className="max-w-3xl text-base leading-relaxed text-zinc-300/90 sm:text-xl"
        >
          Learn ethical hacking, penetration testing, and cyber defense with
          structured courses.
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/ai">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="h-11 w-full bg-cyan-400 px-8 font-semibold text-[#041018] hover:bg-cyan-300 sm:w-auto">
                Chat With AI
              </Button>
            </motion.div>
          </Link>
          <Link href="/courses">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="h-11 w-full border-cyan-400/40 bg-[#081127]/70 px-8 text-cyan-100 hover:bg-cyan-400/10 sm:w-auto"
              >
                Explore Courses
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          variants={searchReveal}
          className="group w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_rgba(56,189,248,0)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/35 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] sm:p-5"
        >
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
                className="h-12 rounded-xl border-white/10 bg-[#050a18]/80 pl-12 text-base text-cyan-50 placeholder:text-cyan-100/60 transition-all duration-300 focus-visible:border-cyan-300/45 focus-visible:ring-2 focus-visible:ring-cyan-300/20"
              />
              <datalist id="hero-course-suggestions">
                {autoCompleteOptions.map((title) => (
                  <option key={title} value={title} />
                ))}
              </datalist>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleSearch()}
                className="h-12 rounded-xl bg-cyan-400 px-8 font-semibold text-[#041018] transition-all duration-300 hover:bg-cyan-300"
              >
                Search Courses
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
