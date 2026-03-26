"use client";

import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ChatContainer } from "@/components/ai/chat-container";
import type { ChatMessageModel } from "@/components/ai/chat-message";

type ChatApiPayload = {
  message?: string;
};

function parseAssistantText(responseText: string): string {
  const lines = responseText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data: "));

  let combined = "";

  for (const line of lines) {
    const payload = line.slice(6);

    if (!payload || payload === "[DONE]") {
      continue;
    }

    try {
      const parsed = JSON.parse(payload) as { type?: string; delta?: string };
      if (parsed.type === "text-delta" && typeof parsed.delta === "string") {
        combined += parsed.delta;
      }
    } catch {
      // Ignore malformed SSE chunks.
    }
  }

  return combined.trim();
}

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (messageText?: string) => {
    const content = (messageText ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: ChatMessageModel = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const payload: ChatApiPayload = {
        message: content,
      };

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseText = await response.text();
      const assistantText = parseAssistantText(responseText);

      if (!assistantText) {
        throw new Error("Empty AI response");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantText,
        },
      ]);
    } catch {
      setError("request_failed");
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastMessage = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");
    if (!lastUserMessage || isLoading) return;

    setMessages((current) =>
      current.filter((message) => message.id !== lastUserMessage.id),
    );
    void sendMessage(lastUserMessage.content);
  };

  return (
    <div className="dark flex h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-[700px] items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Shield className="h-4 w-4 text-blue-400" />
            <span>Cyber AI</span>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        </div>
      </header>

      <ChatContainer
        messages={messages}
        input={input}
        isLoading={isLoading}
        error={error}
        onInputChange={setInput}
        onSend={() => void sendMessage()}
        onRetry={retryLastMessage}
      />
    </div>
  );
}
