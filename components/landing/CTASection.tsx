import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 to-transparent px-6 py-14 text-center md:px-10">
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
          Start Your Cybersecurity Journey Today
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/pricing">
            <Button className="h-11 bg-emerald-500 px-8 text-black hover:bg-emerald-400">
              Create Free Account
            </Button>
          </Link>
          <Link href="/dashboard/courses">
            <Button
              variant="outline"
              className="h-11 border-zinc-600 bg-zinc-900/40 px-8 text-zinc-200 hover:bg-zinc-800"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
