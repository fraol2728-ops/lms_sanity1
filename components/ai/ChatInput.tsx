"use client";

import { Send } from "lucide-react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const isDisabled = !value.trim() || isLoading;

  return (
    <div className="bg-gray-900 px-4 sm:px-6 py-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything about cybersecurity, Linux, or your courses..."
              className={cn(
                "w-full resize-none rounded-3xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "max-h-[200px] min-h-[48px] transition-all",
                isLoading && "opacity-50 cursor-not-allowed",
              )}
            />
          </div>
          <button
            onClick={onSubmit}
            disabled={isDisabled}
            className={cn(
              "rounded-xl p-3 transition-colors flex-shrink-0",
              isDisabled
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white",
            )}
            title={isDisabled ? "Enter a message to send" : "Send message (Ctrl+Enter)"}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Shift + Enter for new line, Enter to send
        </p>
      </div>
    </div>
  );
}
