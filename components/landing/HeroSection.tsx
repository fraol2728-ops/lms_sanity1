import { Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-500/10">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,156,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.2),transparent_40%)]" />

      <div className="relative w-full px-6 pb-24 pt-20 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">
            <Shield className="h-4 w-4" />
            Next Cyber Camp · Offensive Security Track
          </div>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Master Cybersecurity With Real-World Skills
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
            Learn penetration testing, ethical hacking, and offensive security
            through structured courses and practical lessons.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button className="h-11 w-full bg-emerald-500 px-7 font-semibold text-black hover:bg-emerald-400 sm:w-auto">
                Start Learning
              </Button>
            </Link>
            <Link href="/dashboard/courses">
              <Button
                variant="outline"
                className="h-11 w-full border-emerald-400/40 bg-transparent px-7 text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 sm:w-auto"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
