"use client";

import dynamic from "next/dynamic";

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



  const selectedPath = useMemo(
    () => safePaths.find((path) => path.id === selectedPathId) ?? safePaths[0],
    [safePaths, selectedPathId],
  );

  const activeIndex = useMemo(
    () => safePaths.findIndex((path) => path.id === selectedPathId),
    [safePaths, selectedPathId],
  );



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


      </div>

      <PathDetails path={selectedPath} />
    </section>
  );
}

export const RoadmapSection = memo(RoadmapSectionComponent);
