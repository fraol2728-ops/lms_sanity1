import { DocsLayout } from "@/components/docs/DocsLayout";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Documentation",
    description:
      "Read Xybersec documentation for onboarding, learning workflows, platform guides, and cybersecurity study resources.",
    path: "/docs",
    keywords: ["cybersecurity docs", "xybersec documentation", "security learning resources"],
  });
}

export default function DocsPage() {
  return <DocsLayout />;
}
