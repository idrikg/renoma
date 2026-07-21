"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { submitProjectRequest } from "@/lib/actions";
import { isCompleteGermanPostalCode } from "@/lib/postal-cities";
import { normalizeCategories } from "@/lib/validation";
import { ProgressIndicator } from "@/components/project-assistant/progress-indicator";
import { Confirmation } from "@/components/project-assistant/confirmation";
import { FunnelActionBar } from "@/components/project-assistant/funnel-action-bar";
import { StepSummary } from "@/components/project-assistant/step-summary";
import {
  StepBudget,
  StepCategories,
  StepContact,
  StepImages,
  StepMainArea,
  StepObject,
  StepTiming,
  StepWishes,
} from "@/components/project-assistant/steps";
import {
  clearWizardData,
  loadWizardData,
  saveWizardData,
} from "@/components/project-assistant/storage";
import {
  dataMatchesPreset,
  getFirstOpenStep,
  type FunnelPreset,
} from "@/components/project-assistant/funnel-preset";
import {
  defaultWizardData,
  type LocalImage,
  type SubmitState,
  type WizardData,
} from "@/components/project-assistant/types";

const TOTAL_STEPS = 9;

const STEP_TITLES = [
  "Bereich wählen",
  "Leistungen auswählen",
  "Bilder",
  "Angaben zum Objekt",
  "Gewünschter Start",
  "Investitionsrahmen",
  "Persönliche Angaben",
  "Ihre Wünsche",
  "Zusammenfassung",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasMeaningfulData(data: WizardData): boolean {
  return (
    data.categories.length > 0 ||
    data.wishes.trim().length > 0 ||
    data.postalCode.trim().length > 0 ||
    data.city.trim().length > 0 ||
    data.firstName.trim().length > 0 ||
    data.email.trim().length > 0
  );
}

function canProceed(step: number, data: WizardData): boolean {
  switch (step) {
    case 2:
      return data.categories.length > 0;
    case 3:
    case 8:
      return true;
    case 4:
      return (
        isCompleteGermanPostalCode(data.postalCode) &&
        data.city.trim().length >= 2 &&
        Boolean(data.objectType) &&
        (data.objectType !== "haus" || Boolean(data.houseSubtype))
      );
    case 5:
      return Boolean(data.desiredStart);
    case 6:
      return Boolean(data.budgetRange);
    case 7:
      return (
        data.firstName.trim().length >= 2 &&
        data.lastName.trim().length >= 2 &&
        EMAIL_PATTERN.test(data.email.trim()) &&
        Boolean(data.preferredContact) &&
        (data.preferredContact !== "phone" || data.phone.trim().length >= 4)
      );
    case 9:
      return data.consent;
    default:
      return true;
  }
}

function categoryStatusLabel(count: number): string {
  if (count === 1) return "1 Leistung ausgewählt";
  if (count > 1) return `${count} Leistungen ausgewählt`;
  return "Noch keine Auswahl";
}

type PersistedState = {
  data: WizardData;
  step: number;
  hydrated: boolean;
};

type ProjectAssistantProps = {
  /** Optional allowlisted entry preset from the page URL. Invalid/absent → normal start. */
  initialPreset?: FunnelPreset | null;
};

export function ProjectAssistant({
  initialPreset = null,
}: ProjectAssistantProps) {
  const [{ data, step, hydrated }, setPersisted] = useState<PersistedState>(() => {
    if (!initialPreset) {
      return { data: defaultWizardData, step: 1, hydrated: false };
    }
    const seeded: WizardData = {
      ...defaultWizardData,
      mainArea: initialPreset.mainArea,
      categories: [...initialPreset.categories],
    };
    return {
      data: seeded,
      step: getFirstOpenStep(seeded),
      hydrated: false,
    };
  });
  const [images, setImages] = useState<LocalImage[]>([]);
  const [imagesBusy, setImagesBusy] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();
  /** True when this session opened with a valid URL preset (controls the banner). */
  const [enteredViaPreset] = useState(() => Boolean(initialPreset));

  // Hydrate from session storage once on mount. Deliberately not a lazy
  // useState initializer: that would read sessionStorage during the
  // server-side render pass too (where it's unavailable) and again on the
  // client during hydration, causing a server/client mismatch. Reading
  // after mount, in an effect, is the correct way to sync with a
  // browser-only external store here — the brief flash from defaults to
  // a stored draft is an acceptable trade-off.
  //
  // When a valid URL preset is present it wins for mainArea + categories.
  // Later-step draft fields are kept; the start step is computed from the
  // funnel structure (or resumed if the stored draft already matches).
  useEffect(() => {
    const stored = loadWizardData();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time hydration from a client-only store; see comment above.
    setPersisted((current) => {
      if (initialPreset) {
        const base = stored?.data ?? current.data;
        const nextData: WizardData = {
          ...base,
          mainArea: initialPreset.mainArea,
          categories: normalizeCategories([...initialPreset.categories]),
        };
        const matchingDraft =
          stored &&
          dataMatchesPreset(stored.data, initialPreset) &&
          stored.step > 3;
        const nextStep = matchingDraft
          ? Math.min(Math.max(stored.step, 1), TOTAL_STEPS)
          : getFirstOpenStep(nextData);

        return {
          data: nextData,
          step: nextStep,
          hydrated: true,
        };
      }

      const loaded = stored?.data ?? current.data;
      return {
        data: {
          ...loaded,
          categories: normalizeCategories(loaded.categories),
        },
        step: stored
          ? Math.min(Math.max(stored.step, 1), TOTAL_STEPS)
          : current.step,
        hydrated: true,
      };
    });
  }, [initialPreset]);

  useEffect(() => {
    if (!hydrated) return;
    saveWizardData(data, step);
  }, [data, step, hydrated]);

  // Warn before an accidental tab close/navigation once the visitor has
  // entered anything meaningful, until they've successfully submitted.
  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (submitState.status !== "success" && hasMeaningfulData(data)) {
        event.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [data, submitState.status]);

  // After a step change (not the initial mount/hydration), bring the new
  // step's heading into view and move focus to it. Skipped on the very
  // first render so restoring a saved draft never causes an unsolicited
  // jump on page load — only actual forward/back navigation does.
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRenderRef = useRef(true);
  const didPresetFocusRef = useRef(false);
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    const container = stepContainerRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = container.getBoundingClientRect();
    // Only nudge the scroll position if the step's top isn't already
    // comfortably visible — avoids an unconditional jump back to the very
    // top of the page on every single step change.
    if (rect.top < 0 || rect.top > 96) {
      container.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
    container.focus({ preventScroll: true });
  }, [step]);

  // After preset hydration, place focus on the first open step without
  // forcing a scroll jump (same restraint as draft restore).
  useEffect(() => {
    if (!hydrated || !enteredViaPreset || didPresetFocusRef.current) return;
    didPresetFocusRef.current = true;
    stepContainerRef.current?.focus({ preventScroll: true });
  }, [hydrated, enteredViaPreset, step]);

  function setStep(next: number | ((current: number) => number)) {
    setPersisted((current) => ({
      ...current,
      step: typeof next === "function" ? next(current.step) : next,
    }));
  }

  function update(patch: Partial<WizardData>) {
    setPersisted((current) => ({
      ...current,
      data: { ...current.data, ...patch },
    }));
  }

  function goNext() {
    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function changePresetSelection() {
    setStep(1);
  }

  function addImages(files: File[]) {
    if (files.length === 0) return;
    const next: LocalImage[] = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((current) => [...current, ...next]);
  }

  function removeImage(id: string) {
    setImages((current) => {
      const target = current.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((image) => image.id !== id);
    });
  }

  function handleFinalSubmit() {
    const payload = {
      ...data,
      categories: normalizeCategories(data.categories),
      imageCount: images.length,
    };
    startTransition(async () => {
      const result = await submitProjectRequest(payload);
      if (result.status === "success") {
        images.forEach((image) => URL.revokeObjectURL(image.previewUrl));
        clearWizardData();
        setSubmitState({ status: "success" });
      } else {
        setSubmitState(result);
      }
    });
  }

  if (submitState.status === "success") {
    return <Confirmation />;
  }

  const showActionBar = step >= 2;
  const nextDisabled =
    step === 3 ? imagesBusy : !canProceed(step, data);
  const nextLabel =
    step === 9
      ? "Projekt starten"
      : step === 3 && imagesBusy
        ? "Bild wird verarbeitet …"
        : step === 3 && images.length === 0
          ? "Überspringen"
          : "Weiter";
  const showPresetBanner =
    enteredViaPreset &&
    Boolean(initialPreset) &&
    step >= 3 &&
    dataMatchesPreset(data, initialPreset!);

  return (
    <div>
      <ProgressIndicator step={step} total={TOTAL_STEPS} label={STEP_TITLES[step - 1]} />

      {showPresetBanner && initialPreset && (
        <div
          className="mb-5 flex flex-col gap-2 border-b border-line pb-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm leading-relaxed text-muted">
            Vorausgewählt:{" "}
            <span className="font-medium text-ink">{initialPreset.summaryLabel}</span>
          </p>
          <button
            type="button"
            onClick={changePresetSelection}
            className="inline-flex min-h-11 items-center self-start text-[15px] font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage sm:self-auto"
          >
            Auswahl ändern
          </button>
        </div>
      )}

      <div
        key={step}
        ref={stepContainerRef}
        tabIndex={-1}
        className="animate-step-in outline-none"
      >
        {step === 1 && (
          <StepMainArea data={data} update={update} onNext={goNext} />
        )}
        {step === 2 && (
          <StepCategories data={data} update={update} onNext={goNext} />
        )}
        {step === 3 && (
          <StepImages
            onNext={goNext}
            images={images}
            onAddImages={addImages}
            onRemoveImage={removeImage}
            onBusyChange={setImagesBusy}
          />
        )}
        {step === 4 && (
          <StepObject data={data} update={update} onNext={goNext} />
        )}
        {step === 5 && (
          <StepTiming data={data} update={update} onNext={goNext} />
        )}
        {step === 6 && (
          <StepBudget data={data} update={update} onNext={goNext} />
        )}
        {step === 7 && (
          <StepContact data={data} update={update} onNext={goNext} />
        )}
        {step === 8 && (
          <StepWishes data={data} update={update} onNext={goNext} />
        )}
        {step === 9 && (
          <StepSummary
            data={data}
            imageCount={images.length}
            onGoToStep={setStep}
            onConsentChange={(checked) => update({ consent: checked })}
            onSubmit={handleFinalSubmit}
            submitError={submitState.status === "error" ? submitState.message : undefined}
          />
        )}
      </div>

      {/* Sibling of the animated wrapper — see FunnelActionBar docs. */}
      {showActionBar && (
        <FunnelActionBar
          onBack={goBack}
          nextDisabled={nextDisabled}
          pending={step === 9 ? isPending : false}
          nextLabel={nextLabel}
          statusLabel={step === 2 ? categoryStatusLabel(data.categories.length) : undefined}
        />
      )}
    </div>
  );
}
