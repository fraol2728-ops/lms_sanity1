import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import Image from "next/image";
import type React from "react";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-5 text-xl font-semibold text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-lg font-semibold text-white">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-zinc-300">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-cyan-500 pl-4 italic text-zinc-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-2 text-zinc-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-2 text-zinc-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-2">{children}</li>,
    number: ({ children }) => <li className="ml-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md border border-cyan-400/20 bg-black px-1.5 py-0.5 font-mono text-sm text-cyan-300">
        {children}
      </code>
    ),
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline-offset-2 transition-colors hover:text-cyan-200 hover:underline text-cyan-300"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value?: { asset?: unknown; alt?: string; caption?: string };
    }) => {
      if (!value?.asset) {
        return null;
      }

      const imageUrl = urlFor(value).width(1200).auto("format").url();

      return (
        <figure className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-900">
            <Image
              src={imageUrl}
              alt={value.alt || "Lesson image"}
              fill
              className="object-contain"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm italic text-zinc-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({
      value,
    }: {
      value?: { code?: string; language?: string; filename?: string };
    }) => {
      if (!value?.code) {
        return null;
      }

      return (
        <div className="my-5 overflow-hidden rounded-xl border border-cyan-500/25 bg-black shadow-[0_0_24px_rgba(34,211,238,0.08)]">
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/95 px-4 py-2 font-mono text-xs text-zinc-400">
            <span>{value.filename ?? "terminal"}</span>
            <span className="text-cyan-300">{value.language ?? "bash"}</span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-emerald-300">
            <code className="font-mono">{value.code}</code>
          </pre>
        </div>
      );
    },
  },
};

interface LessonContentProps {
  content: TypedObject[] | null | undefined;
}

export function LessonContent({ content }: LessonContentProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
