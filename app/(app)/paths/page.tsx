import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PathsPageClient } from "./PathsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Roadmaps",
    description:
      "Follow Xybersec cybersecurity roadmaps for red team, blue team, reverse engineering, and practical penetration testing progression.",
    path: "/paths",
    keywords: ["cybersecurity roadmap", "red team learning path", "blue team learning path"],
  });
}

export default function PathsPage() {
  return <PathsPageClient />;
}
