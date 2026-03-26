"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex py-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-2xl rounded-lg px-4 py-3",
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-100",
        )}
      >
        {!isUser && (
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="prose prose-invert max-w-none prose-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ ...props }) => (
                      <p className="mb-2 leading-relaxed" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul
                        className="mb-2 list-inside list-disc space-y-1 ml-2"
                        {...props}
                      />
                    ),
                    ol: ({ ...props }) => (
                      <ol
                        className="mb-2 list-inside list-decimal space-y-1 ml-2"
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => (
                      <li className="leading-relaxed" {...props} />
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code
                          className="rounded bg-gray-700 px-1.5 py-0.5 font-mono text-sm text-white"
                          {...props}
                        />
                      ) : (
                        <code
                          className="block overflow-x-auto rounded bg-gray-700 p-3 font-mono text-sm my-2 text-white"
                          {...props}
                        />
                      ),
                    pre: ({ ...props }) => (
                      <pre className="overflow-x-auto rounded bg-gray-700 p-3 my-2" {...props} />
                    ),
                    h1: ({ ...props }) => (
                      <h1 className="mb-2 text-lg font-bold" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2 className="mb-2 text-base font-bold" {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <h3 className="mb-2 font-semibold" {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote
                        className="border-l-4 border-gray-600 pl-4 italic my-2"
                        {...props}
                      />
                    ),
                    a: ({ ...props }) => (
                      <a className="text-blue-400 hover:underline" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="ml-2 mt-1 rounded p-1.5 hover:bg-gray-700 transition-colors flex-shrink-0"
              title="Copy message"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
        {isUser && <p className="whitespace-pre-wrap break-words">{content}</p>}
      </div>
    </div>
  );
}
