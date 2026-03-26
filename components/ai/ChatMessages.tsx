"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { EmptyState } from "@/components/ai/EmptyState";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
};

export function ChatMessages({
  messages,
  isLoading,
  onSuggestionClick,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  });

  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-32">
        {isEmpty ? (
          <EmptyState onSuggestionClick={onSuggestionClick} />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && (
              <div className="py-4 flex justify-start">
                <div className="bg-gray-800 rounded-lg px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:100ms]" />
                      <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:200ms]" />
                    </div>
                    <span className="text-sm text-gray-300 ml-1">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
