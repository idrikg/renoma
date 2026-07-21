import type { ReferenceImage } from "@/lib/references-data";
import {
  DEFAULT_REFERENCE_HEIGHT,
  DEFAULT_REFERENCE_WIDTH,
  type ProjectLightboxImage,
} from "@/lib/project-lightbox";

export function buildProjectGalleryImages({
  cover,
  beforeImages,
  afterImages,
  detailImages,
}: {
  cover: ReferenceImage;
  beforeImages: ReferenceImage[];
  afterImages: ReferenceImage[];
  detailImages: ReferenceImage[];
}): ProjectLightboxImage[] {
  const toEntry = (
    image: ReferenceImage,
    title?: string,
  ): ProjectLightboxImage => {
    const landscape = image.src.includes("detail-waschbecken");
    return {
      src: image.src,
      alt: image.alt,
      title: title ?? image.caption,
      width: landscape ? 1024 : DEFAULT_REFERENCE_WIDTH,
      height: landscape ? 768 : DEFAULT_REFERENCE_HEIGHT,
    };
  };

  return [
    toEntry(cover),
    ...beforeImages.map((image) => toEntry(image, "Vorher")),
    ...afterImages.map((image) => toEntry(image, "Nachher")),
    ...detailImages.map((image) => toEntry(image, image.caption)),
  ];
}

export function getGalleryIndexMap(counts: {
  beforeCount: number;
  afterCount: number;
  detailCount: number;
}) {
  const cover = 0;
  const beforeStart = 1;
  const afterStart = beforeStart + counts.beforeCount;
  const detailStart = afterStart + counts.afterCount;
  return { cover, beforeStart, afterStart, detailStart };
}
