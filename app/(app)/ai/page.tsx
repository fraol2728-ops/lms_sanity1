"use client";

import { Bot, SendHorizonal, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "ai";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "ai",
    content:
      "Welcome to AI Lab. Ask anything about cybersecurity and I’ll simulate a helpful response while the live model is still offline.",
  },
  {
    role: "ai",
    content:
      "Try topics like phishing detection, SIEM workflows, Linux hardening, incident response, or threat modeling.",
  },
];

const buildMockResponse = (prompt: string) =>
  `Here is a mock AI response for: “${prompt}”. In the production version, this panel can explain concepts, break down attack paths, and help learners reason through cybersecurity scenarios step by step.`;

export default function AILabPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sendMessage = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isTyping) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", content: trimmedInput },
    ]);
    setInput("");
    setIsTyping(true);

    timeoutRef.current = setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "ai",
          content: buildMockResponse(trimmedInput),
        },
      ]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <main className="h-screen overflow-hidden bg-[#0a0f1f] text-slate-100">
      <div className="flex h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#0b1020_0%,#070b16_100%)]">
        <header className="border-b border-cyan-400/10 bg-slate-950/40 px-6 py-4 backdrop-blur xl:px-8">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Cybersecurity LMS
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white">AI Lab</h1>
            </div>
            <div className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              Mock chat • Dark cyber UI
            </div>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col space-y-6 pb-6">
            {messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={`${message.role}-${index}-${message.content}`}
                  className={cn(
                    "flex",
                    isUser ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "flex max-w-3xl items-end gap-3",
                      isUser ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full border",
                        isUser
                          ? "border-cyan-300/30 bg-cyan-400/20 text-cyan-100"
                          : "border-slate-700 bg-slate-900 text-emerald-300",
                      )}
                    >
                      {isUser ? (
                        <User className="size-4" />
                      ) : (
                        <Bot className="size-4" />
                      )}
                    </div>

                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-7 shadow-lg",
                        isUser
                          ? "rounded-br-md bg-cyan-500 text-slate-950"
                          : "rounded-bl-md border border-slate-800 bg-slate-900/95 text-slate-100",
                      )}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-emerald-300">
                    <Bot className="size-4" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-slate-800 bg-slate-900/95 px-4 py-4 shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:-0.3s]" />
                      <span className="size-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:-0.15s]" />
                      <span className="size-2 rounded-full bg-cyan-300 animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3">
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask anything about cybersecurity..."
                  className="h-14 border-0 bg-transparent px-4 text-base text-slate-100 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="button"
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="size-12 rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:bg-slate-800 disabled:text-slate-500"
                >
                  <SendHorizonal className="size-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
