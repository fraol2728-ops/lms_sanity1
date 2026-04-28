"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { AnimatedSection, staggerContainer } from "./animations";

export function TrainingPaths() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const trainingPaths = [
    {
      title: lang === "ar" ? "مختبر تطبيقات الويب" : "Web Pentester",
      description:
        lang === "ar"
          ? "أتقن استغلال تطبيقات الويب والاستطلاع وسلاسل الثغرات."
          : "Master web app exploitation, recon techniques, and vulnerability chaining.",
      courseCount: 8,
    },
    {
      title: lang === "ar" ? "مشغل فريق أحمر" : "Red Team Operator",
      description:
        lang === "ar"
          ? "طوّر مهارات العمليات الهجومية لمحاكاة بيئات المؤسسات."
          : "Develop offensive operations skills for enterprise simulations and adversary emulation.",
      courseCount: 10,
    },
    {
      title: lang === "ar" ? "صياد مكافآت الثغرات" : "Bug Bounty Hunter",
      description:
        lang === "ar"
          ? "تعلم منهجية متكررة لاكتشاف الثغرات عالية التأثير والإبلاغ عنها."
          : "Learn a repeatable process for finding and reporting impactful bugs.",
      courseCount: 6,
    },
  ];

  return (
    <AnimatedSection
      className={cn(
        "mx-auto max-w-7xl px-6 py-20 lg:px-12",
        lang === "ar" ? "text-right" : "text-left",
      )}
    >
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          {t.projectsTitle}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          {t.trainingPathsTitle}
        </h2>
      </div>

      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {trainingPaths.map((path, index) => (
          <motion.article
            key={path.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.12 }}
            className="rounded-2xl border border-cyan-400/20 bg-[#081127]/80 p-6 shadow-[0_0_30px_rgba(14,165,233,0.08)]"
          >
            <Target className="h-8 w-8 text-cyan-300" />
            <h3 className="mt-5 text-2xl font-semibold text-white">
              {path.title}
            </h3>
            <p className="mt-3 text-sm text-zinc-300">{path.description}</p>
            <p className="mt-5 text-sm font-medium text-cyan-200">
              {path.courseCount} {t.coursesCount}
            </p>
            <Link href="/dashboard" className="mt-6 inline-block">
              <Button className="bg-cyan-400 text-[#041018] hover:bg-cyan-300">
                {t.startPath}
              </Button>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
