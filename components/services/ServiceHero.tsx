import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ServiceHeroProps {
  title: string;
  description: string;
}

export function ServiceHero({ title, description }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-[#0f172a] via-[#0b1324] to-[#0a0f1c] p-8 sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_48%)]" />
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
          Service Overview
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="border-cyan-300/40 bg-cyan-300/15 text-cyan-50 hover:bg-cyan-300/25">
            <Link href="/contact">Book a consultation</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
            <Link href="/services">Back to services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
