import Image from "next/image";
import Link from "next/link";
import type { FEATURED_COURSES_QUERYResult } from "@/sanity.types";

type BlogPreviewProps = {
  posts: FEATURED_COURSES_QUERYResult;
};

export function BlogPreview({ posts }: BlogPreviewProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="bg-slate-50 py-20 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Featured Insights
            </h2>
            <p className="mt-3 text-slate-600">
              Explore practical solar guidance, trends, and expert tips.
            </p>
          </div>
          <Link
            href="/courses"
            className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52">
                <Image
                  src={post.thumbnail?.asset?.url ?? "/og.png"}
                  alt={post.title ?? "Solar article thumbnail"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="line-clamp-2 text-lg font-semibold">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm text-slate-600">
                  {post.description ??
                    "Get actionable insights on adopting clean solar technology for lasting savings."}
                </p>
                <Link
                  href={
                    post.slug?.current
                      ? `/courses/${post.slug.current}`
                      : "/courses"
                  }
                  className="inline-flex text-sm font-semibold text-emerald-600 transition hover:text-emerald-500"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
