import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Read Next Cyber Camp documentation for platform guides, onboarding steps, and troubleshooting resources.",
  alternates: {
    canonical: "/docs",
  },
};

export default function DocsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-20 text-white">
      <h1 className="text-4xl font-bold">Documentation</h1>
      <p className="mt-4 text-zinc-300">
        Platform documentation, learner guides, and setup instructions for your
        cybersecurity training workflow.
      </p>
    </main>
  );
}
