import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReferenceProjectDetail } from "@/components/reference-project-detail";
import {
  getPublishedReferenceBySlug,
  getPublishedReferences,
  getReferenceCover,
  getReferenceTeaser,
} from "@/lib/references-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedReferences().map((reference) => ({
    slug: reference.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const reference = getPublishedReferenceBySlug(slug);
  if (!reference) {
    return { title: "Projekt nicht gefunden", robots: { index: false, follow: false } };
  }

  const teaser = getReferenceTeaser(reference);
  const cover = getReferenceCover(reference);
  const canonicalPath = `/referenzen/${reference.slug}`;

  return {
    title: reference.title,
    description: teaser,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: reference.title,
      description: teaser,
      type: "article",
      url: canonicalPath,
      images: [{ url: cover.src, alt: cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: reference.title,
      description: teaser,
      images: [cover.src],
    },
  };
}

export default async function ReferenceProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const reference = getPublishedReferenceBySlug(slug);
  if (!reference) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <ReferenceProjectDetail reference={reference} />
      </main>
      <SiteFooter />
    </>
  );
}
