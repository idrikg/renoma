"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProjectLightboxImage } from "@/lib/project-lightbox";
import {
  ProjectGalleryTrigger,
  ProjectImageLightbox,
} from "@/components/project-image-lightbox";

type GalleryContextValue = {
  images: ProjectLightboxImage[];
  openAt: (index: number) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function ProjectGalleryProvider({
  images,
  children,
}: {
  images: ProjectLightboxImage[];
  children: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openAt = useCallback((index: number) => {
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const value = useMemo(
    () => ({ images, openAt }),
    [images, openAt],
  );

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <ProjectImageLightbox
        images={images}
        open={openIndex !== null}
        index={openIndex ?? 0}
        onClose={close}
        onIndexChange={setOpenIndex}
      />
    </GalleryContext.Provider>
  );
}

function useProjectGallery(): GalleryContextValue {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error("useProjectGallery must be used within ProjectGalleryProvider");
  }
  return ctx;
}

type OpenableImageProps = {
  galleryIndex: number;
  src: string;
  alt: string;
  sizes: string;
  quality?: number;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
  imageClassName?: string;
  badge?: string;
  hint?: string;
  label?: string;
};

/** Clickable project photo that opens the shared lightbox at `galleryIndex`. */
export function OpenableProjectImage({
  galleryIndex,
  src,
  alt,
  sizes,
  quality = 85,
  priority = false,
  objectPosition,
  className = "relative overflow-hidden rounded-2xl bg-greige",
  imageClassName = "object-cover",
  badge,
  hint = "Vergrößern",
  label,
}: OpenableImageProps) {
  const { images, openAt } = useProjectGallery();

  return (
    <div className={className}>
      <ProjectGalleryTrigger
        images={images}
        index={galleryIndex}
        onOpen={openAt}
        label={label ?? `Bild vergrößern: ${alt}`}
        className="group absolute inset-0 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={`${imageClassName} transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.01]`}
          style={{ objectPosition: objectPosition ?? "center center" }}
          draggable={false}
        />
        {badge && (
          <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium tracking-[0.08em] text-paper uppercase">
            {badge}
          </span>
        )}
        {hint && (
          <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-paper uppercase opacity-90 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            {hint}
          </span>
        )}
      </ProjectGalleryTrigger>
    </div>
  );
}
