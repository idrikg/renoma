"use client";

import { useId, useRef, useState } from "react";
import {
  budgetOptions,
  contactPreferenceOptions,
  desiredStartOptions,
  houseSubtypes,
  objectTypes,
  renovationCategories,
  renovationCategoryGroups,
} from "@/lib/validation";
import {
  categoryIcons,
  objectTypeIcons,
} from "@/components/project-assistant/category-icons";
import {
  GroupedCategoryCardGroup,
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

export function StepCategories({ data, update, onNext }: StepProps) {
  const [showError, setShowError] = useState(false);
  const selectedCount = data.categories.length;
  const isValid = selectedCount > 0;

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

  const statusLabel =
    selectedCount === 1
      ? "1 Bereich ausgewählt"
      : selectedCount > 1
        ? `${selectedCount} Bereiche ausgewählt`
        : undefined;

  return (
    <StepShell
      title="Was möchten Sie verändern?"
      description="Wählen Sie alle Bereiche aus, die zu Ihrem Vorhaben gehören. Mehrfachauswahl möglich."
      descriptionClassName="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-[17px]"
      onSubmit={handleSubmit}
    >
      <GroupedCategoryCardGroup
        legend="Bereiche auswählen"
        groups={renovationCategoryGroups}
        options={renovationCategories}
        values={data.categories}
        onToggle={toggle}
        icons={categoryIcons}
      />
      {showError && !isValid && (
        <p role="alert" className="text-sm text-clay">
          Bitte wählen Sie mindestens einen Bereich aus.
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

      <StepNav nextDisabled={!isValid} statusLabel={statusLabel} />
    </StepShell>
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
          className="w-full resize-none rounded-xl border border-line bg-transparent p-4 text-[15px] leading-relaxed text-ink outline-none transition-colors focus:border-clay"
        />
        <p className="mt-2 text-sm text-muted">Dieser Schritt ist optional.</p>
      </div>
      <StepNav onBack={onBack} />
    </StepShell>
  );
}
