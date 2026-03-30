"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FEATURED_COURSES_QUERYResult } from "@/sanity.types";
import { AnimatedSection } from "./animations";

interface PopularCoursesProps {
  courses: FEATURED_COURSES_QUERYResult;
}


export function PopularCourses({ courses }: PopularCoursesProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeCourses = useMemo(() => courses ?? [], [courses]);

  const scrollCardToCenter = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = carouselRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const currentScroll = container.scrollLeft;
    const delta = cardRect.left - containerRect.left;
    const target = currentScroll + delta - containerRect.width / 2 + cardRect.width / 2;

    container.scrollTo({
      left: Math.max(0, target),
      behavior,
    });
  }, []);

  useEffect(() => {
    scrollCardToCenter(activeIndex, "auto");
  }, [activeIndex, scrollCardToCenter]);

  useEffect(() => {
    const container = carouselRef.current;

    if (!container || safeCourses.length === 0) {
      return;
    }

    let ticking = false;

    const updateActiveFromScroll = () => {
      if (!container) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      let nextIndex = activeIndex;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenterX - centerX);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      if (nextIndex !== activeIndex) {
        setActiveIndex(nextIndex);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateActiveFromScroll);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex, safeCourses.length]);

  if (safeCourses.length === 0) {
    return null;
  }

  const activeCourse = safeCourses[activeIndex] ?? safeCourses[0];

  const goToIndex = (index: number) => {
    const total = safeCourses.length;
    if (total === 0) {
      return;
    }

    const normalized = ((index % total) + total) % total;
    setActiveIndex(normalized);
    scrollCardToCenter(normalized);
  };

  return (
    <AnimatedSection id="courses" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Popular Courses</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Trending courses from Next XyberSec
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToIndex(activeIndex - 1)}
            aria-label="Previous course"
            className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:border-cyan-300 hover:text-cyan-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goToIndex(activeIndex + 1)}
            aria-label="Next course"
            className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:border-cyan-300 hover:text-cyan-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc(50%-152px)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {safeCourses.map((course, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={course._id}
                type="button"
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onClick={() => goToIndex(index)}
                className="group snap-center text-left"
                aria-current={isActive}
              >
                <motion.article
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-[304px] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="relative h-40">
                    {course.thumbnail?.asset?.url ? (
                      <Image
                        src={course.thumbnail.asset.url}
                        alt={course.title ?? "Course thumbnail"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-r from-cyan-500/40 to-violet-500/40" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/25 to-transparent" />
                  </div>

                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold text-white">
                      {course.title ?? "Untitled Course"}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-300/85">
                      {course.description ?? "Hands-on modules to sharpen practical cybersecurity skills."}
                    </p>
                    <p className="text-xs text-slate-400">
                      {course.lessonCount ?? 0} lessons • {course.moduleCount ?? 0} modules
                    </p>
                  </div>
                </motion.article>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCourse._id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 to-violet-400/10 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-cyan-200/90">Course preview</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {activeCourse.title ?? "Untitled Course"}
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-slate-200/90">
                {activeCourse.description ??
                  "Dive into practical exercises, guided modules, and focused lessons that build real security confidence."}
              </p>
            </div>

            <Link
              href={activeCourse.slug?.current ? `/courses/${activeCourse.slug.current}` : "#"}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300/90 px-4 py-2 text-sm font-semibold text-[#04111f] transition hover:bg-cyan-200"
            >
              <PlayCircle className="h-4 w-4" />
              Start course
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
