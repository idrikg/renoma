"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/container";

const STORY_STEPS = [
  {
    id: "zeigen",
    eyebrow: "01",
    title: "Sie zeigen uns, was Sie verändern möchten.",
    body: null as string | null,
  },
  {
    id: "kuemmern",
    eyebrow: "02",
    title: "Wir kümmern uns. Einfach. Unkompliziert.",
    body: null as string | null,
  },
  {
    id: "ansprechpartner",
    eyebrow: "03",
    title: "Sie haben einen persönlichen Ansprechpartner.",
    body: "Vom ersten Gespräch bis zum fertigen Zuhause.",
  },
] as const;

type StoryVisualImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

/**
 * One scroll-led RENOMA story. Desktop: sticky visual + stepped statements.
 * Mobile: compact vertical stages with calm reveals — no sticky theatre.
 * Fully readable without animation.
 *
 * `visualImage` is resolved on the server (page.tsx) so this client
 * module never imports Node filesystem helpers.
 */
export function StorySection({
  visualImage,
}: {
  visualImage: StoryVisualImage | null;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const desktopStepsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = desktopStepsRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-story-index]")
    );
    if (nodes.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const index = Number((top.target as HTMLElement).dataset.storyIndex);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      {
        rootMargin: reduceMotion ? "-20% 0px -20% 0px" : "-35% 0px -35% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const offsets = ["50% 40%", "50% 46%", "50% 52%"];
    visual.style.setProperty("--story-object-position", offsets[activeIndex] ?? "50% 45%");
    visual.dataset.activeStep = String(activeIndex);
  }, [activeIndex]);

  return (
    <section
      aria-label="So begleitet RENOMA Ihr Vorhaben"
      className="story-section relative border-t border-line bg-paper"
    >
      <div className="lg:hidden">
        <Container className="py-16 sm:py-20">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Mit RENOMA
          </p>
          <ol className="mt-10 space-y-10">
            {STORY_STEPS.map((step, index) => (
              <li key={step.id}>
                <MobileStoryStep step={step} index={index} />
              </li>
            ))}
          </ol>
        </Container>
      </div>

      <div className="relative hidden lg:block">
        <Container className="py-8">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Mit RENOMA
          </p>
        </Container>

        <div className="relative mx-auto grid max-w-[72rem] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-x-16 px-8 pb-8">
          <div className="sticky top-[18vh] h-[64vh] self-start">
            <div
              ref={visualRef}
              className="story-visual relative h-full overflow-hidden rounded-[1.75rem] bg-greige ring-1 ring-inset ring-ink/5"
              data-active-step="0"
            >
              {visualImage ? (
                <Image
                  src={visualImage.src}
                  alt=""
                  fill
                  sizes="48vw"
                  className="story-visual-image object-cover"
                  aria-hidden
                />
              ) : (
                <div aria-hidden className="media-frame-warm absolute inset-0" />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/25 via-ink/5 to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-2" aria-hidden>
                  {STORY_STEPS.map((step, index) => (
                    <span
                      key={step.id}
                      className={`h-0.5 flex-1 rounded-full transition-colors duration-500 motion-reduce:transition-none ${
                        index <= activeIndex ? "bg-paper" : "bg-paper/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium tracking-[0.12em] text-paper/80 tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} / 03
                </p>
              </div>
            </div>
          </div>

          <div ref={desktopStepsRef} className="flex flex-col">
            {STORY_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={step.id}
                  data-story-index={index}
                  className="flex min-h-[68vh] items-center py-14"
                >
                  <div
                    className={`max-w-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:transition-none ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-35"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <p className="text-sm font-medium tracking-[0.14em] text-clay tabular-nums">
                      {step.eyebrow}
                    </p>
                    <h2 className="text-display-3 mt-4 text-balance text-ink">
                      {step.title}
                    </h2>
                    {step.body && (
                      <p className="mt-5 text-base leading-relaxed text-muted">
                        {step.body}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileStoryStep({
  step,
  index,
}: {
  step: (typeof STORY_STEPS)[number];
  index: number;
}) {
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
          if (entry.isIntersecting) {
            node.classList.add("is-revealed");
            observer.unobserve(node);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal reveal-text border-l-2 border-clay/35 pl-5"
      style={{ "--reveal-delay": `${index * 40}ms` } as CSSProperties}
    >
      <p className="text-sm font-medium tracking-[0.14em] text-clay tabular-nums">
        {step.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-medium tracking-tight text-balance text-ink">
        {step.title}
      </h2>
      {step.body && (
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
      )}
    </div>
  );
}
