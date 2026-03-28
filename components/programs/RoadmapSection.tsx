"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PathCard } from "./PathCard";
import type { CareerPath } from "./types";

const PathDetails = dynamic(() => import("./PathDetails"), {
  loading: () => (
    <div className="rounded-3xl border border-white/10 bg-[#11111c] p-7 text-sm text-zinc-400">
      Loading roadmap details...
    </div>
  ),
});

interface RoadmapSectionProps {
  paths: CareerPath[];
}

const SCROLL_SPEED_PX_PER_SECOND = 26;

const distanceBucket = (distance: number) => {
  if (distance <= 0) {
    return { scale: 1, opacity: 1, blur: 0 };
  }

  if (distance === 1) {
    return { scale: 0.9, opacity: 0.6, blur: 2 };
  }

  return { scale: 0.85, opacity: 0.3, blur: 4 };
};

function RoadmapSectionComponent({ paths }: RoadmapSectionProps) {
  const safePaths = useMemo(() => paths.filter((path) => path.slug), [paths]);
  const loopPaths = useMemo(() => [...safePaths, ...safePaths], [safePaths]);

  const [selectedPathId, setSelectedPathId] = useState(safePaths[0]?.id ?? "");
  const [blurMultiplier, setBlurMultiplier] = useState(1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!safePaths.length) return;

    setSelectedPathId((current) =>
      safePaths.some((path) => path.id === current) ? current : safePaths[0].id,
    );
  }, [safePaths]);

  useEffect(() => {
    const setResponsiveBlur = () => {
      if (window.innerWidth < 768) {
        setBlurMultiplier(0);
        return;
      }

      if (window.innerWidth < 1024) {
        setBlurMultiplier(0.5);
        return;
      }

      setBlurMultiplier(1);
    };

    setResponsiveBlur();
    window.addEventListener("resize", setResponsiveBlur);
    return () => window.removeEventListener("resize", setResponsiveBlur);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !safePaths.length) return;

    containerRef.current.scrollLeft = containerRef.current.scrollWidth / 4;
  }, [safePaths.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || safePaths.length <= 1) return;

    let rafId = 0;
    let lastTs = 0;

    const step = (timestamp: number) => {
      if (!lastTs) {
        lastTs = timestamp;
      }

      const delta = timestamp - lastTs;
      lastTs = timestamp;

      if (!container.matches(":hover")) {
        container.scrollLeft += (SCROLL_SPEED_PX_PER_SECOND * delta) / 1000;
      }

      const half = container.scrollWidth / 2;
      if (container.scrollLeft >= half) {
        container.scrollLeft -= half;
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [safePaths.length]);

  const centerPath = useCallback(() => {
    const container = containerRef.current;
    if (!container || !safePaths.length) return;

    const center = container.scrollLeft + container.clientWidth / 2;

    let closest: { id: string; distance: number } | null = null;

    for (const path of safePaths) {
      const card = cardRefs.current[path.id];
      if (!card) continue;

      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(cardCenter - center);

      if (!closest || distance < closest.distance) {
        closest = { id: path.id, distance };
      }
    }

    if (closest && closest.id !== selectedPathId) {
      setSelectedPathId(closest.id);
    }
  }, [safePaths, selectedPathId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: number | undefined;
    const onScroll = () => {
      const half = container.scrollWidth / 2;
      if (container.scrollLeft >= half) {
        container.scrollLeft -= half;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += half;
      }

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(centerPath, 60);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timeoutId);
      container.removeEventListener("scroll", onScroll);
    };
  }, [centerPath]);

  const selectedPath = useMemo(
    () => safePaths.find((path) => path.id === selectedPathId) ?? safePaths[0],
    [safePaths, selectedPathId],
  );

  const activeIndex = useMemo(
    () => safePaths.findIndex((path) => path.id === selectedPathId),
    [safePaths, selectedPathId],
  );

  const handleSelect = useCallback((id: string) => {
    const container = containerRef.current;
    const card = cardRefs.current[id];

    if (!container || !card) {
      setSelectedPathId(id);
      return;
    }

    setSelectedPathId(id);

    container.scrollTo({
      left: card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2,
      behavior: "smooth",
    });
  }, []);

  if (!selectedPath) {
    return null;
  }

  return (
    <section id="roadmaps" className="space-y-6">
      <div>
        <h2 className="font-mono text-2xl font-semibold text-white sm:text-3xl">
          Choose your cybersecurity career path
        </h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          Follow dynamic phases from Sanity and keep your focus on one path at a
          time.
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {loopPaths.map((path, index) => {
          const baseIndex = index % safePaths.length;
          const distance = Math.abs(baseIndex - activeIndex);
          const circularDistance = Math.min(
            distance,
            Math.max(0, safePaths.length - distance),
          );
          const style = distanceBucket(Math.min(circularDistance, 2));

          return (
            <motion.div
              key={`${path.id}-${index}`}
              ref={(node) => {
                if (index < safePaths.length) {
                  cardRefs.current[path.id] = node;
                }
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: (index % safePaths.length) * 0.04,
                duration: 0.3,
              }}
              className="shrink-0"
            >
              <PathCard
                path={path}
                styleState={{ ...style, blur: style.blur * blurMultiplier }}
                isSelected={selectedPath.id === path.id}
                onSelect={handleSelect}
              />
            </motion.div>
          );
        })}
      </div>

      <PathDetails path={selectedPath} />
    </section>
  );
}

export const RoadmapSection = memo(RoadmapSectionComponent);
