import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero.webp"
          alt="Solar panels under bright sunlight"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/35" />

      <div className="mx-auto flex min-h-[78vh] max-w-6xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6 animate-in fade-in duration-700">
          <p className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Clean Energy Experts
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Power Your Future with Clean Solar Energy
          </h1>
          <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
            Affordable, reliable, and sustainable solar solutions for homes and
            businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/get-in-touch"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/70 hover:bg-white/20"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
