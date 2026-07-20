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
  StepNav,
  StepShell,
  TextField,
} from "@/components/project-assistant/field-controls";
import type { LocalImage, WizardData } from "@/components/project-assistant/types";

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
    <div className="space-y-7 sm:space-y-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-balance text-ink sm:text-3xl">
          Welchen Bereich möchten Sie verändern?
        </h1>
        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">
          Wählen Sie den Bereich, der am besten zu Ihrem Vorhaben passt.
        </p>
      </div>

      <div className="grid gap-3">
        {mainAreaOptions.map((option) => {
          const Icon = mainAreaIcons[option.value];
          const checked = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={checked}
              onClick={() => handleSelect(option.value)}
              className={`flex min-h-[72px] w-full items-center gap-4 rounded-xl border px-5 py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sage ${
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
 * this step does not auto-advance; instead it exposes an always-
 * reachable action bar that becomes a safe-area-aware sticky bar on
 * mobile so "Weiter" never requires scrolling to the end of the list.
 */
/**
 * Renders only the heading, the leistungen cards and the honeypot — no
 * "Zurück"/"Weiter" navigation. Deliberately: this step's action bar
 * (see `CategoryStepActionBar`) becomes `position: fixed` on mobile, and
 * a CSS transform animation on an ancestor — such as this step's own
 * fade/slide-in transition — establishes a new containing block for any
 * `fixed` descendant, anchoring it to that ancestor instead of the
 * viewport. Keeping the action bar as a sibling of the animated wrapper
 * (wired up in `ProjectAssistant`) avoids that trap entirely.
 */
export function StepCategories({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const allowedValues = categoriesForMainArea(data.mainArea);
  const options = renovationCategories.filter((category) =>
    allowedValues.includes(category.value)
  );
  const copy = AREA_STEP_COPY[data.mainArea] ?? DEFAULT_AREA_COPY;

  function toggle(value: string) {
    const next = data.categories.includes(value)
      ? data.categories.filter((item) => item !== value)
      : [...data.categories, value];
    update({ categories: next });
  }

  return (
    <div className="space-y-7 sm:space-y-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-balance text-ink sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted">
          {copy.description}
        </p>
      </div>

      {/* Reserves space for the fixed mobile action bar so the last card
          is never hidden underneath it. No-op on desktop, where the bar
          sits in the normal document flow. */}
      <div className="pb-28 sm:pb-0">
        <CategoryCardGroup
          legend="Leistungen auswählen"
          options={options}
          values={data.categories}
          onToggle={toggle}
          icons={categoryIcons}
        />
      </div>

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
    </div>
  );
}

/**
 * Step 2's always-reachable "Zurück"/"Weiter" bar — rendered by
 * `ProjectAssistant` as a sibling of the animated step wrapper (see the
 * note on `StepCategories` above for why). Sticky/fixed on mobile with
 * safe-area padding; a normal static, non-fixed bar on desktop.
 */
export function CategoryStepActionBar({
  selectedCount,
  onBack,
  onNext,
}: {
  selectedCount: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const isValid = selectedCount > 0;
  const statusLabel =
    selectedCount === 1
      ? "1 Leistung ausgewählt"
      : selectedCount > 1
        ? `${selectedCount} Leistungen ausgewählt`
        : "Noch keine Auswahl";

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-6 pt-3 backdrop-blur-sm [padding-bottom:calc(0.75rem+env(safe-area-inset-bottom))] sm:static sm:z-auto sm:border-0 sm:bg-transparent sm:px-0 sm:pt-2 sm:[padding-bottom:0]">
      <p className="mb-3 text-center text-[13px] text-muted sm:hidden">{statusLabel}</p>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="-my-3 rounded-sm px-1 py-3 text-[15px] font-medium text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
        >
          Zurück
        </button>
        <p className="hidden text-[15px] text-muted sm:block">{statusLabel}</p>
        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          aria-disabled={!isValid}
          className="rounded-full bg-ink px-7 py-3 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}

export function StepImages({
  onNext,
  onBack,
  images,
  onAddImages,
  onRemoveImage,
}: {
  onNext: () => void;
  onBack?: () => void;
  images: LocalImage[];
  onAddImages: (files: FileList) => void;
  onRemoveImage: (id: string) => void;
}) {
  const inputId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onNext();
  }

  return (
    <StepShell
      title="Bilder"
      description="Fotos helfen uns, Ihr Projekt besser zu verstehen. Dieser Schritt ist optional."
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-10 text-center text-[15px] text-muted outline-none transition-colors hover:border-clay focus-within:ring-2 focus-within:ring-sage"
        >
          Bilder auswählen
          <span className="mt-1 text-sm text-muted">JPG, PNG — mehrere Dateien möglich</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => {
            if (event.target.files) onAddImages(event.target.files);
            event.target.value = "";
          }}
        />

        {images.length > 0 && (
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((image) => (
              <li key={image.id} className="group relative aspect-square overflow-hidden rounded-lg border border-line">
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
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/80 text-paper outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/*
         * No persistent file storage is configured yet. The selection/
         * preview/removal experience itself stays available in every
         * environment — only the explanatory copy changes: production
         * visitors get an honest, customer-friendly note; development
         * gets the technical detail. Never implies files were uploaded
         * permanently.
         */}
        <p className="mt-4 text-sm text-muted">
          {isProduction
            ? "Bilder können Sie optional auswählen. Falls die Übertragung noch nicht möglich ist, können Sie uns die Bilder nach dem persönlichen Erstkontakt senden."
            : "[Entwicklungsansicht] Der permanente Bild-Upload ist technisch noch nicht angebunden. Ihre Bilder werden aktuell nur lokal in Ihrem Browser angezeigt und nicht dauerhaft gespeichert."}
        </p>
      </div>
      <StepNav onBack={onBack} />
    </StepShell>
  );
}

export function StepObject({ data, update, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const isValid =
    data.postalCode.trim().length >= 4 &&
    data.city.trim().length >= 2 &&
    Boolean(data.objectType) &&
    (data.objectType !== "haus" || Boolean(data.houseSubtype));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (data.postalCode.trim().length < 4) {
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
    if (nextErrors.postalCode) postalCodeRef.current?.focus();
    else if (nextErrors.city) cityRef.current?.focus();
    else if (Object.keys(nextErrors).length === 0) onNext();
  }

  return (
    <StepShell title="Angaben zum Objekt" onSubmit={handleSubmit}>
      <OptionCardGroup
        legend="Objektart"
        options={objectTypes}
        value={data.objectType}
        onChange={(value) =>
          update({ objectType: value, houseSubtype: value === "haus" ? data.houseSubtype : "" })
        }
        error={errors.objectType}
        icons={objectTypeIcons}
        large
      />

      {data.objectType === "haus" && (
        <OptionCardGroup
          legend="Hausart"
          options={houseSubtypes}
          value={data.houseSubtype}
          onChange={(value) => update({ houseSubtype: value })}
          error={errors.houseSubtype}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          ref={postalCodeRef}
          label="PLZ"
          value={data.postalCode}
          onChange={(value) => update({ postalCode: value })}
          autoComplete="postal-code"
          required
          error={errors.postalCode}
        />
        <TextField
          ref={cityRef}
          label="Ort"
          value={data.city}
          onChange={(value) => update({ city: value })}
          autoComplete="address-level2"
          required
          error={errors.city}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Ungefähre Fläche (optional)"
          value={data.areaSqm}
          onChange={(value) => update({ areaSqm: value })}
          type="text"
        />
        <TextField
          label="Baujahr (optional)"
          value={data.constructionYear}
          onChange={(value) => update({ constructionYear: value })}
          type="text"
        />
      </div>
      <StepNav onBack={onBack} nextDisabled={!isValid} />
    </StepShell>
  );
}

export function StepTiming({ data, update, onNext, onBack }: StepProps) {
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
      <StepNav onBack={onBack} nextDisabled={!isValid} />
    </StepShell>
  );
}

export function StepBudget({ data, update, onNext, onBack }: StepProps) {
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
      <StepNav onBack={onBack} nextDisabled={!isValid} />
    </StepShell>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StepContact({ data, update, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const isValid =
    data.firstName.trim().length >= 2 &&
    data.lastName.trim().length >= 2 &&
    EMAIL_PATTERN.test(data.email.trim()) &&
    Boolean(data.preferredContact) &&
    (data.preferredContact !== "phone" || data.phone.trim().length >= 4);

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
      <div className="grid gap-6 sm:grid-cols-2">
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
      <StepNav onBack={onBack} nextDisabled={!isValid} />
    </StepShell>
  );
}

export function StepWishes({ data, update, onNext, onBack }: StepProps) {
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
          rows={5}
          value={data.wishes}
          onChange={(event) => update({ wishes: event.target.value })}
          className="w-full resize-none rounded-xl border border-line bg-transparent p-4 text-base leading-relaxed text-ink outline-none transition-colors focus:border-clay sm:text-[15px]"
        />
        <p className="mt-2 text-sm text-muted">Dieser Schritt ist optional.</p>
      </div>
      <StepNav onBack={onBack} />
    </StepShell>
  );
}
