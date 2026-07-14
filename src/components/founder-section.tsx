import Image from "next/image";
import { Container } from "@/components/container";
import { mediaConfig } from "@/lib/media-config";

export function FounderSection() {
  const image = mediaConfig.founderImage;

  return (
    <section id="ueber-renoma" className="scroll-mt-24 border-t border-line py-20 sm:py-28 lg:py-32">
      <Container>
        <div className={image ? "grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16" : "max-w-2xl"}>
          <div className={image ? "order-2 lg:order-1" : undefined}>
            <h2 className="text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Persönlich begleitet.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              RENOMA wurde aus einer einfachen Überzeugung gegründet: Eine
              Renovierung sollte nicht daran scheitern, dass niemand den
              Überblick behält.
            </p>
            <p className="text-display-3 mt-8 border-l-2 border-clay pl-6 text-ink italic">
              Deshalb begleiten wir Projekte persönlich, hören zu und
              kümmern uns darum, dass aus vielen einzelnen Aufgaben ein
              gemeinsamer Weg entsteht.
            </p>
          </div>
          {image && (
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-2 lg:aspect-auto">
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
