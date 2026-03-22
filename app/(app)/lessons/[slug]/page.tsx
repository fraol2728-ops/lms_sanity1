import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { LessonPageContent } from "@/components/lessons";
import { sanityFetch } from "@/sanity/lib/live";
import { LESSON_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const { userId } = await auth();
  const { data: lesson } = await sanityFetch({
    query: LESSON_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <div className="relative h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-[20%] top-[40%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <main className="relative z-10 h-full px-4 pb-4 pt-24 sm:px-6 lg:px-8 lg:pb-8 lg:pt-28">
        <div className="mx-auto h-full max-w-[96rem]">
          <LessonPageContent lesson={lesson} userId={userId} />
        </div>
      </main>
    </div>
  );
}
