"use client";

import { Bot, SendHorizonal, User } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Welcome to Cyber Camp AI! I'm here to help you with IT, technology, programming, cybersecurity, web development, cloud computing, and more. Ask me anything!",
  },
  {
    role: "assistant",
    content:
      "Try asking about topics like web development, JavaScript, Python, cybersecurity, cloud platforms (AWS/Azure/GCP), databases, networking, DevOps, or any other IT-related subjects.",
  },
];

function toApiMessages(messages: Message[]): Message[] {
  return messages.map((message) => ({
    role:
      message.role === "assistant" || message.role === "user"
        ? message.role
        : "assistant",
    content: message.content,
  }));
}

export default function AILabPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const appendMessage = (message: Message) => {
    setMessages((currentMessages) => [...currentMessages, message]);

    requestAnimationFrame(() => {
      const container = scrollRef.current;

      if (!container) {
        return;
      }

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const updateLastAssistantMessage = (content: string) => {
    setMessages((currentMessages) => {
      if (currentMessages.length === 0) {
        return [{ role: "assistant", content }];
      }

      const nextMessages = [...currentMessages];
      const lastIndex = nextMessages.length - 1;
      const lastMessage = nextMessages[lastIndex];

      if (lastMessage?.role !== "assistant") {
        nextMessages.push({ role: "assistant", content });
      } else {
        nextMessages[lastIndex] = { ...lastMessage, content };
      }

      return nextMessages;
    });

    requestAnimationFrame(() => {
      const container = scrollRef.current;

      if (!container) {
        return;
      }

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const sendMessage = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isTyping) {
      return;
    }

    const userMessage: Message = { role: "user", content: trimmedInput };
    const nextMessages = [...messages, userMessage];

    appendMessage(userMessage);
    appendMessage({ role: "assistant", content: "" });
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          messages: toApiMessages(nextMessages),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Failed to fetch AI response");
      }

      if (!response.body) {
        throw new Error("Streaming response body is missing.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        
        // Process complete messages (separated by newlines)
        const lines = buffer.split("\n");
        
        // Keep the last incomplete line in the buffer
        buffer = lines[lines.length - 1];
        
        // Process all complete lines
        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          
          if (!line || !line.startsWith("data: ")) {
            continue;
          }
          
          try {
            const data = JSON.parse(line.slice(6)); // Remove "data: " prefix
            
            if (data.type === "text-delta" && data.delta) {
              aiResponse += data.delta;
              updateLastAssistantMessage(aiResponse);
            }
          } catch {
            // Ignore JSON parse errors for non-JSON lines
          }
        }
      }

      const finalChunk = decoder.decode();

      if (finalChunk) {
        aiResponse += finalChunk;
        updateLastAssistantMessage(aiResponse);
      }

      if (!aiResponse.trim()) {
        updateLastAssistantMessage(
          "I couldn't generate a response this time. Please try again.",
        );
      }
    } catch {
      updateLastAssistantMessage(
        "I’m having trouble reaching the AI service right now. Please try again in a moment.",
      );
    } finally {
      setMessages((currentMessages) => {
        if (currentMessages.length === 0) {
          return currentMessages;
        }

        const nextMessages = [...currentMessages];
        const lastIndex = nextMessages.length - 1;
        const lastMessage = nextMessages[lastIndex];

        if (lastMessage?.role === "assistant" && !lastMessage.content.trim()) {
          nextMessages[lastIndex] = {
            role: "assistant",
            content:
              "I couldn't generate a response this time. Please try again.",
          };
        }

        return nextMessages;
      });
      setIsTyping(false);
    }
  };

  const lastMessage = messages[messages.length - 1];
  const isWaitingForFirstChunk =
    isTyping &&
    lastMessage?.role === "assistant" &&
    !lastMessage.content.trim();

  return (
    <main className="h-screen overflow-hidden bg-[#0a0f1f] text-slate-100">
      <div className="flex h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#0b1020_0%,#070b16_100%)]">
        <header className="border-b border-cyan-400/10 bg-slate-950/40 px-6 py-4 backdrop-blur xl:px-8">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
            {/* <div>
               <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Cybersecurity LMS
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white">AI Lab</h1>
            </div>
            <div className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              Mock chat • Dark cyber UI
            </div> */}
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
                      {isWaitingForFirstChunk &&
                      index === messages.length - 1 &&
                      !isUser ? (
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:-0.3s]" />
                            <span className="size-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:-0.15s]" />
                            <span className="size-2 rounded-full bg-cyan-300 animate-bounce" />
                          </div>
                          <p className="mt-2 text-xs text-slate-300">
                            Thinking...
                          </p>
                        </div>
                      ) : (
                        <div className="prose prose-invert max-w-none text-sm">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ node, ...props }) => (
                                <p className="mb-2 leading-7" {...props} />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul
                                  className="mb-2 list-inside list-disc space-y-1"
                                  {...props}
                                />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="leading-7" {...props} />
                              ),
                              ol: ({ node, ...props }) => (
                                <ol
                                  className="mb-2 list-inside list-decimal space-y-1"
                                  {...props}
                                />
                              ),
                              strong: ({ node, ...props }) => (
                                <strong
                                  className="font-semibold text-cyan-300"
                                  {...props}
                                />
                              ),
                              em: ({ node, ...props }) => (
                                <em className="italic text-slate-300" {...props} />
                              ),
                              code: ({ node, inline, ...props }) =>
                                inline ? (
                                  <code
                                    className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-emerald-300"
                                    {...props}
                                  />
                                ) : (
                                  <code
                                    className="block overflow-x-auto rounded bg-slate-800 p-3 font-mono text-xs text-emerald-300"
                                    {...props}
                                  />
                                ),
                              pre: ({ node, ...props }) => (
                                <pre
                                  className="mb-2 overflow-x-auto rounded bg-slate-800 p-3"
                                  {...props}
                                />
                              ),
                              h1: ({ node, ...props }) => (
                                <h1
                                  className="mb-3 text-lg font-bold text-cyan-200"
                                  {...props}
                                />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2
                                  className="mb-2 text-base font-bold text-cyan-200"
                                  {...props}
                                />
                              ),
                              h3: ({ node, ...props }) => (
                                <h3
                                  className="mb-2 font-semibold text-cyan-300"
                                  {...props}
                                />
                              ),
                              blockquote: ({ node, ...props }) => (
                                <blockquote
                                  className="border-l-4 border-cyan-400/30 pl-4 italic text-slate-300"
                                  {...props}
                                />
                              ),
                              a: ({ node, ...props }) => (
                                <a
                                  className="text-cyan-400 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
                  disabled={isTyping}
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
