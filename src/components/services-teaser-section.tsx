import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Homepage bridge to the visible Leistungen hub — one job, one CTA.
 */
export function ServicesTeaserSection() {
  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-teaser-heading"
      className="scroll-mt-24 border-y border-line py-20 sm:py-28"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-[0.14em] text-clay uppercase">
            Leistungen
          </p>
          <h2
            id="leistungen-teaser-heading"
            className="mt-4 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl"
          >
            Bad, Gesamtsanierung oder gezielte Maßnahmen.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Verschaffen Sie sich einen Überblick über die Bereiche, in denen
            RENOMA Sie persönlich begleitet – von der Badmodernisierung bis zu
            Fenster und Türen.
          </p>
          <div className="mt-9">
            <Link
              href="/leistungen"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-transparent px-7 py-3 text-[15px] font-medium text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Leistungen ansehen
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
