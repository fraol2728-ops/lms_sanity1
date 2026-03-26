"use client";

import { useEffect, useRef } from "react";
import { ChatInput } from "@/components/ai/chat-input";
import {
  ChatMessage,
  type ChatMessageModel,
} from "@/components/ai/chat-message";
import { EmptyState } from "@/components/ai/empty-state";

type ChatContainerProps = {
  messages: ChatMessageModel[];
  input: string;
  isLoading: boolean;
  error: string | null;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onRetry: () => void;
};

export function ChatContainer({
  messages,
  input,
  isLoading,
  error,
  onInputChange,
  onSend,
  onRetry,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  const hasMessages = messages.length > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="mx-auto flex w-full max-w-[700px] min-h-0 flex-1 flex-col px-4">
        <div className="flex-1 overflow-y-auto py-6 pb-36">
          {hasMessages ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-3 text-sm text-zinc-300">
                    AI is thinking...
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="flex justify-start">
                  <div className="flex items-center gap-3 rounded-2xl rounded-bl-md border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                    <span>⚠️ Something went wrong</span>
                    <button
                      type="button"
                      onClick={onRetry}
                      className="rounded-md border border-amber-300/30 px-2 py-1 text-xs font-medium text-amber-100 transition hover:bg-amber-500/20"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border/60 bg-background/90 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto w-full max-w-[700px]">
          <ChatInput
            value={input}
            onChange={onInputChange}
            onSend={onSend}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
