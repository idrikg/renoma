"use client";

import { Check } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  budgetOptions,
  categoriesForMainArea,
  contactPreferenceOptions,
  desiredStartOptions,
  houseSubtypes,
  mainAreaOptions,
  objectTypes,
  renovationCategories,
} from "@/lib/validation";
import {
  categoryIcons,
  mainAreaIcons,
  objectTypeIcons,
} from "@/components/project-assistant/category-icons";
import {
  CategoryCardGroup,
  OptionCardGroup,
  StepShell,
  TextField,
} from "@/components/project-assistant/field-controls";
import { scrollFunnelTargetIntoView } from "@/components/project-assistant/scroll-helpers";
import type { LocalImage, WizardData } from "@/components/project-assistant/types";
import {
  isCompleteGermanPostalCode,
  lookupCityForPostalCode,
  prefetchPostalCityMap,
  sanitizeGermanPostalCode,
} from "@/lib/postal-cities";
import { getContactEmail } from "@/lib/legal-config";

const isProduction = process.env.NODE_ENV === "production";

type StepProps = {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack?: () => void;
};

/** True once, read synchronously — avoids a hydration mismatch since the
 *  media query is only available client-side, while still being correct
 *  before the first paint that actually needs it (both of this step's
 *  effects run after mount, never during SSR). */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const AREA_STEP_COPY: Record<
  string,
  { title: string; description: string }
> = {
  innen: {
    title: "Welche Leistungen im Innenbereich möchten Sie verändern?",
    description:
      "Wählen Sie alle Leistungen aus, die zu Ihrem Vorhaben gehören. Mehrfachauswahl möglich.",
  },
  aussen: {
    title: "Welche Leistungen im Außenbereich möchten Sie verändern?",
    description:
      "Wählen Sie alle Leistungen aus, die zu Ihrem Vorhaben gehören. Mehrfachauswahl möglich.",
  },
  gesamt: {
    title: "Welche Bereiche gehören zu Ihrem Gesamtprojekt?",
    description:
      "Wählen Sie alle Bereiche aus, die zu Ihrem Vorhaben gehören. Mehrfachauswahl möglich.",
  },
};

const DEFAULT_AREA_COPY = {
  title: "Welche Leistungen möchten Sie verändern?",
  description:
    "Wählen Sie alle Leistungen aus, die zu Ihrem Vorhaben gehören. Mehrfachauswahl möglich.",
};

/**
 * Funnel Step 1 — exactly three high-level entry points. No "Weiter"
 * button here: choosing a card immediately shows the selected state,
 * then auto-advances after a short, deliberate delay (see
 * `prefersReducedMotion`). Switching the main area prunes any
 * previously chosen Step 2 leistungen that no longer belong to it, so a
 * changed mind never carries stale, incompatible selections forward.
 */
