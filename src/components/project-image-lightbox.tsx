"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import type { ZoomRef } from "yet-another-react-lightbox";
import {
  type ProjectLightboxImage,
  toLightboxSlides,
} from "@/lib/project-lightbox";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

type ProjectImageLightboxProps = {
  images: ProjectLightboxImage[];
  open: boolean;
  index: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
};

/**
 * Shared project lightbox with zoom, pan, pinch and gallery navigation.
 * Uses yet-another-react-lightbox (+ Zoom, Counter). No history/hash URLs.
 */
export function ProjectImageLightbox({
  images,
  open,
  index,
  onClose,
  onIndexChange,
}: ProjectImageLightboxProps) {
  const [plugins, setPlugins] = useState<unknown[] | null>(null);
  const zoomRef = useRef<ZoomRef>(null);

  useEffect(() => {
    if (!open || plugins) return;
    let cancelled = false;
    void Promise.all([
      import("yet-another-react-lightbox/plugins/zoom"),
      import("yet-another-react-lightbox/plugins/counter"),
      import("yet-another-react-lightbox/plugins/captions"),
    ]).then(([zoomMod, counterMod, captionsMod]) => {
      if (cancelled) return;
      setPlugins([zoomMod.default, counterMod.default, captionsMod.default]);
    });
    return () => {
      cancelled = true;
    };
  }, [open, plugins]);

  const slides = toLightboxSlides(images);

  const handleResetZoom = useCallback(() => {
    zoomRef.current?.changeZoom(1, true);
  }, []);

  if (!open || slides.length === 0) return null;

  if (!plugins) {
    return (
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(28,26,24,0.94)]"
        role="status"
        aria-live="polite"
        aria-label="Vollbildansicht wird geladen"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <span className="text-sm tracking-[0.08em] text-paper/70 uppercase">
          Laden…
        </span>
      </div>
    );
  }

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={plugins as never}
      zoom={{
        ref: zoomRef,
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 1.6,
        doubleClickMaxStops: 2,
        scrollToZoom: true,
        pinchZoomV4: true,
      }}
      carousel={{
        finite: slides.length <= 1,
        imageFit: "contain",
        padding: "16px",
        spacing: "20px",
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      animation={{ fade: 220, swipe: 320 }}
      counter={{
        container: { style: { top: "unset", bottom: "12px" } },
      }}
      captions={{
        descriptionTextAlign: "center",
        descriptionMaxLines: 2,
      }}
      labels={{
        Close: "Vollbildansicht schließen",
        Next: "Nächstes Bild",
        Previous: "Vorheriges Bild",
        "Zoom in": "Bild vergrößern",
        "Zoom out": "Bild verkleinern",
        Lightbox: "Bildergalerie",
        "Photo gallery": "Projektbilder",
        "{index} of {total}": "{index} / {total}",
      }}
      on={{
        view: ({ index: next }) => onIndexChange?.(next),
      }}
      toolbar={{
        buttons: [
          <button
            key="reset-zoom"
            type="button"
            className="yarl__button"
            title="Ansicht zurücksetzen"
            aria-label="Ansicht zurücksetzen"
            onClick={handleResetZoom}
          >
            <ResetZoomIcon />
          </button>,
          "zoom",
          "close",
        ],
      }}
      styles={{
        container: {
          backgroundColor: "rgba(28, 26, 24, 0.94)",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        },
      }}
      className="project-lightbox"
    />
  );
}

function ResetZoomIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

type GalleryTriggerProps = {
  images: ProjectLightboxImage[];
  index: number;
  onOpen: (index: number) => void;
  className?: string;
  children: ReactNode;
  label?: string;
};

/** Accessible control that opens the shared lightbox at a given image. */
export function ProjectGalleryTrigger({
  images,
  index,
  onOpen,
  className,
  children,
  label,
}: GalleryTriggerProps) {
  const image = images[index];
  if (!image) return null;

  return (
    <button
      type="button"
      className={className}
      onClick={() => onOpen(index)}
      aria-label={
        label ?? `Bild vergrößern: ${image.alt || image.title || "Projektbild"}`
      }
    >
      {children}
    </button>
  );
}
