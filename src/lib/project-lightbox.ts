import type { SlideImage } from "yet-another-react-lightbox";

export type ProjectLightboxImage = {
  src: string;
  alt: string;
  title?: string;
  /** Native pixel size when known — improves zoom limits. */
  width?: number;
  height?: number;
};

/** Default portrait reference dimensions used across most project photos. */
export const DEFAULT_REFERENCE_WIDTH = 768;
export const DEFAULT_REFERENCE_HEIGHT = 1024;

/** Widths allowed by the Next.js image optimizer (deviceSizes + imageSizes). */
const NEXT_IMAGE_WIDTHS = [384, 640, 750, 828, 1080, 1200] as const;

export function toLightboxSlides(
  images: ProjectLightboxImage[],
): SlideImage[] {
  return images.map((image) => {
    const width = image.width ?? DEFAULT_REFERENCE_WIDTH;
    const height = image.height ?? DEFAULT_REFERENCE_HEIGHT;
    const largest = largestAllowedWidth(width);
    return {
      src: nextImageUrl(image.src, largest, 90),
      alt: image.alt,
      title: image.title,
      width,
      height,
      srcSet: buildSrcSet(image.src, width, height),
    };
  });
}

function largestAllowedWidth(nativeWidth: number): number {
  let best: number = NEXT_IMAGE_WIDTHS[0];
  for (const size of NEXT_IMAGE_WIDTHS) {
    if (size <= nativeWidth) best = size;
  }
  return best;
}

function buildSrcSet(
  src: string,
  width: number,
  height: number,
): NonNullable<SlideImage["srcSet"]> {
  return NEXT_IMAGE_WIDTHS.filter((size) => size <= width).map((size) => ({
    src: nextImageUrl(src, size, 90),
    width: size,
    height: Math.round((height / width) * size),
  }));
}

function nextImageUrl(src: string, size: number, quality: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=${quality}`;
}
