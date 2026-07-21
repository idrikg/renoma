import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import {
  getRegionalNavItems,
  type RegionalNavContext,
} from "@/lib/service-regions";

/**
 * Compact city switcher at the end of regional service pages.
 * Current path is shown as plain text (not linked) to avoid duplication.
 */
export function RegionalCitiesNav({
  context,
  currentPath,
}: {
  context: RegionalNavContext;
  currentPath: string;
}) {
  const items = getRegionalNavItems(context);

  return (
    <section
      aria-labelledby="weitere-orte-heading"
      className="border-t border-line py-16 sm:py-20"
    >
      <Container>
        <Reveal>
          <h2
            id="weitere-orte-heading"
            className="text-2xl font-medium tracking-tight text-balance text-ink sm:text-3xl"
          >
            Weitere Orte in der Region
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
            Wählen Sie den Ort, der zu Ihrem Vorhaben passt.
          </p>
          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {items.map((item) => {
              const isCurrent =
                item.href === currentPath ||
                item.href.startsWith(`${currentPath}#`);
              return (
                <li key={item.label}>
                  {isCurrent ? (
                    <span
                      className="inline-flex min-h-11 items-center text-[15px] font-medium text-ink"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-[15px] font-medium text-muted underline decoration-line underline-offset-4 outline-none transition-colors hover:text-ink hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
