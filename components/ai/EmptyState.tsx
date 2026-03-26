"use client";

import { Sparkles } from "lucide-react";

type EmptyStateProps = {
  onSuggestionClick: (text: string) => void;
};

const SUGGESTIONS = [
  "Explain Linux permissions and chmod",
  "Generate a quiz from a lesson",
  "How to start with ethical hacking",
  "What should I learn next?",
];

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16">
      <div className="text-center max-w-2xl">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-900 p-3">
            <Sparkles className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Cyber AI
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-300 mb-8">
          Ask anything about cybersecurity, Linux, or your courses
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="p-4 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-100 text-sm font-medium transition-colors text-left hover:border-gray-600"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
