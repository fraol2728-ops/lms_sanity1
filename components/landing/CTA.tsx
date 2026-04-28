"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import { AnimatedSection } from "./animations";

export function CTA() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <AnimatedSection className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-12">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-[#070d1f] px-8 py-14 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.3),transparent_48%)]" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white sm:text-5xl">
            {t.ctaTitle}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button className="h-11 bg-cyan-400 px-8 text-[#02101d] hover:bg-cyan-300">
                {t.getQuote}
              </Button>
            </Link>
            <Link href="#courses">
              <Button
                variant="outline"
                className="h-11 border-cyan-300/50 bg-transparent px-8 text-cyan-100 hover:bg-cyan-400/10"
              >
                {t.browseCourses}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
