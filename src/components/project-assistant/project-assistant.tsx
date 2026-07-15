"use client";

import { useEffect, useState, useTransition } from "react";
import { submitProjectRequest } from "@/lib/actions";
import { normalizeCategories } from "@/lib/validation";
import { ProgressIndicator } from "@/components/project-assistant/progress-indicator";
import { Confirmation } from "@/components/project-assistant/confirmation";
import { StepSummary } from "@/components/project-assistant/step-summary";
import {
  StepBudget,
  StepCategories,
  StepContact,
  StepImages,
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
  defaultWizardData,
  type LocalImage,
  type SubmitState,
  type WizardData,
} from "@/components/project-assistant/types";

const TOTAL_STEPS = 8;

const STEP_TITLES = [
  "Was möchten Sie verändern?",
  "Bilder",
  "Angaben zum Objekt",
  "Gewünschter Start",
  "Investitionsrahmen",
  "Persönliche Angaben",
  "Ihre Wünsche",
  "Zusammenfassung",
];

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

type PersistedState = {
  data: WizardData;
  step: number;
  hydrated: boolean;
};

export function ProjectAssistant() {
  const [{ data, step, hydrated }, setPersisted] = useState<PersistedState>({
    data: defaultWizardData,
    step: 1,
    hydrated: false,
  });
  const [images, setImages] = useState<LocalImage[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  // Hydrate from session storage once on mount. Deliberately not a lazy
  // useState initializer: that would read sessionStorage during the
  // server-side render pass too (where it's unavailable) and again on the
  // client during hydration, causing a server/client mismatch. Reading
  // after mount, in an effect, is the correct way to sync with a
  // browser-only external store here — the brief flash from defaults to
  // a stored draft is an acceptable trade-off.
  useEffect(() => {
    const stored = loadWizardData();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time hydration from a client-only store; see comment above.
    setPersisted((current) => {
      const loaded = stored?.data ?? current.data;
      return {
        data: {
          ...loaded,
          categories: normalizeCategories(loaded.categories),
        },
        step: stored ? Math.min(Math.max(stored.step, 1), TOTAL_STEPS) : current.step,
        hydrated: true,
      };
    });
  }, []);

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

  function addImages(files: FileList) {
    const next: LocalImage[] = Array.from(files).map((file) => ({
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

  return (
    <div>
      <ProgressIndicator step={step} total={TOTAL_STEPS} label={STEP_TITLES[step - 1]} />

      {step === 1 && (
        <StepCategories data={data} update={update} onNext={goNext} />
      )}
      {step === 2 && (
        <StepImages
          onNext={goNext}
          onBack={goBack}
          images={images}
          onAddImages={addImages}
          onRemoveImage={removeImage}
        />
      )}
      {step === 3 && (
        <StepObject data={data} update={update} onNext={goNext} onBack={goBack} />
      )}
      {step === 4 && (
        <StepTiming data={data} update={update} onNext={goNext} onBack={goBack} />
      )}
      {step === 5 && (
        <StepBudget data={data} update={update} onNext={goNext} onBack={goBack} />
      )}
      {step === 6 && (
        <StepContact data={data} update={update} onNext={goNext} onBack={goBack} />
      )}
      {step === 7 && (
        <StepWishes data={data} update={update} onNext={goNext} onBack={goBack} />
      )}
      {step === 8 && (
        <StepSummary
          data={data}
          imageCount={images.length}
          onBack={goBack}
          onGoToStep={setStep}
          onConsentChange={(checked) => update({ consent: checked })}
          onSubmit={handleFinalSubmit}
          pending={isPending}
          submitError={submitState.status === "error" ? submitState.message : undefined}
        />
      )}
    </div>
  );
}
