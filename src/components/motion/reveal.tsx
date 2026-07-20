"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay once the element enters view (ms). Keep small. */
  delayMs?: number;
};

/**
 * One-shot entrance: opacity + slight translateY. IntersectionObserver only
 * toggles a class — no scroll listeners. Hero must not use this.
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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
      { rootMargin: "0px 0px -6% 0px", threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delayMs
    ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
