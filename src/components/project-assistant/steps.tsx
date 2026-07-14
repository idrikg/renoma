"use client";

import { useId, useState } from "react";
import {
  budgetOptions,
  contactPreferenceOptions,
  desiredStartOptions,
  propertyTypes,
  renovationCategories,
} from "@/lib/validation";
import {
  CategoryToggleGroup,
  OptionCardGroup,
  StepNav,
  StepShell,
  TextField,
} from "@/components/project-assistant/field-controls";
import type { LocalImage, WizardData } from "@/components/project-assistant/types";

type StepProps = {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack?: () => void;
};

export function StepCategories({ data, update, onNext }: StepProps) {
  const [error, setError] = useState<string | null>(null);

  function toggle(value: string) {
    const next = data.categories.includes(value)
      ? data.categories.filter((item) => item !== value)
      : [...data.categories, value];
    update({ categories: next });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (data.categories.length === 0) {
      setError("Bitte wählen Sie mindestens einen Bereich aus.");
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <StepShell title="Was möchten Sie verändern?" onSubmit={handleSubmit}>
      <CategoryToggleGroup
        legend="Bereiche auswählen"
        options={renovationCategories}
        values={data.categories}
        onToggle={toggle}
      />
      {error && <p className="text-sm text-clay">{error}</p>}

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

      <StepNav />
    </StepShell>
  );
}

export function StepWishes({ data, update, onNext, onBack }: StepProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onNext();
  }

  return (
    <StepShell title="Ihre Wünsche" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium tracking-[0.04em] text-muted">
          Erzählen Sie uns einfach, was Sie sich wünschen.
        </label>
        <textarea
          rows={6}
          value={data.wishes}
          onChange={(event) => update({ wishes: event.target.value })}
          className="mt-2 w-full resize-none rounded-xl border border-line bg-transparent p-4 text-[15px] leading-relaxed text-ink outline-none transition-colors focus:border-clay"
          placeholder="Optional — Sie können diesen Schritt auch überspringen."
        />
      </div>
      <StepNav onBack={onBack} />
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
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-10 text-center text-[15px] text-muted transition-colors hover:border-clay"
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
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/80 text-paper outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-sm text-muted">
          Hinweis: Der permanente Bild-Upload ist technisch noch nicht
          angebunden. Ihre Bilder werden aktuell nur lokal in Ihrem Browser
          angezeigt und nicht dauerhaft gespeichert.
        </p>
      </div>
      <StepNav onBack={onBack} />
    </StepShell>
  );
}

export function StepObject({ data, update, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (data.postalCode.trim().length < 4) {
      nextErrors.postalCode = "Bitte geben Sie eine gültige Postleitzahl an.";
    }
    if (data.city.trim().length < 2) {
      nextErrors.city = "Bitte geben Sie Ihren Ort an.";
    }
    if (!data.propertyType) {
      nextErrors.propertyType = "Bitte wählen Sie eine Objektart aus.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  }

  return (
    <StepShell title="Angaben zum Objekt" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="PLZ"
          value={data.postalCode}
          onChange={(value) => update({ postalCode: value })}
          autoComplete="postal-code"
          required
          error={errors.postalCode}
        />
        <TextField
          label="Ort"
          value={data.city}
          onChange={(value) => update({ city: value })}
          autoComplete="address-level2"
          required
          error={errors.city}
        />
      </div>
      <OptionCardGroup
        legend="Objektart"
        options={propertyTypes}
        value={data.propertyType}
        onChange={(value) => update({ propertyType: value })}
      />
      {errors.propertyType && <p className="text-sm text-clay">{errors.propertyType}</p>}
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Ungefähre Fläche (m²)"
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
      <StepNav onBack={onBack} />
    </StepShell>
  );
}

export function StepTiming({ data, update, onNext, onBack }: StepProps) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data.desiredStart) {
      setError("Bitte wählen Sie den gewünschten Start aus.");
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <StepShell title="Gewünschter Start" onSubmit={handleSubmit}>
      <OptionCardGroup
        legend="Wann soll es losgehen?"
        options={desiredStartOptions}
        value={data.desiredStart}
        onChange={(value) => update({ desiredStart: value })}
      />
      {error && <p className="text-sm text-clay">{error}</p>}
      <StepNav onBack={onBack} />
    </StepShell>
  );
}

export function StepBudget({ data, update, onNext, onBack }: StepProps) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data.budgetRange) {
      setError("Bitte wählen Sie einen Investitionsrahmen aus.");
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <StepShell title="Geplanter Investitionsrahmen" onSubmit={handleSubmit}>
      <OptionCardGroup
        legend="Investitionsrahmen"
        options={budgetOptions}
        value={data.budgetRange}
        onChange={(value) => update({ budgetRange: value })}
      />
      {error && <p className="text-sm text-clay">{error}</p>}
      <StepNav onBack={onBack} />
    </StepShell>
  );
}

export function StepContact({ data, update, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (data.firstName.trim().length < 2) nextErrors.firstName = "Bitte geben Sie Ihren Vornamen an.";
    if (data.lastName.trim().length < 2) nextErrors.lastName = "Bitte geben Sie Ihren Nachnamen an.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    }
    if (!data.preferredContact) {
      nextErrors.preferredContact = "Bitte wählen Sie einen bevorzugten Kontaktweg aus.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onNext();
  }

  return (
    <StepShell title="Persönliche Angaben" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Vorname"
          value={data.firstName}
          onChange={(value) => update({ firstName: value })}
          autoComplete="given-name"
          required
          error={errors.firstName}
        />
        <TextField
          label="Nachname"
          value={data.lastName}
          onChange={(value) => update({ lastName: value })}
          autoComplete="family-name"
          required
          error={errors.lastName}
        />
        <TextField
          label="E-Mail"
          value={data.email}
          onChange={(value) => update({ email: value })}
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          label="Telefon (optional)"
          value={data.phone}
          onChange={(value) => update({ phone: value })}
          type="tel"
          autoComplete="tel"
        />
      </div>
      <OptionCardGroup
        legend="Bevorzugter Kontaktweg"
        options={contactPreferenceOptions}
        value={data.preferredContact}
        onChange={(value) => update({ preferredContact: value })}
      />
      {errors.preferredContact && <p className="text-sm text-clay">{errors.preferredContact}</p>}
      <StepNav onBack={onBack} />
    </StepShell>
  );
}
