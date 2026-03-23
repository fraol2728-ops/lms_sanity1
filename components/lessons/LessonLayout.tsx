"use client";

export function LessonLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 lg:flex-row lg:gap-6 xl:gap-8">
      <aside className="min-h-0 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:w-80 lg:shrink-0">
        {sidebar}
      </aside>

      <section className="min-h-0 flex-1 overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0a1220] p-3 sm:p-4 lg:h-[calc(100vh-8rem)] lg:p-6">
        {content}
      </section>
    </div>
  );
}
