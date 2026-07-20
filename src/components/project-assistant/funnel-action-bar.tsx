"use client";

import { useEffect, useState } from "react";

export const FUNNEL_STEP_FORM_ID = "renoma-funnel-step-form";

/**
 * Mobile sticky Zurück/Weiter bar for funnel steps. Rendered as a sibling
 * of the animated step wrapper (never inside a transformed ancestor) so
 * `position: fixed` stays viewport-anchored. On desktop it sits in normal
 * document flow.
 *
 * Uses the Visual Viewport API to lift the bar with the software keyboard
 * instead of covering focused fields.
 */
export function FunnelActionBar({
  onBack,
  nextDisabled,
  pending,
  nextLabel = "Weiter",
  statusLabel,
  formId = FUNNEL_STEP_FORM_ID,
}: {
  onBack?: () => void;
  nextDisabled?: boolean;
  pending?: boolean;
  nextLabel?: string;
  statusLabel?: string;
  formId?: string;
}) {
  const [keyboardInset, setKeyboardInset] = useState(0);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    function syncCompact() {
      setIsCompact(media.matches);
    }
    syncCompact();
    media.addEventListener("change", syncCompact);

    const viewport = window.visualViewport;
    function syncInset() {
      if (!viewport || !media.matches) {
        setKeyboardInset(0);
        return;
      }
      const inset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop
      );
      setKeyboardInset(inset);
    }

    syncInset();
    viewport?.addEventListener("resize", syncInset);
    viewport?.addEventListener("scroll", syncInset);

    return () => {
      media.removeEventListener("change", syncCompact);
      viewport?.removeEventListener("resize", syncInset);
      viewport?.removeEventListener("scroll", syncInset);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 z-20 border-t border-line bg-paper/95 px-6 pt-3 backdrop-blur-sm sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:px-0 sm:pt-2 sm:pb-0"
      style={
        isCompact
          ? {
              bottom: keyboardInset,
              paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
            }
          : undefined
      }
    >
      {statusLabel ? (
        <p className="mb-3 text-center text-[13px] text-muted sm:hidden">{statusLabel}</p>
      ) : null}
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="-my-3 rounded-sm px-1 py-3 text-[15px] font-medium text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
          >
            Zurück
          </button>
        ) : (
          <span />
        )}
        {statusLabel ? (
          <p className="hidden text-[15px] text-muted sm:block">{statusLabel}</p>
        ) : null}
        <button
          type="submit"
          form={formId}
          disabled={nextDisabled || pending}
          aria-disabled={nextDisabled || pending}
          className="rounded-full bg-ink px-7 py-3 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          {pending ? "Wird gesendet…" : nextLabel}
        </button>
      </div>
    </div>
  );
}
