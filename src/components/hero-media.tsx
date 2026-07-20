"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type HeroImageConfig = {
  src: string;
  alt: string;
  objectPosition?: string;
  objectPositionMobile?: string;
};

function HeroMediaGradient() {
  return (
    <>
      <div aria-hidden className="media-frame-warm absolute inset-0" />
      <div aria-hidden className="media-frame-grain absolute inset-0" />
    </>
  );
}

function HeroMediaImage({
  src,
  alt,
  objectPosition,
  objectPositionMobile,
}: HeroImageConfig) {
  const [loadFailed, setLoadFailed] = useState(false);

  if (loadFailed) {
    return <HeroMediaGradient />;
  }

  const style = {
    "--hero-object-position-mobile": objectPositionMobile ?? objectPosition ?? "50% 50%",
    "--hero-object-position-desktop": objectPosition ?? "50% 42%",
  } as CSSProperties;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(min-width: 1024px) 42vw, 100vw"
      className="hero-media-image object-cover"
      style={style}
      onError={() => setLoadFailed(true)}
    />
  );
}

export function HeroMediaFrame({
  image,
}: {
  image: HeroImageConfig | null;
}) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(20,17,15,0.25)] ring-1 ring-inset ring-ink/5 lg:aspect-[4/5] lg:max-h-[560px]">
      {image ? <HeroMediaImage {...image} /> : <HeroMediaGradient />}
    </div>
  );
}
