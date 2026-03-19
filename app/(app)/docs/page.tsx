import type { Metadata } from "next";
import { DocsLayout } from "@/components/docs/DocsLayout";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Read Next Cyber Camp documentation for platform guides, onboarding steps, and troubleshooting resources.",
  alternates: {
    canonical: "/docs",
  },
};

export default function DocsPage() {
  return <DocsLayout />;
}
