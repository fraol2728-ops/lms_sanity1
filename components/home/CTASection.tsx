import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Start Saving with Solar Today
        </h2>
        <p className="mt-4 text-slate-200">
          Get a personalized consultation and discover the right solar solution
          for your property.
        </p>
        <Link
          href="/get-in-touch"
          className="mt-8 inline-flex rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/30 transition hover:bg-emerald-400"
        >
          Request a Free Quote
        </Link>
      </div>
    </section>
  );
}
