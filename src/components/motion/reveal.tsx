"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in ms once the element enters view. */
  delayMs?: number;
  /** Slightly larger travel for image-led blocks. */
  variant?: "text" | "media" | "soft";
  as?: ElementType;
};

/**
 * Calm one-shot entrance for homepage blocks. CSS-driven; IntersectionObserver
 * only toggles a class. No scroll listeners, no layout thrashing. Respects
 * prefers-reduced-motion via the global CSS rule (and by marking visible
 * immediately when reduced motion is requested).
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  variant = "text",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      node.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          node.classList.add("is-revealed");
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delayMs
    ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
    : undefined;

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
