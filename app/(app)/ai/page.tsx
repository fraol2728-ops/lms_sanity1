"use client";

import { useEffect, useRef, useState } from "react";
import { ChatInput } from "@/components/ai/ChatInput";
import { ChatMessage, type ChatMessageModel } from "@/components/ai/ChatMessage";
import { EmptyState } from "@/components/ai/EmptyState";

type ApiMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

function toApiMessages(messages: ChatMessageModel[]): ApiMessage[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function extractResponseText(payload: unknown): string {
  if (typeof payload === "string") {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return "";
  }

  const candidate = payload as {
    text?: unknown;
    message?: unknown;
    response?: unknown;
  };

  if (typeof candidate.text === "string") {
    return candidate.text;
  }

  if (typeof candidate.message === "string") {
    return candidate.message;
  }

  if (typeof candidate.response === "string") {
    return candidate.response;
  }

  return "";
}

function extractSseText(raw: string): string {
  const lines = raw.split("\n");
  let text = "";

  for (const line of lines) {
    if (!line.startsWith("data: ")) {
      continue;
    }

    const dataLine = line.slice(6).trim();
    if (!dataLine || dataLine === "[DONE]") {
      continue;
    }

    try {
      const parsed = JSON.parse(dataLine) as { type?: string; delta?: string };
      if (parsed.type === "text-delta" && typeof parsed.delta === "string") {
        text += parsed.delta;
      }
    } catch {
      // Ignore malformed SSE payload chunks
    }
  }

  return text.trim();
}

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessageModel[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  const sendMessage = async (messageText?: string) => {
    const content = (messageText ?? input).trim();

    if (!content || isLoading) {
      return;
    }

    const userMessage: ChatMessageModel = {
      role: "user",
      content,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          messages: toApiMessages(nextMessages),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const bodyText = await response.text();
      const parsedText = extractSseText(bodyText);

      const assistantText = parsedText
        ? parsedText
        : extractResponseText((() => {
            try {
              return JSON.parse(bodyText) as unknown;
            } catch {
              return bodyText;
            }
          })());

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: assistantText || "Something went wrong. Please try again.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-3">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm font-medium text-slate-300">Cyber AI</p>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto px-4">
        {messages.length === 0 ? (
          <EmptyState
            onSelectSuggestion={(suggestion) => {
              setInput(suggestion);
              void sendMessage(suggestion);
            }}
          />
        ) : (
          <div className="mx-auto w-full max-w-3xl">
            {messages.map((message, index) => (
              <ChatMessage key={`${index}-${message.role}-${message.content}`} message={message} />
            ))}
            {isLoading ? <ChatMessage message={{ role: "assistant", content: "" }} isLoading /> : null}
            <div ref={endRef} />
          </div>
        )}
      </section>

      <ChatInput value={input} onChange={setInput} onSubmit={() => void sendMessage()} disabled={isLoading} />
    </main>
  );
}
