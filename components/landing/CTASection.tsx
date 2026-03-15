import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/15 via-sky-500/10 to-transparent px-6 py-14 text-center md:px-10">
        <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
          Start Your Cybersecurity Journey Today
        </h2>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button className="h-11 bg-cyan-400 px-8 text-[#031018] hover:bg-cyan-300">
              Get Started
            </Button>
          </Link>
          <Link href="/#courses">
            <Button
              variant="outline"
              className="h-11 border-cyan-400/40 bg-[#0b1329]/70 px-8 text-cyan-100 hover:bg-cyan-400/10"
            >
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
