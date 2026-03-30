"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const CARD_STEP = 274;

function RoadmapSectionComponent({ paths }: RoadmapSectionProps) {
  const safePaths = useMemo(() => paths.filter((path) => Boolean(path.id)), [paths]);
  const [activePathId, setActivePathId] = useState<string>(safePaths[0]?.id ?? "");
  const [isHovering, setIsHovering] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (!safePaths.length) return;

    setActivePathId((current) =>
      safePaths.some((path) => path.id === current) ? current : safePaths[0].id,
    );
  }, [safePaths]);

  const activePath = useMemo(
    () => safePaths.find((path) => path.id === activePathId) ?? safePaths[0],
    [activePathId, safePaths],
  );

  const detectActiveCard = useCallback(() => {
    const container = scrollerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-path-id]"),
    );

    if (!cards.length) return;

    let nearestId = cards[0].dataset.pathId ?? "";
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestId = card.dataset.pathId ?? "";
      }
    }

    if (nearestId && nearestId !== activePathId) {
      setActivePathId(nearestId);
    }
  }, [activePathId]);

  const scheduleActiveDetection = useCallback(() => {
    if (tickingRef.current) return;

    tickingRef.current = true;
    window.requestAnimationFrame(() => {
      detectActiveCard();
      tickingRef.current = false;
    });
  }, [detectActiveCard]);

  useEffect(() => {
    scheduleActiveDetection();
  }, [scheduleActiveDetection, safePaths]);

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    const onScroll = () => scheduleActiveDetection();

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => container.removeEventListener("scroll", onScroll);
  }, [scheduleActiveDetection]);

  useEffect(() => {
    const container = scrollerRef.current;

    if (!container) return;
    const isSmallViewport = window.matchMedia("(max-width: 767px)").matches;

    if (isSmallViewport) return;

    const id = window.setInterval(() => {
      if (isHovering || isPointerDownRef.current) return;

      const maxLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxLeft - 2) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      container.scrollLeft += 0.35;
    }, 22);

    return () => window.clearInterval(id);
  }, [isHovering]);

  const centerCard = useCallback((pathId: string) => {
    const container = scrollerRef.current;
    const card = container?.querySelector<HTMLElement>(`[data-path-id="${pathId}"]`);

    if (!container || !card) return;

    const leftTarget =
      card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2;

    container.scrollTo({ left: Math.max(0, leftTarget), behavior: "smooth" });
    setActivePathId(pathId);
  }, []);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const container = scrollerRef.current;
    if (!container) return;

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = container.scrollLeft;

    container.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const container = scrollerRef.current;

    if (!container || !isPointerDownRef.current) return;

    const delta = event.clientX - startXRef.current;

    if (Math.abs(delta) > 4) {
      hasDraggedRef.current = true;
    }

    container.scrollLeft = startScrollLeftRef.current - delta;
  }, []);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const container = scrollerRef.current;

    if (!container) return;

    isPointerDownRef.current = false;
    container.releasePointerCapture(event.pointerId);

    window.setTimeout(() => {
      hasDraggedRef.current = false;
    }, 0);
  }, []);

  const scrollByStep = useCallback((direction: "left" | "right") => {
    const container = scrollerRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -CARD_STEP : CARD_STEP,
      behavior: "smooth",
    });
  }, []);

  if (!activePath) return null;

  return (
    <section id="roadmaps" className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-mono text-2xl font-semibold text-white sm:text-3xl">
            Choose your cybersecurity career path
          </h2>
          <p className="mt-2 max-w-4xl text-zinc-300">
            Swipe or drag to explore. The centered card becomes active and updates
            the phases below.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByStep("left")}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
            aria-label="Scroll paths left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep("right")}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
            aria-label="Scroll paths right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50%-125px)] pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {safePaths.map((path) => (
            <div key={path.id} className="snap-center">
              <PathCard
                path={path}
                isActive={path.id === activePath.id}
                reducedMotionScale={false}
                onSelect={(id) => {
                  if (hasDraggedRef.current) return;
                  centerCard(id);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <PathDetails path={activePath} />
    </section>
  );
}

export const RoadmapSection = memo(RoadmapSectionComponent);
