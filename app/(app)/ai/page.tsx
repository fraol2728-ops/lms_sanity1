"use client";

import { Bot, Cpu, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "ai";
  content: string;
};

const promptSuggestions = [
  "Explain SQL Injection",
  "What is XSS?",
  "Networking basics",
  "Linux commands",
] as const;

const MOCK_RESPONSE = "AI response coming soon...";

export default function AILabPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Welcome to AI Lab. Ask a cybersecurity question to explore the interface while API integration is being prepared.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageCount = messages.length;

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const scrollHeight = scrollRef.current.scrollHeight;
    const behavior = messageCount > 1 || isTyping ? "smooth" : "auto";

    scrollRef.current.scrollTo({
      top: scrollHeight,
      behavior,
    });
  }, [isTyping, messageCount]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sendMessage = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed || isTyping) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: trimmed,
      },
    ]);
    setInput("");
    setIsTyping(true);

    timeoutRef.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "ai",
          content: MOCK_RESPONSE,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_30%),linear-gradient(180deg,rgba(8,15,30,0.92),rgba(3,7,18,1))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <div className="pointer-events-none absolute -top-16 left-[6%] h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-[8%] bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-cyan-400/15 bg-slate-950/75 shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="border-b border-cyan-400/15 px-6 py-8 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <Badge className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200 hover:bg-cyan-400/10">
                    <Sparkles className="mr-1 size-3.5" />
                    AI-Powered Learning Space
                  </Badge>
                  <div>
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                      AI Lab
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                      Your Cybersecurity AI Assistant
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
                  {[
                    ["Mode", "Mock Chat"],
                    ["Accent", "Neon Blue/Green"],
                    ["Status", "API Ready"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-cyan-400/15 bg-white/5 px-4 py-3"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-cyan-200">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-b border-cyan-400/15 px-6 py-5 sm:px-8 lg:px-10">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                <Sparkles className="size-4 text-emerald-300" />
                Prompt Suggestions
              </div>
              <div className="flex flex-wrap gap-3">
                {promptSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border-cyan-400/20 bg-cyan-400/5 px-4 text-sm text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.08)] transition hover:border-emerald-300/40 hover:bg-emerald-400/10 hover:text-white"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-[calc(100vh-25rem)] min-h-[420px] space-y-5 overflow-y-auto px-6 py-6 sm:px-8 lg:px-10"
            >
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={`${message.role}-${index}-${message.content}`}
                    className={cn(
                      "animate-fade-in flex",
                      isUser ? "justify-end" : "justify-start",
                    )}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div
                      className={cn(
                        "flex max-w-[88%] items-end gap-3 sm:max-w-[75%]",
                        isUser ? "flex-row-reverse" : "flex-row",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-2xl border shadow-[0_0_30px_rgba(34,211,238,0.12)]",
                          isUser
                            ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                            : "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
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
                          "rounded-[24px] px-5 py-4 text-sm leading-7",
                          isUser
                            ? "bg-[linear-gradient(135deg,rgba(14,165,233,0.95),rgba(16,185,129,0.75))] text-white"
                            : "border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(8,47,73,0.78))] text-slate-100",
                        )}
                      >
                        {!isUser && (
                          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                            <Cpu className="size-3.5" />
                            AI Assistant
                          </div>
                        )}
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="animate-fade-in flex justify-start">
                  <div className="flex items-end gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                      <Bot className="size-4" />
                    </div>
                    <div className="rounded-[24px] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(8,47,73,0.78))] px-5 py-4 text-slate-100">
                      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                        <Cpu className="size-3.5" />
                        Typing
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.3s]" />
                        <span className="size-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.15s]" />
                        <span className="size-2 animate-bounce rounded-full bg-cyan-300" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-cyan-400/15 bg-black/20 px-6 py-5 sm:px-8 lg:px-10">
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage(input);
                }}
              >
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about XSS, SQL injection, Linux, networking, or incident response..."
                  className="h-12 rounded-2xl border-cyan-400/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-300 focus-visible:ring-cyan-400/30"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="h-12 rounded-2xl bg-[linear-gradient(135deg,#0891b2,#10b981)] px-5 text-white shadow-[0_0_30px_rgba(16,185,129,0.22)] hover:opacity-95 disabled:bg-slate-700"
                >
                  <Send className="size-4" />
                  Send
                </Button>
              </form>
              <p className="mt-3 text-xs text-slate-500">
                Press Enter to send. This is a polished mock UI and is ready for
                future API integration.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
