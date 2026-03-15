import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-cyan-400/10"
      id="hero"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.35),transparent_35%),radial-gradient(circle_at_82%_20%,rgba(14,165,233,0.25),transparent_40%),linear-gradient(180deg,rgba(4,8,20,0.65),#050816)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 text-center lg:px-12 lg:pb-32 lg:pt-28">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-cyan-200">
          <ShieldCheck className="h-4 w-4" />
          Cybersecurity Academy Platform
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
          Master Cybersecurity Through Real-World Training
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
          Learn ethical hacking, penetration testing, and cyber defense through
          structured courses.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/dashboard">
            <Button className="h-11 w-full bg-cyan-400 px-8 font-semibold text-[#031018] hover:bg-cyan-300 sm:w-auto">
              Start Learning
            </Button>
          </Link>
          <Link href="/#courses">
            <Button
              variant="outline"
              className="h-11 w-full border-cyan-400/40 bg-[#081127]/70 px-8 text-cyan-200 hover:bg-cyan-400/10 sm:w-auto"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
