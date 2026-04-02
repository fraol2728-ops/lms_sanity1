"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  memo,
  type UIEvent as ReactUIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PathCard } from "./PathCard";
import type { CareerPath } from "./types";

const CARD_WIDTH = 360;

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

function RoadmapSectionComponent({ paths }: RoadmapSectionProps) {
  const safePaths = useMemo(
    () => paths.filter((path) => Boolean(path.id)),
    [paths],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const snapTimeoutRef = useRef<number | null>(null);

  const activePath = safePaths[activeIndex];

  const scrollCardIntoView = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollerRef.current;
      const card = cardRefs.current[index];
      if (!container || !card) return;

      container.scrollTo({ left: card.offsetLeft, behavior });
      setActiveIndex(index);
    },
    [],
  );

  const findClosestIndexToStart = useCallback(() => {
    const container = scrollerRef.current;
    if (!container || !safePaths.length) return -1;

    const containerStart = container.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < safePaths.length; index += 1) {
      const card = cardRefs.current[index];
      if (!card) continue;

      const distance = Math.abs(card.offsetLeft - containerStart);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    }

    return closestIndex;
  }, [safePaths.length]);

  const syncActiveIndexFromScroll = useCallback(() => {
    const closestIndex = findClosestIndexToStart();
    if (closestIndex < 0) return;

    setActiveIndex((current) =>
      current === closestIndex ? current : closestIndex,
    );
  }, [findClosestIndexToStart]);

  const onScroll = useCallback(
    (_event: ReactUIEvent<HTMLDivElement>) => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        syncActiveIndexFromScroll();
        rafRef.current = null;
      });

      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }
      snapTimeoutRef.current = window.setTimeout(() => {
        const closestIndex = findClosestIndexToStart();
        if (closestIndex >= 0) {
          scrollCardIntoView(closestIndex);
        }
      }, 140);
    },
    [findClosestIndexToStart, scrollCardIntoView, syncActiveIndexFromScroll],
  );

  const goToRelativeCard = useCallback(
    (step: number) => {
      if (!safePaths.length) return;
      const nextIndex =
        (activeIndex + step + safePaths.length) % safePaths.length;
      scrollCardIntoView(nextIndex);
    },
    [activeIndex, safePaths.length, scrollCardIntoView],
  );

  const onCardClick = useCallback(
    (index: number) => {
      scrollCardIntoView(index);
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [scrollCardIntoView],
  );

  useEffect(() => {
    if (!safePaths.length) return;
    scrollCardIntoView(Math.min(activeIndex, safePaths.length - 1), "auto");
  }, [activeIndex, safePaths.length, scrollCardIntoView]);

  useEffect(() => {
    const onResize = () => {
      if (!safePaths.length) return;
      scrollCardIntoView(activeIndex, "auto");
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [activeIndex, safePaths.length, scrollCardIntoView]);

  if (!activePath) return null;

  return (
    <section id="roadmaps" className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-mono text-2xl font-semibold text-white sm:text-3xl">
            Choose your cybersecurity career path
          </h2>
          <p className="mt-2 max-w-4xl text-zinc-300">
            Swipe or drag to explore. The left-most card in view becomes active
            and updates the phases below.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => goToRelativeCard(-1)}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
            aria-label="Scroll paths left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => goToRelativeCard(1)}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
            aria-label="Scroll paths right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_40%,rgba(14,116,144,0.22),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_42%),linear-gradient(115deg,#09090f_0%,#111827_45%,#060b14_100%)]" />
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={onScroll}
        >
          {safePaths.map((path, index) => (
            <div
              key={path.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="snap-start"
              style={{ width: `${CARD_WIDTH}px` }}
            >
              <PathCard
                path={path}
                isActive={index === activeIndex}
                onSelect={() => onCardClick(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div id="active-phase" ref={detailsRef}>
        <PathDetails path={activePath} />
      </div>
      <div>
        <Link
          href={`/programs/${activePath.slug}`}
          className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2.5 font-mono text-sm font-medium text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-400/20"
        >
          Start Path →
        </Link>
      </div>
    </section>
  );
}

export const RoadmapSection = memo(RoadmapSectionComponent);
