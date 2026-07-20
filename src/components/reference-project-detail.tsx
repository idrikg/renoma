import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import type { ProjectReference, ReferenceImage } from "@/lib/references-data";
import {
  getAfterImages,
  getBeforeImages,
  getDetailImages,
  getReferenceBody,
  getReferenceCover,
  getReferenceHighlights,
  getReferenceOverviewItems,
  getReferenceQuote,
  getReferenceServices,
  getReferenceTeaser,
} from "@/lib/references-data";

/**
 * Server-rendered project detail. Sections render only when real data
 * exists — never empty placeholders for optional galleries or fields.
 */
export function ReferenceProjectDetail({
  reference,
}: {
  reference: ProjectReference;
}) {
  const cover = getReferenceCover(reference);
  const teaser = getReferenceTeaser(reference);
  const body = getReferenceBody(reference);
  const overview = getReferenceOverviewItems(reference);
  const beforeImages = getBeforeImages(reference);
  const afterImages = getAfterImages(reference);
  const detailImages = getDetailImages(reference);
  const highlights = getReferenceHighlights(reference);
  const services = getReferenceServices(reference);
  const quote = getReferenceQuote(reference);
  const resultText = reference.resultText?.trim();
  const hasFeatureSection = services.length > 0 || highlights.length > 0;

  return (
    <article>
      <header className="border-b border-line bg-paper pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <Container>
          <Reveal>
            <Link
              href="/#referenzen"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-muted outline-none transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Zurück zu den Referenzen
            </Link>
          </Reveal>

          <Reveal delayMs={40} className="mt-10 max-w-3xl">
            <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
              {reference.category}
            </p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
              {reference.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {teaser}
            </p>
            {reference.location?.trim() && (
              <p className="mt-4 text-sm text-muted">{reference.location.trim()}</p>
            )}
          </Reveal>

          <Reveal delayMs={80} className="mt-10 sm:mt-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-greige sm:aspect-[16/11] lg:aspect-[21/10] lg:rounded-[1.75rem]">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
                style={
                  cover.objectPosition
                    ? { objectPosition: cover.objectPosition }
                    : undefined
                }
              />
            </div>
            {cover.caption && (
              <p className="mt-3 text-sm text-muted">{cover.caption}</p>
            )}
          </Reveal>
        </Container>
      </header>

      {overview.length > 0 && (
        <section aria-labelledby="projektueberblick-heading" className="py-14 sm:py-16">
          <Container>
            <Reveal>
              <h2
                id="projektueberblick-heading"
                className="text-sm font-medium tracking-[0.14em] text-clay uppercase"
              >
                Projektüberblick
              </h2>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {overview.map((item) => (
                  <div key={item.label} className="border-t border-line pt-4">
                    <dt className="text-sm text-muted">{item.label}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>
      )}

      <section aria-labelledby="beschreibung-heading" className="py-6 sm:py-8">
        <Container>
          <Reveal className="max-w-2xl">
            <h2
              id="beschreibung-heading"
              className="text-2xl font-medium tracking-tight text-ink sm:text-3xl"
            >
              Das Projekt
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {body}
            </p>
            {quote && (
              <blockquote className="mt-8 border-l-2 border-clay pl-5 text-pretty text-base italic leading-relaxed text-ink sm:text-lg">
                „{quote}“
              </blockquote>
            )}
          </Reveal>
        </Container>
      </section>

      {(beforeImages.length > 0 || afterImages.length > 0) && (
        <section
          aria-labelledby="vorher-nachher-heading"
          className="bg-paper-dim py-16 sm:py-20 lg:py-24"
        >
          <Container>
            <Reveal>
              <h2
                id="vorher-nachher-heading"
                className="text-2xl font-medium tracking-tight text-ink sm:text-3xl"
              >
                Vorher und Nachher
              </h2>
            </Reveal>

            <div className="mt-10 space-y-12 sm:mt-12 lg:space-y-16">
              {beforeImages.map((image, index) => {
                const after = afterImages[Math.min(index, afterImages.length - 1)];
                if (!after) {
                  return (
                    <Reveal key={`before-only-${image.src}`}>
                      <LabeledImage image={image} label="Vorher" sizes="100vw" />
                    </Reveal>
                  );
                }
                return (
                  <Reveal
                    key={`${image.src}-${after.src}`}
                    delayMs={index * 40}
                    className="grid gap-6 lg:grid-cols-2 lg:gap-8"
                  >
                    <LabeledImage
                      image={image}
                      label="Vorher"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                    <LabeledImage
                      image={after}
                      label="Nachher"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                  </Reveal>
                );
              })}
              {afterImages.length > beforeImages.length &&
                afterImages.slice(beforeImages.length).map((image) => (
                  <Reveal key={`after-extra-${image.src}`}>
                    <LabeledImage image={image} label="Nachher" sizes="100vw" />
                  </Reveal>
                ))}
            </div>
          </Container>
        </section>
      )}

      {detailImages.length > 0 && (
        <section
          aria-labelledby="details-heading"
          className="py-16 sm:py-20 lg:py-24"
        >
          <Container>
            <Reveal>
              <h2
                id="details-heading"
                className="text-2xl font-medium tracking-tight text-ink sm:text-3xl"
              >
                Details, die den Unterschied machen.
              </h2>
            </Reveal>
            <ul className="mt-10 grid list-none gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:gap-8">
              {detailImages.map((image, index) => (
                <li key={image.src}>
                  <Reveal delayMs={Math.min(index * 40, 120)}>
                    <figure>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-greige sm:aspect-[3/4]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 46vw, 100vw"
                          className="object-cover"
                          style={
                            image.objectPosition
                              ? { objectPosition: image.objectPosition }
                              : undefined
                          }
                        />
                      </div>
                      {(image.caption || image.alt) && (
                        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                          {image.caption || image.alt}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {hasFeatureSection && (
        <section
          aria-labelledby="leistungen-heading"
          className="border-y border-line bg-paper-dim py-16 sm:py-20"
        >
          <Container>
            <Reveal className="max-w-2xl">
              <h2
                id="leistungen-heading"
                className="text-2xl font-medium tracking-tight text-ink sm:text-3xl"
              >
                {services.length > 0 && highlights.length > 0
                  ? "Leistungen und Details"
                  : services.length > 0
                    ? "Ausgeführte Leistungen"
                    : "Besondere Details"}
              </h2>
              {services.length > 0 && (
                <div className="mt-8">
                  {highlights.length > 0 && (
                    <h3 className="text-sm font-medium tracking-[0.1em] text-clay uppercase">
                      Ausgeführte Leistungen
                    </h3>
                  )}
                  <ul className={highlights.length > 0 ? "mt-4 space-y-3" : "space-y-3"}>
                    {services.map((item) => (
                      <li
                        key={item}
                        className="border-t border-line pt-3 text-[15px] leading-relaxed text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {highlights.length > 0 && (
                <div className={services.length > 0 ? "mt-10" : "mt-8"}>
                  {services.length > 0 && (
                    <h3 className="text-sm font-medium tracking-[0.1em] text-clay uppercase">
                      Besondere Details
                    </h3>
                  )}
                  <ul className={services.length > 0 ? "mt-4 space-y-3" : "space-y-3"}>
                    {highlights.map((item) => (
                      <li
                        key={item}
                        className="border-t border-line pt-3 text-[15px] leading-relaxed text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </Container>
        </section>
      )}

      {resultText && (
        <section aria-labelledby="ergebnis-heading" className="py-16 sm:py-20">
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2
                id="ergebnis-heading"
                className="text-2xl font-medium tracking-tight text-ink sm:text-3xl"
              >
                Das Ergebnis
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {resultText}
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      <section className="relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden className="bg-hero-glow absolute inset-0 -z-10" />
        <Container>
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-display-2 text-balance text-ink">
              Planen Sie ein ähnliches Projekt?
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Erzählen Sie uns, was Sie verändern möchten. Wir schauen uns Ihr
              Vorhaben persönlich an.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:mt-10">
              <Link
                href="/projekt-starten"
                className="flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto"
              >
                Projekt starten
              </Link>
              <Link
                href="/#referenzen"
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
              >
                Weitere Referenzen ansehen
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}

function LabeledImage({
  image,
  label,
  sizes,
}: {
  image: ReferenceImage;
  label: string;
  sizes: string;
}) {
  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-greige sm:aspect-[3/4] lg:aspect-auto lg:h-[560px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-medium tracking-[0.08em] text-paper uppercase">
          {label}
        </span>
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
