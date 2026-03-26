"use client";

export function EmptyState() {
  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Cyber AI
      </h1>
      <p className="mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
        Ask anything about cybersecurity, Linux, or your courses
      </p>
    </div>
  );
}
