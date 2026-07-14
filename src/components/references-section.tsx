import Image from "next/image";
import { Container } from "@/components/container";
import { getPublishedReferences, type ProjectReference } from "@/lib/references-data";

/**
 * Rendered only by the parent page when `hasPublishedReferences()` is
 * true — see app/page.tsx. That keeps the `#referenzen` anchor, the nav
 * link, and this section's existence all governed by the same single
 * source of truth, so there is never an empty section, a stray gap, or a
 * dead link.
 */
export function ReferencesSection() {
  const publishedReferences = getPublishedReferences();

  return (
    <section id="referenzen" className="scroll-mt-24 py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Referenzen
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Aus Ideen werden Zuhause.
          </h2>
        </div>

        <div className="mt-14 space-y-20 sm:space-y-24">
          {publishedReferences.map((reference) => (
            <ReferenceRow key={reference.slug} reference={reference} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReferenceRow({ reference }: { reference: ProjectReference }) {
  const hasBeforeAfter = Boolean(reference.beforeImage && reference.afterImage);
  const title = reference.title ?? reference.category;

  return (
    <article className="grid gap-6 lg:grid-cols-[1fr_minmax(0,18rem)] lg:gap-12">
      <div
        tabIndex={hasBeforeAfter ? 0 : undefined}
        className="group relative aspect-[16/10] overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-clay"
      >
        <Image
          src={hasBeforeAfter ? reference.beforeImage! : reference.heroImage}
          alt={hasBeforeAfter ? `${title} — vorher` : title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {hasBeforeAfter && (
          <>
            <Image
              src={reference.afterImage!}
              alt={`${title} — nachher`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium tracking-[0.08em] text-paper uppercase backdrop-blur-sm">
              Vorher / Nachher
            </span>
          </>
        )}
      </div>
      <div className="lg:pt-2">
        <h3 className="text-lg font-medium text-ink">{title}</h3>
        <p className="mt-1 text-sm text-muted">
          {reference.location} · {reference.durationApprox}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {reference.solution}
        </p>
        {reference.customerStatement && (
          <p className="mt-4 text-[15px] italic leading-relaxed text-ink">
            „{reference.customerStatement}“
          </p>
        )}
      </div>
    </article>
  );
}
