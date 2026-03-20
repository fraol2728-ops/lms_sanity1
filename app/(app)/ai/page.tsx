"use client";

import { Bot, Cpu, Send, Shield, Sparkles, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const promptSuggestions = [
  "Explain SQL Injection",
  "What is XSS?",
  "Networking basics",
  "Linux commands",
] as const;

const mockResponses: Record<string, string> = {
  "Explain SQL Injection":
    "SQL injection is an attack where malicious SQL is inserted into an application's input fields to manipulate the database. Prevent it with parameterized queries, input validation, and least-privilege database accounts.",
  "What is XSS?":
    "Cross-site scripting (XSS) happens when untrusted scripts run in a user's browser. The main defenses are output encoding, sanitization, Content Security Policy, and avoiding unsafe HTML rendering.",
  "Networking basics":
    "Networking basics start with IP addressing, DNS, routing, ports, protocols like TCP/UDP, and how packets move between hosts. In cybersecurity, understanding traffic flow is essential for monitoring and defense.",
  "Linux commands":
    "Start with pwd, ls, cd, cat, grep, find, chmod, ps, top, and ssh. These commands help you inspect systems, navigate files, review logs, and work efficiently in security labs.",
};

const fallbackResponse =
  "I can help break down cybersecurity topics, defensive strategies, networking, Linux, web vulnerabilities, and incident response workflows. API integration can plug into this interface next.";

function buildAssistantResponse(input: string) {
  const normalized = input.trim().toLowerCase();

  const exactMatch = Object.entries(mockResponses).find(
    ([prompt]) => prompt.toLowerCase() === normalized,
  );

  if (exactMatch) {
    return exactMatch[1];
  }

  if (normalized.includes("phishing")) {
    return "Phishing is a social engineering attack that tricks users into revealing credentials, installing malware, or approving fraudulent actions. Train users to verify senders, inspect URLs, and report suspicious messages quickly.";
  }

  if (normalized.includes("firewall")) {
    return "A firewall filters inbound and outbound traffic based on security rules. It helps reduce attack surface by allowing trusted traffic, blocking suspicious activity, and segmenting sensitive systems.";
  }

  return fallbackResponse;
}

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "assistant-welcome",
      role: "assistant",
      content:
        "Welcome to your AI Cyber Assistant. Ask about threats, tooling, networking, Linux, secure coding, or defensive best practices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const shouldScroll = messages.length > 0 || isTyping;

    if (!shouldScroll) {
      return;
    }

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const suggestionChips = useMemo(
    () =>
      promptSuggestions.map((suggestion) => ({
        label: suggestion,
        description: `Prompt about ${suggestion.toLowerCase()}`,
      })),
    [],
  );

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) {
      return;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: buildAssistantResponse(trimmed),
      };

      setMessages((current) => [...current, assistantMessage]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <main className="min-h-screen bg-[#030711] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_30%),linear-gradient(to_bottom,rgba(6,182,212,0.05),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex w-full flex-col overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#06101c]/85 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_20px_80px_rgba(3,7,18,0.65)] backdrop-blur-xl">
          <div className="border-b border-cyan-400/15 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-emerald-300">
                  <Shield className="size-3.5" />
                  Security AI Interface
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  AI Cyber Assistant
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Ask anything about cybersecurity
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-cyan-400/15 bg-white/5 px-4 py-3">
                  <p className="text-slate-400">Mode</p>
                  <p className="mt-1 font-medium text-cyan-300">Mock AI</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/15 bg-white/5 px-4 py-3">
                  <p className="text-slate-400">Theme</p>
                  <p className="mt-1 font-medium text-blue-300">Cyber Dark</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-cyan-400/15 bg-white/5 px-4 py-3 sm:col-span-1">
                  <p className="text-slate-400">Status</p>
                  <p className="mt-1 font-medium text-emerald-300">
                    Ready for API
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-cyan-400/15 px-6 py-5 sm:px-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
              <Sparkles className="size-4 text-cyan-300" />
              Prompt Suggestions
            </div>
            <div className="flex flex-wrap gap-3">
              {suggestionChips.map((chip) => (
                <Button
                  key={chip.label}
                  type="button"
                  variant="outline"
                  onClick={() => sendMessage(chip.label)}
                  className="rounded-full border-cyan-400/20 bg-cyan-400/5 px-4 text-sm text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.08)] hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-cyan-100"
                  aria-label={chip.description}
                >
                  {chip.label}
                </Button>
              ))}
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-5 overflow-y-auto px-6 py-6 sm:px-8"
          >
            {messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`animate-fade-in flex ${isUser ? "justify-end" : "justify-start"}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div
                    className={`flex max-w-[85%] items-end gap-3 sm:max-w-[75%] ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border ${
                        isUser
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                      }`}
                    >
                      {isUser ? (
                        <User className="size-4" />
                      ) : (
                        <Bot className="size-4" />
                      )}
                    </div>

                    <div
                      className={`rounded-[24px] px-5 py-4 text-sm leading-7 shadow-lg ${
                        isUser
                          ? "bg-[linear-gradient(135deg,rgba(16,185,129,0.22),rgba(14,165,233,0.18))] text-slate-50 shadow-emerald-950/30"
                          : "border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(8,47,73,0.82))] text-slate-100 shadow-cyan-950/20"
                      }`}
                    >
                      {!isUser && (
                        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                          <Cpu className="size-3.5" />
                          AI Response
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
                  <div className="flex size-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                    <Bot className="size-4" />
                  </div>
                  <div className="rounded-[24px] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(8,47,73,0.82))] px-5 py-4 shadow-lg shadow-cyan-950/20">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                      <Cpu className="size-3.5" />
                      Thinking
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

          <div className="border-t border-cyan-400/15 bg-black/20 px-6 py-5 sm:px-8">
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
                placeholder="Ask about vulnerabilities, defense, networking, Linux, or secure coding..."
                className="h-12 rounded-2xl border-cyan-400/20 bg-slate-950/70 px-4 text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-300 focus-visible:ring-cyan-400/30"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="h-12 rounded-2xl bg-[linear-gradient(135deg,#06b6d4,#2563eb)] px-5 text-white shadow-[0_0_30px_rgba(14,165,233,0.25)] hover:opacity-95 disabled:bg-slate-700"
              >
                <Send className="size-4" />
                Send
              </Button>
            </form>
            <p className="mt-3 text-xs text-slate-500">
              Local demo state only. This interface is ready for a future AI API
              integration.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
