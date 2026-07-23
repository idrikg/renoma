import { defaultWizardData, type WizardData } from "@/components/project-assistant/types";

// v3: removed Investitionsrahmen step and object fields areaSqm /
// constructionYear — step indices after "Gewünschter Start" shift down by
// one. Bumping the key discards incompatible session drafts safely.
const STORAGE_KEY = "renoma-projekt-starten-v3";

/**
 * Session-storage persistence so an accidental refresh or back/forward
 * navigation doesn't lose what the visitor has already entered. Deliberately
 * not localStorage, so the draft doesn't outlive the browser session.
 * Images are held as in-memory File objects elsewhere and are intentionally
 * excluded here since File objects aren't serializable.
 */
export function loadWizardData(): { data: WizardData; step: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      data: { ...defaultWizardData, ...parsed.data },
      step: typeof parsed.step === "number" ? parsed.step : 1,
    };
  } catch {
    return null;
  }
}

export function saveWizardData(data: WizardData, step: number): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
  } catch {
    // Ignore write failures (private browsing, storage full) — the wizard
    // still works within the current page load, just without persistence.
  }
}

export function clearWizardData(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
