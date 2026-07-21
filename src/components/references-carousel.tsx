"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  getReferenceTeaser,
  type ProjectReference,
} from "@/lib/references-data";

const DISCOVERY_DELAY_MS = 5500;
const TRANSITION_MS = 460;
const SWIPE_THRESHOLD_PX = 56;

function formatSlideIndex(index: number, total: number): string {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest("a, button, input, textarea, select, label, [role='tab']"),
  );
}

/**
 * Editorial project stage: exactly one published reference visible at rest.
 * Index-driven transitions (no free scroll / no next-card peek).
 */
export function ReferencesCarousel({
  references,
}: {
  references: ProjectReference[];
}) {
  const total = references.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [discoveryArmed, setDiscoveryArmed] = useState(false);
  const [inView, setInView] = useState(false);

  const regionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const discoveryTimerRef = useRef<number | null>(null);
  const animTimerRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; id: number } | null>(
    null,
  );
  const userInteractedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const goNextRef = useRef<(fromUser?: boolean) => void>(() => {});

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const clearDiscoveryTimer = useCallback(() => {
    if (discoveryTimerRef.current !== null) {
      window.clearTimeout(discoveryTimerRef.current);
      discoveryTimerRef.current = null;
    }
    setDiscoveryArmed(false);
  }, []);

  const markInteracted = useCallback(() => {
    userInteractedRef.current = true;
    setUserInteracted(true);
    setShowSwipeHint(false);
    clearDiscoveryTimer();
  }, [clearDiscoveryTimer]);

  const goTo = useCallback(
    (nextIndex: number, nextDirection: 1 | -1, fromUser: boolean) => {
      if (total === 0) return;
      const normalized = ((nextIndex % total) + total) % total;
      if (normalized === activeIndexRef.current) return;
      if (isAnimating) return;

      if (fromUser) markInteracted();

      setDirection(nextDirection);
      setIsAnimating(true);
      setHasChanged(true);
      setActiveIndex(normalized);

      if (animTimerRef.current !== null) {
        window.clearTimeout(animTimerRef.current);
      }
      const duration = prefersReducedMotion() ? 0 : TRANSITION_MS;
      animTimerRef.current = window.setTimeout(() => {
        setIsAnimating(false);
        animTimerRef.current = null;
      }, duration);
    },
    [isAnimating, markInteracted, total],
  );

  const goPrev = useCallback(() => {
    goTo(activeIndexRef.current - 1, -1, true);
  }, [goTo]);

  const goNext = useCallback(
    (fromUser = true) => {
      goTo(activeIndexRef.current + 1, 1, fromUser);
    },
    [goTo],
  );

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  // Viewport observation for one-shot discovery advance.
  useEffect(() => {
    const node = regionRef.current;
    if (!node || total < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(
          Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45),
        );
      },
      { threshold: [0.35, 0.45, 0.6] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [total]);

  useEffect(() => {
    if (userInteracted || !inView || total < 2 || prefersReducedMotion()) {
      if (discoveryTimerRef.current !== null) {
        window.clearTimeout(discoveryTimerRef.current);
        discoveryTimerRef.current = null;
      }
      return;
    }
    if (discoveryTimerRef.current !== null) return;

    setDiscoveryArmed(true);
    discoveryTimerRef.current = window.setTimeout(() => {
      discoveryTimerRef.current = null;
      setDiscoveryArmed(false);
      if (!userInteractedRef.current) {
        goNextRef.current(false);
        userInteractedRef.current = true;
        setUserInteracted(true);
        setShowSwipeHint(false);
      }
    }, DISCOVERY_DELAY_MS);

    return () => {
      if (discoveryTimerRef.current !== null) {
        window.clearTimeout(discoveryTimerRef.current);
        discoveryTimerRef.current = null;
      }
      setDiscoveryArmed(false);
    };
  }, [inView, total, userInteracted]);

  useEffect(() => {
    return () => {
      if (animTimerRef.current !== null) {
        window.clearTimeout(animTimerRef.current);
      }
      if (discoveryTimerRef.current !== null) {
        window.clearTimeout(discoveryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!regionRef.current?.contains(document.activeElement)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start || start.id !== event.pointerId) return;
    if (isInteractiveTarget(event.target)) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.15) return;

    if (dx < 0) goNext(true);
    else goPrev();
  }

  function handlePointerCancel() {
    pointerStartRef.current = null;
  }

  if (total === 0) return null;

  const active = references[activeIndex];
  const nextIndex = (activeIndex + 1) % total;
  const nextProject = references[nextIndex];
  const teaser = getReferenceTeaser(active);

  return (
    <div
      ref={regionRef}
      className="mt-12 outline-none sm:mt-16"
      tabIndex={0}
      role="region"
      aria-roledescription="Karussell"
      aria-label="Referenzprojekte"
      onPointerEnter={() => {
        // Hover counts as awareness — cancel discovery so reading isn't interrupted.
        if (!userInteractedRef.current) markInteracted();
      }}
      onFocusCapture={() => {
        if (!userInteractedRef.current) markInteracted();
      }}
    >
      <div
        ref={stageRef}
        className="references-stage overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <article
          key={active.slug}
          aria-roledescription="slide"
          aria-label={`${formatSlideIndex(activeIndex, total)}: ${active.title}`}
          className={`references-project grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16 ${
            hasChanged
              ? direction === 1
                ? "references-project-enter-next"
                : "references-project-enter-prev"
              : ""
          }`}
        >
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
            <ReferenceImage
              src={active.beforeImage}
              alt={active.beforeAlt}
              label="Vorher"
              objectPosition={active.beforeObjectPosition}
              priority={activeIndex === 0}
            />
            <ReferenceImage
              src={active.afterImage}
              alt={active.afterAlt}
              label="Nachher"
              objectPosition={active.afterObjectPosition}
              priority={activeIndex === 0}
            />
          </div>

          <div
            className={`references-project-copy flex min-w-0 flex-col lg:pt-2 ${
              hasChanged ? "references-project-copy-enter" : ""
            }`}
          >
            <p className="text-sm font-medium tracking-[0.08em] text-clay uppercase">
              {active.category}
            </p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-balance text-ink sm:text-3xl lg:text-[2.125rem] lg:leading-[1.15]">
              {active.title}
            </h3>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {teaser}
            </p>
            {active.customerStatement && (
              <p className="mt-5 text-pretty text-base italic leading-relaxed text-ink sm:text-lg">
                „{active.customerStatement}“
              </p>
            )}
            <div className="mt-7 sm:mt-8">
              <Link
                href={`/referenzen/${active.slug}`}
                aria-label={`Projekt ansehen: ${active.title}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-transparent px-6 py-2.5 text-[15px] font-medium text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim"
                onClick={markInteracted}
              >
                Projekt ansehen
              </Link>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-10 border-t border-line pt-6 sm:mt-12 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
          <p className="text-sm font-medium tracking-[0.12em] text-ink tabular-nums">
            {formatSlideIndex(activeIndex, total)}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Vorheriges Projekt"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink outline-none transition-colors hover:border-clay-soft hover:bg-paper focus-visible:ring-2 focus-visible:ring-sage"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goNext(true)}
              aria-label="Nächstes Projekt"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink outline-none transition-colors hover:border-clay-soft hover:bg-paper focus-visible:ring-2 focus-visible:ring-sage"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mt-5 flex items-stretch gap-1.5"
          role="tablist"
          aria-label="Projektauswahl"
        >
          {references.map((reference, index) => {
            const isActive = index === activeIndex;
            const isDiscoveryTarget =
              discoveryArmed && !userInteracted && index === 1 && activeIndex === 0;
            return (
              <button
                key={reference.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Projekt ${index + 1}: ${reference.title}`}
                onClick={() => {
                  const dir = index >= activeIndex ? 1 : -1;
                  goTo(index, dir as 1 | -1, true);
                }}
                className="group relative flex min-h-11 flex-1 items-center outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim"
              >
                <span
                  className={`relative block h-0.5 w-full overflow-hidden rounded-full transition-colors ${
                    isActive ? "bg-ink" : "bg-ink/20 group-hover:bg-ink/40"
                  }`}
                >
                  {isDiscoveryTarget && (
                    <span
                      aria-hidden="true"
                      className="references-discovery-fill absolute inset-y-0 left-0 bg-ink/55"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <button
            type="button"
            onClick={() => goNext(true)}
            className="max-w-md text-left outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span className="block text-xs font-medium tracking-[0.12em] text-muted uppercase">
              Nächstes Projekt
            </span>
            <span className="mt-1 block text-[15px] font-medium text-ink transition-colors hover:text-ink-soft">
              {nextProject.title}
            </span>
          </button>

          {showSwipeHint && (
            <p className="text-xs tracking-[0.04em] text-muted lg:hidden">
              <span aria-hidden="true">Wischen oder Pfeile verwenden</span>
              <span className="sr-only">
                Mehrere Referenzprojekte. Wischen Sie horizontal oder nutzen Sie
                die Pfeil-Schaltflächen.
              </span>
            </p>
          )}
        </div>
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
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-greige sm:aspect-[3/4] lg:aspect-[4/5]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 32vw, (min-width: 640px) 45vw, 92vw"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium tracking-[0.08em] text-paper uppercase">
        {label}
      </span>
    </div>
  );
}
