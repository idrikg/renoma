"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectReference } from "@/lib/references-data";

function formatSlideIndex(index: number, total: number): string {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

/**
 * Horizontal scroll-snap carousel with a controlled next-card peek on
 * mobile/tablet. Native touch scrolling; arrows sync via scrollIntoView.
 * Ends disable (no infinite loop) for predictability.
 */
export function ReferencesCarousel({
  references,
}: {
  references: ProjectReference[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const regionRef = useRef<HTMLDivElement>(null);
  const total = references.length;

  const scrollToIndex = useCallback((index: number) => {
    const root = scrollerRef.current;
    const slide = slideRefs.current[index];
    if (!root || !slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left =
      slide.getBoundingClientRect().left -
      root.getBoundingClientRect().left +
      root.scrollLeft;
    root.scrollTo({
      left,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, []);

  const goPrev = useCallback(() => {
    if (activeIndex <= 0) return;
    const next = activeIndex - 1;
    setActiveIndex(next);
    scrollToIndex(next);
  }, [activeIndex, scrollToIndex]);

  const goNext = useCallback(() => {
    if (activeIndex >= total - 1) return;
    const next = activeIndex + 1;
    setActiveIndex(next);
    scrollToIndex(next);
  }, [activeIndex, scrollToIndex, total]);

  // Sync activeIndex from which slide is most visible in the scroller.
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || total === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const index = Number((top.target as HTMLElement).dataset.slideIndex);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { root, threshold: [0.45, 0.6, 0.75] }
    );

    for (const slide of slideRefs.current) {
      if (slide) observer.observe(slide);
    }
    return () => observer.disconnect();
  }, [total]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!regionRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  if (total === 0) return null;

  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= total - 1;

  return (
    <div
      ref={regionRef}
      className="mt-12 outline-none sm:mt-16"
      tabIndex={0}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Referenzprojekte"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            aria-label="Vorheriges Projekt"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink outline-none transition-colors hover:border-clay-soft hover:bg-paper-dim focus-visible:ring-2 focus-visible:ring-sage disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-paper"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            aria-label="Nächstes Projekt"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink outline-none transition-colors hover:border-clay-soft hover:bg-paper-dim focus-visible:ring-2 focus-visible:ring-sage disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-paper"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-xs tracking-[0.04em] text-muted lg:hidden">
            <span aria-hidden="true">Wischen oder Pfeile verwenden</span>
            <span className="sr-only">
              Mehrere Referenzprojekte. Wischen Sie horizontal oder nutzen Sie
              die Pfeil-Schaltflächen.
            </span>
          </p>
          <p
            aria-live="polite"
            className="text-sm font-medium tracking-[0.12em] text-ink tabular-nums"
          >
            {formatSlideIndex(activeIndex, total)}
          </p>
        </div>
      </div>

      <div
        className="mt-4 flex items-center gap-1.5"
        role="tablist"
        aria-label="Projektauswahl"
      >
        {references.map((reference, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={reference.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Projekt ${index + 1}: ${reference.title}`}
              onClick={() => {
                setActiveIndex(index);
                scrollToIndex(index);
              }}
              className={`h-1.5 rounded-full outline-none transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim ${
                isActive
                  ? "w-7 bg-ink"
                  : "w-1.5 bg-ink/25 hover:bg-ink/45"
              }`}
            />
          );
        })}
      </div>

      <div
        ref={scrollerRef}
        className="references-scroller mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {references.map((reference, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={reference.slug}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              data-slide-index={index}
              aria-roledescription="slide"
              aria-label={`${formatSlideIndex(index, total)}: ${reference.title}`}
              aria-hidden={!isActive}
              className={`references-slide shrink-0 snap-start transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:transition-none ${
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-[0.98] opacity-55"
              }`}
            >
              <div className="max-w-2xl">
                <p className="text-sm font-medium tracking-[0.08em] text-clay uppercase">
                  {reference.category}
                </p>
                <h3 className="mt-2 text-2xl font-medium tracking-tight text-balance text-ink sm:text-3xl">
                  {reference.title}
                </h3>
                <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  {reference.description}
                </p>
                {reference.customerStatement && (
                  <p className="mt-5 text-pretty text-base italic leading-relaxed text-ink sm:text-lg">
                    „{reference.customerStatement}“
                  </p>
                )}
                <div className="mt-6">
                  <Link
                    href={`/referenzen/${reference.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`Projekt ansehen: ${reference.title}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-transparent px-6 py-2.5 text-[15px] font-medium text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Projekt ansehen
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2 lg:gap-6">
                <ReferenceImage
                  src={reference.beforeImage}
                  alt={reference.beforeAlt}
                  label="Vorher"
                  objectPosition={reference.beforeObjectPosition}
                  priority={index === 0}
                />
                <ReferenceImage
                  src={reference.afterImage}
                  alt={reference.afterAlt}
                  label="Nachher"
                  objectPosition={reference.afterObjectPosition}
                  priority={index === 0}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ReferenceImage({
  src,
  alt,
  label,
  objectPosition,
  priority = false,
}: {
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-greige sm:aspect-[3/4] lg:aspect-auto lg:h-[560px]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 38vw, (min-width: 640px) 80vw, 85vw"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium tracking-[0.08em] text-paper uppercase">
        {label}
      </span>
    </div>
  );
}
