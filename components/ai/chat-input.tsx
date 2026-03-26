"use client";

import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) {
  const canSubmit = value.trim().length > 0 && !disabled;

  return (
    <div className="w-full rounded-full border border-border bg-background/95 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (canSubmit) onSend();
            }
          }}
          disabled={disabled}
          placeholder="Ask Cyber AI anything..."
          className="h-11 w-full bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!canSubmit}
          aria-label="Send message"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
            canSubmit
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-muted text-muted-foreground",
          )}
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
