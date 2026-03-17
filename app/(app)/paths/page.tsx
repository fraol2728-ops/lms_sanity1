import type { Metadata } from "next";
import { PathsPageClient } from "./PathsPageClient";

export const metadata: Metadata = {
  title: "Learning Paths",
  description:
    "Follow step-by-step cybersecurity learning paths to build practical pentesting and defensive security skills.",
  alternates: {
    canonical: "/paths",
  },
};

export default function PathsPage() {
  return <PathsPageClient />;
}
