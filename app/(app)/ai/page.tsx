"use client";

import { useRef, useState, useEffect } from "react";
import { ChatMessage } from "@/components/ai/ChatMessage";
import { ChatInput } from "@/components/ai/ChatInput";
import { EmptyState } from "@/components/ai/EmptyState";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
  }, [messages, isLoading]);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const handleSubmit = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const userMessage: Message = { role: "user", content: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error("Failed to get AI response");
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete Server-Sent Event messages
        const lines = buffer.split("\n");
        buffer = lines[lines.length - 1];

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          if (!line || !line.startsWith("data: ")) continue;

          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "text-delta" && data.delta) {
              fullText += data.delta;
            }
          } catch {
            // Ignore parse errors
          }
        }
      }

      // Handle final chunk
      const finalChunk = decoder.decode();
      if (finalChunk) {
        const lines = finalChunk.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && trimmed.startsWith("data: ")) {
            try {
              const data = JSON.parse(trimmed.slice(6));
              if (data.type === "text-delta" && data.delta) {
                fullText += data.delta;
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: fullText.trim() || "I couldn't generate a response. Please try again.",
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="dark flex flex-col h-screen bg-gray-900 text-white">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {isEmpty ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="py-6">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
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
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-900 pt-4">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
