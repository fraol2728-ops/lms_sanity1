"use client";

import { useState } from "react";
import { ChatInput } from "@/components/ai/ChatInput";
import { ChatMessages } from "@/components/ai/ChatMessages";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const handleSubmit = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };
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

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

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

      const finalChunk = decoder.decode();
      if (finalChunk) {
        const lines = finalChunk.split("\n");
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed?.startsWith("data: ")) {
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

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          fullText.trim() ||
          "I couldn't generate a response. Please try again.",
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark fixed inset-0 h-screen flex flex-col overflow-hidden bg-gray-900 text-white">
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        onSuggestionClick={handleSuggestionClick}
      />
      <div className="border-t border-gray-700 p-4 bg-background shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
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
