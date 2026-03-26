"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

export type ChatMessageModel = {
  role: ChatRole;
  content: string;
};

type ChatMessageProps = {
  message: ChatMessageModel;
  isLoading?: boolean;
};

function ThinkingDots() {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="size-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.2s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.1s]" />
      <span className="size-1.5 animate-bounce rounded-full bg-slate-300" />
    </div>
  );
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!message.content.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1200);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className={cn("flex py-4", isUser ? "justify-end" : "justify-start")}>
      <div className="max-w-3xl">
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm leading-7",
            isUser
              ? "bg-slate-700/80 text-slate-100"
              : "bg-slate-900 text-slate-100 ring-1 ring-slate-800",
          )}
        >
          {isLoading ? (
            <p className="inline-flex items-center gap-2 text-slate-300">
              <span>AI is thinking</span>
              <ThinkingDots />
            </p>
          ) : (
            <div className="prose prose-invert max-w-none text-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="mb-3 whitespace-pre-wrap last:mb-0" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3" {...props} />
                  ),
                  code: ({ node, className, children, ...props }) => {
                    const isInline = !className;

                    return isInline ? (
                      <code
                        className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-cyan-200"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <code className="font-mono text-xs text-cyan-200" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && !isLoading ? (
          <div className="mt-2 flex justify-start">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 gap-1.5 rounded-lg px-2 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200"
            >
              {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
