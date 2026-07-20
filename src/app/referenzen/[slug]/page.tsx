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
    return { title: "Projekt nicht gefunden" };
  }

  const teaser = getReferenceTeaser(reference);
  const cover = getReferenceCover(reference);

  return {
    title: reference.title,
    description: teaser,
    openGraph: {
      title: reference.title,
      description: teaser,
      type: "article",
      images: [{ url: cover.src, alt: cover.alt }],
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
