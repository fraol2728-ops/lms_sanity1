"use client";

import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  "Explain Linux permissions",
  "Generate a quiz from a lesson",
  "How to start ethical hacking",
  "What should I learn next?",
] as const;

type EmptyStateProps = {
  onSelectSuggestion: (suggestion: string) => void;
};

export function EmptyState({ onSelectSuggestion }: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="mx-auto w-full max-w-3xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100">Cyber AI</h1>
        <p className="mt-3 text-sm text-slate-400">
          Ask anything about cybersecurity, Linux, or your courses
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion}
              type="button"
              variant="outline"
              onClick={() => onSelectSuggestion(suggestion)}
              className="h-auto justify-start whitespace-normal rounded-xl border-slate-700 bg-slate-900 p-4 text-left text-sm text-slate-200 hover:bg-slate-800"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
