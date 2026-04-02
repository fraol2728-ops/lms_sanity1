import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ServiceCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-fuchsia-300/25 bg-gradient-to-r from-[#24103a] via-[#1b1432] to-[#101426] p-8 text-center sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.22),_transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Ready to secure your next digital product?
        </h2>
        <p className="mt-3 text-slate-200/90">
          Let&apos;s map your requirements, surface risk early, and ship with confidence.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild className="border-fuchsia-300/50 bg-fuchsia-300/20 text-white hover:bg-fuchsia-300/30">
            <Link href="/contact">Start your project</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
