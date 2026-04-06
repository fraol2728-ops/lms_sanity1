"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const floatPulse: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[-20%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.35)_0%,rgba(22,163,74,0.12)_35%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-18%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.25)_0%,rgba(22,163,74,0.08)_35%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-4 py-16 md:grid-cols-2 md:gap-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Powering the Future with Intelligent Solar Energy
          </h1>

          <p className="mt-6 max-w-lg text-gray-300 md:mx-0 mx-auto">
            Advanced solar solutions for homes, industries, and governments
            with reliable and sustainable energy systems.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Get a Free Quote
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-500 transition hover:bg-green-600 hover:text-white"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={floatPulse}
            className="relative flex h-[300px] w-full max-w-md items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
          >
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{
                duration: 4.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex h-full w-full items-center justify-center rounded-2xl border border-green-500/35 bg-gradient-to-b from-green-500/15 to-transparent"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-green-300/90">
                Solar Animation Placeholder
              </span>
            </motion.div>
          </motion.div>

          <motion.article
            initial="hidden"
            animate="visible"
            variants={cardReveal}
            className="mt-6 flex max-w-sm gap-4 rounded-2xl bg-white p-4 text-black shadow-xl md:absolute md:bottom-[-40px] md:right-10 md:mt-0"
          >
            <Image
              src="/og.png"
              alt="Solar farm news"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-xl object-cover"
              sizes="72px"
              priority
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold">
                Solar Grid Upgrade Announced
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">Apr 6, 2026</p>
              <p className="mt-2 truncate text-xs text-gray-700">
                New intelligent storage systems improve energy reliability.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