export function StepMainArea({
  data,
  update,
  onNext,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState(data.mainArea);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleSelect(value: string) {
    setSelected(value);
    const allowed = categoriesForMainArea(value);
    update({
      mainArea: value,
      categories: data.categories.filter((category) => allowed.includes(category)),
    });
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => onNext(),
      prefersReducedMotion() ? 120 : 260
    );
  }

  return (
    <div className="space-y-5 sm:space-y-8">
      <div>
        <h1 className="text-[1.375rem] font-medium tracking-tight text-balance text-ink sm:text-3xl">
          Welchen Bereich möchten Sie verändern?
        </h1>
        <p className="mt-1.5 text-pretty text-[15px] leading-relaxed text-muted sm:mt-2">
          Wählen Sie den Bereich, der am besten zu Ihrem Vorhaben passt.
        </p>
      </div>

      <div className="grid gap-2.5 sm:gap-3">
        {mainAreaOptions.map((option) => {
          const Icon = mainAreaIcons[option.value];
          const checked = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={checked}
              onClick={() => handleSelect(option.value)}
              className={`flex min-h-[64px] w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sage sm:min-h-[72px] sm:gap-4 sm:px-5 sm:py-4 ${
                checked
                  ? "border-sage bg-soft-sage"
                  : "border-line hover:border-clay-soft"
              }`}
            >
              {Icon && (
                <Icon
                  aria-hidden="true"
                  className={`h-6 w-6 shrink-0 ${checked ? "text-sage-deep" : "text-muted"}`}
                  strokeWidth={1.5}
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{option.label}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted sm:text-sm">
                  {option.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  checked ? "border-sage bg-sage" : "border-line"
                }`}
              >
                {checked && <Check className="h-3.5 w-3.5 text-paper" strokeWidth={2.5} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Funnel Step 2 — only the leistungen relevant to the Step 1 choice
 * (see `categoriesForMainArea`). Multiple selections are allowed, so
 * this step does not auto-advance. Navigation lives in `FunnelActionBar`
 * (sibling of the animated wrapper) so fixed positioning stays correct.
 */
export function StepCategories({
  data,
  update,
  onNext,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
}) {
  const [showError, setShowError] = useState(false);
  const allowedValues = categoriesForMainArea(data.mainArea);
  const options = renovationCategories.filter((category) =>
    allowedValues.includes(category.value)
  );
  const copy = AREA_STEP_COPY[data.mainArea] ?? DEFAULT_AREA_COPY;
  const isValid = data.categories.length > 0;

  function toggle(value: string) {
    const next = data.categories.includes(value)
      ? data.categories.filter((item) => item !== value)
      : [...data.categories, value];
    update({ categories: next });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) {
      setShowError(true);
      return;
    }
    onNext();
  }

  return (
    <StepShell
      title={copy.title}
      description={copy.description}
      onSubmit={handleSubmit}
    >
      <CategoryCardGroup
        legend="Leistungen auswählen"
        options={options}
        values={data.categories}
        onToggle={toggle}
        icons={categoryIcons}
      />
      {showError && !isValid && (
        <p role="alert" className="text-sm text-clay">
          Bitte wählen Sie mindestens eine Leistung aus.
        </p>
      )}

      {/* Honeypot — hidden from real visitors, a naive bot may fill it. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Firma</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.company}
          onChange={(event) => update({ company: event.target.value })}
        />
      </div>
    </StepShell>
  );
}

export function StepImages({
  onNext,
  images,
  onAddImages,
  onRemoveImage,
  onBusyChange,
}: {
  onNext: () => void;
  images: LocalImage[];
  onAddImages: (files: File[]) => void;
  onRemoveImage: (id: string) => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const inputId = useId();
  const errorId = useId();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const contactEmail = getContactEmail();

  useEffect(() => {
    return () => {
      onBusyChange?.(false);
    };
  }, [onBusyChange]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isProcessing) return;
    onNext();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const list = event.target.files;
    event.target.value = "";
    if (!list || list.length === 0) return;

    setIsProcessing(true);
    onBusyChange?.(true);
    setError(null);

    try {
      // Yield once so the sticky bar can show the processing label before
      // synchronous object-URL work runs on larger selections.
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 0);
      });

      const remainingSlots = Math.max(0, MAX_FUNNEL_IMAGES - images.length);
      if (remainingSlots === 0) {
        setError(`Sie können höchstens ${MAX_FUNNEL_IMAGES} Bilder auswählen.`);
        return;
      }

      const accepted: File[] = [];
      let hadInvalidType = false;
      let hadTooLarge = false;
      let hadTooMany = false;

      for (const file of Array.from(list)) {
        if (accepted.length >= remainingSlots) {
          hadTooMany = true;
          break;
        }
        if (!isAcceptedImageFile(file)) {
          hadInvalidType = true;
          continue;
        }
        if (file.size > MAX_IMAGE_BYTES) {
          hadTooLarge = true;
          continue;
        }
        accepted.push(file);
      }

      if (accepted.length > 0) {
        onAddImages(accepted);
      }

      if (hadInvalidType) {
        setError("Bitte wählen Sie JPG- oder PNG-Dateien aus.");
      } else if (hadTooLarge) {
        setError("Einzelne Dateien dürfen höchstens 10 MB groß sein.");
      } else if (hadTooMany) {
        setError(`Sie können höchstens ${MAX_FUNNEL_IMAGES} Bilder auswählen.`);
      } else if (accepted.length === 0) {
        setError("Bitte wählen Sie JPG- oder PNG-Dateien aus.");
      }
    } finally {
      setIsProcessing(false);
      onBusyChange?.(false);
    }
  }

  return (
    <StepShell
      title="Bilder hinzufügen"
      titleBadge="Optional"
      description="Bilder helfen uns dabei, Ihr Vorhaben besser einzuschätzen. Sie können diesen Schritt aber auch überspringen und Bilder später nachreichen."
      onSubmit={handleSubmit}
    >
      <div>
        <p className="mb-4 text-[15px] leading-relaxed text-muted">
          Auch ohne Bilder können Sie Ihre Anfrage vollständig absenden.
        </p>

        <label
          htmlFor={inputId}
          className={`flex min-h-11 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-7 text-center text-[15px] outline-none transition-colors sm:py-9 ${
            error
              ? "border-clay text-muted"
              : "border-line text-muted hover:border-clay-soft"
          } focus-within:ring-2 focus-within:ring-sage ${
            isProcessing ? "pointer-events-none opacity-70" : ""
          }`}
        >
          {isProcessing ? "Bild wird verarbeitet …" : "Bilder auswählen"}
          <span className="mt-1 text-sm text-muted">
            JPG, PNG — mehrere Dateien möglich
          </span>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          multiple
          disabled={isProcessing}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="sr-only"
          onChange={handleFileChange}
        />

        {error && (
          <p id={errorId} role="alert" className="mt-3 text-sm text-clay">
            {error}
          </p>
        )}

        {images.length > 0 && (
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((image) => (
              <li
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-lg border border-line"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview, next/image cannot optimize object URLs */}
                <img
                  src={image.previewUrl}
                  alt={image.name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(image.id)}
                  aria-label={`${image.name} entfernen`}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-paper outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-sm leading-relaxed text-muted">
          Sie können Bilder später auch per E-Mail nachreichen
          {contactEmail ? (
            <>
              {" "}
              (
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-ink underline decoration-line underline-offset-4 outline-none transition-colors hover:decoration-clay focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-sage"
              >
                {contactEmail}
              </a>
              )
            </>
          ) : null}
          .
        </p>

        {!isProduction && (
          <p className="mt-2 text-sm text-muted">
            [Entwicklungsansicht] Der permanente Bild-Upload ist technisch noch
            nicht angebunden. Ausgewählte Bilder bleiben nur lokal in Ihrem
            Browser.
          </p>
        )}
      </div>
    </StepShell>
  );
}

const MAX_FUNNEL_IMAGES = 30;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isAcceptedImageFile(file: File): boolean {
  if (ACCEPTED_IMAGE_TYPES.has(file.type)) return true;
  // Some browsers leave type empty — fall back to extension.
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".webp")
  );
}

export function StepObject({ data, update, onNext }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressSectionRef = useRef<HTMLDivElement>(null);
  const houseSectionRef = useRef<HTMLDivElement>(null);
  /** When true, PLZ autofill must not overwrite a user-edited city. */
  const cityManuallyEditedRef = useRef(false);
  const lastAutofilledCityRef = useRef<string>("");
  const scrollCleanupRef = useRef<(() => void) | null>(null);
  const lookupGenerationRef = useRef(0);

  useEffect(() => {
    prefetchPostalCityMap();
    return () => {
      scrollCleanupRef.current?.();
    };
  }, []);

  function scrollToAddressAndFocusPlz(delayMs: number) {
    scrollCleanupRef.current?.();
    const section = addressSectionRef.current;
    if (!section) return;
    scrollCleanupRef.current = scrollFunnelTargetIntoView(section, {
      focus: postalCodeRef.current,
      delayMs,
    });
  }

  function scrollToHouseSection() {
    scrollCleanupRef.current?.();
    const section = houseSectionRef.current;
    if (!section) return;
    scrollCleanupRef.current = scrollFunnelTargetIntoView(section, {
      delayMs: prefersReducedMotion() ? 80 : 180,
    });
  }

  async function applyCityFromPostalCode(postalCode: string) {
    if (!isCompleteGermanPostalCode(postalCode)) return;
    if (cityManuallyEditedRef.current) return;

    const generation = ++lookupGenerationRef.current;
    const city = await lookupCityForPostalCode(postalCode);
    if (generation !== lookupGenerationRef.current) return;
    if (!city) return;

    lastAutofilledCityRef.current = city;
    update({ city });
  }

  function handleObjectTypeChange(value: string) {
    update({
      objectType: value,
      houseSubtype: value === "haus" ? data.houseSubtype : "",
    });

    if (value === "haus") {
      // Wait for the house-subtype cards to render, then scroll there.
      window.setTimeout(() => scrollToHouseSection(), 40);
      return;
    }

    scrollToAddressAndFocusPlz(prefersReducedMotion() ? 100 : 200);
  }

  function handleHouseSubtypeChange(value: string) {
    update({ houseSubtype: value });
    scrollToAddressAndFocusPlz(prefersReducedMotion() ? 100 : 200);
  }

  function handlePostalCodeChange(raw: string) {
    const next = sanitizeGermanPostalCode(raw);

    if (next.length < 5) {
      // Incomplete — never clear a manually entered city; only clear an
      // autofilled city so a mistyped digit can be corrected cleanly.
      if (
        !cityManuallyEditedRef.current &&
        data.city === lastAutofilledCityRef.current &&
        lastAutofilledCityRef.current
      ) {
        lastAutofilledCityRef.current = "";
        update({ postalCode: next, city: "" });
        return;
      }
      update({ postalCode: next });
      return;
    }

    update({ postalCode: next });
    void applyCityFromPostalCode(next);
  }

  function handleCityChange(value: string) {
    cityManuallyEditedRef.current = true;
    update({ city: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!isCompleteGermanPostalCode(data.postalCode)) {
      nextErrors.postalCode = "Bitte geben Sie eine gültige Postleitzahl an.";
    }
    if (data.city.trim().length < 2) {
      nextErrors.city = "Bitte geben Sie Ihren Ort an.";
    }
    if (!data.objectType) {
      nextErrors.objectType = "Bitte wählen Sie eine Objektart aus.";
    } else if (data.objectType === "haus" && !data.houseSubtype) {
      nextErrors.houseSubtype = "Bitte wählen Sie eine Hausart aus.";
    }
    setErrors(nextErrors);

    if (nextErrors.objectType) {
      // Stay at top — object type is first.
      return;
    }
    if (nextErrors.houseSubtype) {
      houseSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    if (nextErrors.postalCode) {
      addressSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      postalCodeRef.current?.focus({ preventScroll: true });
      return;
    }
    if (nextErrors.city) {
      addressSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      cityRef.current?.focus({ preventScroll: true });
      return;
    }
    if (Object.keys(nextErrors).length === 0) onNext();
  }

  return (
    <StepShell title="Angaben zum Objekt" onSubmit={handleSubmit}>
      <OptionCardGroup
        legend="Objektart"
        options={objectTypes}
        value={data.objectType}
        onChange={handleObjectTypeChange}
        error={errors.objectType}
        icons={objectTypeIcons}
        large
      />

      {data.objectType === "haus" && (
        <div ref={houseSectionRef} className="scroll-mt-28 sm:scroll-mt-8">
          <OptionCardGroup
            legend="Hausart"
            options={houseSubtypes}
            value={data.houseSubtype}
            onChange={handleHouseSubtypeChange}
            error={errors.houseSubtype}
          />
        </div>
      )}

      <div
        ref={addressSectionRef}
        className="scroll-mt-28 space-y-5 sm:scroll-mt-8 sm:space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <TextField
            ref={postalCodeRef}
            id="field-plz"
            label="PLZ"
            value={data.postalCode}
            onChange={handlePostalCodeChange}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            pattern="[0-9]{5}"
            enterKeyHint="next"
            required
            error={errors.postalCode}
          />
          <TextField
            ref={cityRef}
            id="field-ort"
            label="Ort"
            value={data.city}
            onChange={handleCityChange}
            autoComplete="address-level2"
            enterKeyHint="next"
            required
            error={errors.city}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <TextField
            label="Ungefähre Fläche (optional)"
            value={data.areaSqm}
            onChange={(value) => update({ areaSqm: value })}
            type="text"
            inputMode="decimal"
          />
          <TextField
            label="Baujahr (optional)"
            value={data.constructionYear}
            onChange={(value) => update({ constructionYear: value })}
            type="text"
            inputMode="numeric"
            maxLength={4}
          />
        </div>
      </div>
    </StepShell>
  );
}

export function StepTiming({ data, update, onNext }: StepProps) {
  const [showError, setShowError] = useState(false);
  const isValid = Boolean(data.desiredStart);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) {
      setShowError(true);
      return;
    }
    onNext();
  }

  return (
    <StepShell title="Gewünschter Start" onSubmit={handleSubmit}>
      <OptionCardGroup
        legend="Wann soll es losgehen?"
        options={desiredStartOptions}
        value={data.desiredStart}
        onChange={(value) => update({ desiredStart: value })}
        error={showError && !isValid ? "Bitte wählen Sie den gewünschten Start aus." : undefined}
      />
    </StepShell>
  );
}

export function StepBudget({ data, update, onNext }: StepProps) {
  const [showError, setShowError] = useState(false);
  const isValid = Boolean(data.budgetRange);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) {
      setShowError(true);
      return;
    }
    onNext();
  }

  return (
    <StepShell title="Geplanter Investitionsrahmen" onSubmit={handleSubmit}>
      <OptionCardGroup
        legend="Investitionsrahmen"
        options={budgetOptions}
        value={data.budgetRange}
        onChange={(value) => update({ budgetRange: value })}
        error={showError && !isValid ? "Bitte wählen Sie einen Investitionsrahmen aus." : undefined}
      />
    </StepShell>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StepContact({ data, update, onNext }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (data.firstName.trim().length < 2) nextErrors.firstName = "Bitte geben Sie Ihren Vornamen an.";
    if (data.lastName.trim().length < 2) nextErrors.lastName = "Bitte geben Sie Ihren Nachnamen an.";
    if (!EMAIL_PATTERN.test(data.email.trim())) {
      nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    }
    // A confirmation email always goes out, so email stays required
    // regardless of preference. When the preferred contact method is
    // "Telefon", a reachable phone number is additionally required.
    if (data.preferredContact === "phone" && data.phone.trim().length < 4) {
      nextErrors.phone = "Bitte geben Sie eine Telefonnummer an.";
    }
    if (!data.preferredContact) {
      nextErrors.preferredContact = "Bitte wählen Sie einen bevorzugten Kontaktweg aus.";
    }
    setErrors(nextErrors);
    if (nextErrors.firstName) firstNameRef.current?.focus();
    else if (nextErrors.lastName) lastNameRef.current?.focus();
    else if (nextErrors.email) emailRef.current?.focus();
    else if (nextErrors.phone) phoneRef.current?.focus();
    else if (Object.keys(nextErrors).length === 0) onNext();
  }

  return (
    <StepShell title="Persönliche Angaben" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <TextField
          ref={firstNameRef}
          label="Vorname"
          value={data.firstName}
          onChange={(value) => update({ firstName: value })}
          autoComplete="given-name"
          required
          error={errors.firstName}
        />
        <TextField
          ref={lastNameRef}
          label="Nachname"
          value={data.lastName}
          onChange={(value) => update({ lastName: value })}
          autoComplete="family-name"
          required
          error={errors.lastName}
        />
        <TextField
          ref={emailRef}
          label="E-Mail"
          value={data.email}
          onChange={(value) => update({ email: value })}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          ref={phoneRef}
          label={data.preferredContact === "phone" ? "Telefon" : "Telefon (optional)"}
          value={data.phone}
          onChange={(value) => update({ phone: value })}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required={data.preferredContact === "phone"}
          error={errors.phone}
        />
      </div>
      <OptionCardGroup
        legend="Bevorzugter Kontaktweg"
        options={contactPreferenceOptions}
        value={data.preferredContact}
        onChange={(value) => update({ preferredContact: value })}
        error={errors.preferredContact}
      />
    </StepShell>
  );
}

export function StepWishes({ data, update, onNext }: StepProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onNext();
  }

  return (
    <StepShell
      title="Ihre Wünsche"
      description="Möchten Sie uns noch etwas mitgeben?"
      onSubmit={handleSubmit}
    >
      <div>
        <textarea
          id="wishes"
          rows={4}
          value={data.wishes}
          onChange={(event) => update({ wishes: event.target.value })}
          className="w-full scroll-mt-28 resize-none rounded-xl border border-line bg-transparent p-4 text-base leading-relaxed text-ink outline-none transition-colors focus:border-clay sm:scroll-mt-8 sm:text-[15px]"
        />
        <p className="mt-2 text-sm text-muted">Dieser Schritt ist optional.</p>
      </div>
    </StepShell>
  );
}
