import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const highlights = [
  "Certified Experts",
  "High-Quality Equipment",
  "Sustainable Solutions",
];

export function AboutSection() {
  return (
    <section className="bg-slate-50 py-20 text-slate-900">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative h-80 overflow-hidden rounded-2xl shadow-xl sm:h-96">
          <Image
            src="/homeabout.jfif"
            alt="Solar professionals discussing installation plans"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Who We Are</h2>
          <p className="text-base leading-relaxed text-slate-600">
            We are a mission-driven solar team helping families and businesses
            transition to clean power with confidence. From site assessment to
            ongoing support, we deliver long-term value through dependable
            systems and transparent service.
          </p>
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2
                  className="h-5 w-5 text-emerald-500"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/programs"
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
