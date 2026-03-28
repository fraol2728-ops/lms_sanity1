"use client";

export function LessonLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,340px)_1fr] lg:gap-6">
      <aside className="min-h-0 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
        {sidebar}
      </aside>

      <section className="min-h-0 overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#070d18] p-3 sm:p-4 lg:h-[calc(100vh-8rem)] lg:p-6">
        {content}
      </section>
    </div>
  );
}
