import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  containerClassName,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
