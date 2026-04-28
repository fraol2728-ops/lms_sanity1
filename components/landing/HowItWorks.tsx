"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { AnimatedSection, staggerContainer } from "./animations";

export function HowItWorks() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const steps = [t.step1, t.step2, t.step3];

  return (
    <AnimatedSection
      className={cn(
        "mx-auto max-w-7xl px-6 py-20 lg:px-12",
        lang === "ar" ? "text-right" : "text-left",
      )}
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          {t.howItWorks}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          {t.howItWorksTitle}
        </h2>
      </div>

      <motion.div
        className="grid gap-5 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-2xl border border-cyan-400/20 bg-[#081127]/65 p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-lg font-bold text-cyan-200">
              {index + 1}
            </div>
            <p className="mt-5 text-lg font-medium text-white">{step}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
