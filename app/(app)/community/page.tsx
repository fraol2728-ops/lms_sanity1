import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Community",
  description:
    "Join the Xybersec community to connect with cybersecurity learners in Ethiopia, share progress, and get support.",
  path: "/community",
  keywords: ["xybersec community", "cyber security training Ethiopia"],
});

export default function CommunityPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-20 text-white">
      <h1 className="text-4xl font-bold">Community</h1>
      <p className="mt-4 text-zinc-300">
        Connect with other cybersecurity learners, ask questions, and share your
        progress with the Xybersec community.
      </p>
    </main>
  );
}
