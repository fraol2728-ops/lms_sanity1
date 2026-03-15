"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
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

      <motion.div
        className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 text-center lg:px-12 lg:pb-32"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
          <ShieldCheck className="h-4 w-4" />
          Next Cyber Camp
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          Master Cybersecurity Through Real-World Training
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
          <Link href="#courses">
            <Button
              variant="outline"
              className="h-11 w-full border-cyan-400/40 bg-[#081127]/70 px-8 text-cyan-100 hover:bg-cyan-400/10 sm:w-auto"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
