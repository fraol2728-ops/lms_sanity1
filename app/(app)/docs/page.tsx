import { DocsLayout } from "@/components/docs/DocsLayout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documentation",
  description:
    "Read Dev Fraol Academy documentation for onboarding, course guidance, platform help, and cybersecurity learning resources.",
  path: "/docs",
  keywords: ["devfraol academy", "fraol academy docs"],
});

export default function DocsPage() {
  return <DocsLayout />;
}
