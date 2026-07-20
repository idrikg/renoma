"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroImageConfig = {
  src: string;
  alt: string;
  objectPosition?: string;
};

function HeroMediaGradient() {
  return (
    <>
      <div aria-hidden className="media-frame-warm absolute inset-0" />
      <div aria-hidden className="media-frame-grain absolute inset-0" />
    </>
  );
}

function HeroMediaImage({ src, alt, objectPosition }: HeroImageConfig) {
  const [loadFailed, setLoadFailed] = useState(false);

  if (loadFailed) {
    return <HeroMediaGradient />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(min-width: 1024px) 42vw, 100vw"
      className="object-cover will-change-transform"
      style={objectPosition ? { objectPosition } : undefined}
      onError={() => setLoadFailed(true)}
    />
  );
}

/**
 * Hero media with a very light desktop-only scroll response (scale + shift).
 * Mobile and prefers-reduced-motion stay static — no parallax work at all.
 *
 * To swap the photograph later: change `mediaConfig.heroImage` in
 * `src/lib/media-config.ts` (src / alt / objectPosition). File path today:
 * `public/images/hero/renoma-hero.jpg`.
 */
export function HeroMediaFrame({
  image,
}: {
  image: HeroImageConfig | null;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduceMotion || !isDesktop) return;

    let frameId = 0;
    let active = true;

    function update() {
      if (!active || !frame || !media) return;
      const rect = frame.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      // 0 at top of viewport, ~1 when the frame has mostly scrolled away.
      const progress = Math.min(1, Math.max(0, -rect.top / (viewH * 0.85)));
      const scale = 1 + progress * 0.035;
      const shift = progress * 12;
      media.style.transform = `translate3d(0, ${shift}px, 0) scale(${scale})`;
    }

    function onScroll() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      active = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      className="hero-media-frame relative aspect-[16/11] w-full overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(20,17,15,0.25)] ring-1 ring-inset ring-ink/5 lg:aspect-[4/5] lg:max-h-[560px]"
    >
      <div ref={mediaRef} className="absolute inset-0 origin-center">
        {image ? <HeroMediaImage {...image} /> : <HeroMediaGradient />}
      </div>
      {/* Soft warm veil — deepens slightly via CSS as the hero scrolls. */}
      <div
        aria-hidden
        className="hero-media-veil pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/[0.12] via-transparent to-warm-white/[0.08]"
      />
    </div>
  );
}
