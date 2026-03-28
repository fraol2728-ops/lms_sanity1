import type { ReactNode } from "react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Cybersecurity Lab",
  description:
    "Use the Xybersec AI Lab to practice cybersecurity questions, Linux workflows, and ethical hacking concepts with guided support.",
  path: "/ai",
  keywords: [
    "cybersecurity ai lab",
    "ethical hacking lab",
    "linux security practice",
  ],
});

export default function AILayout({ children }: { children: ReactNode }) {
  return children;
}
