"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import {
  memo,
  type PointerEvent as ReactPointerEvent,
  type UIEvent as ReactUIEvent,
  useCallback,
  useEffect,
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

function RoadmapSectionComponent({ paths }: RoadmapSectionProps) {
  const safePaths = useMemo(
    () => paths.filter((path) => Boolean(path.id)),
    [paths],
  );
  const loopedPaths = useMemo(
    () =>
      Array.from({ length: 3 }, (_, setIndex) =>
        safePaths.map((path, originalIndex) => ({
          originalId: path.id,
          originalIndex,
          loopSetIndex: setIndex,
          key: `${path.id}-${setIndex}`,
          path,
        })),
      ).flat(),
    [safePaths],
  );
  const [activePathId, setActivePathId] = useState<string>(
    safePaths[0]?.id ?? "",
  );
  const [isMobile, setIsMobile] = useState(false);
  const [parallaxX, setParallaxX] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardStepRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaFrameRef = useRef<number | null>(null);
  const centerSyncFrameRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);
  const isAutoSnappingRef = useRef(false);
  const throttleTimeoutRef = useRef<number | null>(null);

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

  const stopInertia = useCallback(() => {
    if (inertiaFrameRef.current !== null) {
      window.cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
  }, []);

  const enforceLoopBounds = useCallback(() => {
    const container = scrollerRef.current;
    if (!container || !safePaths.length) return;

    const singleSetWidth = singleSetWidthRef.current;
    if (!singleSetWidth) return;

    const left = container.scrollLeft;
    const minLeft = singleSetWidth * 0.5;
    const maxLeft = singleSetWidth * 2.5;

    if (left <= minLeft) {
      container.scrollLeft = left + singleSetWidth;
      return;
    }

    if (left >= maxLeft) {
      container.scrollLeft = left - singleSetWidth;
    }
  }, [safePaths.length]);

  const resolveCenteredCard = useCallback(() => {
    const container = scrollerRef.current;
    if (!container) return null;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-path-id]"),
    );

    if (!cards.length) return null;

    let nearest: HTMLElement | null = cards[0];
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = card;
      }
    }

    return nearest;
  }, []);

  const snapToNearestCard = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const container = scrollerRef.current;
      if (!container) return;

      const nearestCard = resolveCenteredCard();
      if (!nearestCard) return;

      const cardLeft = nearestCard.offsetLeft;
      const cardWidth = nearestCard.offsetWidth;
      const leftTarget = cardLeft - container.clientWidth / 2 + cardWidth / 2;

      isAutoSnappingRef.current = true;
      container.scrollTo({ left: leftTarget, behavior });

      window.setTimeout(
        () => {
          isAutoSnappingRef.current = false;
        },
        behavior === "smooth" ? 260 : 0,
      );
    },
    [resolveCenteredCard],
  );

  const detectActiveCard = useCallback(() => {
    const nearestCard = resolveCenteredCard();
    if (!nearestCard) return;
    const nearestId = nearestCard.dataset.pathId ?? "";
    if (nearestId && nearestId !== activePathId) {
      setActivePathId(nearestId);
    }
  }, [activePathId, resolveCenteredCard]);

  const scheduleCenterSync = useCallback(() => {
    if (centerSyncFrameRef.current !== null) return;

    centerSyncFrameRef.current = window.requestAnimationFrame(() => {
      const container = scrollerRef.current;
      if (container) {
        enforceLoopBounds();
        detectActiveCard();
        setParallaxX(-container.scrollLeft * 0.2);
      }
      centerSyncFrameRef.current = null;
    });
  }, [detectActiveCard, enforceLoopBounds]);

  useEffect(() => {
    const container = scrollerRef.current;
    if (!container || !safePaths.length) return;

    const firstCard = container.querySelector<HTMLElement>("[data-path-id]");
    if (firstCard) {
      const gap = Number.parseFloat(
        window.getComputedStyle(container).columnGap || "0",
      );
      cardStepRef.current = firstCard.offsetWidth + gap;
      singleSetWidthRef.current = cardStepRef.current * safePaths.length;
      container.scrollLeft = singleSetWidthRef.current;
      snapToNearestCard("auto");
    }
    scheduleCenterSync();

    const mq = window.matchMedia("(max-width: 767px)");
    const handleMediaChange = () => setIsMobile(mq.matches);
    handleMediaChange();
    mq.addEventListener("change", handleMediaChange);

    return () => {
      mq.removeEventListener("change", handleMediaChange);
      if (throttleTimeoutRef.current !== null) {
        window.clearTimeout(throttleTimeoutRef.current);
        throttleTimeoutRef.current = null;
      }
      stopInertia();
      if (centerSyncFrameRef.current !== null) {
        window.cancelAnimationFrame(centerSyncFrameRef.current);
      }
    };
  }, [safePaths.length, scheduleCenterSync, snapToNearestCard, stopInertia]);

  const centerCard = useCallback(
    (pathId: string, behavior: ScrollBehavior = "smooth") => {
      const container = scrollerRef.current;
      if (!container || !safePaths.length) return;

      const pathIndex = safePaths.findIndex((path) => path.id === pathId);
      if (pathIndex < 0) return;
      const targetIndex = safePaths.length + pathIndex;
      const leftTarget =
        targetIndex * cardStepRef.current +
        cardStepRef.current / 2 -
        container.clientWidth / 2;

      container.scrollTo({ left: leftTarget, behavior });
      setActivePathId(pathId);
    },
    [safePaths],
  );

  const runInertia = useCallback(() => {
    const container = scrollerRef.current;
    if (!container) return;

    velocityRef.current *= 0.95;

    if (Math.abs(velocityRef.current) < 0.15) {
      stopInertia();
      velocityRef.current = 0;
      snapToNearestCard();
      return;
    }

    container.scrollLeft -= velocityRef.current;
    scheduleCenterSync();
    inertiaFrameRef.current = window.requestAnimationFrame(runInertia);
  }, [scheduleCenterSync, snapToNearestCard, stopInertia]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = scrollerRef.current;
      if (!container) return;

      stopInertia();
      isPointerDownRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = event.clientX;
      lastPointerXRef.current = event.clientX;
      lastPointerTimeRef.current = performance.now();
      velocityRef.current = 0;
      startScrollLeftRef.current = container.scrollLeft;

      container.setPointerCapture(event.pointerId);
    },
    [stopInertia],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = scrollerRef.current;

      if (!container || !isPointerDownRef.current) return;

      const delta = event.clientX - startXRef.current;

      if (Math.abs(delta) > 4) {
        hasDraggedRef.current = true;
      }

      const now = performance.now();
      const frameDelta = event.clientX - lastPointerXRef.current;
      const elapsed = Math.max(1, now - lastPointerTimeRef.current);
      velocityRef.current = (frameDelta / elapsed) * 16;
      lastPointerXRef.current = event.clientX;
      lastPointerTimeRef.current = now;

      container.scrollLeft = startScrollLeftRef.current - delta;
      scheduleCenterSync();
    },
    [scheduleCenterSync],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = scrollerRef.current;

      if (!container) return;

      isPointerDownRef.current = false;
      container.releasePointerCapture(event.pointerId);

      if (Math.abs(velocityRef.current) > 0.2) {
        inertiaFrameRef.current = window.requestAnimationFrame(runInertia);
      } else {
        snapToNearestCard();
      }

      window.setTimeout(() => {
        hasDraggedRef.current = false;
      }, 0);
    },
    [runInertia, snapToNearestCard],
  );

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const container = scrollerRef.current;
      if (!container || !safePaths.length) return;
      stopInertia();

      const directionStep = direction === "left" ? -1 : 1;
      const baseSetOffset = singleSetWidthRef.current;
      const currentRawIndex =
        (container.scrollLeft - baseSetOffset) / cardStepRef.current;
      const targetIndex = Math.round(currentRawIndex) + directionStep;
      const normalizedIndex =
        ((targetIndex % safePaths.length) + safePaths.length) %
        safePaths.length;
      const targetPath = safePaths[normalizedIndex];

      if (targetPath) {
        centerCard(targetPath.id);
      }
    },
    [centerCard, safePaths, stopInertia],
  );

  const onScroll = useCallback(
    (_event: ReactUIEvent<HTMLDivElement>) => {
      if (throttleTimeoutRef.current !== null) return;
      throttleTimeoutRef.current = window.setTimeout(() => {
        throttleTimeoutRef.current = null;
        scheduleCenterSync();
      }, 16);
    },
    [scheduleCenterSync],
  );

  if (!activePath) return null;

  return (
    <section id="roadmaps" className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-mono text-2xl font-semibold text-white sm:text-3xl">
            Choose your cybersecurity career path
          </h2>
          <p className="mt-2 max-w-4xl text-zinc-300">
            Swipe or drag to explore. The centered card becomes active and
            updates the phases below.
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

      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_40%,rgba(14,116,144,0.22),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.2),transparent_42%),linear-gradient(115deg,#09090f_0%,#111827_45%,#060b14_100%)] transition-transform duration-300"
          style={{ transform: `translate3d(${parallaxX}px, 0, 0)` }}
          aria-hidden="true"
        />
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50%-140px)] pb-8 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={onScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {loopedPaths.map((entry) => (
            <div key={entry.key} className="snap-center">
              <PathCard
                path={entry.path}
                isActive={entry.originalId === activePath.id}
                reducedMotionScale={isMobile}
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
