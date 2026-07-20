/**
 * Calm, precise funnel scroll helpers. Prefer element refs over hard-coded
 * pixel offsets so layout changes don't break positioning.
 */

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls `target` into view with a small top offset so the funnel header
 * and sticky action bar don't obscure it, then optionally focuses an input.
 */
export function scrollFunnelTargetIntoView(
  target: HTMLElement,
  options?: { focus?: HTMLElement | null; delayMs?: number }
): () => void {
  const delayMs = options?.delayMs ?? 0;
  let timeoutId: number | null = null;
  let focusId: number | null = null;

  timeoutId = window.setTimeout(() => {
    const reduceMotion = prefersReducedMotion();
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });

    if (options?.focus) {
      // Wait for the scroll to settle before focusing — focusing too early
      // can pull the viewport again (especially with the software keyboard).
      focusId = window.setTimeout(
        () => {
          options.focus?.focus({ preventScroll: true });
        },
        reduceMotion ? 0 : 220
      );
    }
  }, delayMs);

  return () => {
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    if (focusId !== null) window.clearTimeout(focusId);
  };
}
