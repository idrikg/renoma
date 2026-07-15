"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectReference } from "@/lib/references-data";

function formatSlideIndex(index: number, total: number): string {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export function ReferencesCarousel({
  references,
}: {
  references: ProjectReference[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const total = references.length;
  const reference = references[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

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

  if (!reference) return null;

  return (
    <div
      ref={regionRef}
      className="mt-16 outline-none focus-within:ring-2 focus-within:ring-sage focus-within:ring-offset-4 focus-within:ring-offset-paper-dim sm:mt-20"
      tabIndex={0}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (startX == null || endX == null) return;

        const delta = endX - startX;
        const threshold = 48;
        if (delta > threshold) goPrev();
        if (delta < -threshold) goNext();
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Vorheriges Projekt"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink outline-none transition-colors hover:border-clay-soft hover:bg-paper focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <p
          aria-live="polite"
          className="text-sm font-medium tracking-[0.12em] text-muted tabular-nums"
        >
          {formatSlideIndex(activeIndex, total)}
        </p>

        <button
          type="button"
          onClick={goNext}
          aria-label="Nächstes Projekt"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink outline-none transition-colors hover:border-clay-soft hover:bg-paper focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div
        key={reference.slug}
        className="motion-safe:animate-reference-slide mt-10"
        aria-roledescription="slide"
        aria-label={`${formatSlideIndex(activeIndex, total)}: ${reference.title}`}
      >
        <article>
          <div className="max-w-2xl">
            <h3 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {reference.title}
            </h3>
            <p className="mt-2 text-sm font-medium tracking-[0.08em] text-clay uppercase">
              {reference.category}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              {reference.description}
            </p>
            {reference.customerStatement && (
              <p className="mt-5 text-lg italic leading-relaxed text-ink">
                „{reference.customerStatement}“
              </p>
            )}
          </div>

          <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-2 lg:gap-8">
            <ReferenceImage
              src={reference.beforeImage}
              alt={reference.beforeAlt}
              label="Vorher"
              objectPosition={reference.beforeObjectPosition}
            />
            <ReferenceImage
              src={reference.afterImage}
              alt={reference.afterAlt}
              label="Nachher"
              objectPosition={reference.afterObjectPosition}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

function ReferenceImage({
  src,
  alt,
  label,
  objectPosition,
}: {
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-greige sm:aspect-[3/4] lg:aspect-auto lg:h-[600px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium tracking-[0.08em] text-paper uppercase backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}
