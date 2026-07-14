import Image from "next/image";
import { Container } from "@/components/container";
import { getPublishedReferences } from "@/lib/references-data";

/**
 * Renders nothing visible until at least one authentic, confirmed project
 * (isPublished: true in references-data.ts) exists. The section element
 * itself stays in the document so `#referenzen` remains a valid anchor
 * target for the Hero CTA and navigation — see docs/CREATIVE-REVISION.md.
 */
export function ReferencesSection() {
  const publishedReferences = getPublishedReferences();

  if (publishedReferences.length === 0) {
    return <div id="referenzen" aria-hidden="true" />;
  }

  return (
    <section id="referenzen" className="py-24 sm:py-32">
      <Container>
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Aus Ideen werden Zuhause.
          </h2>
        </div>
        <div className="mt-16 grid gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {publishedReferences.map((reference) => (
            <article key={reference.slug}>
              <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-2xl">
                <div className="relative aspect-square">
                  <Image
                    src={reference.beforeImage}
                    alt={`${reference.category} vorher`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square">
                  <Image
                    src={reference.afterImage}
                    alt={`${reference.category} nachher`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-ink">
                {reference.category}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {reference.location} · {reference.durationApprox}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {reference.solution}
              </p>
              {reference.customerStatement && (
                <p className="mt-3 text-[15px] italic leading-relaxed text-ink">
                  „{reference.customerStatement}“
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
