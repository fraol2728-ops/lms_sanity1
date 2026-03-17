import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the Next Cyber Camp community to collaborate with learners, share write-ups, and get support from mentors.",
  alternates: {
    canonical: "/community",
  },
};

export default function CommunityPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-20 text-white">
      <h1 className="text-4xl font-bold">Community</h1>
      <p className="mt-4 text-zinc-300">
        Connect with other cybersecurity learners, ask questions, and share your
        progress with the Next Cyber Camp community.
      </p>
    </main>
  );
}
