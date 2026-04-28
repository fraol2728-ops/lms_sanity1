"use client";

import { motion, type Variants } from "framer-motion";
import { Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

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

const companiesReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const trustedCompanies = [
  { name: "Google", emblem: "G", emblemClass: "bg-blue-500/25 text-blue-100" },
  {
    name: "Microsoft",
    emblem: "MS",
    emblemClass: "bg-cyan-500/25 text-cyan-100",
  },
  {
    name: "Amazon",
    emblem: "a",
    emblemClass: "bg-orange-500/25 text-orange-100",
  },
  { name: "Cisco", emblem: "Ci", emblemClass: "bg-sky-500/25 text-sky-100" },
  {
    name: "IBM",
    emblem: "IBM",
    emblemClass: "bg-indigo-500/25 text-indigo-100",
  },
  {
    name: "Cloudflare",
    emblem: "Cf",
    emblemClass: "bg-amber-500/25 text-amber-100",
  },
  {
    name: "NVIDIA",
    emblem: "NV",
    emblemClass: "bg-emerald-500/25 text-emerald-100",
  },
  {
    name: "Palo Alto Networks",
    emblem: "PA",
    emblemClass: "bg-fuchsia-500/25 text-fuchsia-100",
  },
];

export function Hero({ courses: _courses }: HeroProps) {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden border-b border-cyan-400/10 px-6 lg:px-12",
        lang === "ar" ? "text-right" : "text-center",
      )}
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
          {t.heroBadge}
        </motion.div>

        <motion.h1
          variants={fadeUpSoft}
          className="text-balance text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          {t.heroTitle}
        </motion.h1>

        <motion.p
          variants={fadeIn}
          className="max-w-3xl text-base leading-relaxed text-zinc-300/90 sm:text-xl"
        >
          {t.heroSubtitle}
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/ai">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="h-11 w-full bg-cyan-400 px-8 font-semibold text-[#041018] hover:bg-cyan-300 sm:w-auto">
                {t.chatWithAi}
              </Button>
            </motion.div>
          </Link>
          <Link href="/courses">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="h-11 w-full border-cyan-400/40 bg-[#081127]/70 px-8 text-cyan-100 hover:bg-cyan-400/10 sm:w-auto"
              >
                {t.exploreServices}
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          variants={companiesReveal}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_0_rgba(56,189,248,0)] backdrop-blur-xl sm:p-5"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-100/80">
            {t.trustedBy}
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <motion.div
              className="flex w-max gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 28,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {[...trustedCompanies, ...trustedCompanies].map(
                (company, index) => (
                  <div
                    key={`${company.name}-${index}`}
                    className="flex min-w-[190px] items-center gap-3 rounded-xl border border-white/10 bg-[#050a18]/80 px-4 py-3"
                  >
                    <span
                      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-1 text-xs font-semibold uppercase tracking-wide ${company.emblemClass}`}
                    >
                      {company.emblem}
                    </span>
                    <span className="text-sm text-zinc-200">
                      {company.name}
                    </span>
                  </div>
                ),
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
