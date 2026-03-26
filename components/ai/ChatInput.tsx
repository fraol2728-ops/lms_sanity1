"use client";

import { SendHorizonal } from "lucide-react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatInput({ value, disabled = false, onChange, onSubmit }: ChatInputProps) {
  const canSend = Boolean(value.trim()) && !disabled;

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) {
        onSubmit();
      }
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950/95 p-4">
      <div className="mx-auto flex w-full max-w-3xl items-end gap-3">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Ask anything about cybersecurity, Linux, or your courses..."
          rows={1}
          className="max-h-40 min-h-12 resize-y rounded-xl border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-slate-600"
        />

        <Button
          type="button"
          onClick={onSubmit}
          disabled={!canSend}
          className="h-12 rounded-xl bg-cyan-400 px-4 text-slate-950 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-500"
        >
          <SendHorizonal className="size-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
