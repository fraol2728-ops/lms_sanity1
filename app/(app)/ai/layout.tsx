import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Cybersecurity Lab",
  description:
    "Use the Dev Fraol Academy AI Lab to practice cybersecurity questions, Linux workflows, and ethical hacking concepts with guided support.",
  path: "/ai",
  keywords: [
    "fraol academy ai",
    "ethical hacking Ethiopia",
    "learn Linux Ethiopia",
  ],
});

export default function AILayout({ children }: { children: ReactNode }) {
  return children;
}
